import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { 
    getAllFaculty, 
    getTeachingFaculty, 
    getBoardMembers, 
    getNonTeachingStaff,
    getFacultyByType,
    FacultyMember,
    FacultyType,
    StaffCategory
} from "../data/faculty";
import { 
    Users, 
    GraduationCap, 
    Briefcase, 
    Award, 
    Mail, 
    Phone, 
    MapPin,
    Filter,
    Search,
    BookOpen,
    Building2,
    UserCheck,
    UserCog,
    Sparkles,
    Globe,
    TrendingUp,
    Star,
    Target,
    ArrowRight,
    X,
    ChevronDown
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export function FacultyListingPage() {
    const location = useLocation();
    const canonicalUrl = `${window.location.origin}${location.pathname}`;
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<FacultyType | "all">("all");
    const [selectedCategory, setSelectedCategory] = useState<StaffCategory | "all">("all");
    const [selectedCourse, setSelectedCourse] = useState<string>("all");
    
    const facultyRef = useRef(null);
    const isFacultyInView = useInView(facultyRef, { once: true, margin: "-100px" });

    const allFaculty = getAllFaculty();
    
    // Extract all unique courses
    const allCourses = Array.from(
        new Map(
            allFaculty
                .flatMap(f => f.courses)
                .map(course => [course.id, course])
        ).values()
    ).sort((a, b) => a.name.localeCompare(b.name));
    
    // Filter faculty based on search and filters
    const filteredFaculty = allFaculty.filter(faculty => {
        const matchesSearch = searchQuery === "" || 
            `${faculty.firstName} ${faculty.lastName} ${faculty.designation} ${faculty.department} ${faculty.specialization || ""}`.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesType = selectedType === "all" || faculty.facultyType === selectedType;
        const matchesCategory = selectedCategory === "all" || faculty.category === selectedCategory;
        const matchesCourse = selectedCourse === "all" || faculty.courses.some(course => course.id === selectedCourse);
        
        return matchesSearch && matchesType && matchesCategory && matchesCourse;
    });

    // Group faculty by category for display
    const teachingFaculty = filteredFaculty.filter(f => f.category === "teaching");
    const boardMembers = filteredFaculty.filter(f => f.category === "board-member");
    const nonTeachingStaff = filteredFaculty.filter(f => 
        f.category === "administrative" || f.category === "support" || f.category === "non-teaching"
    );

    const getFacultyTypeLabel = (type: FacultyType) => {
        switch (type) {
            case "full-time": return "Full-Time";
            case "part-time": return "Part-Time";
            case "visiting": return "Visiting";
            default: return type;
        }
    };

    const getCategoryLabel = (category: StaffCategory) => {
        switch (category) {
            case "teaching": return "Teaching Faculty";
            case "board-member": return "Board Members";
            case "administrative": return "Administrative";
            case "support": return "Support Staff";
            case "non-teaching": return "Non-Teaching";
            default: return category;
        }
    };

    const FacultyCard = ({ faculty }: { faculty: FacultyMember }) => {
        const fullName = `${faculty.title || ""} ${faculty.firstName} ${faculty.middleName || ""} ${faculty.lastName}`.trim();
        
        return (
            <Link to={`/faculty-and-staff/${faculty.slug}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFacultyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200/80 hover:border-cyan-400/60 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
                >
                    <div className="flex flex-col items-center text-center">
                        {/* Image */}
                        <div className="relative mb-6">
                            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-cyan-100/80 group-hover:border-cyan-400 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                                {faculty.image ? (
                                    <ImageWithFallback
                                        src={faculty.image}
                                        alt={fullName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                        <Users className="h-14 w-14 text-white" />
                                    </div>
                                )}
                            </div>
                            {faculty.facultyType && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1.5 text-xs font-bold border-2 border-cyan-400 shadow-md"
                                >
                                    {getFacultyTypeLabel(faculty.facultyType)}
                                </motion.div>
                            )}
                        </div>

                        {/* Name and Designation */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                            {fullName}
                        </h3>
                        <p className="text-cyan-600 font-semibold mb-3 text-base">{faculty.designation}</p>
                        
                        {faculty.department && (
                            <p className="text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
                                <Building2 className="h-4 w-4 text-gray-500" />
                                <span>{faculty.department}</span>
                            </p>
                        )}

                        {faculty.specialization && (
                            <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
                                {faculty.specialization}
                            </p>
                        )}

                        {/* Courses Count */}
                        {faculty.courses.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-5 px-4 py-2 rounded-lg bg-gray-50/80">
                                <BookOpen className="h-4 w-4 text-cyan-600" />
                                <span className="font-medium">{faculty.courses.length} {faculty.courses.length === 1 ? 'Course' : 'Courses'}</span>
                            </div>
                        )}

                        {/* Contact Info */}
                        {faculty.contact.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100 w-full justify-center">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="truncate">{faculty.contact.email}</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>Faculty & Staff - Meet Our Expert Engineering Team | NIET</title>
                <meta name="description" content="Meet NIET's distinguished faculty and staff - expert professors, researchers, and administrators with industry experience from top universities and companies worldwide. Our team brings real-world expertise to engineering education in Nepal, covering AI, Biomedical Engineering, and Computer Engineering. Learn about our faculty's qualifications, research, and commitment to student success." />
                <meta name="keywords" content="NIET Faculty, Engineering Professors Nepal, Teaching Staff Nepal, Academic Staff, Engineering Education Nepal, Best Engineering Faculty Nepal, AI Professors Nepal, Biomedical Engineering Faculty, Computer Engineering Professors, Purbanchal University Faculty, Expert Engineering Teachers Nepal" />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content="Faculty & Staff - Expert Engineering Team | NIET" />
                <meta property="og:description" content="Meet our expert team of professors, researchers, and administrators with industry experience from top universities worldwide." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Faculty & Staff - NIET Engineering Team" />
                <meta name="twitter:description" content="Expert professors and researchers dedicated to engineering education excellence." />
            </Helmet>
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
                {/* Animated Background Image */}
                <div className="absolute inset-0 z-0">
                    <ImageWithFallback
                        src="/building1_khNhjUl.jpg"
                        alt="NIET Campus"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>

                {/* Gradient Mesh Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-32 lg:py-40">
                    <div className="max-w-5xl mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
                        >
                            <Sparkles className="h-4 w-4 text-cyan-400" />
                            <span className="text-white text-sm">Expert Engineering Faculty & Staff</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight text-center"
                        >
                            Meet Our
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                Expert Team
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl md:text-2xl text-blue-100/90 mb-10 max-w-3xl mx-auto leading-relaxed text-center"
                        >
                            Experienced educators, researchers, and administrators with PhD and Masters degrees from leading institutions. Our faculty combines academic excellence with real-world industry expertise to deliver exceptional engineering education in Nepal.
                        </motion.p>

                        {/* Stats/Insights Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12 mt-16 mb-8"
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center hover:bg-white/15 transition-all flex-1 min-w-[140px] max-w-[200px]">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                    {allFaculty.filter(f => f.category === "teaching").length}+
                                </div>
                                <div className="text-sm md:text-base text-blue-200">Expert Faculty</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center hover:bg-white/15 transition-all flex-1 min-w-[140px] max-w-[200px]">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                    {allFaculty.filter(f => f.facultyType === "full-time").length}+
                                </div>
                                <div className="text-sm md:text-base text-blue-200">Full-Time Staff</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center hover:bg-white/15 transition-all flex-1 min-w-[140px] max-w-[200px]">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                    {allFaculty.reduce((acc, f) => acc + f.courses.length, 0)}+
                                </div>
                                <div className="text-sm md:text-base text-blue-200">Courses Taught</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center hover:bg-white/15 transition-all flex-1 min-w-[140px] max-w-[200px]">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                    50+
                                </div>
                                <div className="text-sm md:text-base text-blue-200">PhD Holders</div>
                            </div>
                        </motion.div>

                        {/* Key Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-8"
                        >
                            <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base flex items-center gap-3 hover:bg-white/15 transition-all">
                                <Star className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                                <span>Industry Experience</span>
                            </div>
                            <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base flex items-center gap-3 hover:bg-white/15 transition-all">
                                <Globe className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                                <span>Global Universities</span>
                            </div>
                            <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base flex items-center gap-3 hover:bg-white/15 transition-all">
                                <TrendingUp className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                                <span>Research Excellence</span>
                            </div>
                            <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base flex items-center gap-3 hover:bg-white/15 transition-all">
                                <Target className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                                <span>Student Success</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl backdrop-blur-sm rotate-12 hidden lg:block"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full backdrop-blur-sm hidden lg:block"></div>
            </section>

            {/* Search and Filters - Refined Professional Design */}
            <section className="relative py-12 lg:py-16 bg-white border-b border-gray-100">
                {/* Subtle Background Texture */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-50/40 via-transparent to-cyan-50/30 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {/* Search and Filters - Single Row on Desktop */}
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-4 max-w-6xl mx-auto">
                            {/* Search Bar - Premium Design */}
                            <div className="relative flex-1 lg:max-w-md min-w-0">
                                <div className="relative group">
                                    {/* Search Icon Container */}
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                                    </div>
                                    
                                    {/* Input Field */}
                                    <input
                                        type="text"
                                        placeholder="Search faculty..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-12 py-2.5 rounded-xl border-2 border-gray-200/80 bg-white shadow-sm hover:border-gray-300 hover:shadow-md focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 text-sm font-medium h-[48px]"
                                    />
                                    
                                    {/* Clear Button */}
                                    {searchQuery && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all duration-200"
                                            aria-label="Clear search"
                                        >
                                            <X className="h-4 w-4" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>

                            {/* Course Filter - Right after search */}
                            <div className="relative group">
                                <select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-gray-200/80 bg-white shadow-sm hover:border-gray-300 hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 text-sm font-semibold cursor-pointer min-w-[140px] h-[48px]"
                                >
                                    <option value="all">All Courses</option>
                                    {allCourses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.code ? `${course.code}: ` : ""}{course.name.length > 40 ? `${course.name.substring(0, 40)}...` : course.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                                </div>
                                {selectedCourse !== "all" && (
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-white shadow-md"
                                    />
                                )}
                            </div>

                            {/* Other Filters Group */}
                            <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:ml-auto">
                                {/* Faculty Type Filter */}
                                <div className="relative group">
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value as FacultyType | "all")}
                                        className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-gray-200/80 bg-white shadow-sm hover:border-gray-300 hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 text-sm font-semibold cursor-pointer min-w-[140px] h-[48px]"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="full-time">Full-Time</option>
                                        <option value="part-time">Part-Time</option>
                                        <option value="visiting">Visiting</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                                    </div>
                                    {selectedType !== "all" && (
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-white shadow-md"
                                        />
                                    )}
                                </div>

                                {/* Category Filter */}
                                <div className="relative group">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value as StaffCategory | "all")}
                                        className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-gray-200/80 bg-white shadow-sm hover:border-gray-300 hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 text-sm font-semibold cursor-pointer min-w-[160px] h-[48px]"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="teaching">Teaching</option>
                                        <option value="board-member">Board Members</option>
                                        <option value="administrative">Administrative</option>
                                        <option value="support">Support Staff</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                                    </div>
                                    {selectedCategory !== "all" && (
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-white shadow-md"
                                        />
                                    )}
                                </div>

                                {/* Clear Button */}
                                {(selectedType !== "all" || selectedCategory !== "all" || selectedCourse !== "all" || searchQuery) && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedType("all");
                                            setSelectedCategory("all");
                                            setSelectedCourse("all");
                                        }}
                                        className="p-2.5 rounded-xl border-2 border-gray-200/80 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-700 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md h-[48px] w-[48px]"
                                        aria-label="Clear all filters"
                                    >
                                        <X className="h-5 w-5" />
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Faculty Listing */}
            <section ref={facultyRef} className="pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 xl:pb-32 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

                    {filteredFaculty.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-6">
                                <Users className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No faculty members found</h3>
                            <p className="text-lg text-gray-600 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for.</p>
                        </div>
                    ) : (
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid w-full max-w-2xl mx-auto mb-12 grid-cols-3">
                                <TabsTrigger value="all" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    All ({filteredFaculty.length})
                                </TabsTrigger>
                                <TabsTrigger value="teaching" className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4" />
                                    Teaching ({teachingFaculty.length})
                                </TabsTrigger>
                                <TabsTrigger value="staff" className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    Staff ({nonTeachingStaff.length + boardMembers.length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {filteredFaculty
                                        .sort((a, b) => (a.order || 999) - (b.order || 999))
                                        .map((faculty) => (
                                            <FacultyCard key={faculty.id} faculty={faculty} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="teaching" className="mt-0">
                                {teachingFaculty.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                        {teachingFaculty
                                            .sort((a, b) => (a.order || 999) - (b.order || 999))
                                            .map((faculty) => (
                                                <FacultyCard key={faculty.id} faculty={faculty} />
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600 text-lg">No teaching faculty found</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="staff" className="mt-0">
                                {(nonTeachingStaff.length > 0 || boardMembers.length > 0) ? (
                                    <div className="space-y-16">
                                        {boardMembers.length > 0 && (
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200">
                                                        <Award className="h-6 w-6 text-cyan-600" />
                                                    </div>
                                                    <span>Board Members</span>
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                                    {boardMembers
                                                        .sort((a, b) => (a.order || 999) - (b.order || 999))
                                                        .map((faculty) => (
                                                            <FacultyCard key={faculty.id} faculty={faculty} />
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                        {nonTeachingStaff.length > 0 && (
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                                                        <UserCog className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <span>Administrative & Support Staff</span>
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                                    {nonTeachingStaff
                                                        .sort((a, b) => (a.order || 999) - (b.order || 999))
                                                        .map((faculty) => (
                                                            <FacultyCard key={faculty.id} faculty={faculty} />
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600 text-lg">No staff members found</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

