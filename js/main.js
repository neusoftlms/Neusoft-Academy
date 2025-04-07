// main.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('popularCourses')) {
        loadPopularCourses();
    }
    
    if (document.getElementById('allCourses')) {
        loadAllCourses();
        setupCourseFilters();
    }
    
    if (document.getElementById('courseDetailTitle')) {
        loadCourseDetails();
    }
});

function loadPopularCourses() {
    const popularCoursesContainer = document.getElementById('popularCourses');
    popularCoursesContainer.innerHTML = '';
    
    const courses = Database.getCourses();
    const users = Database.getUsers();
    
    // Get top 4 courses with most students
    const popularCourses = [...courses]
        .sort((a, b) => b.students.length - a.students.length)
        .slice(0, 4);
    
    popularCourses.forEach(course => {
        const instructor = users.find(u => u.id === course.instructorId);
        const courseCard = createCourseCard(course, instructor);
        popularCoursesContainer.appendChild(courseCard);
    });
}

function loadAllCourses() {
    const allCoursesContainer = document.getElementById('allCourses');
    allCoursesContainer.innerHTML = '';
    
    const courses = Database.getCourses();
    const users = Database.getUsers();
    
    courses.forEach(course => {
        const instructor = users.find(u => u.id === course.instructorId);
        const courseCard = createCourseCard(course, instructor);
        allCoursesContainer.appendChild(courseCard);
    });
}

function createCourseCard(course, instructor) {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.dataset.id = course.id;
    courseCard.dataset.category = course.category;
    
    courseCard.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}">
        </div>
        <div class="course-info">
            <h3>${course.title}</h3>
            <div class="course-meta">
                <span class="course-instructor">${instructor ? instructor.name : 'Unknown Instructor'}</span>
                <span class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
            </div>
            <div class="course-meta">
                <span class="course-students">${course.students.length} students</span>
            </div>
            <a href="course-detail.html?id=${course.id}" class="btn btn-secondary" style="width: 100%; margin-top: 10px;">View Course</a>
        </div>
    `;
    
    return courseCard;
}

// ... (keep the remaining functions the same)
