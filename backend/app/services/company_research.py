def lightweight_company_research(company_name: str, jd_text: str | None = None, company_url: str | None = None) -> dict:
    jd_text = jd_text or ""
    focus = []
    for token in ["python", "sql", "aws", "ml", "machine learning", "fastapi", "docker", "spark", "airflow"]:
        if token.lower() in jd_text.lower():
            focus.append(token)
    return {
        "company_overview": f"{company_name} appears to be hiring for a role that values practical execution, collaboration, and delivery quality.",
        "role_expectations": [
            "Strong role alignment with the job description",
            "Ability to explain projects clearly",
            "Evidence of impact and ownership",
        ],
        "likely_interview_focus": focus or ["problem solving", "system design", "project depth"],
        "inferred_tech_stack": focus or ["python", "sql", "cloud", "apis"],
        "likely_rounds": ["screening", "technical", "managerial / behavioral"],
        "candidate_preparation_advice": [
            "Prepare project stories with measurable outcomes",
            "Align resume keywords to the JD",
            "Practice likely role-specific technical questions",
        ],
        "uncertainty_notes": "This company view is inferred from the provided input unless verified with external research."
    }
