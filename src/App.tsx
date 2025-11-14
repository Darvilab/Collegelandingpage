import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { AcademicProgramsPage } from "./pages/AcademicProgramsPage";
import { IndividualProgramPage } from "./pages/IndividualProgramPage";
import { FacultyListingPage } from "./pages/FacultyListingPage";
import { IndividualFacultyPage } from "./pages/IndividualFacultyPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollToTopOnRouteChange } from "./components/ScrollToTopOnRouteChange";
import { WhatsAppFloatButton } from "./components/WhatsAppFloatButton";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTopOnRouteChange />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicProgramsPage />} />
          <Route path="/academics/:slug" element={<IndividualProgramPage />} />
          <Route path="/faculty-and-staff" element={<FacultyListingPage />} />
          <Route path="/faculty-and-staff/:slug" element={<IndividualFacultyPage />} />
        </Routes>
        <ScrollToTop />
        <WhatsAppFloatButton />
      </BrowserRouter>
    </HelmetProvider>
  );
}
