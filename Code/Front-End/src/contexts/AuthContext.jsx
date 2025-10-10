import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Hook personalizado para fácil acesso ao contexto
export const useAuth = () => useContext(AuthContext);

// Provedor de Contexto
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  // 1. Estado para persistir o login (Busca no localStorage na inicialização)
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Erro ao carregar usuário do localStorage:", e);
      return null;
    }
  });

  // Função de Login: Salva o usuário no estado e redireciona
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Redireciona DIRETAMENTE para a área de administração
    navigate('/admin'); 
  };

  // Função de Logout: Limpa o estado e redireciona para a home
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };
  
  // Variáveis exportadas
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // true se user não for null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};