import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getFacultyBySlug, getAllFaculty, FacultyMember } from "../data/faculty";
import { 
    ArrowLeft, 
    Mail, 
    Phone, 
    MapPin, 
    GraduationCap, 
    Briefcase, 
    BookOpen, 
    Award, 
    FileText,
    ExternalLink,
    Linkedin,
    Globe,
    Users,
    Building2,
    Calendar,
    Sparkles
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

export function IndividualFacultyPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const canonicalUrl = `${window.location.origin}${location.pathname}`;

    const faculty = slug ? getFacultyBySlug(slug) : undefined;
    const allFaculty = getAllFaculty();
    const relatedFaculty = allFaculty
        .filter(f => f.slug !== slug && f.department === faculty?.department)
        .slice(0, 3);

    useEffect(() => {
        if (!faculty) {
            navigate("/faculty-and-staff");
            return;
        }
    }, [faculty, navigate]);

    if (!faculty) {
        return null;
    }

    const fullName = `${faculty.title || ""} ${faculty.firstName} ${faculty.middleName || ""} ${faculty.lastName}`.trim();
    const getFacultyTypeLabel = (type: string) => {
        switch (type) {
            case "full-time": return "Full-Time";
            case "part-time": return "Part-Time";
            case "visiting": return "Visiting";
            default: return type;
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case "teaching": return "Teaching Faculty";
            case "board-member": return "Board Member";
            case "administrative": return "Administrative Staff";
            case "support": return "Support Staff";
            case "non-teaching": return "Non-Teaching Staff";
            default: return category;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>{fullName} - {faculty.designation} | NIET Faculty</title>
                <meta name="description" content={`${fullName}, ${faculty.designation} at NIET. ${faculty.bio || `Expert in ${faculty.specialization || faculty.department}`}`} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={`${fullName} - NIET Faculty`} />
                <meta property="og:description" content={faculty.bio || `Expert in ${faculty.specialization || faculty.department}`} />
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <Header />

            {/* Hero Section */}
            <section className="relative pt-20 lg:pt-24 pb-12 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/faculty-and-staff")}
                        className="mb-8 text-white hover:text-cyan-300 hover:bg-white/10"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Faculty
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Profile Image */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <div className="w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border-4 border-cyan-300 shadow-2xl">
                                    {faculty.image ? (
                                        <ImageWithFallback
                                            src={faculty.image}
                                            alt={fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                            <Users className="h-24 w-24 text-white" />
                                        </div>
                                    )}
                                </div>
                                {faculty.facultyType && (
                                    <Badge className="absolute top-4 right-4 bg-white text-cyan-600 border-cyan-300">
                                        {getFacultyTypeLabel(faculty.facultyType)}
                                    </Badge>
                                )}
                            </motion.div>
                        </div>

                        {/* Profile Info */}
                        <div className="lg:col-span-2 text-white">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <Badge variant="outline" className="border-white/30 text-white">
                                        {getCategoryLabel(faculty.category)}
                                    </Badge>
                                    {faculty.department && (
                                        <Badge variant="outline" className="border-white/30 text-white">
                                            <Building2 className="h-3 w-3 mr-1" />
                                            {faculty.department}
                                        </Badge>
                                    )}
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                    {fullName}
                                </h1>

                                <p className="text-2xl sm:text-3xl text-cyan-300 mb-6">
                                    {faculty.designation}
                                </p>

                                {faculty.leadershipRole && (
                                    <p className="text-xl text-blue-200 mb-6 flex items-center gap-2">
                                        <Award className="h-5 w-5" />
                                        {faculty.leadershipRole}
                                    </p>
                                )}

                                {faculty.boardPosition && (
                                    <p className="text-xl text-blue-200 mb-6 flex items-center gap-2">
                                        <Award className="h-5 w-5" />
                                        {faculty.boardPosition}
                                    </p>
                                )}

                                {faculty.specialization && (
                                    <p className="text-lg text-blue-100 mb-8">
                                        {faculty.specialization}
                                    </p>
                                )}

                                {/* Contact Info */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    {faculty.contact.email && (
                                        <a
                                            href={`mailto:${faculty.contact.email}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                                        >
                                            <Mail className="h-4 w-4" />
                                            <span className="text-sm">{faculty.contact.email}</span>
                                        </a>
                                    )}
                                    {faculty.contact.phone && (
                                        <a
                                            href={`tel:${faculty.contact.phone}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                                        >
                                            <Phone className="h-4 w-4" />
                                            <span className="text-sm">{faculty.contact.phone}</span>
                                        </a>
                                    )}
                                    {faculty.contact.office && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">{faculty.contact.office}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Social Links */}
                                {(faculty.contact.linkedin || faculty.contact.website || faculty.contact.googleScholar) && (
                                    <div className="flex gap-3">
                                        {faculty.contact.linkedin && (
                                            <a
                                                href={faculty.contact.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                                            >
                                                <Linkedin className="h-5 w-5" />
                                            </a>
                                        )}
                                        {faculty.contact.website && (
                                            <a
                                                href={faculty.contact.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                                            >
                                                <Globe className="h-5 w-5" />
                                            </a>
                                        )}
                                        {faculty.contact.googleScholar && (
                                            <a
                                                href={faculty.contact.googleScholar}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                                            >
                                                <FileText className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full max-w-3xl mx-auto mb-8 grid-cols-2 lg:grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="courses">Courses</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                            <TabsTrigger value="research">Research</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="mt-0">
                            <div className="max-w-4xl mx-auto space-y-8">
                                {faculty.bio && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Users className="h-6 w-6 text-cyan-600" />
                                            Biography
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {faculty.bio}
                                        </p>
                                    </motion.div>
                                )}

                                {faculty.experience && faculty.experience.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <Briefcase className="h-6 w-6 text-cyan-600" />
                                            Experience
                                        </h2>
                                        <div className="space-y-6">
                                            {faculty.experience.map((exp, index) => (
                                                <div key={index} className="border-l-4 border-cyan-500 pl-6">
                                                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                                                    <p className="text-cyan-600 font-medium">{exp.organization}</p>
                                                    <p className="text-gray-600 text-sm mb-2">{exp.duration}</p>
                                                    {exp.description && (
                                                        <p className="text-gray-700">{exp.description}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {faculty.awards && faculty.awards.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <Award className="h-6 w-6 text-cyan-600" />
                                            Awards & Recognition
                                        </h2>
                                        <div className="space-y-4">
                                            {faculty.awards.map((award, index) => (
                                                <div key={index} className="flex items-start gap-4">
                                                    <Award className="h-5 w-5 text-cyan-600 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{award.title}</h3>
                                                        <p className="text-cyan-600">{award.organization}</p>
                                                        {award.year && <p className="text-gray-600 text-sm">{award.year}</p>}
                                                        {award.description && (
                                                            <p className="text-gray-700 mt-1">{award.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Courses Tab */}
                        <TabsContent value="courses" className="mt-0">
                            <div className="max-w-4xl mx-auto">
                                {faculty.courses && faculty.courses.length > 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <BookOpen className="h-6 w-6 text-cyan-600" />
                                            Courses Taught ({faculty.courses.length})
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {faculty.courses.map((course) => (
                                                <div
                                                    key={course.id}
                                                    className="p-4 rounded-lg border border-gray-200 hover:border-cyan-300 hover:shadow-md transition-all"
                                                >
                                                    <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                                                    {course.code && (
                                                        <p className="text-sm text-gray-600 mb-2">Code: {course.code}</p>
                                                    )}
                                                    {course.program && (
                                                        <p className="text-sm text-cyan-600 mb-1">{course.program}</p>
                                                    )}
                                                    {course.semester && (
                                                        <p className="text-xs text-gray-500">{course.semester}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                                        <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600">No courses listed</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Education Tab */}
                        <TabsContent value="education" className="mt-0">
                            <div className="max-w-4xl mx-auto">
                                {faculty.education && faculty.education.length > 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <GraduationCap className="h-6 w-6 text-cyan-600" />
                                            Education
                                        </h2>
                                        <div className="space-y-6">
                                            {faculty.education.map((edu, index) => (
                                                <div key={index} className="border-l-4 border-cyan-500 pl-6">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {edu.degree} in {edu.field}
                                                    </h3>
                                                    <p className="text-cyan-600 font-medium">{edu.institution}</p>
                                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                                        {edu.year && <span>{edu.year}</span>}
                                                        {edu.country && <span>• {edu.country}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                                        <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600">No education information available</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Research Tab */}
                        <TabsContent value="research" className="mt-0">
                            <div className="max-w-4xl mx-auto space-y-8">
                                {faculty.researchInterests && faculty.researchInterests.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <Sparkles className="h-6 w-6 text-cyan-600" />
                                            Research Interests
                                        </h2>
                                        <div className="space-y-4">
                                            {faculty.researchInterests.map((interest, index) => (
                                                <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                                    <h3 className="font-semibold text-gray-900 mb-1">{interest.area}</h3>
                                                    {interest.description && (
                                                        <p className="text-gray-700 text-sm">{interest.description}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {faculty.publications && faculty.publications.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <FileText className="h-6 w-6 text-cyan-600" />
                                            Publications
                                        </h2>
                                        <div className="space-y-4">
                                            {faculty.publications.map((pub, index) => (
                                                <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900 mb-2">{pub.title}</h3>
                                                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                                                {pub.type && (
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {pub.type}
                                                                    </Badge>
                                                                )}
                                                                {pub.venue && <span>{pub.venue}</span>}
                                                                {pub.year && <span>• {pub.year}</span>}
                                                            </div>
                                                            {pub.authors && pub.authors.length > 0 && (
                                                                <p className="text-sm text-gray-600 mt-2">
                                                                    Authors: {pub.authors.join(", ")}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {pub.link && (
                                                            <a
                                                                href={pub.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-cyan-600 hover:text-cyan-700"
                                                            >
                                                                <ExternalLink className="h-5 w-5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {(!faculty.researchInterests || faculty.researchInterests.length === 0) &&
                                    (!faculty.publications || faculty.publications.length === 0) && (
                                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                                            <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-600">No research information available</p>
                                        </div>
                                    )}
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Related Faculty */}
                    {relatedFaculty.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                Related Faculty Members
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedFaculty.map((fac) => {
                                    const relatedFullName = `${fac.title || ""} ${fac.firstName} ${fac.lastName}`.trim();
                                    return (
                                        <Link
                                            key={fac.id}
                                            to={`/faculty-and-staff/${fac.slug}`}
                                            className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-100">
                                                    {fac.image ? (
                                                        <ImageWithFallback
                                                            src={fac.image}
                                                            alt={relatedFullName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                                            <Users className="h-8 w-8 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">
                                                        {relatedFullName}
                                                    </h3>
                                                    <p className="text-sm text-cyan-600">{fac.designation}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

