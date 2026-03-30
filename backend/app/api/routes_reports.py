from pathlib import Path
from fastapi import APIRouter
from fastapi.responses import FileResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from app.schemas.common import ReportCreateRequest

router = APIRouter()
REPORT_DIR = Path("reports")
REPORT_DIR.mkdir(exist_ok=True)

@router.post("/create")
def create_report(payload: ReportCreateRequest) -> dict:
    file_path = REPORT_DIR / "careeriq_report.pdf"
    c = canvas.Canvas(str(file_path), pagesize=A4)
    width, height = A4

    y = height - 50
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, payload.title)
    y -= 20
    c.setFont("Helvetica", 10)
    c.drawString(50, y, "Created by Raja Abimanyu N — Data Scientist | AI & Applied Machine Learning")
    y -= 30

    for key, value in payload.sections.items():
        c.setFont("Helvetica-Bold", 12)
        c.drawString(50, y, str(key))
        y -= 18
        c.setFont("Helvetica", 10)
        text = value if isinstance(value, str) else ", ".join(map(str, value)) if isinstance(value, list) else str(value)
        for line in [text[i:i+100] for i in range(0, len(text), 100)]:
            c.drawString(60, y, line)
            y -= 14
            if y < 80:
                c.showPage()
                y = height - 50
        y -= 8

    c.save()
    return {"filename": file_path.name, "download_url": f"/api/v1/reports/download/{file_path.name}"}

@router.get("/download/{filename}")
def download_report(filename: str):
    file_path = REPORT_DIR / filename
    return FileResponse(file_path, filename=filename, media_type="application/pdf")
