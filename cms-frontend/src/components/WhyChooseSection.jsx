import "../styles/landing.css";

export default function WhyChooseSection() {
  return (
    <section className="why-section" id="about">
      <div className="why-grid">

        {/* IMAGE */}
        <div className="why-image">
          <img
            src="https://images.unsplash.com/photo-1603714228681-b399854b8f80"
            alt="Professional cleaning staff"
          />
        </div>

        {/* CONTENT */}
        <div className="why-content">
          <h2>Why Choose CleanFlow?</h2>

          <p className="why-description">
            We combine cutting-edge technology with professional expertise to
            deliver exceptional cleaning services. Our platform ensures
            seamless coordination, quality assurance, and customer
            satisfaction.
          </p>

          <div className="why-features">

            <div className="why-feature">
              <div className="feature-icon blue">🛡️</div>
              <div>
                <h4>Trusted Professionals</h4>
                <p>
                  All our staff are vetted, trained, and insured for your
                  peace of mind.
                </p>
              </div>
            </div>

            <div className="why-feature">
              <div className="feature-icon purple">⏰</div>
              <div>
                <h4>Flexible Scheduling</h4>
                <p>
                  Book services at times that work best for you, with
                  real-time availability.
                </p>
              </div>
            </div>

            <div className="why-feature">
              <div className="feature-icon green">⭐</div>
              <div>
                <h4>Quality Guaranteed</h4>
                <p>
                  Every task is verified for quality before completion
                  is confirmed.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
