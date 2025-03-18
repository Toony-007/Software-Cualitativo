import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { uploadDocument } from '../utils/api';
import '../styles/DocumentUpload.css';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Configuración de react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        
        // Detectar tipo de documento automáticamente
        const fileName = acceptedFiles[0].name.toLowerCase();
        if (fileName.endsWith('.pdf')) {
          setDocumentType('pdf');
        } else if (fileName.endsWith('.docx')) {
          setDocumentType('docx');
        } else if (fileName.endsWith('.txt')) {
          setDocumentType('txt');
        } else if (fileName.endsWith('.csv')) {
          setDocumentType('csv');
        } else if (fileName.endsWith('.json')) {
          setDocumentType('json');
        }
        
        setError('');
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Por favor selecciona un archivo');
      return;
    }
    
    if (!documentType) {
      setError('Por favor selecciona el tipo de documento');
      return;
    }
    
    try {
      setIsUploading(true);
      setError('');
      
      const response = await uploadDocument(file, documentType);
      
      // Redirigir a la página de análisis con el ID del documento
      navigate(`/analyze?documentId=${response.id}`);
      
    } catch (err) {
      console.error('Error al subir documento:', err);
      setError(err.response?.data?.detail || 'Error al subir el documento');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="document-upload-container">
      <h1>Subir Documento</h1>
      
      <div className="upload-section">
        <form onSubmit={handleSubmit}>
          <div 
            {...getRootProps()} 
            className={`dropzone ${isDragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="file-info">
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div className="dropzone-content">
                <p>Arrastra un archivo aquí o haz clic para seleccionar</p>
                <p className="dropzone-hint">Formatos soportados: PDF, DOCX, TXT, CSV, JSON</p>
              </div>
            )}
          </div>
          
          <div className="document-type-selector">
            <label htmlFor="document-type">Tipo de Documento:</label>
            <select 
              id="document-type" 
              value={documentType} 
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <option value="">Seleccionar tipo...</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="txt">TXT</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="upload-button"
            disabled={isUploading || !file}
          >
            {isUploading ? 'Subiendo...' : 'Subir Documento'}
          </button>
        </form>
      </div>
      
      <div className="upload-instructions">
        <h2>Instrucciones</h2>
        <ul>
          <li>Selecciona un archivo en formato PDF, DOCX, TXT, CSV o JSON.</li>
          <li>El tamaño máximo permitido es de 10 MB.</li>
          <li>Asegúrate de que el documento contenga texto que pueda ser extraído.</li>
          <li>Una vez subido, serás redirigido a la página de análisis.</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpload;