import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, HeartPulse, Brain, Cpu, GraduationCap, FlaskConical, CheckCircle2, Download, FileText } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function AcademicProgramsPage() {
  const programsRef = useRef(null);
  const isProgramsInView = useInView(programsRef, { once: true, margin: "-100px" });

  const programs = [
    {
      icon: Brain,
      title: "BTech in Artificial Intelligence (AI)",
      degree: "BTech",
      duration: "4 Years",
      overview: "Our BTech in Artificial Intelligence program focuses on machine learning, deep learning, natural language processing, and ethical AI. Students master cutting-edge AI technologies including neural networks, computer vision, and generative AI systems.",
      coreCourses: [
        "Neural Networks and Deep Learning",
        "Data Science and Analytics",
        "AI Ethics and Responsible AI",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning",
        "Machine Learning Algorithms",
        "AI System Design"
      ],
      electives: [
        "Generative AI and Large Language Models",
        "Robotics and Autonomous Systems",
        "AI for Healthcare",
        "Edge AI and IoT Integration"
      ],
      careerOutcomes: [
        "AI Engineer",
        "Data Scientist",
        "Machine Learning Engineer",
        "Robotics Specialist",
        "AI Research Scientist",
        "Computer Vision Engineer"
      ],
      facilities: [
        "AI Research Lab with GPU Clusters",
        "TensorFlow and PyTorch Development Environment",
        "Robotics Lab",
        "High-Performance Computing Infrastructure"
      ],
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3R8ZW58MXx8fHwxNzYyNzU0NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      slug: "btech-artificial-intelligence",
      id: "btech-ai"
    },
    {
      icon: HeartPulse,
      title: "BE in Biomedical Engineering",
      degree: "BE",
      duration: "4 Years",
      overview: "Our BE in Biomedical Engineering program blends engineering principles with healthcare applications. Students learn to design medical devices, develop diagnostic systems, and work on cutting-edge projects in bioinformatics, tissue engineering, and medical imaging.",
      coreCourses: [
        "Biomechanics",
        "Medical Imaging Systems",
        "Biomaterials and Tissue Engineering",
        "Bioinstrumentation",
        "Biomedical Signal Processing",
        "Medical Device Design",
        "Biomedical Electronics",
        "Clinical Engineering"
      ],
      electives: [
        "Prosthetics and Orthotics",
        "Biomedical Informatics",
        "Regenerative Medicine",
        "Healthcare Technology Management"
      ],
      careerOutcomes: [
        "Biomedical Device Designer",
        "Clinical Engineer",
        "Biotech Researcher",
        "Medical Equipment Specialist",
        "Healthcare Technology Consultant",
        "Regulatory Affairs Specialist"
      ],
      facilities: [
        "Prosthetics and Orthotics Lab",
        "Medical Imaging Lab",
        "Bioinstrumentation Lab",
        "Biomedical Device Prototyping Center"
      ],
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      image: "/BiomedicalLab.jpg",
      slug: "be-biomedical-engineering",
      id: "be-bme"
    },
    {
      icon: Cpu,
      title: "BE in Computer Engineering",
      degree: "BE",
      duration: "4 Years",
      overview: "Our BE in Computer Engineering program covers hardware-software integration, embedded systems, and cybersecurity. Students master computer architecture, operating systems, VLSI design, and network systems to build the digital infrastructure of tomorrow.",
      coreCourses: [
        "Computer Architecture",
        "Operating Systems",
        "VLSI Design",
        "Embedded Systems",
        "Network Security",
        "Digital Signal Processing",
        "Microprocessors and Microcontrollers",
        "System Design and Integration"
      ],
      electives: [
        "IoT and Edge Computing",
        "Quantum Computing Fundamentals",
        "Cybersecurity and Cryptography",
        "Cloud Computing Architecture"
      ],
      careerOutcomes: [
        "Systems Engineer",
        "Chip Designer",
        "Network Architect",
        "Embedded Systems Engineer",
        "Hardware Engineer",
        "Cybersecurity Specialist"
      ],
      facilities: [
        "Computer Architecture Lab",
        "FPGA Development Boards",
        "Network Security Lab",
        "Industry-Standard Software Tools"
      ],
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      image: "/Lab.jpeg",
      slug: "be-computer-engineering",
      id: "be-computer"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 pt-24">
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

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <div className="max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <GraduationCap className="h-4 w-4 text-cyan-400" />
              <span className="text-white text-sm">Academic Programs</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight"
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
              className="text-xl md:text-2xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Comprehensive engineering education designed for the future. Three cutting-edge programs to shape your career in technology and healthcare.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Programs Detail */}
      <section ref={programsRef} className="py-20 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProgramsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="h-4 w-4 text-[#0b4c78]" />
              <span className="text-[#0b4c78] text-sm">Our Programs</span>
            </div>
            <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
              Academic Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive engineering education designed for the future
            </p>
          </motion.div>

          <div className="space-y-20">
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
                    <div className="relative h-64 lg:h-full overflow-hidden">
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

                    <div className="p-8 lg:p-12">
                      <h3 className="text-3xl text-gray-900 mb-4">{program.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-8">{program.overview}</p>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Core Courses</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {program.coreCourses.map((course, i) => (
                              <div key={i} className="flex items-center gap-2 text-gray-600">
                                <CheckCircle2 className="h-4 w-4 text-[#0b4c78] flex-shrink-0" />
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

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                          className="rounded-full bg-gradient-to-r from-[#0b4c78] to-cyan-500 hover:from-[#0a3d5f] hover:to-cyan-600"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Brochure
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Fee Structure
                        </Button>
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
              Ready to Start Your Engineering Journey?
            </h2>
            <p className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto">
              Apply now for admissions 2026. Choose from our three cutting-edge programs and shape your future in technology and healthcare.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-lg px-8 h-14 group"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-lg px-8 h-14 transition-all"
              >
                Contact Admissions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

