import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import MeshGlassSection from "@/components/MeshGlassSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <MeshGlassSection />
        <div id="applications">
          <ApplicationsSection />
        </div>
        <TrustSection />
        <CTASection />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
