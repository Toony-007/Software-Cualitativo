import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Definición de estilos
  const styles = {
    home: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '90vh',
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#2c3e50'
    },
    title: {
      fontSize: '2.8rem',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #3498db, #8e44ad)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '700'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#7f8c8d',
      maxWidth: '700px',
      lineHeight: '1.6',
      marginBottom: '2rem'
    },
    features: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '3rem',
      width: '100%'
    },
    feature: {
      flex: '1 1 300px',
      padding: '2rem',
      borderRadius: '12px',
      background: 'white',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '220px',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    featureHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#3498db'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#2c3e50'
    },
    featureText: {
      fontSize: '1rem',
      color: '#7f8c8d',
      lineHeight: '1.5'
    },
    ctaButtons: {
      display: 'flex',
      gap: '1.5rem',
      marginTop: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    btnPrimary: {
      padding: '0.8rem 2rem',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-block'
    },
    btnSecondary: {
      padding: '0.8rem 2rem',
      backgroundColor: 'white',
      color: '#3498db',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      border: '1px solid #3498db',
      cursor: 'pointer',
      display: 'inline-block'
    },
    btnHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)'
    }
  };

  // Función para manejar el hover de los elementos
  const handleMouseEnter = (e, hoverStyle) => {
    Object.keys(hoverStyle).forEach(key => {
      e.currentTarget.style[key] = hoverStyle[key];
    });
  };

  const handleMouseLeave = (e, defaultStyle) => {
    Object.keys(defaultStyle).forEach(key => {
      e.currentTarget.style[key] = defaultStyle[key];
    });
  };

  return (
    <div style={styles.home}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bienvenido a Qualitative AI Analyzer</h1>
        <p style={styles.subtitle}>Una herramienta avanzada para el análisis cualitativo de textos utilizando inteligencia artificial, diseñada para investigadores y profesionales.</p>
      </div>
      
      <div style={styles.features}>
        <div 
          style={styles.feature}
          onMouseEnter={(e) => handleMouseEnter(e, styles.featureHover)}
          onMouseLeave={(e) => handleMouseLeave(e, styles.feature)}
        >
          <div style={styles.featureIcon}>🔍</div>
          <h2 style={styles.featureTitle}>Análisis de Sentimiento</h2>
          <p style={styles.featureText}>Descubre la polaridad emocional de tus textos con precisión y detalle.</p>
        </div>
        
        <div 
          style={styles.feature}
          onMouseEnter={(e) => handleMouseEnter(e, styles.featureHover)}
          onMouseLeave={(e) => handleMouseLeave(e, styles.feature)}
        >
          <div style={styles.featureIcon}>🏢</div>
          <h2 style={styles.featureTitle}>Extracción de Entidades</h2>
          <p style={styles.featureText}>Identifica personas, lugares, organizaciones y más en tus documentos.</p>
        </div>
        
        <div 
          style={styles.feature}
          onMouseEnter={(e) => handleMouseEnter(e, styles.featureHover)}
          onMouseLeave={(e) => handleMouseLeave(e, styles.feature)}
        >
          <div style={styles.featureIcon}>🔑</div>
          <h2 style={styles.featureTitle}>Palabras Clave</h2>
          <p style={styles.featureText}>Extrae los términos más relevantes para comprender la esencia de tus textos.</p>
        </div>
      </div>
      
      <div style={styles.ctaButtons}>
        <Link 
          to="/upload" 
          style={styles.btnPrimary}
          onMouseEnter={(e) => handleMouseEnter(e, styles.btnHover)}
          onMouseLeave={(e) => handleMouseLeave(e, styles.btnPrimary)}
        >
          Subir Documento
        </Link>
        <Link 
          to="/analyze" 
          style={styles.btnSecondary}
          onMouseEnter={(e) => handleMouseEnter(e, styles.btnHover)}
          onMouseLeave={(e) => handleMouseLeave(e, styles.btnSecondary)}
        >
          Analizar Texto
        </Link>
      </div>
    </div>
  );
}

export default Home;