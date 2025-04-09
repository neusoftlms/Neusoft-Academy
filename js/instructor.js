document.addEventListener('DOMContentLoaded', function() {
    // Sample data for instructor dashboard
    const instructorData = {
        courses: [
            {
                id: 1,
                title: 'Introduction to Programming',
                students: 245,
                progress: 78,
                image: 'assets/images/course1.jpg',
                lastUpdated: '2023-05-12'
            },
            {
                id: 2,
                title: 'Web Development Fundamentals',
                students: 180,
                progress: 65,
                image: 'assets/images/course2.jpg',
                lastUpdated: '2023-05-10'
            },
            {
                id: 3,
                title: 'Advanced JavaScript',
                students: 120,
                progress: 42,
                image: 'assets/images/course3.jpg',
                lastUpdated: '2023-05-08'
            }
        ],
        recentStudents: [
            {
                id: 101,
                name: 'Alice Johnson',
                course: 'Introduction to Programming',
                progress: 65,
                avatar: 'assets/images/user1.jpg'
            },
            {
                id: 102,
                name: 'Bob Smith',
                course: 'Web Development Fundamentals',
                progress: 85,
                avatar: 'assets/images/user2.jpg'
            },
            {
                id: 103,
                name: 'Charlie Brown',
                course: 'Advanced JavaScript',
                progress: 42,
                avatar: 'assets/images/user3.jpg'
            }
        ],
        submissions: [
            {
                id: 1001,
                student: 'Alice Johnson',
                assignment: 'Programming Assignment 3',
                course: 'Introduction to Programming',
                submitted: '2023-05-14',
                status: 'pending',
                avatar: 'assets/images/user1.jpg'
            },
            {
                id: 1002,
                student: 'Bob Smith',
                assignment: 'Web Project',
                course: 'Web Development Fundamentals',
                submitted: '2023-05-13',
                status: 'graded',
                avatar: 'assets/images/user2.jpg'
            }
        ]
    };

    // Load instructor courses
    function loadInstructorCourses() {
        const coursesContainer = document.getElementById('instructorCourses');
        
        coursesContainer.innerHTML = instructorData.courses.map(course => `
            <div class="course-card" data-course-id="${course.id}">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-details">
                    <h4>${course.title}</h4>
                    <div class="course-meta">
                        <span><i class="fas fa-users"></i> ${course.students} students</span>
                        <span>Last updated: ${course.lastUpdated}</span>
                    </div>
                    <div class="course-progress">
                        <div class="progress-text">
                            <span>Overall Progress</span>
                            <span>${course.progress}%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Load recent students
    function loadRecentStudents() {
        const studentsTable = document.getElementById('recentStudents');
        
        studentsTable.innerHTML = instructorData.recentStudents.map(student => `
            <tr data-student-id="${student.id}">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${student.avatar}" alt="${student.name}" width="30" height="30" class="rounded-circle me-2">
                        ${student.name}
                    </div>
                </td>
                <td>${student.course}</td>
                <td>
                    <div class="progress" style="height: 6px;">
                        <div class="progress-bar" role="progressbar" style="width: ${student.progress}%" aria-valuenow="${student.progress}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-outline">Message</button>
                </td>
            </tr>
        `).join('');
    }

    // Load assignment submissions
    function loadAssignmentSubmissions() {
        const submissionsContainer = document.getElementById('assignmentSubmissions');
        
        submissionsContainer.innerHTML = instructorData.submissions.map(submission => `
            <div class="submission-item" data-submission-id="${submission.id}">
                <img src="${submission.avatar}" alt="${submission.student}" class="submission-avatar">
                <div class="submission-info">
                    <h4>${submission.assignment}</h4>
                    <p>Submitted by ${submission.student} for ${submission.course}</p>
                </div>
                <div class="submission-actions">
                    <button class="btn btn-sm ${submission.status === 'pending' ? 'btn-primary' : 'btn-outline'}">
                        ${submission.status === 'pending' ? 'Grade' : 'View Grade'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Course card click
        document.addEventListener('click', function(e) {
            if (e.target.closest('.course-card')) {
                const courseId = e.target.closest('.course-card').getAttribute('data-course-id');
                const course = instructorData.courses.find(c => c.id == courseId);
                alert(`Managing course: ${course.title}`);
            }
            
            // Submission item click
            if (e.target.closest('.submission-item')) {
                const submissionId = e.target.closest('.submission-item').getAttribute('data-submission-id');
                const submission = instructorData.submissions.find(s => s.id == submissionId);
                alert(`Viewing submission: ${submission.assignment}\nStudent: ${submission.student}`);
            }
        });
    }

    // Initialize instructor dashboard
    function initInstructorDashboard() {
        loadInstructorCourses();
        loadRecentStudents();
        loadAssignmentSubmissions();
        setupEventListeners();
    }

    initInstructorDashboard();
});
