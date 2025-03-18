import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 700
    },
    logoLink: {
      textDecoration: 'none',
      background: 'linear-gradient(45deg, #3498db, #8e44ad)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      transition: 'all 0.3s ease'
    },
    nav: {
      display: 'flex'
    },
    navList: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '1.5rem'
    },
    navItem: {
      padding: '0.5rem 0'
    },
    navLink: {
      textDecoration: 'none',
      color: '#2c3e50',
      fontWeight: 500,
      padding: '0.5rem 0',
      position: 'relative',
      transition: 'all 0.3s ease'
    },
    activeLink: {
      color: '#3498db'
    },
    linkHover: {
      color: '#3498db'
    },
    linkAfter: {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#3498db',
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      transition: 'transform 0.3s ease'
    },
    linkHoverAfter: {
      transform: 'scaleX(1)',
      transformOrigin: 'bottom left'
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#2c3e50',
      '@media (max-width: 768px)': {
        display: 'block'
      }
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      navList: {
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        borderRadius: '0 0 5px 5px',
        display: menuOpen ? 'flex' : 'none'
      }
    }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = styles.linkHover.color;
    const afterElement = e.currentTarget.querySelector('.link-after');
    if (afterElement) {
      afterElement.style.transform = styles.linkHoverAfter.transform;
      afterElement.style.transformOrigin = styles.linkHoverAfter.transformOrigin;
    }
  };

  const handleMouseLeave = (e, isActive) => {
    if (!isActive) {
      e.currentTarget.style.color = styles.navLink.color;
    }
    const afterElement = e.currentTarget.querySelector('.link-after');
    if (afterElement && !isActive) {
      afterElement.style.transform = styles.linkAfter.transform;
      afterElement.style.transformOrigin = styles.linkAfter.transformOrigin;
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>Qualitative AI Analyzer</Link>
      </div>
      
      <button 
        style={styles.mobileMenuButton} 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      
      <nav style={styles.nav}>
        <ul style={{
          ...styles.navList,
          ...(window.innerWidth <= 768 ? {
            flexDirection: 'column',
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: 'white',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            borderRadius: '0 0 5px 5px',
            display: menuOpen ? 'flex' : 'none'
          } : {})
        }}>
          <li style={styles.navItem}>
            <Link 
              to="/" 
              style={{
                ...styles.navLink,
                ...(isActive('/') ? styles.activeLink : {})
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, isActive('/'))}
            >
              Inicio
              <span 
                className="link-after" 
                style={{
                  ...styles.linkAfter,
                  ...(isActive('/') ? styles.linkHoverAfter : {})
                }}
              ></span>
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/upload" 
              style={{
                ...styles.navLink,
                ...(isActive('/upload') ? styles.activeLink : {})
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, isActive('/upload'))}
            >
              Subir Documento
              <span 
                className="link-after" 
                style={{
                  ...styles.linkAfter,
                  ...(isActive('/upload') ? styles.linkHoverAfter : {})
                }}
              ></span>
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/analyze" 
              style={{
                ...styles.navLink,
                ...(isActive('/analyze') ? styles.activeLink : {})
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, isActive('/analyze'))}
            >
              Analizar Texto
              <span 
                className="link-after" 
                style={{
                  ...styles.linkAfter,
                  ...(isActive('/analyze') ? styles.linkHoverAfter : {})
                }}
              ></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;