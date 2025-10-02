import React, { useState } from "react";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import "./LoginPage.css";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    //Funcao de Login
    const loginPayload = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('http://localhost:3000/login', loginPayload);
      if (response.data.success){
         console.log("Login SUCESSO!!");
         alert(`Bem-Vindo, ${response.data.user.username}!`)
      }
    } catch (err) {
      if (err.response && err.response.status === 401){
         setError(err.response.data.message || 'Credenciais inválidas.');
      } else {
         setError('Não foi possível conectar ao servidor. Verifique o backend.');
         console.error("Erro de requisição:", err);
      }
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Logando...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;