import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { AcademicProgramsPage } from "./pages/AcademicProgramsPage";
import { IndividualProgramPage } from "./pages/IndividualProgramPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { WhatsAppFloatButton } from "./components/WhatsAppFloatButton";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicProgramsPage />} />
          <Route path="/academics/:slug" element={<IndividualProgramPage />} />
        </Routes>
        <ScrollToTop />
        <WhatsAppFloatButton />
      </BrowserRouter>
    </HelmetProvider>
  );
}
