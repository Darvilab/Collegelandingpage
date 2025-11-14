import { Award, CheckCircle, Building, Globe, Shield, Star } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function RecognitionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const recognitions = [
    {
      icon: Building,
      name: "Purbanchal University",
      description: "Affiliated",
      gradient: "from-blue-500 to-cyan-400",
      imageSrc: "/PU.png",
    },
    {
      icon: Shield,
      name: "UGC-QAA Certified",
      description: "First in Kathmandu Valley",
      gradient: "from-green-500 to-emerald-400",
      imageSrc: "/UGC Logo.png",
    },
    {
      icon: Award,
      name: "Best Private College",
      description: "Ministry of Education Award",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: Star,
      name: "International Conferences",
      description: "ICIDN, Ka SAM, MMDR",
      gradient: "from-orange-500 to-amber-400",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
            Accredited
            <br />
            <span className="bg-gradient-to-r from-[#0b4c78] to-cyan-500 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            First UGC-QAA certified engineering college in Kathmandu Valley. Awarded Best Private College by Ministry of Education. Hosting international conferences since 2008.
          </p>
        </motion.div>

        {/* Recognition Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {recognitions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-[2rem] bg-white border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all h-full flex flex-col items-center text-center">
                  {/* Icon or Image */}
                  {item.imageSrc ? (
                    <div className="mb-6 group-hover:scale-110 transition-transform">
                      <ImageWithFallback
                        src={item.imageSrc}
                        alt={item.name}
                        className="h-20 w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-xl text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-center text-gray-400 mb-8 uppercase tracking-[0.2em] text-sm">
            Research & Publications
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Wiley", "Elsevier", "SAGE", "BIOMED-NEPAL Journal", "International Conferences"].map((partner, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-2xl bg-white border border-gray-200 hover:border-[#0b4c78]/30 hover:shadow-lg transition-all"
              >
                <div className="text-gray-600 text-sm font-medium">{partner}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}