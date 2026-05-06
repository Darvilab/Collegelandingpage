import * as React from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getAllPrograms } from "../data/programs";
import { SHOW_FACULTY_AND_STAFF } from "../config/features";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHeroSection, setPastHeroSection] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Background changes as soon as scroll starts
      setScrolled(window.scrollY > 20);

      // Text color only changes after scrolling past hero section
      const heroSection = document.querySelector('section[class*="min-h-screen"]');
      if (heroSection && location.pathname !== '/apply') {
        const heroRect = heroSection.getBoundingClientRect();
        const heroHeight = heroRect.height;
        const scrollPosition = window.scrollY;
        // Change text color when scrolled past the hero section
        setPastHeroSection(scrollPosition > heroHeight - 100);
      } else {
        // Fallback: if no hero section found (e.g., on other pages) or explicitly on /apply
        setPastHeroSection(window.scrollY > 20 || location.pathname === '/apply');
      }
    };

    const checkInitialState = () => {
      // Always start with white text on pages with hero sections (dark background)
      const heroSection = document.querySelector('section[class*="min-h-screen"]');
      if (heroSection && location.pathname !== '/apply') {
        setPastHeroSection(false);
      } else if (location.pathname === '/apply') {
        setPastHeroSection(true);
      }
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    // Check on mount and when route changes in case page loads with scroll position
    // Use a small delay to ensure DOM is ready
    setTimeout(checkInitialState, 150);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAcademicsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allPrograms = getAllPrograms();
  const programs = [
    ...allPrograms.map(p => ({
      name: p.title,
      href: `/academics/${p.slug}`,
      icon: p.icon,
      isNew: (p.title.includes("Artificial Intelligence") || p.title.includes("Computer Engineering")) && new Date().getFullYear() === 2025,
      descriptor: p.title.includes("Artificial Intelligence")
        ? "Machine Learning • Deep Learning • AI Systems"
        : p.title.includes("Biomedical")
          ? "Healthcare Technology • Medical Devices • Diagnostics"
          : p.title.includes("Computer")
            ? "Hardware-Software Integration • Embedded Systems • Cybersecurity"
            : ""
    }))
  ];

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    // { name: "Notice", href: "/notice" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/50 backdrop-blur-xl shadow-lg border-b border-cyan-100/30' : 'bg-transparent'
      }`}>
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="NIET Logo"
                className="w-14 h-14 lg:w-16 lg:h-16 object-contain rounded-full group-hover:scale-105 transition-transform"
              />
              <div className="absolute -inset-1 bg-gradient-to-br from-[#0d4e92] to-cyan-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className={`niet-text text-2xl transition-colors ${pastHeroSection ? 'text-gray-900' : 'text-white'}`}>NIET</span>
              <span className={`text-xs transition-colors ${pastHeroSection ? 'text-gray-500' : 'text-gray-400'}`}>(FORMER COLLEGE OF BIOMEDICAL ENGINEERING AND APPLIED SCIENCES)</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <div key={item.name} className="relative flex flex-col items-center pb-3">
                  <NavLink
                    to={item.href}
                    className={`px-5 py-2 rounded-full transition-all duration-200 ${pastHeroSection
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {item.name}
                  </NavLink>
                  {isActive && (
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full z-10 shadow-[0_0_4px_1.5px_rgba(255,255,255,0.9)] ${pastHeroSection ? 'bg-[#0d4e92]' : 'bg-white'}`}></span>
                  )}
                </div>
              );
            })}

            {/* Academics Dropdown */}
            <div className="relative flex flex-col items-center pb-3" ref={dropdownRef}>
              <button
                onClick={() => setAcademicsDropdownOpen(!academicsDropdownOpen)}
                aria-expanded={academicsDropdownOpen}
                aria-haspopup="true"
                aria-label="Academics menu"
                className={`px-5 py-2 rounded-full transition-all flex items-center gap-1.5 ${pastHeroSection
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                  } ${academicsDropdownOpen ? (pastHeroSection ? 'bg-gray-100/80 text-gray-900' : 'bg-white/15 text-white') : ''}`}
              >
                Academics
                <ChevronDown className={`h-4 w-4 transition-all duration-300 ${academicsDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              {(location.pathname === '/academics' || location.pathname.startsWith('/academics')) && (
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full z-10 shadow-[0_0_4px_1.5px_rgba(255,255,255,0.9)] ${pastHeroSection ? 'bg-[#0d4e92]' : 'bg-white'}`}></span>
              )}

              {academicsDropdownOpen && (
                <div
                  role="menu"
                  aria-label="Academic programs"
                  className="absolute top-full right-0 mt-[45px] bg-white rounded-2xl shadow-2xl border border-cyan-200/60 overflow-hidden z-50 animate-dropdown-open"
                  style={{
                    // Keep dropdown within viewport on smaller laptops by clamping width.
                    width: "min(520px, calc(100vw - 2rem))",
                    marginTop: '45px',
                    boxShadow: '0 25px 70px -12px rgba(13, 78, 146, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-white to-blue-50/20 pointer-events-none"></div>

                  {/* Header section */}
                  <div className="relative px-6 pt-8 pb-4 border-b border-cyan-100/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/20">
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Academic Programs</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Quick navigation to our programs</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced programs list with descriptors */}
                  <div className="relative px-6 py-4">
                    <div className="grid grid-cols-1 gap-3">
                      {programs.map((program, index) => {
                        const IconComponent = program.icon;
                        const isActive = location.pathname === program.href || (location.pathname.startsWith('/academics/') && location.pathname === program.href);

                        return (
                          <Link
                            key={index}
                            to={program.href}
                            onClick={() => setAcademicsDropdownOpen(false)}
                            role="menuitem"
                            className={`group relative flex items-start gap-4 px-4 py-4 rounded-xl text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${isActive
                              ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-[#0d4e92] font-medium border border-cyan-200/60 shadow-sm'
                              : 'hover:bg-gradient-to-r hover:from-cyan-50/70 hover:to-blue-50/50 hover:text-[#0d4e92] hover:shadow-sm'
                              }`}
                            aria-label={`Navigate to ${program.name}${program.isNew ? ' - New program' : ''}`}
                          >
                            {/* Icon with enhanced animation */}
                            <div className="relative z-10 flex-shrink-0 mt-0.5">
                              <div className={`p-2.5 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md scale-110'
                                : 'bg-gradient-to-br from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100 group-hover:shadow-md group-hover:scale-110'
                                }`}>
                                <IconComponent className={`h-5 w-5 transition-all duration-300 ${isActive
                                  ? 'text-white'
                                  : 'text-cyan-600 group-hover:text-[#0d4e92] group-hover:scale-110'
                                  }`} />
                              </div>
                            </div>

                            {/* Title, descriptor, and badge */}
                            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-[#0d4e92]' : 'text-gray-900 group-hover:text-[#0d4e92]'
                                      }`}>
                                      {program.name}
                                    </span>
                                    {program.isNew && (
                                      <span className="flex-shrink-0 text-xs font-semibold bg-emerald-600 text-white px-2.5 py-1 rounded" aria-label="New program for 2025">
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                  {program.descriptor && (
                                    <p className={`text-xs mt-1.5 leading-relaxed transition-colors duration-200 ${isActive
                                      ? 'text-gray-600'
                                      : 'text-gray-500 group-hover:text-gray-700'
                                      }`}>
                                      {program.descriptor}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Enhanced arrow indicator */}
                            <div className={`flex-shrink-0 mt-0.5 transition-all duration-300 ${isActive
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2'
                              }`}>
                              <div className="p-1.5 rounded-lg bg-cyan-100/50 group-hover:bg-cyan-200/70 transition-colors duration-200">
                                <ChevronDown className="h-4 w-4 text-cyan-600 rotate-[-90deg]" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="relative px-6 pb-4 pt-6 border-t border-cyan-100/50">
                    <Link
                      to="/academics"
                      onClick={() => setAcademicsDropdownOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-[#0d4e92] font-semibold text-sm transition-all duration-200 hover:shadow-md"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>View All Programs</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {SHOW_FACULTY_AND_STAFF && (
              <>
                {/* Faculty and Staff */}
                <div className="relative flex flex-col items-center pb-3">
                  <NavLink
                    to="/faculty-and-staff"
                    className={`px-5 py-2 rounded-full transition-all duration-200 ${pastHeroSection
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Faculty and Staff
                  </NavLink>
                  {(location.pathname === '/faculty-and-staff' || location.pathname.startsWith('/faculty-and-staff')) && (
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full z-10 shadow-[0_0_4px_1.5px_rgba(255,255,255,0.9)] ${pastHeroSection ? 'bg-[#0d4e92]' : 'bg-white'}`}></span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-all relative z-50 flex items-center justify-center w-10 h-10 rounded-lg ${pastHeroSection
              ? 'text-gray-900 hover:bg-gray-100 bg-white/90 backdrop-blur-sm shadow-md'
              : 'text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm shadow-lg'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 bg-white/95 backdrop-blur-xl rounded-3xl mt-2 shadow-2xl border border-cyan-100/40">
            <div className="flex flex-col gap-2 px-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={`relative transition-all duration-200 px-4 py-3 rounded-2xl text-gray-700 hover:text-[#0d4e92] hover:bg-gradient-to-r hover:from-cyan-50/80 hover:to-blue-50/60 ${isActive ? 'text-[#0d4e92] font-semibold bg-gradient-to-r from-cyan-50/60 to-blue-50/40' : ''
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#0d4e92] rounded-full shadow-sm"></span>
                    )}
                  </NavLink>
                );
              })}

              {/* Mobile Academics Section - Enhanced */}
              <div className="px-4">
                <div className="mb-3 mt-4 px-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Academic Programs</h3>
                </div>
                <div className="space-y-3">
                  {programs.map((program, index) => {
                    const isActive = location.pathname === program.href || (location.pathname.startsWith('/academics/') && location.pathname === program.href);
                    const IconComponent = program.icon;
                    return (
                      <Link
                        key={index}
                        to={program.href}
                        className={`group relative flex items-start gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                          ? 'text-[#0d4e92] font-semibold bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/60 shadow-sm'
                          : 'text-gray-700 hover:text-[#0d4e92] hover:bg-gradient-to-r hover:from-cyan-50/70 hover:to-blue-50/50'
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label={`Navigate to ${program.name}${program.isNew ? ' - New program' : ''}`}
                      >
                        <div className="relative z-10 flex-shrink-0 mt-0.5">
                          <div className={`p-2 rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md'
                            : 'bg-gradient-to-br from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100 group-hover:shadow-md'
                            }`}>
                            <IconComponent className={`h-5 w-5 transition-colors duration-200 ${isActive
                              ? 'text-white'
                              : 'text-cyan-600 group-hover:text-[#0d4e92]'
                              }`} />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className={`text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-[#0d4e92]' : 'text-gray-900 group-hover:text-[#0d4e92]'
                              }`}>
                              {program.name}
                            </span>
                            {program.isNew && (
                              <span className="flex-shrink-0 text-xs font-semibold bg-emerald-600 text-white px-2.5 py-1 rounded" aria-label="New program for 2025">
                                NEW
                              </span>
                            )}
                          </div>
                          {program.descriptor && (
                            <p className={`text-xs leading-relaxed transition-colors duration-200 ${isActive ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-700'
                              }`}>
                              {program.descriptor}
                            </p>
                          )}
                        </div>
                        <div className={`flex-shrink-0 mt-0.5 transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}>
                          <ChevronDown className="h-4 w-4 text-cyan-600 rotate-[-90deg]" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  to="/academics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-[#0d4e92] font-semibold text-sm transition-all duration-200 hover:shadow-md"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>View All Programs</span>
                  <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                </Link>
              </div>

              {SHOW_FACULTY_AND_STAFF && (
                <>
                  {/* Mobile Faculty and Staff */}
                  <NavLink
                    to="/faculty-and-staff"
                    className={`relative transition-all duration-200 px-4 py-3 rounded-2xl text-gray-700 hover:text-[#0d4e92] hover:bg-gradient-to-r hover:from-cyan-50/80 hover:to-blue-50/60 ${(location.pathname === '/faculty-and-staff' || location.pathname.startsWith('/faculty-and-staff')) ? 'text-[#0d4e92] font-semibold bg-gradient-to-r from-cyan-50/60 to-blue-50/40' : ''
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Faculty and Staff
                    {(location.pathname === '/faculty-and-staff' || location.pathname.startsWith('/faculty-and-staff')) && (
                      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#0d4e92] rounded-full shadow-sm"></span>
                    )}
                  </NavLink>
                </>
              )}

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}