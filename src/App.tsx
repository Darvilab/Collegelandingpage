import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { AcademicProgramsPage } from "./pages/AcademicProgramsPage";
import { IndividualProgramPage } from "./pages/IndividualProgramPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academics" element={<AcademicProgramsPage />} />
        <Route path="/academics/:slug" element={<IndividualProgramPage />} />
      </Routes>
    </BrowserRouter>
  );
}
