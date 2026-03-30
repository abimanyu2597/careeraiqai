from pathlib import Path
from pypdf import PdfReader

def extract_text_from_pdf(path: str) -> str:
    file_path = Path(path)
    if not file_path.exists():
        return ""
    try:
        reader = PdfReader(str(file_path))
        return "\n".join((page.extract_text() or "") for page in reader.pages).strip()
    except Exception:
        return ""

def parse_resume_sections(text: str) -> dict:
    sections = {
        "summary": "",
        "skills": [],
        "experience": [],
        "projects": [],
        "education": [],
    }
    lowered = text.lower()
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    current = None
    keys = {
        "summary": ["summary", "profile", "professional summary"],
        "skills": ["skills", "technical skills", "tech stack"],
        "experience": ["experience", "work experience", "employment"],
        "projects": ["projects", "project experience"],
        "education": ["education", "academics"],
    }
    bucket = {k: [] for k in sections}
    for line in lines:
        matched = False
        for section, names in keys.items():
            if any(line.lower() == name for name in names):
                current = section
                matched = True
                break
        if matched:
            continue
        if current:
            bucket[current].append(line)

    sections["summary"] = " ".join(bucket["summary"][:3])[:500]
    sections["skills"] = bucket["skills"][:15]
    sections["experience"] = bucket["experience"][:15]
    sections["projects"] = bucket["projects"][:12]
    sections["education"] = bucket["education"][:8]
    if not any(bucket.values()):
        sections["summary"] = text[:400]
    return sections
