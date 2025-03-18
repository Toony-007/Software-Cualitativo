import api from './index';

/**
 * Servicio para manejar las visualizaciones de datos
 */
const visualizationService = {
  /**
   * Obtener datos para visualización de frecuencia de palabras
   * @param {string} analysisId - ID del análisis
   * @param {Object} options - Opciones de configuración
   * @returns {Promise} - Promesa con los datos para la visualización
   */
  getWordFrequency: async (analysisId, options = {}) => {
    try {
      const response = await api.get(`/visualizations/${analysisId}/word-frequency`, {
        params: options
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener datos para visualización de sentimiento
   * @param {string} analysisId - ID del análisis
   * @param {Object} options - Opciones de configuración
   * @returns {Promise} - Promesa con los datos para la visualización
   */
  getSentimentAnalysis: async (analysisId, options = {}) => {
    try {
      const response = await api.get(`/visualizations/${analysisId}/sentiment`, {
        params: options
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener datos para visualización de entidades
   * @param {string} analysisId - ID del análisis
   * @param {Object} options - Opciones de configuración
   * @returns {Promise} - Promesa con los datos para la visualización
   */
  getEntityAnalysis: async (analysisId, options = {}) => {
    try {
      const response = await api.get(`/visualizations/${analysisId}/entities`, {
        params: options
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener datos para visualización de temas
   * @param {string} analysisId - ID del análisis
   * @param {Object} options - Opciones de configuración
   * @returns {Promise} - Promesa con los datos para la visualización
   */
  getTopicAnalysis: async (analysisId, options = {}) => {
    try {
      const response = await api.get(`/visualizations/${analysisId}/topics`, {
        params: options
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener datos para visualización de relaciones entre palabras
   * @param {string} analysisId - ID del análisis
   * @param {Object} options - Opciones de configuración
   * @returns {Promise} - Promesa con los datos para la visualización
   */
  getWordRelations: async (analysisId, options = {}) => {
    try {
      const response = await api.get(`/visualizations/${analysisId}/word-relations`, {
        params: options
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener datos para visualización de comparación entre documentos
   * @param {Array} analysisIds - Array de IDs de análisis a comparar
   * @param {Object} options - Opciones de configuración
   * @returns {Promise} - Promesa con los datos para la visualización
   */
  getDocumentComparison: async (analysisIds, options = {}) => {
    try {
      const response = await api.post('/visualizations/document-comparison', {
        analysisIds,
        options
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Guardar una visualización personalizada
   * @param {Object} visualizationData - Datos de la visualización
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  saveCustomVisualization: async (visualizationData) => {
    try {
      const response = await api.post('/visualizations/custom', visualizationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener visualizaciones guardadas del usuario
   * @returns {Promise} - Promesa con la lista de visualizaciones
   */
  getSavedVisualizations: async () => {
    try {
      const response = await api.get('/visualizations/saved');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default visualizationService;