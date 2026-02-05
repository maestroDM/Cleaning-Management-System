import {Header} from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { Services } from "../components/landing/Services";
import { Footer } from "../components/landing/Footer";
import { About} from "../components/landing/About";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Footer />
    </>
  );
}
