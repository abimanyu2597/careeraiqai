import re

def normalize_words(text: str) -> set[str]:
    words = re.findall(r"[A-Za-z0-9\+\#\.\-]{2,}", text.lower())
    return set(words)

def jd_fit_score(resume_text: str, jd_text: str) -> tuple[int, list[str], list[str]]:
    resume_words = normalize_words(resume_text)
    jd_words = normalize_words(jd_text)
    ignored = {"and", "the", "for", "with", "you", "will", "our", "are", "have", "this", "that", "from", "your", "team", "role"}
    jd_keywords = sorted([w for w in jd_words if w not in ignored and len(w) > 2])
    matched = [w for w in jd_keywords if w in resume_words][:30]
    missing = [w for w in jd_keywords if w not in resume_words][:30]
    denominator = max(len(jd_keywords), 1)
    score = min(95, max(25, int((len(matched) / denominator) * 100)))
    return score, matched, missing
