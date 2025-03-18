import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextAnalysis from '../../components/TextAnalysis';
import { analysisService, textAnalysisService } from '../../services/api';

// Mock de los servicios
jest.mock('../../services/api', () => ({
  analysisService: {
    analyzeText: jest.fn()
  },
  textAnalysisService: {
    analyzeText: jest.fn()
  }
}));

describe('Componente TextAnalysis', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
  });
  
  test('debe renderizar correctamente', () => {
    render(<TextAnalysis />);
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText(/Análisis de Texto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ingresa el texto a analizar/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Analizar/i })).toBeInTheDocument();
  });
  
  test('debe deshabilitar el botón cuando no hay texto', () => {
    render(<TextAnalysis />);
    
    // El botón debe estar deshabilitado inicialmente
    const button = screen.getByRole('button', { name: /Analizar/i });
    expect(button).toBeDisabled();
    
    // Ingresar texto debe habilitar el botón
    const textInput = screen.getByLabelText(/Ingresa el texto a analizar/i);
    fireEvent.change(textInput, { target: { value: 'Este es un texto de prueba' } });
    
    expect(button).not.toBeDisabled();
  });
  
  test('debe llamar al servicio de análisis al enviar el formulario', async () => {
    // Mock de respuesta exitosa
    analysisService.analyzeText.mockResolvedValueOnce({
      id: 'analysis-123',
      results: { /* resultados de ejemplo */ }
    });
    
    render(<TextAnalysis />);
    
    // Ingresar texto
    const textInput = screen.getByLabelText(/Ingresa el texto a analizar/i);
    fireEvent.change(textInput, { target: { value: 'Este es un texto de prueba' } });
    
    // Seleccionar opciones de análisis
    const sentimentOption = screen.getByLabelText(/Análisis de sentimiento/i);
    fireEvent.click(sentimentOption);
    
    // Enviar formulario
    const button = screen.getByRole('button', { name: /Analizar/i });
    fireEvent.click(button);
    
    // Verificar que se muestra el indicador de carga
    expect(screen.getByText(/Analizando.../i)).toBeInTheDocument();
    
    // Verificar que se llamó al servicio con los parámetros correctos
    expect(analysisService.analyzeText).toHaveBeenCalledWith(
      'Este es un texto de prueba',
      expect.objectContaining({
        sentiment: true
      })
    );
    
    // Esperar a que se complete el análisis
    await waitFor(() => {
      expect(screen.queryByText(/Analizando.../i)).not.toBeInTheDocument();
    });
  });
  
  test('debe mostrar mensaje de error si el análisis falla', async () => {
    // Mock de error
    analysisService.analyzeText.mockRejectedValueOnce(new Error('Error en el análisis'));
    
    render(<TextAnalysis />);
    
    // Ingresar texto
    const textInput = screen.getByLabelText(/Ingresa el texto a analizar/i);
    fireEvent.change(textInput, { target: { value: 'Este es un texto de prueba' } });
    
    // Enviar formulario
    const button = screen.getByRole('button', { name: /Analizar/i });
    fireEvent.click(button);
    
    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error al realizar el análisis/i)).toBeInTheDocument();
    });
  });
});