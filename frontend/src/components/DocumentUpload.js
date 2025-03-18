import React, { useState } from 'react';

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const styles = {
    container: {
      maxWidth: '800px',
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
    dropzone: {
      border: '2px dashed #3498db',
      borderRadius: '10px',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8fafc'
    },
    dropzoneActive: {
      backgroundColor: '#ebf5ff',
      borderColor: '#2980b9'
    },
    dropzoneText: {
      fontSize: '1.1rem',
      color: '#7f8c8d',
      marginBottom: '1rem'
    },
    fileInput: {
      display: 'none'
    },
    browseButton: {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '5px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    fileInfo: {
      backgroundColor: '#f1f9fe',
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1rem'
    },
    fileInfoText: {
      margin: '0.3rem 0',
      color: '#2c3e50'
    },
    fileName: {
      fontWeight: '600',
      color: '#3498db'
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
    message: {
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1rem',
      textAlign: 'center',
      fontWeight: '500'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24'
    },
    uploadIcon: {
      fontSize: '3rem',
      color: '#3498db',
      marginBottom: '1rem'
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Por favor selecciona un archivo');
      return;
    }
    
    setUploading(true);
    
    // Aquí iría la lógica para subir el archivo al servidor
    // Por ahora solo simulamos una carga
    setTimeout(() => {
      setUploading(false);
      setMessage('Archivo subido con éxito');
      setFile(null);
    }, 2000);
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
      <h1 style={styles.title}>Subir Documento</h1>
      <p style={styles.subtitle}>Sube un documento para analizarlo con nuestra herramienta de IA. Aceptamos archivos en formato .txt, .pdf, .doc y .docx.</p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="document" style={styles.label}>Selecciona un archivo:</label>
          
          <div 
            style={{
              ...styles.dropzone,
              ...(dragActive ? styles.dropzoneActive : {})
            }}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('document').click()}
          >
            <div style={styles.uploadIcon}>📄</div>
            <p style={styles.dropzoneText}>
              Arrastra y suelta tu archivo aquí, o
            </p>
            <span style={styles.browseButton}>Buscar archivo</span>
            <input 
              type="file" 
              id="document" 
              onChange={handleFileChange}
              accept=".txt,.pdf,.doc,.docx"
              style={styles.fileInput}
            />
          </div>
        </div>
        
        {file && (
          <div style={styles.fileInfo}>
            <p style={styles.fileInfoText}>
              Archivo seleccionado: <span style={styles.fileName}>{file.name}</span>
            </p>
            <p style={styles.fileInfoText}>
              Tamaño: {(file.size / 1024).toFixed(2)} KB
            </p>
            <p style={styles.fileInfoText}>
              Tipo: {file.type || 'Desconocido'}
            </p>
          </div>
        )}
        
        <button 
          type="submit" 
          style={{
            ...styles.submitButton,
            ...(!file || uploading ? styles.submitButtonDisabled : {})
          }}
          disabled={!file || uploading}
          onMouseEnter={(e) => handleButtonHover(e, !file || uploading)}
          onMouseLeave={(e) => handleButtonLeave(e, !file || uploading)}
        >
          {uploading ? 'Subiendo...' : 'Subir Documento'}
        </button>
      </form>
      
      {message && (
        <div 
          style={{
            ...styles.message,
            ...(message === 'Archivo subido con éxito' ? styles.successMessage : styles.errorMessage)
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default DocumentUpload;