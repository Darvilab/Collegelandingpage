import { Button } from "./ui/button";
import { ArrowRight, HeartPulse, Cpu, Brain, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function ProgramsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const programs = [
    {
      icon: HeartPulse,
      title: "Biomedical Engineering",
      description: "Bridge healthcare and technology. Design life-saving medical devices and diagnostic systems.",
      image: "/BiomedicalLab.jpg",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      stats: "4 Years • BTech",
    },
    {
      icon: Cpu,
      title: "Computer Engineering",
      description: "Build the digital infrastructure of tomorrow. Master systems that power the modern world.",
      image: "/Lab.jpeg",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      stats: "4 Years • BTech",
    },
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Lead Nepal's AI Revolution. Develop intelligent systems and autonomous technologies.",
      image: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3R8ZW58MXx8fHwxNzYyNzU0NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      stats: "4 Years • BTech",
    },
  ];

  return (
    <section id="programs" ref={ref} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <Sparkles className="h-4 w-4 text-[#0b4c78]" />
            <span className="text-[#0b4c78] text-sm">Our Programs</span>
          </div>
          <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-[#0b4c78] to-cyan-500 bg-clip-text text-transparent">
              Engineering Path
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Three cutting-edge programs designed to shape the future of technology and innovation.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full bg-white rounded-[2rem] overflow-hidden border border-gray-200 hover:border-gray-300 transition-all hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-40 group-hover:opacity-30 transition-opacity`}></div>
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center">
                        <Icon className="h-7 w-7 text-gray-900" />
                      </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute bottom-6 left-6">
                      <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-sm text-gray-900">
                        {program.stats}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl text-gray-900 mb-3">{program.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                    
                    <Button
                      variant="ghost"
                      className="text-[#0b4c78] hover:text-blue-700 hover:bg-blue-50 p-0 group/btn h-auto"
                    >
                      <span className="text-base">Explore Program</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}