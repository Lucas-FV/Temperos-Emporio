import React from "react";
import Navbar from "../../Componentes/Navbar/Navbar";
import "./LandingPage.css";

const ProductCard = ({ name, price }) => (
  <div className="product-card">
    <div className="product-image-placeholder"></div>
    <p className="product-name">{name}</p>
    <p className="product-price">{price}</p>
    <button className="product-button">Veja Mais</button>
  </div>
);

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Navbar />
      <main className="landing-page">
        <section className="principal-section">
          <div className="principal-content">
            <h1 className="title">Descubra o Sabor da Tradição Artesanal</h1>
            <p className="subtitle">
              Produtos feitos com amor, cuidado e técnicas tradicionais que
              preservam o verdadeiro sabor da natureza!
            </p>
            <div className="button-group">
              <button className="cta-button produtos">
                Conheça nossos produtos
              </button>
              <button className="cta-button historia">Nossa História</button>
            </div>
          </div>
        </section>
        <section className="products-section">
          <div className="header-content">
            <h2 className="section-title">Produtos em Destaque</h2>
            <p className="section-description">
              Conheça alguns dos nossos produtos mais amados pelos clientes,
              todos feitos com ingredientes selecionados e técnicas artesanais.
            </p>
          </div>
          <div className="products-grid">
            <ProductCard name="Product Name" price="R$ 25,90" />
            <ProductCard name="Product Name" price="R$ 25,90" />
            <ProductCard name="Product Name" price="R$ 25,90" />
            <ProductCard name="Product Name" price="R$ 25,90" />
          </div>
          <div className="view-all-container">
            <button className="view-all-button">Ver Todos os Produtos</button>
          </div>
        </section>
        <section className="historia-sectio">
          <div className="historia-content">
            <h2 className="historia-title">Nossa História</h2>
            
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
