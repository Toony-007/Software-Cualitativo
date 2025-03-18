import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Qualitative AI Analyzer</p>
        <div className="footer-links">
          <a href="#privacy">Política de Privacidad</a>
          <a href="#terms">Términos de Uso</a>
          <a href="#contact">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;