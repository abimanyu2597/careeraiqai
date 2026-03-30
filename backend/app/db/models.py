from sqlalchemy import Column, DateTime, Integer, String, Text, func
from app.db.session import Base

class SessionHistory(Base):
    __tablename__ = "session_history"

    id = Column(Integer, primary_key=True, index=True)
    session_type = Column(String(80), nullable=False)
    payload = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
