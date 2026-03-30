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
    <div className="product-info">
      <p className="product-name">{name}</p>
      <p className="product-price">{price}</p>
      <button className="product-button">Comprar</button>
    </div>
  </div>
);

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Navbar />
      <main className="landing-page">
        {/* SEÇÃO 1: HERO (Agora com suporte para foto de fundo) */}
        <section className="principal-section">
          <div className="principal-content">
            <h1 className="title">Descubra o Sabor da Tradição Artesanal</h1>
            <p className="subtitle">
              Produtos feitos com amor, cuidado e técnicas tradicionais que
              preservam o verdadeiro sabor da natureza!
            </p>
            <div className="button-group">
              <a href="#produtos" className="cta-button produtos">
                Nossos Produtos
              </a>
              <a href="#historia" className="cta-button historia">
                Nossa História
              </a>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: PRODUTOS */}
        <section className="products-section" id="produtos">
          <div className="header-content">
            <h2 className="section-title">Nossas Especialidades</h2>
            <p className="section-description">
              Conheça alguns dos nossos produtos mais amados pelos clientes,
              todos feitos com ingredientes selecionados e técnicas artesanais.
            </p>
          </div>
          <div className="products-grid">
            <ProductCard name="Geleia Rústica de Morango" price="R$ 25,90" />
            <ProductCard name="Queijo Canastra Curado" price="R$ 45,00" />
            <ProductCard name="Mix de Pimentas Especiais" price="R$ 18,50" />
            <ProductCard name="Azeite Trufado Artesanal" price="R$ 89,90" />
          </div>
          <div className="view-all-container">
            <button className="view-all-button">Ver Catálogo Completo</button>
          </div>
        </section>

        {/* SEÇÃO 3: HISTÓRIA */}
        <section className="history-section" id="historia">
          <div className="history-content">
            <h2 className="history-title">De Onde Viemos</h2>
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
            {/* Aqui você pode depois trocar por uma foto real da loja no Cloudinary */}
            <div className="history-placeholder"></div>
          </div>
        </section>

        {/* SEÇÃO 4: LOJA & MAPA */}
        <section className="store-section">
          <div className="store-header">
            <h2 className="store-title">Venha nos Visitar</h2>
            <p className="store-subtitle">
              Sinta o aroma dos nossos temperos de perto.
            </p>
          </div>

          <div className="store-content-grid">
            <div className="contact-card">
              <div className="contact-item">
                <VscLocation className="icons" />
                <p>
                  Avenida Carandaí 415 B <br />
                  Funcionários - Belo Horizonte MG
                </p>
              </div>
              <div className="contact-item">
                <ImPhone className="icons" />
                <p>+55 31 98334-9591</p>
              </div>
              <div className="contact-item">
                <HiMail className="icons" />
                <p>temperos@gmail.com</p>
              </div>
              <div className="contact-item">
                <CiAlarmOn className="icons" />
                <p>Segunda a Sexta: 9h às 19h</p>
              </div>

              <div className="social-links">
                <p>Acompanhe as novidades</p>
                <div className="social-icons">
                  {/* Link do Instagram */}
                  <a
                    href="https://www.instagram.com/temperosemporiogourmet?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="icons" />
                  </a>

                  {/* Link do Facebook */}
                  <a
                    href="https://www.facebook.com/sua_pagina_aqui"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="icons" />
                  </a>
                </div>
              </div>
            </div>

            {/* 🚨 SEU MAPA DO CLOUDINARY ENTRA AQUI */}
            <div className="map-placeholder-container">
              <a
                href="https://maps.app.goo.gl/mUfz1CuAAdGTNwwR9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://res.cloudinary.com/ddotkd48e/image/upload/v1774903840/PostGoogleMaps_oy8qqw.jpg"
                  alt="Avalie-nos no Google Mapas"
                  className="map-image-display"
                />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
