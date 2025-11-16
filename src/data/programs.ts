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
    whyProgram?: string[];
    discountInfo?: {
        admissionFeeWaiver?: boolean;
        semesterFeeDiscount?: number; // percentage
        note?: string;
    };
}

export const programs: Program[] = [
    {
        id: "btech-ai",
        slug: "btech-artificial-intelligence",
        icon: Brain,
        title: "B. Tech in Artificial Intelligence",
        degree: "B. Tech",
        duration: "4 Years",
        credit: "160",
        intake: "2025/2026 (48 Seats)",
        overview: "The Bachelor of Technology in Artificial Intelligence integrates computer science, mathematics, and data science to develop problem-solving skills and build intelligent systems for real-world applications.",
        description: "The Bachelor of Technology in Artificial Intelligence integrates computer science, mathematics, and data science to develop problem-solving skills and build intelligent systems for real-world applications.",
        image: "/AILab.png",
        gradient: "from-violet-500 via-purple-500 to-indigo-500",
        whyProgram: [
            "Create & Empower the Global Tech Industry Leaders",
            "Employer-focused Program",
            "Build & Train AI Models",
            "Analyze Large Datasets",
            "Develop Intelligent Applications",
            "Become a Computer Vision Engineer (and more)"
        ],
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
        admissionEligibility: "Minimum 2.4 GPA in 10+2 level or 3.5 Credit in A level (Science / Management / Humanities)",
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
                        semester: "SEMESTER I",
                        modules: [
                            {
                                name: "Introduction to Programming",
                                credits: 3,
                                description: "Fundamental programming concepts and problem-solving techniques using modern programming languages."
                            },
                            {
                                name: "Digital Logic",
                                credits: 3,
                                description: "Digital circuits, logic gates, Boolean algebra, and combinational/sequential logic design."
                            },
                            {
                                name: "Calculus",
                                credits: 3,
                                description: "Differential and integral calculus for engineering applications, limits, derivatives, and integrals."
                            },
                            {
                                name: "Introduction to Artificial Intelligence",
                                credits: 3,
                                description: "Overview of AI concepts, history, applications, and fundamental AI problem-solving approaches."
                            },
                            {
                                name: "Technical Report Writing & Presentation",
                                credits: 2,
                                description: "Technical communication skills, report writing, and effective presentation techniques for engineers."
                            },
                            {
                                name: "Society & Professional Ethics",
                                credits: 2,
                                description: "Ethical considerations in technology, professional practice, and social responsibility of engineers."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER II",
                        modules: [
                            {
                                name: "Object Oriented Programming",
                                credits: 3,
                                description: "Object-oriented programming principles, classes, inheritance, polymorphism, and design patterns."
                            },
                            {
                                name: "Artificial Intelligence & Intelligent Systems",
                                credits: 3,
                                description: "Advanced AI concepts, intelligent system design, knowledge representation, and reasoning."
                            },
                            {
                                name: "Microprocessor & Assembly Language",
                                credits: 3,
                                description: "Microprocessor architecture, assembly language programming, and low-level system programming."
                            },
                            {
                                name: "Linear Algebra & Statistics",
                                credits: 3,
                                description: "Vector spaces, matrices, linear transformations, and statistical methods for data analysis."
                            },
                            {
                                name: "Project I",
                                credits: 2,
                                description: "First-year project integrating programming and AI concepts with practical implementation."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR TWO",
                semesters: [
                    {
                        semester: "SEMESTER III",
                        modules: [
                            {
                                name: "Database Management System",
                                credits: 3,
                                description: "Database design principles, Entity-Relationship modeling, SQL programming, normalization techniques, transaction management, concurrency control, database security, and administration. Covers relational database systems, query optimization, and database applications in AI systems."
                            },
                            {
                                name: "Data Structure & Algorithm",
                                credits: 3,
                                description: "Advanced data structures including stacks, queues, trees, graphs, hash tables, and heaps. Algorithm design paradigms, time and space complexity analysis, sorting and searching algorithms, and efficient problem-solving techniques for AI applications."
                            },
                            {
                                name: "Computer Organization",
                                credits: 3,
                                description: "Computer architecture fundamentals, CPU design and organization, instruction set architecture, memory hierarchy, cache memory, I/O systems, and performance optimization. Understanding hardware-software interface for AI system development."
                            },
                            {
                                name: "Discrete Structure",
                                credits: 3,
                                description: "Discrete mathematics including sets, relations, functions, propositional and predicate logic, graph theory, trees, combinatorics, recurrence relations, and mathematical reasoning. Essential mathematical foundation for AI and computer science."
                            },
                            {
                                name: "Differential Equations",
                                credits: 3,
                                description: "Ordinary differential equations (ODEs), partial differential equations (PDEs), first-order and higher-order differential equations, linear and nonlinear systems, numerical methods for solving differential equations, and their applications in modeling AI systems and dynamic processes."
                            },
                            {
                                name: "Project",
                                credits: 2,
                                description: "Second-year project integrating database systems, data structures, and computer organization concepts. Students develop a complete software system demonstrating practical application of learned concepts with proper documentation and presentation."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER IV",
                        modules: [
                            {
                                name: "Numerical Methods",
                                credits: 3,
                                description: "Numerical techniques for solving mathematical problems including root finding, interpolation, numerical differentiation and integration, solution of linear and nonlinear systems, numerical solution of differential equations, error analysis, and computational methods for AI applications."
                            },
                            {
                                name: "Computer Networks",
                                credits: 3,
                                description: "Network architecture and protocols, OSI and TCP/IP models, physical and data link layers, network layer and routing, transport layer protocols, application layer protocols, network security fundamentals, and distributed systems for AI applications."
                            },
                            {
                                name: "Design & Analysis of Algorithms",
                                credits: 3,
                                description: "Algorithm design techniques including divide-and-conquer, dynamic programming, greedy algorithms, backtracking, and branch-and-bound. Advanced topics in algorithm analysis, NP-completeness, approximation algorithms, and algorithm optimization for AI problems."
                            },
                            {
                                name: "Introduction to Data Science",
                                credits: 3,
                                description: "Data science fundamentals including data collection, cleaning, and preprocessing, exploratory data analysis, statistical analysis, data visualization techniques, introduction to machine learning workflows, and hands-on practice with data science tools and libraries."
                            },
                            {
                                name: "Project II",
                                credits: 2,
                                description: "Project focusing on AI, data science, and network applications. Students work on real-world problems applying data science techniques, network programming, and algorithm design to develop practical solutions with comprehensive documentation."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR THREE",
                semesters: [
                    {
                        semester: "SEMESTER V",
                        modules: [
                            {
                                name: "Machine Learning",
                                credits: 3,
                                description: "Comprehensive machine learning covering supervised learning (regression, classification), unsupervised learning (clustering, dimensionality reduction), model evaluation and validation, cross-validation, bias-variance tradeoff, regularization, ensemble methods, and practical implementation of ML algorithms using modern frameworks."
                            },
                            {
                                name: "Optimization Techniques",
                                credits: 3,
                                description: "Optimization methods for machine learning including gradient descent variants, stochastic gradient descent, convex optimization, constrained optimization, metaheuristics (genetic algorithms, particle swarm optimization), hyperparameter tuning, and optimization for neural networks and deep learning models."
                            },
                            {
                                name: "Embedded Systems & Image Processing",
                                credits: 3,
                                description: "Embedded system design principles, real-time processing, microcontroller programming, image acquisition, image enhancement, filtering, edge detection, feature extraction, image segmentation, morphological operations, and applications in AI systems and IoT devices."
                            },
                            {
                                name: "Data Warehousing & Mining",
                                credits: 3,
                                description: "Data warehouse architecture and design, ETL (Extract, Transform, Load) processes, OLAP and OLTP systems, data mining techniques including association rules, classification, clustering, and knowledge discovery. Practical applications in business intelligence and AI systems."
                            },
                            {
                                name: "Project III",
                                credits: 2,
                                description: "Third-year project applying machine learning, optimization techniques, and data mining concepts. Students develop a comprehensive AI system integrating multiple technologies with proper evaluation, documentation, and presentation of results."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER VI",
                        modules: [
                            {
                                name: "Object Oriented Software Engineering",
                                credits: 3,
                                description: "Software engineering principles, object-oriented analysis and design, UML modeling, design patterns, software development lifecycle (SDLC), agile methodologies, software testing, quality assurance, project management, and best practices for developing AI software systems."
                            },
                            {
                                name: "Computer Vision",
                                credits: 3,
                                description: "Computer vision algorithms and techniques including image formation, camera models, feature detection and matching, object recognition, image classification, convolutional neural networks, deep learning for vision, video analysis, and applications in autonomous systems and robotics."
                            },
                            {
                                name: "Natural Language Processing",
                                credits: 3,
                                description: "NLP fundamentals including text preprocessing, tokenization, part-of-speech tagging, named entity recognition, language models, word embeddings, sentiment analysis, text classification, machine translation, transformer architectures, and building NLP applications using modern frameworks."
                            },
                            {
                                name: "Research Methods",
                                credits: 3,
                                description: "Research methodologies in AI and engineering, literature review techniques, research design, experimental methods, data collection and analysis, academic writing, paper presentation, research ethics, and preparing research proposals for AI projects."
                            },
                            {
                                name: "Project IV",
                                credits: 2,
                                description: "Project in computer vision and natural language processing applications. Students develop advanced AI systems combining vision and language understanding with comprehensive implementation, testing, and documentation."
                            },
                            {
                                name: "Project V",
                                credits: 2,
                                description: "Advanced project integrating multiple AI technologies including machine learning, computer vision, NLP, and research methodologies. Capstone project demonstrating comprehensive understanding and practical application of AI engineering principles."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR FOUR",
                semesters: [
                    {
                        semester: "SEMESTER VII",
                        modules: [
                            {
                                name: "Internship",
                                credits: 6,
                                description: "Industry internship providing hands-on experience in AI development, real-world applications, and professional work environments. Students work on live projects, gain industry exposure, and develop professional skills in AI engineering."
                            },
                            {
                                name: "Reinforcement Learning",
                                credits: 3,
                                description: "Reinforcement learning fundamentals including Markov Decision Processes (MDPs), value functions, Q-learning, policy gradient methods, actor-critic algorithms, deep reinforcement learning, and applications in game playing, robotics, and autonomous systems."
                            },
                            {
                                name: "Cloud Computing",
                                credits: 3,
                                description: "Cloud computing platforms (AWS, Azure, GCP), cloud services and architectures, containerization (Docker, Kubernetes), serverless computing, distributed systems, and deployment of scalable AI applications on cloud infrastructure with best practices for production systems."
                            },
                            {
                                name: "Project VI",
                                credits: 3,
                                description: "Advanced project integrating reinforcement learning and cloud computing technologies. Students develop and deploy production-ready AI systems on cloud platforms, demonstrating expertise in modern AI engineering practices."
                            },
                            {
                                name: "Elective I: Computer Vision / Image & Video Processing / Surveillance",
                                credits: 3,
                                description: "Advanced computer vision topics including advanced image processing techniques, video analytics, real-time video processing, surveillance systems, object tracking, biometric recognition, and applications in security, healthcare, and autonomous systems."
                            },
                            {
                                name: "Elective II: Mathematics - Introduction to Statistical Learning, Optimization Method, Bayesian Data Analysis / Complex Kernel",
                                credits: 3,
                                description: "Advanced mathematical methods for machine learning including statistical learning theory, advanced optimization techniques, Bayesian inference and data analysis, kernel methods, support vector machines, and mathematical foundations of modern AI algorithms."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER VIII",
                        modules: [
                            {
                                name: "Internship",
                                credits: 6,
                                description: "Extended industry internship for comprehensive practical experience and professional development. Students continue working on advanced AI projects, contribute to production systems, and prepare for career transition into the AI industry."
                            },
                            {
                                name: "Reinforcement Learning",
                                credits: 3,
                                description: "Advanced reinforcement learning concepts including multi-agent systems, hierarchical reinforcement learning, inverse reinforcement learning, transfer learning in RL, and applications in complex AI systems such as autonomous vehicles and intelligent agents."
                            },
                            {
                                name: "Cloud Computing",
                                credits: 3,
                                description: "Advanced cloud computing topics including distributed systems architecture, microservices, cloud-native AI applications, edge computing, hybrid cloud solutions, and building scalable, fault-tolerant AI infrastructure for enterprise applications."
                            },
                            {
                                name: "Project VI",
                                credits: 3,
                                description: "Final year capstone project demonstrating comprehensive AI engineering skills. Students develop a complete, production-ready AI system integrating multiple technologies, with full documentation, testing, deployment, and presentation of their work."
                            },
                            {
                                name: "Elective III: HCI / Common Models / Predictive Analysis",
                                credits: 3,
                                description: "Human-Computer Interaction principles for AI systems, user experience design, common AI models and architectures, predictive analysis techniques, time series forecasting, and building AI systems with focus on usability and business intelligence applications."
                            },
                            {
                                name: "Elective IV: Data Science - Fundamentals of Data Analytics, Data Analysis, Big Data Visualization, Intelligence, Social Media Analytics",
                                credits: 3,
                                description: "Advanced data science topics covering big data analytics frameworks (Hadoop, Spark), advanced data analysis techniques, big data visualization tools, business intelligence, social media analytics, sentiment analysis, and building data-driven AI solutions for enterprise applications."
                            }
                        ]
                    }
                ]
            }
        ],
        feeStructure: [
            {
                year: "1st Year",
                admissionFee: 100000,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 210000,
                semester2Fee: 180000,
                universityRegFee: 20000,
                total: 510000,
                grandTotal: 510000
            },
            {
                year: "2nd Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 180000,
                semester2Fee: 180000,
                universityRegFee: 0,
                total: 360000,
                grandTotal: 360000
            },
            {
                year: "3rd Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 140000,
                semester2Fee: 140000,
                universityRegFee: 0,
                total: 280000,
                grandTotal: 280000
            },
            {
                year: "4th Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 110000,
                semester2Fee: 110000,
                universityRegFee: 0,
                total: 220000,
                grandTotal: 220000
            }
        ],
        discountInfo: {
            admissionFeeWaiver: true,
            semesterFeeDiscount: 30,
            note: "100% waiver in Admission Fee for this Batch"
        },
        whyUniversity: "NIET (National Institute of Engineering and Technology) is committed to providing an exceptional student experience with industry-relevant curriculum and comprehensive support for student success. As an institute affiliated with Purbanchal University, our programs meet rigorous standards and are regularly reviewed to ensure they remain current and relevant to industry needs, preparing students for successful careers."
    },
    {
        id: "be-bme",
        slug: "be-biomedical-engineering",
        icon: HeartPulse,
        title: "BE in Biomedical Engineering",
        degree: "BE",
        duration: "4 Years",
        credit: "160",
        intake: "2025/2026 (144 Seats)",
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
        admissionEligibility: "Minimum 2.4 GPA in 10+2 level or 3.5 Credit in A level (Science / Management / Humanities)",
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
                        semester: "SEMESTER I",
                        modules: [
                            {
                                name: "Mathematics I",
                                credits: 3,
                                description: "Fundamental mathematical concepts including algebra, trigonometry, and calculus foundations."
                            },
                            {
                                name: "Physics",
                                credits: 3,
                                description: "Physics principles relevant to biomedical engineering including mechanics, waves, and optics."
                            },
                            {
                                name: "Basic Electronics Engineering",
                                credits: 3,
                                description: "Introduction to electronic components, circuits, and basic electronic systems."
                            },
                            {
                                name: "Computer Programming",
                                credits: 3,
                                description: "Programming fundamentals and problem-solving using computer languages."
                            },
                            {
                                name: "Engineering Drawing",
                                credits: 2,
                                description: "Technical drawing, CAD basics, and engineering graphics for biomedical device design."
                            },
                            {
                                name: "Basic Electrical Engineering",
                                credits: 3,
                                description: "Fundamentals of electrical circuits, AC/DC systems, and electrical safety."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER II",
                        modules: [
                            {
                                name: "Mathematics II",
                                credits: 3,
                                description: "Advanced calculus, differential equations, and mathematical methods for engineering."
                            },
                            {
                                name: "Chemistry",
                                credits: 3,
                                description: "General and organic chemistry principles relevant to biomedical materials and processes."
                            },
                            {
                                name: "Electric Engineering Materials",
                                credits: 3,
                                description: "Properties and applications of electrical and electronic materials in biomedical devices."
                            },
                            {
                                name: "Communication Engineering",
                                credits: 3,
                                description: "Communication systems, signal transmission, and telecommunication fundamentals."
                            },
                            {
                                name: "Introduction to Biomedical Engineering",
                                credits: 3,
                                description: "Overview of biomedical engineering field, applications, and career opportunities."
                            },
                            {
                                name: "Digital Electronics & Computational System",
                                credits: 3,
                                description: "Digital logic, microprocessors, and computational systems for biomedical applications."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR TWO",
                semesters: [
                    {
                        semester: "SEMESTER III",
                        modules: [
                            {
                                name: "Mathematics III",
                                credits: 3,
                                description: "Advanced mathematics including linear algebra, complex analysis, and numerical methods."
                            },
                            {
                                name: "Bio-Engineering Materials & Components",
                                credits: 3,
                                description: "Biomaterials science, biocompatibility, and materials used in medical devices."
                            },
                            {
                                name: "Fluid Mechanics & Thermodynamics",
                                credits: 3,
                                description: "Fluid dynamics, heat transfer, and thermodynamic principles in biological systems."
                            },
                            {
                                name: "Cell Biology and Immunology",
                                credits: 3,
                                description: "Cellular structure, function, and immune system principles for biomedical applications."
                            },
                            {
                                name: "Microprocessors",
                                credits: 3,
                                description: "Microprocessor architecture, programming, and interfacing for biomedical systems."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER IV",
                        modules: [
                            {
                                name: "Applied Mathematics",
                                credits: 3,
                                description: "Applied mathematical techniques for solving biomedical engineering problems."
                            },
                            {
                                name: "Electronic Devices and Circuits",
                                credits: 3,
                                description: "Semiconductor devices, amplifiers, and electronic circuit design for medical equipment."
                            },
                            {
                                name: "Applied Sociology",
                                credits: 2,
                                description: "Social aspects of healthcare technology, ethics, and healthcare delivery systems."
                            },
                            {
                                name: "Biomedical Embedded System Design",
                                credits: 3,
                                description: "Design and development of embedded systems for biomedical applications."
                            },
                            {
                                name: "Biomedical Embryology",
                                credits: 3,
                                description: "Developmental biology and embryology relevant to biomedical engineering."
                            },
                            {
                                name: "Human Anatomy and Physiology II",
                                credits: 3,
                                description: "Advanced study of human body systems, organ functions, and physiological processes."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR THREE",
                semesters: [
                    {
                        semester: "SEMESTER V",
                        modules: [
                            {
                                name: "Probability and Statistics",
                                credits: 3,
                                description: "Statistical methods, probability theory, and data analysis for biomedical research."
                            },
                            {
                                name: "Numerical Methods",
                                credits: 3,
                                description: "Numerical techniques for solving engineering problems in biomedical applications."
                            },
                            {
                                name: "Implantable Devices",
                                credits: 3,
                                description: "Design, development, and safety of implantable medical devices and prosthetics."
                            },
                            {
                                name: "Control Systems",
                                credits: 3,
                                description: "Control theory, feedback systems, and automation in biomedical devices."
                            },
                            {
                                name: "Tissue Device Interactions",
                                credits: 3,
                                description: "Biocompatibility, tissue-material interactions, and biological responses to medical devices."
                            },
                            {
                                name: "Communication Systems",
                                credits: 3,
                                description: "Advanced communication systems and telemedicine applications in healthcare."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER VI",
                        modules: [
                            {
                                name: "Engineering Economics",
                                credits: 3,
                                description: "Economic analysis, cost-benefit evaluation, and financial planning for medical devices."
                            },
                            {
                                name: "Medical Industry Management III",
                                credits: 3,
                                description: "Healthcare industry management, regulations, and business aspects of medical technology."
                            },
                            {
                                name: "Biomedical Instrumentation I",
                                credits: 3,
                                description: "Principles and design of biomedical instruments for diagnosis and monitoring."
                            },
                            {
                                name: "Medical Electronics",
                                credits: 3,
                                description: "Electronic systems in medical devices, sensors, and medical equipment technology."
                            },
                            {
                                name: "Biomedical Digital Signal Processing",
                                credits: 3,
                                description: "Digital signal processing techniques for analyzing biomedical signals and data."
                            },
                            {
                                name: "Seminar VII",
                                credits: 2,
                                description: "Research seminars, presentations, and academic discussions in biomedical engineering."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR FOUR",
                semesters: [
                    {
                        semester: "SEMESTER VII",
                        modules: [
                            {
                                name: "Organization & Project Management",
                                credits: 3,
                                description: "Project management principles, team organization, and leadership in biomedical projects."
                            },
                            {
                                name: "Biomedical Instrumentation II",
                                credits: 3,
                                description: "Advanced biomedical instrumentation, imaging systems, and diagnostic equipment."
                            },
                            {
                                name: "Medical Imaging II",
                                credits: 3,
                                description: "Advanced medical imaging technologies including MRI, CT, ultrasound, and imaging processing."
                            },
                            {
                                name: "Elective I: Structural & Functional Biomaterials, Medical Equipment",
                                credits: 3,
                                description: "Advanced biomaterials, structural analysis, and medical equipment design and maintenance."
                            },
                            {
                                name: "Elective II: Neural Network Model of Medical Imaging Processing",
                                credits: 3,
                                description: "AI and machine learning applications in medical image processing and analysis."
                            },
                            {
                                name: "Project",
                                credits: 3,
                                description: "Major project work integrating biomedical engineering knowledge and skills."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER VIII",
                        modules: [
                            {
                                name: "Engineering Professional Practice",
                                credits: 3,
                                description: "Professional ethics, regulations, standards, and practice in biomedical engineering."
                            },
                            {
                                name: "Elective III: Hospital Engineering / Telemedicine / Telehealth",
                                credits: 3,
                                description: "Hospital infrastructure, telemedicine systems, and remote healthcare delivery technologies."
                            },
                            {
                                name: "Biomedical Equipment Maintenance Management",
                                credits: 3,
                                description: "Maintenance, calibration, and management of biomedical equipment in healthcare settings."
                            },
                            {
                                name: "Internship",
                                credits: 6,
                                description: "Industry internship providing practical experience in biomedical engineering workplaces."
                            }
                        ]
                    }
                ]
            }
        ],
        feeStructure: [
            {
                year: "1st Year",
                admissionFee: 100000,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 210000,
                semester2Fee: 180000,
                universityRegFee: 20000,
                total: 510000,
                grandTotal: 510000
            },
            {
                year: "2nd Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 180000,
                semester2Fee: 180000,
                universityRegFee: 0,
                total: 360000,
                grandTotal: 360000
            },
            {
                year: "3rd Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 140000,
                semester2Fee: 140000,
                universityRegFee: 0,
                total: 280000,
                grandTotal: 280000
            },
            {
                year: "4th Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 110000,
                semester2Fee: 110000,
                universityRegFee: 0,
                total: 220000,
                grandTotal: 220000
            }
        ],
        whyUniversity: "NIET (National Institute of Engineering and Technology) is committed to providing an exceptional student experience with industry-relevant curriculum and comprehensive support for student success. As an institute affiliated with Purbanchal University, our programs meet rigorous standards and are regularly reviewed to ensure they remain current and relevant to industry needs, preparing students for successful careers."
    },
    {
        id: "be-computer",
        slug: "be-computer-engineering",
        icon: Cpu,
        title: "BE in Computer Engineering",
        degree: "BE",
        duration: "4 Years",
        credit: "160",
        intake: "2025/2026 (48 Seats)",
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
        admissionEligibility: "Minimum 2.4 GPA in 10+2 level or 3.5 Credit in A level (Science / Management / Humanities)",
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
                        semester: "SEMESTER I",
                        modules: [
                            {
                                name: "Mathematics-I",
                                credits: 3,
                                description: "Fundamental mathematical concepts including algebra, trigonometry, and calculus foundations."
                            },
                            {
                                name: "Physics",
                                credits: 3,
                                description: "Physics principles relevant to computer engineering including mechanics, waves, and electromagnetism."
                            },
                            {
                                name: "Technical Communication",
                                credits: 2,
                                description: "Technical writing, presentation skills, and professional communication for engineers."
                            },
                            {
                                name: "Computer Programming",
                                credits: 3,
                                description: "Programming fundamentals, problem-solving, and software development basics."
                            },
                            {
                                name: "Fundamentals of Computing Technology",
                                credits: 3,
                                description: "Introduction to computing systems, computer organization, and basic computing concepts."
                            },
                            {
                                name: "Engineering Drawing",
                                credits: 2,
                                description: "Technical drawing, CAD basics, and engineering graphics for system design."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER II",
                        modules: [
                            {
                                name: "Mathematics-II",
                                credits: 3,
                                description: "Advanced calculus, differential equations, and mathematical methods for engineering."
                            },
                            {
                                name: "Chemistry",
                                credits: 3,
                                description: "General chemistry principles relevant to materials and electronic components."
                            },
                            {
                                name: "Object Oriented Programming",
                                credits: 3,
                                description: "Object-oriented programming principles, classes, inheritance, and design patterns."
                            },
                            {
                                name: "Applied Mechanics",
                                credits: 3,
                                description: "Mechanics principles, statics, dynamics, and their applications in engineering."
                            },
                            {
                                name: "Basic Electrical Engineering",
                                credits: 3,
                                description: "Fundamentals of electrical circuits, AC/DC systems, and electrical components."
                            },
                            {
                                name: "Workshop Technology",
                                credits: 2,
                                description: "Workshop practices, manufacturing processes, and hands-on technical skills."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR TWO",
                semesters: [
                    {
                        semester: "SEMESTER III",
                        modules: [
                            {
                                name: "Mathematics III",
                                credits: 3,
                                description: "Advanced mathematics including linear algebra, complex analysis, and numerical methods."
                            },
                            {
                                name: "Data Structure And Algorithm",
                                credits: 3,
                                description: "Data structures, algorithm design, complexity analysis, and efficient problem-solving."
                            },
                            {
                                name: "Object Oriented Analysis And Design",
                                credits: 3,
                                description: "OOAD principles, UML modeling, design patterns, and software architecture."
                            },
                            {
                                name: "Electronic Device And Circuits",
                                credits: 3,
                                description: "Semiconductor devices, amplifiers, and electronic circuit design and analysis."
                            },
                            {
                                name: "Applied Sociology",
                                credits: 2,
                                description: "Social aspects of technology, ethics, and impact of computing on society."
                            },
                            {
                                name: "Project-I",
                                credits: 2,
                                description: "Second-year project applying programming, data structures, and system concepts."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER IV",
                        modules: [
                            {
                                name: "Computer Graphics",
                                credits: 3,
                                description: "Computer graphics principles, rendering, 2D/3D graphics, and visualization."
                            },
                            {
                                name: "Database Management System",
                                credits: 3,
                                description: "Database design, SQL, normalization, transaction management, and database administration."
                            },
                            {
                                name: "Discrete Structure",
                                credits: 3,
                                description: "Discrete mathematics including sets, relations, functions, graphs, and combinatorics."
                            },
                            {
                                name: "Microprocessor",
                                credits: 3,
                                description: "Microprocessor architecture, assembly language programming, and interfacing."
                            },
                            {
                                name: "Communication System",
                                credits: 3,
                                description: "Communication systems, modulation, signal transmission, and telecommunication."
                            },
                            {
                                name: "Python Programming",
                                credits: 3,
                                description: "Python programming language, libraries, and applications in computer engineering."
                            },
                            {
                                name: "Probability and Statistics",
                                credits: 3,
                                description: "Statistical methods, probability theory, and data analysis for engineering applications."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR THREE",
                semesters: [
                    {
                        semester: "SEMESTER V",
                        modules: [
                            {
                                name: "Algorithm Analysis and Design",
                                credits: 3,
                                description: "Algorithm design techniques, complexity analysis, dynamic programming, and optimization."
                            },
                            {
                                name: "Computer Architecture",
                                credits: 3,
                                description: "Computer architecture, CPU design, memory systems, and performance optimization."
                            },
                            {
                                name: "Numerical Methods",
                                credits: 3,
                                description: "Numerical techniques for solving engineering problems and computational methods."
                            },
                            {
                                name: "Operating System",
                                credits: 3,
                                description: "Operating system concepts, processes, memory management, file systems, and scheduling."
                            },
                            {
                                name: "Engineering Economics",
                                credits: 3,
                                description: "Economic analysis, cost-benefit evaluation, and financial planning for engineering projects."
                            },
                            {
                                name: "Research Methodology",
                                credits: 2,
                                description: "Research methodologies, academic writing, and research design for engineering projects."
                            },
                            {
                                name: "Project-II",
                                credits: 2,
                                description: "Third-year project integrating system design, algorithms, and software engineering."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER VI",
                        modules: [
                            {
                                name: "Artificial Intelligence",
                                credits: 3,
                                description: "AI concepts, machine learning, knowledge representation, and intelligent systems."
                            },
                            {
                                name: "Computer Network",
                                credits: 3,
                                description: "Network protocols, architecture, OSI model, TCP/IP, and network design."
                            },
                            {
                                name: "Embedded and IoT System",
                                credits: 3,
                                description: "Embedded system design, IoT architecture, sensors, and connected devices."
                            },
                            {
                                name: "Software Engineering",
                                credits: 3,
                                description: "Software development lifecycle, methodologies, testing, and project management."
                            },
                            {
                                name: "Theory of Computation",
                                credits: 3,
                                description: "Computational theory, automata, formal languages, and computational complexity."
                            },
                            {
                                name: "Control System",
                                credits: 3,
                                description: "Control theory, feedback systems, stability analysis, and automation."
                            }
                        ]
                    }
                ]
            },
            {
                year: "YEAR FOUR",
                semesters: [
                    {
                        semester: "SEMESTER VII",
                        modules: [
                            {
                                name: "Distributed and Cloud Computing",
                                credits: 3,
                                description: "Distributed systems, cloud computing platforms, services, and architectures."
                            },
                            {
                                name: "IT Project Management",
                                credits: 3,
                                description: "Project management principles, methodologies, and leadership in IT projects."
                            },
                            {
                                name: "Simulation and Modelling",
                                credits: 3,
                                description: "System simulation, modeling techniques, and performance evaluation methods."
                            },
                            {
                                name: "Elective-I : Image Processing & PR",
                                credits: 3,
                                description: "Image processing techniques, pattern recognition, and computer vision applications."
                            },
                            {
                                name: "Elective-II : Mobile Computing",
                                credits: 3,
                                description: "Mobile computing, mobile app development, wireless systems, and mobile technologies."
                            },
                            {
                                name: "Project-A",
                                credits: 3,
                                description: "Major project work integrating computer engineering knowledge and skills."
                            }
                        ]
                    },
                    {
                        semester: "SEMESTER VIII",
                        modules: [
                            {
                                name: "Cyber Security",
                                credits: 3,
                                description: "Cybersecurity principles, network security, cryptography, and secure system design."
                            },
                            {
                                name: "Engineering Professional Practice",
                                credits: 3,
                                description: "Professional ethics, regulations, standards, and practice in computer engineering."
                            },
                            {
                                name: "Elective-III : VB.Net",
                                credits: 3,
                                description: "VB.NET programming, .NET framework, and Windows application development."
                            },
                            {
                                name: "Elective-IV : Geographical Information System",
                                credits: 3,
                                description: "GIS principles, spatial data analysis, mapping, and geographic information technologies."
                            },
                            {
                                name: "Elective-V",
                                credits: 3,
                                description: "Additional elective course option in computer engineering specialization."
                            },
                            {
                                name: "Internship",
                                credits: 6,
                                description: "Industry internship providing practical experience in computer engineering workplaces."
                            }
                        ]
                    }
                ]
            }
        ],
        feeStructure: [
            {
                year: "1st Year",
                admissionFee: 100000,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 210000,
                semester2Fee: 180000,
                universityRegFee: 20000,
                total: 510000,
                grandTotal: 510000
            },
            {
                year: "2nd Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 180000,
                semester2Fee: 180000,
                universityRegFee: 0,
                total: 360000,
                grandTotal: 360000
            },
            {
                year: "3rd Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 140000,
                semester2Fee: 140000,
                universityRegFee: 0,
                total: 280000,
                grandTotal: 280000
            },
            {
                year: "4th Year",
                admissionFee: 0,
                annualFee: 0,
                ccaFee: 0,
                semester1Fee: 110000,
                semester2Fee: 110000,
                universityRegFee: 0,
                total: 220000,
                grandTotal: 220000
            }
        ],
        discountInfo: {
            admissionFeeWaiver: true,
            semesterFeeDiscount: 30,
            note: "100% waiver in Admission Fee for this Batch"
        },
        whyUniversity: "NIET (National Institute of Engineering and Technology) is committed to providing an exceptional student experience with industry-relevant curriculum and comprehensive support for student success. As an institute affiliated with Purbanchal University, our programs meet rigorous standards and are regularly reviewed to ensure they remain current and relevant to industry needs, preparing students for successful careers."
    }
];

export function getProgramBySlug(slug: string): Program | undefined {
    return programs.find(p => p.slug === slug);
}

export function getAllPrograms(): Program[] {
    return programs;
}

