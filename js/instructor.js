document.addEventListener('DOMContentLoaded', function() {
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
    loadMyCoursesTab();
    loadStudentsTab();
    loadAnalyticsTab();
    
    // Modal functionality
    setupModals();
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

function loadMyCoursesTab() {
    const coursesList = document.getElementById('instructorCourses');
    coursesList.innerHTML = '';
    
    // Sample course data (in a real app, this would come from a server)
    const courses = [
        {
            id: 1,
            title: "Introduction to Web Development",
            image: "https://via.placeholder.com/800x450",
            students: 1250,
            progress: 75,
            lastUpdated: "2023-05-20"
        },
        {
            id: 2,
            title: "Advanced JavaScript Techniques",
            image: "https://via.placeholder.com/800x450",
            students: 850,
            progress: 60,
            lastUpdated: "2023-04-15"
        },
        {
            id: 3,
            title: "React Fundamentals",
            image: "https://via.placeholder.com/800x450",
            students: 1100,
            progress: 90,
            lastUpdated: "2023-06-10"
        }
    ];
    
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        
        courseItem.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <span>${course.students} students</span>
                    <span>Last updated: ${course.lastUpdated}</span>
                </div>
                <div class="course-progress">
                    <div class="course-progress-fill" style="width: ${course.progress}%"></div>
                </div>
            </div>
            <a href="#" class="btn btn-secondary">Manage</a>
        `;
        
        coursesList.appendChild(courseItem);
    });
}

function loadStudentsTab() {
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    studentsTable.innerHTML = '';
    
    // Sample student data (in a real app, this would come from a server)
    const students = [
        {
            id: 1,
            name: "Student One",
            course: "Introduction to Web Development",
            progress: 75,
            lastActivity: "2023-06-15"
        },
        {
            id: 2,
            name: "Student Two",
            course: "Introduction to Web Development",
            progress: 45,
            lastActivity: "2023-06-10"
        },
        {
            id: 3,
            name: "Student Three",
            course: "Advanced JavaScript Techniques",
            progress: 60,
            lastActivity: "2023-06-12"
        },
        {
            id: 4,
            name: "Student Four",
            course: "React Fundamentals",
            progress: 90,
            lastActivity: "2023-06-14"
        },
        {
            id: 5,
            name: "Student Five",
            course: "React Fundamentals",
            progress: 30,
            lastActivity: "2023-06-08"
        }
    ];
    
    students.forEach(student => {
        const row = studentsTable.insertRow();
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>
                <div class="progress-bar" style="margin: 5px 0;">
                    <div class="progress-fill" style="width: ${student.progress}%"></div>
                </div>
                <div style="text-align: center;">${student.progress}%</div>
            </td>
            <td>${student.lastActivity}</td>
            <td>
                <button class="action-btn view-btn">View</button>
                <button class="action-btn edit-btn">Message</button>
            </td>
        `;
    });
}

function loadAnalyticsTab() {
    // Update summary cards
    document.getElementById('totalStudents').textContent = "1,250";
    document.getElementById('totalCourses').textContent = "3";
    document.getElementById('averageRating').textContent = "4.7";
    document.getElementById('completionRate').textContent = "78%";
    
    // Create enrollment chart
    const ctx = document.getElementById('enrollmentChart').getContext('2d');
    const enrollmentChart = new Chart(ctx, {
        type: 'line',
        data: {
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
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Enrollment Trends'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function setupModals() {
    // Add Content Modal
    const addContentBtn = document.getElementById('addContentBtn');
    const addContentModal = document.getElementById('addContentModal');
    const addContentForm = document.getElementById('addContentForm');
    
    if (addContentBtn) {
        addContentBtn.addEventListener('click', () => {
            // Load courses for dropdown
            const courseSelect = document.getElementById('contentCourse');
            courseSelect.innerHTML = '';
            
            // Sample courses (in a real app, this would come from the server)
            const courses = [
                { id: 1, title: "Introduction to Web Development" },
                { id: 2, title: "Advanced JavaScript Techniques" },
                { id: 3, title: "React Fundamentals" }
            ];
            
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = course.title;
                courseSelect.appendChild(option);
            });
            
            addContentModal.style.display = 'flex';
        });
        
        addContentModal.querySelector('.close-btn').addEventListener('click', () => {
            addContentModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === addContentModal) {
                addContentModal.style.display = 'none';
            }
        });
        
        addContentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const courseId = document.getElementById('contentCourse').value;
            const type = document.getElementById('contentType').value;
            const title = document.getElementById('contentTitle').value;
            const description = document.getElementById('contentDescription').value;
            const file = document.getElementById('contentFile').value;
            const duration = document.getElementById('contentDuration').value;
            
            // In a real app, you would send this data to the server
            console.log('New content:', { courseId, type, title, description, file, duration });
            alert('Content added successfully!');
            
            // Reset form and close modal
            addContentForm.reset();
            addContentModal.style.display = 'none';
            
            // Refresh courses list
            loadMyCoursesTab();
        });
    }
    
    // Create Course Modal (from the Create Course tab form)
    const createCourseForm = document.getElementById('createCourseForm');
    if (createCourseForm) {
        createCourseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('instructorCourseTitle').value;
            const description = document.getElementById('instructorCourseDescription').value;
            const category = document.getElementById('instructorCourseCategory').value;
            const image = document.getElementById('instructorCourseImage').value;
            
            // In a real app, you would send this data to the server
            console.log('New course:', { title, description, category, image });
            alert('Course created successfully!');
            
            // Reset form
            createCourseForm.reset();
            
            // Refresh courses list
            loadMyCoursesTab();
        });
    }
}

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}
