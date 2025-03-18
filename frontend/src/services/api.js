import axios from 'axios';

// Configuración base de axios
// En producción, esto apunta a la ruta relativa /api que será manejada por nginx
axios.defaults.baseURL = '/api';

// Servicio de análisis de texto
export const textAnalysisService = {
  // Analizar texto con múltiples opciones
  analyzeText: async (text, options) => {
    const response = await axios.post('/text-analysis/analyze', {
      text,
      options
    });
    return response.data;
  },
  
  // Extraer palabras clave del texto
  extractKeywords: async (text, options) => {
    const response = await axios.post('/text-analysis/keywords', {
      text,
      options
    });
    return response.data;
  },
  
  // Analizar el sentimiento del texto
  analyzeSentiment: async (text, options) => {
    const response = await axios.post('/text-analysis/sentiment', {
      text,
      options
    });
    return response.data;
  },
  
  // Extraer entidades del texto
  extractEntities: async (text, options) => {
    const response = await axios.post('/text-analysis/entities', {
      text,
      options
    });
    return response.data;
  },
  
  // Resumir texto
  summarizeText: async (text, options) => {
    const response = await axios.post('/text-analysis/summarize', {
      text,
      options
    });
    return response.data;
  }
};

// Servicio de documentos
export const documentService = {
  // Subir un documento
  uploadDocument: async (file, options) => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options) {
      formData.append('options', JSON.stringify(options));
    }
    
    const response = await axios.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  // Obtener un documento por ID
  getDocument: async (documentId) => {
    const response = await axios.get(`/documents/${documentId}`);
    return response.data;
  },
  
  // Obtener análisis de un documento
  getDocumentAnalysis: async (documentId, options) => {
    const response = await axios.get(`/documents/${documentId}/analysis`, {
      params: options
    });
    return response.data;
  }
};

// Servicio de usuario
export const userService = {
  // Iniciar sesión
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },
  
  // Registrar usuario
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  },
  
  // Obtener perfil de usuario
  getProfile: async () => {
    const response = await axios.get('/users/profile');
    return response.data;
  },
  
  // Actualizar perfil de usuario
  updateProfile: async (userData) => {
    const response = await axios.put('/users/profile', userData);
    return response.data;
  }
};