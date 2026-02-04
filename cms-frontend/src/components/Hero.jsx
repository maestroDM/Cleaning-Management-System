import "../styles/landing.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          Streamline your <br />
          cleaning operations <br />
          <span className="highlight">efficiently</span>
        </h1>

        <p>
          Professional cleaning management platform that connects clients
          with expert cleaning services while providing powerful tools
          for staff and administrators.
        </p>

        <div className="hero-actions">
          <button className="btn-primary large">Get Started</button>
          <button className="btn-outline large">Learn More</button>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1581579185169-1a47c2f98a68"
          alt="Cleaning team"
        />
      </div>
    </section>
  );
}
