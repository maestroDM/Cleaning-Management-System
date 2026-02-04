import React from 'react';
import '../../styles/components/About.css';

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '1,200+', label: 'Projects Completed' },
  { value: '50+', label: 'Team Members' },
  { value: '5 Years', label: 'Experience' },
];

const highlights = [
  {
    icon: '🏆',
    title: 'Quality Guaranteed',
    description: '100% satisfaction on every job',
  },
  {
    icon: '⚡',
    title: 'Fast Response',
    description: 'Same-day service available',
  },
  {
    icon: '🔒',
    title: 'Insured & Bonded',
    description: 'Your property is protected',
  },
];

export function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          {/* Text Content */}
          <div className="about-text">
            <span className="about-label">About CleanFlow</span>
            <h2 className="about-title">
              Your Trusted Partner in Professional Cleaning
            </h2>
            <p className="about-description">
              At CleanFlow, we believe that a clean environment is essential for 
              productivity, health, and happiness. Our team of dedicated professionals 
              uses eco-friendly products and modern techniques to deliver exceptional 
              results every time.
            </p>

            <div className="about-highlights">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="about-highlight">
                  <div className="about-highlight-icon">{highlight.icon}</div>
                  <div className="about-highlight-text">
                    <h4>{highlight.title}</h4>
                    <p>{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="about-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;