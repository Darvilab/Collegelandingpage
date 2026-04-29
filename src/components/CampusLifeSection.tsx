import { Button } from "./ui/button";
import { Play, Award, Coffee, Dumbbell, Quote, ChevronLeft, ChevronRight, Users, Pause } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "Prabhakar Neupane",
    role: "CBEAS/NIET Alumni · Google Review",
    quote: "The one and only Biomedical Engineering College In Nepal with excellency, QAA certified, Best college award by ministry of education for year 73/74. First-rate education is provided to all students. Equipped with excellent infrastructure and well-furnished classrooms, the college building has all the facilities required for smooth and well planned functioning of the courses. This college is the first one among the very few in Asia to provide higher education in Biomedical Engineering for Bachelor level students.",
    gradient: "from-blue-400 to-cyan-300",
    cardBg: "bg-[#0a192f]", // Deep Navy
    accent: "blue",
  },
  {
    name: "Anusha Thapa",
    role: "CBEAS/NIET Alumni",
    quote: "NIET didn’t just teach me engineering — it taught me how to learn fast, build with confidence, and lead with humility. The intersection of medicine and engineering here is truly unique.",
    gradient: "from-purple-400 to-pink-300",
    cardBg: "bg-[#1a103d]", // Dark Purple
    accent: "purple",
  },
  {
    name: "Sakshyam Ghimire",
    role: "Student (External) · Google Review",
    quote: "Best college i love this college but i am Kcc student, once my exam centre was there. I passed my physics exam. ❣️",
    gradient: "from-indigo-400 to-blue-300",
    cardBg: "bg-[#0d1b2a]", // Charcoal Blue
    accent: "indigo",
  },
  {
    name: "Babin Khanal",
    role: "CBEAS/NIET Alumni · Google Review",
    quote: "The one and only Biomedical Engineering College In Nepal\nwith excellency\nQAA certified\nBest college award by ministry of education for year 73/74",
    gradient: "from-emerald-400 to-teal-300",
    cardBg: "bg-[#052016]", // Dark Emerald
    accent: "emerald",
  },
  {
    name: "Ujjwal Sapkota",
    role: "CBEAS/NIET Alumni",
    quote: "From labs to late-night group projects, NIET shaped my problem‑solving mindset. The faculty support was a real game‑changer for my career.",
    gradient: "from-amber-400 to-yellow-300",
    cardBg: "bg-[#2d1b00]", // Dark Amber/Brown
    accent: "amber",
  },
  {
    name: "Trisam Sapkota",
    role: "CBEAS/NIET Alumni · Google Review",
    quote: "One and only biomedical engineering college in nepal which is being improved day by day and heading towards excellency",
    gradient: "from-rose-400 to-orange-300",
    cardBg: "bg-[#2a0d0d]", // Dark Rose/Red
    accent: "rose",
  },
  {
    name: "Upaj Manandhar",
    role: "CBEAS/NIET Alumni · Google Review",
    quote: "Nice college. Have improved alot over the period of time. Great infrastructure and learning environment.",
    gradient: "from-cyan-400 to-blue-300",
    cardBg: "bg-[#002129]", // Dark Cyan
    accent: "cyan",
  },
  {
    name: "Sushil Acharya",
    role: "CBEAS/NIET Alumni",
    quote: "A culture of curiosity, practical learning, and strong mentorship. I graduated with real projects, solid fundamentals, and friends for life.",
    gradient: "from-violet-400 to-purple-300",
    cardBg: "bg-[#120a2e]", // Deep Violet
    accent: "violet",
  },
];

export function CampusLifeSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedTestimonialIndex, setExpandedTestimonialIndex] = useState<number | null>(null);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 1024 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxIdx = Math.max(0, testimonials.length - itemsPerView);
    if (currentIndex > maxIdx) {
      setCurrentIndex(maxIdx);
    }
  }, [itemsPerView, currentIndex]);

  const getInitials = (name: string) => {
    // If the name already includes initials like "(PN)", we still derive from the main name
    const cleaned = name.replace(/\([^)]*\)/g, "").trim();
    const tokens = cleaned
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && t !== "-" && t.toLowerCase() !== "the");

    const first = tokens[0]?.[0] ?? "";
    const last = tokens.length > 1 ? tokens[tokens.length - 1]?.[0] ?? "" : "";
    return (first + last).toUpperCase() || "?";
  };


  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextTestimonials = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevTestimonials = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleExpandedTestimonial = (index: number) => {
    setExpandedTestimonialIndex((prev) => (prev === index ? null : index));
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
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-center">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative lg:col-span-7 aspect-video rounded-[2rem] overflow-hidden group shadow-2xl"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/campus-tour.webm" type="video/webm" />
              <source src="/videos/campus-tour.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

            {/* Play/Pause Button */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
              <button 
                onClick={toggleVideo}
                className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl z-10"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-[#0d4e92]" />
                ) : (
                  <Play className="h-8 w-8 text-[#0d4e92] ml-1" />
                )}
              </button>
            </div>

            {/* Floating Badge */}
            <div className={`absolute bottom-6 left-6 z-10 transition-opacity duration-300 hidden md:block ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-md">
                <Play className="h-5 w-5 text-[#0d4e92] flex-shrink-0" />
                <span className="text-gray-900 font-medium">Campus Tour</span>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 gap-4"
          >
            {[
              { icon: Award, title: "Technical Competitions", desc: "Hackathons and innovation challenges" },
              { icon: Coffee, title: "Innovation Hub", desc: "24/7 coworking space for student projects" },
              { icon: Dumbbell, title: "Sports & Recreation", desc: "Premium sports facilities" },
              { icon: Users, title: "Student Clubs", desc: "Active organizations and activities" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-3xl bg-white border border-gray-100 hover:border-[#0d4e92]/30 hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0d4e92] to-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
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
          className="mb-16"
        >
          <h3 className="text-3xl lg:text-4xl text-gray-900 text-center">
            What Our Alumni Say
          </h3>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="overflow-hidden py-12 -my-12 px-4 -mx-4">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(calc(-${currentIndex} * (100% + 24px) / ${itemsPerView}))` }}
            >
              {testimonials.map((testimonial, index) => {
                const isExpanded = expandedTestimonialIndex === index;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{ width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
                  >
                    <div className={`relative p-8 rounded-[2rem] ${testimonial.cardBg} border border-white/10 hover:border-${testimonial.accent}-400/50 transition-all duration-500 overflow-hidden h-full group/card shadow-2xl`}>
                      {/* Decorative Elements */}
                      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${testimonial.gradient} opacity-20 rounded-full blur-3xl group-hover/card:opacity-40 transition-opacity`}></div>
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${testimonial.gradient} opacity-30 rounded-full blur-[90px] group-hover/card:scale-150 transition-transform duration-1000`}></div>
                      <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr ${testimonial.gradient} opacity-10 rounded-full blur-2xl`}></div>

                      <div className="relative z-10 flex flex-col h-full">
                        <Quote className="h-8 w-8 text-white/20 mb-4" />
                        <div className="flex-1">
                          <p
                            className={`text-base text-white/90 leading-relaxed whitespace-pre-line ${isExpanded ? "max-h-48 overflow-auto pr-2" : "line-clamp-4"}`}
                          >
                            "{testimonial.quote}"
                          </p>
                          {testimonial.quote.length > 140 && (
                            <button
                              type="button"
                              onClick={() => toggleExpandedTestimonial(index)}
                              className="mt-3 text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors"
                            >
                              {isExpanded ? "See less" : "See more"}
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs font-semibold shadow-xl ring-2 ring-white/10 group-hover/card:ring-${testimonial.accent}-400/50 transition-all duration-500`}
                          >
                            {getInitials(testimonial.name)}
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{testimonial.name}</div>
                            <div className="text-white/60 text-xs">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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

        {/* Perspectives Section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-[2rem] overflow-hidden group shadow-xl bg-gray-100"
          >
            <video
              className="w-full h-full object-cover aspect-video"
              controls
              playsInline
            >
              <source src="/videos/student.webm" type="video/webm" />
              <source src="/videos/student.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-6 left-6 z-10 hidden md:block">
              <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/20">
                <span className="text-[#0d4e92] font-bold text-sm uppercase tracking-wider">Student Perspective</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl lg:text-4xl text-gray-900 mb-6">Real Stories from Real Students</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed hidden md:block">
              Discover what it's truly like to be a part of the NIET community through the eyes of our students. From late-night lab sessions to life-long friendships.
            </p>
            <div className="flex items-center gap-4 hidden md:flex">
              <div className="w-12 h-12 rounded-full bg-[#0d4e92]/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#0d4e92]" />
              </div>
              <span className="text-gray-900 font-medium">Join 500+ successful alumni</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
