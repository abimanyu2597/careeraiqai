from pydantic import BaseModel, Field
from typing import Any

class ResumeAnalyzeRequest(BaseModel):
    resume_text: str = Field(..., min_length=20)

class JDMatchRequest(BaseModel):
    resume_text: str = Field(..., min_length=20)
    jd_text: str = Field(..., min_length=20)

class CompanyResearchRequest(BaseModel):
    company_name: str
    company_url: str | None = None
    jd_text: str | None = None

class InterviewGenerateRequest(BaseModel):
    resume_text: str
    jd_text: str
    company_context: dict[str, Any] | None = None

class InterviewChatRequest(BaseModel):
    session_id: str
    answer: str

class KnowledgeAskRequest(BaseModel):
    query: str
    resume_text: str | None = None
    jd_text: str | None = None
    uploaded_context_ids: list[str] = []

class CareerAnalyzeRequest(BaseModel):
    resume_text: str
    jd_text: str
    company_name: str | None = None
    company_url: str | None = None
    user_query: str = "Prepare me for this interview"

class ReportCreateRequest(BaseModel):
    title: str = "CareerIQ AI Report"
    sections: dict[str, Any]
