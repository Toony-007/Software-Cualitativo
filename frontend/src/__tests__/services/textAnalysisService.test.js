import axios from 'axios';
import { textAnalysisService } from '../../services/api';

// Mock axios
jest.mock('axios');

describe('Text Analysis Service', () => {
  beforeEach(() => {
    // Limpiar todos los mocks
    jest.clearAllMocks();
  });
  
  test('analyzeText debe enviar los datos correctos', async () => {
    // Mock de respuesta exitosa
    const mockResponse = {
      data: {
        sentiment: { positive: 0.7, negative: 0.3 },
        entities: ['Madrid', 'Juan Pérez'],
        keywords: ['análisis', 'texto', 'prueba']
      }
    };
    
    axios.post.mockResolvedValueOnce(mockResponse);
    
    // Datos de prueba
    const text = 'Este es un texto de prueba para analizar';
    const options = { sentiment: true, entities: true, keywords: true };
    
    // Llamar a analyzeText
    const result = await textAnalysisService.analyzeText(text, options);
    
    // Verificar que se llamó a la API correctamente
    expect(axios.post).toHaveBeenCalledWith('/text-analysis/analyze', {
      text,
      options
    });
    
    // Verificar que se devolvieron los datos correctos
    expect(result).toEqual(mockResponse.data);
  });
  
  test('extractKeywords debe enviar los datos correctos', async () => {
    // Mock de respuesta exitosa
    const mockResponse = {
      data: {
        keywords: [
          { word: 'análisis', relevance: 0.9 },
          { word: 'texto', relevance: 0.8 },
          { word: 'prueba', relevance: 0.7 }
        ]
      }
    };
    
    axios.post.mockResolvedValueOnce(mockResponse);
    
    // Datos de prueba
    const text = 'Este es un texto de prueba para analizar';
    const options = { limit: 5, minRelevance: 0.5 };
    
    // Llamar a extractKeywords
    const result = await textAnalysisService.extractKeywords(text, options);
    
    // Verificar que se llamó a la API correctamente
    expect(axios.post).toHaveBeenCalledWith('/text-analysis/keywords', {
      text,
      options
    });
    
    // Verificar que se devolvieron los datos correctos
    expect(result).toEqual(mockResponse.data);
  });
  
  test('analyzeSentiment debe enviar los datos correctos', async () => {
    // Mock de respuesta exitosa
    const mockResponse = {
      data: {
        sentiment: 'positive',
        score: 0.75,
        confidence: 0.85,
        sentences: [
          { text: 'Me gusta este producto', sentiment: 'positive', score: 0.8 },
          { text: 'Funciona muy bien', sentiment: 'positive', score: 0.7 }
        ]
      }
    };
    
    axios.post.mockResolvedValueOnce(mockResponse);
    
    // Datos de prueba
    const text = 'Me gusta este producto. Funciona muy bien.';
    const options = { detailed: true };
    
    // Llamar a analyzeSentiment
    const result = await textAnalysisService.analyzeSentiment(text, options);
    
    // Verificar que se llamó a la API correctamente
    expect(axios.post).toHaveBeenCalledWith('/text-analysis/sentiment', {
      text,
      options
    });
    
    // Verificar que se devolvieron los datos correctos
    expect(result).toEqual(mockResponse.data);
  });
  
  test('extractEntities debe enviar los datos correctos', async () => {
    // Mock de respuesta exitosa
    const mockResponse = {
      data: {
        entities: [
          { text: 'Madrid', type: 'LOCATION', confidence: 0.95 },
          { text: 'Juan Pérez', type: 'PERSON', confidence: 0.9 },
          { text: 'Google', type: 'ORGANIZATION', confidence: 0.85 }
        ]
      }
    };
    
    axios.post.mockResolvedValueOnce(mockResponse);
    
    // Datos de prueba
    const text = 'Juan Pérez trabaja en Google en Madrid';
    const options = { minConfidence: 0.8 };
    
    // Llamar a extractEntities
    const result = await textAnalysisService.extractEntities(text, options);
    
    // Verificar que se llamó a la API correctamente
    expect(axios.post).toHaveBeenCalledWith('/text-analysis/entities', {
      text,
      options
    });
    
    // Verificar que se devolvieron los datos correctos
    expect(result).toEqual(mockResponse.data);
  });
  
  test('summarizeText debe enviar los datos correctos', async () => {
    // Mock de respuesta exitosa
    const mockResponse = {
      data: {
        summary: 'Este es un resumen del texto original.',
        originalLength: 500,
        summaryLength: 50,
        compressionRatio: 0.1
      }
    };
    
    axios.post.mockResolvedValueOnce(mockResponse);
    
    // Datos de prueba
    const text = 'Este es un texto largo que necesita ser resumido...';
    const options = { maxLength: 50, method: 'extractive' };
    
    // Llamar a summarizeText
    const result = await textAnalysisService.summarizeText(text, options);
    
    // Verificar que se llamó a la API correctamente
    expect(axios.post).toHaveBeenCalledWith('/text-analysis/summarize', {
      text,
      options
    });
    
    // Verificar que se devolvieron los datos correctos
    expect(result).toEqual(mockResponse.data);
  });
});