import React from "react";
import Navbar from "../../Componentes/Navbar/Navbar";
import Footer from "../../Componentes/Footer/Footer";
import "./LandingPage.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiAlarmOn } from "react-icons/ci";
import { ImPhone } from "react-icons/im";
import { VscLocation } from "react-icons/vsc";
import { HiMail } from "react-icons/hi";

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
              <a href="#produtos" className="cta-button produtos">Conheça Nossos Produtos</a>
              <a href="#historia" className="cta-button historia">Nossa História</a>
            </div>
          </div>
        </section>
        <section className="products-section" id="produtos">
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
        <section className="history-section" id="historia">
          <div className="history-content">
            <h2 className="history-title">Nossa História</h2>
            <p>
              Fundado em 2025, o Temperos Empório Gourmet nasceu da paixão por
              produtos autênticos e de qualidade, trazendo o melhor para nossos
              clientes.
            </p>
            <p>
              Buscamos incansavelmente os melhores produtos artesanais,
              visitando feiras, fazendas e oficinas para trazer até você o que
              há de melhor na produção artesanal brasileira.
            </p>
            <p>
              Nossa missão é conectar produtores talentosos diretamente aos
              consumidores, preservando técnicas tradicionais e promovendo uma
              alimentação mais consciente e saborosa.
            </p>
          </div>
          <div className="history-image-container">
            <div className="history-placeholder"></div>
          </div>
        </section>
        <section className="store-section">
          <h2 className="store-title">Visite Nossa Loja</h2>
          <div className="store-content-grid">
            <div className="contact-card">
              {/*Endereço*/}
              <div className="contact-item">
                <VscLocation className="icons"/>
                <p>
                  Avenida Carandaí 415 B <br />
                  Funcionários - Belo Horizonte MG
                </p>
              </div>
              {/*Telefone*/}
              <div className="contact-item">
                <ImPhone className="icons"/>
                <p>+55 31 98334-9591</p>
              </div>
              {/* Email */}
              <div className="contact-item">
                <HiMail className="icons"/>
                <p>temperos@gmail.com</p>
              </div>
              {/* Horário */}
              <div className="contact-item">
                <CiAlarmOn className="icons"/>
                <p>Segunda a Sexta: 9h às 19h</p>
              </div>
              <div className="social-links">
                <p>Siga-nos nas Redes Sociais</p>
                <div className="social-icons">
                  <FaInstagram className="icons"/>
                  <FaFacebook className="icons"/>
                </div>
              </div>
            </div>
            <div className="map-placeholder-container">
              <div className="map-placeholder"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default LandingPage;
