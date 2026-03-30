from typing import Any

from langgraph.graph import END, StateGraph

from app.agents.state import CareerState
from app.prompts import ORCHESTRATOR_PROMPT, RESUME_AGENT_PROMPT, JD_MATCH_PROMPT, COMPANY_PROMPT, KNOWLEDGE_PROMPT
from app.llm.clients import call_openai_json
from app.services.company_research import lightweight_company_research
from app.services.scoring_service import jd_fit_score

def analyze_resume_node(state: CareerState) -> CareerState:
    resume_text = state.get("resume_text", "")
    fallback = {
        "professional_summary_feedback": ["Make the summary outcome-oriented and role-specific."],
        "strengths": ["Relevant technical keywords detected", "Resume has identifiable project/experience content"],
        "weaknesses": ["Add measurable impact", "Improve bullet specificity"],
        "rewritten_bullets": [
            "Built and deployed production-grade ML/data solutions using Python and SQL, improving workflow efficiency and decision quality.",
            "Collaborated across teams to deliver scalable backend and analytics features with measurable business impact."
        ],
        "missing_metrics": ["Add latency, accuracy, revenue, time saved, scale, or adoption metrics where possible."],
        "ats_issues": ["Missing role-specific keywords", "Some bullets may be generic"],
        "improvement_priority": ["summary", "experience bullets", "metrics", "keywords"]
    }
    result = call_openai_json(
        RESUME_AGENT_PROMPT,
        f"Analyze this resume:\n{resume_text}",
        fallback,
    )
    state["resume_analysis"] = result
    return state

def jd_match_node(state: CareerState) -> CareerState:
    resume_text = state.get("resume_text", "")
    jd_text = state.get("jd_text", "")
    score, matched, missing = jd_fit_score(resume_text, jd_text)
    fallback = {
        "fit_score": score,
        "matched_skills": matched[:15],
        "missing_skills": missing[:15],
        "missing_keywords": missing[:15],
        "strong_matches": matched[:8],
        "weak_matches": missing[:8],
        "resume_edit_suggestions": [
            "Mirror the JD’s core keywords in summary and skills section",
            "Add bullets aligned to role responsibilities",
            "Highlight tools and outcomes that directly support the JD"
        ],
        "final_assessment": f"Estimated fit score is {score}/100 based on overlap between resume and JD keywords."
    }
    result = call_openai_json(
        JD_MATCH_PROMPT,
        f"Resume:\n{resume_text}\n\nJD:\n{jd_text}",
        fallback,
    )
    state["jd_match"] = result
    return state

def company_node(state: CareerState) -> CareerState:
    company_name = state.get("company_name", "Target Company")
    company_url = state.get("company_url", "")
    jd_text = state.get("jd_text", "")
    fallback = lightweight_company_research(company_name, jd_text, company_url)
    result = call_openai_json(
        COMPANY_PROMPT,
        f"Company: {company_name}\nURL: {company_url}\nJD:\n{jd_text}",
        fallback,
    )
    state["company_research"] = result
    return state

def knowledge_node(state: CareerState) -> CareerState:
    query = state.get("user_query", "Prepare me for this interview")
    fallback = {
        "direct_answer": "Focus on resume-to-JD alignment, strong project storytelling, and likely role-specific technical questions.",
        "supporting_points": [
            "Prioritize the responsibilities repeated in the JD",
            "Prepare metrics-backed project examples",
            "Practice concise answers for behavioral and technical rounds"
        ],
        "action_points": [
            "Tailor the resume",
            "Prepare 5 project stories",
            "Practice company-specific mock questions"
        ],
        "cited_context": [],
        "confidence": "medium"
    }
    result = call_openai_json(
        KNOWLEDGE_PROMPT,
        f"Question: {query}\nResume:\n{state.get('resume_text', '')}\nJD:\n{state.get('jd_text', '')}",
        fallback,
    )
    state["knowledge_answer"] = result
    return state

def final_node(state: CareerState) -> CareerState:
    jd_match = state.get("jd_match", {})
    resume_analysis = state.get("resume_analysis", {})
    company = state.get("company_research", {})
    knowledge = state.get("knowledge_answer", {})
    fit_score = jd_match.get("fit_score", 0)

    state["final_response"] = {
        "overall_fit_summary": jd_match.get("final_assessment", "Career fit summary generated."),
        "fit_score": fit_score,
        "top_strengths": resume_analysis.get("strengths", [])[:4],
        "critical_gaps": jd_match.get("missing_skills", [])[:6],
        "resume_fixes": resume_analysis.get("improvement_priority", [])[:4],
        "interview_focus": company.get("likely_interview_focus", [])[:6],
        "company_insights": company.get("candidate_preparation_advice", [])[:4],
        "action_plan_7_days": knowledge.get("action_points", [])[:7],
        "final_verdict": (
            "Strong shortlist potential after targeted resume alignment."
            if fit_score >= 70 else
            "Needs focused improvements in role alignment before interviews."
        ),
    }
    return state

def build_graph():
    graph = StateGraph(CareerState)
    graph.add_node("resume_analysis", analyze_resume_node)
    graph.add_node("jd_match", jd_match_node)
    graph.add_node("company_research", company_node)
    graph.add_node("knowledge", knowledge_node)
    graph.add_node("final", final_node)

    graph.set_entry_point("resume_analysis")
    graph.add_edge("resume_analysis", "jd_match")
    graph.add_edge("jd_match", "company_research")
    graph.add_edge("company_research", "knowledge")
    graph.add_edge("knowledge", "final")
    graph.add_edge("final", END)
    return graph.compile()

def run_career_workflow(payload: dict[str, Any]) -> dict[str, Any]:
    graph = build_graph()
    result = graph.invoke(payload)
    return result["final_response"]
