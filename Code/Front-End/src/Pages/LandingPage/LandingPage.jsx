import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Componentes/Navbar/Navbar";
import Footer from "../../Componentes/Footer/Footer";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiAlarmOn } from "react-icons/ci";
import { ImPhone } from "react-icons/im";
import { VscLocation } from "react-icons/vsc";
import { HiMail } from "react-icons/hi";

// 🚨 COMPONENTE DO CARD ATUALIZADO (Agora recebe a imagem!)
const ProductCard = ({ name, price, imageUrl }) => (
  <div className="product-card">
    <div className="product-image-placeholder">
      {/* Se tiver imagem no banco, ele mostra. Se não, mostra o fundo vazio. */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
        />
      )}
    </div>
    <div className="product-info">
      <p className="product-name">{name}</p>
      {/* Formata o preço para o padrão brasileiro (R$ 0,00) */}
      <p className="product-price">
        R$ {Number(price).toFixed(2).replace(".", ",")}
      </p>
      <button className="product-button">Comprar</button>
    </div>
  </div>
);

function LandingPage() {
  // 🚨 1. Estado para guardar os produtos em destaque
  const [produtosDestaque, setProdutosDestaque] = useState([]);

  // 🚨 2. Busca os produtos no Back-End quando a página carrega
  useEffect(() => {
    const buscarDestaques = async () => {
      try {
        const response = await axios.get("http://localhost:3000/produtos");

        if (response.data.success) {
          // Filtra a lista inteira para pegar APENAS os que são destaque
          const apenasDestaques = response.data.produtos.filter(
            (p) => p.destaque === true,
          );
          setProdutosDestaque(apenasDestaques);
        }
      } catch (error) {
        console.error("Erro ao carregar os produtos em destaque:", error);
      }
    };

    buscarDestaques();
  }, []);

  return (
    <div className="landing-page-container">
      <Navbar />
      <main className="landing-page">
        {/* SEÇÃO 1: HERO */}
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
            {/* 🚨 3. Loop mágico: Cria um card para cada produto em destaque! */}
            {produtosDestaque.length > 0 ? (
              produtosDestaque.map((produto) => (
                <ProductCard
                  key={produto.id}
                  name={produto.nome}
                  price={produto.preco}
                  imageUrl={produto.imagem_url}
                />
              ))
            ) : (
              <p
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  color: "#666",
                }}
              >
                Nenhum produto em destaque no momento.
              </p>
            )}
          </div>

          <div className="view-all-container">
            <Link
              to="/produtos"
              className="view-all-button"
              style={{ textDecoration: "none" }}
            >
              Ver Catálogo Completo
            </Link>
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
            <img
              src="https://res.cloudinary.com/ddotkd48e/image/upload/v1774905627/FachadaEmporio_jr02e1.jpg"
              alt="Fachada da loja Temperos Empório Gourmet em Belo Horizonte"
              className="history-image"
            />
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
                <p>
                  Segunda a Sábado: 8h às 19h
                  <br /> Domingo: 8:30h às 12:30h
                </p>
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

            {/* SEU MAPA DO CLOUDINARY ENTRA AQUI */}
            <div className="map-placeholder-container">
              <a
                href="https://maps.app.goo.gl/mUfz1CuAAdGTNwwR9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://res.cloudinary.com/ddotkd48e/image/upload/v1774903840/PostGoogleMaps_oy8qqw.jpg"
                  alt="Avalie o Temperos Empório Gourmet no Google Mapas"
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
