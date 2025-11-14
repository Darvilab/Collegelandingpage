import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Download, FileText, ArrowRight, CheckCircle2, GraduationCap, Sparkles, BookOpen, DollarSign, Award, Briefcase, BookMarked, HelpCircle, ArrowUp, ChevronRight, Zap, TrendingUp, Users, Target, Lightbulb, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getProgramBySlug, getAllPrograms, Program } from "../data/programs";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

export function IndividualProgramPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
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
            "why-university": whyUniversitySectionRef,
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
                { id: "why-university", ref: whyUniversitySectionRef },
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
    const totalFee = program.feeStructure.reduce((sum, fee) => sum + fee.grandTotal, 0);
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

    return (
        <div className="min-h-screen bg-white" lang="en">
            <Header />
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 pt-20 lg:pt-24">
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
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[100px]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-32 w-full">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center mb-12 lg:mb-16">
                        {/* Left Side - Program Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
                                <ImageWithFallback
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-30`}></div>

                                {/* Course-specific illustration overlay */}
                                {program.slug === "btech-artificial-intelligence" && (
                                    <div className="absolute inset-0">
                                        <ImageWithFallback
                                            src="/ArtificialIntelligence.png"
                                            alt="Artificial Intelligence Illustration"
                                            className="w-full h-full object-contain rounded-[2rem]"
                                            loading="eager"
                                        />
                                    </div>
                                )}
                                {program.slug === "be-biomedical-engineering" && (
                                    <div className="absolute inset-0">
                                        <ImageWithFallback
                                            src="/BioMedicalEngineeringInNepal.png"
                                            alt="Biomedical Engineering Illustration"
                                            className="w-full h-full object-contain rounded-[2rem]"
                                            loading="eager"
                                        />
                                    </div>
                                )}
                                {program.slug === "be-computer-engineering" && (
                                    <div className="absolute inset-0">
                                        <ImageWithFallback
                                            src="/ComputerEngineering.png"
                                            alt="Computer Engineering Illustration"
                                            className="w-full h-full object-contain rounded-[2rem]"
                                            loading="eager"
                                        />
                                    </div>
                                )}

                                <div className="absolute top-6 left-6 z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center">
                                        <Icon className="h-8 w-8 text-gray-900" />
                                    </div>
                                </div>
                            </div>
                            {program.studentName && (
                                <p className="text-xs sm:text-sm text-blue-200/80 mt-3 sm:mt-4 text-center">
                                    Student on picture: {program.studentName}
                                </p>
                            )}
                        </motion.div>

                        {/* Right Side - Course Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6 lg:space-y-8 max-w-3xl order-1 lg:order-2 mb-8 lg:mb-0"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                            >
                                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" />
                                <span className="text-white text-xs sm:text-sm font-semibold">{program.degree}</span>
                            </motion.div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.2] tracking-tight mb-4 lg:mb-6">
                                {program.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 lg:gap-3 mb-4 lg:mb-6">
                                <div className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                                    <span className="text-white/90 font-medium text-xs sm:text-sm">Duration:</span>
                                    <span className="text-white font-semibold text-xs sm:text-sm">{program.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                                    <span className="text-white/90 font-medium text-xs sm:text-sm">Credit:</span>
                                    <span className="text-white font-semibold text-xs sm:text-sm">{program.credit}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                                    <span className="text-white/90 font-medium text-xs sm:text-sm">Intake:</span>
                                    <span className="text-white font-semibold text-xs sm:text-sm">{program.intake}</span>
                                </div>
                            </div>

                            <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 leading-[1.2] mb-6 lg:mb-8">
                                {program.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
                                <Button
                                    size="lg"
                                    className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-base lg:text-lg px-5 lg:px-6 h-11 lg:h-12 group"
                                    aria-label="Download program brochure"
                                >
                                    <Download className="mr-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
                                    Download Brochure
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-base lg:text-lg px-5 lg:px-6 h-11 lg:h-12 transition-all"
                                    onClick={() => scrollToSection("fee-structure")}
                                    aria-label="View fee structure"
                                >
                                    <FileText className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                                    Fee Structure
                                </Button>
                            </div>

                            <Button
                                size="lg"
                                className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-base lg:text-lg px-6 lg:px-8 h-12 lg:h-14 group w-full sm:w-auto mb-0"
                                aria-label="Apply now for this program"
                            >
                                Apply Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Key Highlights Section - Below the fold but visible */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto"
                    >
                        {/* Career Prospects */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-7 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-cyan-500/20">
                                    <Briefcase className="h-5 w-5 text-cyan-300" />
                                </div>
                                <h3 className="text-white font-bold text-base lg:text-lg">Career Prospects</h3>
                            </div>
                            <ul className="space-y-2.5">
                                {program.careerOutcomes.slice(0, 3).map((career, index) => (
                                    <li key={index} className="flex items-start gap-2.5 text-blue-100/90 text-sm lg:text-base">
                                        <ChevronRight className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <span>{career}</span>
                                    </li>
                                ))}
                            </ul>
                            {program.careerOutcomes.length > 3 && (
                                <button
                                    onClick={() => scrollToSection("degree-highlights")}
                                    className="text-cyan-200 hover:text-cyan-100 text-xs lg:text-sm mt-4 transition-colors cursor-pointer hover:underline"
                                >
                                    +{program.careerOutcomes.length - 3} more careers
                                </button>
                            )}
                        </div>

                        {/* Key Skills */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-7 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-blue-500/20">
                                    <Zap className="h-5 w-5 text-blue-300" />
                                </div>
                                <h3 className="text-white font-bold text-base lg:text-lg">Key Skills</h3>
                            </div>
                            <ul className="space-y-2.5">
                                {program.degreeHighlights.slice(0, 3).map((skill, index) => (
                                    <li key={index} className="flex items-start gap-4 text-blue-100/90 text-sm lg:text-base">
                                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                            {program.degreeHighlights.length > 3 && (
                                <button
                                    onClick={() => scrollToSection("degree-highlights")}
                                    className="text-cyan-200 hover:text-cyan-100 text-xs lg:text-sm mt-4 transition-colors cursor-pointer hover:underline"
                                >
                                    +{program.degreeHighlights.length - 3} more skills
                                </button>
                            )}
                        </div>

                        {/* Admission Eligibility */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-7 hover:bg-white/15 transition-all sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-purple-500/20">
                                    <GraduationCap className="h-5 w-5 text-purple-300" />
                                </div>
                                <h3 className="text-white font-bold text-base lg:text-lg">Eligibility</h3>
                            </div>
                            <p className="text-blue-100/90 leading-relaxed text-sm lg:text-base">{program.admissionEligibility}</p>
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

                <div ref={mainContentRef} className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
                    {/* Mobile Sidebar Navigation */}
                    <div className="lg:hidden overflow-x-auto pb-6 mb-8 -mx-6 px-6">
                        <nav className="flex gap-2" aria-label="Page navigation">
                            {[
                                { id: "overview", label: "Overview", icon: BookOpen },
                                { id: "fee-structure", label: "Fee", icon: DollarSign },
                                { id: "degree-highlights", label: "Highlights", icon: Award },
                                { id: "modules", label: "Modules", icon: BookMarked },
                                { id: "why-university", label: "Why Us", icon: Sparkles },
                                { id: "faq", label: "FAQ", icon: HelpCircle },
                            ].map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm whitespace-nowrap transition-all font-medium shadow-sm ${activeSection === item.id
                                            ? "bg-gradient-to-r from-[#0b4c78] to-cyan-500 text-white shadow-lg scale-105"
                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                            }`}
                                        aria-label={`Navigate to ${item.label} section`}
                                    >
                                        <ItemIcon className={`h-4 w-4 flex-shrink-0 ${activeSection === item.id ? "text-white" : "text-[#0b4c78]"}`} />
                                        <span>{item.label}</span>
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
                                            { id: "why-university", label: "Why University?", icon: Sparkles },
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
                        <div className="space-y-32 flex-1 min-w-0">
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
                                    <div className="mb-8">
                                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-6 mt-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                                                <BookOpen className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Program Overview</span>
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                            Discover Your Path
                                        </h2>
                                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                                            {program.overview}
                                        </p>
                                    </div>

                                    {/* What You Will Learn Card */}
                                    <div className="relative mt-12 bg-gradient-to-br from-white to-blue-50/30 rounded-3xl shadow-xl border border-gray-200/60 p-8 lg:p-10 overflow-hidden">
                                        {/* Decorative gradient overlay */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>

                                        <div className="relative">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
                                                    <Lightbulb className="h-6 w-6 text-white" />
                                                </div>
                                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">What You Will Learn</h3>
                                            </div>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {program.youWill.map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={isOverviewInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        className="flex items-start gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all group"
                                                    >
                                                        <div className="flex-shrink-0 mt-0.5">
                                                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 group-hover:scale-110 transition-transform">
                                                                <CheckCircle2 className="h-5 w-5 text-white" />
                                                            </div>
                                                        </div>
                                                        <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
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
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 mb-6 mt-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500">
                                                <DollarSign className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Investment</span>
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Fee Structure</h2>
                                        <p className="text-lg text-gray-600 max-w-2xl">Transparent pricing for your educational journey</p>
                                    </div>

                                    {/* Fee Table Card */}
                                    <div className="relative mt-8 overflow-hidden rounded-xl border border-gray-300 bg-white">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                                                        <th scope="col" className="px-8 py-6 text-left font-semibold text-gray-900 uppercase tracking-wide text-sm">Particulars</th>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <th key={index} scope="col" className="px-8 py-6 text-center font-semibold text-gray-900 uppercase tracking-wide text-sm">
                                                                {fee.year}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-900 text-base">Admission Fee</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-8 py-6 whitespace-nowrap text-center text-gray-700 text-base">
                                                                {fee.admissionFee > 0 ? `NPR ${fee.admissionFee.toLocaleString()}` : <span className="text-gray-400">-</span>}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-900 text-base">Annual Fee</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-8 py-6 whitespace-nowrap text-center text-gray-700 text-base">
                                                                NPR {fee.annualFee.toLocaleString()}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-900 text-base">CCA Fee</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-8 py-6 whitespace-nowrap text-center text-gray-700 text-base">
                                                                NPR {fee.ccaFee.toLocaleString()}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-900 text-base">Semester 1 Fee</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-8 py-6 whitespace-nowrap text-center text-gray-700 text-base">
                                                                NPR {fee.semester1Fee.toLocaleString()}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-900 text-base">Semester 2 Fee</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-8 py-6 whitespace-nowrap text-center text-gray-700 text-base">
                                                                NPR {fee.semester2Fee.toLocaleString()}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-900 text-base">University Regd. Fee</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-8 py-6 whitespace-nowrap text-center text-gray-700 text-base">
                                                                {fee.universityRegFee > 0 ? `NPR ${fee.universityRegFee.toLocaleString()}` : <span className="text-gray-400">-</span>}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    <tr className="bg-gray-50 border-t-2 border-gray-300">
                                                        <td className="px-8 py-6 whitespace-nowrap font-bold text-gray-900 text-lg">Grand Total</td>
                                                        {program.feeStructure.map((fee, index) => (
                                                            <td key={index} className="px-8 py-6 whitespace-nowrap text-center font-bold text-gray-900 text-lg">
                                                                NPR {fee.total.toLocaleString()}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Note Card */}
                                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200/60 shadow-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-blue-500 flex-shrink-0">
                                                <FileText className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-blue-900 font-semibold mb-1">Important Note</p>
                                                <p className="text-blue-800 text-sm leading-relaxed">
                                                    University Registration Fee applies only to the first year. Fees are subject to change. Please contact admissions for the most current details.
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
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 mb-6 mt-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                                <Award className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Career Prospects</span>
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Your Future Awaits</h2>
                                        <p className="text-lg text-gray-600 max-w-2xl">Unlock your potential with skills and opportunities that shape tomorrow</p>
                                    </div>

                                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Key Skills Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={isDegreeInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="relative bg-white rounded-2xl border border-gray-200 p-8 lg:p-10"
                                        >
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 rounded-lg bg-blue-100">
                                                    <Zap className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Key Skills You'll Gain</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {program.degreeHighlights.map((highlight, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={isDegreeInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                                        className="flex items-center gap-4"
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
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="relative bg-white rounded-2xl border border-gray-200 p-8 lg:p-10"
                                        >
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 rounded-lg bg-cyan-100">
                                                    <Briefcase className="h-6 w-6 text-cyan-600" />
                                                </div>
                                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Potential Career Paths</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {program.careerOutcomes.map((career, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={isDegreeInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                                        className="flex items-center gap-4"
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
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6 mt-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                                                <BookMarked className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">Curriculum</span>
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Course Modules</h2>
                                        <p className="text-lg text-gray-600 max-w-2xl">Comprehensive curriculum designed for real-world success</p>
                                    </div>

                                    <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-8 lg:p-10">
                                        <Tabs defaultValue={program.modules[0]?.year || "YEAR ONE"} className="w-full">
                                            <TabsList className="flex w-full bg-transparent border-b border-gray-200 p-0 mb-8 h-auto">
                                                {program.modules.map((year) => (
                                                    <TabsTrigger
                                                        key={year.year}
                                                        value={year.year}
                                                        className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none py-4 px-6 transition-all text-gray-600 font-semibold text-base hover:text-gray-900 border-b-2 border-transparent -mb-[2px]"
                                                    >
                                                        {year.year}
                                                    </TabsTrigger>
                                                ))}
                                            </TabsList>
                                            {program.modules.map((year, yearIndex) => (
                                                <TabsContent key={yearIndex} value={year.year} className="mt-6">
                                                    <div className="space-y-12">
                                                        {year.semesters.map((semester, semIndex) => (
                                                            <div key={semIndex} className="relative">
                                                                <div className="flex items-center gap-4 mb-6">
                                                                    <div className="h-12 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                                                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{semester.semester}</h3>
                                                                </div>
                                                                <Accordion type="single" collapsible className="w-full space-y-4">
                                                                    {semester.modules.map((module, modIndex) => (
                                                                        <AccordionItem
                                                                            key={modIndex}
                                                                            value={`module-${yearIndex}-${semIndex}-${modIndex}`}
                                                                            className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                                                                        >
                                                                            <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left font-semibold text-gray-800 hover:no-underline group">
                                                                                <span className="text-lg pr-4">{module.name}</span>
                                                                                <div className="flex items-center gap-3 flex-shrink-0">
                                                                                    <span className="text-sm font-bold text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-1.5 rounded-full border border-indigo-200 group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                                                                                        {module.credits} Credits
                                                                                    </span>
                                                                                </div>
                                                                            </AccordionTrigger>
                                                                            <AccordionContent className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                                                                                {module.description}
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    ))}
                                                                </Accordion>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    </div>
                                </div>
                            </motion.section>

                            {/* --- Why University & FAQ Section --- */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 scroll-mt-28" id="why-university">
                                {/* Why University */}
                                {program.whyUniversity && (
                                    <motion.section
                                        ref={whyUniversitySectionRef}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={isWhyUniversityInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.7 }}
                                    >
                                        <div className="relative h-full">
                                            <div className="mb-8">
                                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 mb-6 mt-6">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                                                        <Sparkles className="h-5 w-5 text-white" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Why Choose Us</span>
                                                </div>
                                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Why Choose Us?</h2>
                                                <p className="text-lg text-gray-600">Experience excellence in education</p>
                                            </div>
                                            <div className="relative bg-gradient-to-br from-white to-amber-50/30 p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-200/60 overflow-hidden group hover:shadow-2xl transition-all">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
                                                <div className="relative">
                                                    <div className="flex items-start gap-4 mb-6">
                                                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg flex-shrink-0">
                                                            <Star className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-gray-700 leading-relaxed text-lg mb-4">{program.whyUniversity}</p>
                                                            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                                                                <p className="text-sm text-amber-800 italic leading-relaxed">
                                                                    <strong className="font-semibold">Note:</strong> The curriculum is regularly reviewed to ensure it remains current and relevant to industry needs.
                                                                </p>
                                                            </div>
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
                                    className="scroll-mt-28"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7 }}
                                >
                                    <div className="relative h-full">
                                        <div className="mb-8">
                                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 mb-6 mt-6">
                                                <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500">
                                                    <HelpCircle className="h-5 w-5 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-rose-700 uppercase tracking-wider">Frequently Asked</span>
                                            </div>
                                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">FAQs</h2>
                                            <p className="text-lg text-gray-600">Get answers to common questions</p>
                                        </div>
                                        <div className="mt-8 space-y-4">
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="faq-1" className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-md hover:shadow-xl transition-all mb-4 overflow-hidden">
                                                    <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left font-semibold text-gray-800 hover:no-underline group">
                                                        <span className="text-lg pr-4">What are the admission requirements?</span>
                                                        <div className="p-2 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors flex-shrink-0">
                                                            <HelpCircle className="h-5 w-5 text-rose-600" />
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                                                        {program.admissionEligibility}
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="faq-2" className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-md hover:shadow-xl transition-all mb-4 overflow-hidden">
                                                    <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left font-semibold text-gray-800 hover:no-underline group">
                                                        <span className="text-lg pr-4">What are the program fees?</span>
                                                        <div className="p-2 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors flex-shrink-0">
                                                            <DollarSign className="h-5 w-5 text-rose-600" />
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                                                        The total program fee is <strong className="font-semibold text-gray-900">NPR {totalFee.toLocaleString()}</strong>. This includes all fees across all years.
                                                        Please refer to the detailed fee structure above for a year-by-year breakdown.
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="faq-3" className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-md hover:shadow-xl transition-all mb-4 overflow-hidden">
                                                    <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left font-semibold text-gray-800 hover:no-underline group">
                                                        <span className="text-lg pr-4">What are the career prospects after graduation?</span>
                                                        <div className="p-2 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors flex-shrink-0">
                                                            <Briefcase className="h-5 w-5 text-rose-600" />
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                                                        <p className="mb-4 font-semibold text-gray-900">Graduates can pursue careers in:</p>
                                                        <ul className="space-y-2">
                                                            {program.careerOutcomes.map((career, index) => (
                                                                <li key={index} className="flex items-start gap-3">
                                                                    <div className="p-1 rounded-full bg-rose-100 mt-1 flex-shrink-0">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                                                    </div>
                                                                    <span>{career}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="faq-4" className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                                                    <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left font-semibold text-gray-800 hover:no-underline group">
                                                        <span className="text-lg pr-4">Are scholarships available?</span>
                                                        <div className="p-2 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors flex-shrink-0">
                                                            <Award className="h-5 w-5 text-rose-600" />
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                                                        Yes, we offer various scholarships including merit-based scholarships and need-based financial aid.
                                                        Please contact our admissions office for more information about available scholarships and eligibility criteria.
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
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
                <section ref={relatedProgramsRef} className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                                <Sparkles className="h-4 w-4 text-[#0b4c78]" />
                                <span className="text-[#0b4c78] text-sm">Related Programs</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Explore Other Programs
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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
                                                <div className="p-8">
                                                    <h3 className="text-2xl text-gray-900 mb-3">{relatedProgram.title}</h3>
                                                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">{relatedProgram.overview}</p>

                                                    <Button
                                                        variant="ghost"
                                                        className="text-[#0b4c78] hover:text-blue-700 hover:bg-blue-50 p-0 group/btn h-auto"
                                                    >
                                                        <span className="text-base">Explore Program</span>
                                                        <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
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
            <section ref={ctaSectionRef} className="py-20 lg:py-32 bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl lg:text-6xl text-white mb-6 tracking-tight">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto">
                            Apply now for admissions 2026. Join us and shape your future in technology and innovation.
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


