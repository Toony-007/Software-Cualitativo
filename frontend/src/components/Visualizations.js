import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Visualizations() {
  const { analysisId } = useParams();
  
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
    visualizationIcon: {
      fontSize: '1.5rem'
    },
    visualizationPlaceholder: {
      backgroundColor: '#f1f9fe',
      borderRadius: '8px',
      padding: '3rem',
      textAlign: 'center',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px dashed #bde0fe'
    },
    placeholderText: {
      fontSize: '1.2rem',
      color: '#3498db',
      marginBottom: '1rem',
      fontWeight: '500'
    },
    placeholderNote: {
      fontSize: '0.9rem',
      color: '#7f8c8d',
      maxWidth: '500px',
      margin: '0 auto'
    },
    placeholderIcon: {
      fontSize: '3rem',
      color: '#3498db',
      marginBottom: '1rem'
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
        <h1 style={styles.title}>Visualizaciones</h1>
        <div style={styles.analysisId}>ID: {analysisId}</div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.visualizationIcon}>☁️</span>
          Nube de Palabras
        </h2>
        <div style={styles.visualizationPlaceholder}>
          <div style={styles.placeholderIcon}>☁️</div>
          <p style={styles.placeholderText}>Aquí se mostraría la nube de palabras</p>
          <p style={styles.placeholderNote}>
            En una implementación real, aquí se renderizaría un componente de nube de palabras 
            utilizando react-wordcloud para visualizar las palabras clave y su relevancia.
          </p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.visualizationIcon}>📊</span>
          Gráfico de Sentimiento
        </h2>
        <div style={styles.visualizationPlaceholder}>
          <div style={styles.placeholderIcon}>📊</div>
          <p style={styles.placeholderText}>Aquí se mostraría un gráfico de sentimiento</p>
          <p style={styles.placeholderNote}>
            En una implementación real, aquí se renderizaría un gráfico utilizando react-chartjs-2 
            para visualizar la distribución de sentimientos en el texto analizado.
          </p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.visualizationIcon}>🔄</span>
          Red de Entidades
        </h2>
        <div style={styles.visualizationPlaceholder}>
          <div style={styles.placeholderIcon}>🔄</div>
          <p style={styles.placeholderText}>Aquí se mostraría una red de entidades</p>
          <p style={styles.placeholderNote}>
            En una implementación real, aquí se renderizaría un gráfico de red utilizando react-force-graph 
            para visualizar las relaciones entre las entidades detectadas en el texto.
          </p>
        </div>
      </div>
      
      <div style={styles.actions}>
        <Link 
          to={`/results/${analysisId}`} 
          style={styles.btnSecondary}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
          className="btn-secondary"
        >
          <span style={styles.btnIcon}>📋</span>
          Volver a Resultados
        </Link>
        <Link 
          to="/analyze" 
          style={styles.btnPrimary}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
          className="btn-primary"
        >
          <span style={styles.btnIcon}>✏️</span>
          Nuevo Análisis
        </Link>
      </div>
    </div>
  );
}

export default Visualizations;