import uuid
import json
import os
import logging
from typing import Dict, Any, Optional
from datetime import datetime
from app.services.deepseek_service import deepseek_service
from app.models.analysis import Analysis
from app.core.config import settings

logger = logging.getLogger(__name__)

# Directorio para guardar los análisis
ANALYSIS_DIR = os.path.join(settings.UPLOAD_DIR, "analyses")
os.makedirs(ANALYSIS_DIR, exist_ok=True)

async def analyze_text(text: str, analysis_type: str = "general", parameters: Optional[Dict[str, Any]] = None) -> Analysis:
    """
    Analiza un texto usando el servicio de DeepSeek y guarda los resultados
    """
    try:
        # Generar ID único para el análisis
        analysis_id = str(uuid.uuid4())
        
        # Realizar el análisis con DeepSeek
        analysis_result = await deepseek_service.analyze_text(text, analysis_type, parameters)
        
        # Crear objeto de análisis
        analysis = Analysis(
            id=analysis_id,
            analysis_type=analysis_type,
            timestamp=datetime.now().isoformat(),
            result=analysis_result,
            parameters=parameters or {},
            text_sample=text[:500] + "..." if len(text) > 500 else text  # Muestra del texto analizado
        )
        
        # Guardar el análisis en disco
        save_analysis(analysis)
        
        return analysis
        
    except Exception as e:
        logger.error(f"Error en el análisis de texto: {str(e)}")
        raise ValueError(f"Error en el análisis: {str(e)}")

def save_analysis(analysis: Analysis) -> None:
    """
    Guarda un análisis en disco
    """
    try:
        # Crear directorio para este análisis
        analysis_path = os.path.join(ANALYSIS_DIR, analysis.id)
        os.makedirs(analysis_path, exist_ok=True)
        
        # Guardar el análisis como JSON
        with open(os.path.join(analysis_path, "analysis.json"), "w", encoding="utf-8") as f:
            # Convertir el objeto Analysis a un diccionario
            analysis_dict = analysis.dict()
            json.dump(analysis_dict, f, ensure_ascii=False, indent=2)
            
    except Exception as e:
        logger.error(f"Error guardando análisis: {str(e)}")
        # No lanzamos excepción para no interrumpir el flujo

def get_analysis(analysis_id: str) -> Optional[Analysis]:
    """
    Recupera un análisis por su ID
    """
    try:
        analysis_path = os.path.join(ANALYSIS_DIR, analysis_id, "analysis.json")
        
        if not os.path.exists(analysis_path):
            return None
            
        with open(analysis_path, "r", encoding="utf-8") as f:
            analysis_dict = json.load(f)
            
        return Analysis(**analysis_dict)
        
    except Exception as e:
        logger.error(f"Error recuperando análisis {analysis_id}: {str(e)}")
        return None