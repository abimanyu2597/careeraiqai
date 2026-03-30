import json
from sqlalchemy.orm import Session
from app.db.models import SessionHistory

def create_history(db: Session, session_type: str, payload: dict) -> SessionHistory:
    item = SessionHistory(session_type=session_type, payload=json.dumps(payload, ensure_ascii=False))
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
