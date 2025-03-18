import os
from pydantic import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Configuración general
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Qualitative AI Analyzer"
    
    # Configuración de seguridad
    API_KEY_NAME: str = "X-API-Key"
    API_KEYS: List[str] = [os.getenv("API_KEY", "default_dev_key")]
    
    # Configuración de CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # Frontend en desarrollo
        "http://localhost:8080",
        "https://qualitative-ai-analyzer.example.com",  # Producción
    ]
    
    # Configuración de DeepSeek
    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "")
    DEEPSEEK_API_URL: str = "https://api.deepseek.com/v1"
    
    # Configuración de almacenamiento
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "/tmp/qualitative-ai-analyzer")
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()