import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Download, FileText, ArrowRight, CheckCircle2, GraduationCap, Sparkles, BookOpen, DollarSign, Award, Briefcase, BookMarked, HelpCircle, ArrowUp, ChevronRight, Zap } from "lucide-react";
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

    const isHeroInView = useInView(heroRef, { once: true });
    const isOverviewInView = useInView(overviewSectionRef, { once: true, margin: "-100px" });
    const isFeeInView = useInView(feeSectionRef, { once: true, margin: "-100px" });
    const isDegreeInView = useInView(degreeSectionRef, { once: true, margin: "-100px" });
    const isModulesInView = useInView(modulesSectionRef, { once: true, margin: "-100px" });
    const isWhyUniversityInView = useInView(whyUniversitySectionRef, { once: true, margin: "-100px" });
    const isFaqInView = useInView(faqSectionRef, { once: true, margin: "-100px" });

    return (
        <div className="min-h-screen bg-white" lang="en">
            <Header />
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 pt-24">
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
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-32 w-full">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Side - Program Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
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
                                <p className="text-sm text-blue-200/80 mt-4 text-center">
                                    Student on picture: {program.studentName}
                                </p>
                            )}
                        </motion.div>

                        {/* Right Side - Course Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8 max-w-3xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                            >
                                <GraduationCap className="h-4 w-4 text-cyan-400" />
                                <span className="text-white text-sm font-semibold">{program.degree}</span>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.2] tracking-tight mb-6">
                                {program.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                                    <span className="text-white/90 font-medium text-sm">Duration:</span>
                                    <span className="text-white font-semibold">{program.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                                    <span className="text-white/90 font-medium text-sm">Credit:</span>
                                    <span className="text-white font-semibold">{program.credit}</span>
                                </div>
                                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                                    <span className="text-white/90 font-medium text-sm">Intake:</span>
                                    <span className="text-white font-semibold">{program.intake}</span>
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl text-blue-100/90 leading-[1.2] mb-8">
                                {program.description}
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 mb-8">
                                <Button
                                    size="lg"
                                    className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-lg px-6 h-12 group"
                                    aria-label="Download program brochure"
                                >
                                    <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Download Brochure
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white/30 text-lg px-6 h-12 transition-all"
                                    onClick={() => scrollToSection("fee-structure")}
                                    aria-label="View fee structure"
                                >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Fee Structure
                                </Button>
                            </div>

                            {/* Admission Eligibility - Simplified */}
                            <div className="pt-6 border-t border-white/20">
                                <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">ADMISSION ELIGIBILITY</h3>
                                <p className="text-blue-100/90 leading-relaxed text-base">{program.admissionEligibility}</p>
                            </div>

                            <Button
                                size="lg"
                                className="rounded-full bg-white text-[#0b4c78] hover:bg-blue-50 shadow-2xl hover:shadow-white/20 text-lg px-8 h-14 group w-full md:w-auto"
                                aria-label="Apply now for this program"
                            >
                                Apply Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Section - Redesigned for better UI/UX */}
            <main className="relative bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    {/* Mobile Sidebar Navigation */}
                    <div className="lg:hidden overflow-x-auto pb-4 mb-8 -mx-4 px-4">
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
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm whitespace-nowrap transition-all font-medium ${activeSection === item.id
                                            ? "bg-gradient-to-r from-[#0b4c78] to-cyan-500 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

                    <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                        {/* Sticky Sidebar Navigation (Desktop) */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-28">
                                <nav aria-label="Page sections">
                                    <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">On this page</h3>
                                    <div className="space-y-2">
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
                                                    className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:translate-x-1 ${activeSection === item.id
                                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                        }`}
                                                    aria-current={activeSection === item.id ? "page" : undefined}
                                                >
                                                    <ItemIcon className={`h-5 w-5 flex-shrink-0 transition-colors ${activeSection === item.id ? "text-white" : "text-blue-600"}`} />
                                                    <span>{item.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content Flow */}
                        <div className="lg:col-span-9 space-y-24">
                            {/* --- Overview Section --- */}
                            <motion.section
                                ref={overviewSectionRef}
                                id="overview"
                                className="scroll-mt-28"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="prose prose-lg max-w-none">
                                    <div className="flex items-center gap-3 mb-4">
                                        <BookOpen className="h-7 w-7 text-blue-600" />
                                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight m-0">Program Overview</h2>
                                    </div>
                                    <p className="text-gray-600">
                                        {program.overview}
                                    </p>
                                </div>
                                <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-200/80 p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-5">What You Will Learn:</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                        {program.youWill.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
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
                                <div className="flex items-center gap-3 mb-4">
                                    <DollarSign className="h-7 w-7 text-blue-600" />
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Fee Structure</h2>
                                </div>
                                <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200/80 shadow-xl bg-white">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4 text-left font-bold text-gray-800 uppercase tracking-wider">Particulars</th>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <th key={index} scope="col" className="px-6 py-4 text-center font-bold text-gray-800 uppercase tracking-wider">
                                                            {fee.year}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Admission Fee</td>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                                            {fee.admissionFee > 0 ? `NPR ${fee.admissionFee.toLocaleString()}` : <span className="text-gray-400">-</span>}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Annual Fee</td>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                                            NPR {fee.annualFee.toLocaleString()}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">CCA Fee</td>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                                            NPR {fee.ccaFee.toLocaleString()}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Semester 1 Fee</td>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                                            NPR {fee.semester1Fee.toLocaleString()}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Semester 2 Fee</td>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                                            NPR {fee.semester2Fee.toLocaleString()}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">University Regd. Fee</td>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                                            {fee.universityRegFee > 0 ? `NPR ${fee.universityRegFee.toLocaleString()}` : <span className="text-gray-400">-</span>}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr className="bg-blue-600 text-white font-bold">
                                                    <td className="px-6 py-4 whitespace-nowrap text-base">Grand Total</td>
                                                    {program.feeStructure.map((fee, index) => (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-center text-base">
                                                            NPR {fee.total.toLocaleString()}
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-blue-800 text-sm">
                                    <strong>Note:</strong> University Registration Fee applies only to the first year. Fees are subject to change. Please contact admissions for the most current details.
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
                                <div className="flex items-center gap-3 mb-4">
                                    <Award className="h-7 w-7 text-blue-600" />
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Career Prospects</h2>
                                </div>
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2"><Zap className="text-blue-500" />Key Skills You'll Gain</h3>
                                        <ul className="space-y-4">
                                            {program.degreeHighlights.map((highlight, index) => (
                                                <li key={index} className="flex items-start gap-3 text-gray-700">
                                                    <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2"><Briefcase className="text-cyan-600" />Potential Career Paths</h3>
                                        <ul className="space-y-4">
                                            {program.careerOutcomes.map((career, index) => (
                                                <li key={index} className="flex items-start gap-3 text-gray-700">
                                                    <ChevronRight className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                                                    <span>{career}</span>
                                                </li>
                                            ))}
                                        </ul>
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
                                <div className="flex items-center gap-3 mb-4">
                                    <BookMarked className="h-7 w-7 text-blue-600" />
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Course Modules</h2>
                                </div>
                                <Tabs defaultValue={program.modules[0]?.year || "YEAR ONE"} className="w-full mt-8">
                                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1.5 rounded-xl shadow-inner">
                                        {program.modules.map((year) => (
                                            <TabsTrigger
                                                key={year.year}
                                                value={year.year}
                                                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md rounded-lg py-2.5 transition-all text-gray-600 font-semibold text-sm"
                                            >
                                                {year.year}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {program.modules.map((year, yearIndex) => (
                                        <TabsContent key={yearIndex} value={year.year} className="mt-8">
                                            <div className="space-y-10">
                                                {year.semesters.map((semester, semIndex) => (
                                                    <div key={semIndex}>
                                                        <h3 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-blue-500 pl-4">{semester.semester}</h3>
                                                        <Accordion type="single" collapsible className="w-full space-y-3">
                                                            {semester.modules.map((module, modIndex) => (
                                                                <AccordionItem
                                                                    key={modIndex}
                                                                    value={`module-${yearIndex}-${semIndex}-${modIndex}`}
                                                                    className="bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                                                >
                                                                    <AccordionTrigger className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-800 hover:no-underline">
                                                                        {module.name}
                                                                        <span className="ml-4 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{module.credits} Credits</span>
                                                                    </AccordionTrigger>
                                                                    <AccordionContent className="px-6 pb-6 pt-2 text-gray-600">
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
                            </motion.section>

                            {/* --- Why University & FAQ Section --- */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 scroll-mt-28" id="why-university">
                                {/* Why University */}
                                {program.whyUniversity && (
                                    <motion.section
                                        ref={whyUniversitySectionRef}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={isWhyUniversityInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.7 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Sparkles className="h-7 w-7 text-blue-600" />
                                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Why Choose Us?</h2>
                                        </div>
                                        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-200/80 prose max-w-none text-gray-600">
                                            <p>{program.whyUniversity}</p>
                                            <p className="text-sm italic">Note: The curriculum is regularly reviewed to ensure it remains current and relevant to industry needs.</p>
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
                                    <div className="flex items-center gap-3 mb-4">
                                        <HelpCircle className="h-7 w-7 text-blue-600" />
                                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">FAQs</h2>
                                    </div>
                                    <div className="mt-8 space-y-3">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="faq-1" className="bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-3">
                                                <AccordionTrigger className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-800 hover:no-underline">
                                                    What are the admission requirements?
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-6 pt-2 text-gray-600">
                                                    {program.admissionEligibility}
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="faq-2" className="bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-3">
                                                <AccordionTrigger className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-800 hover:no-underline">
                                                    What are the program fees?
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-6 pt-2 text-gray-600">
                                                    The total program fee is NPR {totalFee.toLocaleString()}. This includes all fees across all years.
                                                    Please refer to the detailed fee structure above for a year-by-year breakdown.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="faq-3" className="bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-3">
                                                <AccordionTrigger className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-800 hover:no-underline">
                                                    What are the career prospects after graduation?
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-6 pt-2 text-gray-600">
                                                    <p className="mb-3">Graduates can pursue careers in:</p>
                                                    <ul className="list-disc list-inside space-y-2">
                                                        {program.careerOutcomes.map((career, index) => (
                                                            <li key={index}>{career}</li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="faq-4" className="bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                                <AccordionTrigger className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-800 hover:no-underline">
                                                    Are scholarships available?
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-6 pt-2 text-gray-600">
                                                    Yes, we offer various scholarships including merit-based scholarships and need-based financial aid.
                                                    Please contact our admissions office for more information about available scholarships and eligibility criteria.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </motion.section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Related Courses Section */}
            {relatedPrograms.length > 0 && (
                <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
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
            <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 relative overflow-hidden">
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

