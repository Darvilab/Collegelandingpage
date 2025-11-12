import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Programs: [
      "Biomedical Engineering",
      "Computer Engineering",
      "BTech in Artificial Intelligence",
      "Admission Requirements",
    ],
    Resources: [
      "Campus Tour",
      "Student Portal",
      "Faculty Directory",
      "Research & Publications",
    ],
    About: [
      "About NIET",
      "Mission & Vision",
      "Accreditations",
      "Contact Us",
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", gradient: "from-blue-500 to-blue-600" },
    { icon: Twitter, href: "#", gradient: "from-sky-500 to-blue-500" },
    { icon: Linkedin, href: "#", gradient: "from-blue-600 to-blue-700" },
    { icon: Instagram, href: "#", gradient: "from-pink-500 to-purple-500" },
    { icon: Youtube, href: "#", gradient: "from-red-500 to-rose-600" },
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
              <div className="w-12 h-12 bg-gradient-to-br from-[#0b4c78] to-cyan-400 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xl">NIET</span>
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
                {links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
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