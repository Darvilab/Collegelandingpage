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
      title: "Industry-Aligned Mastery",
      description: "Speak three languages: Medicine, Engineering, and IT. Our graduates work at WHO, Nepal Army, Ministry of Health, and lead medical infrastructure across Nepal.",
      image: "/graduates.jpg",
    },
    {
      icon: Users,
      title: "Pioneer Faculty",
      description: "Learn from Industry and Academia Experts. Our 19-year legacy ensures you graduate industry-ready on Day 1.",
      image: "/faculty.jpg",
    },
    {
      icon: FlaskConical,
      title: "Research Authority",
      description: "Direct pathways to full scholarships abroad. Alumni are winning PhDs at world-class institutions like the University of Padova and Drexel.",
      image: "/research.jpg",
    },
    {
      icon: Briefcase,
      title: "Global Passport",
      description: "40% alumni success rate for MS/PhD abroad. Careers at Siemens, Philips, and GE Healthcare. A specialized recession-proof niche with zero unemployment.",
      image: "/academic-research.jpg",
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
            Why <span className="bg-gradient-to-r from-[#0d4e92] to-cyan-500 bg-clip-text text-transparent">19 Years of Excellence</span>
            <br />
            Trust NIET
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Established in 2005 (CBEAS evolution). First Kathmandu college with UGC-QAA accreditation. A proven track record of zero unemployment and global academic success.
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
                      <Icon className="h-7 w-7 text-[#0d4e92]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed hidden md:block">{pillar.description}</p>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Teacher Perspective Video */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-[2rem] overflow-hidden bg-[#0d4e92] shadow-2xl group mt-12 lg:mt-20"
        >
          <div className="grid lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 aspect-video relative overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
              >
                <source src="/videos/teacher.webm" type="video/webm" />
                <source src="/videos/teacher.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 hidden md:flex">
                <BookOpen className="h-4 w-4 text-cyan-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-100">Faculty Insight</span>
              </div>
              <h3 className="text-3xl lg:text-4xl text-white mb-6 leading-tight">Academic Excellence through Mentorship</h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 opacity-90 hidden md:block">
                Our faculty members aren't just teachers; they are mentors with global experience who are dedicated to shaping the next generation of engineering leaders.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <BookOpen className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <div className="text-white font-medium">Expert Guidance</div>
                  <div className="text-blue-200 text-sm">Industry and Academia Experts.</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
