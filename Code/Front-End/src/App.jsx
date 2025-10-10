import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 👈 Importe Routes e Route
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage'; 
import AdminPage from './Pages/AdminPage/AdminPage';
import ProductListPage from './Pages/ProducListPage/ProductListPage';

function App() {
  return (
    <Routes>
      {/* Rota Raiz: Exibe a Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Rota /login: Exibe a Página de Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rota /admin: Exibe a Página de Admin */}
      <Route path='/admin' element={<AdminPage/>} />

      {/* Produto Rotas: Listagem, Cadastro e Edição */}
      <Route path="/admin/produtos" element={<ProductListPage />} />
      
      {/* Opcional: Rota para páginas não encontradas */}
      <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
    </Routes>
  );
} 
export default App
