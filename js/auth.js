'use strict';

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    try {
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
    }
}

function redirectBasedOnRole() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    switch (user.role) {
        case 'admin': window.location.href = 'admin.html'; break;
        case 'instructor': window.location.href = 'instructor.html'; break;
        case 'student': window.location.href = 'dashboard.html'; break;
        default: window.location.href = 'index.html';
    }
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
    setTimeout(() => {
        element.textContent = '';
        element.className = 'message';
    }, 5000);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    const messageElement = document.getElementById('loginMessage');
    const users = Database.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
        showMessage(messageElement, 'User with this email not found.', 'error');
        return;
    }
    
    if (user.password !== password) {
        showMessage(messageElement, 'Incorrect password.', 'error');
        return;
    }
    
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    
    if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(userData));
    } else {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
    }
    
    showMessage(messageElement, 'Login successful! Redirecting...', 'success');
    setTimeout(redirectBasedOnRole, 1500);
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
    
    if (password !== confirmPassword) {
        showMessage(messageElement, 'Passwords do not match.', 'error');
        return;
    }
    
    if (!termsAccepted) {
        showMessage(messageElement, 'You must accept the terms and conditions.', 'error');
        return;
    }
    
    const users = Database.getUsers();
    if (users.some(u => u.email === email)) {
        showMessage(messageElement, 'Email already registered.', 'error');
        return;
    }
    
    const newUser = { name, email, password, role };
    const createdUser = Database.addUser(newUser);
    
    const userData = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
    };
    
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    showMessage(messageElement, 'Registration successful! Redirecting...', 'success');
    setTimeout(redirectBasedOnRole, 1500);
}

function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentUser()) {
        redirectBasedOnRole();
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', handleRegistration);
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
});
