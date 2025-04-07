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
    loadProgressSummary();
    loadUserCourses();
    loadRecentActivity();
    loadCertificates();
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

function loadProgressSummary() {
    // Sample data (in a real app, this would come from a server)
    const progressData = {
        enrolledCourses: 5,
        completedCourses: 2,
        overallProgress: 45
    };
    
    document.getElementById('enrolledCourses').textContent = progressData.enrolledCourses;
    document.getElementById('completedCourses').textContent = progressData.completedCourses;
    document.getElementById('overallProgress').textContent = progressData.overallProgress;
    
    // Animate progress ring
    const progressRing = document.querySelector('.progress-ring-circle');
    if (progressRing) {
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (progressData.overallProgress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

function loadUserCourses() {
    const coursesList = document.getElementById('userCourses');
    coursesList.innerHTML = '';
    
    // Sample course data (in a real app, this would come from a server)
    const userCourses = [
        {
            id: 1,
            title: "Introduction to Web Development",
            image: "https://via.placeholder.com/800x450",
            progress: 75,
            lastAccessed: "2 days ago"
        },
        {
            id: 2,
            title: "Business Management Fundamentals",
            image: "https://via.placeholder.com/800x450",
            progress: 45,
            lastAccessed: "1 week ago"
        },
        {
            id: 3,
            title: "Graphic Design Principles",
            image: "https://via.placeholder.com/800x450",
            progress: 20,
            lastAccessed: "3 days ago"
        },
        {
            id: 4,
            title: "Spanish for Beginners",
            image: "https://via.placeholder.com/800x450",
            progress: 90,
            lastAccessed: "Yesterday"
        }
    ];
    
    userCourses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        
        courseItem.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <span>Last accessed: ${course.lastAccessed}</span>
                </div>
                <div class="course-progress">
                    <div class="course-progress-fill" style="width: ${course.progress}%"></div>
                </div>
            </div>
            <a href="course-detail.html?id=${course.id}" class="btn btn-secondary">Continue</a>
        `;
        
        coursesList.appendChild(courseItem);
    });
}

function loadRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    activityList.innerHTML = '';
    
    // Sample activity data (in a real app, this would come from a server)
    const activities = [
        {
            id: 1,
            title: "Completed 'HTML Basics' lesson",
            course: "Introduction to Web Development",
            date: "2 hours ago"
        },
        {
            id: 2,
            title: "Submitted assignment 'Business Plan'",
            course: "Business Management Fundamentals",
            date: "1 day ago"
        },
        {
            id: 3,
            title: "Watched 'Color Theory' video",
            course: "Graphic Design Principles",
            date: "2 days ago"
        },
        {
            id: 4,
            title: "Completed quiz 'Greetings'",
            course: "Spanish for Beginners",
            date: "3 days ago"
        },
        {
            id: 5,
            title: "Started 'CSS Fundamentals' lesson",
            course: "Introduction to Web Development",
            date: "1 week ago"
        }
    ];
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <h3>${activity.title}</h3>
            <div class="activity-meta">
                <span>${activity.course}</span>
                <span>${activity.date}</span>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

function loadCertificates() {
    const certificatesList = document.getElementById('userCertificates');
    certificatesList.innerHTML = '';
    
    // Sample certificate data (in a real app, this would come from a server)
    const certificates = [
        {
            id: 1,
            title: "Introduction to Web Development",
            date: "June 15, 2023"
        },
        {
            id: 2,
            title: "Business Management Fundamentals",
            date: "May 20, 2023"
        }
    ];
    
    certificates.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'certificate-item';
        
        certItem.innerHTML = `
            <div class="certificate-icon">📜</div>
            <div class="certificate-info">
                <h3>${cert.title}</h3>
                <span class="certificate-date">Completed: ${cert.date}</span>
            </div>
            <button class="btn btn-secondary download-btn">Download</button>
        `;
        
        certificatesList.appendChild(certItem);
    });
    
    // Setup download buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // In a real app, this would download the certificate
            alert('Certificate downloaded!');
        });
    });
}

function handleLogout() {
    // Clear user data from storage
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}
