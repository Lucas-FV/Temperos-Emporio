import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Componentes/Navbar/Navbar";
import Footer from "../../Componentes/Footer/Footer";
import { FiSearch, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./AllProductsPage.css";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados dos Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedCategories, setSelectedCategories] = useState({
    Geleia: false,
    Pao: false,
    Queijo: false,
    Conservas: false,
  });

  // Busca inicial dos produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/produtos");
        if (response.data.success) {
          setProducts(response.data.produtos);
          setFilteredProducts(response.data.produtos); // Inicia mostrando todos
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Manipula as checkboxes de categoria
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setSelectedCategories((prev) => ({ ...prev, [name]: checked }));
  };

  // Função disparada ao clicar no botão "Aplicar Filtros"
  const handleApplyFilters = () => {
    let result = products;

    // 1. Filtro de Busca (Nome)
    if (searchTerm) {
      result = result.filter((p) =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filtro de Categoria
    const activeCategories = Object.keys(selectedCategories).filter(
      (cat) => selectedCategories[cat]
    );
    if (activeCategories.length > 0) {
      result = result.filter((p) => activeCategories.includes(p.categoria));
    }

    // 3. Filtro de Preço
    result = result.filter((p) => parseFloat(p.preco) <= maxPrice);

    setFilteredProducts(result);
  };

  return (
    <div className="products-page-container">
      <Navbar />

      {/* HEADER DA PÁGINA */}
      <header className="products-header">
        <div className="products-header-content">
          <h1>Nossos Produtos</h1>
          <p>
            Descubra nossa seleção de produtos artesanais feitos com amor e
            tradição
          </p>
        </div>
      </header>

      <main className="products-main-layout">
        {/* SIDEBAR DE FILTROS */}
        <aside className="filters-sidebar">
          <h2>Filtros</h2>

          {/* Busca */}
          <div className="filter-group">
            <label className="filter-title">Buscar</label>
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar Produtos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categorias */}
          <div className="filter-group">
            <label className="filter-title">Categorias</label>
            <div className="checkbox-list">
              {Object.keys(selectedCategories).map((cat) => (
                <label key={cat} className="checkbox-item">
                  <input
                    type="checkbox"
                    name={cat}
                    checked={selectedCategories[cat]}
                    onChange={handleCategoryChange}
                  />
                  <span className="checkmark"></span>
                  {cat === "Pao" ? "Pães" : cat}
                </label>
              ))}
            </div>
          </div>

          <hr className="filter-divider" />

          {/* Preço */}
          <div className="filter-group">
            <label className="filter-title">Preço</label>
            <input
              type="range"
              min="0"
              max="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-labels">
              <span>R$ 0</span>
              <span>R$ {maxPrice}</span>
            </div>
          </div>

          <hr className="filter-divider" />

          {/* Disponibilidade (Visual) */}
          <div className="filter-group">
            <label className="filter-title">Disponibilidade</label>
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Em Estoque
            </label>
          </div>

          <button className="apply-filters-btn" onClick={handleApplyFilters}>
            Aplicar Filtros
          </button>
        </aside>

        {/* GRID DE PRODUTOS */}
        <section className="products-grid-area">
          {loading ? (
            <p className="loading-text">Carregando produtos...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((produto) => (
              <div className="catalog-card" key={produto.id}>
                <div className="catalog-image-area">
                  {/* Badge de Destaque */}
                  {produto.destaque && <span className="badge-destaque">Destaque</span>}
                  
                  {/* Ícone de Favorito */}
                  <FiHeart className="favorite-icon" />

                  {produto.imagem_url ? (
                    <img src={produto.imagem_url} alt={produto.nome} />
                  ) : (
                    <div className="image-placeholder-icon">📷</div>
                  )}
                </div>

                <div className="catalog-info">
                  <span className="catalog-category">{produto.categoria}</span>
                  <h3 className="catalog-name">{produto.nome}</h3>
                  <p className="catalog-price">
                    R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                  </p>
                  <span className="catalog-weight">{produto.peso || "---"}</span>
                  
                  <button 
                    className="catalog-details-btn"
                    onClick={() => navigate(`/produto/${produto.id}`)}
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products-found">
              <p>Nenhum produto encontrado com esses filtros.</p>
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setMaxPrice(100);
                  setSelectedCategories({Geleia: false, Pao: false, Queijo: false, Conservas: false});
                  setFilteredProducts(products);
                }}
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;