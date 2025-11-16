import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Download, FileText, ArrowRight, CheckCircle2, GraduationCap, Sparkles, BookOpen, DollarSign, Award, Briefcase, BookMarked, HelpCircle, ArrowUp, ChevronRight, Zap, TrendingUp, Users, Target, Lightbulb, Star, Code, Cpu, Database, Network, Microscope, Heart, Brain, CircuitBoard, Settings, Globe, Shield, Cloud, Smartphone, Laptop, Server, Code2, GitBranch, Layers, Terminal, Wrench, FlaskConical, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getProgramBySlug, getAllPrograms, Program } from "../data/programs";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

// Function to get appropriate icon for a course based on its name
function getCourseIcon(courseName: string) {
    const name = courseName.toLowerCase();

    if (name.includes("programming") || name.includes("code") || name.includes("software")) return Code;
    if (name.includes("computer") && (name.includes("organization") || name.includes("architecture"))) return Cpu;
    if (name.includes("data structure") || name.includes("algorithm")) return GitBranch;
    if (name.includes("database")) return Database;
    if (name.includes("network") || name.includes("communication")) return Network;
    if (name.includes("digital logic") || name.includes("circuit")) return CircuitBoard;
    if (name.includes("artificial intelligence") || name.includes("machine learning") || name.includes("ai")) return Brain;
    if (name.includes("biomedical") || name.includes("medical")) return Heart;
    if (name.includes("microcontroller") || name.includes("embedded")) return Microscope;
    if (name.includes("web") || name.includes("internet")) return Globe;
    if (name.includes("security") || name.includes("cyber")) return Shield;
    if (name.includes("cloud")) return Cloud;
    if (name.includes("mobile") || name.includes("android") || name.includes("ios")) return Smartphone;
    if (name.includes("project") || name.includes("engineering project")) return Wrench;
    if (name.includes("introduction") || name.includes("fundamental")) return BookOpen;
    if (name.includes("lab") || name.includes("laboratory")) return FlaskConical;

    return Code2; // Default icon
}

// Function to get the brochure PDF path for a program
function getProgramBrochure(programId: string): { path: string; filename: string } {
    const brochureMap: { [key: string]: { path: string; filename: string } } = {
        "btech-ai": { path: "/AI.pdf", filename: "B.Tech_AI_Brochure.pdf" },
        "be-bme": { path: "/BioM.pdf", filename: "BE_Biomedical_Engineering_Brochure.pdf" },
        "be-computer": { path: "/CE.pdf", filename: "BE_Computer_Engineering_Brochure.pdf" }
    };

    return brochureMap[programId] || { path: "/NEIT Prospectus.pdf", filename: "NEIT Prospectus.pdf" };
}

export function IndividualProgramPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("overview");

    const program = slug ? getProgramBySlug(slug) : undefined;
    const allPrograms = getAllPrograms();
    const relatedPrograms = allPrograms.filter(p => p.slug !== slug).slice(0, 3);

    const scrollToSection = useCallback((sectionId: string) => {
        const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
            overview: overviewSectionRef,
            "fee-structure": feeSectionRef,
            "degree-highlights": degreeSectionRef,
            modules: modulesSectionRef,
            "why-niet": whyUniversitySectionRef,
            faq: faqSectionRef,
        };

        const ref = refs[sectionId];
        if (ref?.current) {
            const offset = 100; // Account for fixed header
            const elementPosition = ref.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, []);

    useEffect(() => {
        if (!program) {
            navigate("/academics");
            return;
        }

        // Handle hash-based scrolling on page load
        const hash = window.location.hash.slice(1);
        if (hash) {
            setTimeout(() => {
                scrollToSection(hash);
            }, 100);
        }
    }, [program, navigate, scrollToSection]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { id: "overview", ref: overviewSectionRef },
                { id: "fee-structure", ref: feeSectionRef },
                { id: "degree-highlights", ref: degreeSectionRef },
                { id: "modules", ref: modulesSectionRef },
                { id: "why-niet", ref: whyUniversitySectionRef },
                { id: "faq", ref: faqSectionRef },
            ];

            for (const section of sections) {
                if (section.ref.current) {
                    const rect = section.ref.current.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!program) {
        return null;
    }

    const Icon = program.icon;
    // Calculate total fee: for programs with discount, exclude security deposit from total
    // For discounted programs, total is sum of discounted semester fees only (875,000)
    // For non-discounted programs, total includes everything (1,370,000)
    const totalFee = program.feeStructure.reduce((sum, fee) => {
        if (program.discountInfo?.semesterFeeDiscount) {
            // For discounted programs, only sum the discounted semester fees
            const discountedSem1 = Math.round(fee.semester1Fee * (1 - program.discountInfo.semesterFeeDiscount / 100));
            const discountedSem2 = Math.round(fee.semester2Fee * (1 - program.discountInfo.semesterFeeDiscount / 100));
            return sum + discountedSem1 + discountedSem2;
        } else {
            // For non-discounted programs, include everything
            return sum + fee.grandTotal;
        }
    }, 0);

    // Calculate total discount amount
    const totalDiscount = program.discountInfo?.semesterFeeDiscount
        ? program.feeStructure.reduce((sum, fee) => {
            const discount = Math.round((fee.semester1Fee + fee.semester2Fee) * (program.discountInfo!.semesterFeeDiscount! / 100));
            return sum + discount;
        }, 0)
        : 0;
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Handle back to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Refs for animations
    const heroRef = useRef(null);
    const overviewSectionRef = useRef(null);
    const feeSectionRef = useRef(null);
    const degreeSectionRef = useRef(null);
    const modulesSectionRef = useRef(null);
    const whyUniversitySectionRef = useRef(null);
    const faqSectionRef = useRef(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const relatedProgramsRef = useRef<HTMLElement>(null);
    const ctaSectionRef = useRef<HTMLElement>(null);
    const [isSidebarSticky, setIsSidebarSticky] = useState(true);

    const isHeroInView = useInView(heroRef, { once: true });
    const isOverviewInView = useInView(overviewSectionRef, { once: true, margin: "-100px" });
    const isFeeInView = useInView(feeSectionRef, { once: true, margin: "-100px" });
    const isDegreeInView = useInView(degreeSectionRef, { once: true, margin: "-100px" });
    const isModulesInView = useInView(modulesSectionRef, { once: true, margin: "-100px" });
    const isWhyUniversityInView = useInView(whyUniversitySectionRef, { once: true, margin: "-100px" });
    const isFaqInView = useInView(faqSectionRef, { once: true, margin: "-100px" });

    // Track when sidebar should stop being sticky (when main content ends)
    useEffect(() => {
        const handleSidebarSticky = () => {
            if (!mainContentRef.current) {
                setIsSidebarSticky(true);
                return;
            }

            const mainContentRect = mainContentRef.current.getBoundingClientRect();
            const headerHeight = 112; // top-28 = 7rem = 112px
            const mainContentBottomViewport = mainContentRect.bottom;

            // Sidebar should be sticky as long as the main content container's bottom
            // is still below the sticky position. CSS sticky will automatically handle
            // sticking when the sidebar reaches the top-28 position.
            // We only disable sticky when we've scrolled past the main content.
            const shouldBeSticky = mainContentBottomViewport > headerHeight;

            setIsSidebarSticky(shouldBeSticky);
        };

        // Throttled scroll handler
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleSidebarSticky();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial check
        const initTimeout = setTimeout(handleSidebarSticky, 100);
        handleSidebarSticky();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleSidebarSticky, { passive: true });

        return () => {
            clearTimeout(initTimeout);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleSidebarSticky);
        };
    }, []);

    const pageTitle = `${program.title} - ${program.degree} | NIET`;
    const pageDescription = `${program.description} ${program.overview} Duration: ${program.duration}. Credit: ${program.credit}. Intake: ${program.intake}. Apply for admissions 2026.`;
    const pageKeywords = `${program.title}, ${program.degree}, ${program.slug === "btech-artificial-intelligence" ? "AI Engineering, Machine Learning, Data Science" : program.slug === "be-biomedical-engineering" ? "Biomedical Engineering, Medical Devices, Healthcare Technology" : "Computer Engineering, Hardware Software Integration, Embedded Systems"}, Engineering Program Nepal, Purbanchal University, NIET Programs, Engineering Admission 2026`;
    const canonicalUrl = `${window.location.origin}${location.pathname}`;

    return (
        <div className="min-h-screen bg-white" lang="en">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={program.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={program.image} />
            </Helmet>
            <Header />
            {/* Hero Section */}
            <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 pt-20 lg:pt-24 pb-8 lg:pb-0">
                {/* Animated Background Image */}
                <div className="absolute inset-0 z-0">
                    <ImageWithFallback
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover opacity-20"
                        loading="lazy"
                    />
                </div>

                {/* Simplified Gradient Overlay - Removed pulsing animations */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-blue-500/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 right-0 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-cyan-500/15 rounded-full blur-[100px]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-16 w-full flex flex-col justify-center">
                    <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center w-full">
                        {/* Left Side - Program Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="relative order-2 lg:order-1 lg:col-span-5"
                        >
                            <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[500px] xl:h-[560px] rounded-xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
                                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-30`}></div>

                                {/* Course-specific illustration */}
                                {program.slug === "btech-artificial-intelligence" && (
                                    <div className="absolute inset-0">
                                        <ImageWithFallback
                                            src="/ArtificialIntelligence.png"
                                            alt="Artificial Intelligence Illustration"
                                            className="w-full h-full object-cover rounded-[2rem] scale-110"
                                            loading="eager"
                                        />
                                    </div>
                                )}
                                {program.slug === "be-biomedical-engineering" && (
                                    <div className="absolute inset-0">
                                        <ImageWithFallback
                                            src="/BioMedicalEngineeringInNepal.png"
                                            alt="Biomedical Engineering Illustration"
                                            className="w-full h-full object-cover rounded-[2rem] scale-110"
                                            loading="eager"
                                        />
                                    </div>
                                )}
                                {program.slug === "be-computer-engineering" && (
                                    <div className="absolute inset-0">
                                        <ImageWithFallback
                                            src="/ComputerEngineering.png"
                                            alt="Computer Engineering Illustration"
                                            className="w-full h-full object-cover rounded-[2rem] scale-110"
                                            loading="eager"
                                        />
                                    </div>
                                )}

                                <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center">
                                        <Icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-900" />
                                    </div>
                                </div>
                            </div>
                            {program.studentName && (
                                <p className="text-xs sm:text-sm text-blue-200/80 mt-4 sm:mt-5 text-center">
                                    Student on picture: {program.studentName}
                                </p>
                            )}
                        </motion.div>

                        {/* Right Side - Course Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-4 sm:space-y-5 lg:space-y-6 order-1 lg:order-2 lg:col-span-7"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                            >
                                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                                <span className="text-white text-sm sm:text-base font-semibold">{program.degree}</span>
                            </motion.div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-[1.1] tracking-tight">
                                {program.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                                <div className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg text-xs sm:text-sm">
                                    <span className="text-white/90 font-medium">Duration:</span>
                                    <span className="text-white font-semibold">{program.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg text-xs sm:text-sm">
                                    <span className="text-white/90 font-medium">Credit:</span>
                                    <span className="text-white font-semibold">{program.credit}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg text-xs sm:text-sm">
                                    <span className="text-white/90 font-medium">Intake:</span>
                                    <span className="text-white font-semibold">{program.intake}</span>
                                </div>
                            </div>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
                                {program.description}
                            </p>

                            <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-3 lg:gap-4 pt-2">
                                <a
                                    href={program ? getProgramBrochure(program.id).path : "/NEIT Prospectus.pdf"}
                                    download={program ? getProgramBrochure(program.id).filename : "NEIT Prospectus.pdf"}
                                    className="inline-flex items-center justify-center"
                                >
                                    <Button
                                        size="default"
                                        className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-7 h-10 sm:h-11 lg:h-12 group w-full lg:w-auto"
                                        aria-label="Download program brochure"
                                    >
                                        <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                                        Download Brochure
                                    </Button>
                                </a>
                                <Button
                                    size="default"
                                    variant="outline"
                                    className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-7 h-10 sm:h-11 lg:h-12 transition-all w-full lg:w-auto"
                                    onClick={() => scrollToSection("fee-structure")}
                                    aria-label="View fee structure"
                                >
                                    <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    Fee Structure
                                </Button>
                                <a
                                    href="https://entrance.puexam.edu.np/studentlogin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full lg:w-auto"
                                >
                                    <Button
                                        size="default"
                                        className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-sm sm:text-base lg:text-lg px-6 sm:px-7 lg:px-8 h-10 sm:h-11 lg:h-12 group w-full lg:w-auto"
                                        aria-label="Apply now for this program"
                                    >
                                        <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                                        Apply Now
                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform animate-gentle-bounce" />
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Key Highlights Section - Integrated into hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-6 sm:mt-8 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full"
                    >
                        {/* Career Prospects */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-2 sm:gap-2.5 mb-3">
                                <div className="p-2 rounded-lg bg-cyan-500/20">
                                    <Briefcase className="h-4 w-4 text-cyan-300" />
                                </div>
                                <h3 className="text-white font-bold text-sm sm:text-base">Career Prospects</h3>
                            </div>
                            <ul className="space-y-1.5 sm:space-y-2">
                                {program.careerOutcomes.slice(0, 3).map((career, index) => (
                                    <li key={index} className="flex items-start gap-2 text-blue-100/90 text-xs sm:text-sm">
                                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <span className="leading-snug">{career}</span>
                                    </li>
                                ))}
                            </ul>
                            {program.careerOutcomes.length > 3 && (
                                <button
                                    onClick={() => scrollToSection("degree-highlights")}
                                    className="text-cyan-200 hover:text-cyan-100 text-xs mt-2 sm:mt-3 transition-colors cursor-pointer hover:underline"
                                >
                                    +{program.careerOutcomes.length - 3} more careers
                                </button>
                            )}
                        </div>

                        {/* Key Skills */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-2 sm:gap-2.5 mb-3">
                                <div className="p-2 rounded-lg bg-blue-500/20">
                                    <Zap className="h-4 w-4 text-blue-300" />
                                </div>
                                <h3 className="text-white font-bold text-sm sm:text-base">Key Skills</h3>
                            </div>
                            <ul className="space-y-1.5 sm:space-y-2">
                                {program.degreeHighlights.slice(0, 3).map((skill, index) => (
                                    <li key={index} className="flex items-start gap-2 text-blue-100/90 text-xs sm:text-sm">
                                        <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span className="leading-snug">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                            {program.degreeHighlights.length > 3 && (
                                <button
                                    onClick={() => scrollToSection("degree-highlights")}
                                    className="text-cyan-200 hover:text-cyan-100 text-xs mt-2 sm:mt-3 transition-colors cursor-pointer hover:underline"
                                >
                                    +{program.degreeHighlights.length - 3} more skills
                                </button>
                            )}
                        </div>

                        {/* Admission Eligibility */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 hover:bg-white/15 transition-all sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-2 sm:gap-2.5 mb-3">
                                <div className="p-2 rounded-lg bg-purple-500/20">
                                    <GraduationCap className="h-4 w-4 text-purple-300" />
                                </div>
                                <h3 className="text-white font-bold text-sm sm:text-base">Eligibility</h3>
                            </div>
                            <p className="text-blue-100/90 leading-relaxed text-xs sm:text-sm">{program.admissionEligibility}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section - Redesigned for better UI/UX */}
            <main className="relative bg-gradient-to-b from-white via-gray-50/30 to-white">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl"></div>
                </div>

                <div ref={mainContentRef} className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24 xl:py-32">
                    {/* Mobile Sidebar Navigation */}
                    <div className="lg:hidden overflow-x-auto pb-4 sm:pb-6 mb-6 sm:mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6">
                        <nav className="flex gap-2" aria-label="Page navigation">
                            {[
                                { id: "overview", label: "Overview", icon: BookOpen },
                                { id: "fee-structure", label: "Fee", icon: DollarSign },
                                { id: "degree-highlights", label: "Highlights", icon: Award },
                                { id: "modules", label: "Modules", icon: BookMarked },
                                { id: "why-niet", label: "Why Us", icon: Sparkles },
                                { id: "faq", label: "FAQ", icon: HelpCircle },
                            ].map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all font-medium shadow-sm ${activeSection === item.id
                                            ? "bg-gradient-to-r from-[#0b4c78] to-cyan-500 text-white shadow-lg scale-105"
                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                            }`}
                                        aria-label={`Navigate to ${item.label} section`}
                                    >
                                        <ItemIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${activeSection === item.id ? "text-white" : "text-[#0b4c78]"}`} />
                                        <span className="text-xs sm:text-sm">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="lg:flex lg:gap-12">
                        {/* Sticky Sidebar Navigation (Desktop) */}
                        <aside className="hidden lg:block flex-shrink-0 self-start" style={{ width: '25%', maxWidth: '25%' }}>
                            <div
                                ref={sidebarRef}
                                className={isSidebarSticky ? "sticky top-28" : ""}
                                style={isSidebarSticky ? { position: 'sticky', top: '7rem' } : {}}
                            >
                                <nav aria-label="Page sections" className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">On this page</h3>
                                    <div className="space-y-1.5">
                                        {[
                                            { id: "overview", label: "Overview", icon: BookOpen },
                                            { id: "fee-structure", label: "Fee Structure", icon: DollarSign },
                                            { id: "degree-highlights", label: "Highlights & Careers", icon: Award },
                                            { id: "modules", label: "Modules", icon: BookMarked },
                                            { id: "why-niet", label: "Why NIET?", icon: Sparkles },
                                            { id: "faq", label: "FAQ", icon: HelpCircle },
                                        ].map((item) => {
                                            const ItemIcon = item.icon;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => scrollToSection(item.id)}
                                                    className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out ${activeSection === item.id
                                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                                                        : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-gray-900 hover:scale-[1.01]"
                                                        }`}
                                                    aria-current={activeSection === item.id ? "page" : undefined}
                                                >
                                                    <ItemIcon className={`h-5 w-5 flex-shrink-0 transition-colors ${activeSection === item.id ? "text-white" : "text-blue-600 group-hover:text-blue-700"}`} />
                                                    <span>{item.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content Flow */}
                        <div className="space-y-12 sm:space-y-16 lg:space-y-24 flex-1 min-w-0">
                            {/* --- Overview Section --- */}
                            <motion.section
                                ref={overviewSectionRef}
                                id="overview"
                                className="scroll-mt-28"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="relative">
                                    {/* Section Header */}
                                    <div className="mb-6 sm:mb-8 lg:mb-10">
                                        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-4 sm:mb-6">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                                                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">Program Overview</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
                                            Discover Your Path
                                        </h2>
                                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
                                            {program.overview}
                                        </p>
                                    </div>

                                    {/* What You Will Learn Card */}
                                    <div className="relative mt-6 sm:mt-8 bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 overflow-hidden">
                                        {/* Decorative gradient overlay */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>

                                        <div className="relative">
                                            <div className="flex items-center gap-3 lg:gap-4 mb-6">
                                                <div className="p-2 rounded-lg bg-blue-100">
                                                    <Lightbulb className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                                                </div>
                                                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">What You Will Learn</h3>
                                            </div>
                                            <ul className="space-y-3 lg:space-y-4">
                                                {program.youWill.map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={isOverviewInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                                        className="flex items-center gap-3 lg:gap-4"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                        <span className="text-gray-700 text-base">{item}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Why Program Section */}
                                    {program.whyProgram && program.whyProgram.length > 0 && (
                                        <div className="relative mt-6 sm:mt-8 bg-gradient-to-br from-white to-green-50/30 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 overflow-hidden">
                                            {/* Decorative gradient overlay */}
                                            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>

                                            <div className="relative">
                                                <div className="flex items-center gap-3 lg:gap-4 mb-6">
                                                    <div className="p-2 rounded-lg bg-green-100">
                                                        <Star className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                                                    </div>
                                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Why {program.title}?</h3>
                                                </div>
                                                <ul className="space-y-3 lg:space-y-4">
                                                    {program.whyProgram.map((item, index) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={isOverviewInView ? { opacity: 1, x: 0 } : {}}
                                                            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                                            className="flex items-center gap-3 lg:gap-4"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <Star className="h-5 w-5 text-green-600" />
                                                            </div>
                                                            <span className="text-gray-700 text-base">{item}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.section>

                            {/* --- Fee Structure Section --- */}
                            <motion.section
                                ref={feeSectionRef}
                                id="fee-structure"
                                className="scroll-mt-28"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isFeeInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="relative">
                                    {/* Section Header */}
                                    <div className="mb-6 sm:mb-8 lg:mb-10">
                                        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 mb-4 sm:mb-6">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500">
                                                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-emerald-700 uppercase tracking-wider">Investment</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">Fee Structure</h2>
                                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl">Transparent pricing for your educational journey</p>
                                    </div>

                                    {/* Fee Table Card */}
                                    <div className="relative mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                                        {/* Scroll indicator - fade effect on right side */}
                                        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-0 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 sm:hidden"></div>
                                        
                                        <div className="overflow-x-auto px-4 sm:px-0">
                                            <div className="min-w-full inline-block">
                                                <table className="w-full min-w-[600px] sm:min-w-full lg:table-fixed">
                                                <colgroup>
                                                    <col className="w-auto lg:w-[35%]" />
                                                    {program.feeStructure.map((_, index) => (
                                                        <col key={index} className="lg:w-[16.25%]" />
                                                    ))}
                                                </colgroup>
                                                <thead>
                                                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                                                        <th scope="col" className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-5 text-left font-semibold text-gray-900 uppercase tracking-wide text-xs sm:text-sm">Particulars</th>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <th key={index} scope="col" className="px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-5 text-center font-semibold text-gray-900 uppercase tracking-wide text-xs sm:text-sm">
                                                                {fee.year}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 font-medium text-gray-900 text-xs sm:text-sm lg:text-sm">
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 lg:gap-2">
                                                                <span className="whitespace-nowrap">Admission Fee</span>
                                                                {program.discountInfo?.admissionFeeWaiver && (
                                                                    <div className="text-[10px] sm:text-xs font-semibold text-red-800">
                                                                        {(() => {
                                                                            const text = program.discountInfo.note || "100% waiver in Admission Fee for this Batch";
                                                                            return text.split(' ').map((word, i, arr) => {
                                                                                if (word === 'in' || word === 'for') {
                                                                                    return <React.Fragment key={i}>{word}<br /></React.Fragment>;
                                                                                }
                                                                                return i < arr.length - 1 ? <React.Fragment key={i}>{word} </React.Fragment> : <React.Fragment key={i}>{word}</React.Fragment>;
                                                                            });
                                                                        })()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-4 whitespace-nowrap text-center text-gray-700 text-xs sm:text-sm lg:text-sm">
                                                                {fee.admissionFee > 0 ? `NPR ${fee.admissionFee.toLocaleString()}` : <span className="text-gray-400">-</span>}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    {program.discountInfo?.semesterFeeDiscount && (
                                                        <tr className="border-b border-gray-200 bg-blue-50/50">
                                                            <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 font-medium text-gray-900 text-xs sm:text-sm lg:text-sm">
                                                                <span>Discount<br />({program.discountInfo.semesterFeeDiscount}% on Semester Fee)</span>
                                                            </td>
                                                            {program.feeStructure.map((fee, index) => {
                                                                const discount = Math.round((fee.semester1Fee + fee.semester2Fee) * (program.discountInfo!.semesterFeeDiscount! / 100));
                                                                return (
                                                                    <td key={index} className="px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-4 whitespace-nowrap text-center text-green-700 text-xs sm:text-sm lg:text-sm font-semibold">
                                                                        -NPR {discount.toLocaleString()}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    )}
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 whitespace-nowrap font-medium text-gray-900 text-xs sm:text-sm lg:text-sm">Semester 1 Fee</td>
                                                        {program.feeStructure.map((fee, index) => {
                                                            const discountedFee = program.discountInfo?.semesterFeeDiscount
                                                                ? Math.round(fee.semester1Fee * (1 - program.discountInfo.semesterFeeDiscount / 100))
                                                                : fee.semester1Fee;
                                                            return (
                                                                <td key={index} className="px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-4 whitespace-nowrap text-center text-gray-700 text-xs sm:text-sm lg:text-sm">
                                                                    NPR {discountedFee.toLocaleString()}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 whitespace-nowrap font-medium text-gray-900 text-xs sm:text-sm lg:text-sm">Semester 2 Fee</td>
                                                        {program.feeStructure.map((fee, index) => {
                                                            const discountedFee = program.discountInfo?.semesterFeeDiscount
                                                                ? Math.round(fee.semester2Fee * (1 - program.discountInfo.semesterFeeDiscount / 100))
                                                                : fee.semester2Fee;
                                                            return (
                                                                <td key={index} className="px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-4 whitespace-nowrap text-center text-gray-700 text-xs sm:text-sm lg:text-sm">
                                                                    NPR {discountedFee.toLocaleString()}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 whitespace-nowrap font-medium text-gray-900 text-xs sm:text-sm lg:text-sm">Security Deposit</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-4 whitespace-nowrap text-center text-gray-700 text-xs sm:text-sm lg:text-sm">
                                                                {fee.universityRegFee > 0 ? `NPR ${fee.universityRegFee.toLocaleString()}` : <span className="text-gray-400">-</span>}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr className="bg-gray-50 border-t-2 border-gray-300">
                                                        <td className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 whitespace-nowrap font-bold text-gray-900 text-sm sm:text-base lg:text-base">Grand Total</td>
                                                        {program.feeStructure.map((fee, index) => {
                                                            let grandTotal;
                                                            if (program.discountInfo?.semesterFeeDiscount) {
                                                                // For discounted programs, grand total is only discounted semester fees
                                                                const discountedSem1 = Math.round(fee.semester1Fee * (1 - program.discountInfo.semesterFeeDiscount / 100));
                                                                const discountedSem2 = Math.round(fee.semester2Fee * (1 - program.discountInfo.semesterFeeDiscount / 100));
                                                                grandTotal = discountedSem1 + discountedSem2;
                                                            } else {
                                                                // For non-discounted programs, include everything
                                                                grandTotal = fee.total;
                                                            }
                                                            return (
                                                                <td key={index} className="px-3 sm:px-4 lg:px-4 py-3 sm:py-4 lg:py-4 whitespace-nowrap text-center font-bold text-gray-900 text-sm sm:text-base lg:text-base">
                                                                    NPR {grandTotal.toLocaleString()}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                        
                                        {/* Mobile scroll hint */}
                                        <div className="sm:hidden px-4 py-2 text-center text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                                            <span className="inline-flex items-center gap-1">
                                                <span>←</span> Scroll horizontally to view all columns
                                                <span>→</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Total Program Amount */}
                                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                                            <span className="text-base sm:text-lg font-semibold text-gray-700">Total Program Amount:</span>
                                            <span className="text-xl sm:text-2xl font-bold text-gray-900">NPR {totalFee.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Note Card */}
                                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl border border-blue-200 shadow-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-blue-500 flex-shrink-0">
                                                <FileText className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-blue-900 font-semibold mb-1">Important Note</p>
                                                <p className="text-blue-800 text-base leading-relaxed">
                                                    Admission Fee and Security Deposit apply only to the first year. Fees are subject to change. Please contact admissions for the most current details.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* --- Career Highlights & Opportunities Section --- */}
                            <motion.section
                                ref={degreeSectionRef}
                                id="degree-highlights"
                                className="scroll-mt-28"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isDegreeInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="relative">
                                    {/* Section Header */}
                                    <div className="mb-6 sm:mb-8 lg:mb-10">
                                        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 mb-4 sm:mb-6">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-purple-700 uppercase tracking-wider">Career Prospects</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">Your Future Awaits</h2>
                                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl">Unlock your potential with skills and opportunities that shape tomorrow</p>
                                    </div>

                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                        {/* Key Skills Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={isDegreeInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                            className="relative bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8"
                                        >
                                            <div className="flex items-center gap-3 lg:gap-4 mb-6">
                                                <div className="p-2 rounded-lg bg-blue-100">
                                                    <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                                                </div>
                                                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Key Skills You'll Gain</h3>
                                            </div>
                                            <ul className="space-y-3 lg:space-y-4">
                                                {program.degreeHighlights.map((highlight, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={isDegreeInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                                        className="flex items-center gap-3 lg:gap-4"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                        <span className="text-gray-700 text-base">{highlight}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>

                                        {/* Career Paths Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={isDegreeInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                            className="relative bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8"
                                        >
                                            <div className="flex items-center gap-3 lg:gap-4 mb-6">
                                                <div className="p-2 rounded-lg bg-cyan-100">
                                                    <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-cyan-600" />
                                                </div>
                                                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Potential Career Paths</h3>
                                            </div>
                                            <ul className="space-y-3 lg:space-y-4">
                                                {program.careerOutcomes.map((career, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={isDegreeInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                                        className="flex items-center gap-3 lg:gap-4"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <CheckCircle2 className="h-5 w-5 text-cyan-600" />
                                                        </div>
                                                        <span className="text-gray-700 text-base">{career}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* --- Modules Section --- */}
                            <motion.section
                                ref={modulesSectionRef}
                                id="modules"
                                className="scroll-mt-28"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isModulesInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="relative">
                                    {/* Section Header */}
                                    <div className="mb-6 sm:mb-8 lg:mb-10">
                                        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 mb-4 sm:mb-6">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                                                <BookMarked className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-wider">Curriculum</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
                                            Course Modules
                                        </h2>
                                        {program.curriculumDocuments && (program.curriculumDocuments.structure || program.curriculumDocuments.syllabus) && (
                                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                                {program.curriculumDocuments.structure && (
                                                    <a
                                                        href={program.curriculumDocuments.structure.path}
                                                        download
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg border border-indigo-200 transition-all duration-200 hover:shadow-md hover:scale-105 text-sm sm:text-base"
                                                    >
                                                        <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        {program.curriculumDocuments.structure.label}
                                                    </a>
                                                )}
                                                {program.curriculumDocuments.syllabus && (
                                                    <a
                                                        href={program.curriculumDocuments.syllabus.path}
                                                        download
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg border border-indigo-200 transition-all duration-200 hover:shadow-md hover:scale-105 text-sm sm:text-base"
                                                    >
                                                        <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        {program.curriculumDocuments.syllabus.label}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                            Comprehensive curriculum designed for real-world success
                                        </p>
                                    </div>

                                    {/* Curriculum Container with Enhanced Design */}
                                    <div className="mt-8 relative">
                                        <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg p-3 sm:p-4 lg:p-6 xl:p-8 overflow-hidden">

                                            <Tabs defaultValue={program.modules[0]?.year || "YEAR ONE"} className="w-full relative z-10">
                                                {/* Enhanced Year Tabs */}
                                                <TabsList className="flex w-full bg-gray-50 rounded-xl sm:rounded-2xl p-1 mb-4 sm:mb-6 h-auto border border-gray-200 gap-1 sm:gap-1.5 overflow-x-auto">
                                                    {program.modules.map((year, tabIndex) => (
                                                        <TabsTrigger
                                                            key={year.year}
                                                            value={year.year}
                                                            className="flex-1 min-w-[80px] sm:min-w-[100px] data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg sm:rounded-xl py-1.5 sm:py-2 lg:py-2.5 px-2 sm:px-3 lg:px-5 transition-all duration-300 text-gray-700 font-bold text-[10px] sm:text-xs lg:text-sm hover:text-gray-900 data-[state=inactive]:hover:bg-gray-100 whitespace-nowrap"
                                                        >
                                                            <span className="relative z-10">{year.year}</span>
                                                        </TabsTrigger>
                                                    ))}
                                                </TabsList>

                                                {/* Year Content */}
                                                {program.modules.map((year, yearIndex) => (
                                                    <TabsContent
                                                        key={yearIndex}
                                                        value={year.year}
                                                        className="mt-0 animate-in fade-in-50 duration-300"
                                                    >
                                                        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                                                            {year.semesters.map((semester, semIndex) => {
                                                                // Calculate total credits for this semester
                                                                const totalCredits = semester.modules.reduce((sum, module) => sum + module.credits, 0);

                                                                return (
                                                                    <motion.div
                                                                        key={semIndex}
                                                                        className="relative"
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        animate={isModulesInView ? { opacity: 1, y: 0 } : {}}
                                                                        transition={{ duration: 0.3, delay: semIndex * 0.1 }}
                                                                    >
                                                                        {/* Semester Header with Enhanced Design */}
                                                                        <div className="relative mb-2 sm:mb-3">
                                                                            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-1.5">
                                                                                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 flex-1 min-w-0">
                                                                                    <div className="relative flex-shrink-0">
                                                                                        <div className="relative h-6 sm:h-8 lg:h-10 w-1 sm:w-1.5 bg-indigo-600 rounded-full"></div>
                                                                                    </div>
                                                                                    <div className="flex-1 min-w-0">
                                                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:gap-2.5 mb-1">
                                                                                            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                                                                                                {semester.semester}
                                                                                            </h3>
                                                                                            <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 sm:px-2 lg:px-2.5 py-0.5 rounded-full border border-indigo-200 whitespace-nowrap w-fit">
                                                                                                {totalCredits} Total Credits
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="h-0.5 w-10 sm:w-12 lg:w-16 bg-indigo-600 rounded-full"></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Course Cards Grid */}
                                                                        <div className="grid gap-2 sm:gap-2.5 lg:gap-3">
                                                                            <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-2.5 lg:space-y-3">
                                                                                {semester.modules.map((module, modIndex) => {
                                                                                    const CourseIcon = getCourseIcon(module.name);
                                                                                    // Extract short title for elective courses
                                                                                    let displayName = module.name;
                                                                                    let fullDescription = module.description;

                                                                                    // Check if it's an elective course (handles formats like "Elective I:", "Elective-I", "Elective II:", etc.)
                                                                                    const electiveMatch = module.name.match(/^(Elective\s*[-]?\s*[IVX]+(?:\s*[-:])?)\s*(.+)$/i);
                                                                                    if (electiveMatch) {
                                                                                        displayName = electiveMatch[1].replace(/[-:]\s*$/, '').trim(); // Just "Elective I" or "Elective II"
                                                                                        const courseDetails = electiveMatch[2].trim();
                                                                                        // Combine course details with existing description
                                                                                        fullDescription = courseDetails + (module.description ? `\n\n${module.description}` : '');
                                                                                    }

                                                                                    return (
                                                                                        <AccordionItem
                                                                                            key={modIndex}
                                                                                            value={`module-${yearIndex}-${semIndex}-${modIndex}`}
                                                                                            className="group border-0"
                                                                                        >
                                                                                            <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-300">
                                                                                                <AccordionTrigger className="flex w-full items-center justify-between p-2.5 sm:p-3 lg:p-4 text-left font-semibold text-gray-800 hover:no-underline group/trigger relative z-10">
                                                                                                    <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 flex-1 min-w-0">
                                                                                                        {/* Course Icon with smaller size */}
                                                                                                        <div className="flex-shrink-0 relative">
                                                                                                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover/trigger:bg-indigo-700 transition-all duration-300">
                                                                                                                <CourseIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        {/* Course Name */}
                                                                                                        <span className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 pr-2 sm:pr-3 lg:pr-4 group-hover/trigger:text-indigo-700 transition-colors duration-300 break-words">
                                                                                                            {displayName}
                                                                                                        </span>
                                                                                                    </div>

                                                                                                    {/* Credits Badge with enhanced design */}
                                                                                                    <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-shrink-0">
                                                                                                        <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded-full border border-indigo-200 whitespace-nowrap">
                                                                                                            {module.credits} Credits
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </AccordionTrigger>

                                                                                                <AccordionContent className="px-2.5 sm:px-3 lg:px-4 pb-2.5 sm:pb-3 lg:pb-4 pt-0 relative z-10">
                                                                                                    <div className="pl-[36px] sm:pl-[42px] lg:pl-[50px] border-t border-indigo-200 pt-2 sm:pt-2.5 lg:pt-3">
                                                                                                        <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                                                                                                            {fullDescription}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </AccordionContent>
                                                                                            </div>
                                                                                        </AccordionItem>
                                                                                    );
                                                                                })}
                                                                            </Accordion>
                                                                        </div>
                                                                    </motion.div>
                                                                );
                                                            })}
                                                        </div>
                                                    </TabsContent>
                                                ))}
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* --- Why University & FAQ Section --- */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 scroll-mt-28" id="why-niet">
                                {/* Why University */}
                                {program.whyUniversity && (
                                    <motion.section
                                        ref={whyUniversitySectionRef}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={isWhyUniversityInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.7 }}
                                    >
                                        <div className="relative h-full">
                                            <div className="mb-6 sm:mb-8 lg:mb-10">
                                                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 mb-4 sm:mb-6">
                                                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                                                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-amber-700 uppercase tracking-wider">Why Choose Us</span>
                                                </div>
                                                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">Why Choose Us?</h2>
                                                <p className="text-base sm:text-lg text-gray-600">Experience excellence in education</p>
                                            </div>
                                            <div className="relative bg-gradient-to-br from-white to-amber-50/30 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
                                                <div className="relative">
                                                    <div className="flex items-start gap-3 lg:gap-4">
                                                        <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex-shrink-0">
                                                            <Star className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-gray-700 leading-relaxed text-base">{program.whyUniversity}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.section>
                                )}

                                {/* FAQ */}
                                <motion.section
                                    ref={faqSectionRef}
                                    id="faq"
                                    className="faq-section scroll-mt-28"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7 }}
                                >
                                    <div className="relative h-full">
                                        {/* Section Header */}
                                        <div className="mb-6 sm:mb-8 lg:mb-10">
                                            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-50 via-pink-50 to-fuchsia-50 border border-rose-100 mb-4 sm:mb-6">
                                                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500">
                                                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                                </div>
                                                <span className="text-xs sm:text-sm font-semibold text-rose-700 uppercase tracking-wider">Frequently Asked</span>
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
                                                FAQs
                                            </h2>
                                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                                Get answers to common questions
                                            </p>
                                        </div>

                                        {/* FAQ Container */}
                                        <div className="relative mt-6 sm:mt-8">
                                            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                                                <Accordion type="single" collapsible className="w-full">
                                                    <AccordionItem value="faq-1" className="border-0">
                                                        <div className="bg-white rounded-lg">
                                                            <AccordionTrigger className="flex w-full items-center justify-between gap-2 sm:gap-3 lg:gap-5 p-3 sm:p-4 lg:p-6 text-left hover:no-underline">
                                                                <span className="text-sm sm:text-base font-semibold text-gray-900 flex-1 min-w-0 pr-2 sm:pr-3 lg:pr-5">
                                                                    What are the admission requirements?
                                                                </span>
                                                                <div className="flex-shrink-0">
                                                                    <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100">
                                                                        <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                                                                    </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 pt-0">
                                                                <div className="pt-3 sm:pt-4 lg:pt-6">
                                                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                                                        {program.admissionEligibility}
                                                                    </p>
                                                                </div>
                                                            </AccordionContent>
                                                        </div>
                                                    </AccordionItem>

                                                    <AccordionItem value="faq-2" className="border-0">
                                                        <div className="bg-white rounded-lg">
                                                            <AccordionTrigger className="flex w-full items-center justify-between gap-2 sm:gap-3 lg:gap-5 p-3 sm:p-4 lg:p-6 text-left hover:no-underline">
                                                                <span className="text-sm sm:text-base font-semibold text-gray-900 flex-1 min-w-0 pr-2 sm:pr-3 lg:pr-5">
                                                                    What are the program fees?
                                                                </span>
                                                                <div className="flex-shrink-0">
                                                                    <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100">
                                                                        <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                                                                    </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 pt-0">
                                                                <div className="pt-3 sm:pt-4 lg:pt-6">
                                                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                                                        The total program fee is <strong className="font-bold text-gray-900">NPR {totalFee.toLocaleString()}</strong>. This includes all fees across all years.
                                                                        Please refer to the detailed fee structure above for a year-by-year breakdown.
                                                                    </p>
                                                                </div>
                                                            </AccordionContent>
                                                        </div>
                                                    </AccordionItem>

                                                    <AccordionItem value="faq-3" className="border-0">
                                                        <div className="bg-white rounded-lg">
                                                            <AccordionTrigger className="flex w-full items-center justify-between gap-2 sm:gap-3 lg:gap-5 p-3 sm:p-4 lg:p-6 text-left hover:no-underline">
                                                                <span className="text-sm sm:text-base font-semibold text-gray-900 flex-1 min-w-0 pr-2 sm:pr-3 lg:pr-5">
                                                                    What are the career prospects after graduation?
                                                                </span>
                                                                <div className="flex-shrink-0">
                                                                    <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100">
                                                                        <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                                                                    </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 pt-0">
                                                                <div className="pt-3 sm:pt-4 lg:pt-6">
                                                                    <p className="mb-3 sm:mb-4 font-semibold text-gray-900 text-base sm:text-lg">Graduates can pursue careers in:</p>
                                                                    <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                                                                        {program.careerOutcomes.map((career, index) => (
                                                                            <li key={index} className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                                                                                <div className="flex-shrink-0 mt-1.5">
                                                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                                                                </div>
                                                                                <span className="text-sm sm:text-base text-gray-700">{career}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </AccordionContent>
                                                        </div>
                                                    </AccordionItem>

                                                    <AccordionItem value="faq-4" className="border-0">
                                                        <div className="bg-white rounded-lg">
                                                            <AccordionTrigger className="flex w-full items-center justify-between gap-2 sm:gap-3 lg:gap-5 p-3 sm:p-4 lg:p-6 text-left hover:no-underline">
                                                                <span className="text-sm sm:text-base font-semibold text-gray-900 flex-1 min-w-0 pr-2 sm:pr-3 lg:pr-5">
                                                                    Are scholarships available?
                                                                </span>
                                                                <div className="flex-shrink-0">
                                                                    <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100">
                                                                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                                                                    </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 pt-0">
                                                                <div className="pt-3 sm:pt-4 lg:pt-6">
                                                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                                                        Yes, we offer various scholarships including merit-based scholarships and need-based financial aid.
                                                                        Please contact our admissions office for more information about available scholarships and eligibility criteria.
                                                                    </p>
                                                                </div>
                                                            </AccordionContent>
                                                        </div>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </div>
                                    </div>
                                </motion.section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Related Courses Section */}
            {relatedPrograms.length > 0 && (
                <section ref={relatedProgramsRef} className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-6 sm:mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-100 mb-3 sm:mb-4">
                                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#0b4c78]" />
                                <span className="text-[#0b4c78] text-xs sm:text-sm">Related Programs</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Explore Other Programs
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {relatedPrograms.map((relatedProgram, index) => {
                                const RelatedIcon = relatedProgram.icon;
                                return (
                                    <motion.div
                                        key={relatedProgram.slug}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <Link to={`/academics/${relatedProgram.slug}`}>
                                            <div className="relative h-full bg-white rounded-[2rem] overflow-hidden border border-gray-200 hover:border-gray-300 transition-all hover:shadow-2xl group/card">
                                                <div className="relative h-64 overflow-hidden">
                                                    <ImageWithFallback
                                                        src={relatedProgram.image}
                                                        alt={relatedProgram.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        loading="lazy"
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${relatedProgram.gradient} opacity-40 group-hover:opacity-30 transition-opacity`}></div>

                                                    {/* Floating Icon */}
                                                    <div className="absolute top-6 right-6">
                                                        <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                                                            <RelatedIcon className="h-7 w-7 text-gray-900" />
                                                        </div>
                                                    </div>

                                                    {/* Stats Badge */}
                                                    <div className="absolute bottom-6 left-6">
                                                        <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-sm text-gray-900">
                                                            {relatedProgram.duration} • {relatedProgram.degree}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-4 sm:p-6 lg:p-8">
                                                    <h3 className="text-xl sm:text-2xl text-gray-900 mb-2 sm:mb-3">{relatedProgram.title}</h3>
                                                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-2">{relatedProgram.overview}</p>

                                                    <Button
                                                        variant="ghost"
                                                        className="text-[#0b4c78] hover:text-blue-700 hover:bg-blue-50 p-0 group/btn h-auto"
                                                    >
                                                        <span className="text-sm sm:text-base">Explore Program</span>
                                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </div>

                                                {/* Gradient Border Effect */}
                                                <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${relatedProgram.gradient} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section ref={ctaSectionRef} className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-cyan-500/15 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-0 left-0 w-[250px] sm:w-[375px] lg:w-[500px] h-[250px] sm:h-[375px] lg:h-[500px] bg-purple-500/15 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl text-white mb-4 sm:mb-6 tracking-tight">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-blue-100/90 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
                            Apply now for admissions 2026. Join us and shape your future in technology and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <a
                                href="https://entrance.puexam.edu.np/studentlogin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full sm:w-auto"
                            >
                                <Button
                                    size="lg"
                                    className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 lg:h-14 group w-full sm:w-auto"
                                >
                                    Apply Now
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                            <a href="tel:+9779705320350">
                                <Button
                                    size="lg"
                                    className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 lg:h-14 transition-all w-full sm:w-auto"
                                >
                                    Contact Admissions
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Back to Top Button */}
            {showBackToTop && (
                <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-[#0b4c78] to-cyan-500 hover:from-[#0a3d5f] hover:to-cyan-600 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-105 w-12 h-12 p-0"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5 text-white" />
                </Button>
            )}

            <Footer />
        </div>
    );
}


