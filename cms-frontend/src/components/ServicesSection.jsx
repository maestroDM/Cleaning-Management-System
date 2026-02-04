import "../styles/landing.css";

export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <h2>Our Services</h2>
        <p>Professional cleaning solutions tailored to your needs</p>
      </div>

      <div className="services-grid">

        {/* Residential */}
        <div className="service-card blue">
          <div className="icon-box blue">
            🏠
          </div>
          <h3>Residential Cleaning</h3>
          <p>
            Transform your home into a spotless sanctuary with our
            comprehensive residential cleaning services.
          </p>
          <ul>
            <li>Regular House Cleaning</li>
            <li>Kitchen & Bathroom Sanitization</li>
            <li>Dusting & Vacuuming</li>
          </ul>
        </div>

        {/* Commercial */}
        <div className="service-card purple">
          <div className="icon-box purple">
            🏢
          </div>
          <h3>Commercial Cleaning</h3>
          <p>
            Maintain a professional and hygienic workspace with our
            specialized commercial cleaning solutions.
          </p>
          <ul>
            <li>Office Cleaning</li>
            <li>Restroom Maintenance</li>
            <li>Common Area Sanitization</li>
          </ul>
        </div>

        {/* Deep Cleaning */}
        <div className="service-card green">
          <div className="icon-box green">
            ✨
          </div>
          <h3>Deep Cleaning</h3>
          <p>
            Intensive cleaning services that tackle every corner and
            hidden area for a truly pristine environment.
          </p>
          <ul>
            <li>Carpet & Upholstery Deep Clean</li>
            <li>Steam Cleaning</li>
            <li>Post-Renovation Cleanup</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
