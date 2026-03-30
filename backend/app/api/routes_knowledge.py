from fastapi import APIRouter
from app.schemas.common import KnowledgeAskRequest
from app.prompts import KNOWLEDGE_PROMPT
from app.llm.clients import call_openai_json

router = APIRouter()

@router.post("/ask")
def ask_knowledge(payload: KnowledgeAskRequest) -> dict:
    fallback = {
        "direct_answer": "Prioritize the repeated skills in the JD, prepare metrics-backed project stories, and practice likely technical questions.",
        "supporting_points": [
            "The role fit depends on demonstrated evidence, not keyword stuffing.",
            "Strong project explanation often matters as much as tool familiarity.",
            "Preparation should cover both technical and behavioral rounds."
        ],
        "action_points": [
            "Tailor the resume",
            "Write concise self-intro",
            "Prepare 5 project stories",
            "Practice mock interview answers"
        ],
        "cited_context": [],
        "confidence": "medium"
    }
    return call_openai_json(
        KNOWLEDGE_PROMPT,
        f"Query: {payload.query}\nResume:\n{payload.resume_text or ''}\nJD:\n{payload.jd_text or ''}",
        fallback,
    )
