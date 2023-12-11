// Navbar.tsx

import React, { ChangeEvent, useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  onMinLengthChange?: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMinLengthChange }) => {
  const [minLength, setMinLength] = useState('');

  const handleMinLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setMinLength(value);
    if (onMinLengthChange !== undefined) {
      onMinLengthChange(value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onMinLengthChange && minLength.trim() !== '') {
      onMinLengthChange(minLength);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand text-light">Платные дороги</a>
        <button className="navbar-toggle" aria-controls="navbarScroll"></button>
        <div id="navbarScroll" className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/web-course-frontend/" className="nav-link text-light">Главная</a>
            </li>
            <li className="nav-item">
              <a href="#action2" className="nav-link text-light">Корзина</a>
            </li>
          </ul>
          <form className="search-form" id="search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="Минимальная длина"
              className="search-input"
              aria-label="Search"
              value={minLength}
              onChange={handleMinLengthChange}
            />
            <button
              type="submit"
              className="search-button"
              onClick={(e) => {
                e.preventDefault();
                if (onMinLengthChange !== undefined) {
                  onMinLengthChange(minLength);
                }
              }}
            >
              Поиск
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
