import api from './index';

/**
 * Servicio para manejar la autenticación de usuarios
 */
const authService = {
  /**
   * Iniciar sesión con email y contraseña
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Registrar un nuevo usuario
   * @param {Object} userData - Datos del usuario a registrar
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cerrar sesión del usuario actual
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Obtener el usuario actualmente autenticado
   * @returns {Object|null} - Datos del usuario o null si no hay sesión
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} - true si el usuario está autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Solicitar restablecimiento de contraseña
   * @param {string} email - Email del usuario
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post('/auth/request-reset', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Restablecer contraseña con token
   * @param {string} token - Token de restablecimiento
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        token, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;