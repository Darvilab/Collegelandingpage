import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function HeroSection() {
  const stats = [
    { value: "500+", label: "Graduates" },
    { value: "40%+", label: "Abroad Studies" },
    { value: "15", label: "Batches" },
    { value: "UGC-QAA", label: "Certified" },
  ];

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
      {/* Animated Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/building1_khNhjUl.jpg"
          alt="NIET Campus"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-white text-sm">Admissions Open for 2026</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight"
          >
            Engineering Tomorrow's
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Innovators
            </span>

          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100/90 mb-10 max-w-2xl leading-relaxed"
          >
            National Institute of Engineering and Technology. The first UGC-QAA certified engineering college. Master AI, Biomedical & Computer Engineering with industry-aligned curriculum, expert faculty, and proven track record of global placements.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-3 sm:gap-4 mb-16"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-white text-[#0d4e92] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-sm sm:text-lg px-4 sm:px-8 h-12 sm:h-14 group"
            >
              Apply for 2026
              <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="#campus-life" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-sm sm:text-lg px-4 sm:px-8 h-12 sm:h-14 transition-all"
              >
                Campus Tour
              </Button>
            </a>
            <a
              href="/NEIT Prospectus.pdf"
              download="NEIT Prospectus.pdf"
              className="hidden sm:inline-flex items-center justify-center"
            >
              <Button
                size="lg"
                className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-lg px-8 h-14 transition-all group"
              >
                <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Brochure
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:flex md:flex-row gap-x-8 gap-y-6 md:gap-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-3xl md:text-5xl text-white mb-1 font-bold">{stat.value}</div>
                <div className="text-blue-200 text-[10px] md:text-sm uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl backdrop-blur-sm rotate-12 hidden lg:block"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full backdrop-blur-sm hidden lg:block"></div>
    </section>
  );
}