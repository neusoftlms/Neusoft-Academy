// dashboard.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set user name
    document.getElementById('userName').textContent = currentUser.name;
    
    // Load dashboard data
    loadProgressSummary(currentUser);
    loadUserCourses(currentUser);
    loadRecentActivity(currentUser);
    loadCertificates(currentUser);
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

function loadProgressSummary(user) {
    const enrollments = Database.getEnrollments().filter(e => e.userId === user.id);
    const courses = Database.getCourses();
    
    const enrolledCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.progress === 100).length;
    const overallProgress = enrolledCourses > 0 
        ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrolledCourses)
        : 0;
    
    document.getElementById('enrolledCourses').textContent = enrolledCourses;
    document.getElementById('completedCourses').textContent = completedCourses;
    document.getElementById('overallProgress').textContent = overallProgress;
    
    // Animate progress ring
    const progressRing = document.querySelector('.progress-ring-circle');
    if (progressRing) {
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (overallProgress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

function loadUserCourses(user) {
    const coursesList = document.getElementById('userCourses');
    coursesList.innerHTML = '';
    
    const enrollments = Database.getEnrollments().filter(e => e.userId === user.id);
    const courses = Database.getCourses();
    
    enrollments.forEach(enrollment => {
        const course = courses.find(c => c.id === enrollment.courseId);
        if (!course) return;
        
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        
        courseItem.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <span>Progress: ${enrollment.progress}%</span>
                </div>
                <div class="course-progress">
                    <div class="course-progress-fill" style="width: ${enrollment.progress}%"></div>
                </div>
            </div>
            <a href="course-detail.html?id=${course.id}" class="btn btn-secondary">Continue</a>
        `;
        
        coursesList.appendChild(courseItem);
    });
}

// ... (keep the remaining functions similar but update to use Database)
