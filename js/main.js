// Sample course data
const courses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        instructor: "John Smith",
        category: "technology",
        image: "https://via.placeholder.com/800x450",
        description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
        price: 49.99,
        rating: 4.5,
        students: 1250,
        duration: "8 weeks"
    },
    {
        id: 2,
        title: "Business Management Fundamentals",
        instructor: "Sarah Johnson",
        category: "business",
        image: "https://via.placeholder.com/800x450",
        description: "Essential skills for effective business management and leadership.",
        price: 59.99,
        rating: 4.2,
        students: 890,
        duration: "6 weeks"
    },
    {
        id: 3,
        title: "Graphic Design Principles",
        instructor: "Michael Chen",
        category: "design",
        image: "https://via.placeholder.com/800x450",
        description: "Master the core principles of graphic design and visual communication.",
        price: 39.99,
        rating: 4.7,
        students: 2100,
        duration: "5 weeks"
    },
    {
        id: 4,
        title: "Spanish for Beginners",
        instructor: "Maria Garcia",
        category: "language",
        image: "https://via.placeholder.com/800x450",
        description: "Start speaking Spanish with confidence in everyday situations.",
        price: 29.99,
        rating: 4.3,
        students: 1500,
        duration: "10 weeks"
    },
    {
        id: 5,
        title: "Data Science with Python",
        instructor: "David Wilson",
        category: "technology",
        image: "https://via.placeholder.com/800x450",
        description: "Learn data analysis and visualization using Python and popular libraries.",
        price: 69.99,
        rating: 4.8,
        students: 1800,
        duration: "12 weeks"
    },
    {
        id: 6,
        title: "Digital Marketing Strategy",
        instructor: "Emily Brown",
        category: "business",
        image: "https://via.placeholder.com/800x450",
        description: "Develop effective digital marketing campaigns across multiple channels.",
        price: 54.99,
        rating: 4.4,
        students: 950,
        duration: "7 weeks"
    }
];

// Load popular courses on homepage
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('popularCourses')) {
        loadPopularCourses();
    }
    
    if (document.getElementById('allCourses')) {
        loadAllCourses();
        setupCourseFilters();
    }
    
    if (document.getElementById('courseDetailTitle')) {
        loadCourseDetails();
    }
});

function loadPopularCourses() {
    const popularCoursesContainer = document.getElementById('popularCourses');
    
    // Get top 4 rated courses
    const popularCourses = [...courses]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    
    popularCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        popularCoursesContainer.appendChild(courseCard);
    });
}

function loadAllCourses() {
    const allCoursesContainer = document.getElementById('allCourses');
    allCoursesContainer.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        allCoursesContainer.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.dataset.id = course.id;
    courseCard.dataset.category = course.category;
    
    courseCard.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}">
        </div>
        <div class="course-info">
            <h3>${course.title}</h3>
            <div class="course-meta">
                <span class="course-instructor">${course.instructor}</span>
                <span class="course-price">$${course.price}</span>
            </div>
            <div class="course-meta">
                <span class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
                <span class="course-rating">${getStarRating(course.rating)}</span>
            </div>
            <a href="course-detail.html?id=${course.id}" class="btn btn-secondary" style="width: 100%; margin-top: 10px;">View Course</a>
        </div>
    `;
    
    return courseCard;
}

function setupCourseFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    searchInput.addEventListener('input', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);
}

function filterCourses() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const courseCards = document.querySelectorAll('.course-card');
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.dataset.category;
        
        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

function loadCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    
    const course = courses.find(c => c.id === courseId);
    
    if (course) {
        document.getElementById('courseDetailTitle').textContent = course.title;
        document.getElementById('courseDetailInstructor').textContent = course.instructor;
        document.getElementById('courseDetailCategory').textContent = course.category.charAt(0).toUpperCase() + course.category.slice(1);
        document.getElementById('courseDetailStudents').textContent = `${course.students} students`;
        document.getElementById('courseDetailRating').textContent = getStarRating(course.rating);
        document.getElementById('courseDetailImage').src = course.image;
        document.getElementById('courseDetailImage').alt = course.title;
        
        const descriptionElement = document.getElementById('courseDetailDescription');
        descriptionElement.innerHTML = `<p>${course.description}</p>`;
        
        const outcomesList = document.getElementById('courseDetailOutcomes');
        const outcomes = [
            "Understand core concepts and principles",
            "Develop practical skills through hands-on projects",
            "Apply knowledge to real-world scenarios",
            "Build a portfolio of work",
            "Prepare for certification exams"
        ];
        
        outcomes.forEach(outcome => {
            const li = document.createElement('li');
            li.textContent = outcome;
            outcomesList.appendChild(li);
        });
        
        const requirementsList = document.getElementById('courseDetailRequirements');
        const requirements = [
            "Basic computer skills",
            "Internet connection",
            "Dedication to learn",
            "No prior experience required"
        ];
        
        requirements.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            requirementsList.appendChild(li);
        });
        
        // Load course curriculum
        loadCourseCurriculum(courseId);
        
        // Load course reviews
        loadCourseReviews(courseId);
    } else {
        // Redirect to courses page if course not found
        window.location.href = 'courses.html';
    }
}

function loadCourseCurriculum(courseId) {
    const modulesList = document.getElementById('courseModules');
    modulesList.innerHTML = '';
    
    // Sample curriculum data
    const curriculum = [
        {
            id: 1,
            title: "Introduction",
            contents: [
                { type: "video", title: "Welcome to the Course", duration: 5, status: "completed" },
                { type: "document", title: "Course Syllabus", duration: 10, status: "completed" },
                { type: "quiz", title: "Pre-Course Assessment", duration: 15, status: "locked" }
            ]
        },
        {
            id: 2,
            title: "Fundamentals",
            contents: [
                { type: "video", title: "Key Concepts Explained", duration: 25, status: "locked" },
                { type: "document", title: "Reference Materials", duration: 20, status: "locked" },
                { type: "assignment", title: "Practice Exercise", duration: 30, status: "locked" }
            ]
        },
        {
            id: 3,
            title: "Advanced Topics",
            contents: [
                { type: "video", title: "Deep Dive into Subject", duration: 35, status: "locked" },
                { type: "quiz", title: "Knowledge Check", duration: 20, status: "locked" },
                { type: "assignment", title: "Project Work", duration: 60, status: "locked" }
            ]
        }
    ];
    
    curriculum.forEach(module => {
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module';
        
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        moduleHeader.innerHTML = `
            <h3>Module ${module.id}: ${module.title}</h3>
            <span class="toggle-icon">+</span>
        `;
        
        const moduleContent = document.createElement('div');
        moduleContent.className = 'module-content';
        
        module.contents.forEach(content => {
            const contentElement = document.createElement('div');
            contentElement.className = 'content-item';
            
            const icon = getContentIcon(content.type);
            
            contentElement.innerHTML = `
                <div class="content-icon">${icon}</div>
                <div class="content-info">
                    <h4>${content.title}</h4>
                    <div class="content-meta">
                        <span>${content.type.charAt(0).toUpperCase() + content.type.slice(1)}</span>
                        <span>${content.duration} min</span>
                    </div>
                </div>
                <div class="content-status ${content.status}">
                    ${content.status === 'completed' ? '✓ Completed' : '🔒 Locked'}
                </div>
            `;
            
            moduleContent.appendChild(contentElement);
        });
        
        moduleHeader.addEventListener('click', () => {
            moduleElement.classList.toggle('active');
            const icon = moduleHeader.querySelector('.toggle-icon');
            icon.textContent = moduleElement.classList.contains('active') ? '−' : '+';
        });
        
        moduleElement.appendChild(moduleHeader);
        moduleElement.appendChild(moduleContent);
        modulesList.appendChild(moduleElement);
    });
    
    // Calculate and display progress
    const totalContents = curriculum.reduce((sum, module) => sum + module.contents.length, 0);
    const completedContents = curriculum.reduce((sum, module) => {
        return sum + module.contents.filter(c => c.status === 'completed').length;
    }, 0);
    
    const progressPercentage = Math.round((completedContents / totalContents) * 100);
    
    document.getElementById('courseProgressFill').style.width = `${progressPercentage}%`;
    document.getElementById('courseProgressText').textContent = `${progressPercentage}% Complete`;
    
    // Animate progress ring if exists
    const progressRing = document.querySelector('.progress-ring-circle');
    if (progressRing) {
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (progressPercentage / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

function getContentIcon(type) {
    const icons = {
        video: '▶️',
        document: '📄',
        quiz: '✏️',
        assignment: '📝'
    };
    return icons[type] || '📖';
}

function loadCourseReviews(courseId) {
    const reviewsList = document.getElementById('courseReviews');
    reviewsList.innerHTML = '';
    
    // Sample reviews data
    const reviews = [
        {
            id: 1,
            author: "Alex Johnson",
            date: "2 weeks ago",
            rating: 5,
            title: "Excellent Course!",
            content: "This course exceeded my expectations. The instructor was knowledgeable and the material was well-structured."
        },
        {
            id: 2,
            author: "Sarah Miller",
            date: "1 month ago",
            rating: 4,
            title: "Very Informative",
            content: "I learned a lot from this course. The only reason I'm not giving 5 stars is that some sections could use more examples."
        },
        {
            id: 3,
            author: "David Kim",
            date: "2 months ago",
            rating: 5,
            title: "Perfect for Beginners",
            content: "As someone with no prior experience, I found this course to be the perfect introduction. The pace was just right."
        }
    ];
    
    // Calculate average rating
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    document.getElementById('averageCourseRating').textContent = averageRating.toFixed(1);
    document.getElementById('totalCourseReviews').textContent = `(${reviews.length} reviews)`;
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.author}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <h4 class="review-title">${review.title}</h4>
            <p class="review-content">${review.content}</p>
        `;
        
        reviewsList.appendChild(reviewElement);
    });
    
    // Setup review form
    const addReviewBtn = document.getElementById('addReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const closeBtn = reviewModal.querySelector('.close-btn');
    const reviewForm = document.getElementById('reviewForm');
    
    addReviewBtn.addEventListener('click', () => {
        reviewModal.style.display = 'flex';
    });
    
    closeBtn.addEventListener('click', () => {
        reviewModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.style.display = 'none';
        }
    });
    
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('reviewTitle').value;
        const content = document.getElementById('reviewContent').value;
        const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
        
        // In a real app, you would send this data to the server
        console.log('Review submitted:', { title, content, rating });
        
        // Show success message
        alert('Thank you for your review!');
        
        // Reset form and close modal
        reviewForm.reset();
        reviewModal.style.display = 'none';
    });
}
