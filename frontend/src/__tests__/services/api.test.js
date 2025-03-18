import axios from 'axios';
import api from '../../services/api';
import { authService, analysisService, textAnalysisService } from '../../services/api';

// Mock axios
jest.mock('axios');

// Mock textAnalysisService
jest.mock('../../services/api/textAnalysisService', () => ({
  analyzeText: jest.fn()
}));

describe('API Service', () => {
  beforeEach(() => {
    // Limpiar todos los mocks
    jest.clearAllMocks();
    
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Mock location
    delete window.location;
    window.location = { href: '' };
  });
  
  describe('API Instance', () => {
    test('debe crear una instancia de axios con la configuración correcta', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: expect.any(String),
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });
    });
    
    test('debe agregar el token de autenticación a las solicitudes si existe', () => {
      // Simular que hay un token en localStorage
      localStorage.getItem.mockReturnValueOnce('test-token');
      
      // Obtener el interceptor de solicitud
      const requestInterceptor = api.interceptors.request.use.mock.calls[0][0];
      
      // Crear una configuración de prueba
      const config = { headers: {} };
      
      // Ejecutar el interceptor
      const result = requestInterceptor(config);
      
      // Verificar que se agregó el token
      expect(result.headers['Authorization']).toBe('Bearer test-token');
    });
    
    test('debe manejar errores 401 redirigiendo al login', () => {
      // Obtener el interceptor de respuesta
      const responseErrorInterceptor = api.interceptors.response.use.mock.calls[0][1];
      
      // Crear un error de prueba con estado 401
      const error = {
        response: {
          status: 401,
          data: { message: 'No autorizado' }
        }
      };
      
      // Ejecutar el interceptor
      expect(() => responseErrorInterceptor(error)).toThrow();
      
      // Verificar que se limpia localStorage y se redirige
      expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(window.location.href).toBe('/login');
    });
  });
  
  describe('Auth Service', () => {
    test('login debe guardar el token y usuario en localStorage', async () => {
      // Mock de respuesta exitosa
      const mockResponse = {
        data: {
          token: 'test-token',
          user: { id: 1, name: 'Test User' }
        }
      };
      
      axios.post.mockResolvedValueOnce(mockResponse);
      
      // Llamar a login
      const result = await authService.login('test@example.com', 'password');
      
      // Verificar que se llamó a la API correctamente
      expect(axios.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password'
      });
      
      // Verificar que se guardaron los datos en localStorage
      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'test-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ id: 1, name: 'Test User' }));
      
      // Verificar que se devolvieron los datos correctos
      expect(result).toEqual(mockResponse.data);
    });
    
    test('logout debe eliminar datos de localStorage', () => {
      // Llamar a logout
      authService.logout();
      
      // Verificar que se eliminaron los datos
      expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });
  
  describe('Analysis Service', () => {
    test('analyzeText debe usar textAnalysisService y guardar los resultados', async () => {
      // Mock de respuesta exitosa de textAnalysisService
      const mockAnalysisResults = {
        sentiment: { positive: 0.8, negative: 0.2 },
        entities: ['Madrid', 'Juan']
      };
      textAnalysisService.analyzeText.mockResolvedValueOnce(mockAnalysisResults);
      
      // Mock de respuesta exitosa de la API
      const mockResponse = {
        data: {
          id: 'analysis-123',
          results: mockAnalysisResults
        }
      };
      axios.post.mockResolvedValueOnce(mockResponse);
      
      // Datos de prueba
      const text = 'Este es un texto de prueba';
      const options = { sentiment: true, entities: true };
      
      // Llamar a analyzeText
      const result = await analysisService.analyzeText(text, options);
      
      // Verificar que se llamó a textAnalysisService
      expect(textAnalysisService.analyzeText).toHaveBeenCalledWith(text, options);
      
      // Verificar que se llamó a la API para guardar los resultados
      expect(axios.post).toHaveBeenCalledWith('/analysis/save', {
        text,
        options,
        results: mockAnalysisResults
      });
      
      // Verificar que se devolvieron los datos correctos
      expect(result).toEqual(mockResponse.data);
    });
    
    test('analyzeDocument debe manejar el progreso de carga', async () => {
      // Mock de respuesta exitosa
      const mockResponse = {
        data: {
          id: 'analysis-123',
          results: { /* resultados de ejemplo */ }
        }
      };
      
      axios.post.mockResolvedValueOnce(mockResponse);
      
      // Datos de prueba
      const formData = new FormData();
      const onProgress = jest.fn();
      
      // Llamar a analyzeDocument
      const result = await analysisService.analyzeDocument(formData, onProgress);
      
      // Verificar que se llamó a la API correctamente
      expect(axios.post).toHaveBeenCalledWith(
        '/analysis/document',
        formData,
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: expect.any(Function)
        })
      );
      
      // Verificar que se devolvieron los datos correctos
      expect(result).toEqual(mockResponse.data);
    });
  });
});