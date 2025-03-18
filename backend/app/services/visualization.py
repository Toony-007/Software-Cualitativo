import json
import logging
from typing import Dict, Any, Optional
from app.services.analysis_service import get_analysis

logger = logging.getLogger(__name__)

async def generate_visualization(analysis_id: str, visualization_type: str) -> Dict[str, Any]:
    """
    Genera una visualización basada en un análisis previo
    """
    # Recuperar el análisis
    analysis = get_analysis(analysis_id)
    if not analysis:
        raise ValueError(f"Análisis con ID {analysis_id} no encontrado")
    
    # Generar la visualización según el tipo solicitado
    if visualization_type == "word_cloud":
        return generate_word_cloud(analysis)
    elif visualization_type == "sentiment_chart":
        return generate_sentiment_chart(analysis)
    elif visualization_type == "theme_network":
        return generate_theme_network(analysis)
    elif visualization_type == "summary_dashboard":
        return generate_summary_dashboard(analysis)
    else:
        raise ValueError(f"Tipo de visualización no soportado: {visualization_type}")

def generate_word_cloud(analysis) -> Dict[str, Any]:
    """
    Genera datos para una nube de palabras
    """
    try:
        # Extraer palabras relevantes del análisis
        words = []
        
        # Si el análisis es temático, usar los temas identificados
        if analysis.analysis_type == "tematico" and "temas" in analysis.result:
            for tema in analysis.result["temas"]:
                words.append({
                    "text": tema["nombre"],
                    "value": 10  # Valor base alto para temas
                })
                
                # Añadir palabras de la descripción
                if "descripcion" in tema:
                    for word in tema["descripcion"].split():
                        if len(word) > 3:  # Filtrar palabras cortas
                            words.append({
                                "text": word,
                                "value": 5  # Valor medio para palabras de descripción
                            })
        
        # Si el análisis es de sentimiento, usar las emociones detectadas
        elif analysis.analysis_type == "sentimiento" and "emociones_detectadas" in analysis.result:
            for emocion in analysis.result["emociones_detectadas"]:
                if isinstance(emocion, dict) and "nombre" in emocion and "intensidad" in emocion:
                    words.append({
                        "text": emocion["nombre"],
                        "value": int(emocion["intensidad"] * 10)  # Convertir intensidad a valor
                    })
                elif isinstance(emocion, str):
                    words.append({
                        "text": emocion,
                        "value": 7  # Valor predeterminado
                    })
        
        # Para análisis general, extraer palabras clave
        else:
            # Extraer palabras de cualquier campo de texto en el resultado
            for key, value in analysis.result.items():
                if isinstance(value, str):
                    for word in value.split():
                        if len(word) > 3:  # Filtrar palabras cortas
                            words.append({
                                "text": word,
                                "value": 3  # Valor base para palabras generales
                            })
                elif isinstance(value, list) and all(isinstance(item, str) for item in value):
                    for item in value:
                        for word in item.split():
                            if len(word) > 3:
                                words.append({
                                    "text": word,
                                    "value": 3
                                })
        
        # Combinar palabras duplicadas sumando sus valores
        word_dict = {}
        for word_obj in words:
            text = word_obj["text"].lower()
            if text in word_dict:
                word_dict[text] += word_obj["value"]
            else:
                word_dict[text] = word_obj["value"]
        
        # Convertir de nuevo a lista
        combined_words = [{"text": text, "value": value} for text, value in word_dict.items()]
        
        # Ordenar por valor descendente y limitar a 100 palabras
        combined_words.sort(key=lambda x: x["value"], reverse=True)
        combined_words = combined_words[:100]
        
        return {
            "type": "word_cloud",
            "data": combined_words,
            "title": f"Nube de palabras - {analysis.analysis_type.capitalize()}",
            "analysis_id": analysis.id
        }
        
    except Exception as e:
        logger.error(f"Error generando nube de palabras: {str(e)}")
        return {
            "type": "word_cloud",
            "data": [],
            "title": "Error generando nube de palabras",
            "error": str(e)
        }

def generate_sentiment_chart(analysis) -> Dict[str, Any]:
    """
    Genera datos para un gráfico de sentimiento
    """
    try:
        # Datos para el gráfico
        chart_data = {
            "labels": [],
            "datasets": [
                {
                    "label": "Sentimiento",
                    "data": [],
                    "backgroundColor": []
                }
            ]
        }
        
        # Si es un análisis de sentimiento, usar la polaridad y emociones
        if analysis.analysis_type == "sentimiento":
            if "polaridad_general" in analysis.result:
                polaridad = analysis.result["polaridad_general"]
                if isinstance(polaridad, (int, float)):
                    # Convertir polaridad a escala 0-100
                    valor_normalizado = (polaridad + 1) * 50
                    chart_data["labels"].append("Polaridad")
                    chart_data["datasets"][0]["data"].append(valor_normalizado)
                    
                    # Color según polaridad
                    if polaridad > 0.3:
                        chart_data["datasets"][0]["backgroundColor"].append("rgba(75, 192, 192, 0.6)")  # Verde
                    elif polaridad < -0.3:
                        chart_data["datasets"][0]["backgroundColor"].append("rgba(255, 99, 132, 0.6)")  # Rojo
                    else:
                        chart_data["datasets"][0]["backgroundColor"].append("rgba(255, 206, 86, 0.6)")  # Amarillo
            
            # Añadir emociones si están disponibles
            if "emociones_detectadas" in analysis.result:
                emociones = analysis.result["emociones_detectadas"]
                if isinstance(emociones, list):
                    for emocion in emociones:
                        if isinstance(emocion, dict) and "nombre" in emocion and "intensidad" in emocion:
                            chart_data["labels"].append(emocion["nombre"])
                            # Convertir intensidad a escala 0-100
                            chart_data["datasets"][0]["data"].append(emocion["intensidad"] * 100)
                            
                            # Colores para emociones comunes
                            color_map = {
                                "alegría": "rgba(75, 192, 192, 0.6)",
                                "tristeza": "rgba(54, 162, 235, 0.6)",
                                "enojo": "rgba(255, 99, 132, 0.6)",
                                "miedo": "rgba(255, 159, 64, 0.6)",
                                "sorpresa": "rgba(153, 102, 255, 0.6)",
                                "disgusto": "rgba(255, 206, 86, 0.6)",
                                "neutral": "rgba(201, 203, 207, 0.6)"
                            }
                            
                            nombre_emocion = emocion["nombre"].lower()
                            color = next((color_map[key] for key in color_map if key in nombre_emocion), "rgba(75, 192, 192, 0.6)")
                            chart_data["datasets"][0]["backgroundColor"].append(color)
        
        # Para otros tipos de análisis, intentar extraer información de sentimiento
        else:
            # Buscar campos que puedan contener información de sentimiento
            sentiment_keys = ["sentimiento", "emocion", "tono", "polaridad"]
            for key in analysis.result:
                if any(sk in key.lower() for sk in sentiment_keys):
                    value = analysis.result[key]
                    if isinstance(value, (int, float)):
                        chart_data["labels"].append(key)
                        chart_data["datasets"][0]["data"].append(value * 100 if -1 <= value <= 1 else value)
                        chart_data["datasets"][0]["backgroundColor"].append("rgba(75, 192, 192, 0.6)")
                    elif isinstance(value, str):
                        # Mapear valores textuales a numéricos
                        sentiment_map = {
                            "positivo": 75,
                            "negativo": 25,
                            "neutral": 50,
                            "muy positivo": 90,
                            "muy negativo": 10
                        }
                        for sentiment, score in sentiment_map.items():
                            if sentiment in value.lower():
                                chart_data["labels"].append(key)
                                chart_data["datasets"][0]["data"].append(score)
                                chart_data["datasets"][0]["backgroundColor"].append("rgba(75, 192, 192, 0.6)")
                                break
        
        # Si no se encontraron datos, proporcionar un mensaje
        if not chart_data["labels"]:
            chart_data["labels"] = ["No hay datos de sentimiento disponibles"]
            chart_data["datasets"][0]["data"] = [0]
            chart_data["datasets"][0]["backgroundColor"] = ["rgba(201, 203, 207, 0.6)"]
        
        return {
            "type": "sentiment_chart",
            "data": chart_data,
            "title": f"Análisis de Sentimiento - {analysis.analysis_type.capitalize()}",
            "analysis_id": analysis.id
        }
        
    except Exception as e:
        logger.error(f"Error generando gráfico de sentimiento: {str(e)}")
        return {
            "type": "sentiment_chart",
            "data": {
                "labels": ["Error"],
                "datasets": [{"label": "Error", "data": [0], "backgroundColor": ["rgba(255, 99, 132, 0.6)"]}]
            },
            "title": "Error generando gráfico de sentimiento",
            "error": str(e)
        }

def generate_theme_network(analysis) -> Dict[str, Any]:
    """
    Genera datos para una red de temas relacionados
    """
    try:
        # Estructura para la red
        network_data = {
            "nodes": [],
            "links": []
        }
        
        # Si es un análisis temático, usar los temas identificados
        if analysis.analysis_type == "tematico" and "temas" in analysis.result:
            # Añadir nodos para cada tema
            for i, tema in enumerate(analysis.result["temas"]):
                if isinstance(tema, dict) and "nombre" in tema:
                    network_data["nodes"].append({
                        "id": i,
                        "name": tema["nombre"],
                        "value": 10,  # Tamaño del nodo
                        "group": 1    # Grupo principal para temas
                    })
                    
                    # Si hay citas, añadirlas como nodos secundarios
                    if "citas" in tema and isinstance(tema["citas"], list):
                        for j, cita in enumerate(tema["citas"]):
                            if isinstance(cita, str):
                                # Limitar longitud de la cita para visualización
                                cita_corta = cita[:50] + "..." if len(cita) > 50 else cita
                                node_id = f"{i}-{j}"
                                network_data["nodes"].append({
                                    "id": node_id,
                                    "name": cita_corta,
                                    "value": 5,  # Tamaño menor para citas
                                    "group": 2   # Grupo secundario para citas
                                })
                                
                                # Enlazar cita con su tema
                                network_data["links"].append({
                                    "source": i,
                                    "target": node_id,
                                    "value": 1  # Fuerza del enlace
                                })
        
        # Para análisis de discurso, usar argumentos y recursos
        elif analysis.analysis_type == "discurso":
            # Añadir nodo central
            network_data["nodes"].append({
                "id": "discurso",
                "name": "Análisis de Discurso",
                "value": 15,
                "group": 0
            })
            
            # Añadir argumentos principales
            if "argumentos_principales" in analysis.result:
                argumentos = analysis.result["argumentos_principales"]
                if isinstance(argumentos, list):
                    for i, arg in enumerate(argumentos):
                        if isinstance(arg, str):
                            arg_corto = arg[:50] + "..." if len(arg) > 50 else arg
                            node_id = f"arg-{i}"
                            network_data["nodes"].append({
                                "id": node_id,
                                "name": arg_corto,
                                "value": 8,
                                "group": 1
                            })
                            network_data["links"].append({
                                "source": "discurso",
                                "target": node_id,
                                "value": 2
                            })
            
            # Añadir recursos retóricos
            if "recursos_retoricos" in analysis.result:
                recursos = analysis.result["recursos_retoricos"]
                if isinstance(recursos, list):
                    for i, rec in enumerate(recursos):
                        if isinstance(rec, str):
                            node_id = f"rec-{i}"
                            network_data["nodes"].append({
                                "id": node_id,
                                "name": rec,
                                "value": 6,
                                "group": 2
                            })
                            network_data["links"].append({
                                "source": "discurso",
                                "target": node_id,
                                "value": 1
                            })
        
        # Para análisis general, extraer temas y conceptos clave
        else:
            # Añadir nodo central
            network_data["nodes"].append({
                "id": "analisis",
                "name": "Análisis General",
                "value": 15,
                "group": 0
            })
            
            # Buscar campos que puedan contener temas o conceptos
            for key, value in analysis.result.items():
                if key not in ["analysis_type", "model_used", "format"]:
                    if isinstance(value, list):
                        for i, item in enumerate(value):
                            if isinstance(item, str):
                                item_corto = item[:50] + "..." if len(item) > 50 else item
                                node_id = f"{key}-{i}"
                                network_data["nodes"].append({
                                    "id": node_id,
                                    "name": item_corto,
                                    "value": 7,
                                    "group": 1
                                })
                                network_data["links"].append({
                                    "source": "analisis",
                                    "target": node_id,
                                    "value": 1
                                })
                    elif isinstance(value, str):
                        value_corto = value[:50] + "..." if len(value) > 50 else value
                        network_data["nodes"].append({
                            "id": key,
                            "name": f"{key}: {value_corto}",
                            "value": 7,
                            "group": 1
                        })
                        network_data["links"].append({
                            "source": "analisis",
                            "target": key,
                            "value": 1
                        })
        
        # Si no se encontraron datos, proporcionar un mensaje
        if not network_data["nodes"]:
            network_data["nodes"].append({
                "id": "no-data",
                "name": "No hay datos temáticos disponibles",
                "value": 10,
                "group": 0
            })
        
        return {
            "type": "theme_network",
            "data": network_data,
            "title": f"Red Temática - {analysis.analysis_type.capitalize()}",
            "analysis_id": analysis.id
        }
        
    except Exception as e:
        logger.error(f"Error generando red temática: {str(e)}")
        return {
            "type": "theme_network",
            "data": {
                "nodes": [{"id": "error", "name": "Error", "value": 10, "group": 0}],
                "links": []
            },
            "title": "Error generando red temática",
            "error": str(e)
        }

def generate_summary_dashboard(analysis) -> Dict[str, Any]:
    """
    Genera un dashboard resumido con múltiples visualizaciones
    """
    try:
        # Combinar diferentes visualizaciones
        word_cloud = generate_word_cloud(analysis)
        sentiment_chart = generate_sentiment_chart(analysis)
        theme_network = generate_theme_network(analysis)
        
        # Extraer información clave del análisis
        key_insights = extract_key_insights(analysis)
        
        return {
            "type": "summary_dashboard",
            "title": f"Dashboard de Análisis - {analysis.analysis_type.capitalize()}",
            "analysis_id": analysis.id,
            "timestamp": analysis.timestamp,
            "analysis_type": analysis.analysis_type,
            "visualizations": {
                "word_cloud": word_cloud["data"],
                "sentiment_chart": sentiment_chart["data"],
                "theme_network": theme_network["data"]
            },
            "key_insights": key_insights
        }
        
    except Exception as e:
        logger.error(f"Error generando dashboard: {str(e)}")
        return {
            "type": "summary_dashboard",
            "title": "Error generando dashboard",
            "error": str(e),
            "analysis_id": analysis.id
        }

def extract_key_insights(analysis) -> Dict[str, Any]:
    """
    Extrae información clave del análisis para el dashboard
    """
    insights = {
        "summary": "No se pudo extraer un resumen del análisis",
        "key_points": [],
        "recommendations": []
    }
    
    try:
        # Extraer resumen según el tipo de análisis
        if analysis.analysis_type == "general":
            if "conclusiones" in analysis.result:
                insights["summary"] = analysis.result["conclusiones"]
            if "temas" in analysis.result and isinstance(analysis.result["temas"], list):
                insights["key_points"] = analysis.result["temas"]
                
        elif analysis.analysis_type == "tematico":
            if "temas" in analysis.result:
                temas = analysis.result["temas"]
                if isinstance(temas, list) and temas:
                    insights["summary"] = f"Se identificaron {len(temas)} temas principales"
                    insights["key_points"] = [tema["nombre"] for tema in temas if isinstance(tema, dict) and "nombre" in tema]
                    
        elif analysis.analysis_type == "sentimiento":
            if "polaridad_general" in analysis.result:
                polaridad = analysis.result["polaridad_general"]
                if isinstance(polaridad, (int, float)):
                    if polaridad > 0.3:
                        insights["summary"] = "Sentimiento general positivo"
                    elif polaridad < -0.3:
                        insights["summary"] = "Sentimiento general negativo"
                    else:
                        insights["summary"] = "Sentimiento general neutral"
                        
            if "emociones_detectadas" in analysis.result:
                emociones = analysis.result["emociones_detectadas"]
                if isinstance(emociones, list):
                    insights["key_points"] = [
                        f"{emocion['nombre']}: {emocion['intensidad']}" 
                        if isinstance(emocion, dict) and "nombre" in emocion and "intensidad" in emocion
                        else str(emocion)
                        for emocion in emociones
                    ]
                    
        elif analysis.analysis_type == "discurso":
            if "posicionamiento_ideologico" in analysis.result:
                insights["summary"] = analysis.result["posicionamiento_ideologico"]
            if "argumentos_principales" in analysis.result:
                insights["key_points"] = analysis.result["argumentos_principales"]
                
        # Generar recomendaciones genéricas basadas en el tipo de análisis
        if analysis.analysis_type == "general":
            insights["recommendations"] = [
                "Profundizar en los temas principales identificados",
                "Considerar un análisis de sentimiento para evaluar la recepción emocional",
                "Explorar las relaciones entre los diferentes temas"
            ]
        elif analysis.analysis_type == "tematico":
            insights["recommendations"] = [
                "Realizar un análisis de frecuencia de aparición de cada tema",
                "Explorar las conexiones entre temas relacionados",
                "Considerar un análisis temporal para ver la evolución de los temas"
            ]
        elif analysis.analysis_type == "sentimiento":
            insights["recommendations"] = [
                "Identificar los factores que influyen en las emociones detectadas",
                "Comparar con análisis de sentimiento de textos similares",
                "Considerar un análisis de discurso para entender el contexto emocional"
            ]
        elif analysis.analysis_type == "discurso":
            insights["recommendations"] = [
                "Analizar la efectividad de los recursos retóricos identificados",
                "Comparar con discursos similares para identificar patrones",
                "Considerar un análisis de audiencia para evaluar el impacto potencial"
            ]
            
        return insights
        
    except Exception as e:
        logger.error(f"Error extrayendo insights: {str(e)}")
        return insights