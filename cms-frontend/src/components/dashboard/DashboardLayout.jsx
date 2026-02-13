import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/dashboard.css';

const navItems = {
  admin: [
    { icon: '📊', label: 'Services', href: '/admin', id: 'services' },
    { icon: '📋', label: 'Task Scheduling', href: '/admin/tasks', id: 'tasks' },
    { icon: '✅', label: 'Quality Control', href: '/admin/quality', id: 'quality' },
  ],
  staff: [
    { icon: '📋', label: 'My Tasks', href: '/staff', id: 'tasks' },
  ],
  client: [
    { icon: '📅', label: 'Booking', href: '/client', id: 'booking' },
    { icon: '📜', label: 'My Bookings', href: '/client/bookings', id: 'bookings' },
    
  ],

};

const portalTitles = {
  admin: 'Admin Dashboard',
  staff: 'Staff Portal',
  client: 'Client Portal',
};

export function DashboardLayout({ children, portalType }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = navItems[portalType] || [];

  return (
    <div className="dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          {/* Mobile Menu Button */}
          <button
            className="dashboard-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Logo */}
          <Link to="/" className="dashboard-logo">
            <div className="dashboard-logo-icon">✨</div>
            <span className="dashboard-logo-text">CleanFlow</span>
          </Link>

          <div className="dashboard-header-divider"></div>
          <span className="dashboard-portal-title">{portalTitles[portalType]}</span>
        </div>

        <Link to="/" className="dashboard-logout">
          <span>🚪</span>
          <span className="logout-text">Logout</span>
        </Link>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="dashboard-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="dashboard-nav">
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`dashboard-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="dashboard-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;