// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCounters();
    initializePortfolioFilter();
    initializeBeforeAfterSliders();
    initializeContactForm();
    initializeScrollAnimations();
});

// Navigation Functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change nav background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(248, 250, 252, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(248, 250, 252, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Portfolio Filter Functionality
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    // Add fade in animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Before/After Slider Functionality
function initializeBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const afterImg = slider.querySelector('.after-img');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;

        function updateSlider(percentage) {
            const clampedPercentage = Math.max(0, Math.min(100, percentage));
            afterImg.style.clipPath = `inset(0 ${100 - clampedPercentage}% 0 0)`;
            handle.style.left = `${clampedPercentage}%`;
        }

        function getPercentage(e, slider) {
            const rect = slider.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            return (x / rect.width) * 100;
        }

        // Mouse events
        slider.addEventListener('mousedown', function(e) {
            isDragging = true;
            slider.style.cursor = 'grabbing';
            updateSlider(getPercentage(e, slider));
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                updateSlider(getPercentage(e, slider));
            }
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                slider.style.cursor = 'ew-resize';
            }
        });

        // Touch events for mobile
        slider.addEventListener('touchstart', function(e) {
            isDragging = true;
            updateSlider(getPercentage(e, slider));
            e.preventDefault();
        });

        document.addEventListener('touchmove', function(e) {
            if (isDragging) {
                updateSlider(getPercentage(e, slider));
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', function() {
            isDragging = false;
        });

        // Click to set position
        slider.addEventListener('click', function(e) {
            if (!isDragging) {
                updateSlider(getPercentage(e, slider));
            }
        });

        // Set initial position
        updateSlider(50);
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate form
            if (validateForm(formObject)) {
                // Show success message
                showFormMessage('문의가 성공적으로 전송되었습니다. 2시간 내에 연락드리겠습니다.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the data to a server
                console.log('Form submitted:', formObject);
            }
        });
    }

    // File input styling
    const fileInput = document.getElementById('file');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : '파일을 선택하세요';
            const label = this.nextElementSibling || this.parentNode.querySelector('label[for="file"]');
            if (label) {
                label.textContent = fileName;
            }
        });
    }
}

// Form validation
function validateForm(formData) {
    const required = ['name', 'email', 'phone'];
    const errors = [];

    required.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            errors.push(`${getFieldLabel(field)} 필드는 필수입니다.`);
        }
    });

    // Email validation
    if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push('올바른 이메일 주소를 입력해주세요.');
        }
    }

    // Phone validation
    if (formData.phone) {
        const phoneRegex = /^[0-9-+\s()]+$/;
        if (!phoneRegex.test(formData.phone)) {
            errors.push('올바른 전화번호를 입력해주세요.');
        }
    }

    if (errors.length > 0) {
        showFormMessage(errors.join('\n'), 'error');
        return false;
    }

    return true;
}

function getFieldLabel(field) {
    const labels = {
        'name': '성함/회사명',
        'email': '이메일',
        'phone': '연락처',
        'project': '프로젝트 정보'
    };
    return labels[field] || field;
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 600;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;

    // Insert message
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .why-card, .portfolio-card, .process-step');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Smooth scroll for CTA buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        // Add paths to critical images here when you have them
        // 'img/hero-bg.jpg',
        // 'img/project-01-before.jpg',
        // 'img/project-01-after.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();