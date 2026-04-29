import { Button } from "./ui/button";
import { FileText, PenTool, MessageSquare, GraduationCap, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function AdmissionProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileText,
      title: "Apply Online",
      description: "Submit your application and documents through our streamlined portal.",
    },
    {
      icon: PenTool,
      title: "Entrance Exam",
      description: "Take the NIET exam covering math, science, and logical reasoning.",
    },
    {
      icon: MessageSquare,
      title: "Interview",
      description: "Discuss your goals with our admission committee.",
    },
    {
      icon: GraduationCap,
      title: "Enroll",
      description: "Complete enrollment and begin your engineering journey.",
    },
  ];

  return (
    <section id="admissions" ref={ref} className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-6xl text-white mb-6 tracking-tight">
            Your Journey to NIET
            <br />
            <span className="text-cyan-300">Starts Here</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto hidden md:block">
            Four simple steps to transform into a world-class engineer.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center z-10">
                  <span className="text-sm sm:text-2xl text-white/60">{(index + 1).toString().padStart(2, '0')}</span>
                </div>
 
                {/* Card */}
                <div className="relative p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all h-full flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-base sm:text-xl text-white mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-blue-100 hidden md:block">{step.description}</p>
                </div>

                {/* Arrow Connector (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-20">
                    <ArrowRight className="h-6 w-6 text-white/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-white text-[#0d4e92] hover:bg-blue-50 shadow-2xl text-lg px-10 h-14 group"
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-blue-100 mt-6 text-sm">
            Applications for 2026 admission open • Early deadline: November 30, 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}