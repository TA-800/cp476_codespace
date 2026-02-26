-- Enforce foreign keys
-- Reference: https://sqlite.org/pragma.html#pragma_foreign_keys
PRAGMA foreign_keys = ON;

ATTACH DATABASE 'project.db' AS 'project';

-- Use STRICT keyword in SQLite to use strict typing because by default, SQLite is flexible with typing
-- For example: For example, if a table column has a type of "INTEGER", then SQLite tries to convert anything inserted into that column into an integer. So an attempt to insert the string '123' results in an integer 123 being inserted.
-- Reference: https://sqlite.org/stricttables.html

-- In SQLite3 PRIMARY KEYs can be null, disallow that by adding NOT NULL

CREATE TABLE project.Users (
    -- AUTOINCREMENT is default behaviour, ref: https://sqlite.org/autoinc.html
    UserID INTEGER  NOT NULL PRIMARY KEY,
    UserName TEXT NOT NULL,
    Password TEXT NOT NULL,
    Email TEXT NOT NULL
) STRICT;

CREATE TABLE project.Courses (
    CourseID INTEGER  NOT NULL PRIMARY KEY,
    CourseName TEXT NOT NULL,
    CourseCode TEXT NOT NULL,
    CourseDesc TEXT
) STRICT;

CREATE TABLE project.Reviews (
    ReviewID INTEGER  NOT NULL PRIMARY KEY,
    UserID INTEGER NOT NULL,
    CourseID INTEGER NOT NULL,
    Rating INTEGER NOT NULL,
    Comment TEXT,
    Workload INTEGER,
    -- SQLite has no boolean types, 1 and 0's are used instead, so just add a simple constraint to make sure inserted values are either 1 or 0 (TRUE or FALSE)
    GroupWork INTEGER CHECK(GroupWork IN (0, 1)),
    IsCompleted INTEGER CHECK(IsCompleted IN (0, 1)),
    GradeAchieved REAL,
    DatePublished TEXT DEFAULT CURRENT_DATE,
    DateEdited TEXT,

    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
) STRICT;

CREATE TABLE project.EvalTypes (
    EvalTypeID INTEGER NOT NULL PRIMARY KEY,
    EvalTitle TEXT NOT NULL,
    KeywordDetails TEXT
) STRICT;

CREATE TABLE project.Keywords (
    KeywordID INTEGER  NOT NULL PRIMARY KEY,
    KeywordTitle TEXT NOT NULL,
    KeywordDetails TEXT
) STRICT;

CREATE TABLE project.ReviewEvalTypes (
    ReviewID INTEGER NOT NULL,
    EvalTypeID INTEGER NOT NULL,

    PRIMARY KEY (ReviewID, EvalTypeID),
    FOREIGN KEY (EvalTypeID) REFERENCES EvalTypes(EvalTypeID),
    FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID)
) STRICT;

CREATE TABLE project.ReviewKeywords (
    ReviewID INTEGER NOT NULL,
    KeywordID INTEGER NOT NULL,

    PRIMARY KEY (ReviewID, KeywordID),
    FOREIGN KEY (KeywordID) REFERENCES Keywords(KeywordID),
    FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID)
) STRICT;


-- Insert some default values here so when we build locally, we have some test data to work with
INSERT INTO Users (UserName, Password, Email) VALUES (
    'ta800', '123', 'ta800@gmail.com'
);


INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP103',
    'Principles of Programming',
    'This course is designed for students with little or no programming experience. Introduce non-Computer Science students to basic computer programming techniques. Emphasis is on problem-solving and structured program design methodologies. Programming projects are implemented in a widely used high-level language. Students will learn elementary computer science concepts with emphasis on procedural programming. Topics include control loops, functions, input and output, installing and using packages, basic debugging skill, introduction to GUI programming. You are required to have a personal computer capable of running the Python programming language and the IDLE (Integrated Development Environment). Windows, Mac, and Linux are all appropriate operating systems for this on desktop or laptop machines. Chromebooks are not appropriate.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP104',
    'Introduction to Programming',
    'An introductory course designed to familiarize the student with modern software development techniques. Emphasis is on problem-solving and structured program design methodologies. Programming projects are implemented in a widely used high-level language.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP164',
    'Data Structures I',
    'Introduction to the study of data structures and their applications. Recursion, searching, sorting. Queues, stacks, heaps. Introduction to the analysis of algorithms, big “O” notation.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP202',
    'Website Design',
    'This course provides an in depth understanding of website design and administration, short of server-side programming. Emphasis is on standards, good design practices, accessibility, and tools. By the end of the course students should have the skills to administer a website, deal with security issues, design readable, informative, attractive and accessible web pages that fit current standards, and apply a logical and consistent navigational scheme to an entire website.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP212',
    'Windows Application Programming',
    'This course is designed for students who have a basic understanding of spreadsheets, word processors, and databases as well as introductory programming experience. The course introduces methods to automate repetitive tasks and create user-friendly applications in spreadsheets, word processors, and databases using the powerful macro language, Visual Basic for Applications (VBA). Topics include: a review of programming constructs such as data types, looping, conditional statements, and arrays; the design of graphical interfaces with the typical "look and feel" of Windows software; the design of dialog boxes with controls and eventhandling code that responds to user input; automating tasks; consolidating data; providing userfriendly reports.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP213',
    'Introduction to Object-Oriented Programming',
    'Fundamentals of object-oriented programming, classes, subclasses, inheritance, references, overloading, event-driven and concurrent programming, using modern application programming interface. The language Java will be used.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP214',
    'Discrete Structures for Computer Science',
    'Finite and discrete algebraic structures relating to computers: sets, functions, relations. Machine-oriented logic. Topics include: propositional and predicate calculus, Boolean algebra, combinatorial counting (including Pigeonhole principle, permutations and combinations), recurrence equations, applications of recurrence equations in sorting algorithms, relations (including equivalence relations, partial orders), algorithms to generate permutations and combinations, induction and recursive programs, correctness proofs for both recursive and iterative program constructions, countable and uncountable sets, Cantor’s theorem, introduction to graph theory and graph algorithms.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP216',
    'Introduction to Microprocessors',
    'A comprehensive study of a current commercial microprocessor, its architecture and assembly language. Emphasis on (1) the relationship between architecture, assembly language and system operation, and (2) the relationship between assembly language, high level languages and operating systems.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP220',
    'Digital Electronics',
    'Introduction to digital logic: logic gates, combinational circuit analysis using Boolean algebra and Karnaugh maps, number systems and codes, minimization techniques applied to combinational logic systems; flip-flops, multivibrators, counters and shift registers.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP221',
    'Analog Electronics I',
    'DC and AC circuit theory, complex impedance, resonance, Norton and Thevenin Theorems, semiconductor diodes, bipolar transistors, the use of transistors for the construction of logic gates.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP264',
    'Data Structures II',
    'A continuation of the study of data structures and their applications using C. Linked lists, binary search trees, balanced search trees. Hashing, collision-avoidance strategies. A continuation of basic algorithm analysis.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP310',
    'Special Topics',
    'A detailed examination of a field or topic of interest not covered by the regular program. Irregular course.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP312',
    'Algorithm Design and Analysis I',
    'Analysis of the best, average, and worse case behaviors of algorithms. Algorithmic strategies: brute force algorithms, greedy algorithms, divide-and-conquer, branch and bound, backtracking. Fundamental computing algorithms: O (n log n) sorting, hash table, binary trees, depth- and breadth-first search of graphs.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP315',
    'Introduction to Scientific Computation',
    'An introduction to scientific computation, with substantial use of scientific software, such as Maple and Matlab. Scientific problems and models from different disciplines are considered. Numerical methods introduced in this course include interpolation, curve fitting, solving (systems of) linear and nonlinear equations, eigenvalue problems, integration and solving ordinary and partial differential equations.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP316',
    'Microprocessor Systems & Interfacing',
    'Interfacing a microprocessor or microcontroller with external devices for real-time hardware control. Microcontroller hardware and software in real time applications; serial and parallel IO; timing generation; priority interrupt structures and servicing; bus timing. Interpretation and use of industry documentation and data sheets.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP317',
    'Software Engineering',
    'Discussion of software development activities, including software process models, analysis, design, implementation, testing, project management and advanced topics. Both traditional and object-oriented methods are considered.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP319',
    'Digital System Design',
    'Logic families and interfacing considerations for logic devices, VHDL; implementation techniques for combinational and sequential logic; introduction to finite state machines and design methodologies for synchronous and asynchronous sequential circuits; hazards, cycles and races; operation and interfacing of memory devices.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP320',
    'Physical Computing: Digital Interaction with the Analog World',
    'Design and construction of computational systems that interact with the physical world for applications such as home or experiment automation. Basics of electrical circuits, reading from analog and digital sensors, controlling analog and digital actuators, single board computers such as Arduino or Raspberry PI, analog components including diodes, transistors and operational amplifiers.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP321',
    'Data Visualization',
    'This course will provide participants an overview on how to visualize data to present large data sets in a meaningful way. Rigorous policy analysis must be based on evidence, but once you have gathered the evidence, it can be overwhelming to figure out how to present data in a meaningful way. This course offers instruction how to distill and interpret large amounts of information to highlight the key information. Learn to unlock the power of data through effective data visualization. Explains how to select the appropriate data sets for analysis, transform the data sets into usable formats, and verify that the sets are error-free. Review how to choose the right model for the specific type of analysis project, how to analyze the model, and present the results for decision making. Show how to solve numerous business problems by applying various tools and techniques. Data visualization and visual data mining tools, and real-world success stories using visual data mining.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP322',
    'Machine Learning',
    'With the rise of data science and big data fields, machine learning has gained further recognition as the key driver behind the successful advance of these fields. However, many recent entrants to the field can only utilize the variety of machine learning algorithms as black boxes. This course aims to empower students to effectively use and understand the primary approaches so as to be able to modify them for specific uses. Our focus is less on theory and more on practice. Students engage in hands-on implementation of some of the fundamental algorithms such as predictive modeling and clustering applied to real, open-ended problems.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP331',
    'Parallel Programming',
    'Parallel computers, or supercomputers or high-performance clusters are ubiquitous today in science and engineering. Parallel programming requires inventing new algorithms and programming techniques. This course will cover the fundamental paradigms of parallel programming, with an emphasis on problem solving and actual applications. The parallel programming concepts and algorithms will be illustrated via implementations in OpenMP and MPI (Message Passing Interface), as well as serial farming.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP340',
    'E-commerce',
    'This course deals with the development of the Internet and its impacts on business transactions. The course explains key concepts and trends associated with e-commerce and online business. Topics include the role of the Internet, electronic marketplace, online marketing, web analytics, privacy and security issues and electronic payments.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP351',
    'Quantum Computing',
    'Quantum computing offers the possibility of dramatic advances in computational power compared to the best computers we have today. In addition, novel quantum protocols such as teleportation and quantum cryptography have already been demonstrated. This course provides an introduction to this exciting and cutting-edge field. Topics include an overview of quantum theory, quantum algorithms, teleportation, secure quantum communication, Shors factoring algorithm, Grovers search protocol, quantum error correction and the latest state-of-the-art experiments. No prior knowledge of quantum mechanics is required.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP363',
    'Database I',
    'Introduction to database systems. Topics include data models, query languages, database design, recovery and concurrency, integrity and security.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP364',
    'Data Communications and Networks',
    'Data communication fundamentals, with an emphasis on the physical layer, and telecommunication networks, with an emphasis on the architectures and protocols will be studied. Topics include transmission media, digital data transmission, architectures of telecommunication networks.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP367',
    'Introduction to System Programming',
    'Contemporary ideas and techniques in system programming using the C language. Introduction to the Unix operating system and Unix commands. Directories and files, device control, signal handling, process intercommunication, shell programming in Unix. Using and implementing software tools: filters, pipelines, sorts, text patterns and others.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP372',
    'Computer Networks',
    'Introduction to computer communication networks. The OSI reference model. Protocols for error and flow control. Medium access protocols. Routing and congestion control. Internet architecture and protocols. Unix network programming.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP373',
    'Ethics and Professional Practice in Computer Science',
    'Introduction to ethics, computer reliability and safety, privacy, computer crime, intellectual property, impact of computers on work and society. Assessment includes written assignments and oral presentations.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP386',
    'Operating Systems',
    'Topics include operating system services, file systems, CPU scheduling, memory management, virtual memory, disk scheduling, deadlocks, concurrent processes, protection and distributed systems.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP395',
    'Directed Studies',
    'A detailed study of an aspect of computer science or computer electronics not available through the regular program. Irregular course.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP400',
    'Special Topics',
    'A detailed examination of a field or topic of interest not covered by the regular program. Irregular Course'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP400Q',
    'Android Programming',
    'A detailed examination of a field or topic of interest not covered by the regular program.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP400R',
    'Data Mining & Enterprise Computing',
    'A detailed examination of a field or topic of interest not covered by the regular program.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP411',
    'Computer Graphics',
    'The principles, algorithms, and techniques of computer graphics. Topics include introduction to graphics hardware, output primitives, two- and three-dimensional geometric transformations, three-dimensional object representation and viewing, illumination models and surface-rendering methods. Graphics software tools will be introduced in this course.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP412',
    'Algorithm Design and Analysis II',
    'A continuation of the study of computer algorithms. Amortized analysis, on-line and off-line algorithms, randomized algorithms, dynamic programming.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP414',
    'Foundations of Computing',
    'Deterministic and nondeterministic finite automata (DFAs and NFAs), regular expressions, context-free grammars, relationship of push-down automata and context-free grammars, definintion of the classes P and NP, NP-completeness (Cooks Theorem), standard NP-complete problems, reduction techniques, Turing machines, the halting problem.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP421',
    'Data Mining',
    'The course is aimed at an entry level study of information retrieval and data mining techniques. It is about how to find relevant information and subsequently extract meaningful patterns out of it. While the basic theories and mathematical models of information retrieval and data mining are covered, the course is primarily focused on practical algorithms of textual document indexing, relevance ranking, web usage mining, text analytics, as well as their performance evaluations. At the end of the course student are expected to understand the following: 1. The common algorithms and techniques for information retrieval (document indexing and retrieval, query processing, etc). 2. The quantitative evaluation methods for the IR systems and data mining techniques. 3. The popular probabilistic retrieval methods and ranking principles. 4. The techniques and algorithms existing in practical retrieval and data mining systems such as those in web search engines and recommender systems. 5. The challenges and existing techniques for the emerging topics of MapReduce, portfolio retrieval and online advertising.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP422',
    'Programming for Big Data',
    'The explosion of social media and the computerization of every aspect of social and economic activity resulted in creation of large volumes of mostly unstructured data: web logs, videos, speech recordings, photographs, e-mails, Tweets, and similar data. The key objective of this course is to familiarize the students with key information technologies used in manipulating, storing, and analyzing big data. We look at the basic tools for statistical analysis, R and Python, and some key methods of machine learning. We review MapReduce techniques for parallel processing, Hadoop, an open source framework for running MapReduce on Internet scale problems and HDFS, Hadoops Distributed File System. We teach Spark which emerged as the most important big data processing framework. We touch on tools that provide SQL-like access to unstructured data like Hive. We analyze so-called NoSQL storage solutions exemplified by Cassandra for their critical features: speed of reads and writes, and ability to scale to extreme volumes. We examine memory resident databases (VoltDB, SciDB) and graph databases (Ne4J). Students gain the ability to initiate and design highly scalable systems that can accept, store, and analyze large volumes of unstructured data in batch mode and/or real time. Most lectures are presented using Java examples. Some lectures use Python and R.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP423',
    'Text Retrieval and Search Engines',
    'Recent years have seen a dramatic growth of natural language text data, including web pages, news articles, scientific literature, emails, enterprise documents, and social media such as blog articles, forum posts, product reviews, and tweets. Text data are unique in that they are usually generated directly by humans rather than a computer system or sensors, and are thus especially valuable for discovering knowledge about people’s opinions and preferences, in addition to many other kinds of knowledge that we encode in text. This course will cover search engine technologies, which play an important role in any data mining applications involving text data for two reasons. First, while the raw data may be large for any particular problem, it is often a relatively small subset of the data that are relevant, and a search engine is an essential tool for quickly discovering a small subset of relevant text data in a large text collection. Second, search engines are needed to help analysts interpret any patterns discovered in the data by allowing them to examine the relevant original text data to make sense of any discovered pattern. You will learn the basic concepts, principles, and the major techniques in text retrieval, which is the underlying science of search engines.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP431',
    'Parallel Programming',
    'Parallel computers, or supercomputers or high-performance clusters are ubiquitous today in Science and Engineering. Parallel programming requires inventing new algorithms and programming techniques. This course will cover the fundamental paradigms of parallel programming, with an emphasis on problem solving and actual applications. The parallel programming concepts and algorithms will be illustrated via implementations in OpenMP and MPI (Message Passing Interface), as well as serial farming.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP460',
    'Applied Cryptography',
    'Algorithms and issues in applied cryptography. Topics include history of cryptography, block ciphers, stream ciphers, public-key encryption, digital signatures, and key management. Also, discussions of current issues in information security.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP461',
    'Introduction to Computational Aspects of Bio-informatics',
    'Introduction to the basic computational problems arising in molecular biology. Emphasis is on the development of efficient algorithms. Topics include sequence comparison, fragment assembly of DNA, physics and genetic mapping of DNA, genome rearrangements, molecular structure prediction. No background in biology is required.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP463',
    'Simulation',
    'Discrete and continuous simulations, queuing theory.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP464',
    'Selected Topics in Computer Hardware',
    'Topics may include computer classes and evolution, instruction set design, hardwired sequencer design, microprogramming, memory hierarchies, concurrency, multiple-processor systems, and fault-tolerant systems. Students will be required to design and build a computer, including the design of the instruction set and the control unit.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP465',
    'Database II',
    'This course covers advanced database management system design principles and techniques. Possible topics include access methods, query processing and optimization, transaction processing, distributed databases, deductive databases, object-relational databases, data warehousing, data mining, Web and semistructured data, search engines, etc.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP467',
    'Image Processing & Pattern Recognition',
    'Introduction to vision systems for image acquisition and display. Comprehensive coverage of image enhancement, segmentation, feature extraction and classification.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP468',
    'Artificial Intelligence',
    'Examination of current concepts and techniques in artificial intelligence and machine learning. Topics include knowledge representation, automated reasoning, machine learning and knowledge-based systems. Extensive use of case studies and current applications.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP469',
    'iPhone Application Programming',
    'Programming applications for the iPhone, iPad, and iPod platforms, using the Cocoa Touch framework on Mac OSX. Introduction to the programming language Objective-C. Interface development for mobile devices and dealing with different input modalities, web services, and memory management for mobile devices.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP470',
    'Android Programming',
    'How to write applications for the Android mobile devices using the Android Development Tools. Developing software with the Model-View-Controller paradigm. Knowledge of Java is required. The course project will be the development of an Android app.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP471',
    'Introduction to Compiling',
    'Principles and design techniques for compilers. Compiler organization, compiler writing tools, scanning, parsing, semantic analysis, run-time storage organization, memory management, code generation and optimization. Students implement a substantial portion of a compiler in a project.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP472',
    'Programming Languages',
    'Overview of programming languages, virtual machines, history of programming languages, programming language semantics, programming language design, introduction to language translation, declarations and types, abstraction mechanism, functional programming, logic programming, object-oriented programming.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP476',
    'Internet Computing',
    'The architecture of the Internet. Client-server programming, technologies of the web (URLs, HTML, HTTP, applets, etc.) Introduction to building web applications and server-side programming.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP480',
    'Wireless Communication & Networks',
    'This course introduces fundamental concepts of wireless networks. Topics include wireless communication overview, physical layer, wireless concepts and protocols including TCP over wireless; cellular standards, WIFI WIMax, and Bluetooth standards; applications such as personal area networks and sensor networks; other issues such as mobile communication security.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP493',
    'Directed Research Project I',
    'An in-depth investigation of a computer science subject under faculty supervision, including the submission of a final report. Irregular course.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP494',
    'Directed Research Project II',
    'An in-depth investigation of a computer science subject under faculty supervision, including the submission of a formal report. Irregular course.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP495',
    'Directed Studies',
    'A detailed study of an aspect of computer science or computer electronics not available through the regular program. Irregular course.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP496',
    'Interdisciplinary Design Project I',
    'This course gives students experience working in a group setting to solve a substantial problem that may span several areas of Computer Science, Electronics, Physics or Photonics. Students will define the requirements of the project, develop a solution plan, produce a design, and present their work using written and oral reports. (Irregular course)'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP497',
    'Interdisciplinary Design Project II',
    'This course gives students experience working in a group setting to solve a substantial problem that may span several areas of Computer Science, Electronics, Physics or Photonics. Students will continue the project begun in the preceding term. They will implement their design and demonstrate their work using written, oral, and video reports. (Irregular course)'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP600',
    'Practical Algorithm Design',
    'The techniques of algorithm design form one of the core practical technologies of computer science. This course focuses on advanced techniques for designing and analysing algorithms, and explores their use in a variety of application areas. Topics include: sorting and search algorithms, graph traversal algorithms, combinatorial search, heuristics methods, and dynamic programming, intractable problems. Students learn the skill of recognizing computational complexities of computing problems and designing solutions for them.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP601',
    'Seminar in Technology Entrepreneurship',
    'This seminar focuses on the fundamentals of technology entrepreneurship. It involves taking a technology idea and finding a high-potential commercial opportunity, gathering resources such as talent and capital, figuring out how to sell and market the idea, and managing rapid growth. It also involves bringing incorporating a new technology idea into an existing business. There will be guest lecturers from the industry.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP610',
    'Data Analysis',
    'Data analysis is a burgeoning field that allows organizations to discover patterns in data to help explain current behaviours or predict future outcomes. In this course, students learn the theories, techniques and practices involved in modern data analysis in order to effectively collect, process, interpret and use data in decision making. The course utilizes case studies from fields such as finance and statistics to expose students to topics including data collection, storage, processing, representation, and reporting, and also further develop their decision-making skills using decision trees and artificial intelligence.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP612',
    'Data Management and Analysis',
    'This course provides students with a broad overview of the concepts, techniques and tools of modern data management and analysis. It compares traditional relational databases with an alternative model (a NoSQL database), and explains how to choose the most appropriate means of storing and managing data, depending on the size and structure of a particular dataset and its intended use. Students are guided through the basics of using Hadoop with MapReduce and Spark. In data analysis, both theoretical concepts and algorithms in Association Mining, Classification, Clustering, etc., and a range of advanced applications, including Link Analysis, Recommender Systems, Computational Advertising, etc., are introduced.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP614',
    'Applied Cryptography',
    'Algorithms and issues in applied cryptography. Topics include block ciphers, stream ciphers, public-key cryptography, AES, elliptic curve cryptosystems, blockchain, digital signatures, zero knowledge proofs. Also, current issues in information security such as privacy enhancing technologies and post quantum cryptography.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP620',
    'Data Mining Programming',
    'Multiple organizations across multiple industries (e.g., finance, retail, manufacturing, communication) are mining and analyzing incredibly large sets of data in order to predict consumer behaviour and trends. In this course, students use the principles of data mining and practical knowledge to visualize and analyze data using data mining software such as Weka.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP621',
    'Data Mining Mobile Devices',
    'With today’s consumers spending more time on their mobiles than on their PC, new methods of empirical stochastic modeling have emerged that can provide marketers with detailed information about the products, content, and services their customers’ desire. This course builds on Data Analysis by focusing explicitly on the unique data offered by mobile devices. Students learn about the types of data that can be mined from mobile devices including analyzing Wi-Fi and GPS data from websites and mobile applications. Other topics include: modeling mined data via artificial intelligence software and monetizing mobile devices’ desires and preferences.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP630',
    'Enterprise Computing',
    'Enterprise computing offers integrated solutions to organizations that need help managing a variety of problems including software development, resource management and data analytics. This course extends traditional Computer Science education through a practical skills-based application focused on enterprise computing which integrates IT management and application development. Students examine the principles, techniques and practices in modern enterprise computing with a focus on backend business logic computing and the technical foundation of data analysis. Students will learn to manage all aspects of enterprise computing solutions including security, user experience, optimization, and distributed databases. Practical knowledge is further developed through lab work, case studies and guest-lectures of IT managers.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP631',
    'Parallel Programming',
    'Parallel computers, or supercomputers or high-performance clusters are ubiquitous today in science and engineering. Parallel programming requires inventing new algorithms and programming techniques. This course covers the paradigms of parallel programming, with an emphasis on problem solving and actual applications. The parallel programming concepts and algorithms are illustrated via implementations in OpenMP and MPI (Message Passing Interface), as well as serial farming.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP640',
    'Machine Learning',
    'Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. This course focuses on machine learning, data mining, and statistical pattern recognition. Topics include supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks) and unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning). Students work with variety of learning algorithms and evaluate which are most likely to be successful.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP650',
    'User Interface Design and Implementation',
    'The user interface, also called UI or user experience, is the “front end” of a website, computer application, or software program that people interact with. Competitive advantage can be won or lost depending on the design of the user interface. To be effective, modern software application designs must support not only the required functionality but also fully engage users. Throughout this course, students apply proven user interface design practices to gather requirements, reduce user input errors, and provide intuitive navigation pathways through complex applications to ensure usability.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP669',
    'iPhone Application Programming',
    'Apple iPhones are one of the most popular smartphones on the market today, with thousands of applications downloaded every day. This course provides students with the knowledge to develop applications for iPhones, iPads, and iPods, using the Cocoa Touch framework on iOS and introducing students to the programming language Swift. More specifically, students learn how to develop interfaces for mobile devices and the challenges faced when developing applications that use different input modalities. Other topics include web services and memory management for mobile devices.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP670',
    'Android Application Programming',
    'As the worldwide smartphone market continues to grow, so does the demand for mobile applications. This course provides students with the skills for creating and deploying applications for mobile devices using Android, the most widely used operating system. With an emphasis on the Model-View-Controller paradigm this course provides students with the foundational knowledge that underlies many popular programming languages. The course cumulates with the development of an original Android application. Knowledge of Java is required.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP680',
    'Capstone Project',
    'This course is available only to students in the Co-Operative Education Option and will be completed in the term following their co-op terms. Students will complete a major project that integrates their academic and work experience.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP681',
    'Directed Studies',
    'Individual study of a special topic not offered in existing courses at an advanced level under the supervision of a faculty member or other supervisor approved by the Department. The topics and evaluation scheme must be approved by the Department.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP682',
    'Special Topics',
    'This course features a detailed examination of a special topic not covered by the Departments regular course offerings.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP683',
    'Graduate Project',
    'This course is designed for students who take the course-based option in the Master of Applied Computing program. The instructor selects topics for study. The course material is presented through lectures, and possibly guest-speaker seminars. Students, with approval from the instructor, select a topic for an in-depth study. Students have the option to ask a full-time faculty member to supervise their project, in consultation with the instructor. Project topics might include a new contribution to a scientific area, or computer code to implement solution to a computing problem. The students performance is evaluated based on course attendance, the written report, and oral presentations.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP685',
    'Cyber Attack and Defense',
    'This course focuses on both the principles and practice in computer security. It provides an introduction to fundamental principles of computer systems and network security. It also covers the best practices of computer systems and network security protection and defense. The roadmap for the course includes seven main sections, including security objectives, vulnerabilities, attacks and exploitation, wireless security, web application security, defense and countermeasures, and incident handling and forensic investigation. Specifically, it first covers security objectives such as confidentiality, data integrity, authentication, authorization, access control, availability, and non-repudiation. Also, it covers the fundamental theories of vulnerabilities in software, computer system, network protocols, cryptographic techniques and social engineering. It then covers various security protection and defense mechanisms, including major security protocols and standards, firewalls, intrusion detection, wireless security, and web application security. It also discusses the latest cutting-edge insidious attack vectors, and the patterns of denial-of-service attacks. This course also presents the understanding tools needed to defend against attackers maintaining access and covering their tracks. This course examines and reviews various types of hacking tools as well as ways to harden the system or application against these attacks.'
);

INSERT INTO Courses (CourseCode, CourseName, CourseDesc) VALUES (
    'CP699',
    'Masters Thesis',
    'Students will complete a thesis based on original research and defend it before an examining committee.'
);

-- Reviews
INSERT INTO Reviews (UserID, CourseID, Rating, Comment, Workload, GroupWork, IsCompleted, GradeAchieved, DateEdited) VALUES (
    1,
    21,
    9,
    'Good course where you gain insight into methods to approach problems differently with the goal of parallelizing them.',
    7,
    TRUE,
    TRUE,
    11.1,
    date()
);