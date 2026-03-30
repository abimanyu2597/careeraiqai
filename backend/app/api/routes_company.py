from fastapi import APIRouter
from app.schemas.common import CompanyResearchRequest
from app.prompts import COMPANY_PROMPT
from app.llm.clients import call_openai_json
from app.services.company_research import lightweight_company_research

router = APIRouter()

@router.post("/research")
def research_company(payload: CompanyResearchRequest) -> dict:
    fallback = lightweight_company_research(payload.company_name, payload.jd_text, payload.company_url)
    return call_openai_json(
        COMPANY_PROMPT,
        f"Company: {payload.company_name}\nURL: {payload.company_url or ''}\nJD:\n{payload.jd_text or ''}",
        fallback,
    )
