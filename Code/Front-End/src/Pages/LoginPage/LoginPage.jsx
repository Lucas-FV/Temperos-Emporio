import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../../contexts/AuthContext'; 
import "./LoginPage.css";

const LoginPage = () => {
  const auth = useAuth();
  const login = auth?.login || (() => {});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loginPayload = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginPayload
      );

      if (response.data.success) {
        const userData = response.data.user;

        // 🚨 AÇÃO CRÍTICA: Chama a função login do Contexto.
        // Esta função SALVA o usuário e REDIRECIONA para /admin.
        login(userData);

        // Não é necessário alertar ou console.log aqui, o login faz o redirect.
      } else {
        // Trata o caso raro de status 200 com sucesso: false
        setError(
          response.data.message || "Credenciais inválidas. Tente novamente."
        );
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Erro de credenciais (401)
        setError(err.response.data.message || "Credenciais inválidas.");
      } else {
        // Erro de conexão/servidor
        setError("Não foi possível conectar ao servidor. Verifique o backend.");
        console.error("Erro de requisição:", err);
      }
    } finally {
      // 🚨 Remover o setTimeout antigo, e deixar apenas o estado final
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Logando..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
