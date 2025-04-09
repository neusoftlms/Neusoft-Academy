document.addEventListener('DOMContentLoaded', function() {
    // Highlight active navigation link
    function highlightActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-nav a, .sidebar-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Logout functionality
    function setupLogout() {
        const logoutButtons = document.querySelectorAll('.logout-btn');
        
        logoutButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real app, this would clear the session
                alert('You have been logged out successfully.');
                window.location.href = 'index.html';
            });
        });
    }

    // Initialize navigation
    function initNavigation() {
        highlightActiveNav();
        setupLogout();
    }

    initNavigation();
});
