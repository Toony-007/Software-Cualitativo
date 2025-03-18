import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    errorCode: {
      fontSize: '8rem',
      fontWeight: '700',
      margin: '0',
      background: 'linear-gradient(45deg, #3498db, #8e44ad)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '2rem',
      color: '#2c3e50',
      marginBottom: '1.5rem',
      fontWeight: '600'
    },
    message: {
      fontSize: '1.2rem',
      color: '#7f8c8d',
      maxWidth: '500px',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    button: {
      padding: '1rem 2rem',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    buttonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)'
    },
    icon: {
      fontSize: '1.5rem'
    },
    illustration: {
      fontSize: '5rem',
      marginBottom: '1.5rem'
    }
  };

  const handleButtonHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.transform = styles.buttonHover.transform;
      e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow;
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = styles.button.boxShadow;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.illustration}>🔍</div>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Página No Encontrada</h2>
      <p style={styles.message}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
      </p>
      <Link 
        to="/" 
        style={styles.button}
        onMouseEnter={(e) => handleButtonHover(e, true)}
        onMouseLeave={(e) => handleButtonHover(e, false)}
      >
        <span style={styles.icon}>🏠</span>
        Volver al Inicio
      </Link>
    </div>
  );
}

export default NotFound;