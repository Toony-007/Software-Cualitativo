import axios from 'axios';

// Crear una instancia de axios con configuración predeterminada
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos de tiempo de espera
});

// Interceptor de solicitud para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores comunes
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar casos específicos de error
    if (error.response) {
      // El servidor respondió con un estado de error
      if (error.response.status === 401) {
        // No autorizado - limpiar almacenamiento local y redirigir al login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        // Prohibido - el usuario no tiene permisos
        console.error('Acceso prohibido:', error.response.data.message || 'No tienes permisos para realizar esta acción');
      } else if (error.response.status === 404) {
        // No encontrado
        console.error('Recurso no encontrado:', error.response.data.message || 'El recurso solicitado no existe');
      } else if (error.response.status === 500) {
        // Error del servidor
        console.error('Error del servidor:', error.response.data.message || 'Ha ocurrido un error en el servidor');
      }
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error('No se recibió respuesta:', error.request);
    } else {
      // Algo ocurrió al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

// Exportar servicios individuales
export { default as authService } from './auth';
export { default as analysisService } from './analysis';
export { default as visualizationService } from './visualization';
export { default as userService } from './user';
export { default as textAnalysisService } from './textAnalysisService';

// Exportar la instancia de API por defecto
export default api;