import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductListPage.css";

// Componente para representar cada linha de produto
const ProductItem = ({ id, name, onDelete }) => (
  <div className="product-item">
    <span className="product-name">{name}</span>
    <div className="item-actions">
      <Link
        to={`/admin/produtos/editar/${id}`}
        className="action-button edit-button"
      >
        Editar
      </Link>
      {/* LIGAÇÃO: Chama a função onDelete com os argumentos id e name */}
      <button
        onClick={() => onDelete(id, name)}
        className="action-button delete-button"
      >
        Deletar
      </button>
    </div>
  </div>
);

const ProductListPage = () => {
  // 🚨 1. CORREÇÃO: Adicionar os estados de feedback
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // --- Hook para buscar os produtos do backend ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/produtos");

        if (response.data.success) {
          setProducts(response.data.produtos);
          setError(null);
        } else {
          setError("Falha ao carregar produtos.");
        }
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro de conexão ou servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- LÓGICA DE DELEÇÃO (DELETE) ---
  const handleDeleteProduct = async (id, name) => {
    // 1. Confirmação do Usuário
    if (
      !window.confirm(
        `Tem certeza que deseja deletar o produto: "${name}"? Esta ação é irreversível.`
      )
    ) {
      return;
    }

    setMessage("");
    setIsError(false);

    try {
      // 2. Chamada DELETE API
      const response = await axios.delete(
        `http://localhost:3000/produtos/${id}`
      );

      if (response.status === 200) {
        // 3. Sucesso: Atualiza a lista removendo o produto deletado
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
        setMessage(`✅ Produto "${name}" deletado com sucesso!`);
        setIsError(false);

        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Erro na deleção:", error);
      const msg =
        error.response?.data?.message ||
        "Erro ao deletar o produto. Verifique a conexão.";
      setMessage(`❌ ${msg}`);
      setIsError(true);

      setTimeout(() => setMessage(""), 5000);
    }
  };

  // --- Lógica de Filtro ---
  const filteredProducts = products.filter((product) => {
    const productName = product?.nome;
    if (!productName) return false;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return productName.toLowerCase().includes(lowerSearchTerm);
  });

  // --- Lógica de Renderização ---
  let content;

  if (loading) {
    content = <p className="loading-message">Carregando produtos...</p>;
  } else if (error) {
    content = <p className="error-message">Erro: {error}</p>;
  } else if (filteredProducts.length === 0) {
    content = (
      <p className="no-results">Nenhum produto cadastrado ou encontrado.</p>
    );
  } else {
    content = filteredProducts.map((product) => (
      <ProductItem
        key={product.id}
        id={product.id}
        name={product.nome}
        onDelete={handleDeleteProduct}
      />
    ));
  }

  return (
    <div className="product-list-container">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-info-and-actions">
            <div className="header-titles">
              <h1 className="admin-title">Gestão de Produtos</h1>
              <p className="admin-subtitle">Gerencie todos os produtos do estoque</p>
            </div>
            <Link to="/admin" className="back-to-admin-link">
              &#x2190; Voltar ao Painel
            </Link>
          </div>
        </div>
      </header>
      <main className="product-list-main">
        {/* Mensagem de Feedback */}
        {message && (
          <div className={`feedback-message ${isError ? "error" : "success"}`}>
            <p>{message}</p>
          </div>
        )}

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
            <Link to="/admin/produtos/cadastro" className="new-product-button">
              Novo Produto
            </Link>
          </div>
        </div>
        <div className="product-list">{content}</div>
      </main>
    </div>
  );
};

export default ProductListPage; 