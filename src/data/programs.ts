import { Brain, HeartPulse, Cpu } from "lucide-react";

export interface ProgramModule {
    name: string;
    credits: number;
    description: string;
}

export interface ProgramSemester {
    semester: string;
    modules: ProgramModule[];
}

export interface ProgramYear {
    year: string;
    semesters: ProgramSemester[];
}

export interface FeeStructure {
    year: string;
    admissionFee: number;
    annualFee: number;
    ccaFee: number;
    semester1Fee: number;
    semester2Fee: number;
    universityRegFee: number;
    total: number;
    grandTotal: number;
}

export interface Program {
    id: string;
    slug: string;
    icon: typeof Brain;
    title: string;
    degree: string;
    duration: string;
    credit: string;
    intake: string;
    overview: string;
    description: string;
    image: string;
    studentImage?: string;
    studentName?: string;
    gradient: string;
    coreCourses: string[];
    electives: string[];
    careerOutcomes: string[];
    facilities: string[];
    modules: ProgramYear[];
    feeStructure: FeeStructure[];
    admissionEligibility: string;
    specializations?: string[];
    youWill: string[];
    degreeHighlights: string[];
    whyUniversity?: string;
}

export const programs: Program[] = [
    {
        id: "btech-ai",
        slug: "btech-artificial-intelligence",
        icon: Brain,
        title: "BTech in Artificial Intelligence (AI)",
        degree: "BTech",
        duration: "4 Years",
        credit: "160",
        intake: "Autumn",
        overview: "Our BTech in Artificial Intelligence program focuses on machine learning, deep learning, natural language processing, and ethical AI. Students master cutting-edge AI technologies including neural networks, computer vision, and generative AI systems.",
        description: "BTech in Artificial Intelligence course integrates foundational computer science and AI expertise, emphasizing computational thinking, programming, and advanced AI techniques for a versatile skill set in technology.",
        image: "/AILab.png",
        gradient: "from-violet-500 via-purple-500 to-indigo-500",
        coreCourses: [
            "Neural Networks and Deep Learning",
            "Data Science and Analytics",
            "AI Ethics and Responsible AI",
            "Natural Language Processing",
            "Computer Vision",
            "Reinforcement Learning",
            "Machine Learning Algorithms",
            "AI System Design"
        ],
        electives: [
            "Generative AI and Large Language Models",
            "Robotics and Autonomous Systems",
            "AI for Healthcare",
            "Edge AI and IoT Integration"
        ],
        careerOutcomes: [
            "AI Engineer",
            "Data Scientist",
            "Machine Learning Engineer",
            "Robotics Specialist",
            "AI Research Scientist",
            "Computer Vision Engineer"
        ],
        facilities: [
            "AI Research Lab with GPU Clusters",
            "TensorFlow and PyTorch Development Environment",
            "Robotics Lab",
            "High-Performance Computing Infrastructure"
        ],
        admissionEligibility: "Minimum 2.4 GPA in 10+2 level or 3.5 Credit in A level (Science / Management / Humanitas)",
        youWill: [
            "Explore AI, machine learning, parallel programming, and data science",
            "Master practical and theoretical knowledge for innovative solutions",
            "Gain industry-relevant experience"
        ],
        degreeHighlights: [
            "Programming proficiency in various languages",
            "Focus on data science with large datasets",
            "Development of innovative apps",
            "Career-ready with a holistic skill set"
        ],
        modules: [
            {
                year: "YEAR ONE",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Programming Concepts and Algorithms",
                                credits: 20,
                                description: "Introduction to fundamental programming concepts, data structures, and algorithmic thinking."
                            },
                            {
                                name: "Mathematical Skills for Computing Professionals",
                                credits: 20,
                                description: "Essential mathematics for computing including linear algebra, calculus, and statistics."
                            },
                            {
                                name: "Computer Systems",
                                credits: 20,
                                description: "Understanding computer architecture, operating systems, and system-level programming."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Programming Professional Practice",
                                credits: 20,
                                description: "Advanced programming practices, software engineering principles, and professional development."
                            },
                            {
                                name: "Working with Data",
                                credits: 20,
                                description: "Data manipulation, analysis, and visualization techniques."
                            },
                            {
                                name: "Integration Project",
                                credits: 20,
                                description: "Capstone project integrating knowledge from all first-year modules."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR TWO",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Machine Learning Fundamentals",
                                credits: 20,
                                description: "Introduction to machine learning algorithms and techniques."
                            },
                            {
                                name: "Data Structures and Algorithms",
                                credits: 20,
                                description: "Advanced data structures and algorithm design and analysis."
                            },
                            {
                                name: "Database Systems",
                                credits: 20,
                                description: "Database design, SQL, and database management systems."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Deep Learning",
                                credits: 20,
                                description: "Neural networks, deep learning architectures, and applications."
                            },
                            {
                                name: "Natural Language Processing",
                                credits: 20,
                                description: "Text processing, language models, and NLP applications."
                            },
                            {
                                name: "AI Project",
                                credits: 20,
                                description: "Practical AI project applying learned concepts."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR THREE",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Advanced AI Topics",
                                credits: 20,
                                description: "Cutting-edge AI research and advanced topics."
                            },
                            {
                                name: "Computer Vision",
                                credits: 20,
                                description: "Image processing, computer vision algorithms, and applications."
                            },
                            {
                                name: "AI Ethics and Society",
                                credits: 20,
                                description: "Ethical considerations in AI development and deployment."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Final Year Project",
                                credits: 40,
                                description: "Comprehensive final year project demonstrating mastery of AI concepts."
                            },
                            {
                                name: "Professional Practice",
                                credits: 20,
                                description: "Industry placement and professional development."
                            }
                        ]
                    }
                ]
            }
        ],
        feeStructure: [
            {
                year: "1st Year",
                admissionFee: 40000,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 670000,
                grandTotal: 670000
            },
            {
                year: "2nd Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            },
            {
                year: "3rd Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            },
            {
                year: "4th Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            }
        ],
        whyUniversity: "Our university is committed to providing an exceptional student experience with industry-relevant curriculum and comprehensive support for student success. Our programs are regularly reviewed to ensure they meet the highest standards and prepare students for successful careers."
    },
    {
        id: "be-bme",
        slug: "be-biomedical-engineering",
        icon: HeartPulse,
        title: "BE in Biomedical Engineering",
        degree: "BE",
        duration: "4 Years",
        credit: "160",
        intake: "Autumn",
        overview: "Our BE in Biomedical Engineering program blends engineering principles with healthcare applications. Students learn to design medical devices, develop diagnostic systems, and work on cutting-edge projects in bioinformatics, tissue engineering, and medical imaging.",
        description: "BE in Biomedical Engineering course integrates engineering principles with healthcare applications, emphasizing medical device design, diagnostic systems, and innovative solutions for healthcare challenges.",
        image: "/BiomedicalLab.jpg",
        gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
        coreCourses: [
            "Biomechanics",
            "Medical Imaging Systems",
            "Biomaterials and Tissue Engineering",
            "Bioinstrumentation",
            "Biomedical Signal Processing",
            "Medical Device Design",
            "Biomedical Electronics",
            "Clinical Engineering"
        ],
        electives: [
            "Prosthetics and Orthotics",
            "Biomedical Informatics",
            "Regenerative Medicine",
            "Healthcare Technology Management"
        ],
        careerOutcomes: [
            "Biomedical Device Designer",
            "Clinical Engineer",
            "Biotech Researcher",
            "Medical Equipment Specialist",
            "Healthcare Technology Consultant",
            "Regulatory Affairs Specialist"
        ],
        facilities: [
            "Prosthetics and Orthotics Lab",
            "Medical Imaging Lab",
            "Bioinstrumentation Lab",
            "Biomedical Device Prototyping Center"
        ],
        admissionEligibility: "Minimum 2.4 GPA in 10+2 level or 3.5 Credit in A level (Science / Management / Humanitas)",
        youWill: [
            "Design and develop medical devices and diagnostic systems",
            "Master biomedical signal processing and medical imaging",
            "Gain hands-on experience in clinical settings"
        ],
        degreeHighlights: [
            "Hands-on experience with medical devices",
            "Interdisciplinary approach combining engineering and healthcare",
            "Industry partnerships with healthcare institutions",
            "Career-ready with practical skills"
        ],
        modules: [
            {
                year: "YEAR ONE",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Introduction to Biomedical Engineering",
                                credits: 20,
                                description: "Fundamentals of biomedical engineering and its applications in healthcare."
                            },
                            {
                                name: "Human Anatomy and Physiology",
                                credits: 20,
                                description: "Understanding the human body systems and their functions."
                            },
                            {
                                name: "Engineering Mathematics",
                                credits: 20,
                                description: "Mathematical foundations for biomedical engineering applications."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Biomechanics",
                                credits: 20,
                                description: "Mechanics of biological systems and movement analysis."
                            },
                            {
                                name: "Biomedical Instrumentation",
                                credits: 20,
                                description: "Principles and design of medical instruments and devices."
                            },
                            {
                                name: "Biomedical Project",
                                credits: 20,
                                description: "Practical project applying biomedical engineering principles."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR TWO",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Medical Imaging Systems",
                                credits: 20,
                                description: "Medical imaging technologies including X-ray, MRI, and ultrasound."
                            },
                            {
                                name: "Biomedical Signal Processing",
                                credits: 20,
                                description: "Processing and analysis of biomedical signals."
                            },
                            {
                                name: "Biomaterials",
                                credits: 20,
                                description: "Materials used in biomedical applications and their properties."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Medical Device Design",
                                credits: 20,
                                description: "Design principles and development of medical devices."
                            },
                            {
                                name: "Tissue Engineering",
                                credits: 20,
                                description: "Engineering approaches to tissue regeneration and replacement."
                            },
                            {
                                name: "Clinical Engineering",
                                credits: 20,
                                description: "Management and maintenance of medical equipment in clinical settings."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR THREE",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Advanced Biomedical Systems",
                                credits: 20,
                                description: "Advanced topics in biomedical engineering systems."
                            },
                            {
                                name: "Regulatory Affairs",
                                credits: 20,
                                description: "Regulatory requirements for medical devices and healthcare products."
                            },
                            {
                                name: "Biomedical Research Methods",
                                credits: 20,
                                description: "Research methodologies in biomedical engineering."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Final Year Project",
                                credits: 40,
                                description: "Comprehensive final year project in biomedical engineering."
                            },
                            {
                                name: "Professional Practice",
                                credits: 20,
                                description: "Industry placement and professional development."
                            }
                        ]
                    }
                ]
            }
        ],
        feeStructure: [
            {
                year: "1st Year",
                admissionFee: 40000,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 670000,
                grandTotal: 670000
            },
            {
                year: "2nd Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            },
            {
                year: "3rd Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            },
            {
                year: "4th Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            }
        ],
        whyUniversity: "Our university is committed to providing an exceptional student experience with industry-relevant curriculum and comprehensive support for student success. Our programs are regularly reviewed to ensure they meet the highest standards and prepare students for successful careers."
    },
    {
        id: "be-computer",
        slug: "be-computer-engineering",
        icon: Cpu,
        title: "BE in Computer Engineering",
        degree: "BE",
        duration: "4 Years",
        credit: "160",
        intake: "Autumn",
        overview: "Our BE in Computer Engineering program covers hardware-software integration, embedded systems, and cybersecurity. Students master computer architecture, operating systems, VLSI design, and network systems to build the digital infrastructure of tomorrow.",
        description: "BE in Computer Engineering course integrates hardware and software systems, emphasizing computer architecture, embedded systems, and network security for building robust digital infrastructure.",
        image: "/Lab.jpeg",
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        coreCourses: [
            "Computer Architecture",
            "Operating Systems",
            "VLSI Design",
            "Embedded Systems",
            "Network Security",
            "Digital Signal Processing",
            "Microprocessors and Microcontrollers",
            "System Design and Integration"
        ],
        electives: [
            "IoT and Edge Computing",
            "Quantum Computing Fundamentals",
            "Cybersecurity and Cryptography",
            "Cloud Computing Architecture"
        ],
        careerOutcomes: [
            "Systems Engineer",
            "Chip Designer",
            "Network Architect",
            "Embedded Systems Engineer",
            "Hardware Engineer",
            "Cybersecurity Specialist"
        ],
        facilities: [
            "Computer Architecture Lab",
            "FPGA Development Boards",
            "Network Security Lab",
            "Industry-Standard Software Tools"
        ],
        admissionEligibility: "Minimum 2.4 GPA in 10+2 level or 3.5 Credit in A level (Science / Management / Humanitas)",
        youWill: [
            "Master computer architecture and system design",
            "Develop expertise in embedded systems and cybersecurity",
            "Gain practical experience with industry-standard tools"
        ],
        degreeHighlights: [
            "Comprehensive hardware-software integration",
            "Hands-on experience with modern computing systems",
            "Industry partnerships and internship opportunities",
            "Career-ready with versatile skill set"
        ],
        modules: [
            {
                year: "YEAR ONE",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Introduction to Computer Engineering",
                                credits: 20,
                                description: "Fundamentals of computer engineering and digital systems."
                            },
                            {
                                name: "Programming Fundamentals",
                                credits: 20,
                                description: "Core programming concepts and software development practices."
                            },
                            {
                                name: "Digital Logic Design",
                                credits: 20,
                                description: "Design and analysis of digital circuits and logic systems."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Data Structures and Algorithms",
                                credits: 20,
                                description: "Advanced data structures and algorithm design."
                            },
                            {
                                name: "Computer Organization",
                                credits: 20,
                                description: "Computer architecture and organization principles."
                            },
                            {
                                name: "Engineering Project",
                                credits: 20,
                                description: "Practical project integrating first-year concepts."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR TWO",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Operating Systems",
                                credits: 20,
                                description: "Operating system design, implementation, and management."
                            },
                            {
                                name: "Microprocessors and Microcontrollers",
                                credits: 20,
                                description: "Microprocessor architecture and embedded system programming."
                            },
                            {
                                name: "Network Systems",
                                credits: 20,
                                description: "Computer networks, protocols, and network design."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Embedded Systems",
                                credits: 20,
                                description: "Design and development of embedded systems."
                            },
                            {
                                name: "VLSI Design",
                                credits: 20,
                                description: "Very Large Scale Integration circuit design."
                            },
                            {
                                name: "System Integration Project",
                                credits: 20,
                                description: "Project integrating hardware and software systems."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR THREE",
                semesters: [
                    {
                        semester: "SEMESTER 1",
                        modules: [
                            {
                                name: "Advanced Computer Architecture",
                                credits: 20,
                                description: "Advanced topics in computer architecture and design."
                            },
                            {
                                name: "Cybersecurity",
                                credits: 20,
                                description: "Network security, cryptography, and secure system design."
                            },
                            {
                                name: "Distributed Systems",
                                credits: 20,
                                description: "Design and implementation of distributed computing systems."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER 2",
                        modules: [
                            {
                                name: "Final Year Project",
                                credits: 40,
                                description: "Comprehensive final year project in computer engineering."
                            },
                            {
                                name: "Professional Practice",
                                credits: 20,
                                description: "Industry placement and professional development."
                            }
                        ]
                    }
                ]
            }
        ],
        feeStructure: [
            {
                year: "1st Year",
                admissionFee: 40000,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 670000,
                grandTotal: 670000
            },
            {
                year: "2nd Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            },
            {
                year: "3rd Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            },
            {
                year: "4th Year",
                admissionFee: 0,
                annualFee: 25000,
                ccaFee: 5000,
                semester1Fee: 300000,
                semester2Fee: 300000,
                universityRegFee: 0,
                total: 630000,
                grandTotal: 630000
            }
        ],
        whyUniversity: "Our university is committed to providing an exceptional student experience with industry-relevant curriculum and comprehensive support for student success. Our programs are regularly reviewed to ensure they meet the highest standards and prepare students for successful careers."
    }
];

export function getProgramBySlug(slug: string): Program | undefined {
    return programs.find(p => p.slug === slug);
}

export function getAllPrograms(): Program[] {
    return programs;
}

