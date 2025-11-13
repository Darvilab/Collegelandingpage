import * as React from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

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
    { name: "All Programs", href: "/academics", degree: null },
    { name: "Artificial Intelligence (AI)", href: "/academics#btech-ai", degree: "BTech" },
    { name: "Biomedical Engineering", href: "/academics#be-bme", degree: "BE" },
    { name: "Computer Engineering", href: "/academics#be-computer", degree: "BE" },
  ];

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Notice", href: "/notice" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg' : 'bg-transparent'
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
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-5 py-2 rounded-full transition-all hover:bg-white/10 ${
                    isActive 
                      ? scrolled 
                        ? 'text-gray-900 font-semibold underline decoration-2 underline-offset-4' 
                        : 'text-white font-semibold underline decoration-2 underline-offset-4'
                      : scrolled 
                        ? 'text-gray-700 hover:text-gray-900' 
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Academics Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAcademicsDropdownOpen(!academicsDropdownOpen)}
                className={`px-5 py-2 rounded-full transition-all hover:bg-white/10 flex items-center gap-1 ${
                  location.pathname === '/academics' || location.pathname.startsWith('/academics')
                    ? scrolled
                      ? 'text-gray-900 font-semibold underline decoration-2 underline-offset-4'
                      : 'text-white font-semibold underline decoration-2 underline-offset-4'
                    : scrolled
                      ? 'text-gray-700 hover:text-gray-900'
                      : 'text-white/90 hover:text-white'
                }`}
              >
                Academics
                <ChevronDown className={`h-4 w-4 transition-transform ${academicsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {academicsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[360px] bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-[#0b4c78]" />
                      <span className="text-gray-900 font-semibold text-base">Programs</span>
                    </div>
                  </div>
                  <div className="py-1">
                    {programs.map((program, index) => (
                      <Link
                        key={index}
                        to={program.href}
                        onClick={() => setAcademicsDropdownOpen(false)}
                        className={`group flex items-center justify-between px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#0b4c78] transition-colors ${index === 0 ? 'font-semibold text-gray-900 bg-blue-50' : ''
                          } ${location.pathname === program.href && index !== 0 ? 'bg-blue-50 text-[#0b4c78]' : ''}`}
                      >
                        <span className="flex-1 text-sm">{program.name}</span>
                        {program.degree && (
                          <span className="ml-3 text-xs text-gray-500 font-medium">
                            {program.degree}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              className={`rounded-full ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              Brochure
            </Button>
            <Button className="rounded-full bg-gradient-to-r from-[#0b4c78] to-cyan-500 hover:from-[#0a3d5f] hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all">
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
          <div className="lg:hidden py-6 bg-white/95 backdrop-blur-xl rounded-3xl mt-2 shadow-2xl">
            <div className="flex flex-col gap-2 px-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-colors px-4 py-3 rounded-2xl ${
                      isActive
                        ? 'text-[#0b4c78] font-semibold bg-blue-50 border-l-4 border-[#0b4c78]'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Academics Dropdown */}
              <div className="px-4">
                <div className="flex items-center gap-2 px-4 py-3 mb-2 border-b border-gray-100">
                  <GraduationCap className="h-5 w-5 text-[#0b4c78]" />
                  <span className="text-gray-700 font-semibold">Programs</span>
                </div>
                {programs.map((program, index) => {
                  const isActive = location.pathname === program.href || (location.pathname.startsWith('/academics') && index === 0);
                  return (
                    <Link
                      key={index}
                      to={program.href}
                      className={`flex items-center justify-between transition-colors px-8 py-2.5 rounded-xl ${
                        isActive
                          ? 'text-[#0b4c78] font-semibold bg-blue-50 border-l-4 border-[#0b4c78]'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{program.name}</span>
                      {program.degree && (
                        <span className="ml-2 text-xs text-gray-500 font-medium">
                          {program.degree}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 pt-4 px-4">
                <Button variant="outline" size="sm">
                  Download Brochure
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-[#0b4c78] to-cyan-500">
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