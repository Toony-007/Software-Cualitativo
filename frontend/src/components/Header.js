import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <h1>Qualitative AI Analyzer</h1>
        </Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/upload">Subir Documento</Link></li>
          <li><Link to="/analyze">Análisis de Texto</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;