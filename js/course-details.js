document.addEventListener('DOMContentLoaded', function() {
    // Sample course data
    const courseData = {
        id: 1,
        title: 'Introduction to Programming with Python',
        instructor: 'Prof. John Smith',
        category: 'Programming',
        rating: 4.5,
        reviews: 1234,
        price: 49.99,
        students: 1245,
        duration: '8 weeks • 40 hours',
        description: 'This course introduces the fundamental concepts of programming using the Python programming language. You\'ll learn how to write programs, solve problems, and think like a programmer. No prior programming experience is required.',
        learningOutcomes: [
            'Fundamental programming concepts',
            'Python syntax and semantics',
            'Problem-solving techniques',
            'Data structures and algorithms',
            'Debugging and testing'
        ],
        requirements: [
            'A computer with internet access',
            'Python 3 installed',
            '5-10 hours per week'
        ],
        curriculum: [
            {
                week: 1,
                title: 'Introduction to Python',
                lectures: 5,
                hours: 2,
                items: [
                    'Introduction to Programming',
                    'Installing Python',
                    'Your First Python Program',
                    'Variables and Data Types',
                    'Week 1 Quiz'
                ]
            },
            {
                week: 2,
                title: 'Control Structures',
                lectures: 6,
                hours: 3,
                items: [
                    'Conditional Statements',
                    'Loops',
                    'Functions',
                    'Scope and Namespaces',
                    'Week 2 Assignment'
                ]
            }
        ],
        instructorBio: 'John Smith is a Senior Software Engineer with over 15 years of experience in the tech industry. He has worked at major companies like Google and Microsoft, and has been teaching programming for the past 5 years. His teaching style focuses on practical, real-world applications of programming concepts.',
        reviews: [
            {
                id: 1,
                name: 'Alice Johnson',
                avatar: 'assets/images/user1.jpg',
                rating: 5,
                date: '2 weeks ago',
                content: 'This course was amazing! I had no programming experience before taking this course, and now I feel confident writing Python programs. The instructor explains concepts clearly and provides great examples.'
            },
            {
                id: 2,
                name: 'Bob Smith',
                avatar: 'assets/images/user2.jpg',
                rating: 4,
                date: '1 month ago',
                content: 'Great course overall. The content is well-structured and easy to follow. I wish there were more advanced exercises, but for beginners, this is perfect.'
            }
        ]
    };

    // Load course data
    function loadCourseData() {
        // Set basic course info
        document.querySelector('.course-header h1').textContent = courseData.title;
        document.querySelector('.instructor-info span').textContent = courseData.instructor;
        document.querySelector('.course-rating h3').textContent = courseData.rating;
        document.querySelector('.course-rating span').textContent = `${courseData.rating} (${courseData.reviews} reviews)`;
        document.querySelector('.course-category span').textContent = courseData.category;
        document.querySelector('.course-description').textContent = courseData.description;
        
        // Set learning outcomes
        const learningList = document.querySelector('.learning-list');
        learningList.innerHTML = courseData.learningOutcomes.map(item => `
            <li><i class="fas fa-check"></i> ${item}</li>
        `).join('');
        
        // Set requirements
        const requirementsList = document.querySelector('.requirements-list');
        requirementsList.innerHTML = courseData.requirements.map(item => `
            <li><i class="fas fa-laptop"></i> ${item}</li>
        `).join('');
        
        // Set curriculum
        const curriculumAccordion = document.querySelector('.curriculum-accordion');
        curriculumAccordion.innerHTML = courseData.curriculum.map(week => `
            <div class="accordion-item">
                <div class="accordion-header">
                    <h4>Week ${week.week}: ${week.title}</h4>
                    <span>${week.lectures} Lectures • ${week.hours} Hours</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="accordion-content">
                    <ul>
                        ${week.items.map(item => `
                            <li><i class="fas fa-play-circle"></i> ${item}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
        
        // Set instructor info
        document.querySelector('.instructor-bio p').textContent = courseData.instructorBio;
        
        // Set reviews
        const reviewsList = document.querySelector('.reviews-list');
        reviewsList.innerHTML = courseData.reviews.map(review => `
            <div class="review">
                <div class="review-header">
                    <img src="${review.avatar}" alt="${review.name}">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="stars">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            ${review.rating < 5 ? '<i class="far fa-star"></i>'.repeat(5 - review.rating) : ''}
                        </div>
                    </div>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-content">
                    <p>${review.content}</p>
                </div>
            </div>
        `).join('');
        
        // Set sidebar info
        document.querySelector('.price').textContent = `$${courseData.price}`;
        document.querySelector('.course-info .info-item:nth-child(1) span').textContent = `${courseData.students} students enrolled`;
        document.querySelector('.course-info .info-item:nth-child(2) span').textContent = courseData.duration;
    }

    // Tab functionality
    function setupTabs() {
        const tabNavItems = document.querySelectorAll('.tab-nav li');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabNavItems.forEach(item => {
            item.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Update active tab
                tabNavItems.forEach(tab => tab.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding pane
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === tabName) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }

    // Accordion functionality
    function setupAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const accordionContent = this.nextElementSibling;
                
                // Toggle active class
                accordionItem.classList.toggle('active');
                
                // Toggle content visibility
                if (accordionItem.classList.contains('active')) {
                    accordionContent.classList.add('active');
                } else {
                    accordionContent.classList.remove('active');
                }
            });
        });
    }

    // Enroll button functionality
    function setupEnrollButton() {
        const enrollBtn = document.querySelector('.course-actions .btn-primary');
        
        enrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('You have successfully enrolled in this course!');
        });
    }

    // Initialize course details page
    function initCourseDetails() {
        loadCourseData();
        setupTabs();
        setupAccordion();
        setupEnrollButton();
    }

    initCourseDetails();
});
