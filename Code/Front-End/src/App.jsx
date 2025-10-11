import React from "react";
import { Routes, Route } from "react-router-dom"; // 👈 Importe Routes e Route
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import ProductListPage from "./Pages/ProducListPage/ProductListPage";
import ProtectedRoute from "./Componentes/ProtectedRoute/ProtectedRoute";

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
      </Route>

      {/* Opcional: Rota para páginas não encontradas */}
      <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
    </Routes>
  );
}
export default App;
