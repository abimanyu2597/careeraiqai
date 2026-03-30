from fastapi import APIRouter
from app.schemas.common import JDMatchRequest
from app.prompts import JD_MATCH_PROMPT
from app.llm.clients import call_openai_json
from app.services.scoring_service import jd_fit_score

router = APIRouter()

@router.post("/analyze")
def analyze_match(payload: JDMatchRequest) -> dict:
    score, matched, missing = jd_fit_score(payload.resume_text, payload.jd_text)
    fallback = {
        "fit_score": score,
        "matched_skills": matched[:15],
        "missing_skills": missing[:15],
        "missing_keywords": missing[:15],
        "strong_matches": matched[:8],
        "weak_matches": missing[:8],
        "resume_edit_suggestions": [
            "Reflect the JD’s main tools and responsibilities in the top third of the resume",
            "Add stronger outcome-based bullets",
            "Close obvious keyword gaps where your experience supports them"
        ],
        "final_assessment": f"Estimated match is {score}/100."
    }
    return call_openai_json(
        JD_MATCH_PROMPT,
        f"Resume:\n{payload.resume_text}\n\nJD:\n{payload.jd_text}",
        fallback,
    )
