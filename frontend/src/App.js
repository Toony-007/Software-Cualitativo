import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import DocumentUpload from './components/DocumentUpload';
import TextAnalysis from './components/TextAnalysis';
import AnalysisResults from './components/AnalysisResults';
import Visualizations from './components/Visualizations';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<DocumentUpload />} />
            <Route path="/analyze" element={<TextAnalysis />} />
            <Route path="/results/:analysisId" element={<AnalysisResults />} />
            <Route path="/visualize/:analysisId" element={<Visualizations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;