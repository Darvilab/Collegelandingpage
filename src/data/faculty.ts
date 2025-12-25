export type FacultyType = "full-time" | "part-time" | "visiting";
export type StaffCategory = "teaching" | "non-teaching" | "board-member" | "administrative" | "support";

export interface Course {
    id: string;
    name: string;
    code?: string;
    program?: string; // e.g., "B. Tech in AI", "BE in Computer Engineering"
    semester?: string; // e.g., "Semester I", "Year 1"
}

export interface Education {
    degree: string;
    field: string;
    institution: string;
    year?: string;
    country?: string;
}

export interface Experience {
    position: string;
    organization: string;
    duration: string;
    description?: string;
}

export interface Publication {
    title: string;
    type: "journal" | "conference" | "book" | "patent" | "other";
    venue?: string;
    year?: string;
    authors?: string[];
    link?: string;
}

export interface ResearchInterest {
    area: string;
    description?: string;
}

export interface Award {
    title: string;
    organization: string;
    year?: string;
    description?: string;
}

export interface Contact {
    email?: string;
    phone?: string;
    office?: string;
    website?: string;
    linkedin?: string;
    googleScholar?: string;
    orcid?: string;
}

export interface FacultyMember {
    id: string;
    slug: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    title?: string; // e.g., "Dr.", "Prof.", "Mr.", "Ms."
    designation: string; // e.g., "Professor", "Associate Professor", "Assistant Professor", "Lecturer"
    department?: string;
    facultyType: FacultyType;
    category: StaffCategory;
    image?: string;
    bio?: string;
    specialization?: string;
    courses: Course[];
    education: Education[];
    experience: Experience[];
    publications?: Publication[];
    researchInterests?: ResearchInterest[];
    awards?: Award[];
    contact: Contact;
    joiningDate?: string;
    // For hierarchical structure
    reportsTo?: string; // ID of supervisor/manager
    manages?: string[]; // IDs of people they manage
    // For board members and leadership
    boardPosition?: string; // e.g., "Chairman", "Member", "Secretary"
    leadershipRole?: string; // e.g., "Dean", "Head of Department", "Director"
    // Additional metadata
    isActive: boolean;
    order?: number; // For display ordering
}

const facultyRaw: FacultyMember[] = [
    // Board Members (who may also teach)
    {
        id: "faculty-001",
        slug: "dr-rajesh-sharma",
        firstName: "Rajesh",
        lastName: "Sharma",
        title: "Dr.",
        designation: "Professor",
        department: "Computer Engineering",
        facultyType: "full-time",
        category: "board-member",
        image: "/pp/1.png",
        bio: "Dr. Rajesh Sharma is a distinguished professor with over 20 years of experience in computer engineering and artificial intelligence. He has published extensively in top-tier journals and conferences.",
        specialization: "Artificial Intelligence, Machine Learning, Computer Vision",
        courses: [
            { id: "course-001", name: "Machine Learning", code: "CS501", program: "B. Tech in AI", semester: "Semester V" },
            { id: "course-002", name: "Neural Networks and Deep Learning", code: "CS502", program: "B. Tech in AI", semester: "Semester V" },
            { id: "course-003", name: "Computer Vision", code: "CS601", program: "B. Tech in AI", semester: "Semester VI" }
        ],
        education: [
            { degree: "Ph.D.", field: "Computer Science", institution: "Stanford University", year: "2005", country: "USA" },
            { degree: "M.S.", field: "Computer Science", institution: "MIT", year: "2001", country: "USA" },
            { degree: "B.E.", field: "Computer Engineering", institution: "Tribhuvan University", year: "1999", country: "Nepal" }
        ],
        experience: [
            { position: "Professor", organization: "NIET", duration: "2015 - Present", description: "Leading research in AI and teaching graduate courses" },
            { position: "Associate Professor", organization: "Kathmandu University", duration: "2010 - 2015" },
            { position: "Research Scientist", organization: "Google Research", duration: "2005 - 2010" }
        ],
        publications: [
            { title: "Deep Learning for Medical Image Analysis", type: "journal", venue: "Nature Machine Intelligence", year: "2023", authors: ["R. Sharma", "A. Kumar"] },
            { title: "Neural Architecture Search for Edge Devices", type: "conference", venue: "ICML 2022", year: "2022" }
        ],
        researchInterests: [
            { area: "Deep Learning", description: "Neural network architectures and optimization" },
            { area: "Computer Vision", description: "Image recognition and video analysis" },
            { area: "Medical AI", description: "AI applications in healthcare" }
        ],
        awards: [
            { title: "Best Paper Award", organization: "ICML", year: "2022" },
            { title: "Outstanding Researcher", organization: "Nepal Academy of Science", year: "2021" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX",
            office: "Block A, Room 301",
            linkedin: "linkedin.com/in/rajeshsharma",
            googleScholar: "scholar.google.com/citations?user=rajeshsharma"
        },
        boardPosition: "Chairman",
        leadershipRole: "Head of Department - Computer Engineering",
        joiningDate: "2015-01-15",
        isActive: true,
        order: 1
    },
    // Full-time Teaching Faculty
    {
        id: "faculty-002",
        slug: "dr-priya-patel",
        firstName: "Priya",
        lastName: "Patel",
        title: "Dr.",
        designation: "Associate Professor",
        department: "Biomedical Engineering",
        facultyType: "full-time",
        category: "teaching",
        image: "/pp/1.png",
        bio: "Dr. Priya Patel specializes in biomedical instrumentation and medical device design. She has extensive experience in developing diagnostic systems and prosthetics.",
        specialization: "Biomedical Instrumentation, Medical Device Design, Prosthetics",
        courses: [
            { id: "course-004", name: "Biomedical Instrumentation I", code: "BME601", program: "BE in Biomedical Engineering", semester: "Semester VI" },
            { id: "course-005", name: "Medical Electronics", code: "BME602", program: "BE in Biomedical Engineering", semester: "Semester VI" },
            { id: "course-006", name: "Implantable Devices", code: "BME501", program: "BE in Biomedical Engineering", semester: "Semester V" }
        ],
        education: [
            { degree: "Ph.D.", field: "Biomedical Engineering", institution: "Johns Hopkins University", year: "2012", country: "USA" },
            { degree: "M.S.", field: "Biomedical Engineering", institution: "University of California, Berkeley", year: "2008", country: "USA" },
            { degree: "B.E.", field: "Electronics Engineering", institution: "Purbanchal University", year: "2006", country: "Nepal" }
        ],
        experience: [
            { position: "Associate Professor", organization: "NIET", duration: "2018 - Present" },
            { position: "Assistant Professor", organization: "NIET", duration: "2013 - 2018" },
            { position: "Research Engineer", organization: "Medtronic", duration: "2012 - 2013" }
        ],
        publications: [
            { title: "Low-Cost Prosthetic Hand Design", type: "journal", venue: "IEEE Transactions on Biomedical Engineering", year: "2023" },
            { title: "Wearable Health Monitoring Systems", type: "conference", venue: "EMBC 2022", year: "2022" }
        ],
        researchInterests: [
            { area: "Prosthetics and Orthotics", description: "Design and development of assistive devices" },
            { area: "Medical Instrumentation", description: "Diagnostic and monitoring equipment" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX",
            office: "Block B, Room 205"
        },
        joiningDate: "2013-06-01",
        isActive: true,
        order: 2
    },
    {
        id: "faculty-003",
        slug: "amit-kumar",
        firstName: "Amit",
        lastName: "Kumar",
        title: "Mr.",
        designation: "Assistant Professor",
        department: "Computer Engineering",
        facultyType: "full-time",
        category: "teaching",
        image: "/pp/1.png",
        bio: "Amit Kumar is an expert in embedded systems, IoT, and network security. He brings industry experience from leading tech companies.",
        specialization: "Embedded Systems, IoT, Network Security, Cloud Computing",
        courses: [
            { id: "course-007", name: "Embedded Systems & Image Processing", code: "CS503", program: "B. Tech in AI", semester: "Semester V" },
            { id: "course-008", name: "Computer Networks", code: "CS401", program: "B. Tech in AI", semester: "Semester IV" },
            { id: "course-009", name: "Embedded and IoT System", code: "CE601", program: "BE in Computer Engineering", semester: "Semester VI" }
        ],
        education: [
            { degree: "M.Tech", field: "Computer Engineering", institution: "IIT Delhi", year: "2015", country: "India" },
            { degree: "B.E.", field: "Computer Engineering", institution: "Purbanchal University", year: "2013", country: "Nepal" }
        ],
        experience: [
            { position: "Assistant Professor", organization: "NIET", duration: "2017 - Present" },
            { position: "Senior Software Engineer", organization: "Tech Solutions Pvt. Ltd.", duration: "2015 - 2017" }
        ],
        researchInterests: [
            { area: "IoT Systems", description: "Smart city applications and sensor networks" },
            { area: "Cybersecurity", description: "Network security and cryptography" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX",
            office: "Block A, Room 208"
        },
        joiningDate: "2017-08-15",
        isActive: true,
        order: 3
    },
    // Part-time Faculty
    {
        id: "faculty-004",
        slug: "dr-sanjay-thapa",
        firstName: "Sanjay",
        lastName: "Thapa",
        title: "Dr.",
        designation: "Visiting Professor",
        department: "Biomedical Engineering",
        facultyType: "part-time",
        category: "teaching",
        image: "/pp/1.png",
        bio: "Dr. Sanjay Thapa is a practicing physician and researcher who brings clinical perspective to biomedical engineering education.",
        specialization: "Clinical Engineering, Medical Imaging, Healthcare Technology",
        courses: [
            { id: "course-010", name: "Medical Imaging II", code: "BME701", program: "BE in Biomedical Engineering", semester: "Semester VII" },
            { id: "course-011", name: "Clinical Engineering", code: "BME702", program: "BE in Biomedical Engineering", semester: "Semester VII" }
        ],
        education: [
            { degree: "M.D.", field: "Radiology", institution: "Tribhuvan University Teaching Hospital", year: "2010", country: "Nepal" },
            { degree: "M.B.B.S.", field: "Medicine", institution: "Tribhuvan University", year: "2005", country: "Nepal" }
        ],
        experience: [
            { position: "Chief Radiologist", organization: "Kathmandu Medical College", duration: "2015 - Present" },
            { position: "Visiting Professor", organization: "NIET", duration: "2018 - Present" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX"
        },
        joiningDate: "2018-01-10",
        isActive: true,
        order: 4
    },
    // Visiting Faculty
    {
        id: "faculty-005",
        slug: "prof-sarah-johnson",
        firstName: "Sarah",
        lastName: "Johnson",
        title: "Prof.",
        designation: "Visiting Professor",
        department: "Artificial Intelligence",
        facultyType: "visiting",
        category: "teaching",
        image: "/pp/1.png",
        bio: "Professor Sarah Johnson is an internationally recognized expert in natural language processing and large language models.",
        specialization: "Natural Language Processing, Large Language Models, Generative AI",
        courses: [
            { id: "course-012", name: "Natural Language Processing", code: "CS602", program: "B. Tech in AI", semester: "Semester VI" },
            { id: "course-013", name: "Generative AI and Large Language Models", code: "CS701", program: "B. Tech in AI", semester: "Semester VII" }
        ],
        education: [
            { degree: "Ph.D.", field: "Computer Science", institution: "Carnegie Mellon University", year: "2008", country: "USA" },
            { degree: "M.S.", field: "Computer Science", institution: "Stanford University", year: "2004", country: "USA" }
        ],
        experience: [
            { position: "Professor", organization: "MIT", duration: "2015 - Present" },
            { position: "Visiting Professor", organization: "NIET", duration: "2023 - Present" },
            { position: "Research Scientist", organization: "OpenAI", duration: "2010 - 2015" }
        ],
        publications: [
            { title: "Transformer Architectures for Low-Resource Languages", type: "journal", venue: "Journal of Machine Learning Research", year: "2023" }
        ],
        researchInterests: [
            { area: "NLP for Low-Resource Languages", description: "Developing NLP solutions for languages with limited data" }
        ],
        contact: {
            email: "info@niet.edu.np",
            website: "sarahjohnson.ai"
        },
        joiningDate: "2023-09-01",
        isActive: true,
        order: 5
    },
    // Non-teaching Staff (Administrative)
    {
        id: "staff-001",
        slug: "ramesh-adhikari",
        firstName: "Ramesh",
        lastName: "Adhikari",
        title: "Mr.",
        designation: "Registrar",
        department: "Administration",
        facultyType: "full-time",
        category: "administrative",
        image: "/pp/1.png",
        bio: "Ramesh Adhikari oversees academic administration, student records, and institutional compliance. He has been with NIET since its inception.",
        courses: [], // Non-teaching staff may not teach
        education: [
            { degree: "M.B.A.", field: "Business Administration", institution: "Tribhuvan University", year: "2005", country: "Nepal" },
            { degree: "B.A.", field: "Management", institution: "Tribhuvan University", year: "2003", country: "Nepal" }
        ],
        experience: [
            { position: "Registrar", organization: "NIET", duration: "2010 - Present" },
            { position: "Deputy Registrar", organization: "NIET", duration: "2005 - 2010" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX",
            office: "Administration Block, Room 101"
        },
        leadershipRole: "Registrar",
        joiningDate: "2005-01-15",
        isActive: true,
        order: 6
    },
    // Support Staff
    {
        id: "staff-002",
        slug: "sita-gurung",
        firstName: "Sita",
        lastName: "Gurung",
        title: "Ms.",
        designation: "Lab Technician",
        department: "Biomedical Engineering",
        facultyType: "full-time",
        category: "support",
        image: "/pp/1.png",
        bio: "Sita Gurung manages the biomedical engineering laboratories, ensuring all equipment is properly maintained and students have access to necessary resources.",
        courses: [],
        education: [
            { degree: "Diploma", field: "Medical Laboratory Technology", institution: "CTEVT", year: "2015", country: "Nepal" }
        ],
        experience: [
            { position: "Lab Technician", organization: "NIET", duration: "2016 - Present" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX",
            office: "Biomedical Lab, Block B"
        },
        joiningDate: "2016-03-01",
        isActive: true,
        order: 7
    },
    // Additional Full-time Faculty
    {
        id: "faculty-006",
        slug: "dr-meera-shrestha",
        firstName: "Meera",
        lastName: "Shrestha",
        title: "Dr.",
        designation: "Assistant Professor",
        department: "Computer Engineering",
        facultyType: "full-time",
        category: "teaching",
        image: "/pp/1.png",
        bio: "Dr. Meera Shrestha specializes in database systems, data science, and big data analytics. She is passionate about making data science accessible to students.",
        specialization: "Database Systems, Data Science, Big Data Analytics",
        courses: [
            { id: "course-014", name: "Database Management System", code: "CS301", program: "B. Tech in AI", semester: "Semester III" },
            { id: "course-015", name: "Introduction to Data Science", code: "CS402", program: "B. Tech in AI", semester: "Semester IV" },
            { id: "course-016", name: "Data Warehousing & Mining", code: "CS504", program: "B. Tech in AI", semester: "Semester V" }
        ],
        education: [
            { degree: "Ph.D.", field: "Computer Science", institution: "University of Washington", year: "2018", country: "USA" },
            { degree: "M.S.", field: "Data Science", institution: "University of California, San Diego", year: "2014", country: "USA" },
            { degree: "B.E.", field: "Computer Engineering", institution: "Purbanchal University", year: "2012", country: "Nepal" }
        ],
        experience: [
            { position: "Assistant Professor", organization: "NIET", duration: "2019 - Present" },
            { position: "Data Scientist", organization: "Amazon", duration: "2018 - 2019" }
        ],
        researchInterests: [
            { area: "Big Data Analytics", description: "Scalable data processing and analysis" },
            { area: "Data Mining", description: "Pattern recognition and knowledge discovery" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX",
            office: "Block A, Room 212"
        },
        joiningDate: "2019-07-01",
        isActive: true,
        order: 8
    },
    {
        id: "faculty-007",
        slug: "niraj-basnet",
        firstName: "Niraj",
        lastName: "Basnet",
        title: "Mr.",
        designation: "Lecturer",
        department: "Computer Engineering",
        facultyType: "full-time",
        category: "teaching",
        image: "/pp/1.png",
        bio: "Niraj Basnet is a dedicated educator focusing on programming fundamentals and software engineering. He has a strong background in industry software development.",
        specialization: "Programming, Software Engineering, Web Development",
        courses: [
            { id: "course-017", name: "Introduction to Programming", code: "CS101", program: "B. Tech in AI", semester: "Semester I" },
            { id: "course-018", name: "Object Oriented Programming", code: "CS102", program: "B. Tech in AI", semester: "Semester II" },
            { id: "course-019", name: "Object Oriented Software Engineering", code: "CS603", program: "B. Tech in AI", semester: "Semester VI" }
        ],
        education: [
            { degree: "M.Tech", field: "Software Engineering", institution: "Purbanchal University", year: "2016", country: "Nepal" },
            { degree: "B.E.", field: "Computer Engineering", institution: "Purbanchal University", year: "2014", country: "Nepal" }
        ],
        experience: [
            { position: "Lecturer", organization: "NIET", duration: "2017 - Present" },
            { position: "Software Developer", organization: "Tech Innovations Pvt. Ltd.", duration: "2014 - 2017" }
        ],
        contact: {
            email: "info@niet.edu.np",
            phone: "+977-1-XXXXXXX",
            office: "Block A, Room 105"
        },
        joiningDate: "2017-02-01",
        isActive: true,
        order: 9
    }
];

// Standardize public-facing email for launch (single inbox).
export const faculty: FacultyMember[] = facultyRaw.map((f) => ({
    ...f,
    contact: {
        ...f.contact,
        email: "info@niet.edu.np",
    },
}));

// Helper functions
export function getFacultyBySlug(slug: string): FacultyMember | undefined {
    return faculty.find(f => f.slug === slug);
}

export function getAllFaculty(): FacultyMember[] {
    return faculty.filter(f => f.isActive);
}

export function getFacultyByType(type: FacultyType): FacultyMember[] {
    return faculty.filter(f => f.facultyType === type && f.isActive);
}

export function getFacultyByCategory(category: StaffCategory): FacultyMember[] {
    return faculty.filter(f => f.category === category && f.isActive);
}

export function getFacultyByDepartment(department: string): FacultyMember[] {
    return faculty.filter(f => f.department === department && f.isActive);
}

export function getTeachingFaculty(): FacultyMember[] {
    return faculty.filter(f => f.category === "teaching" && f.isActive);
}

export function getBoardMembers(): FacultyMember[] {
    return faculty.filter(f => f.category === "board-member" && f.isActive);
}

export function getNonTeachingStaff(): FacultyMember[] {
    return faculty.filter(f => (f.category === "non-teaching" || f.category === "administrative" || f.category === "support") && f.isActive);
}

