// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react'; // Importe useRef
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animating, setAnimating] = useState(false); // Novo estado para animação
  const dropdownRef = useRef(null); // Ref para o elemento do dropdown

  // Função para abrir/fechar o dropdown
  const toggleDropdown = () => {
    if (dropdownOpen) {
      setAnimating(true); // Inicia animação de saída
    } else {
      setDropdownOpen(true); // Abre o dropdown
      setAnimating(true); // Inicia animação de entrada
    }
  };

  // Efeito para lidar com a animação de saída
  useEffect(() => {
    if (animating && !dropdownOpen && dropdownRef.current) {
      // Quando o dropdown está fechando e animando
      const handler = () => {
        setAnimating(false);
        dropdownRef.current.removeEventListener('animationend', handler);
      };
      dropdownRef.current.addEventListener('animationend', handler);
    } else if (animating && dropdownOpen) {
      // Quando o dropdown está abrindo
      setAnimating(false); // A animação de entrada não precisa de um ouvinte para terminar de verdade
    }
  }, [animating, dropdownOpen]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.closest('.dropdown-toggle') !== dropdownRef.current) {
        if (dropdownOpen) {
          setAnimating(true); // Inicia animação de saída
          setDropdownOpen(false); // Fecha o dropdown (o CSS vai lidar com a animação)
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">Temperos</h1>
        <div className="navbar-links-container">
          <a href="/" className="navbar-link">Início</a>
          <a href="/sobre" className="navbar-link">Sobre</a>
          <div className="dropdown-container">
            <span className="navbar-link dropdown-toggle" onClick={toggleDropdown}>
              Serviços <span className="arrow-down">▼</span>
            </span>
            {/* Renderiza o dropdown apenas se estiver aberto OU animando */}
            {(dropdownOpen || animating) && (
              <div
                ref={dropdownRef} // Atribui a ref ao elemento
                className={`dropdown-menu ${dropdownOpen ? 'dropdown-enter' : 'dropdown-exit'}`}
                onAnimationEnd={() => {
                  if (!dropdownOpen && animating) {
                    setAnimating(false);
                  }
                }}
              >
                <a href="/servicos/item1" className="dropdown-item">Serviço 1</a>
                <a href="/servicos/item2" className="dropdown-item">Serviço 2</a>
                {/* Adicione mais itens aqui */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <button className="login-button">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;