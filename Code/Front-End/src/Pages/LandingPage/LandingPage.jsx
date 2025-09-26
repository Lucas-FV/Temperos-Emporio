import React from "react";
import Navbar from "../../Componentes/Navbar/Navbar";
import "./LandingPage.css";

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
              <button className="cta-button produtos">Conheça nossos produtos</button>
              <button className="cta-button historia">Nossa História</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
