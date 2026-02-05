import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Header.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">✨</div>
          <span className="header-logo-text">CleanFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <a href="#services" className="header-nav-link">Services</a>
          <a href="#about" className="header-nav-link">About</a>
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions">
          <Link to="/login" className="btn btn-ghost">Log In</Link>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="header-mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="header-mobile-menu">
          <nav className="header-mobile-nav">
            <a
              href="#services"
              className="header-mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="header-mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </nav>
          <div className="header-mobile-actions">
            <Link to="/login" className="btn btn-secondary">Log In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
