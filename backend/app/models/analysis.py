from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

class Analysis(BaseModel):
    """
    Modelo para representar un análisis de texto
    """
    id: str = Field(..., description="ID único del análisis")
    analysis_type: str = Field(..., description="Tipo de análisis (general, tematico, sentimiento, discurso)")
    timestamp: str = Field(..., description="Marca de tiempo del análisis")
    result: Dict[str, Any] = Field(..., description="Resultado del análisis")
    parameters: Dict[str, Any] = Field(default_factory=dict, description="Parámetros utilizados para el análisis")
    text_sample: str = Field(..., description="Muestra del texto analizado (puede estar truncado)")
    document_id: Optional[str] = Field(None, description="ID del documento analizado, si aplica")