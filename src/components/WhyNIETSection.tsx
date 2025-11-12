import { BookOpen, Users, FlaskConical, Briefcase } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WhyNIETSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: BookOpen,
      title: "Industry-Aligned Curriculum",
      description: "Programs co-designed with tech leaders, ensuring you master skills that matter.",
      image: "https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MjkwNDkyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Learn from professors and industry veterans with decades of real-world expertise.",
      image: "https://images.unsplash.com/photo-1736066330610-c102cab4e942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcHJvZmVzc29yJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzYyOTEzNDk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: FlaskConical,
      title: "State-of-the-Art Labs",
      description: "Access cutting-edge AI labs, robotics workshops, and biomedical research centers.",
      image: "https://images.unsplash.com/photo-1606206848010-83949917a080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjI4NTIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Briefcase,
      title: "Guaranteed Internships",
      description: "100% placement support with our network of 20+ industry partners.",
      image: "https://images.unsplash.com/photo-1696861273647-92dfe8bb697c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMGludGVybnNoaXB8ZW58MXx8fHwxNzYyOTEzNTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section id="why-niet" ref={ref} className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 left-40 w-1 h-1 bg-cyan-400 rounded-full"></div>
        <div className="absolute top-60 right-60 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-40 right-40 w-1 h-1 bg-pink-400 rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
            Why <span className="bg-gradient-to-r from-[#0b4c78] to-cyan-500 bg-clip-text text-transparent">2,000+ Students</span>
            <br />
            Trust NIET
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Excellence in engineering education backed by industry partnerships and proven results.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] bg-white border border-gray-200 hover:border-blue-200 hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-[#0b4c78]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{pillar.description}</p>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-8 uppercase tracking-[0.2em] text-sm">
            Trusted by Leading Organizations
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {["TechCorp", "MediTech", "AI Labs", "Digital Systems", "HealthPlus", "SmartTech"].map((partner, index) => (
              <div
                key={index}
                className="px-8 py-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-[#0b4c78]/30 hover:shadow-lg transition-all"
              >
                <div className="text-gray-400 text-lg">{partner}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
