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
    
    // Sample user data (in a real app, this would come from a server)
    const users = [
        {
            id: 1,
            name: "Admin User",
            email: "admin@neusoftacademy.com",
            role: "admin",
            registeredAt: "2023-01-15"
        },
        {
            id: 2,
            name: "Instructor One",
            email: "instructor@neusoftacademy.com",
            role: "instructor",
            registeredAt: "2023-02-20"
        },
        {
            id: 3,
            name: "Student One",
            email: "student@neusoftacademy.com",
            role: "student",
            registeredAt: "2023-03-10"
        },
        {
            id: 4,
            name: "Student Two",
            email: "student2@neusoftacademy.com",
            role: "student",
            registeredAt: "2023-04-05"
        },
        {
            id: 5,
            name: "Instructor Two",
            email: "instructor2@neusoftacademy.com",
            role: "instructor",
            registeredAt: "2023-05-12"
        }
    ];
    
    users.forEach(user => {
        const row = usersTable.insertRow();
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
            <td>${user.registeredAt}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;
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

function loadCoursesTab() {
    const coursesTable = document.getElementById('coursesTable').getElementsByTagName('tbody')[0];
    coursesTable.innerHTML = '';
    
    // Sample course data (in a real app, this would come from a server)
    const courses = [
        {
            id: 1,
            title: "Introduction to Web Development",
            instructor: "John Smith",
            category: "technology",
            students: 1250
        },
        {
            id: 2,
            title: "Business Management Fundamentals",
            instructor: "Sarah Johnson",
            category: "business",
            students: 890
        },
        {
            id: 3,
            title: "Graphic Design Principles",
            instructor: "Michael Chen",
            category: "design",
            students: 2100
        },
        {
            id: 4,
            title: "Spanish for Beginners",
            instructor: "Maria Garcia",
            category: "language",
            students: 1500
        },
        {
            id: 5,
            title: "Data Science with Python",
            instructor: "David Wilson",
            category: "technology",
            students: 1800
        }
    ];
    
    courses.forEach(course => {
        const row = coursesTable.insertRow();
        
        row.innerHTML = `
            <td>${course.id}</td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td>${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</td>
            <td>${course.students}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;
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

function loadCategoriesTab() {
    const categoriesTable = document.getElementById('categoriesTable').getElementsByTagName('tbody')[0];
    categoriesTable.innerHTML = '';
    
    // Sample category data (in a real app, this would come from a server)
    const categories = [
        {
            id: 1,
            name: "Technology",
            courses: 15
        },
        {
            id: 2,
            name: "Business",
            courses: 8
        },
        {
            id: 3,
            name: "Design",
            courses: 6
        },
        {
            id: 4,
            name: "Language",
            courses: 5
        }
    ];
    
    categories.forEach(category => {
        const row = categoriesTable.insertRow();
        
        row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>${category.courses}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;
    });
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
            
            // In a real app, you would send this data to the server
            console.log('New user:', { name, email, password, role });
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
            
            // Sample instructors (in a real app, this would come from the server)
            const instructors = [
                { id: 2, name: "Instructor One" },
                { id: 5, name: "Instructor Two" }
            ];
            
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
            const instructorId = document.getElementById('courseInstructor').value;
            const category = document.getElementById('courseCategory').value;
            const image = document.getElementById('courseImage').value;
            
            // In a real app, you would send this data to the server
            console.log('New course:', { title, description, instructorId, category, image });
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
