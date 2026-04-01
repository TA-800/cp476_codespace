/*Mock data to match the database tables: 
Users, Courses, Reviews, EvalTypes, Keywords, 
ReviewEvalTypes, ReviewKeywords

Will be replaced with SQL query in Milestone 3
*/

//user profiles
export const users = [
    {UserID: 1, UserName: "student123", Email: "student123@mylaurier.ca"},
    {UserID: 2, UserName: "student1234", Email: "student1234@mylaurier.ca"},
    {UserID: 3, UserName: "student12345", Email: "student12345@mylaurier.ca"},
    {UserID: 4, UserName: "student123456", Email: "student123456@mylaurier.ca"},
    {UserID: 5, UserName: "student1234567", Email: "student1234567@mylaurier.ca"},
];

//course data
export const courses = [
  {
    CourseID: 1,
    CourseCode: "CP103",
    CourseName: "Principles of Programming",
    CourseDesc: "This course is designed for students with little or no programming experience. Introduce non-Computer Science students to basic computer programming techniques. Emphasis is on problem-solving and structured program design methodologies.",
  },
  {
    CourseID: 2,
    CourseCode: "CP104",
    CourseName: "Introduction to Programming",
    CourseDesc: "An introductory course designed to familiarize the student with modern software development techniques. Emphasis is on problem-solving and structured program design methodologies.",
  },
  {
    CourseID: 3,
    CourseCode: "CP164",
    CourseName: "Data Structures I",
    CourseDesc: "Introduction to the study of data structures and their applications. Recursion, searching, sorting. Queues, stacks, heaps. Introduction to the analysis of algorithms, big \"O\" notation.",
  },
  {
    CourseID: 4,
    CourseCode: "CP202",
    CourseName: "Website Design",
    CourseDesc: "This course provides an in depth understanding of website design and administration, short of server-side programming. Emphasis is on standards, good design practices, accessibility, and tools.",
  },
  {
    CourseID: 5,
    CourseCode: "CP212",
    CourseName: "Windows Application Programming",
    CourseDesc: "This course introduces methods to automate repetitive tasks and create user-friendly applications in spreadsheets, word processors, and databases using Visual Basic for Applications (VBA).",
  },
  {
    CourseID: 6,
    CourseCode: "CP213",
    CourseName: "Introduction to Object-Oriented Programming",
    CourseDesc: "Fundamentals of object-oriented programming, classes, subclasses, inheritance, references, overloading, event-driven and concurrent programming. The language Java will be used.",
  },
  {
    CourseID: 7,
    CourseCode: "CP214",
    CourseName: "Discrete Structures for Computer Science",
    CourseDesc: "Finite and discrete algebraic structures relating to computers: sets, functions, relations. Machine-oriented logic. Topics include propositional and predicate calculus, Boolean algebra, combinatorial counting, recurrence equations, graph theory.",
  },
  {
    CourseID: 8,
    CourseCode: "CP216",
    CourseName: "Introduction to Microprocessors",
    CourseDesc: "A comprehensive study of a current commercial microprocessor, its architecture and assembly language. Emphasis on the relationship between architecture, assembly language and system operation.",
  },
  {
    CourseID: 9,
    CourseCode: "CP220",
    CourseName: "Digital Electronics",
    CourseDesc: "Introduction to digital logic: logic gates, combinational circuit analysis using Boolean algebra and Karnaugh maps, number systems and codes, flip-flops, multivibrators, counters and shift registers.",
  },
  {
    CourseID: 10,
    CourseCode: "CP221",
    CourseName: "Analog Electronics I",
    CourseDesc: "DC and AC circuit theory, complex impedance, resonance, Norton and Thevenin Theorems, semiconductor diodes, bipolar transistors, the use of transistors for the construction of logic gates.",
  },
  {
    CourseID: 11,
    CourseCode: "CP264",
    CourseName: "Data Structures II",
    CourseDesc: "A continuation of the study of data structures and their applications using C. Linked lists, binary search trees, balanced search trees. Hashing, collision-avoidance strategies. A continuation of basic algorithm analysis.",
  },
  {
    CourseID: 12,
    CourseCode: "CP310",
    CourseName: "Special Topics",
    CourseDesc: "A detailed examination of a field or topic of interest not covered by the regular program.",
  },
  {
    CourseID: 13,
    CourseCode: "CP312",
    CourseName: "Algorithm Design and Analysis I",
    CourseDesc: "Analysis of the best, average, and worse case behaviors of algorithms. Algorithmic strategies: brute force, greedy, divide-and-conquer, branch and bound, backtracking. Fundamental computing algorithms.",
  },
  {
    CourseID: 14,
    CourseCode: "CP315",
    CourseName: "Introduction to Scientific Computation",
    CourseDesc: "An introduction to scientific computation with substantial use of scientific software such as Maple and Matlab. Numerical methods include interpolation, curve fitting, solving linear and nonlinear equations.",
  },
  {
    CourseID: 15,
    CourseCode: "CP316",
    CourseName: "Microprocessor Systems & Interfacing",
    CourseDesc: "Interfacing a microprocessor or microcontroller with external devices for real-time hardware control. Serial and parallel IO, timing generation, priority interrupt structures and servicing.",
  },
  {
    CourseID: 16,
    CourseCode: "CP317",
    CourseName: "Software Engineering",
    CourseDesc: "Discussion of software development activities, including software process models, analysis, design, implementation, testing, project management and advanced topics. Both traditional and object-oriented methods.",
  },
  {
    CourseID: 17,
    CourseCode: "CP319",
    CourseName: "Digital System Design",
    CourseDesc: "Logic families and interfacing considerations, VHDL, implementation techniques for combinational and sequential logic, finite state machines, synchronous and asynchronous sequential circuits.",
  },
  {
    CourseID: 18,
    CourseCode: "CP320",
    CourseName: "Physical Computing: Digital Interaction with the Analog World",
    CourseDesc: "Design and construction of computational systems that interact with the physical world. Basics of electrical circuits, sensors, actuators, single board computers such as Arduino or Raspberry PI.",
  },
  {
    CourseID: 19,
    CourseCode: "CP321",
    CourseName: "Data Visualization",
    CourseDesc: "Overview on how to visualize data to present large data sets in a meaningful way. Learn to select appropriate data sets, transform them, and choose the right model for analysis.",
  },
  {
    CourseID: 20,
    CourseCode: "CP322",
    CourseName: "Machine Learning",
    CourseDesc: "Hands-on implementation of fundamental machine learning algorithms such as predictive modeling and clustering applied to real, open-ended problems. Focus is on practice over theory.",
  },
  {
    CourseID: 21,
    CourseCode: "CP331",
    CourseName: "Parallel Programming",
    CourseDesc: "Fundamental paradigms of parallel programming with emphasis on problem solving and actual applications. Concepts illustrated via OpenMP and MPI implementations.",
  },
  {
    CourseID: 22,
    CourseCode: "CP340",
    CourseName: "E-commerce",
    CourseDesc: "Development of the Internet and its impacts on business transactions. Topics include electronic marketplace, online marketing, web analytics, privacy and security issues and electronic payments.",
  },
  {
    CourseID: 23,
    CourseCode: "CP351",
    CourseName: "Quantum Computing",
    CourseDesc: "Introduction to quantum computing including quantum algorithms, teleportation, secure quantum communication, Shor's factoring algorithm, Grover's search protocol, and quantum error correction.",
  },
  {
    CourseID: 24,
    CourseCode: "CP363",
    CourseName: "Database I",
    CourseDesc: "Introduction to database systems. Topics include data models, query languages, database design, recovery and concurrency, integrity and security.",
  },
  {
    CourseID: 25,
    CourseCode: "CP364",
    CourseName: "Data Communications and Networks",
    CourseDesc: "Data communication fundamentals with emphasis on the physical layer and telecommunication networks. Topics include transmission media, digital data transmission, architectures.",
  },
  {
    CourseID: 26,
    CourseCode: "CP367",
    CourseName: "Introduction to System Programming",
    CourseDesc: "Contemporary ideas and techniques in system programming using C. Introduction to Unix operating system, directories and files, device control, signal handling, process intercommunication, shell programming.",
  },
  {
    CourseID: 27,
    CourseCode: "CP372",
    CourseName: "Computer Networks",
    CourseDesc: "Introduction to computer communication networks. The OSI reference model. Protocols for error and flow control. Routing and congestion control. Internet architecture and protocols.",
  },
  {
    CourseID: 28,
    CourseCode: "CP373",
    CourseName: "Ethics and Professional Practice in Computer Science",
    CourseDesc: "Introduction to ethics, computer reliability and safety, privacy, computer crime, intellectual property, impact of computers on work and society.",
  },
  {
    CourseID: 29,
    CourseCode: "CP386",
    CourseName: "Operating Systems",
    CourseDesc: "Topics include operating system services, file systems, CPU scheduling, memory management, virtual memory, disk scheduling, deadlocks, concurrent processes, protection and distributed systems.",
  },
  {
    CourseID: 30,
    CourseCode: "CP395",
    CourseName: "Directed Studies",
    CourseDesc: "A detailed study of an aspect of computer science or computer electronics not available through the regular program.",
  },
  {
    CourseID: 31,
    CourseCode: "CP400",
    CourseName: "Special Topics",
    CourseDesc: "A detailed examination of a field or topic of interest not covered by the regular program.",
  },
  {
    CourseID: 32,
    CourseCode: "CP400Q",
    CourseName: "Android Programming",
    CourseDesc: "A detailed examination of a field or topic of interest not covered by the regular program.",
  },
  {
    CourseID: 33,
    CourseCode: "CP400R",
    CourseName: "Data Mining & Enterprise Computing",
    CourseDesc: "A detailed examination of a field or topic of interest not covered by the regular program.",
  },
  {
    CourseID: 34,
    CourseCode: "CP411",
    CourseName: "Computer Graphics",
    CourseDesc: "Principles, algorithms, and techniques of computer graphics. Topics include graphics hardware, output primitives, geometric transformations, 3D object representation, illumination models and rendering.",
  },
  {
    CourseID: 35,
    CourseCode: "CP412",
    CourseName: "Algorithm Design and Analysis II",
    CourseDesc: "A continuation of the study of computer algorithms. Amortized analysis, on-line and off-line algorithms, randomized algorithms, dynamic programming.",
  },
  {
    CourseID: 36,
    CourseCode: "CP414",
    CourseName: "Foundations of Computing",
    CourseDesc: "DFAs and NFAs, regular expressions, context-free grammars, push-down automata, classes P and NP, NP-completeness, Turing machines, the halting problem.",
  },
  {
    CourseID: 37,
    CourseCode: "CP421",
    CourseName: "Data Mining",
    CourseDesc: "Entry level study of information retrieval and data mining techniques. Algorithms for document indexing, relevance ranking, web usage mining, text analytics, and performance evaluations.",
  },
  {
    CourseID: 38,
    CourseCode: "CP422",
    CourseName: "Programming for Big Data",
    CourseDesc: "Key information technologies for manipulating, storing, and analyzing big data. Covers R, Python, MapReduce, Hadoop, HDFS, Spark, Hive, Cassandra, VoltDB, SciDB, and Neo4J.",
  },
  {
    CourseID: 39,
    CourseCode: "CP423",
    CourseName: "Text Retrieval and Search Engines",
    CourseDesc: "Covers search engine technologies. Students learn basic concepts, principles, and major techniques in text retrieval, which is the underlying science of search engines.",
  },
  {
    CourseID: 40,
    CourseCode: "CP431",
    CourseName: "Parallel Programming",
    CourseDesc: "Paradigms of parallel programming with emphasis on problem solving and applications. Concepts illustrated via OpenMP and MPI implementations, as well as serial farming.",
  },
  {
    CourseID: 41,
    CourseCode: "CP460",
    CourseName: "Applied Cryptography",
    CourseDesc: "Algorithms and issues in applied cryptography. Topics include history of cryptography, block ciphers, stream ciphers, public-key encryption, digital signatures, and key management.",
  },
  {
    CourseID: 42,
    CourseCode: "CP461",
    CourseName: "Introduction to Computational Aspects of Bio-informatics",
    CourseDesc: "Basic computational problems arising in molecular biology. Topics include sequence comparison, fragment assembly of DNA, genome rearrangements, molecular structure prediction.",
  },
  {
    CourseID: 43,
    CourseCode: "CP463",
    CourseName: "Simulation",
    CourseDesc: "Discrete and continuous simulations, queuing theory.",
  },
  {
    CourseID: 44,
    CourseCode: "CP464",
    CourseName: "Selected Topics in Computer Hardware",
    CourseDesc: "Topics may include computer classes and evolution, instruction set design, hardwired sequencer design, microprogramming, memory hierarchies, concurrency, multiple-processor systems.",
  },
  {
    CourseID: 45,
    CourseCode: "CP465",
    CourseName: "Database II",
    CourseDesc: "Advanced database management system design principles and techniques. Topics include access methods, query processing, transaction processing, distributed databases, data warehousing.",
  },
  {
    CourseID: 46,
    CourseCode: "CP467",
    CourseName: "Image Processing & Pattern Recognition",
    CourseDesc: "Introduction to vision systems for image acquisition and display. Coverage of image enhancement, segmentation, feature extraction and classification.",
  },
  {
    CourseID: 47,
    CourseCode: "CP468",
    CourseName: "Artificial Intelligence",
    CourseDesc: "Current concepts and techniques in artificial intelligence and machine learning. Topics include knowledge representation, automated reasoning, machine learning and knowledge-based systems.",
  },
  {
    CourseID: 48,
    CourseCode: "CP469",
    CourseName: "iPhone Application Programming",
    CourseDesc: "Programming applications for iPhone, iPad, and iPod platforms using Cocoa Touch framework. Introduction to Objective-C, interface development for mobile devices.",
  },
  {
    CourseID: 49,
    CourseCode: "CP470",
    CourseName: "Android Programming",
    CourseDesc: "Writing applications for Android mobile devices using Android Development Tools. Model-View-Controller paradigm. Knowledge of Java is required.",
  },
  {
    CourseID: 50,
    CourseCode: "CP471",
    CourseName: "Introduction to Compiling",
    CourseDesc: "Principles and design techniques for compilers. Compiler organization, scanning, parsing, semantic analysis, run-time storage organization, code generation and optimization.",
  },
  {
    CourseID: 51,
    CourseCode: "CP472",
    CourseName: "Programming Languages",
    CourseDesc: "Overview of programming languages, virtual machines, language semantics, language design, translation, types, abstraction, functional programming, logic programming, OOP.",
  },
  {
    CourseID: 52,
    CourseCode: "CP476",
    CourseName: "Internet Computing",
    CourseDesc: "The architecture of the Internet. Client-server programming, technologies of the web (URLs, HTML, HTTP, applets, etc.) Introduction to building web applications and server-side programming.",
  },
  {
    CourseID: 53,
    CourseCode: "CP480",
    CourseName: "Wireless Communication & Networks",
    CourseDesc: "Fundamental concepts of wireless networks. Topics include physical layer, wireless protocols, cellular standards, WIFI, WiMax, Bluetooth, sensor networks, mobile security.",
  },
  {
    CourseID: 54,
    CourseCode: "CP493",
    CourseName: "Directed Research Project I",
    CourseDesc: "An in-depth investigation of a computer science subject under faculty supervision, including the submission of a final report.",
  },
  {
    CourseID: 55,
    CourseCode: "CP494",
    CourseName: "Directed Research Project II",
    CourseDesc: "An in-depth investigation of a computer science subject under faculty supervision, including the submission of a formal report.",
  },
  {
    CourseID: 56,
    CourseCode: "CP495",
    CourseName: "Directed Studies",
    CourseDesc: "A detailed study of an aspect of computer science or computer electronics not available through the regular program.",
  },
  {
    CourseID: 57,
    CourseCode: "CP496",
    CourseName: "Interdisciplinary Design Project I",
    CourseDesc: "Group setting to solve a substantial problem spanning Computer Science, Electronics, Physics or Photonics. Students define requirements, develop a solution plan, and present their work.",
  },
  {
    CourseID: 58,
    CourseCode: "CP497",
    CourseName: "Interdisciplinary Design Project II",
    CourseDesc: "Continuation of the project begun in CP496. Students implement their design and demonstrate their work using written, oral, and video reports.",
  },
  {
    CourseID: 59,
    CourseCode: "CP600",
    CourseName: "Practical Algorithm Design",
    CourseDesc: "Advanced techniques for designing and analysing algorithms. Topics include sorting, search, graph traversal, combinatorial search, heuristics, dynamic programming, intractable problems.",
  },
  {
    CourseID: 60,
    CourseCode: "CP601",
    CourseName: "Seminar in Technology Entrepreneurship",
    CourseDesc: "Fundamentals of technology entrepreneurship. Taking a technology idea, finding commercial opportunity, gathering resources, selling and marketing the idea, managing rapid growth.",
  },
  {
    CourseID: 61,
    CourseCode: "CP610",
    CourseName: "Data Analysis",
    CourseDesc: "Theories, techniques and practices in modern data analysis. Topics include data collection, storage, processing, representation, reporting, decision trees and artificial intelligence.",
  },
  {
    CourseID: 62,
    CourseCode: "CP612",
    CourseName: "Data Management and Analysis",
    CourseDesc: "Overview of modern data management and analysis. Compares relational databases with NoSQL. Covers Hadoop, MapReduce, Spark, Hive, Association Mining, Classification, Clustering.",
  },
  {
    CourseID: 63,
    CourseCode: "CP614",
    CourseName: "Applied Cryptography",
    CourseDesc: "Block ciphers, stream ciphers, public-key cryptography, AES, elliptic curve cryptosystems, blockchain, digital signatures, zero knowledge proofs, post quantum cryptography.",
  },
  {
    CourseID: 64,
    CourseCode: "CP620",
    CourseName: "Data Mining Programming",
    CourseDesc: "Principles of data mining and practical knowledge to visualize and analyze data using data mining software such as Weka.",
  },
  {
    CourseID: 65,
    CourseCode: "CP621",
    CourseName: "Data Mining Mobile Devices",
    CourseDesc: "Data mining focused on mobile devices. Analyzing Wi-Fi and GPS data from websites and mobile applications. Modeling mined data via artificial intelligence software.",
  },
  {
    CourseID: 66,
    CourseCode: "CP630",
    CourseName: "Enterprise Computing",
    CourseDesc: "Integrated solutions for organizations including software development, resource management and data analytics. Covers security, user experience, optimization, and distributed databases.",
  },
  {
    CourseID: 67,
    CourseCode: "CP631",
    CourseName: "Parallel Programming",
    CourseDesc: "Paradigms of parallel programming with emphasis on problem solving and applications. Illustrated via OpenMP and MPI implementations, as well as serial farming.",
  },
  {
    CourseID: 68,
    CourseCode: "CP640",
    CourseName: "Machine Learning",
    CourseDesc: "Supervised learning (parametric/non-parametric algorithms, SVMs, kernels, neural networks) and unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning).",
  },
  {
    CourseID: 69,
    CourseCode: "CP650",
    CourseName: "User Interface Design and Implementation",
    CourseDesc: "Proven user interface design practices to gather requirements, reduce user input errors, and provide intuitive navigation pathways through complex applications.",
  },
  {
    CourseID: 70,
    CourseCode: "CP669",
    CourseName: "iPhone Application Programming",
    CourseDesc: "Developing applications for iPhones, iPads, and iPods using Cocoa Touch framework on iOS and the programming language Swift. Interface development for mobile devices.",
  },
  {
    CourseID: 71,
    CourseCode: "CP670",
    CourseName: "Android Application Programming",
    CourseDesc: "Creating and deploying applications for mobile devices using Android. Emphasis on Model-View-Controller paradigm. Culminates with development of an original Android application.",
  },
  {
    CourseID: 72,
    CourseCode: "CP680",
    CourseName: "Capstone Project",
    CourseDesc: "Available only to students in the Co-Operative Education Option. Students complete a major project integrating their academic and work experience.",
  },
  {
    CourseID: 73,
    CourseCode: "CP681",
    CourseName: "Directed Studies",
    CourseDesc: "Individual study of a special topic not offered in existing courses at an advanced level under faculty supervision.",
  },
  {
    CourseID: 74,
    CourseCode: "CP682",
    CourseName: "Special Topics",
    CourseDesc: "A detailed examination of a special topic not covered by the Department's regular course offerings.",
  },
  {
    CourseID: 75,
    CourseCode: "CP683",
    CourseName: "Graduate Project",
    CourseDesc: "For students in the course-based option in the Master of Applied Computing program. Students select a topic for in-depth study and submit a written report.",
  },
  {
    CourseID: 76,
    CourseCode: "CP685",
    CourseName: "Cyber Attack and Defense",
    CourseDesc: "Principles and practice in computer security. Covers vulnerabilities, attacks, exploitation, wireless security, web application security, defense, countermeasures, and forensic investigation.",
  },
  {
    CourseID: 77,
    CourseCode: "CP699",
    CourseName: "Master's Thesis",
    CourseDesc: "Students complete a thesis based on original research and defend it before an examining committee.",
  },
];

//eval types
export const evalTypes = [
  { EvalTypeID: 1, EvalTitle: "Assignments", KeywordDetails: null },
  { EvalTypeID: 2, EvalTitle: "Quizzes", KeywordDetails: null },
  { EvalTypeID: 3, EvalTitle: "Midterm", KeywordDetails: null },
  { EvalTypeID: 4, EvalTitle: "Final", KeywordDetails: null },
  { EvalTypeID: 5, EvalTitle: "Labs", KeywordDetails: null },
  { EvalTypeID: 6, EvalTitle: "Readings", KeywordDetails: null },
  { EvalTypeID: 7, EvalTitle: "Participation", KeywordDetails: null },
];

//keywords
export const keywords = [
  { KeywordID: 1, KeywordTitle: "Python", KeywordDetails: null },
  { KeywordID: 2, KeywordTitle: "Loops", KeywordDetails: null },
  { KeywordID: 3, KeywordTitle: "Functions", KeywordDetails: null },
  { KeywordID: 4, KeywordTitle: "Debugging", KeywordDetails: null },
  { KeywordID: 5, KeywordTitle: "Basics", KeywordDetails: null },
  { KeywordID: 6, KeywordTitle: "Stacks", KeywordDetails: null },
  { KeywordID: 7, KeywordTitle: "Queues", KeywordDetails: null },
  { KeywordID: 8, KeywordTitle: "Linked Lists", KeywordDetails: null },
  { KeywordID: 9, KeywordTitle: "Sorting", KeywordDetails: null },
  { KeywordID: 10, KeywordTitle: "Recursion", KeywordDetails: null },
  { KeywordID: 11, KeywordTitle: "Searching", KeywordDetails: null },
  { KeywordID: 12, KeywordTitle: "Trees", KeywordDetails: null },
  { KeywordID: 13, KeywordTitle: "Graphs", KeywordDetails: null },
  { KeywordID: 14, KeywordTitle: "Hashing", KeywordDetails: null },
  { KeywordID: 15, KeywordTitle: "Heaps", KeywordDetails: null },
  { KeywordID: 16, KeywordTitle: "PHP", KeywordDetails: null },
  { KeywordID: 17, KeywordTitle: "Web Dev", KeywordDetails: null },
  { KeywordID: 18, KeywordTitle: "JavaScript", KeywordDetails: null },
  { KeywordID: 19, KeywordTitle: "SQL", KeywordDetails: null },
  { KeywordID: 20, KeywordTitle: "HTML", KeywordDetails: null },
  { KeywordID: 21, KeywordTitle: "CSS", KeywordDetails: null },
  { KeywordID: 22, KeywordTitle: "Node.js", KeywordDetails: null },
  { KeywordID: 23, KeywordTitle: "MySQL", KeywordDetails: null },
  { KeywordID: 24, KeywordTitle: "HTTP", KeywordDetails: null },
  { KeywordID: 25, KeywordTitle: "ER Diagrams", KeywordDetails: null },
  { KeywordID: 26, KeywordTitle: "Normalization", KeywordDetails: null },
];

//reviews
export const reviews = [
  {
    ReviewID: 1,
    UserID: 1,
    CourseID: 1,
    Rating: 3,
    Comment: "intro course. Assignments were fair and the professor explained things clearly.",
    Workload: 4,
    GroupWork: false,
    IsCompleted: true,
    GradeAchieved: 85.0,
    DatePublished: "2025-12-15 10:30:00",
    DateEditted: null,
  },
  {
    ReviewID: 2,
    UserID: 2,
    CourseID: 1,
    Rating: 4,
    Comment: "Slightly harder than expected but manageable. The quizzes were easy.",
    Workload: 5,
    GroupWork: false,
    IsCompleted: true,
    GradeAchieved: 78.0,
    DatePublished: "2026-01-10 14:00:00",
    DateEditted: null,
  },
  {
    ReviewID: 3,
    UserID: 3,
    CourseID: 1,
    Rating: 2,
    Comment: "If you have any prior coding experience you will be fine.",
    Workload: 3,
    GroupWork: false,
    IsCompleted: true,
    GradeAchieved: 92.0,
    DatePublished: "2025-11-20 09:45:00",
    DateEditted: null,
  },
  {
    ReviewID: 4,
    UserID: 1,
    CourseID: 2,
    Rating: 6,
    Comment: "Significant step up from CP104. Labs are very helpful.",
    Workload: 7,
    GroupWork: false,
    IsCompleted: true,
    GradeAchieved: 72.0,
    DatePublished: "2026-01-05 16:20:00",
    DateEditted: null,
  },
  {
    ReviewID: 5,
    UserID: 4,
    CourseID: 2,
    Rating: 7,
    Comment: "Challenging but rewarding. The assignments are a little long.",
    Workload: 8,
    GroupWork: false,
    IsCompleted: true,
    GradeAchieved: 68.0,
    DatePublished: "2025-12-28 11:00:00",
    DateEditted: null,
  },
  {
    ReviewID: 6,
    UserID: 2,
    CourseID: 4,
    Rating: 8,
    Comment:"One of the hardest CS courses.",
    Workload: 9,
    GroupWork: false,
    IsCompleted: true,
    GradeAchieved: 65.0,
    DatePublished: "2026-01-18 13:15:00",
    DateEditted: null,
  },
  {
    ReviewID: 7,
    UserID: 5,
    CourseID: 8,
    Rating: 5,
    Comment: "Really practical course. The group project is annoying tho.",
    Workload: 6,
    GroupWork: true,
    IsCompleted: true,
    GradeAchieved: 80.0,
    DatePublished: "2026-01-20 09:15:00",
    DateEditted: null,
  },
  {
    ReviewID: 8,
    UserID: 3,
    CourseID: 8,
    Rating: 6,
    Comment: "Covers a lot of ground. Useful for web dev skills.",
    Workload: 7,
    GroupWork: true,
    IsCompleted: false,
    GradeAchieved: null,
    DatePublished: "2026-02-01 10:00:00",
    DateEditted: null,
  },
  {
    ReviewID: 9,
    UserID: 4,
    CourseID: 6,
    Rating: 4,
    Comment: "Straightforward if you pay attention in class. SQL is easy to pick up.",
    Workload: 5,
    GroupWork: false,
    IsCompleted: true,
    GradeAchieved: 88.0,
    DatePublished: "2025-12-10 15:30:00",
    DateEditted: null,
  },
];

//eval types
export const reviewEvalTypes = [
  { ReviewID: 1, EvalTypeID: 1 },
  { ReviewID: 1, EvalTypeID: 3 },
  { ReviewID: 1, EvalTypeID: 4 },
  { ReviewID: 2, EvalTypeID: 1 },
  { ReviewID: 2, EvalTypeID: 2 },
  { ReviewID: 2, EvalTypeID: 4 },
  { ReviewID: 3, EvalTypeID: 1 },
  { ReviewID: 3, EvalTypeID: 3 },
  { ReviewID: 3, EvalTypeID: 4 },
  { ReviewID: 4, EvalTypeID: 1 },
  { ReviewID: 4, EvalTypeID: 3 },
  { ReviewID: 4, EvalTypeID: 4 },
  { ReviewID: 4, EvalTypeID: 5 },
  { ReviewID: 5, EvalTypeID: 1 },
  { ReviewID: 5, EvalTypeID: 3 },
  { ReviewID: 5, EvalTypeID: 4 },
  { ReviewID: 6, EvalTypeID: 1 },
  { ReviewID: 6, EvalTypeID: 3 },
  { ReviewID: 6, EvalTypeID: 4 },
  { ReviewID: 7, EvalTypeID: 1 },
  { ReviewID: 7, EvalTypeID: 3 },
  { ReviewID: 7, EvalTypeID: 4 },
  { ReviewID: 7, EvalTypeID: 5 },
  { ReviewID: 8, EvalTypeID: 1 },
  { ReviewID: 8, EvalTypeID: 3 },
  { ReviewID: 8, EvalTypeID: 4 },
  { ReviewID: 9, EvalTypeID: 1 },
  { ReviewID: 9, EvalTypeID: 3 },
  { ReviewID: 9, EvalTypeID: 4 },
];

//review keywords
export const reviewKeywords = [
  { ReviewID: 1, KeywordID: 1 },
  { ReviewID: 1, KeywordID: 2 },
  { ReviewID: 1, KeywordID: 3 },
  { ReviewID: 2, KeywordID: 1 },
  { ReviewID: 2, KeywordID: 4 },
  { ReviewID: 3, KeywordID: 1 },
  { ReviewID: 3, KeywordID: 5 },
  { ReviewID: 4, KeywordID: 6 },
  { ReviewID: 4, KeywordID: 7 },
  { ReviewID: 4, KeywordID: 8 },
  { ReviewID: 4, KeywordID: 9 },
  { ReviewID: 5, KeywordID: 10 },
  { ReviewID: 5, KeywordID: 9 },
  { ReviewID: 5, KeywordID: 11 },
  { ReviewID: 6, KeywordID: 12 },
  { ReviewID: 6, KeywordID: 13 },
  { ReviewID: 6, KeywordID: 14 },
  { ReviewID: 6, KeywordID: 15 },
  { ReviewID: 7, KeywordID: 16 },
  { ReviewID: 7, KeywordID: 17 },
  { ReviewID: 7, KeywordID: 18 },
  { ReviewID: 7, KeywordID: 19 },
  { ReviewID: 7, KeywordID: 20 },
  { ReviewID: 7, KeywordID: 21 },
  { ReviewID: 8, KeywordID: 22 },
  { ReviewID: 8, KeywordID: 16 },
  { ReviewID: 8, KeywordID: 23 },
  { ReviewID: 8, KeywordID: 24 },
  { ReviewID: 9, KeywordID: 19 },
  { ReviewID: 9, KeywordID: 25 },
  { ReviewID: 9, KeywordID: 26 },
];

//calculation and get functions

//fetch course id
export function getCourseById(courseId) {
  return courses.find((c) => c.CourseID === courseId) || null;
}

//fetch specific review for id
export function getReviewsForCourse(courseId) {
  return reviews.filter((r) => r.CourseID === courseId);
}

//fetch username if available
export function getUserName(userId) {
  const user = users.find((u) => u.UserID === userId);
  return user ? user.UserName : "Unknown";
}

export function getEvalTypesForReview(reviewId) {
  const links = reviewEvalTypes.filter((re) => re.ReviewID === reviewId);
  return links
    .map((link) => {
      const et = evalTypes.find((e) => e.EvalTypeID === link.EvalTypeID);
      return et ? et.EvalTitle : "";
    })
    .filter((t) => t);
}

export function getKeywordsForReview(reviewId) {
  const links = reviewKeywords.filter((rk) => rk.ReviewID === reviewId);
  return links
    .map((link) => {
      const kw = keywords.find((k) => k.KeywordID === link.KeywordID);
      return kw ? kw.KeywordTitle : "";
    })
    .filter((k) => k);
}

//calculate averages and counts
export function getAverageRating(courseId) {
  const courseReviews = getReviewsForCourse(courseId);
  if (courseReviews.length === 0) return 0;
  const total = courseReviews.reduce((sum, r) => sum + r.Rating, 0);
  return (total / courseReviews.length).toFixed(1);
}

//calculate average workload
export function getAverageWorkload(courseId) {
  const courseReviews = getReviewsForCourse(courseId);
  if (courseReviews.length === 0) return 0;
  const total = courseReviews.reduce((sum, r) => sum + r.Workload, 0);
  return (total / courseReviews.length).toFixed(1);
}

export function getEvaluationTypesForCourse(courseId) {
  const courseReviews = getReviewsForCourse(courseId);
  const typeSet = {};
  courseReviews.forEach((r) => {
    const types = getEvalTypesForReview(r.ReviewID);
    types.forEach((t) => {
      typeSet[t] = true;
    });
  });
  return Object.keys(typeSet);
}

//determines if course has group work
export function hasGroupWork(courseId) {
  const courseReviews = getReviewsForCourse(courseId);
  if (courseReviews.length === 0) return "N/A";
  const yesCount = courseReviews.filter((r) => r.GroupWork).length;
  return yesCount > courseReviews.length / 2 ? "Yes" : "No";
}

//calculate average grade
export function getAverageGrade(courseId) {
  const courseReviews = getReviewsForCourse(courseId);
  const withGrades = courseReviews.filter(
    (r) => r.IsCompleted && r.GradeAchieved !== null);
  if (withGrades.length === 0) return null;
  const total = withGrades.reduce((sum, r) => sum + r.GradeAchieved, 0);
  return (total / withGrades.length).toFixed(1);
}

//format date to readable string
export function formatDate(dateString) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const d = new Date(dateString);
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

