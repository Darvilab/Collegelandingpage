import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Notice", href: "/notice" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-[#0b4c78] via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                <span className="text-white text-xl">N</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-[#0b4c78] to-cyan-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>NIET</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-5 py-2 rounded-full transition-all hover:bg-white/10 ${
                  scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
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
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-3 rounded-2xl hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
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