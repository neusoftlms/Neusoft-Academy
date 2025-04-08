'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Safely set admin name
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    } else {
        console.error('Could not find userName element');
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab') + '-tab';
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // Load initial tab
    const initialTab = document.querySelector('.tab-btn.active');
    if (initialTab) {
        const initialTabId = initialTab.getAttribute('data-tab') + '-tab';
        const initialTabContent = document.getElementById(initialTabId);
        if (initialTabContent) {
            initialTabContent.classList.add('active');
        }
    }
    
    // Load data for each tab
    loadUsersTab();
    loadCoursesTab();
    loadCategoriesTab();
    loadSettingsTab();
    
    // Modal functionality
    setupModals();
});

// Rest of your admin.js functions (loadUsersTab, loadCoursesTab, etc.)
// Make sure to add similar null checks throughout your code
