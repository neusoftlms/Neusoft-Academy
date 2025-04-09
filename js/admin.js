document.addEventListener('DOMContentLoaded', function() {
    // Sample data for admin dashboard
    const adminData = {
        recentRegistrations: [
            { id: 1001, name: 'John Doe', email: 'john@example.com', role: 'Student', date: '2023-05-15' },
            { id: 1002, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', date: '2023-05-14' },
            { id: 1003, name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', date: '2023-05-13' },
            { id: 1004, name: 'Alice Brown', email: 'alice@example.com', role: 'Student', date: '2023-05-12' },
            { id: 1005, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Student', date: '2023-05-11' }
        ],
        courses: [
            { id: 1, title: 'Introduction to Programming', instructor: 'Prof. Smith', category: 'Programming', students: 245, status: 'Published' },
            { id: 2, title: 'Web Development Fundamentals', instructor: 'Prof. Johnson', category: 'Web Development', students: 180, status: 'Published' },
            { id: 3, title: 'Database Systems', instructor: 'Prof. Williams', category: 'Data Science', students: 120, status: 'Published' },
            { id: 4, title: 'Cybersecurity Basics', instructor: 'Prof. Brown', category: 'Cybersecurity', students: 95, status: 'Published' },
            { id: 5, title: 'Mobile App Development', instructor: 'Prof. Davis', category: 'Mobile Development', students: 65, status: 'Draft' }
        ],
        instructors: [
            { id: 1, name: 'Prof. Smith', email: 'smith@example.com', courses: 5, students: 245 },
            { id: 2, name: 'Prof. Johnson', email: 'johnson@example.com', courses: 3, students: 180 },
            { id: 3, name: 'Prof. Williams', email: 'williams@example.com', courses: 2, students: 120 }
        ]
    };

    // Load recent registrations
    function loadRecentRegistrations() {
        const tableBody = document.getElementById('recentRegistrations');
        tableBody.innerHTML = adminData.recentRegistrations.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge ${user.role === 'Student' ? 'bg-primary' : 'bg-success'}">${user.role}</span></td>
                <td>${user.date}</td>
                <td>
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-outline">Edit</button>
                </td>
            </tr>
        `).join('');
    }

    // Load courses table
    function loadCoursesTable() {
        const tableBody = document.getElementById('coursesTable');
        tableBody.innerHTML = adminData.courses.map(course => `
            <tr>
                <td>${course.id}</td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td>${course.category}</td>
                <td>${course.students}</td>
                <td><span class="badge ${course.status === 'Published' ? 'bg-success' : 'bg-warning'}">${course.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline">Edit</button>
                    <button class="btn btn-sm btn-outline">${course.status === 'Published' ? 'Unpublish' : 'Publish'}</button>
                </td>
            </tr>
        `).join('');
    }

    // Initialize charts
    function initCharts() {
        // Sample chart initialization (would use Chart.js or similar in a real app)
        const activityChart = document.getElementById('activityChart');
        activityChart.innerHTML = '<div class="chart-placeholder" style="height: 300px; display: flex; align-items: center; justify-content: center; color: #777;">Activity Chart Would Display Here</div>';
    }

    // Add course modal functionality
    function setupCourseModal() {
        const addCourseBtn = document.getElementById('addCourseBtn');
        const addCourseModal = new bootstrap.Modal(document.getElementById('addCourseModal'));
        const saveCourseBtn = document.getElementById('saveCourseBtn');

        addCourseBtn.addEventListener('click', function() {
            addCourseModal.show();
        });

        saveCourseBtn.addEventListener('click', function() {
            // In a real app, this would save the course data
            alert('Course saved successfully!');
            addCourseModal.hide();
        });

        // Thumbnail preview
        const thumbnailInput = document.getElementById('courseThumbnail');
        const thumbnailPreview = document.getElementById('thumbnailPreview');

        thumbnailInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    thumbnailPreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Initialize admin dashboard
    function initAdminDashboard() {
        loadRecentRegistrations();
        loadCoursesTable();
        initCharts();
        setupCourseModal();
    }

    initAdminDashboard();
});
