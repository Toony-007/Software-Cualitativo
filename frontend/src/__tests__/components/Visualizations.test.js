import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Visualizations from '../../components/Visualizations';
import { visualizationService } from '../../services/api';

// Mock del servicio de visualización
jest.mock('../../services/api', () => ({
  visualizationService: {
    getWordFrequency: jest.fn(),
    getSentimentAnalysis: jest.fn(),
    getEntityAnalysis: jest.fn(),
    getTopicAnalysis: jest.fn()
  }
}));

describe('Componente Visualizations', () => {
  const mockAnalysisId = 'analysis-123';
  const mockAnalysisData = {
    id: mockAnalysisId,
    text: 'Este es un texto de ejemplo para análisis',
    createdAt: '2023-01-01T12:00:00Z'
  };
  
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Mock de respuestas exitosas
    visualizationService.getWordFrequency.mockResolvedValue({
      words: [
        { word: 'ejemplo', frequency: 5 },
        { word: 'análisis', frequency: 4 },
        { word: 'texto', frequency: 3 }
      ]
    });
    
    visualizationService.getSentimentAnalysis.mockResolvedValue({
      positive: 60,
      neutral: 30,
      negative: 10
    });
    
    visualizationService.getEntityAnalysis.mockResolvedValue({
      entities: [
        { text: 'Madrid', type: 'LOCATION' },
        { text: 'Juan Pérez', type: 'PERSON' }
      ]
    });
    
    visualizationService.getTopicAnalysis.mockResolvedValue({
      topics: [
        { 
          keywords: ['tecnología', 'innovación', 'digital'],
          summary: 'Tema relacionado con tecnología e innovación'
        }
      ]
    });
  });
  
  test('debe renderizar correctamente', async () => {
    render(<Visualizations analysisId={mockAnalysisId} analysisData={mockAnalysisData} />);
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText(/Visualizaciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Frecuencia de Palabras/i)).toBeInTheDocument();
    
    // Verificar que se carga la visualización inicial
    expect(visualizationService.getWordFrequency).toHaveBeenCalledWith(mockAnalysisId);
    
    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.queryByText(/Cargando visualización/i)).not.toBeInTheDocument();
    });
  });
  
  test('debe cambiar entre pestañas correctamente', async () => {
    render(<Visualizations analysisId={mockAnalysisId} analysisData={mockAnalysisData} />);
    
    // Esperar a que se cargue la visualización inicial
    await waitFor(() => {
      expect(visualizationService.getWordFrequency).toHaveBeenCalled();
    });
    
    // Cambiar a la pestaña de sentimiento
    const sentimentTab = screen.getByRole('button', { name: /Análisis de Sentimiento/i });
    fireEvent.click(sentimentTab);
    
    // Verificar que se carga la visualización de sentimiento
    expect(visualizationService.getSentimentAnalysis).toHaveBeenCalledWith(mockAnalysisId);
    
    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.getByText(/Positivo/i)).toBeInTheDocument();
    });
    
    // Cambiar a la pestaña de entidades
    const entitiesTab = screen.getByRole('button', { name: /Entidades/i });
    fireEvent.click(entitiesTab);
    
    // Verificar que se carga la visualización de entidades
    expect(visualizationService.getEntityAnalysis).toHaveBeenCalledWith(mockAnalysisId);
    
    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.getByText(/LOCATION/i)).toBeInTheDocument();
    });
  });
  
  test('debe mostrar mensaje de error si la carga falla', async () => {
    // Mock de error
    visualizationService.getWordFrequency.mockRejectedValueOnce(new Error('Error al cargar datos'));
    
    render(<Visualizations analysisId={mockAnalysisId} analysisData={mockAnalysisData} />);
    
    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/No se pudieron cargar los datos de visualización/i)).toBeInTheDocument();
    });
  });
  
  test('debe mostrar mensaje cuando no hay datos disponibles', async () => {
    // Mock de respuesta sin datos
    visualizationService.getWordFrequency.mockResolvedValueOnce({ words: [] });
    
    render(<Visualizations analysisId={mockAnalysisId} analysisData={mockAnalysisData} />);
    
    // Esperar a que se muestre el mensaje de datos insuficientes
    await waitFor(() => {
      expect(screen.getByText(/No hay suficientes datos para mostrar/i)).toBeInTheDocument();
    });
  });
});