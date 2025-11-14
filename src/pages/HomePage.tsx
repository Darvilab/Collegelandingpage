import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>NIET - National Institute of Engineering and Technology | Engineering Programs in Nepal</title>
        <meta name="description" content="NIET (National Institute of Engineering and Technology) offers cutting-edge engineering programs including BTech in AI, BE in Biomedical Engineering, and BE in Computer Engineering. Affiliated with Purbanchal University. Apply for admissions 2026." />
        <meta name="keywords" content="NIET, National Institute of Engineering and Technology, Engineering College Nepal, BTech AI, Biomedical Engineering Nepal, Computer Engineering, Purbanchal University, Engineering Programs Nepal, Engineering Admission 2026" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="NIET - National Institute of Engineering and Technology | Engineering Programs in Nepal" />
        <meta property="og:description" content="NIET offers cutting-edge engineering programs including BTech in AI, BE in Biomedical Engineering, and BE in Computer Engineering. Affiliated with Purbanchal University." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NIET - National Institute of Engineering and Technology" />
        <meta name="twitter:description" content="Cutting-edge engineering programs in AI, Biomedical Engineering, and Computer Engineering. Affiliated with Purbanchal University." />
      </Helmet>
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


