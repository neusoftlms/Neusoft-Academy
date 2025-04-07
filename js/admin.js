// admin.js - Updated to use Database methods
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Set admin name
    document.getElementById('userName').textContent = currentUser.name;
    
    // Tab functionality
    setupTabs();
    
    // Load data for each tab
    loadUsersTab();
    loadCoursesTab();
    loadCategoriesTab();
    loadSettingsTab();
    
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

function loadUsersTab() {
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    usersTable.innerHTML = '';
    
    const users = Database.getUsers();
    
    users.forEach(user => {
        const row = usersTable.insertRow();
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
            <td>${new Date(user.registeredAt).toLocaleDateString()}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${user.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${user.id}">Delete</button>
            </td>
        `;
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = parseInt(e.target.getAttribute('data-id'));
            editUser(userId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = parseInt(e.target.getAttribute('data-id'));
            deleteUser(userId);
        });
    });
    
    // Setup search and filter functionality
    const userSearch = document.getElementById('userSearch');
    const userRoleFilter = document.getElementById('userRoleFilter');
    
    userSearch.addEventListener('input', filterUsers);
    userRoleFilter.addEventListener('change', filterUsers);
    
    function filterUsers() {
        const searchTerm = userSearch.value.toLowerCase();
        const selectedRole = userRoleFilter.value;
        
        const rows = usersTable.getElementsByTagName('tr');
        
        for (let row of rows) {
            const name = row.cells[1].textContent.toLowerCase();
            const email = row.cells[2].textContent.toLowerCase();
            const role = row.cells[3].textContent.toLowerCase();
            
            const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);
            const matchesRole = selectedRole === 'all' || role === selectedRole;
            
            if (matchesSearch && matchesRole) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }
}

function editUser(userId) {
    const users = Database.getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) return;
    
    // In a real app, you would show an edit form with the user's data
    alert(`Edit user: ${user.name}\nThis would open an edit form in a real implementation.`);
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = Database.getUsers();
        const updatedUsers = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Refresh users table
        loadUsersTab();
        alert('User deleted successfully!');
    }
}

function loadCoursesTab() {
    const coursesTable = document.getElementById('coursesTable').getElementsByTagName('tbody')[0];
    coursesTable.innerHTML = '';
    
    const courses = Database.getCourses();
    const users = Database.getUsers();
    
    courses.forEach(course => {
        const instructor = users.find(u => u.id === course.instructorId);
        
        const row = coursesTable.insertRow();
        
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.title}</td>
            <td>${instructor ? instructor.name : 'Unknown Instructor'}</td>
            <td>${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</td>
            <td>${course.students.length}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${course.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${course.id}">Delete</button>
            </td>
        `;
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            editCourse(courseId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            deleteCourse(courseId);
        });
    });
    
    // Setup search and filter functionality
    const courseSearch = document.getElementById('courseSearch');
    const courseCategoryFilter = document.getElementById('courseCategoryFilter');
    
    courseSearch.addEventListener('input', filterCourses);
    courseCategoryFilter.addEventListener('change', filterCourses);
    
    function filterCourses() {
        const searchTerm = courseSearch.value.toLowerCase();
        const selectedCategory = courseCategoryFilter.value;
        
        const rows = coursesTable.getElementsByTagName('tr');
        
        for (let row of rows) {
            const title = row.cells[1].textContent.toLowerCase();
            const instructor = row.cells[2].textContent.toLowerCase();
            const category = row.cells[3].textContent.toLowerCase();
            
            const matchesSearch = title.includes(searchTerm) || instructor.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            
            if (matchesSearch && matchesCategory) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }
}

function editCourse(courseId) {
    const courses = Database.getCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (!course) return;
    
    // In a real app, you would show an edit form with the course's data
    alert(`Edit course: ${course.title}\nThis would open an edit form in a real implementation.`);
}

function deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')) {
        const courses = Database.getCourses();
        const updatedCourses = courses.filter(c => c.id !== courseId);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        
        // Also remove any enrollments for this course
        const enrollments = Database.getEnrollments();
        const updatedEnrollments = enrollments.filter(e => e.courseId !== courseId);
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
        
        // Refresh courses table
        loadCoursesTab();
        alert('Course deleted successfully!');
    }
}

function loadCategoriesTab() {
    const categoriesTable = document.getElementById('categoriesTable').getElementsByTagName('tbody')[0];
    categoriesTable.innerHTML = '';
    
    const courses = Database.getCourses();
    
    // Get unique categories from courses
    const categories = {};
    courses.forEach(course => {
        if (!categories[course.category]) {
            categories[course.category] = 0;
        }
        categories[course.category]++;
    });
    
    // Convert to array for display
    let id = 1;
    for (const [name, count] of Object.entries(categories)) {
        const row = categoriesTable.insertRow();
        
        row.innerHTML = `
            <td>${id++}</td>
            <td>${name.charAt(0).toUpperCase() + name.slice(1)}</td>
            <td>${count}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;
    }
}

function loadSettingsTab() {
    // In a real app, these would be loaded from the server
    const settings = {
        siteTitle: "Neusoft Academy",
        adminEmail: "admin@neusoftacademy.com",
        registrationEnabled: true,
        defaultUserRole: "student"
    };
    
    document.getElementById('siteTitle').value = settings.siteTitle;
    document.getElementById('adminEmail').value = settings.adminEmail;
    document.getElementById('registrationEnabled').value = settings.registrationEnabled.toString();
    document.getElementById('defaultUserRole').value = settings.defaultUserRole;
    
    // Save settings
    const settingsForm = document.getElementById('systemSettingsForm');
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const updatedSettings = {
            siteTitle: document.getElementById('siteTitle').value,
            adminEmail: document.getElementById('adminEmail').value,
            registrationEnabled: document.getElementById('registrationEnabled').value === 'true',
            defaultUserRole: document.getElementById('defaultUserRole').value
        };
        
        // In a real app, you would send this to the server
        console.log('Settings updated:', updatedSettings);
        alert('Settings saved successfully!');
    });
}

function setupModals() {
    // Add User Modal
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const addUserForm = document.getElementById('addUserForm');
    
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            addUserModal.style.display = 'flex';
        });
        
        addUserModal.querySelector('.close-btn').addEventListener('click', () => {
            addUserModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === addUserModal) {
                addUserModal.style.display = 'none';
            }
        });
        
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('newUserName').value;
            const email = document.getElementById('newUserEmail').value;
            const password = document.getElementById('newUserPassword').value;
            const role = document.getElementById('newUserRole').value;
            
            // Create new user
            const newUser = {
                name,
                email,
                password,
                role
            };
            
            Database.addUser(newUser);
            alert('User added successfully!');
            
            // Reset form and close modal
            addUserForm.reset();
            addUserModal.style.display = 'none';
            
            // Refresh users table
            loadUsersTab();
        });
    }
    
    // Add Course Modal
    const addCourseBtn = document.getElementById('addCourseBtn');
    const addCourseModal = document.getElementById('addCourseModal');
    const addCourseForm = document.getElementById('addCourseForm');
    
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', () => {
            // Load instructors for dropdown
            const instructorSelect = document.getElementById('courseInstructor');
            instructorSelect.innerHTML = '';
            
            const instructors = Database.getUsers().filter(u => u.role === 'instructor');
            
            instructors.forEach(instructor => {
                const option = document.createElement('option');
                option.value = instructor.id;
                option.textContent = instructor.name;
                instructorSelect.appendChild(option);
            });
            
            addCourseModal.style.display = 'flex';
        });
        
        addCourseModal.querySelector('.close-btn').addEventListener('click', () => {
            addCourseModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === addCourseModal) {
                addCourseModal.style.display = 'none';
            }
        });
        
        addCourseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('courseTitle').value;
            const description = document.getElementById('courseDescription').value;
            const instructorId = parseInt(document.getElementById('courseInstructor').value);
            const category = document.getElementById('courseCategory').value;
            const image = document.getElementById('courseImage').value;
            
            // Create new course
            const newCourse = {
                title,
                description,
                instructorId,
                category,
                image
            };
            
            Database.addCourse(newCourse);
            alert('Course added successfully!');
            
            // Reset form and close modal
            addCourseForm.reset();
            addCourseModal.style.display = 'none';
            
            // Refresh courses table
            loadCoursesTab();
        });
    }
}

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}
