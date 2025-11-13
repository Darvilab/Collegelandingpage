import * as React from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, Brain, HeartPulse, Cpu, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const programs = [
    { name: "All Programs", href: "/academics", degree: null, icon: GraduationCap, description: "Explore our full range of engineering degrees" },
    { name: "Artificial Intelligence (AI)", href: "/academics#btech-ai", degree: "BTech", icon: Brain, description: "Master AI technologies and machine learning" },
    { name: "Biomedical Engineering", href: "/academics#be-bme", degree: "BE", icon: HeartPulse, description: "Innovate in healthcare and medical devices" },
    { name: "Computer Engineering", href: "/academics#be-computer", degree: "BE", icon: Cpu, description: "Build the future of computing systems" },
  ];

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Notice", href: "/notice" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-cyan-100/30' : 'bg-transparent'
      }`}>
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="NIET Logo"
                className="w-14 h-14 lg:w-16 lg:h-16 object-contain rounded-full group-hover:scale-105 transition-transform"
              />
              <div className="absolute -inset-1 bg-gradient-to-br from-[#0b4c78] to-cyan-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>NIET</span>
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
                    className={`px-5 py-2 rounded-full transition-all duration-200 ${scrolled
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {item.name}
                  </NavLink>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full z-10 shadow-[0_0_4px_1.5px_rgba(255,255,255,0.9)]"></span>
                  )}
                </div>
              );
            })}

            {/* Academics Dropdown */}
            <div className="relative flex flex-col items-center pb-3" ref={dropdownRef}>
              <button
                onClick={() => setAcademicsDropdownOpen(!academicsDropdownOpen)}
                className={`px-5 py-2 rounded-full transition-all flex items-center gap-1.5 ${scrolled
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                  } ${academicsDropdownOpen ? (scrolled ? 'bg-gray-100/80 text-gray-900' : 'bg-white/15 text-white') : ''}`}
              >
                Academics
                <ChevronDown className={`h-4 w-4 transition-all duration-300 ${academicsDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              {(location.pathname === '/academics' || location.pathname.startsWith('/academics')) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full z-10 shadow-[0_0_4px_1.5px_rgba(255,255,255,0.9)]"></span>
              )}

              {academicsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-[45px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-200/60 overflow-hidden z-50 animate-dropdown-open"
                  style={{
                    width: '600px',
                    marginTop: '45px',
                    boxShadow: '0 20px 60px -12px rgba(11, 76, 120, 0.25), 0 0 0 1px rgba(6, 182, 212, 0.1)'
                  }}
                >
                  {/* Enhanced title with gradient and shadow */}

                  {/* Updated list with cards, icons, and enhanced styling */}
                  <div className="py-3 divide-y divide-cyan-100/40">
                    {programs.map((program, index) => {
                      const IconComponent = program.icon;
                      const isNew = program.name.includes("Artificial Intelligence") && new Date().getFullYear() === 2025;
                      return (
                        <Link
                          key={index}
                          to={program.href}
                          onClick={() => setAcademicsDropdownOpen(false)}
                          className={`group relative flex items-start gap-4 px-6 py-5 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50/80 hover:via-blue-50/60 hover:to-cyan-50/40 hover:text-[#0b4c78] transition-all duration-300 ease-out hover:translate-x-1 ${index === 0
                            ? 'font-semibold text-gray-900 bg-gradient-to-r from-cyan-50/50 to-blue-50/30'
                            : ''
                            } ${location.pathname === program.href && index !== 0
                              ? 'bg-gradient-to-r from-cyan-50/70 to-blue-50/40 text-[#0b4c78] font-medium'
                              : ''
                            }`}
                        >
                          {/* Hover effect background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Icon with enhanced styling */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-200/50">
                              <IconComponent className="h-6 w-6 text-cyan-600 group-hover:text-[#0b4c78] transition-all duration-300 group-hover:scale-110" />
                            </div>
                          </div>

                          <div className="flex-1 relative z-10">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="text-lg font-semibold group-hover:tracking-wide transition-all duration-300">{program.name}</span>
                              <div className="flex items-center gap-2">
                                {program.degree && (
                                  <span className="text-xs font-semibold bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-3 py-1 rounded-full border border-cyan-200/50 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                                    {program.degree}
                                  </span>
                                )}
                                {isNew && (
                                  <span className="text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full border border-green-200/50 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 animate-pulse">
                                    NEW 2025
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 group-hover:text-gray-700 mt-1.5 leading-relaxed transition-colors duration-300">{program.description}</p>
                          </div>

                          {/* Right arrow indicator */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <ChevronDown className="h-4 w-4 text-cyan-500 rotate-[-90deg]" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              className={`rounded-full transition-all duration-200 ${scrolled ? 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900' : 'text-white hover:bg-white/10'}`}
            >
              Brochure
            </Button>
            <Button className="rounded-full bg-gradient-to-r from-[#0b4c78] to-cyan-500 hover:from-[#0a3d5f] hover:to-cyan-600 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-105 active:scale-100">
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                    className={`relative transition-all duration-200 px-4 py-3 rounded-2xl text-gray-700 hover:text-[#0b4c78] hover:bg-gradient-to-r hover:from-cyan-50/80 hover:to-blue-50/60 ${isActive ? 'text-[#0b4c78] font-semibold bg-gradient-to-r from-cyan-50/60 to-blue-50/40' : ''
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#0b4c78] rounded-full shadow-sm"></span>
                    )}
                  </NavLink>
                );
              })}

              {/* Mobile Academics Section - Enhanced similarly */}
              <div className="px-4">
                {programs.map((program, index) => {
                  const isActive = location.pathname === program.href || (location.pathname.startsWith('/academics') && index === 0);
                  const IconComponent = program.icon;
                  const isNew = program.name.includes("Artificial Intelligence") && new Date().getFullYear() === 2025;
                  return (
                    <Link
                      key={index}
                      to={program.href}
                      className={`group relative flex items-start gap-4 px-6 py-5 rounded-xl transition-all duration-300 ${isActive
                        ? 'text-[#0b4c78] font-semibold bg-gradient-to-r from-cyan-50/70 to-blue-50/50 border-l-4 border-[#0b4c78] shadow-sm'
                        : 'text-gray-600 hover:text-[#0b4c78] hover:bg-gradient-to-r hover:from-cyan-50/80 hover:via-blue-50/60 hover:to-cyan-50/40'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`p-2 rounded-xl transition-all duration-300 ${isActive
                          ? 'bg-gradient-to-br from-cyan-100 to-blue-100 shadow-md'
                          : 'bg-gradient-to-br from-cyan-50 to-blue-50 group-hover:from-cyan-100 group-hover:to-blue-100 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-200/50'
                          }`}>
                          <IconComponent className={`h-6 w-6 transition-all duration-300 ${isActive ? 'text-[#0b4c78]' : 'text-cyan-600 group-hover:text-[#0b4c78] group-hover:scale-110'}`} />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col relative z-10">
                        <div className="flex items-center justify-between w-full flex-wrap gap-2">
                          <span className="text-lg font-semibold">{program.name}</span>
                          <div className="flex items-center gap-2">
                            {program.degree && (
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${isActive
                                ? 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-cyan-200/50 shadow-sm'
                                : 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-cyan-200/50 shadow-sm group-hover:shadow-md group-hover:scale-105'
                                }`}>
                                {program.degree}
                              </span>
                            )}
                            {isNew && (
                              <span className="text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full border border-green-200/50 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 animate-pulse">
                                NEW 2025
                              </span>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm mt-1.5 leading-relaxed transition-colors duration-300 ${isActive ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'}`}>
                          {program.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-col gap-3 pt-4 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200"
                >
                  Download Brochure
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-[#0b4c78] to-cyan-500 hover:from-[#0a3d5f] hover:to-cyan-600 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-105 active:scale-100"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}