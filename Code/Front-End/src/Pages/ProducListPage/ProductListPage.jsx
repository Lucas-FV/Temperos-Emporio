import React, { useState } from "react";
import { Link } from "react-router-dom";
import './ProductListPage.css';

// Componente para representar cada linha de produto
const ProductItem = ({ name }) => (
  <div className="product-item">
    <span className="product-name">{name}</span>
    <div className="item-actions">
      {/* O link para Edição/Update irá para uma rota com o ID do produto */}
      <Link
        to={`/admin/produtos/editar/1`}
        className="action-button edit-button"
      >
        Editar
      </Link>
      {/* O botão Deletar fará uma requisição DELETE no backend */}
      <button className="action-button delete-button">Deletar</button>
    </div>
  </div>
);

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Lista de produtos mockada (depois virá do backend via useEffect)
  const products = [
    { id: 1, name: "Geleia de Jabuticaba" },
    { id: 2, name: "Mel Orgânico Silvestre" },
    { id: 3, name: "Pão de Fermentação Natural" },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <header className="admin-header">
        <div className="header-content">
          <h1 className="admin-title">Cadastro de Produtos</h1>
          <p className="admin-subtitle">
            Gerencie todos os produtos do estoque
          </p>
        </div>
      </header>

      <main className="product-list-main">
        {/* Seção de Busca e Botão Novo Produto */}
        <div className="list-controls">
          <h2 className="list-title">Visualização de Produtos</h2>
          <div className="search-and-new">
            <input
              type="text"
              placeholder="Busque pelo produto"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Link para a página de Cadastro de Produtos (CREATE) */}
            <Link to="/admin/produtos/cadastro" className="new-product-button">
              Novo Produto
            </Link>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} name={product.name} />
          ))}

          {filteredProducts.length === 0 && (
            <p className="no-results">Nenhum produto encontrado.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
