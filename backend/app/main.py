from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import routes_career, routes_resume, routes_match, routes_company, routes_interview, routes_knowledge, routes_reports
from app.core.config import settings
from app.db.session import init_db

app = FastAPI(title=settings.app_name, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event() -> None:
    init_db()

@app.get("/health")
def health() -> dict:
    return {"status": "ok", "app": settings.app_name}

app.include_router(routes_resume.router, prefix="/api/v1/resume", tags=["resume"])
app.include_router(routes_match.router, prefix="/api/v1/match", tags=["match"])
app.include_router(routes_company.router, prefix="/api/v1/company", tags=["company"])
app.include_router(routes_interview.router, prefix="/api/v1/interview", tags=["interview"])
app.include_router(routes_knowledge.router, prefix="/api/v1/knowledge", tags=["knowledge"])
app.include_router(routes_career.router, prefix="/api/v1/career", tags=["career"])
app.include_router(routes_reports.router, prefix="/api/v1/reports", tags=["reports"])
