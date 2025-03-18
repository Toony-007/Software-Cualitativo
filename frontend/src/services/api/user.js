import api from './index';

/**
 * Servicio para manejar operaciones relacionadas con usuarios
 */
const userService = {
  /**
   * Obtener perfil del usuario actual
   * @returns {Promise} - Promesa con los datos del perfil
   */
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar perfil del usuario
   * @param {Object} profileData - Datos del perfil a actualizar
   * @returns {Promise} - Promesa con los datos actualizados
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      
      // Actualizar datos del usuario en localStorage si es necesario
      if (response.data.user) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cambiar contraseña del usuario
   * @param {string} currentPassword - Contraseña actual
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/users/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener historial de actividad del usuario
   * @param {Object} filters - Filtros para la búsqueda
   * @returns {Promise} - Promesa con el historial de actividad
   */
  getActivityHistory: async (filters = {}) => {
    try {
      const response = await api.get('/users/activity', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener estadísticas del usuario
   * @param {Object} options - Opciones para las estadísticas
   * @returns {Promise} - Promesa con las estadísticas
   */
  getUserStats: async (options = {}) => {
    try {
      const response = await api.get('/users/stats', { params: options });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar preferencias del usuario
   * @param {Object} preferences - Preferencias a actualizar
   * @returns {Promise} - Promesa con las preferencias actualizadas
   */
  updatePreferences: async (preferences) => {
    try {
      const response = await api.put('/users/preferences', preferences);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar cuenta de usuario
   * @param {string} password - Contraseña para confirmar eliminación
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  deleteAccount: async (password) => {
    try {
      const response = await api.delete('/users/account', {
        data: { password }
      });
      
      // Limpiar localStorage si la eliminación fue exitosa
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;