from pathlib import Path
import uuid

from fastapi import APIRouter, File, UploadFile
from app.schemas.common import ResumeAnalyzeRequest
from app.services.pdf_parser import extract_text_from_pdf, parse_resume_sections
from app.prompts import RESUME_AGENT_PROMPT
from app.llm.clients import call_openai_json

router = APIRouter()
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)) -> dict:
    suffix = Path(file.filename).suffix if file.filename else ".pdf"
    path = UPLOAD_DIR / f"{uuid.uuid4()}{suffix}"
    content = await file.read()
    path.write_bytes(content)

    extracted_text = extract_text_from_pdf(str(path)) if suffix.lower() == ".pdf" else content.decode("utf-8", errors="ignore")
    parsed_sections = parse_resume_sections(extracted_text)

    return {
        "file_id": path.name,
        "filename": file.filename,
        "extracted_text": extracted_text,
        "parsed_sections": parsed_sections,
    }

@router.post("/analyze")
def analyze_resume(payload: ResumeAnalyzeRequest) -> dict:
    fallback = {
        "professional_summary_feedback": ["Make the summary tighter and more targeted to the role."],
        "strengths": ["Technical background is visible", "Project and role context exist"],
        "weaknesses": ["Needs more measurable outcomes", "Some bullets can be more specific"],
        "rewritten_bullets": [
            "Designed and delivered scalable data and AI workflows using Python, SQL, and APIs to improve operational efficiency.",
            "Built production-ready backend and analytics components with a focus on reliability, performance, and business impact."
        ],
        "missing_metrics": ["Add business impact, model improvement, latency, savings, or scale where applicable"],
        "ats_issues": ["Role keywords could be stronger", "Summary can be more tailored"],
        "improvement_priority": ["summary", "metrics", "keywords", "experience bullets"],
    }
    return call_openai_json(RESUME_AGENT_PROMPT, payload.resume_text, fallback)
