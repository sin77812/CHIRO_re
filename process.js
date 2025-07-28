// Process Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize phase card interactions
    initializePhaseInteractions();
    
    // Initialize CTA button functionality
    initializeCTAButton();
    
    // Initialize tool hover effects
    initializeToolEffects();
});

// Scroll Animations - Faster and smoother
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.05, // Trigger earlier
        rootMargin: '0px 0px -20px 0px' // Less margin for faster trigger
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation with faster transitions
    const animatedElements = document.querySelectorAll('.phase-card, .promise-card, .tool-item, .flow-step');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)'; // Smaller distance
        element.style.transition = `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`; // Faster, smoother
        
        observer.observe(element);
    });
}

// Phase Card Interactions
function initializePhaseInteractions() {
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach(card => {
        const tasks = card.querySelectorAll('.task-item');
        
        // Add hover effects to tasks
        tasks.forEach((task, index) => {
            task.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(30, 215, 96, 0.05)';
                this.style.borderColor = 'rgba(30, 215, 96, 0.2)';
                this.style.transform = 'translateX(5px)';
            });
            
            task.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 255, 255, 0.02)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                this.style.transform = 'translateX(0)';
            });
        });

        // Add click to expand functionality
        card.addEventListener('click', function(e) {
            if (e.target.closest('.task-item')) return;
            
            const isExpanded = this.classList.contains('expanded');
            
            // Close all other expanded cards
            phaseCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            this.classList.toggle('expanded', !isExpanded);
        });
    });
}

// CTA Button Functionality
function initializeCTAButton() {
    const ctaButton = document.getElementById('processCtaBtn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.disabled = true;
            
            // Navigate to contact page
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 1500);
        });
        
        // Add ripple effect
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
}

// Tool Effects
function initializeToolEffects() {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(tool => {
        tool.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.tool-logo');
            if (logo) {
                logo.style.transform = 'scale(1.1) rotate(5deg)';
                logo.style.transition = 'all 0.3s ease';
            }
        });
        
        tool.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.tool-logo');
            if (logo) {
                logo.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .phase-card.expanded {
        transform: scale(1.02);
        box-shadow: 0 12px 40px rgba(30, 215, 96, 0.15);
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .cta-button .btn-loading {
        display: none;
    }
    
    .cta-button.loading .btn-text {
        display: none;
    }
    
    .cta-button.loading .btn-loading {
        display: inline;
    }
    
    .cta-button:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .task-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Progress indicator for process steps
function initializeProgressIndicator() {
    const processSteps = document.querySelectorAll('.flow-step');
    let currentStep = 0;
    
    const updateProgress = () => {
        processSteps.forEach((step, index) => {
            const icon = step.querySelector('.flow-icon');
            if (index <= currentStep) {
                icon.style.background = 'linear-gradient(135deg, #1ed760 0%, #1db954 100%)';
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'all 0.4s ease';
            } else {
                icon.style.background = '#333';
                icon.style.transform = 'scale(1)';
                icon.style.transition = 'all 0.4s ease';
            }
        });
    };
    
    // Auto-advance progress every 1.5 seconds (faster)
    setInterval(() => {
        currentStep = (currentStep + 1) % processSteps.length;
        updateProgress();
    }, 1500);
    
    updateProgress();
}

// Initialize progress indicator when page loads
window.addEventListener('load', () => {
    setTimeout(initializeProgressIndicator, 1000);
});

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading state when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.process-hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Communication badge pulse effect
const commBadges = document.querySelectorAll('.comm-badge--priority');
commBadges.forEach(badge => {
    setInterval(() => {
        badge.style.transform = 'scale(1.05)';
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 300);
    }, 2000);
});