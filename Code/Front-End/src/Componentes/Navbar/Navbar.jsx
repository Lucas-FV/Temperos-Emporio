// src/components/Navbar.jsx

import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a href="/servicos/item1" className="dropdown-item">Serviço 1</a>
                <a href="/servicos/item2" className="dropdown-item">Serviço 2</a>
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