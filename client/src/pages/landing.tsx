import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div data-testid="page-landing" className="min-h-screen bg-background golden-mist">
      <div className="golden-mist-orb golden-mist-orb-1" />
      <div className="golden-mist-orb golden-mist-orb-2" />
      <div className="golden-mist-orb golden-mist-orb-3" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Footer />
    </div>
  );
}
