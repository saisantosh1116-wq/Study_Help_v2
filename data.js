// --- data.js (S2 CSE C - Master Template) ---

const DEFAULT_DB = {
    globalReview: "Welcome to the S2 CSE C End-Semester Dashboard. Customize your own study plan and track your progress here.",
    todos: [],
    dailyChecklist: [],
    subjects: [
        {
            id: "subj-oop",
            name: "Object Oriented Programming (Java)",
            courseCode: "23CSE111",
            examDate: "2026-05-21",
            syllabus: [
                { id: "oop-1", title: "1. Intro to Java", status: "pending", notes: "" },
                { id: "oop-2", title: "2. Class & Objects", status: "pending", notes: "" },
                { id: "oop-3", title: "3. Constructors", status: "pending", notes: "" },
                { id: "oop-4", title: "4. Static Members", status: "pending", notes: "" },
                { id: "oop-5", title: "5. Scope of Variables", status: "pending", notes: "" },
                { id: "oop-6", title: "6. Composition of Classes", status: "pending", notes: "" },
                { id: "oop-7", title: "7. Inheritance (and 7.1 Types)", status: "pending", notes: "" },
                { id: "oop-8", title: "8. Polymorphism", status: "pending", notes: "" },
                { id: "oop-9", title: "9. Abstraction", status: "pending", notes: "" },
                { id: "oop-10", title: "10. UML Diagrams", status: "pending", notes: "" },
                { id: "oop-11", title: "11. Exception Handling", status: "pending", notes: "" },
                { id: "oop-12", title: "12. File Handling", status: "pending", notes: "" }
            ]
        },


    {
        id: "subj-misc",
        name: "Miscellaneous",
        courseCode: "GEN-101",
        examDate: "2099-11-01", // Format: YYYY-MM-DD
        syllabus: [
            { id: "misc-1", title: "General Notes", status: "pending", notes: "" }
        ]
    },
        
        {
            id: "subj-linear",
            name: "Linear Algebra",
            courseCode: "23MAT117",
            examDate: "2026-06-04",
            syllabus: [
                { id: "lin-1", title: "Chapter 1: 1.1, 1.2", status: "pending", notes: "" },
                { id: "lin-4", title: "Chapter 4: 4.1 to 4.9", status: "pending", notes: "" },
                { id: "lin-5", title: "Chapter 5: 5.1, 5.2", status: "pending", notes: "" },
                { id: "lin-6", title: "Chapter 6: 6.1 to 6.4", status: "pending", notes: "" },
                { id: "lin-7", title: "Chapter 7: 7.1 (Orthogonal matrices), 7.2", status: "pending", notes: "" },
                { id: "lin-8", title: "Chapter 8: 8.1 to 8.4", status: "pending", notes: "" }
            ]
        },
        {
            id: "subj-math",
            name: "Discrete Mathematics",
            courseCode: "23MAT116",
            examDate: "2026-05-26",
            syllabus: [
                { id: "math-1a", title: "Unit 1: Logic (Equivalence, Predicate, Theorem Proving)", status: "pending", notes: "" },
                { id: "math-1b", title: "Unit 1: Recursion (Definitions, Algorithms)", status: "pending", notes: "" },
                { id: "math-1c", title: "Unit 1: Counting (Basics, Pigeonhole, Permutations/Combinations)", status: "pending", notes: "" },
                { id: "math-2a", title: "Unit 2: Relations (Closure, Partial Ordering, Equivalence)", status: "pending", notes: "" },
                { id: "math-2b", title: "Unit 2: Recurrence (Homogeneous, Divide/Conquer)", status: "pending", notes: "" },
                { id: "math-2c", title: "Unit 2: Methods (Generating Functions, Inclusion-Exclusion)", status: "pending", notes: "" },
                { id: "math-3a", title: "Unit 3: Graph Foundations (Isomorphism, Matrices, Degrees, Walks)", status: "pending", notes: "" },
                { id: "math-3b", title: "Unit 3: Shortest Path, Euler, Hamilton Graphs", status: "pending", notes: "" },
                { id: "math-3c", title: "Unit 3: Optimization (Chinese Postman, TSP approximations, Closest Neighbour)", status: "pending", notes: "" }
            ]
        },
        {
            id: "subj-physics",
            name: "Modern Physics",
            courseCode: "23PHY115",
            examDate: "2026-06-02",
            syllabus: [
                { id: "phy-ch1", title: "Unit 1: Blackbody radiation, Compton/PE effect", status: "pending", notes: "" },
                { id: "phy-ch2", title: "Unit 2: Atomic Models (Thomson, Bohr, Rutherford, Spectra, Correspondence)", status: "pending", notes: "" },
                { id: "phy-ch3", title: "Unit 3: Quantum Mechanics (Schrödinger Equations)", status: "pending", notes: "" },
                { id: "phy-ch4", title: "Unit 4: Applications of QM (Potential/Square wells, H.O.)", status: "pending", notes: "" },
                { id: "phy-laser", title: "Unit 4: LASER (Spontaneous/Stimulated emission, Population inversion)", status: "pending", notes: "" },
                { id: "phy-ch5", title: "Unit 5: Quantum Computing", status: "pending", notes: "" }
            ]
        },
        {
            id: "subj-adm",
            name: "Glimpses of Glorious India",
            courseCode: "22ADM111",
            examDate: "2026-05-30",
            syllabus: [
                { id: "adm-1", title: "Chapter 1: Vision and Mission of IKS", status: "pending", notes: "" },
                { id: "adm-2", title: "Chapter 2: Fear Chapter", status: "pending", notes: "" },
                { id: "adm-3", title: "Chapter 3: Chanakya", status: "pending", notes: "" },
                { id: "adm-4", title: "Chapter 4: Bhagavadgita - Soldier to...", status: "pending", notes: "" },
                { id: "adm-5", title: "Chapter 5: Lessons in Yoga", status: "pending", notes: "" },
                { id: "adm-6", title: "Chapter 6: Ultimate Reality: Different Perspectives", status: "pending", notes: "" },
                { id: "adm-7", title: "Chapter 7: Weaving a New Future using Ancient threads", status: "pending", notes: "" },
                { id: "adm-8", title: "Chapter 8: Legacy of Knowledge and Learning in India", status: "pending", notes: "" },
                { id: "adm-9", title: "Chapter 9: Ayurveda", status: "pending", notes: "" },
                { id: "adm-10", title: "Chapter 10: Indian Calendar Systems", status: "pending", notes: "" },
                { id: "adm-11", title: "Chapter 11: In the mirror of Culture", status: "pending", notes: "" },
                { id: "adm-12", title: "Chapter 12: Revisiting Indian Historiography", status: "pending", notes: "" }
            ]
        }
    ],
    assignments: [
        { id: "a_1", title: "Discrete Mathematics - Class Test", subjectId: "subj-math", dueDate: "2026-05-04" },
        { id: "a_2", title: "Glimpses of Glorious India - MaOm", subjectId: "subj-adm", dueDate: "2026-05-06" },
        { id: "a_3", title: " Rough Book Submission", subjectId: "subj-adm", dueDate: "2026-05-07" },
        { id: "a_4", title: "Linear Algebra - Class Test", subjectId: "subj-linear", dueDate: "2026-05-11" }
    ],
    resources: [
       
    
    // DISCRETE MATHEMATICS (subj-math)
    { 
        id: "res-math-logic-set", 
        subjectId: "subj-math", 
        title: "Textbook", 
        url: "https://drive.google.com/drive/folders/1wxSYfk7BoiGL5pQQjCkCDKM8tTwoONMn?usp=sharing", 
        type: "link" 
    },
    
    // MODERN PHYSICS (subj-physics)
    { 
        id: "res-phy-quantum-notes", 
        subjectId: "subj-physics", 
        title: "Notes", 
        url: "https://drive.google.com/drive/folders/1KYtBzDTpyGGG_SDYOeth4hLxqWZlnXDo?usp=sharing", 
        type: "link" 
    },
    { 
        id: "res-linear-notes", 
        subjectId: "subj-linear", 
        title: "Notes", 
        url: "https://drive.google.com/drive/folders/1WKsZQZy7-ijDs8IxQGMRlW0O8jcqS9oZ?usp=sharing", 
        type: "link" 
    },
    
    // --- END OF DRIVE RESOURCES ---

        
    { 
        id: "res-dm-mit", 
        subjectId: "subj-math", 
        title: "MIT 6.042J: Mathematics for Computer Science", 
        url: "https://ocw.mit.edu/courses/6-1200j-mathematics-for-computer-science-spring-2024/", 
        type: "link" 
    },
    { 
        id: "res-dm-book", 
        subjectId: "subj-math", 
        title: "Discrete Mathematics: An Open Introduction", 
        url: "https://discrete.openmathbooks.org/", 
        type: "link" 
    },
    { 
        id: "res-dm-bazett", 
        subjectId: "subj-math", 
        title: "Dr. Trefor Bazett: Discrete Math Full Course", 
        url: "https://www.youtube.com/playlist?list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKk9", 
        type: "link" 
    },
    { 
        id: "res-dm-brehm", 
        subjectId: "subj-math", 
        title: "Kimberly Brehm: Discrete Math I & II", 
        url: "https://www.youtube.com/playlist?list=PLl-gb0E4MII28GykmtuAfLiVV6_O6G82e", 
        type: "link" 
    },
    { 
        id: "res-dm-gfg", 
        subjectId: "subj-math", 
        title: "GeeksforGeeks Discrete Math Tutorial", 
        url: "https://www.geeksforgeeks.org/discrete-mathematics-tutorial/", 
        type: "link" 
    },

        // Add these within the resources array of your DEFAULT_DB
    { 
        id: "res-la-3b1b", 
        subjectId: "subj-linear", 
        title: "3Blue1Brown: Essence of Linear Algebra", 
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MfeQ2lzNVdqzBWDXle6", 
        type: "link" 
    },
    { 
        id: "res-la-strang", 
        subjectId: "subj-linear", 
        title: "Gilbert Strang: MIT 18.06 Linear Algebra", 
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", 
        type: "link" 
    },
    { 
        id: "res-la-axler", 
        subjectId: "subj-linear", 
        title: "Sheldon Axler: Linear Algebra Done Right", 
        url: "https://linear.axler.net/", 
        type: "link" 
    },
    { 
        id: "res-la-austin", 
        subjectId: "subj-linear", 
        title: "David Austin: Understanding Linear Algebra (Interactive)", 
        url: "https://understandinglinearalgebra.org/", 
        type: "link" 
    },

    // Add these within the resources array of your DEFAULT_DB
    { 
        id: "res-phy-susskind", 
        subjectId: "subj-physics", 
        title: "Leonard Susskind: Modern Physics - Quantum Mechanics", 
        url: "https://www.youtube.com/playlist?list=PLpGHT1n4-mAtwjv8eN_Ssy9Iatvlp9K-0", 
        type: "link" 
    },
    { 
        id: "res-phy-relativity", 
        subjectId: "subj-physics", 
        title: "Stanford/Coursera: Understanding Einstein - Special Relativity", 
        url: "https://www.coursera.org/learn/einstein-relativity", 
        type: "link" 
    },
    { 
        id: "res-phy-tipler", 
        subjectId: "subj-physics", 
        title: "Tipler & Llewellyn: Modern Physics (Textbook)", 
        url: "https://web.pdx.edu/~pmoeck/books/Tipler_Llewellyn.pdf", 
        type: "link" 
    },
    { 
        id: "res-phy-zwiebach", 
        subjectId: "subj-physics", 
        title: "Barton Zwiebach: MIT 8.04 Quantum Physics I", 
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/", 
        type: "link" 
    },
    { 
        id: "res-phy-geneva", 
        subjectId: "subj-physics", 
        title: "University of Geneva: Particle Physics - An Introduction", 
        url: "https://www.coursera.org/learn/particle-physics", 
        type: "link" 
    },
        
        { // HEYYYYYYYYYY, YOU !!!! Yes YOUU!! , HERE!!!!!!!! Change the link  your class link HERE !!!!!!!!!!!!!!!!!!!!!  
        // Im taking a bow to you for trying to help others , All the best for your End Sem, you kind soul from another batch...
            id: "r_1", 
            subjectId: "subj-oop", 
            title: "Resources by Mam", 
            url: "https://amritauniv-my.sharepoint.com/personal/sunithaev_am_amrita_edu/SitePages/Object-Oriented-Programming-(23CSE111-,-23AID111).aspx?ga=1", 
            type: "link" 
        },
        { 
            // HEYYYYYYYYYY, YOU !!!! Yes YOUU!! , HERE!!!!!!!! Change the link  your class link HERE !!!!!!!!!!!!!!!!!!!!!  
        // Im taking a bow to you for trying to help others , All the best for your End Sem, you kind soul from another batch
            id: "r_3", 
            subjectId: "subj-math", 
            title: "Official OneDrive Folder", 
            url: "https://amritauniv-my.sharepoint.com/personal/sreedeepcd_am_amrita_edu/_layouts/15/onedrive.aspx?csf=1&web=1&e=EeE9Ki&CID=138cc40e%2Dae0f%2D476a%2D9ae0%2D6c33c62a8e1c&id=%2Fpersonal%2Fsreedeepcd%5Fam%5Famrita%5Fedu%2FDocuments%2F25%5F26%5FDM%5F23MAT116%5FStudents&FolderCTID=0x0120009EC4F057CCB422449D6330491AFF2B72&view=0", 
            type: "link" 
        },
        { // Credits go to Nayantheerth from S2 CSE C for making this ADM textbook extracted version
            id: "r_5", 
            subjectId: "subj-adm", 
            title: "Additional Text Extraction", 
            url: "https://drive.google.com/drive/folders/1ofer5HDQoqTFGdOJD4WQWl_nRiiDHfZO", 
            type: "link" 
        },
        
    { 
        id: "res-java-helsinki", 
        subjectId: "subj-oop", 
        title: "University of Helsinki: Java Programming II (MOOC.fi)", 
        url: "https://java-programming.mooc.fi/", 
        type: "link" 
    },
    { 
        id: "res-java-refactoring", 
        subjectId: "subj-oop", 
        title: "Refactoring.Guru: Java Design Patterns", 
        url: "https://refactoring.guru/design-patterns/java", 
        type: "link" 
    },
    { 
        id: "res-java-duke", 
        subjectId: "subj-oop", 
        title: "Duke University: OOP in Java", 
        url: "https://www.coursera.org/specializations/object-oriented-programming-java", 
        type: "link" 
    },
    { 
        id: "res-java-cave", 
        subjectId: "subj-oop", 
        title: "Cave of Programming: Advanced Java", 
        url: "https://www.youtube.com/playlist?list=PL47E2EAB50F396894", 
        type: "link" 
    },
    { 
        id: "res-java-effective", 
        subjectId: "subj-oop", 
        title: "Effective Java (Joshua Bloch) Reference", 
        url: "https://github.com/jbloch/effective-java-3e-source-code", 
        type: "link" 
    }
    ]
};

const NexusDB = {
    init() {
        if (!localStorage.getItem('nexus_db')) {
            localStorage.setItem('nexus_db', JSON.stringify(DEFAULT_DB));
        }
    },
    get() {
        return JSON.parse(localStorage.getItem('nexus_db'));
    },
    save(data) {
        localStorage.setItem('nexus_db', JSON.stringify(data));
    },
    getDaysLeft(dateString) {
        const targetDate = new Date(dateString);
        const today = new Date();
        const diffTime = targetDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
};

// Initialize DB immediately
NexusDB.init();
