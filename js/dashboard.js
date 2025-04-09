document.addEventListener('DOMContentLoaded', function() {
    // Sample data for dashboard
    const dashboardData = {
        courses: [
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
                description: 'Implement a Python program to solve the given problem.'
            },
            {
                id: 2,
                title: 'Web Project',
                course: 'Web Development',
                due: 'in 3 days',
                description: 'Create a responsive website using Bootstrap.'
            },
            {
                id: 3,
                title: 'Database Design',
                course: 'Database Systems',
                due: 'in 1 week',
                description: 'Design a database schema for the given requirements.'
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
            },
            {
                id: 3,
                title: 'Exam Schedule Updated',
                content: 'The final exam schedule has been updated. Please check the new dates.',
                author: 'Academic Office',
                time: '3 days ago'
            }
        ]
    };

    // Load course progress
    function loadCourseProgress() {
        const courseProgressContainer = document.getElementById('courseProgress');
        
        courseProgressContainer.innerHTML = dashboardData.courses.map(course => `
            <div class="course-progress-item" data-course-id="${course.id}">
                <img src="${course.image}" alt="${course.title}" class="course-progress-image">
                <div class="course-progress-info">
                    <h4>${course.title}</h4>
                    <p>${course.instructor}</p>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${course.progress}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Load upcoming assignments
    function loadUpcomingAssignments() {
        const assignmentsList = document.getElementById('upcomingAssignments');
        
        assignmentsList.innerHTML = dashboardData.assignments.map(assignment => `
            <li class="assignment-item" data-assignment-id="${assignment.id}">
                <div class="assignment-info">
                    <h4>${assignment.title}</h4>
                    <p>${assignment.course}</p>
                </div>
                <span class="assignment-due">Due ${assignment.due}</span>
            </li>
        `).join('');
    }

    // Load recent announcements
    function loadRecentAnnouncements() {
        const announcementsList = document.getElementById('recentAnnouncements');
        
        announcementsList.innerHTML = dashboardData.announcements.map(announcement => `
            <li class="announcement-item" data-announcement-id="${announcement.id}">
                <div class="announcement-header">
                    <h4>${announcement.title}</h4>
                    <span>${announcement.time}</span>
                </div>
                <div class="announcement-content">
                    <p>${announcement.content}</p>
                </div>
                <div class="announcement-footer">
                    <span>${announcement.author}</span>
                </div>
            </li>
        `).join('');
    }

    // Initialize calendar
    function initCalendar() {
        // In a real app, this would use FullCalendar or similar
        const calendarEl = document.getElementById('calendar');
        calendarEl.innerHTML = `
            <div class="calendar-placeholder" style="height: 100%; display: flex; align-items: center; justify-content: center; color: #777;">
                Calendar would display here with upcoming events and deadlines
            </div>
        `;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Course progress items
        document.addEventListener('click', function(e) {
            if (e.target.closest('.course-progress-item')) {
                const courseId = e.target.closest('.course-progress-item').getAttribute('data-course-id');
                const course = dashboardData.courses.find(c => c.id == courseId);
                alert(`Opening course: ${course.title}\nProgress: ${course.progress}%`);
            }
            
            // Assignment items
            if (e.target.closest('.assignment-item')) {
                const assignmentId = e.target.closest('.assignment-item').getAttribute('data-assignment-id');
                const assignment = dashboardData.assignments.find(a => a.id == assignmentId);
                alert(`Assignment: ${assignment.title}\nCourse: ${assignment.course}\nDue: ${assignment.due}`);
            }
            
            // Announcement items
            if (e.target.closest('.announcement-item')) {
                const announcementId = e.target.closest('.announcement-item').getAttribute('data-announcement-id');
                const announcement = dashboardData.announcements.find(a => a.id == announcementId);
                alert(`Announcement: ${announcement.title}\nFrom: ${announcement.author}\n\n${announcement.content}`);
            }
        });
    }

    // Initialize dashboard
    function initDashboard() {
        loadCourseProgress();
        loadUpcomingAssignments();
        loadRecentAnnouncements();
        initCalendar();
        setupEventListeners();
    }

    initDashboard();
});
