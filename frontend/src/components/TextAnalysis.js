import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { analyzeText } from '../utils/api';
import '../styles/TextAnalysis.css';

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [analysisType, setAnalysisType] = useState('general');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [documentId, setDocumentId] = useState(null);
  const [documentText, setDocumentText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extraer documentId de los parámetros de la URL si existe
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const docId = params.get('documentId');
    
    if (docId) {
      setDocumentId(docId);
      // Aquí normalmente harías una petición para obtener el texto del documento
      // Por simplicidad, asumimos que ya tenemos el texto
      // En una implementación real, harías una petición a la API
      // fetchDocumentText(docId);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Por favor ingresa texto para analizar');
      return;
    }
    
    try {
      setIsAnalyzing(true);
      setError('');
      
      const response = await analyzeText(text, analysisType);
      
      // Redirigir a la página de resultados
      navigate(`/results/${response.id}`);
      
    } catch (err) {
      console.error('Error al analizar texto:', err);
      setError(err.response?.data?.detail || 'Error al analizar el texto');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="text-analysis-container">
      <h1>Análisis de Texto</h1>
      
      {documentId && (
        <div className="document-info">
          <p>Analizando documento con ID: {documentId}</p>
          {/* Aquí podrías mostrar información adicional del documento */}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="analysis-type-selector">
          <h2>Tipo de Análisis</h2>
          <div className="analysis-options">
            <label className={`analysis-option ${analysisType === 'general' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="analysisType" 
                value="general" 
                checked={analysisType === 'general'} 
                onChange={() => setAnalysisType('general')} 
              />
              <div className="option-content">
                <h3>General</h3>
                <p>Análisis completo identificando temas, sentimientos y conclusiones clave</p>
              </div>
            </label>
            
            <label className={`analysis-option ${analysisType === 'tematico' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="analysisType" 
                value="tematico" 
                checked={analysisType === 'tematico'} 
                onChange={() => setAnalysisType('tematico')} 
              />
              <div className="option-content">
                <h3>Temático</h3>
                <p>Identifica y clasifica los temas principales presentes en el texto</p>
              </div>
            </label>
            
            <label className={`analysis-option ${analysisType === 'sentimiento' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="analysisType" 
                value="sentimiento" 
                checked={analysisType === 'sentimiento'} 
                onChange={() => setAnalysisType('sentimiento')} 
              />
              <div className="option-content">
                <h3>Sentimiento</h3>
                <p>Analiza emociones, tono y polaridad del texto</p>
              </div>
            </label>
            
            <label className={`analysis-option ${analysisType === 'discurso' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="analysisType" 
                value="discurso" 
                checked={analysisType === 'discurso'} 
                onChange={() => setAnalysisType('discurso')} 
              />
              <div className="option-content">
                <h3>Discurso</h3>
                <p>Examina estructuras argumentativas, retórica y posicionamiento</p>
              </div>
            </label>
          </div>
        </div>
        
        <div className="text-input-section">
          <h2>Texto para Analizar</h2>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingresa o pega aquí el texto que deseas analizar..."
            rows={10}
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="analyze-button"
          disabled={isAnalyzing || !text.trim()}
        >
          {isAnalyzing ? 'Analizando...' : 'Analizar Texto'}
        </button>
      </form>
      
      <div className="analysis-tips">
        <h2>Consejos para el Análisis</h2>
        <ul>
          <li>Para mejores resultados, proporciona textos con al menos 100 palabras.</li>
          <li>El análisis temático funciona mejor con textos estructurados en párrafos.</li>
          <li>Para análisis de sentimiento, incluye contenido con carga emocional.</li>
          <li>El análisis de discurso es ideal para textos argumentativos o persuasivos.</li>
        </ul>
      </div>
    </div>
  );
};

export default TextAnalysis;