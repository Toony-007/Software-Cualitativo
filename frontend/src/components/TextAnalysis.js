import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TextAnalysis() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState({
    sentiment: true,
    entities: true,
    keywords: true
  });
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    title: {
      fontSize: '2.2rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      textAlign: 'center',
      fontWeight: '700'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#7f8c8d',
      marginBottom: '2rem',
      textAlign: 'center',
      lineHeight: '1.6'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '1.1rem',
      color: '#2c3e50',
      fontWeight: '600'
    },
    textarea: {
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      fontSize: '1rem',
      lineHeight: '1.5',
      resize: 'vertical',
      minHeight: '200px',
      fontFamily: 'inherit',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
    },
    textareaFocus: {
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
      outline: 'none'
    },
    optionsSection: {
      backgroundColor: '#f8fafc',
      padding: '1.5rem',
      borderRadius: '10px',
      marginTop: '1rem'
    },
    optionsTitle: {
      fontSize: '1.2rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      fontWeight: '600'
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    optionItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease'
    },
    optionItemHover: {
      backgroundColor: '#f1f9fe'
    },
    checkbox: {
      appearance: 'none',
      width: '20px',
      height: '20px',
      borderRadius: '4px',
      border: '2px solid #3498db',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    checkboxChecked: {
      backgroundColor: '#3498db',
      borderColor: '#3498db'
    },
    checkboxCheckedAfter: {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '6px',
      width: '5px',
      height: '10px',
      border: 'solid white',
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)'
    },
    optionLabel: {
      fontSize: '1rem',
      color: '#2c3e50',
      cursor: 'pointer'
    },
    submitButton: {
      padding: '0.8rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
      boxShadow: '0 4px 6px rgba(52, 152, 219, 0.2)'
    },
    submitButtonHover: {
      backgroundColor: '#2980b9',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(52, 152, 219, 0.3)'
    },
    submitButtonDisabled: {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    optionIcon: {
      fontSize: '1.2rem',
      marginRight: '0.5rem',
      color: '#3498db'
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('Por favor ingresa un texto para analizar');
      return;
    }
    
    setAnalyzing(true);
    
    // Aquí iría la lógica para enviar el texto al servidor para análisis
    // Por ahora solo simulamos un análisis
    setTimeout(() => {
      setAnalyzing(false);
      // Simulamos un ID de análisis
      const analysisId = 'analysis-' + Date.now();
      navigate(`/results/${analysisId}`);
    }, 2000);
  };

  const handleTextareaFocus = (e) => {
    e.target.style.borderColor = styles.textareaFocus.borderColor;
    e.target.style.boxShadow = styles.textareaFocus.boxShadow;
  };

  const handleTextareaBlur = (e) => {
    e.target.style.borderColor = '';
    e.target.style.boxShadow = '';
  };

  const handleOptionHover = (e, isHover) => {
    e.currentTarget.style.backgroundColor = isHover ? styles.optionItemHover.backgroundColor : '';
  };

  const handleButtonHover = (e, isDisabled) => {
    if (!isDisabled) {
      e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor;
      e.currentTarget.style.transform = styles.submitButtonHover.transform;
      e.currentTarget.style.boxShadow = styles.submitButtonHover.boxShadow;
    }
  };

  const handleButtonLeave = (e, isDisabled) => {
    if (!isDisabled) {
      e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = styles.submitButton.boxShadow;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Analizar Texto</h1>
      <p style={styles.subtitle}>Ingresa el texto que deseas analizar con nuestra herramienta de IA para obtener insights valiosos.</p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="text" style={styles.label}>Texto a analizar:</label>
          <textarea 
            id="text" 
            value={text} 
            onChange={handleTextChange}
            rows="10"
            placeholder="Ingresa aquí el texto que deseas analizar..."
            required
            style={styles.textarea}
            onFocus={handleTextareaFocus}
            onBlur={handleTextareaBlur}
          ></textarea>
        </div>
        
        <div style={styles.optionsSection}>
          <h3 style={styles.optionsTitle}>Opciones de análisis:</h3>
          
          <div style={styles.optionsGrid}>
            <div 
              style={styles.optionItem}
              onMouseEnter={(e) => handleOptionHover(e, true)}
              onMouseLeave={(e) => handleOptionHover(e, false)}
            >
              <input 
                type="checkbox" 
                id="sentiment" 
                name="sentiment"
                checked={options.sentiment}
                onChange={handleOptionChange}
                style={{
                  ...styles.checkbox,
                  ...(options.sentiment ? styles.checkboxChecked : {})
                }}
              />
              <label htmlFor="sentiment" style={styles.optionLabel}>
                <span style={styles.optionIcon}>😊</span>
                Análisis de sentimiento
              </label>
            </div>
            
            <div 
              style={styles.optionItem}
              onMouseEnter={(e) => handleOptionHover(e, true)}
              onMouseLeave={(e) => handleOptionHover(e, false)}
            >
              <input 
                type="checkbox" 
                id="entities" 
                name="entities"
                checked={options.entities}
                onChange={handleOptionChange}
                style={{
                  ...styles.checkbox,
                  ...(options.entities ? styles.checkboxChecked : {})
                }}
              />
              <label htmlFor="entities" style={styles.optionLabel}>
                <span style={styles.optionIcon}>🏢</span>
                Extracción de entidades
              </label>
            </div>
            
            <div 
              style={styles.optionItem}
              onMouseEnter={(e) => handleOptionHover(e, true)}
              onMouseLeave={(e) => handleOptionHover(e, false)}
            >
              <input 
                type="checkbox" 
                id="keywords" 
                name="keywords"
                checked={options.keywords}
                onChange={handleOptionChange}
                style={{
                  ...styles.checkbox,
                  ...(options.keywords ? styles.checkboxChecked : {})
                }}
              />
              <label htmlFor="keywords" style={styles.optionLabel}>
                <span style={styles.optionIcon}>🔑</span>
                Extracción de palabras clave
              </label>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          style={{
            ...styles.submitButton,
            ...(analyzing ? styles.submitButtonDisabled : {})
          }}
          disabled={analyzing}
          onMouseEnter={(e) => handleButtonHover(e, analyzing)}
          onMouseLeave={(e) => handleButtonLeave(e, analyzing)}
        >
          {analyzing ? 'Analizando...' : 'Analizar Texto'}
        </button>
      </form>
    </div>
  );
}

export default TextAnalysis;