// course-detail.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    loadCourseDetails();
    
    // Enrollment button
    const enrollBtn = document.getElementById('enrollBtn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', handleEnrollment);
    }
    
    // Update enrollment button based on current status
    updateEnrollmentStatus();
});

function loadCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    
    const courses = Database.getCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (course) {
        // Get instructor name
        const users = Database.getUsers();
        const instructor = users.find(u => u.id === course.instructorId);
        
        document.getElementById('courseDetailTitle').textContent = course.title;
        document.getElementById('courseDetailInstructor').textContent = instructor ? instructor.name : 'Unknown Instructor';
        document.getElementById('courseDetailCategory').textContent = course.category.charAt(0).toUpperCase() + course.category.slice(1);
        document.getElementById('courseDetailStudents').textContent = `${course.students.length} students`;
        document.getElementById('courseDetailImage').src = course.image;
        document.getElementById('courseDetailImage').alt = course.title;
        
        const descriptionElement = document.getElementById('courseDetailDescription');
        descriptionElement.innerHTML = `<p>${course.description}</p>`;
        
        // Load curriculum
        loadCourseCurriculum(course);
        
        // Load reviews (would come from database in a real app)
        loadCourseReviews();
    } else {
        // Redirect to courses page if course not found
        window.location.href = 'courses.html';
    }
}

function updateEnrollmentStatus() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    
    const enrollments = Database.getEnrollments();
    const isEnrolled = enrollments.some(e => e.userId === currentUser.id && e.courseId === courseId);
    
    const enrollBtn = document.getElementById('enrollBtn');
    if (enrollBtn) {
        if (isEnrolled) {
            enrollBtn.textContent = 'Continue Learning';
            enrollBtn.classList.remove('btn-primary');
            enrollBtn.classList.add('btn-secondary');
        } else {
            enrollBtn.textContent = 'Enroll Now';
            enrollBtn.classList.remove('btn-secondary');
            enrollBtn.classList.add('btn-primary');
        }
    }
}

function handleEnrollment() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    
    Database.enrollUser(currentUser.id, courseId);
    
    // Update UI
    updateEnrollmentStatus();
    
    // Show success message
    alert('You have successfully enrolled in this course!');
}

// ... (keep the remaining functions the same)
