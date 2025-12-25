import { Button } from "./ui/button";
import { Play, Award, Coffee, Dumbbell, Quote, ChevronLeft, ChevronRight, Users, Pause } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

export function CampusLifeSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedTestimonialIndex, setExpandedTestimonialIndex] = useState<number | null>(null);

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

  const testimonials = [
    {
      name: "Prabhakar Neupane",
      role: "NIET Alumni · Google Review",
      quote: "The one and only Biomedical Engineering College In Nepal. With excellency. QAA certified. Best college award by ministry of education for year 73/74. First-rate education is provided to all students. Equipped with excellent infrastructure and well-furnished classrooms. The college building has all the facilities required for smooth and well planned functioning of the courses. The first one among the very few in Asia to provide higher education in Biomedical Engineering for Bachelor level students.",
      gradient: "from-[#0d4e92] to-cyan-400",
    },
    {
      name: "Babin Khanal",
      role: "NIET Alumni · Google Review",
      quote: "The one and only Biomedical Engineering College In Nepal with excellency. QAA certified. Best college award by ministry of education for year 73/74.",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      name: "Trisam Sapkota",
      role: "NIET Alumni · Google Review",
      quote: "One and only biomedical engineering college in nepal which is being improved day by day and heading towards excellency.",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      name: "Shiva - The Mahadeva",
      role: "NIET Alumni · Google Review",
      quote: "Only the college of Biomedical Engineering in Nepal.",
      gradient: "from-blue-500 to-indigo-400",
    },
    {
      name: "Himal Pandey",
      role: "NIET Alumni · Google Review",
      quote: "Very precious college.",
      gradient: "from-rose-500 to-orange-400",
    },
    {
      name: "Anusha Thapa",
      role: "NIET Alumni",
      quote: "NIET didn’t just teach me engineering — it taught me how to learn fast, build with confidence, and lead with humility.",
      gradient: "from-violet-500 to-purple-400",
    },
    {
      name: "Ujjwal Sapkota",
      role: "NIET Alumni",
      quote: "From labs to late-night group projects, NIET shaped my problem‑solving mindset. The faculty support was a real game‑changer.",
      gradient: "from-cyan-500 to-blue-400",
    },
    {
      name: "Sushil Acharya",
      role: "NIET Alumni",
      quote: "A culture of curiosity, practical learning, and strong mentorship. I graduated with real projects, solid fundamentals, and friends for life.",
      gradient: "from-amber-500 to-yellow-400",
    },
    {
      name: "Aadit Shrestha",
      role: "NIET Alumni",
      quote: "Hands‑on sessions and guidance helped me turn ideas into working prototypes. Proud to carry NIET’s learning into my career.",
      gradient: "from-pink-500 to-fuchsia-400",
    },
    {
      name: "Ayush Neupane",
      role: "NIET Alumni",
      quote: "NIET gave me the platform to explore, fail safely, and grow. It prepared me for both industry expectations and higher studies.",
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] lg:aspect-[4/5] rounded-[2rem] overflow-hidden group"
          >
            <video
              ref={videoRef}
              src="/video.mp4"
              poster="/thumb.png"
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Thumbnail Overlay - Shows when video is paused/not playing */}
            {!isPlaying && (
              <div className="absolute inset-0">
                <ImageWithFallback
                  src="/thumb.png"
                  alt="Message from the Chairman"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Play/Pause Button - Positioned lower on mobile to avoid face */}
            <div className="absolute inset-0 flex items-end justify-center pb-20 lg:items-center lg:justify-center lg:pb-0">
              <button 
                onClick={toggleVideo}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl z-10"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 lg:h-8 lg:w-8 text-[#0d4e92]" />
                ) : (
                  <Play className="h-6 w-6 lg:h-8 lg:w-8 text-[#0d4e92] ml-1" />
                )}
              </button>
            </div>

            {/* Floating Badge - Smaller and repositioned on mobile */}
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 z-10">
              <div className="flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-5 lg:py-3 rounded-xl lg:rounded-2xl bg-white/90 backdrop-blur-md">
                <Award className="h-4 w-4 lg:h-5 lg:w-5 text-[#0d4e92] flex-shrink-0" />
                <span className="text-gray-900 text-sm lg:text-base">Message from the Chairman</span>
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
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => {
                const isExpanded = expandedTestimonialIndex === index;
                return (
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
                        <p
                          className={`text-base text-white/90 leading-relaxed ${isExpanded ? "max-h-48 overflow-auto pr-2" : "line-clamp-3"}`}
                        >
                          "{testimonial.quote}"
                        </p>
                        {testimonial.quote.length > 140 && (
                          <button
                            type="button"
                            onClick={() => toggleExpandedTestimonial(index)}
                            className="mt-3 mb-6 text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors"
                          >
                            {isExpanded ? "See less" : "See more"}
                          </button>
                        )}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs font-semibold`}
                          >
                            {getInitials(testimonial.name)}
                          </div>
                          <div>
                            <div className="text-white text-sm">{testimonial.name}</div>
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
      </div>
    </section>
  );
}
