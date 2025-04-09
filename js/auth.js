document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // In a real app, this would validate and send to server
            console.log('Login attempt:', { email, password, remember });
            
            // Simulate successful login
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userType = document.getElementById('userType').value;
            const terms = document.getElementById('terms').checked;
            
            // Validate form
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (!terms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            // In a real app, this would validate and send to server
            console.log('Registration:', { fullName, email, password, userType, terms });
            
            // Simulate successful registration
            alert('Registration successful! Redirecting to login...');
            window.location.href = 'login.html';
        });
    }

    // Initialize any auth-related functionality
    function initAuth() {
        console.log('Auth module initialized');
    }

    initAuth();
});
