import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Footer.css';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: 'Residential Cleaning', href: '#services' },
  { label: 'Commercial Cleaning', href: '#services' },
  { label: 'Deep Cleaning', href: '#services' },
  { label: 'Carpet Cleaning', href: '#services' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">✨</div>
              <span className="footer-logo-text">CleanFlow</span>
            </div>
            <p className="footer-tagline">
              Professional cleaning services that transform spaces and exceed expectations. 
              Your satisfaction is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.label} className="footer-link">
                  {link.href.startsWith('#') ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link to={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              {serviceLinks.map((link) => (
                <li key={link.label} className="footer-link">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <span>📧</span>
              <span>hello@cleanflow.com</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <span>+254 700 123 456</span>
            </div>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} CleanFlow. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;