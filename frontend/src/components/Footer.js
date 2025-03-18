import React from 'react';

function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto',
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    copyright: {
      fontSize: '0.9rem',
      opacity: 0.8,
      margin: '0.5rem 0'
    },
    links: {
      display: 'flex',
      gap: '1.5rem',
      margin: '1rem 0'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      opacity: 0.8,
      transition: 'opacity 0.3s ease',
      fontSize: '0.9rem'
    },
    linkHover: {
      opacity: 1
    }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.opacity = styles.linkHover.opacity;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.opacity = styles.link.opacity;
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.links}>
          <a 
            href="#" 
            style={styles.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Términos y Condiciones
          </a>
          <a 
            href="#" 
            style={styles.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Política de Privacidad
          </a>
          <a 
            href="#" 
            style={styles.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Contacto
          </a>
        </div>
        <p style={styles.copyright}>&copy; {new Date().getFullYear()} Qualitative AI Analyzer. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;