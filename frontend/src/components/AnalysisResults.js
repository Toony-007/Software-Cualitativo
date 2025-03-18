import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVisualization } from '../utils/api';
import '../styles/AnalysisResults.css';

const AnalysisResults = () => {
  const { analysisId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('summary');

  // En una implementación real, harías una petición para obtener el análisis
  // Aquí simulamos la carga de datos
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        
        // Simulación de carga de datos
        // En una implementación real, harías una petición a la API
        setTimeout(() => {
          // Datos de ejemplo
          const mockAnalysis = {
            id: analysisId,
            analysis_type: 'general',
            timestamp: new Date().toISOString(),
            result: {
              temas: ['Economía', 'Política', 'Medio ambiente'],
              sentimientos: {
                polaridad_general: 0.2,
                emociones_detectadas: [
                  { nombre: 'Preocupación', intensidad: 0.7 },
                  { nombre: 'Esperanza', intensidad: 0.5 }
                ]
              },
              conclusiones: 'El texto muestra una preocupación por temas económicos y ambientales, con un tono moderadamente optimista hacia posibles soluciones políticas.'
            },
            text_sample: 'Este es un ejemplo de texto analizado que trata sobre economía, política y medio ambiente...'
          };
          
          setAnalysis(mockAnalysis);
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        console.error('Error al cargar análisis:', err);
        setError('No se pudo cargar el análisis');
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  // Función para renderizar el contenido según el tipo de análisis
  const renderAnalysisContent = () => {
    if (!analysis) return null;

    switch (activeTab) {
      case 'summary':
        return (
          <div className="analysis-summary">
            <h2>Resumen del Análisis</h2>
            <div className="summary-card">
              <div className="summary-header">
                <span className="analysis-type">{analysis.analysis_type.toUpperCase()}</span>
                <span className="analysis-date">{new Date(analysis.timestamp).toLocaleString()}</span>
              </div>
              <div className="summary-content">
                {analysis.result.conclusiones && (
                  <div className="conclusion-section">
                    <h3>Conclusiones</h3>
                    <p>{analysis.result.conclusiones}</p>
                  </div>
                )}
                
                {analysis.result.temas && (
                  <div className="themes-section">
                    <h3>Temas Principales</h3>
                    <ul className="themes-list">
                      {analysis.result.temas.map((tema, index) => (
                        <li key={index} className="theme-item">{tema}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysis.result.sentimientos && (
                  <div className="sentiment-section">
                    <h3>Análisis de Sentimiento</h3>
                    <p className="sentiment-polarity">
                      Polaridad: 
                      <span className={`polarity-value ${analysis.result.sentimientos.polaridad_general > 0 ? 'positive' : analysis.result.sentimientos.polaridad_general < 0 ? 'negative' : 'neutral'}`}>
                        {analysis.result.sentimientos.polaridad_general > 0 ? 'Positiva' : analysis.result.sentimientos.polaridad_general < 0 ? 'Negativa' : 'Neutral'}
                        ({analysis.result.sentimientos.polaridad_general.toFixed(2)})
                      </span>
                    </p>
                    {analysis.result.sentimientos.emociones_detectadas && (
                      <div className="emotions-list">
                        <h4>Emociones Detectadas:</h4>
                        <ul>
                          {analysis.result.sentimientos.emociones_detectadas.map((emocion, index) => (
                            <li key={index}>
                              {emocion.nombre}: 
                              <div className="emotion-bar-container">
                                <div 
                                  className="emotion-bar" 
                                  style={{width: `${emocion.intensidad * 100}%`}}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'details':
        return (
          <div className="analysis-details">
            <h2>Detalles del Análisis</h2>
            <div className="json-viewer">
              <pre>{JSON.stringify(analysis.result, null, 2)}</pre>
            </div>
          </div>
        );
        
      case 'text':
        return (
          <div className="analyzed-text">
            <h2>Texto Analizado</h2>
            <div className="text-content">
              <p>{analysis.text_sample}</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando resultados del análisis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/analyze" className="back-button">Volver al Análisis</Link>
      </div>
    );
  }

  return (
    <div className="analysis-results-container">
      <div className="results-header">
        <h1>Resultados del Análisis</h1>
        <div className="analysis-actions">
          <Link to={`/visualize/${analysisId}`} className="visualize-button">
            Ver Visualizaciones
          </Link>
          <button className="export-button">Exportar Resultados</button>
        </div>
      </div>
      
      <div className="results-tabs">
        <button 
          className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Resumen
        </button>
        <button 
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Detalles
        </button>
        <button 
          className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Texto
        </button>
      </div>
      
      <div className="results-content">
        {renderAnalysisContent()}
      </div>
      
      <div className="results-footer">
        <Link to="/analyze" className="back-button">Realizar Nuevo Análisis</Link>
      </div>
    </div>
  );
};

export default AnalysisResults;