document.addEventListener('DOMContentLoaded', function() {
    // Sample data for student dashboard
    const studentData = {
        enrolledCourses: [
            {
                id: 1,
                title: 'Introduction to Programming',
                instructor: 'Prof. Smith',
                progress: 65,
                image: 'assets/images/course1.jpg',
                lastAccessed: '2 days ago'
            },
            {
                id: 2,
                title: 'Web Development',
                instructor: 'Prof. Johnson',
                progress: 85,
                image: 'assets/images/course2.jpg',
                lastAccessed: '1 day ago'
            },
            {
                id: 3,
                title: 'Database Systems',
                instructor: 'Prof. Williams',
                progress: 45,
                image: 'assets/images/course3.jpg',
                lastAccessed: '3 days ago'
            }
        ],
        assignments: [
            {
                id: 1,
                title: 'Programming Assignment 3',
                course: 'Introduction to Programming',
                due: 'tomorrow',
                status: 'pending'
            },
            {
                id: 2,
                title: 'Web Project',
                course: 'Web Development',
                due: 'in 3 days',
                status: 'pending'
            },
            {
                id: 3,
                title: 'Database Design',
                course: 'Database Systems',
                due: 'in 1 week',
                status: 'pending'
            }
        ],
        announcements: [
            {
                id: 1,
                title: 'Web Development Class Canceled',
                content: 'The Web Development class scheduled for tomorrow has been canceled.',
                author: 'Prof. Smith',
                time: '2 hours ago'
            },
            {
                id: 2,
                title: 'New Course Material Available',
                content: 'New lecture slides and exercises have been uploaded for Database Systems.',
                author: 'Prof. Johnson',
                time: '1 day ago'
            }
        ]
    };

    // Load enrolled courses
    function loadEnrolledCourses() {
        const coursesContainer = document.getElementById('enrolledCourses');
        if (coursesContainer) {
            coursesContainer.innerHTML = studentData.enrolledCourses.map(course => `
                <div class="course-card" data-course-id="${course.id}">
                    <img src="${course.image}" alt="${course.title}" class="course-image">
                    <div class="course-info">
                        <h4>${course.title}</h4>
                        <p>${course.instructor}</p>
                        <div class="progress-container">
                            <div class="progress">
                                <div class="progress-bar" style="width: ${course.progress}%"></div>
                            </div>
                            <span>${course.progress}% Complete</span>
                        </div>
                        <div class="course-footer">
                            <small>Last accessed: ${course.lastAccessed}</small>
                            <button class="btn btn-sm btn-primary">Continue</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Load student assignments
    function loadStudentAssignments() {
        const assignmentsContainer = document.getElementById('studentAssignments');
        if (assignmentsContainer) {
            assignmentsContainer.innerHTML = studentData.assignments.map(assignment => `
                <div class="assignment-card" data-assignment-id="${assignment.id}">
                    <div class="assignment-info">
                        <h4>${assignment.title}</h4>
                        <p>${assignment.course}</p>
                        <span class="due-date">Due ${assignment.due}</span>
                    </div>
                    <div class="assignment-status ${assignment.status}">
                        ${assignment.status === 'completed' ? 'Submitted' : 'Pending'}
                    </div>
                </div>
            `).join('');
        }
    }

    // Load student announcements
    function loadStudentAnnouncements() {
        const announcementsContainer = document.getElementById('studentAnnouncements');
        if (announcementsContainer) {
            announcementsContainer.innerHTML = studentData.announcements.map(announcement => `
                <div class="announcement-card" data-announcement-id="${announcement.id}">
                    <h4>${announcement.title}</h4>
                    <p>${announcement.content}</p>
                    <div class="announcement-footer">
                        <span>${announcement.author}</span>
                        <span>${announcement.time}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Course card click
        document.addEventListener('click', function(e) {
            if (e.target.closest('.course-card')) {
                const courseId = e.target.closest('.course-card').getAttribute('data-course-id');
                const course = studentData.enrolledCourses.find(c => c.id == courseId);
                alert(`Opening course: ${course.title}`);
            }
            
            // Assignment card click
            if (e.target.closest('.assignment-card')) {
                const assignmentId = e.target.closest('.assignment-card').getAttribute('data-assignment-id');
                const assignment = studentData.assignments.find(a => a.id == assignmentId);
                alert(`Assignment: ${assignment.title}\nCourse: ${assignment.course}\nDue: ${assignment.due}`);
            }
        });
    }

    // Initialize student dashboard
    function initStudentDashboard() {
        loadEnrolledCourses();
        loadStudentAssignments();
        loadStudentAnnouncements();
        setupEventListeners();
    }

    initStudentDashboard();
});
