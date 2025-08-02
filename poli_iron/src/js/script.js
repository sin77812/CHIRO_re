// Precision Mold Manufacturing Website JavaScript
// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(35, 35, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(35, 35, 35, 0.95)';
    }
});

// Product filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 100);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.innerText.replace(/[^0-9.]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.innerText.includes('+')) {
                    counter.innerText = Math.ceil(current) + '+';
                } else {
                    counter.innerText = Math.ceil(current);
                }
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = counter.innerText; // Keep original format
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger counter animation for stats sections
            if (entry.target.classList.contains('about-stats') || 
                entry.target.classList.contains('performance-metrics')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .process-step, .product-card, .portfolio-item, .flow-step, .about-stats, .performance-metrics').forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    try {
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully! We will contact you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Form validation
const inputs = document.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
}

function clearErrors(e) {
    e.target.classList.remove('error');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Download functionality for catalogs
document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = btn.closest('.product-card').querySelector('h3').textContent;
        showNotification(`Downloading ${productName} catalog...`, 'success');
        
        // Simulate download (replace with actual download logic)
        setTimeout(() => {
            // window.open('path/to/catalog.pdf', '_blank');
        }, 1000);
    });
});

// CTA buttons functionality
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('견적') || btn.textContent.includes('Quote')) {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
        
        if (btn.textContent.includes('카탈로그') || btn.textContent.includes('Catalog')) {
            e.preventDefault();
            showNotification('Catalog download will be available soon!', 'info');
        }
    });
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Page loading animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    lazyLoadImages();
});

// Hero scroll indicator
document.querySelector('.hero-scroll').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Add error field styling
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 3px rgba(235, 87, 87, 0.1) !important;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1070;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification-success {
        border-left: 4px solid var(--color-metal-blue);
    }
    
    .notification-error {
        border-left: 4px solid var(--color-error);
    }
    
    .notification-info {
        border-left: 4px solid var(--color-mid-gray);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
    }
    
    .notification-content i {
        color: var(--color-metal-blue);
    }
    
    .notification-error .notification-content i {
        color: var(--color-error);
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--color-mid-gray);
        margin-left: auto;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-charcoal);
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .notification {
            right: 10px;
            left: 10px;
            min-width: auto;
        }
    }
`;

document.head.appendChild(style);