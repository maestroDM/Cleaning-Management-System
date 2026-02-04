import React from 'react';
import '../../styles/components/Services.css';

const services = [
  {
    icon: '🏠',
    title: 'Residential Cleaning',
    description: 'Transform your home into a spotless sanctuary with our comprehensive residential cleaning services.',
    features: [
      'Regular house cleaning',
      'Kitchen and bathroom sanitization',
      'Bedroom and living area dusting',
      'Floor mopping and vacuuming',
      'Window and mirror cleaning',
    ],
  },
  {
    icon: '🏢',
    title: 'Commercial Cleaning',
    description: 'Keep your workspace pristine and professional with our tailored commercial cleaning solutions.',
    features: [
      'Office space cleaning',
      'Reception and common areas',
      'Meeting room sanitization',
      'Restroom deep cleaning',
      'Waste management and recycling',
    ],
  },
  {
    icon: '✨',
    title: 'Deep Cleaning',
    description: 'Experience the ultimate clean with our intensive deep cleaning services for thorough transformations.',
    features: [
      'Move-in/move-out cleaning',
      'Spring cleaning packages',
      'Post-renovation cleanup',
      'Appliance deep cleaning',
      'Carpet and upholstery care',
    ],
  },
];

const additionalServices = [
  { icon: '🧹', title: 'Carpet Cleaning', description: 'Professional carpet and rug care' },
  { icon: '🪟', title: 'Window Washing', description: 'Crystal clear windows inside & out' },
  { icon: '💨', title: 'Air Duct Cleaning', description: 'Improve air quality and freshness' },
];

export function Services() {
  return (
    <section id="services" className="services">
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <span className="services-label">Our Services</span>
          <h2 className="services-title">Comprehensive Cleaning Solutions</h2>
          <p className="services-subtitle">
            From daily maintenance to deep cleaning transformations, we offer a full range
            of professional cleaning services tailored to your needs.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <div className="service-icon-wrapper">
                <span className="service-icon">{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature) => (
                  <li key={feature} className="service-feature">
                    <span className="service-feature-dot"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="additional-services">
          {additionalServices.map((service) => (
            <div key={service.title} className="additional-service">
              <div className="additional-service-icon">{service.icon}</div>
              <div className="additional-service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;