from typing import Any, TypedDict

class CareerState(TypedDict, total=False):
    resume_text: str
    jd_text: str
    company_name: str
    company_url: str
    user_query: str
    resume_analysis: dict[str, Any]
    jd_match: dict[str, Any]
    company_research: dict[str, Any]
    knowledge_answer: dict[str, Any]
    final_response: dict[str, Any]
