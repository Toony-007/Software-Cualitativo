import React from 'react';
import { useParams, Link } from 'react-router-dom';

function AnalysisResults() {
  const { analysisId } = useParams();
  
  // En una aplicación real, aquí cargaríamos los resultados del análisis desde el servidor
  // Por ahora, usamos datos de ejemplo
  const results = {
    sentiment: {
      positive: 0.7,
      negative: 0.2,
      neutral: 0.1,
      overall: 'positive'
    },
    entities: [
      { text: 'Madrid', type: 'LOCATION', confidence: 0.95 },
      { text: 'Juan Pérez', type: 'PERSON', confidence: 0.9 },
      { text: 'Google', type: 'ORGANIZATION', confidence: 0.85 }
    ],
    keywords: [
      { word: 'análisis', relevance: 0.9 },
      { word: 'texto', relevance: 0.8 },
      { word: 'prueba', relevance: 0.7 }
    ]
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.2rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      fontWeight: '700'
    },
    analysisId: {
      fontSize: '1rem',
      color: '#7f8c8d',
      backgroundColor: '#f8f9fa',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      display: 'inline-block'
    },
    section: {
      marginBottom: '2.5rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      color: '#2c3e50',
      marginBottom: '1.5rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    sentimentIcon: {
      fontSize: '1.5rem'
    },
    sentimentResults: {
      marginBottom: '1.5rem'
    },
    sentimentOverall: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#2c3e50'
    },
    sentimentPositive: {
      color: '#27ae60'
    },
    sentimentNegative: {
      color: '#e74c3c'
    },
    sentimentNeutral: {
      color: '#f39c12'
    },
    sentimentBars: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    sentimentBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    barLabel: {
      width: '100px',
      fontSize: '1rem',
      color: '#2c3e50',
      fontWeight: '500'
    },
    barContainer: {
      flex: 1,
      height: '12px',
      backgroundColor: '#ecf0f1',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    barFill: {
      height: '100%',
      borderRadius: '6px',
      transition: 'width 1s ease-in-out'
    },
    barPositive: {
      backgroundColor: '#27ae60'
    },
    barNegative: {
      backgroundColor: '#e74c3c'
    },
    barNeutral: {
      backgroundColor: '#f39c12'
    },
    barValue: {
      width: '50px',
      textAlign: 'right',
      fontSize: '0.9rem',
      color: '#7f8c8d',
      fontWeight: '500'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem'
    },
    tableHeader: {
      backgroundColor: '#f1f9fe',
      color: '#2c3e50',
      fontWeight: '600',
      textAlign: 'left',
      padding: '1rem',
      fontSize: '1rem'
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #ecf0f1',
      color: '#2c3e50',
      fontSize: '0.95rem'
    },
    tableRow: {
      transition: 'background-color 0.3s ease'
    },
    tableRowHover: {
      backgroundColor: '#f8f9fa'
    },
    confidenceBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.5rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600',
      color: 'white'
    },
    highConfidence: {
      backgroundColor: '#27ae60'
    },
    mediumConfidence: {
      backgroundColor: '#f39c12'
    },
    lowConfidence: {
      backgroundColor: '#e74c3c'
    },
    keywordsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '1rem'
    },
    keywordItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#f1f9fe',
      borderRadius: '20px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    keywordItemHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
    },
    keywordText: {
      fontWeight: '500',
      color: '#3498db'
    },
    keywordRelevance: {
      fontSize: '0.8rem',
      color: '#7f8c8d',
      backgroundColor: 'white',
      padding: '0.2rem 0.5rem',
      borderRadius: '10px'
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '2rem'
    },
    btnPrimary: {
      padding: '0.8rem 1.5rem',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(52, 152, 219, 0.2)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    btnSecondary: {
      padding: '0.8rem 1.5rem',
      backgroundColor: 'white',
      color: '#3498db',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #3498db',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    btnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 10px rgba(52, 152, 219, 0.3)'
    },
    btnIcon: {
      fontSize: '1.2rem'
    }
  };

  const getConfidenceStyle = (confidence) => {
    if (confidence >= 0.8) return styles.highConfidence;
    if (confidence >= 0.5) return styles.mediumConfidence;
    return styles.lowConfidence;
  };

  const getSentimentStyle = (sentiment) => {
    switch (sentiment) {
      case 'positive': return styles.sentimentPositive;
      case 'negative': return styles.sentimentNegative;
      default: return styles.sentimentNeutral;
    }
  };

  const handleRowHover = (e, isHover) => {
    e.currentTarget.style.backgroundColor = isHover ? styles.tableRowHover.backgroundColor : '';
  };

  const handleKeywordHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.transform = styles.keywordItemHover.transform;
      e.currentTarget.style.boxShadow = styles.keywordItemHover.boxShadow;
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  const handleButtonHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.transform = styles.btnHover.transform;
      e.currentTarget.style.boxShadow = styles.btnHover.boxShadow;
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = e.currentTarget.classList.contains('btn-primary') 
        ? styles.btnPrimary.boxShadow 
        : styles.btnSecondary.boxShadow;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Resultados del Análisis</h1>
        <div style={styles.analysisId}>ID: {analysisId}</div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.sentimentIcon}>
            {results.sentiment.overall === 'positive' ? '😊' : 
             results.sentiment.overall === 'negative' ? '😞' : '😐'}
          </span>
          Análisis de Sentimiento
        </h2>
        <div style={styles.sentimentResults}>
          <p style={{
            ...styles.sentimentOverall,
            ...getSentimentStyle(results.sentiment.overall)
          }}>
            Sentimiento general: {results.sentiment.overall === 'positive' ? 'Positivo' : 
                                 results.sentiment.overall === 'negative' ? 'Negativo' : 'Neutral'}
          </p>
          <div style={styles.sentimentBars}>
            <div style={styles.sentimentBar}>
              <span style={styles.barLabel}>Positivo:</span>
              <div style={styles.barContainer}>
                <div 
                  style={{
                    ...styles.barFill,
                    ...styles.barPositive,
                    width: `${results.sentiment.positive * 100}%`
                  }}
                ></div>
              </div>
              <span style={styles.barValue}>{(results.sentiment.positive * 100).toFixed(1)}%</span>
            </div>
            <div style={styles.sentimentBar}>
              <span style={styles.barLabel}>Negativo:</span>
              <div style={styles.barContainer}>
                <div 
                  style={{
                    ...styles.barFill,
                    ...styles.barNegative,
                    width: `${results.sentiment.negative * 100}%`
                  }}
                ></div>
              </div>
              <span style={styles.barValue}>{(results.sentiment.negative * 100).toFixed(1)}%</span>
            </div>
            <div style={styles.sentimentBar}>
              <span style={styles.barLabel}>Neutral:</span>
              <div style={styles.barContainer}>
                <div 
                  style={{
                    ...styles.barFill,
                    ...styles.barNeutral,
                    width: `${results.sentiment.neutral * 100}%`
                  }}
                ></div>
              </div>
              <span style={styles.barValue}>{(results.sentiment.neutral * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.sentimentIcon}>🏢</span>
          Entidades Detectadas
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Texto</th>
              <th style={styles.tableHeader}>Tipo</th>
              <th style={styles.tableHeader}>Confianza</th>
            </tr>
          </thead>
          <tbody>
            {results.entities.map((entity, index) => (
              <tr 
                key={index} 
                style={styles.tableRow}
                onMouseEnter={(e) => handleRowHover(e, true)}
                onMouseLeave={(e) => handleRowHover(e, false)}
              >
                <td style={styles.tableCell}>{entity.text}</td>
                <td style={styles.tableCell}>{entity.type}</td>
                <td style={styles.tableCell}>
                  <span 
                    style={{
                      ...styles.confidenceBadge,
                      ...getConfidenceStyle(entity.confidence)
                    }}
                  >
                    {(entity.confidence * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.sentimentIcon}>🔑</span>
          Palabras Clave
        </h2>
        <div style={styles.keywordsList}>
          {results.keywords.map((keyword, index) => (
            <div 
              key={index} 
              style={styles.keywordItem}
              onMouseEnter={(e) => handleKeywordHover(e, true)}
              onMouseLeave={(e) => handleKeywordHover(e, false)}
            >
              <span style={styles.keywordText}>{keyword.word}</span>
              <span style={styles.keywordRelevance}>{(keyword.relevance * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
      
      <div style={styles.actions}>
        <Link 
          to={`/visualize/${analysisId}`} 
          style={styles.btnPrimary}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
          className="btn-primary"
        >
          <span style={styles.btnIcon}>📊</span>
          Ver Visualizaciones
        </Link>
        <Link 
          to="/analyze" 
          style={styles.btnSecondary}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
          className="btn-secondary"
        >
          <span style={styles.btnIcon}>✏️</span>
          Nuevo Análisis
        </Link>
      </div>
    </div>
  );
}

export default AnalysisResults;