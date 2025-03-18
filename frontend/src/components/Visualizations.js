import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVisualization } from '../utils/api';
import '../styles/Visualizations.css';

// Componente de visualización (en una implementación real usarías bibliotecas como D3, Chart.js, etc.)
const VisualizationPlaceholder = ({ type, data }) => {
  return (
    <div className="visualization-placeholder">
      <h3>{data.title || `Visualización de ${type}`}</h3>
      <div className="placeholder-content">
        <p>Aquí se mostraría la visualización de tipo: {type}</p>
        <pre className="data-preview">{JSON.stringify(data, null, 2).substring(0, 200)}...</pre>
      </div>
    </div>
  );
};

const Visualizations = () => {
  const { analysisId } = useParams();
  const [visualizations, setVisualizations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeViz, setActiveViz] = useState('word_cloud');

  // En una implementación real, harías peticiones para obtener las visualizaciones
  useEffect(() => {
    const fetchVisualizations = async () => {
      try {
        setLoading(true);
        
        // Simulación de carga de datos
        // En una implementación real, harías peticiones a la API para cada tipo de visualización
        setTimeout(() => {
          // Datos de ejemplo
          const mockVisualizations = {
            word_cloud: {
              type: 'word_cloud',
              data: [
                { text: 'Economía', value: 30 },
                { text: 'Política', value: 25 },
                { text: 'Medio ambiente', value: 20 },
                { text: 'Desarrollo', value: 15 },
                { text: 'Sostenibilidad', value: 12 }
              ],
              title: 'Nube de Palabras - Análisis General'
            },
            sentiment_chart: {
              type: 'sentiment_chart',
              data: {
                labels: ['Polaridad', 'Preocupación', 'Esperanza'],
                datasets: [{
                  label: 'Sentimiento',
                  data: [60, 70, 50],
                  backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']
                }]
              },
              title: 'Análisis de Sentimiento'
            },
            theme_network: {
              type: 'theme_network',
              data: {
                nodes: [
                  { id: 0, name: 'Economía', value: 10, group: 1 },
                  { id: 1, name: 'Política', value: 10, group: 1 },
                  { id: 2, name: 'Medio ambiente', value: 10, group: 1 },
                  { id: '0-0', name: 'Crecimiento económico sostenible...', value: 5, group: 2 },
                  { id: '1-0', name: 'Políticas públicas para...', value: 5, group: 2 },
                  { id: '2-0', name: 'Protección de recursos naturales...', value: 5, group: 2 }
                ],
                links: [
                  { source: 0, target: '0-0', value: 1 },
                  { source: 1, target: '1-0', value: 1 },
                  { source: 2, target: '2-0', value: 1 }
                ]
              },
              title: 'Red Temática'
            },
            summary_dashboard: {
              type: 'summary_dashboard',
              title: 'Dashboard de Análisis',
              key_insights: {
                summary: 'El texto muestra una preocupación por temas económicos y ambientales, con un tono moderadamente optimista hacia posibles soluciones políticas.',
                key_points: ['Economía sostenible', 'Políticas ambientales', 'Desarrollo social'],
                recommendations: [
                  'Profundizar en los temas principales identificados',
                  'Considerar un análisis de sentimiento para evaluar la recepción emocional',
                  'Explorar las relaciones entre los diferentes temas'
                ]
              }
            }
          };
          
          setVisualizations(mockVisualizations);
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        console.error('Error al cargar visualizaciones:', err);
        setError('No se pudieron cargar las visualizaciones');
        setLoading(false);
      }
    };

    fetchVisualizations();
  }, [analysisId]);

  // Función para renderizar la visualización activa
  const renderVisualization = () => {
    if (!visualizations[activeViz]) return null;
    
    return <VisualizationPlaceholder type={activeViz} data={visualizations[activeViz]} />;
  };

  // Función para renderizar insights del dashboard
  const renderInsights = () => {
    if (activeViz !== 'summary_dashboard' || !visualizations.summary_dashboard) return null;
    
    const { key_insights } = visualizations.summary_dashboard;
    
    return (
      <div className="insights-container">
        <div className="insight-section">
          <h3>Resumen</h3>
          <p>{key_insights.summary}</p>
        </div>
        
        <div className="insight-section">
          <h3>Puntos Clave</h3>
          <ul>
            {key_insights.key_points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        
        <div className="insight-section">
          <h3>Recomendaciones</h3>
          <ul>
            {key_insights.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando visualizaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to={`/results/${analysisId}`} className="back-button">Volver a Resultados</Link>
      </div>
    );
  }

  return (
    <div className="visualizations-container">
      <div className="visualizations-header">
        <h1>Visualizaciones</h1>
        <Link to={`/results/${analysisId}`} className="back-button">
          Volver a Resultados
        </Link>
      </div>
      
      <div className="visualization-tabs">
        <button 
          className={`viz-tab ${activeViz === 'word_cloud' ? 'active' : ''}`}
          onClick={() => setActiveViz('word_cloud')}
          disabled={!visualizations.word_cloud}
        >
          Nube de Palabras
        </button>
        <button 
          className={`viz-tab ${activeViz === 'sentiment_chart' ? 'active' : ''}`}
          onClick={() => setActiveViz('sentiment_chart')}
          disabled={!visualizations.sentiment_chart}
        >
          Gráfico de Sentimiento
        </button>
        <button 
          className={`viz-tab ${activeViz === 'theme_network' ? 'active' : ''}`}
          onClick={() => setActiveViz('theme_network')}
          disabled={!visualizations.theme_network}
        >
          Red Temática
        </button>
        <button 
          className={`viz-tab ${activeViz === 'summary_dashboard' ? 'active' : ''}`}
          onClick={() => setActiveViz('summary_dashboard')}
          disabled={!visualizations.summary_dashboard}
        >
          Dashboard
        </button>
      </div>
      
      <div className="visualization-content">
        {renderVisualization()}
        {renderInsights()}
      </div>
      
      <div className="visualization-actions">
        <button className="export-viz-button">Exportar Visualización</button>
        <button className="share-button">Compartir</button>
      </div>
    </div>
  );
};

export default Visualizations;