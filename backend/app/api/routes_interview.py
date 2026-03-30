import uuid
from fastapi import APIRouter
from app.schemas.common import InterviewGenerateRequest, InterviewChatRequest
from app.prompts import INTERVIEW_PROMPT
from app.llm.clients import call_openai_json, call_groq_text

router = APIRouter()

@router.post("/generate")
def generate_questions(payload: InterviewGenerateRequest) -> dict:
    fallback = {
        "technical_questions": [
            "Walk me through a project most relevant to this role.",
            "How do you design a scalable Python service for production?",
            "How would you optimize a slow SQL query?"
        ],
        "behavioral_questions": [
            "Describe a challenging stakeholder situation and how you handled it.",
            "Tell me about a time you improved a process."
        ],
        "project_questions": [
            "What problem were you solving?",
            "What trade-offs did you make?",
            "How did you measure success?"
        ],
        "follow_up_questions": [
            "Why did you choose that approach?",
            "What would you improve now?"
        ],
        "answer_guidance": [
            "Use STAR for behavioral answers.",
            "Use problem → action → result for project answers."
        ],
        "top_focus_areas": ["project depth", "role alignment", "problem solving"]
    }
    result = call_openai_json(
        INTERVIEW_PROMPT,
        f"Resume:\n{payload.resume_text}\n\nJD:\n{payload.jd_text}\n\nCompany Context:\n{payload.company_context or {}}",
        fallback,
    )
    result["session_id"] = str(uuid.uuid4())
    return result

@router.post("/chat")
def interview_chat(payload: InterviewChatRequest) -> dict:
    fallback_text = (
        "Good base answer. Make it more structured. State the problem, your action, tools used, and measurable outcome."
    )
    feedback = call_groq_text(
        "You are a strict but supportive interview coach. Give concise feedback and ask the next logical follow-up question.",
        f"Candidate answer:\n{payload.answer}\n\nRespond with feedback, score out of 10, and next question.",
        fallback_text,
    )
    return {
        "next_question": "Can you quantify the impact of that work and explain your technical trade-offs?",
        "feedback": feedback,
        "score": 8.0,
        "improvement_tips": [
            "Add measurable impact",
            "Be more concise at the start",
            "Mention tools and decisions clearly"
        ]
    }
