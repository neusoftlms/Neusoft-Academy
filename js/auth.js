document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
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

// Sample user data (in a real app, this would come from a server)
const users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@neusoftacademy.com",
        password: "admin123",
        role: "admin",
        registeredAt: new Date(2023, 0, 15)
    },
    {
        id: 2,
        name: "Instructor One",
        email: "instructor@neusoftacademy.com",
        password: "instructor123",
        role: "instructor",
        registeredAt: new Date(2023, 1, 20)
    },
    {
        id: 3,
        name: "Student One",
        email: "student@neusoftacademy.com",
        password: "student123",
        role: "student",
        registeredAt: new Date(2023, 2, 10)
    }
];

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    const messageElement = document.getElementById('loginMessage');
    
    // Find user by email
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
    if (users.some(u => u.email === email)) {
        showMessage(messageElement, 'Email already registered.', 'error');
        return;
    }
    
    // Create new user (in a real app, this would be sent to the server)
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role,
        registeredAt: new Date()
    };
    
    users.push(newUser);
    
    // Auto-login the new user
    const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
    
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    
    showMessage(messageElement, 'Registration successful! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        redirectBasedOnRole();
    }, 1500);
}

function handleLogout() {
    // Clear user data from storage
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

function redirectBasedOnRole() {
    const user = getCurrentUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    switch (user.role) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'instructor':
            window.location.href = 'instructor.html';
            break;
        case 'student':
            window.location.href = 'dashboard.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        element.textContent = '';
        element.className = 'message';
    }, 5000);
}
