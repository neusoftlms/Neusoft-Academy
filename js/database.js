'use strict';

const Database = {
    init: function() {
        if (!localStorage.getItem('users')) {
            const initialUsers = [
                {
                    id: 1,
                    name: "Admin User",
                    email: "admin@neusoftacademy.com",
                    password: "admin123",
                    role: "admin",
                    registeredAt: new Date(2023, 0, 15).toISOString()
                },
                {
                    id: 2,
                    name: "Instructor One",
                    email: "instructor@neusoftacademy.com",
                    password: "instructor123",
                    role: "instructor",
                    registeredAt: new Date(2023, 1, 20).toISOString()
                },
                {
                    id: 3,
                    name: "Student One",
                    email: "student@neusoftacademy.com",
                    password: "student123",
                    role: "student",
                    registeredAt: new Date(2023, 2, 10).toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(initialUsers));
        }

        if (!localStorage.getItem('courses')) {
            const initialCourses = [
                {
                    id: 1,
                    title: "Introduction to Web Development",
                    instructorId: 2,
                    category: "technology",
                    description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
                    image: "https://via.placeholder.com/800x450",
                    students: [3],
                    createdAt: new Date(2023, 2, 1).toISOString(),
                    modules: [
                        {
                            id: 1,
                            title: "Getting Started",
                            contents: [
                                { id: 1, type: "video", title: "Welcome to the Course", duration: 5, url: "https://example.com/video1", status: "published" },
                                { id: 2, type: "document", title: "Course Syllabus", duration: 10, url: "https://example.com/doc1", status: "published" }
                            ]
                        }
                    ]
                }
            ];
            localStorage.setItem('courses', JSON.stringify(initialCourses));
        }

        if (!localStorage.getItem('enrollments')) {
            localStorage.setItem('enrollments', JSON.stringify([
                { userId: 3, courseId: 1, progress: 25, enrolledAt: new Date().toISOString() }
            ]));
        }
    },

    safeParse: function(jsonString) {
        try {
            return jsonString ? JSON.parse(jsonString) : null;
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            return null;
        }
    },

    getUsers: function() {
        return this.safeParse(localStorage.getItem('users')) || [];
    },

    addUser: function(user) {
        const users = this.getUsers();
        user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        user.registeredAt = new Date().toISOString();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    },

    getCourses: function() {
        return this.safeParse(localStorage.getItem('courses')) || [];
    },

    addCourse: function(course) {
        const courses = this.getCourses();
        course.id = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
        course.createdAt = new Date().toISOString();
        course.students = [];
        course.modules = [];
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
        return course;
    },

    getEnrollments: function() {
        return this.safeParse(localStorage.getItem('enrollments')) || [];
    },

    enrollUser: function(userId, courseId) {
        const enrollments = this.getEnrollments();
        const existing = enrollments.find(e => e.userId === userId && e.courseId === courseId);
        
        if (!existing) {
            enrollments.push({
                userId,
                courseId,
                progress: 0,
                enrolledAt: new Date().toISOString()
            });
            localStorage.setItem('enrollments', JSON.stringify(enrollments));
            
            const courses = this.getCourses();
            const course = courses.find(c => c.id === courseId);
            if (course && !course.students.includes(userId)) {
                course.students.push(userId);
                localStorage.setItem('courses', JSON.stringify(courses));
            }
        }
    }
};

Database.init();
