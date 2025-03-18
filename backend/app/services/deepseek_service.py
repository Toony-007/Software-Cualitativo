import httpx
import json
import logging
from typing import Dict, Any, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

class DeepSeekService:
    """
    Servicio para interactuar con la API de DeepSeek
    """
    def __init__(self):
        self.api_key = settings.DEEPSEEK_API_KEY
        self.api_url = settings.DEEPSEEK_API_URL
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def analyze_text(self, text: str, analysis_type: str, parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Envía texto a DeepSeek para su análisis
        """
        if not self.api_key:
            raise ValueError("DeepSeek API key no configurada")
        
        # Construir el prompt según el tipo de análisis
        prompt = self._build_prompt(text, analysis_type, parameters)
        
        # Preparar la solicitud
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {"role": "system", "content": "Eres un asistente especializado en análisis cualitativo de textos."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 2000
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.api_url}/chat/completions",
                    headers=self.headers,
                    json=payload,
                    timeout=60.0
                )
                
                response.raise_for_status()
                result = response.json()
                
                # Procesar la respuesta
                return self._process_response(result, analysis_type)
                
        except httpx.HTTPStatusError as e:
            logger.error(f"Error HTTP en DeepSeek API: {e}")
            raise ValueError(f"Error en la API de DeepSeek: {e.response.text}")
        except httpx.RequestError as e:
            logger.error(f"Error de conexión con DeepSeek API: {e}")
            raise ValueError(f"Error de conexión con la API de DeepSeek: {str(e)}")
        except Exception as e:
            logger.error(f"Error inesperado en DeepSeek API: {e}")
            raise ValueError(f"Error inesperado: {str(e)}")
    
    def _build_prompt(self, text: str, analysis_type: str, parameters: Optional[Dict[str, Any]]) -> str:
        """
        Construye el prompt adecuado según el tipo de análisis
        """
        base_prompt = f"Analiza el siguiente texto desde una perspectiva {analysis_type}:\n\n{text}\n\n"
        
        if analysis_type == "general":
            return base_prompt + "Proporciona un análisis general identificando temas principales, sentimientos y conclusiones clave. Devuelve el resultado en formato JSON con las siguientes claves: temas, sentimientos, conclusiones."
        
        elif analysis_type == "tematico":
            return base_prompt + "Identifica y clasifica los temas principales presentes en el texto. Para cada tema, proporciona citas relevantes. Devuelve el resultado en formato JSON con la siguiente estructura: {\"temas\": [{\"nombre\": \"nombre_tema\", \"descripcion\": \"descripcion_breve\", \"citas\": [\"cita1\", \"cita2\"]}]}"
        
        elif analysis_type == "sentimiento":
            return base_prompt + "Realiza un análisis de sentimiento detallado, identificando emociones, tono y polaridad. Devuelve el resultado en formato JSON con las siguientes claves: polaridad_general (positiva/negativa/neutra con valor numérico de -1 a 1), emociones_detectadas (lista de emociones con su intensidad), tono_comunicativo."
        
        elif analysis_type == "discurso":
            return base_prompt + "Analiza el discurso identificando estructuras argumentativas, retórica y posicionamiento. Devuelve el resultado en formato JSON con las siguientes claves: argumentos_principales, recursos_retoricos, posicionamiento_ideologico."
        
        else:
            # Análisis personalizado basado en parámetros
            custom_instructions = parameters.get("instructions", "Realiza un análisis detallado") if parameters else "Realiza un análisis detallado"
            return base_prompt + f"{custom_instructions}. Devuelve el resultado en formato JSON estructurado."
    
    def _process_response(self, api_response: Dict[str, Any], analysis_type: str) -> Dict[str, Any]:
        """
        Procesa la respuesta de la API y extrae la información relevante
        """
        try:
            # Extraer el contenido de la respuesta
            content = api_response.get("choices", [{}])[0].get("message", {}).get("content", "")
            
            # Intentar extraer el JSON de la respuesta
            # Buscar el primer '{' y el último '}'
            start_idx = content.find('{')
            end_idx = content.rfind('}')
            
            if start_idx != -1 and end_idx != -1:
                json_str = content[start_idx:end_idx+1]
                result = json.loads(json_str)
            else:
                # Si no hay formato JSON, devolver el texto como análisis
                result = {"analysis": content, "format": "text"}
            
            # Añadir metadatos
            result["analysis_type"] = analysis_type
            result["model_used"] = api_response.get("model", "deepseek-chat")
            
            return result
            
        except json.JSONDecodeError:
            # Si no se puede decodificar como JSON, devolver el texto completo
            return {
                "analysis": content,
                "analysis_type": analysis_type,
                "format": "text",
                "model_used": api_response.get("model", "deepseek-chat")
            }
        except Exception as e:
            logger.error(f"Error procesando respuesta de DeepSeek: {e}")
            return {
                "error": "Error procesando la respuesta",
                "raw_content": content if 'content' in locals() else "No content available"
            }

# Instancia del servicio para uso en la aplicación
deepseek_service = DeepSeekService()