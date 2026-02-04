import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import "../styles/landing.css";
import ServicesSection from "../components/ServicesSection";
import WhyChooseSection from "../components/WhyChooseSection";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <WhyChooseSection />

      <button className="help-btn">?</button>
    </>
  );
}
