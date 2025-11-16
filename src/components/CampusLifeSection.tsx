import { Button } from "./ui/button";
import { Play, Award, Coffee, Dumbbell, Quote, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

export function CampusLifeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "AI Engineering, 2025",
      quote: "NIET provided hands-on experience in ML and robotics. The industry connections helped me secure my dream internship at a leading AI firm.",
      gradient: "from-[#0d4e92] to-cyan-400",
    },
    {
      name: "Rohan Thapa",
      role: "Biomedical Engineering, 2024",
      quote: "The state-of-the-art biomedical labs and research opportunities gave me the skills to innovate in healthcare technology. Best decision ever.",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      name: "Anjali Patel",
      role: "Computer Engineering, 2025",
      quote: "The faculty's real-world experience and personalized mentorship helped me land multiple job offers even before graduation. NIET changed my life.",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      name: "Sanjay Kumar",
      role: "AI Engineering, 2024",
      quote: "The AI lab facilities are world-class. I published my first research paper in my second year thanks to the support from NIET faculty.",
      gradient: "from-blue-500 to-indigo-400",
    },
    {
      name: "Nikita Rai",
      role: "Biomedical Engineering, 2025",
      quote: "NIET's internship program connected me with top hospitals. I'm now working on designing next-gen diagnostic equipment.",
      gradient: "from-rose-500 to-orange-400",
    },
    {
      name: "Arjun Bhattarai",
      role: "Computer Engineering, 2024",
      quote: "The curriculum is perfectly aligned with industry needs. I started my own tech startup in final year with guidance from NIET mentors.",
      gradient: "from-violet-500 to-purple-400",
    },
    {
      name: "Shreya Adhikari",
      role: "AI Engineering, 2025",
      quote: "From hackathons to research projects, NIET gave me countless opportunities to grow. Now I'm working on AI solutions for agriculture.",
      gradient: "from-cyan-500 to-blue-400",
    },
    {
      name: "Bibek Shrestha",
      role: "Biomedical Engineering, 2024",
      quote: "The hands-on training in medical device design prepared me for real-world challenges. NIET's industry partnerships made all the difference.",
      gradient: "from-amber-500 to-yellow-400",
    },
    {
      name: "Kritika Tamang",
      role: "Computer Engineering, 2025",
      quote: "Small class sizes meant personalized attention from professors. I mastered cloud computing and cybersecurity through NIET's excellent program.",
      gradient: "from-pink-500 to-fuchsia-400",
    },
    {
      name: "Manish Karki",
      role: "AI Engineering, 2024",
      quote: "NIET's focus on practical skills over theory helped me build a strong portfolio. Graduated with 3 job offers from top tech companies.",
      gradient: "from-teal-500 to-green-400",
    },
  ];

  const itemsPerView = 3; // Show 3 testimonials at once
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextTestimonials = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevTestimonials = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="campus-life" ref={ref} className="py-20 lg:py-32 bg-gradient-to-b from-[#0d4e92]/5 to-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
            Experience
            <br />
            <span className="bg-gradient-to-r from-[#0d4e92] via-purple-500 to-pink-500 bg-clip-text text-transparent">
              NIET Life
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A vibrant community of innovators, makers, and future leaders.
          </p>
        </motion.div>

        {/* Video + Features Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjYW1wdXN8ZW58MXx8fHwxNzYyNzkwOTQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="NIET Campus Life"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl">
                <Play className="h-8 w-8 text-[#0d4e92] ml-1" />
              </button>
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-md">
                <Award className="h-5 w-5 text-[#0d4e92]" />
                <span className="text-gray-900">Best Campus Life 2025</span>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-6"
          >
            {[
              { icon: Award, title: "Technical Competitions", desc: "Hackathons, robotics contests, and innovation challenges" },
              { icon: Coffee, title: "Innovation Hub", desc: "24/7 coworking space for student projects and startups" },
              { icon: Dumbbell, title: "Sports & Recreation", desc: "Sports facilities and recreational activities" },
              { icon: Users, title: "Student Clubs", desc: "Active student organizations and cultural activities" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex gap-5 p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-[#0d4e92]/30 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d4e92] to-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-3xl lg:text-4xl text-gray-900 mb-12 text-center">
            What Our Students Say
          </h3>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full lg:w-1/3 flex-shrink-0"
                  style={{ minWidth: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
                >
                  <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden h-full">
                    {/* Gradient Overlay */}
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${testimonial.gradient} opacity-20 rounded-full blur-3xl`}></div>

                    <div className="relative z-10">
                      <Quote className="h-8 w-8 text-white/20 mb-4" />
                      <p className="text-base text-white/90 mb-6 leading-relaxed min-h-[120px]">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient}`}></div>
                        <div>
                          <div className="text-white text-sm">{testimonial.name}</div>
                          <div className="text-white/60 text-xs">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonials}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 hover:border-[#0d4e92] hover:bg-[#0d4e92]/5 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </button>
            <button
              onClick={nextTestimonials}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 hover:border-[#0d4e92] hover:bg-[#0d4e92]/5 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="text-sm text-gray-500">
              Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, testimonials.length)} of {testimonials.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
