import { Button } from "./ui/button";
import { ArrowRight, Download, MapPin, Mail, Phone, Clock } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-7xl text-white mb-8 tracking-tight leading-[1.1]">
            Ready to Start Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Engineering Journey?
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 500+ students building the future of technology.
            <br />
            Applications for 2026 admission are now open.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://entrance.puexam.edu.np/studentlogin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <Button
                size="lg"
                className="rounded-full bg-white text-[#0d4e92] hover:bg-blue-50 shadow-2xl text-lg px-10 h-14 group"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a
              href="/NEIT Prospectus.pdf"
              download="NEIT Prospectus.pdf"
              className="inline-flex items-center justify-center"
            >
              <Button
                size="lg"
                className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-lg px-10 h-14 transition-all"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </a>
            <Button
              size="lg"
              className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-lg px-10 h-14 transition-all"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Visit Campus
            </Button>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: MapPin, label: "Location", value: "Lalitpur-1, Kupondole", gradient: "from-orange-500 to-amber-400" },
            { icon: Clock, label: "Open Hours", value: "Sunday-Friday:\n7:00 AM - 2:00 PM", gradient: "from-green-500 to-emerald-400" },
            { icon: Mail, label: "Email", value: "info@niet.edu.np", gradient: "from-purple-500 to-pink-400", href: "mailto:info@niet.edu.np" },
            { icon: Phone, label: "Call", value: "01-5911894/5911895", gradient: "from-blue-500 to-cyan-400", href: "tel:015911894" },
          ].map((contact, index) => {
            const Icon = contact.icon;
            const CardContent = (
              <>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-blue-200 text-sm mb-2">{contact.label}</div>
                <div className="text-white text-lg whitespace-pre-line">{contact.value}</div>
              </>
            );
            
            return contact.href ? (
              <a
                key={index}
                href={contact.href}
                className="relative p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group block cursor-pointer"
              >
                {CardContent}
              </a>
            ) : (
              <div
                key={index}
                className="relative p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group"
              >
                {CardContent}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}