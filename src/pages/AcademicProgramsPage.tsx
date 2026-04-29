import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, GraduationCap, FlaskConical, CheckCircle2, Download, FileText } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getAllPrograms } from "../data/programs";

// Function to get the brochure PDF path for a program
function getProgramBrochure(programId: string): { path: string; filename: string } {
  const brochureMap: { [key: string]: { path: string; filename: string } } = {
    "btech-ai": { path: "/AI.pdf", filename: "B.Tech_AI_Brochure.pdf" },
    "be-bme": { path: "/BioM.pdf", filename: "BE_Biomedical_Engineering_Brochure.pdf" },
    "be-computer": { path: "/CE.pdf", filename: "BE_Computer_Engineering_Brochure.pdf" }
  };

  return brochureMap[programId] || { path: "/NEIT Prospectus.pdf", filename: "NEIT Prospectus.pdf" };
}

export function AcademicProgramsPage() {
  const programsRef = useRef(null);
  const isProgramsInView = useInView(programsRef, { once: true, margin: "-100px" });

  const programs = getAllPrograms();
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Academic Programs - BTech AI, BE Biomedical Engineering, BE Computer Engineering | NIET</title>
        <meta name="description" content="Explore NIET's comprehensive engineering programs: BTech in Artificial Intelligence, BE in Biomedical Engineering, and BE in Computer Engineering. Industry-aligned curriculum, hands-on experience, and career-ready skills. Apply for admissions 2026." />
        <meta name="keywords" content="Engineering Programs Nepal, BTech AI, Biomedical Engineering Program, Computer Engineering Program, Engineering Courses Nepal, Purbanchal University Programs, Engineering Admission 2026, NIET Programs" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Academic Programs - NIET Engineering Programs" />
        <meta property="og:description" content="Explore comprehensive engineering programs: BTech in AI, BE in Biomedical Engineering, and BE in Computer Engineering. Industry-aligned curriculum and hands-on experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Academic Programs - NIET" />
        <meta name="twitter:description" content="Comprehensive engineering programs: BTech AI, BE Biomedical Engineering, and BE Computer Engineering." />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 pt-20 lg:pt-24">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/building1_khNhjUl.jpg"
            alt="NIET Campus"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col items-center justify-center h-full">
          <div className="max-w-5xl text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 sm:mb-6"
            >
              <GraduationCap className="h-4 w-4 text-cyan-400" />
              <span className="text-white text-sm">Academic Programs</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight px-2"
            >
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Engineering Path
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-blue-100/90 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Comprehensive engineering education designed for the future. Three cutting-edge programs to shape your career in technology and healthcare.
            </motion.p>
          </div>

          {/* Programs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 px-2 sm:px-0"
          >
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Link
                  key={program.id}
                  to={`/academics/${program.slug}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="relative h-full p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {program.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-blue-200">
                        <span>{program.degree}</span>
                        <span>•</span>
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Programs Detail */}
      <section ref={programsRef} className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProgramsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="h-4 w-4 text-[#0d4e92]" />
              <span className="text-[#0d4e92] text-sm">Our Programs</span>
            </div>
            <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
              Academic Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive engineering education designed for the future
            </p>
          </motion.div>

          <div className="space-y-28">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={index}
                  id={program.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isProgramsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all scroll-mt-24"
                >
                  <div className="lg:grid lg:grid-cols-2">
                    <div className="relative h-64 sm:h-80 lg:h-full overflow-hidden">
                      <ImageWithFallback
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-40`}></div>
                      <div className="absolute top-6 left-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center">
                          <Icon className="h-7 w-7 text-gray-900" />
                        </div>
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-sm text-gray-900">
                          {program.degree} • {program.duration}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 lg:p-12">
                      <div className="flex items-center gap-2 flex-wrap mb-3 sm:mb-4">
                        <h3 className="text-2xl sm:text-3xl text-gray-900">{program.title}</h3>
                        {((program.title.includes("Artificial Intelligence") || program.title.includes("Computer Engineering")) && new Date().getFullYear() === 2025) && (
                          <span className="text-xs font-semibold bg-emerald-600 text-white px-2.5 py-1 rounded" aria-label="New program for 2025">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{program.overview}</p>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Core Courses</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {program.coreCourses.map((course, i) => (
                              <div key={i} className="flex items-center gap-2 text-gray-600">
                                <CheckCircle2 className="h-4 w-4 text-[#0d4e92] flex-shrink-0" />
                                <span className="text-sm">{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Elective Courses</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.electives.map((elective, i) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                                {elective}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Career Outcomes</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.careerOutcomes.map((career, i) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm">
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Facilities & Resources</h4>
                          <div className="space-y-2">
                            {program.facilities.map((facility, i) => (
                              <div key={i} className="flex items-center gap-2 text-gray-600">
                                <FlaskConical className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                                <span className="text-sm">{facility}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                        <Link to={`/academics/${program.slug}`}>
                          <Button
                            className="bg-[#0d4e92] hover:bg-[#0a3f75] text-white"
                          >
                            View Full Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <a
                          href={getProgramBrochure(program.id).path}
                          download={getProgramBrochure(program.id).filename}
                          className="inline-flex items-center justify-center"
                        >
                          <Button
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Brochure
                          </Button>
                        </a>

                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-gradient-to-br from-[#0d4e92] via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl text-white mb-4 sm:mb-6 tracking-tight px-2">
              Ready to Start Your Engineering Journey?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100/90 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
              Apply now for admissions 2026. Choose from our three cutting-edge programs and shape your future in technology and healthcare.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
              <a
                href="https://entrance.puexam.edu.np/studentlogin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center"
              >
                <Button
                  size="lg"
                  className="bg-white text-[#0d4e92] hover:bg-blue-50 text-lg px-8 h-14"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="tel:+9779705320350">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 text-lg px-8 h-14"
                >
                  Contact Admissions
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

