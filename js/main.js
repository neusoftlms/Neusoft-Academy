document.addEventListener('DOMContentLoaded', function() {
    // Sample data for courses
    const coursesData = [
        {
            id: 1,
            title: 'Introduction to Programming',
            description: 'Learn the fundamentals of programming with Python.',
            instructor: 'Prof. Smith',
            category: 'Programming',
            image: 'assets/images/course1.jpg',
            price: 49.99,
            duration: '8 weeks',
            students: 245,
            rating: 4.5,
            reviews: 123
        },
        {
            id: 2,
            title: 'Web Development Fundamentals',
            description: 'Build modern websites with HTML, CSS, and JavaScript.',
            instructor: 'Prof. Johnson',
            category: 'Web Development',
            image: 'assets/images/course2.jpg',
            price: 59.99,
            duration: '10 weeks',
            students: 180,
            rating: 4.7,
            reviews: 95
        },
        {
            id: 3,
            title: 'Database Systems',
            description: 'Learn SQL and database design principles.',
            instructor: 'Prof. Williams',
            category: 'Data Science',
            image: 'assets/images/course3.jpg',
            price: 39.99,
            duration: '6 weeks',
            students: 120,
            rating: 4.3,
            reviews: 45
        },
        {
            id: 4,
            title: 'Cybersecurity Basics',
            description: 'Introduction to cybersecurity concepts and best practices.',
            instructor: 'Prof. Brown',
            category: 'Cybersecurity',
            image: 'assets/images/course4.jpg',
            price: 54.99,
            duration: '8 weeks',
            students: 95,
            rating: 4.6,
            reviews: 32
        },
        {
            id: 5,
            title: 'Mobile App Development',
            description: 'Build cross-platform mobile apps with React Native.',
            instructor: 'Prof. Davis',
            category: 'Mobile Development',
            image: 'assets/images/course5.jpg',
            price: 64.99,
            duration: '12 weeks',
            students: 65,
            rating: 4.4,
            reviews: 28
        }
    ];

    // Load popular courses on homepage
    function loadPopularCourses() {
        const popularCoursesContainer = document.getElementById('popularCourses');
        
        if (popularCoursesContainer) {
            // Show first 3 courses as popular
            const popularCourses = coursesData.slice(0, 3);
            
            popularCoursesContainer.innerHTML = popularCourses.map(course => `
                <div class="course-card" data-course-id="${course.id}">
                    <div class="course-image">
                        <img src="${course.image}" alt="${course.title}">
                    </div>
                    <div class="course-content">
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <div class="course-meta">
                            <span><i class="fas fa-user"></i> ${course.instructor}</span>
                            <span><i class="fas fa-star"></i> ${course.rating}</span>
                        </div>
                        <div class="course-price">$${course.price}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Load all courses on courses page
    function loadAllCourses() {
        const courseGrid = document.getElementById('courseGrid');
        
        if (courseGrid) {
            courseGrid.innerHTML = coursesData.map(course => `
                <div class="course-card" data-course-id="${course.id}" data-category="${course.category.toLowerCase().replace(' ', '-')}">
                    <div class="course-image">
                        <img src="${course.image}" alt="${course.title}">
                    </div>
                    <div class="course-content">
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <div class="course-meta">
                            <span><i class="fas fa-user"></i> ${course.instructor}</span>
                            <span><i class="fas fa-star"></i> ${course.rating}</span>
                        </div>
                        <div class="course-price">$${course.price}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Filter courses by category
    function setupCourseFilters() {
        const categoryLinks = document.querySelectorAll('.course-categories a');
        
        if (categoryLinks.length > 0) {
            categoryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = this.getAttribute('data-category');
                    
                    // Update active category
                    categoryLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter courses
                    const courseCards = document.querySelectorAll('.course-card');
                    courseCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }
    }

    // Mobile menu toggle
    function setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-times');
                this.querySelector('i').classList.toggle('fa-bars');
            });
        }
    }

    // Course card click handler
    function setupCourseCardClicks() {
        document.addEventListener('click', function(e) {
            if (e.target.closest('.course-card')) {
                const courseId = e.target.closest('.course-card').getAttribute('data-course-id');
                // In a real app, this would redirect to the course detail page
                window.location.href = `course-detail.html?id=${courseId}`;
            }
        });
    }

    // Initialize main functionality
    function initMain() {
        loadPopularCourses();
        loadAllCourses();
        setupCourseFilters();
        setupMobileMenu();
        setupCourseCardClicks();
    }

    initMain();
});
