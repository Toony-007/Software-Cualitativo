from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Body
from fastapi.responses import JSONResponse
from typing import List, Optional
from pydantic import BaseModel
from app.core.security import get_api_key
from app.services.document_processor import process_document
from app.services.analysis_service import analyze_text
from app.services.visualization import generate_visualization
from app.models.document import Document
from app.models.analysis import Analysis

router = APIRouter()

class AnalysisRequest(BaseModel):
    text: str
    analysis_type: str = "general"
    parameters: Optional[dict] = None

@router.post("/upload-document", response_model=Document)
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = Form(...),
    api_key: str = Depends(get_api_key)
):
    """
    Sube un documento para su procesamiento y análisis
    """
    try:
        document = await process_document(file, document_type)
        return document
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error procesando documento: {str(e)}")

@router.post("/analyze", response_model=Analysis)
async def analyze_document(
    analysis_request: AnalysisRequest,
    api_key: str = Depends(get_api_key)
):
    """
    Analiza un texto usando IA
    """
    try:
        analysis_result = await analyze_text(
            analysis_request.text, 
            analysis_request.analysis_type,
            analysis_request.parameters
        )
        return analysis_result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error en el análisis: {str(e)}")

@router.post("/visualize/{analysis_id}")
async def visualize_analysis(
    analysis_id: str,
    visualization_type: str = Body(..., embed=True),
    api_key: str = Depends(get_api_key)
):
    """
    Genera una visualización basada en un análisis previo
    """
    try:
        visualization = await generate_visualization(analysis_id, visualization_type)
        return JSONResponse(content=visualization)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error generando visualización: {str(e)}")

@router.get("/health")
async def health_check():
    """
    Endpoint para verificar el estado de la API
    """
    return {"status": "ok"}