import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Hero.css';

const features = [
  { text: 'Professional cleaning teams', icon: '✓' },
  { text: 'Flexible scheduling', icon: '✓' },
  { text: 'Transparent pricing', icon: '✓' },
];

export function Hero() {
  return (
    <section className="hero">
      {/* Background decoration */}
      <div className="hero-bg-decoration">
        <div className="hero-bg-circle-1"></div>
        <div className="hero-bg-circle-2"></div>
      </div>

      <div className="hero-container">
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          <span className="hero-badge-text">Trusted by 500+ businesses</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Streamline your cleaning
          <span className="hero-title-highlight">operations efficiently</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          CleanFlow is the all-in-one platform for managing cleaning services,
          scheduling tasks, and delighting customers with spotless results.
        </p>

        {/* Features */}
        <div className="hero-features">
          {features.map((feature) => (
            <div key={feature.text} className="hero-feature">
              <span className="hero-feature-icon">{feature.icon}</span>
              <span className="hero-feature-text">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-actions">
          <Link to="/auth?mode=signup" className="hero-btn-primary">
            Get Started Free
            <span>→</span>
          </Link>
          <a href="#services" className="hero-btn-secondary">
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;