from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

class Document(BaseModel):
    """
    Modelo para representar un documento procesado
    """
    id: str = Field(..., description="ID único del documento")
    filename: str = Field(..., description="Nombre original del archivo")
    document_type: str = Field(..., description="Tipo de documento (pdf, docx, txt, csv, json)")
    file_path: str = Field(..., description="Ruta al archivo guardado")
    text_path: str = Field(..., description="Ruta al texto extraído")
    text_content: str = Field(..., description="Contenido textual extraído (puede estar truncado)")
    size_bytes: int = Field(..., description="Tamaño del archivo en bytes")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Metadatos adicionales del documento")
    analysis_ids: Optional[list[str]] = Field(default_factory=list, description="IDs de análisis realizados sobre este documento")