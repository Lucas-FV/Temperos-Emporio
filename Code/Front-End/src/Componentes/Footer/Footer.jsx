import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/*Coluna Branding*/}
        <div className="footer-col branding-col">
          <div className="footer-logo">
            <FaShoppingBag className="footer-icon" />
            <h3>Temperos Empório</h3>
          </div>
          <p className="footer-description">
            Produtos especiais selecionados com cuidado para sua casa
          </p>
        </div>
        {/*Coluna Produtos*/}
        <div className="footer-col product-col">
          <h3>Produtos</h3>
          <ul>
            <li>
              <a href="">Geleias</a>
            </li>
            <li>
              <a href="">Queijos</a>
            </li>
            <li>
              <a href="">Pães</a>
            </li>
            <li>
              <a href="">Conservas</a>
            </li>
          </ul>
        </div>
        {/*Coluna Institucional*/}
        <div className="footer-col institucional-col">
          <h3>Institucional</h3>
          <ul>
            <li>
              <a href="#historia">Sobre Nós</a>
            </li>
            <li>
              <a href="/parceiros">Produtores Parceiros</a>
            </li>
            <li>
              <a href="/privacidade">Política de Privacidade</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
         <p>© 2025 Temperos Empório. Todos os direitos reservados</p>
      </div>
    </footer>
  );
};
