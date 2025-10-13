import React from "react";
import ProtectedRoute from "./Componentes/ProtectedRoute/ProtectedRoute";
import { Routes, Route } from "react-router-dom"; // 👈 Importe Routes e Route
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import ProductListPage from "./Pages/ProducListPage/ProductListPage";
import ProductRegisterPage from "./Pages/ProductRegisterPage/ProductRegisterPage";

function App() {
  return (
    <Routes>
      {/* ROTAS PUBLICAS */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ROTAS PROTEGIDAS */}
      <Route element={<ProtectedRoute/>}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/produtos" element={<ProductListPage />} />
        <Route path="/admin/produtos/cadastro" element={<ProductRegisterPage />} />
      </Route>

      {/* Opcional: Rota para páginas não encontradas */}
      <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
    </Routes>
  );
}
export default App;
