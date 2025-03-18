import api from './index';
import textAnalysisService from './textAnalysisService';

/**
 * Servicio para manejar las operaciones de análisis de texto y documentos
 * Se enfoca en la gestión de análisis (guardar, recuperar, exportar)
 * mientras que textAnalysisService se enfoca en las operaciones de procesamiento de texto
 */
const analysisService = {
  /**
   * Analizar texto ingresado por el usuario y guardar el análisis
   * @param {string} text - Texto a analizar
   * @param {Object} options - Opciones de análisis
   * @returns {Promise} - Promesa con los resultados del análisis
   */
  analyzeText: async (text, options = {}) => {
    try {
      // Primero realizamos el análisis de texto usando el servicio especializado
      const analysisResults = await textAnalysisService.analyzeText(text, options);
      
      // Luego guardamos los resultados en la base de datos
      const response = await api.post('/analysis/save', { 
        text, 
        options,
        results: analysisResults
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Analizar documento subido por el usuario
   * @param {FormData} formData - FormData con el archivo y opciones
   * @param {Function} onProgress - Callback para seguimiento de progreso
   * @returns {Promise} - Promesa con los resultados del análisis
   */
  analyzeDocument: async (formData, onProgress) => {
    try {
      const response = await api.post('/analysis/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un análisis por su ID
   * @param {string} analysisId - ID del análisis
   * @returns {Promise} - Promesa con los datos del análisis
   */
  getAnalysisById: async (analysisId) => {
    try {
      const response = await api.get(`/analysis/${analysisId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los análisis del usuario actual
   * @param {Object} filters - Filtros para la búsqueda
   * @returns {Promise} - Promesa con la lista de análisis
   */
  getUserAnalyses: async (filters = {}) => {
    try {
      const response = await api.get('/analysis/user', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Exportar resultados de análisis en diferentes formatos
   * @param {string} analysisId - ID del análisis
   * @param {string} format - Formato de exportación (pdf, csv, json)
   * @returns {Promise} - Promesa con la URL o blob del archivo exportado
   */
  exportAnalysis: async (analysisId, format = 'pdf') => {
    try {
      const response = await api.get(`/analysis/${analysisId}/export`, {
        params: { format },
        responseType: 'blob'
      });
      
      // Crear URL para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analysis-${analysisId}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return url;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un análisis
   * @param {string} analysisId - ID del análisis a eliminar
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  deleteAnalysis: async (analysisId) => {
    try {
      const response = await api.delete(`/analysis/${analysisId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Compartir un análisis con otros usuarios
   * @param {string} analysisId - ID del análisis a compartir
   * @param {Array} userEmails - Lista de emails de usuarios con quienes compartir
   * @param {Object} permissions - Permisos a otorgar (lectura, edición, etc.)
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  shareAnalysis: async (analysisId, userEmails, permissions = { read: true }) => {
    try {
      const response = await api.post(`/analysis/${analysisId}/share`, {
        userEmails,
        permissions
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Añadir comentarios a un análisis
   * @param {string} analysisId - ID del análisis
   * @param {string} comment - Texto del comentario
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  addComment: async (analysisId, comment) => {
    try {
      const response = await api.post(`/analysis/${analysisId}/comments`, {
        comment
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Obtener comentarios de un análisis
   * @param {string} analysisId - ID del análisis
   * @returns {Promise} - Promesa con los comentarios
   */
  getComments: async (analysisId) => {
    try {
      const response = await api.get(`/analysis/${analysisId}/comments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default analysisService;