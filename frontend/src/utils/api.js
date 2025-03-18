import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.REACT_APP_API_KEY || ''
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// Funciones para interactuar con la API
export const uploadDocument = async (file, documentType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('document_type', documentType);
  
  const response = await api.post('/upload-document', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export const analyzeText = async (text, analysisType, parameters = {}) => {
  const response = await api.post('/analyze', {
    text,
    analysis_type: analysisType,
    parameters
  });
  
  return response.data;
};

export const getVisualization = async (analysisId, visualizationType) => {
  const response = await api.post(`/visualize/${analysisId}`, {
    visualization_type: visualizationType
  });
  
  return response.data;
};

export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;