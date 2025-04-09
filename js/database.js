// This would typically be replaced with actual database connections in a real application
// For this demo, we'll use a mock database with sample data

const database = {
    users: [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
            avatar: 'assets/images/admin-avatar.jpg',
            joined: '2023-01-15'
        },
        {
            id: 2,
            name: 'Prof. John Smith',
            email: 'instructor@example.com',
            password: 'instructor123',
            role: 'instructor',
            avatar: 'assets/images/instructor-avatar.jpg',
            joined: '2023-02-20',
            bio: 'Senior instructor with 10 years of experience',
            courses: [1, 2]
        },
        {
            id: 3,
            name: 'John Doe',
            email: 'student@example.com',
            password: 'student123',
            role: 'student',
            avatar: 'assets/images/user-avatar.jpg',
            joined: '2023-03-10',
            enrolledCourses: [1, 3],
            progress: [
                { courseId: 1, progress: 65 },
                { courseId: 3, progress: 45 }
            ]
        }
    ],
    courses: [
        {
            id: 1,
            title: 'Introduction to Programming',
            description: 'Learn the fundamentals of programming with Python.',
            instructor: 2,
            category: 'Programming',
            image: 'assets/images/course1.jpg',
            price: 49.99,
            duration: '8 weeks',
            students: 245,
            rating: 4.5,
            reviews: 123,
            createdAt: '2023-02-25',
            status: 'published',
            curriculum: [
                {
                    week: 1,
                    title: 'Getting Started',
                    lessons: [
                        'Introduction to Programming',
                        'Setting Up Your Environment',
                        'First Python Program'
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Web Development Fundamentals',
            description: 'Build modern websites with HTML, CSS, and JavaScript.',
            instructor: 2,
            category: 'Web Development',
            image: 'assets/images/course2.jpg',
            price: 59.99,
            duration: '10 weeks',
            students: 180,
            rating: 4.7,
            reviews: 95,
            createdAt: '2023-03-15',
            status: 'published'
        },
        {
            id: 3,
            title: 'Database Systems',
            description: 'Learn SQL and database design principles.',
            instructor: 1,
            category: 'Data Science',
            image: 'assets/images/course3.jpg',
            price: 39.99,
            duration: '6 weeks',
            students: 120,
            rating: 4.3,
            reviews: 45,
            createdAt: '2023-04-05',
            status: 'published'
        }
    ],
    announcements: [
        {
            id: 1,
            title: 'System Maintenance',
            content: 'The platform will be down for maintenance on Friday night.',
            author: 1,
            createdAt: '2023-05-10',
            audience: 'all'
        },
        {
            id: 2,
            title: 'New Course Available',
            content: 'Check out our new course on Mobile App Development!',
            author: 2,
            createdAt: '2023-05-08',
            audience: 'students'
        }
    ]
};

// Database functions
const db = {
    // User functions
    getUserByEmail: function(email) {
        return this.users.find(user => user.email === email);
    },
    
    getUserById: function(id) {
        return this.users.find(user => user.id === id);
    },
    
    validateUser: function(email, password) {
        const user = this.getUserByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    },
    
    // Course functions
    getAllCourses: function() {
        return this.courses;
    },
    
    getCourseById: function(id) {
        return this.courses.find(course => course.id === id);
    },
    
    getCoursesByInstructor: function(instructorId) {
        return this.courses.filter(course => course.instructor === instructorId);
    },
    
    // Announcement functions
    getAnnouncements: function() {
        return this.announcements;
    },
    
    // Other utility functions
    getInstructorName: function(id) {
        const user = this.getUserById(id);
        return user ? user.name : 'Unknown Instructor';
    }
};

// Make database available globally for demo purposes
window.db = db;

// Initialize database (in a real app, this would connect to a real database)
function initDatabase() {
    console.log('Database initialized with sample data');
}

initDatabase();
