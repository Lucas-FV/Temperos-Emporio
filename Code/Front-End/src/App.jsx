import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 👈 Importe Routes e Route
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage'; 

function App() {
  return (
    <Routes>
      {/* Rota Raiz: Exibe a Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Rota /login: Exibe a Página de Login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Opcional: Rota para páginas não encontradas */}
      <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
    </Routes>
  );
} 
export default App
