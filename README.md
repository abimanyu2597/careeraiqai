# CareerIQ AI — Created by Raja Abimanyu N

A premium full-stack **GenAI + RAG + career intelligence** web app.

## Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, LangGraph, SQLAlchemy, FAISS-ready design
- **LLMs:** OpenAI + Groq
- **Storage:** SQLite by default (easy local run), PostgreSQL-ready

## Features
- Resume upload + analysis
- JD match with fit score
- Company intelligence
- Mock interview chat
- Career knowledge search
- Full career analysis dashboard
- Premium glassmorphism UI
- Creator branding across pages

## Quick start

### 1) Backend
```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend
Open a new terminal:
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Frontend runs at:
- `http://localhost:3000`

Backend runs at:
- `http://localhost:8000`

## Required env vars

### Backend `.env`
```env
OPENAI_API_KEY=
GROQ_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
GROQ_MODEL=llama-3.3-70b-versatile
DATABASE_URL=sqlite:///./careeriq.db
APP_NAME=CareerIQ AI
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Pages
- `/` Landing page
- `/dashboard` Overview
- `/resume-analyzer`
- `/jd-match`
- `/company-intelligence`
- `/mock-interview`
- `/knowledge-search`
- `/reports`

## Notes
- The backend is built to work with real OpenAI/Groq keys.
- If keys are not present, many endpoints return graceful placeholder analysis so the UI still works for demo/development.
- You can swap SQLite to PostgreSQL later by changing `DATABASE_URL`.

## Creator branding
Use:
> Created by Raja Abimanyu N — Data Scientist | AI & Applied Machine Learning
