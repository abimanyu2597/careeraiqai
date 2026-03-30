from fastapi import APIRouter
from app.schemas.common import CareerAnalyzeRequest
from app.agents.orchestrator import run_career_workflow

router = APIRouter()

@router.post("/analyze")
def analyze_career(payload: CareerAnalyzeRequest) -> dict:
    return run_career_workflow(payload.model_dump())
