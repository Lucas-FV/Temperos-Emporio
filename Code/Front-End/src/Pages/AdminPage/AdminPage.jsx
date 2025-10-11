import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; 
import './AdminPage.css';

const AdminPage = () => {

  const { logout } = useAuth(); 

  return (
    <div className="admin-page-container">
      
      <header className="admin-header">
        <div className="header-content">
          <h1 className="admin-title">Administração</h1>
          <p className="admin-subtitle">Gerencie todos os produtos e veja dashboards por aqui !</p>
          <button className='logout-button' onClick={logout}>
            Sair (Logout)
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="card-grid">
          
          {/* Cartão de Cadastro de Produtos */}
          {/* O link aponta para a nova rota que criaremos: /admin/produtos/cadastro */}
          <Link to="/admin/produtos" className="admin-card">
            <div className="icon-placeholder">
              <span role="img" aria-label="apple">🍎</span> 
            </div>
            <h2 className="card-title">Cadastro de Produtos</h2>
            <p className="card-description">Gerencie os produtos do estoque</p>
          </Link>

          {/* Cartão de Dashboard Produtos */}
          <Link to="/admin/dashboard" className="admin-card">
            <div className="icon-placeholder">
              <span role="img" aria-label="chart">📊</span> 
            </div>
            <h2 className="card-title">Dashboard Produtos</h2>
            <p className="card-description">Dashboard de quantidade de produtos</p>
          </Link>

        </div>
      </main>
      
    </div>
  );
};

export default AdminPage;