import "../styles/landing.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <div className="logo-icon">🧼</div>
        <span>CleanFlow</span>
      </div>

      <nav className="nav-links">
        <a href="#services">Services</a>
        <a href="#about">About</a>
      </nav>

      <button className="btn-primary">Login / Sign Up</button>
    </header>
  );
}
