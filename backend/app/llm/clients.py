import json
from typing import Any

from app.core.config import settings

def _safe_json_fallback(payload: dict[str, Any]) -> dict[str, Any]:
    return payload

def call_openai_json(system_prompt: str, user_prompt: str, fallback: dict[str, Any]) -> dict[str, Any]:
    if not settings.openai_api_key:
        return _safe_json_fallback(fallback)
    try:
        from openai import OpenAI
        client = OpenAI(api_key=settings.openai_api_key)
        response = client.chat.completions.create(
            model=settings.openai_model,
            response_format={"type": "json_object"},
            temperature=0.2,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )
        text = response.choices[0].message.content or "{}"
        return json.loads(text)
    except Exception:
        return _safe_json_fallback(fallback)

def call_groq_text(system_prompt: str, user_prompt: str, fallback: str) -> str:
    if not settings.groq_api_key:
        return fallback
    try:
        from groq import Groq
        client = Groq(api_key=settings.groq_api_key)
        response = client.chat.completions.create(
            model=settings.groq_model,
            temperature=0.3,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )
        return response.choices[0].message.content or fallback
    except Exception:
        return fallback
