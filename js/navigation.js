// Add this to main.js (or create a new navigation.js file)
function updateNavigation() {
    const currentUser = getCurrentUser();
    const navElements = document.querySelectorAll('nav ul');
    
    navElements.forEach(nav => {
        if (currentUser) {
            // User is logged in
            nav.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="courses.html">Courses</a></li>
                ${currentUser.role === 'admin' ? '<li><a href="admin.html">Admin Panel</a></li>' : ''}
                ${currentUser.role === 'instructor' ? '<li><a href="instructor.html">Instructor Panel</a></li>' : ''}
                ${currentUser.role === 'student' ? '<li><a href="dashboard.html">Dashboard</a></li>' : ''}
                <li><a href="#" id="logoutBtn" class="btn">Logout</a></li>
            `;
        } else {
            // User is not logged in
            nav.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="courses.html">Courses</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html" class="btn">Sign Up</a></li>
            `;
        }
        
        // Add logout event listener if button exists
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    });
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', updateNavigation);
