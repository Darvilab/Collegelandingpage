import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ProgramsSection } from "../components/ProgramsSection";
import { WhyNIETSection } from "../components/WhyNIETSection";
import { CampusLifeSection } from "../components/CampusLifeSection";
import { AdmissionProcessSection } from "../components/AdmissionProcessSection";
import { RecognitionSection } from "../components/RecognitionSection";
import { FAQSection } from "../components/FAQSection";
import { FinalCTASection } from "../components/FinalCTASection";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProgramsSection />
        <WhyNIETSection />
        <CampusLifeSection />
        <AdmissionProcessSection />
        <RecognitionSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}

