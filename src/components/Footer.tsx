import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { SHOW_FACULTY_AND_STAFF } from "../config/features";

export function Footer() {
  type FooterLink =
    | { label: string; to: string; external?: false }
    | { label: string; href: string; external: true };

  const footerLinks: Record<string, FooterLink[]> = {
    Programs: [
      { label: "Biomedical Engineering", to: "/academics/be-biomedical-engineering" },
      { label: "Computer Engineering", to: "/academics/be-computer-engineering" },
      { label: "BTech in Artificial Intelligence", to: "/academics/btech-artificial-intelligence" },
      { label: "Admission Requirements", to: "/#admissions" },
    ],
    Resources: [
      { label: "Campus Tour", to: "/#campus-life" },
      { label: "Student Portal", href: "https://entrance.puexam.edu.np/studentlogin", external: true },
      ...(SHOW_FACULTY_AND_STAFF ? [{ label: "Faculty Directory", to: "/faculty-and-staff" } as const] : []),
      { label: "Research & Publications", to: "/#research-publications" },
    ],
    About: [
      { label: "About NIET", to: "/about" },
      { label: "Mission & Vision", to: "/about#mission-vision" },
      { label: "Accreditations", to: "/about#accreditations" },
      { label: "Contact Us", to: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/NIET.Nepal/", gradient: "from-blue-500 to-blue-600" },
    { icon: Instagram, href: "https://www.instagram.com/biomedicalcollege", gradient: "from-pink-500 to-purple-500" },
    // { icon: Twitter, href: "#", gradient: "from-sky-500 to-blue-500" },
    // { icon: Linkedin, href: "#", gradient: "from-blue-600 to-blue-700" },
    // { icon: Youtube, href: "#", gradient: "from-red-500 to-rose-600" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="NIET Logo"
                className="w-12 h-12 object-contain rounded-full"
              />
              <div className="flex flex-col">
                <span className="niet-text text-white text-xl">NIET</span>
                <span className="text-xs text-gray-500">Engineering Excellence</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Nepal's premier institute for AI, Biomedical, and Computer Engineering education.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    className={`group relative w-11 h-11 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => {
                  return (
                    <li key={index}>
                      {"to" in link ? (
                        <Link to={link.to} className="text-gray-400 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            © 2025 Nepal Institute of Engineering & Technology. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}