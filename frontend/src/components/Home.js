import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Análisis Cualitativo Potenciado por IA</h1>
        <p className="hero-description">
          Descubre insights profundos en tus documentos y textos utilizando 
          tecnología avanzada de inteligencia artificial.
        </p>
        <div className="cta-buttons">
          <Link to="/upload" className="cta-button primary">Subir Documento</Link>
          <Link to="/analyze" className="cta-button secondary">Analizar Texto</Link>
        </div>
      </section>
      
      <section className="features-section">
        <h2>Características Principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Análisis de Documentos</h3>
            <p>Procesa documentos en múltiples formatos (PDF, DOCX, TXT, CSV, JSON)</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Análisis Temático</h3>
            <p>Identifica y clasifica temas principales en el texto</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">😊</div>
            <h3>Análisis de Sentimiento</h3>
            <p>Detecta emociones, tono y polaridad en el contenido</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Análisis de Discurso</h3>
            <p>Examina estructuras argumentativas y recursos retóricos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Visualizaciones</h3>
            <p>Genera visualizaciones interactivas de los resultados</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>IA Avanzada</h3>
            <p>Utiliza modelos de lenguaje de última generación</p>
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <h2>Cómo Funciona</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sube tu Documento</h3>
            <p>Sube un documento o ingresa texto directamente para análisis</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Selecciona el Tipo de Análisis</h3>
            <p>Elige entre análisis general, temático, de sentimiento o de discurso</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Explora los Resultados</h3>
            <p>Visualiza y explora los insights generados por la IA</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;