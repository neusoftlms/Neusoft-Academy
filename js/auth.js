// auth.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (getCurrentUser()) {
        redirectBasedOnRole();
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Logout button handling
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    const messageElement = document.getElementById('loginMessage');
    
    // Find user by email
    const users = Database.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
        showMessage(messageElement, 'User with this email not found.', 'error');
        return;
    }
    
    // Check password
    if (user.password !== password) {
        showMessage(messageElement, 'Incorrect password.', 'error');
        return;
    }
    
    // Login successful
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    
    // Save user data
    if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(userData));
    } else {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
    }
    
    showMessage(messageElement, 'Login successful! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        redirectBasedOnRole();
    }, 1500);
}

function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('userType').value;
    const termsAccepted = document.getElementById('terms').checked;
    
    const messageElement = document.getElementById('registerMessage');
    
    // Validation
    if (password !== confirmPassword) {
        showMessage(messageElement, 'Passwords do not match.', 'error');
        return;
    }
    
    if (!termsAccepted) {
        showMessage(messageElement, 'You must accept the terms and conditions.', 'error');
        return;
    }
    
    // Check if email already exists
    const users = Database.getUsers();
    if (users.some(u => u.email === email)) {
        showMessage(messageElement, 'Email already registered.', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        name,
        email,
        password,
        role
    };
    
    const createdUser = Database.addUser(newUser);
    
    // Auto-login the new user
    const userData = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
    };
    
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    
    showMessage(messageElement, 'Registration successful! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        redirectBasedOnRole();
    }, 1500);
}

// ... (keep the remaining functions the same)
function handleLogout(e) {
    e.preventDefault();
    
    // Clear user data from storage
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Redirect to homepage
    window.location.href = 'index.html';
}
