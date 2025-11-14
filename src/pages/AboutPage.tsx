import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, Award, Users, Globe, Building2, Target } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { JourneyTimelineSection } from "../components/JourneyTimelineSection";
import { getAllPrograms } from "../data/programs";

export function AboutPage() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const accreditationRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isAccreditationInView = useInView(accreditationRef, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: "2005",
      title: "Foundation & Pioneer Status",
      description: "Established as Nepal's first BME institution, pioneering engineering education with Purbanchal University affiliation.",
      keywords: "First BME College in Nepal, Pioneer Engineering Institute, Purbanchal University Affiliation"
    },
    {
      year: "2008",
      title: "Global Partnerships",
      description: "Launched exchange programs with AIT and IAESTE, opening doors for international student exchange and global engineering partnerships.",
      keywords: "Global Engineering Partnerships, International Student Exchange, AIT Collaboration"
    },
    {
      year: "2012",
      title: "Industry Integration",
      description: "Formed partnerships with 20+ leading hospitals and medical institutions, providing hands-on healthcare technology exposure.",
      keywords: "Hospital Partnerships BME, Hands-on Healthcare Technology Exposure, Medical Engineering Careers"
    },
    {
      year: "2018",
      title: "Research Excellence",
      description: "Launched advanced research labs for molecular biology, neuroscience, and bioinformatics, establishing research excellence in Nepal.",
      keywords: "Advanced Engineering Research Labs, Bioinformatics, Neuroscience Research in Nepal"
    },
    {
      year: "2025",
      title: "Expansion into AI & Computing",
      description: "Introducing BTech programs in AI Engineering and Computer Engineering, expanding our commitment to future-proof engineering education.",
      keywords: "Introducing BTech in AI and BE in Computer Engineering, New Engineering Programs 2025"
    }
  ];

  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About NIET - National Institute of Engineering and Technology | Pioneering Engineering Education Since 2005</title>
        <meta name="description" content="Learn about NIET (National Institute of Engineering and Technology), Nepal's premier engineering institute. Established in 2005, we offer BTech in AI, BE in Biomedical Engineering, and BE in Computer Engineering. Affiliated with Purbanchal University." />
        <meta name="keywords" content="About NIET, National Institute of Engineering and Technology, Engineering College Nepal, NIET History, Engineering Education Nepal, Purbanchal University, Biomedical Engineering College, AI Engineering Nepal" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="About NIET - National Institute of Engineering and Technology" />
        <meta property="og:description" content="NIET is Nepal's premier engineering institute, pioneering engineering education since 2005. Offering cutting-edge programs in AI, Biomedical Engineering, and Computer Engineering." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About NIET - National Institute of Engineering and Technology" />
        <meta name="twitter:description" content="Nepal's premier engineering institute, pioneering engineering education since 2005." />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
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
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-white text-sm">Pioneering Engineering Education Since 2005</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight"
            >
              <span className="text-4xl md:text-6xl lg:text-7xl">
                🚀 NIET - Pioneering Engineering
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Education Since 2005
                </span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100/90 mb-10 max-w-2xl leading-relaxed"
            >
              NIET (National Institute of Engineering and Technology) is Nepal's premier institute for Biomedical Engineering, now expanding into AI and Computer Engineering to shape the future of technology and healthcare.
            </motion.p>

            {/* Program Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              {getAllPrograms().map((program) => {
                const isNewProgram = program.slug === "btech-artificial-intelligence" || program.slug === "be-computer-engineering";
                return (
                  <Link
                    key={program.slug}
                    to={`/academics/${program.slug}`}
                    className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer group"
                  >
                    <span className="text-white text-lg group-hover:text-cyan-200 transition-colors">
                      {program.slug === "be-biomedical-engineering" && "🧬 "}
                      {program.slug === "btech-artificial-intelligence" && "🤖 "}
                      {program.slug === "be-computer-engineering" && "💻 "}
                      {program.slug === "btech-artificial-intelligence" ? "BTech in AI (Artificial Intelligence)" : program.title}
                      {isNewProgram && " (NEW 2025)"}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl backdrop-blur-sm rotate-12 hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full backdrop-blur-sm hidden lg:block"></div>
      </section>

      {/* Mission, Vision & Values */}
      <section ref={missionRef} className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="h-4 w-4 text-[#0b4c78]" />
              <span className="text-[#0b4c78] text-sm font-medium">Why We Exist</span>
            </div>
            <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
              Building the Future,
              <br />
              <span className="bg-gradient-to-r from-[#0b4c78] to-cyan-500 bg-clip-text text-transparent">
                One Engineer at a Time
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              At NIET (National Institute of Engineering and Technology), we're not just teaching engineering—we're creating the innovators who'll shape tomorrow's tech landscape.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                At NIET (National Institute of Engineering and Technology), we empower the next generation to drive innovation in biomedical tech, AI, and computer systems. We deliver industry-aligned engineering education that's actually relevant—no fluff, just skills that matter.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                NIET aims to be globally recognized as the premier institute for BME, AI innovation, and computer systems. We're building a reputation that opens doors—everywhere.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Programs</h3>
              <p className="text-gray-600 leading-relaxed text-base mb-4">
                <span className="font-semibold text-gray-900">3 Cutting-Edge Programs</span> covering Biomedical Engineering, AI, and Computer Engineering.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                Choose your path: BTech or BE. Both designed to get you industry-ready, fast.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <JourneyTimelineSection timeline={timeline} />

      {/* Accreditation & Partnerships */}
      <section ref={accreditationRef} className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAccreditationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Award className="h-4 w-4 text-[#0b4c78]" />
              <span className="text-[#0b4c78] text-sm">Accreditation & Partnerships</span>
            </div>
            <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
              Recognized Excellence
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isAccreditationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0b4c78] to-cyan-500 flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">Purbanchal University</h3>
              <p className="text-gray-600 leading-relaxed">
                NIET is affiliated with Purbanchal University for all BE and BTech Programs. Our programs meet the rigorous standards set by Purbanchal University, ensuring quality education and recognized degrees.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isAccreditationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">USC-GAA Accredited</h3>
              <p className="text-gray-600 leading-relaxed">
                NIET programs meet rigorous international quality standards for engineering education. Our commitment to excellence is recognized globally, ensuring our graduates are prepared for international opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0b4c78] via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl text-white mb-6 tracking-tight">
              The Future of Engineering Starts Now
            </h2>
            <p className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto">
              Ready to be at the forefront of technology, healthcare, and innovation? Start your BE or BTech career at NIET (National Institute of Engineering and Technology). Apply for BTech in Artificial Intelligence or BE Biomedical Engineering Admission today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-lg px-8 h-14 group"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="/NEIT Prospectus.pdf"
                download="NEIT Prospectus.pdf"
                className="inline-flex items-center justify-center"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-lg px-8 h-14 transition-all"
                >
                  Download Brochure
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

