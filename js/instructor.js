document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Check if user is instructor
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'instructor') {
        window.location.href = 'login.html';
        return;
    }
    
    // Set instructor name
    document.getElementById('userName').textContent = currentUser.name;
    
    // Tab functionality
    setupTabs();
    
    // Load data for each tab
    loadMyCoursesTab(currentUser);
    loadStudentsTab(currentUser);
    loadAnalyticsTab(currentUser);
    
    // Modal functionality
    setupModals(currentUser);
});

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function loadMyCoursesTab(instructor) {
    const coursesList = document.getElementById('instructorCourses');
    coursesList.innerHTML = '';
    
    const courses = Database.getCourses().filter(c => c.instructorId === instructor.id);
    const enrollments = Database.getEnrollments();
    
    courses.forEach(course => {
        // Calculate average progress for this course
        const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
        const avgProgress = courseEnrollments.length > 0 
            ? Math.round(courseEnrollments.reduce((sum, e) => sum + e.progress, 0) / courseEnrollments.length)
            : 0;
        
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        
        courseItem.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <span>${course.students.length} students</span>
                    <span>Avg. progress: ${avgProgress}%</span>
                </div>
                <div class="course-progress">
                    <div class="course-progress-fill" style="width: ${avgProgress}%"></div>
                </div>
            </div>
            <button class="btn btn-secondary manage-course-btn" data-id="${course.id}">Manage</button>
        `;
        
        coursesList.appendChild(courseItem);
    });
    
    // Add event listeners to manage buttons
    document.querySelectorAll('.manage-course-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            // In a real app, this would navigate to a course management page
            alert(`Manage course ID: ${courseId}\nThis would open a course management page in a real implementation.`);
        });
    });
}

function loadStudentsTab(instructor) {
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    studentsTable.innerHTML = '';
    
    const courses = Database.getCourses().filter(c => c.instructorId === instructor.id);
    const enrollments = Database.getEnrollments();
    const users = Database.getUsers();
    
    // Get all students enrolled in instructor's courses
    const courseIds = courses.map(c => c.id);
    const instructorEnrollments = enrollments.filter(e => courseIds.includes(e.courseId));
    
    instructorEnrollments.forEach(enrollment => {
        const student = users.find(u => u.id === enrollment.userId);
        const course = courses.find(c => c.id === enrollment.courseId);
        
        if (!student || !course) return;
        
        const row = studentsTable.insertRow();
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${course.title}</td>
            <td>
                <div class="progress-bar" style="margin: 5px 0;">
                    <div class="progress-fill" style="width: ${enrollment.progress}%"></div>
                </div>
                <div style="text-align: center;">${enrollment.progress}%</div>
            </td>
            <td>${new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
            <td>
                <button class="action-btn view-btn" data-id="${student.id}">View</button>
                <button class="action-btn edit-btn" data-id="${student.id}">Message</button>
            </td>
        `;
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = parseInt(e.target.getAttribute('data-id'));
            viewStudentProgress(studentId);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = parseInt(e.target.getAttribute('data-id'));
            messageStudent(studentId);
        });
    });
}

function loadAnalyticsTab(instructor) {
    const courses = Database.getCourses().filter(c => c.instructorId === instructor.id);
    const enrollments = Database.getEnrollments();
    
    // Update summary cards
    const totalStudents = new Set(enrollments
        .filter(e => courses.some(c => c.id === e.courseId))
        .map(e => e.userId)
    ).size;
    
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('averageRating').textContent = "4.7";
    document.getElementById('completionRate').textContent = "78%";
    
    // Create enrollment chart without using eval
    const ctx = document.getElementById('enrollmentChart').getContext('2d');
    const enrollmentData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Course Enrollments',
            data: [120, 190, 170, 220, 280, 350],
            backgroundColor: 'rgba(24, 91, 159, 0.2)',
            borderColor: 'rgba(24, 91, 159, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };
    
    const enrollmentChart = new Chart(ctx, {
        type: 'line',
        data: enrollmentData,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { 
                    display: true, 
                    text: 'Monthly Enrollment Trends' 
                }
            },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// ... (rest of the instructor
