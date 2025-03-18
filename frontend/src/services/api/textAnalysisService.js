import api from './index';

/**
 * Servicio especializado para el análisis de texto
 */
const textAnalysisService = {
  /**
   * Analizar texto para extraer información lingüística
   * @param {string} text - Texto a analizar
   * @param {Object} options - Opciones de análisis
   * @returns {Promise} - Promesa con los resultados del análisis
   */
  analyzeText: async (text, options = {}) => {
    try {
      const response = await api.post('/text-analysis/analyze', { 
        text, 
        options 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Extraer palabras clave del texto
   * @param {string} text - Texto para extraer palabras clave
   * @param {Object} options - Opciones de extracción (cantidad, relevancia mínima, etc.)
   * @returns {Promise} - Promesa con las palabras clave extraídas
   */
  extractKeywords: async (text, options = {}) => {
    try {
      const response = await api.post('/text-analysis/keywords', { 
        text, 
        options 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Analizar el sentimiento del texto
   * @param {string} text - Texto para analizar sentimiento
   * @param {Object} options - Opciones de análisis
   * @returns {Promise} - Promesa con el análisis de sentimiento
   */
  analyzeSentiment: async (text, options = {}) => {
    try {
      const response = await api.post('/text-analysis/sentiment', { 
        text, 
        options 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Extraer entidades nombradas del texto (personas, lugares, organizaciones, etc.)
   * @param {string} text - Texto para extraer entidades
   * @param {Object} options - Opciones de extracción
   * @returns {Promise} - Promesa con las entidades extraídas
   */
  extractEntities: async (text, options = {}) => {
    try {
      const response = await api.post('/text-analysis/entities', { 
        text, 
        options 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Resumir texto automáticamente
   * @param {string} text - Texto a resumir
   * @param {Object} options - Opciones de resumen (longitud, método, etc.)
   * @returns {Promise} - Promesa con el resumen generado
   */
  summarizeText: async (text, options = {}) => {
    try {
      const response = await api.post('/text-analysis/summarize', { 
        text, 
        options 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Clasificar texto en categorías predefinidas
   * @param {string} text - Texto a clasificar
   * @param {Array} categories - Categorías disponibles (opcional)
   * @returns {Promise} - Promesa con las categorías asignadas
   */
  classifyText: async (text, categories = []) => {
    try {
      const response = await api.post('/text-analysis/classify', { 
        text, 
        categories 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Detectar el idioma del texto
   * @param {string} text - Texto para detectar idioma
   * @returns {Promise} - Promesa con el idioma detectado
   */
  detectLanguage: async (text) => {
    try {
      const response = await api.post('/text-analysis/language', { text });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Analizar la legibilidad del texto
   * @param {string} text - Texto para analizar legibilidad
   * @param {string} language - Idioma del texto (opcional)
   * @returns {Promise} - Promesa con métricas de legibilidad
   */
  analyzeReadability: async (text, language = 'es') => {
    try {
      const response = await api.post('/text-analysis/readability', { 
        text, 
        language 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default textAnalysisService;