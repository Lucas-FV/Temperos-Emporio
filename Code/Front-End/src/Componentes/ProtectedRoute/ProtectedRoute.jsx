import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = () => {
  // Obtém o status de autenticação do Contexto
  const { isAuthenticated } = useAuth();

  // Se o usuário NÃO estiver logado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se o usuário ESTIVER logado, renderiza o conteúdo da rota aninhada
  return <Outlet />;
};

export default ProtectedRoute;
