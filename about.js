// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Initialize stats counter animation
    initializeStatsCounter();
    
    // Initialize CTA buttons
    initializeCTAButtons();
    
    // Initialize team role card interactions
    initializeTeamInteractions();
    
    // Initialize tech stack interactions
    initializeTechStackInteractions();
});

// Scroll Animations - Faster and smoother
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.05, // Trigger earlier
        rootMargin: '0px 0px -20px 0px' // Less margin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger stats animation when mission section is visible
                if (entry.target.classList.contains('mission-statement')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation - Faster transitions
    const animatedElements = document.querySelectorAll(
        '.difference-card, .role-card, .value-card, .stat-item, .mission-statement, .philosophy-card, .tech-category'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)'; // Smaller distance
        element.style.transition = `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`; // Faster
        
        observer.observe(element);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Difference cards hover effects
    const differenceCards = document.querySelectorAll('.difference-card');
    differenceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 40px rgba(30, 215, 96, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Value cards rotation effect
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    let statsAnimated = false;
    
    window.animateStats = function() {
        if (statsAnimated) return;
        statsAnimated = true;
        
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text) || 0;
            const duration = 2000;
            const increment = number / (duration / 16);
            let current = 0;
            
            if (text.includes('%')) {
                // Handle percentage
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + '%';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '%';
                    }
                }, 16);
            } else if (text.includes('+')) {
                // Handle 100+
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 16);
            } else {
                // Handle 24/7 or other text
                stat.style.opacity = '0';
                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 200);
                }, 500);
            }
        });
    };
}

// CTA Buttons
function initializeCTAButtons() {
    const primaryBtn = document.getElementById('aboutCtaBtn');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.disabled = true;
            
            // Navigate to contact page
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 1500);
        });
        
        // Add ripple effect
        primaryBtn.addEventListener('click', createRippleEffect);
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Smooth transition to portfolio
            window.location.href = 'portfolio.html';
        });
    }
}

// Team Interactions
function initializeTeamInteractions() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach(card => {
        const skills = card.querySelectorAll('.skill-tag');
        
        card.addEventListener('mouseenter', function() {
            // Animate skill tags
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'translateY(-2px) scale(1.05)';
                    skill.style.boxShadow = '0 4px 12px rgba(30, 215, 96, 0.3)';
                }, index * 100);
            });
            
            // Animate icon
            const iconCircle = this.querySelector('.icon-circle');
            if (iconCircle) {
                iconCircle.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset skill tags
            skills.forEach(skill => {
                skill.style.transform = 'translateY(0) scale(1)';
                skill.style.boxShadow = '';
            });
            
            // Reset icon
            const iconCircle = this.querySelector('.icon-circle');
            if (iconCircle) {
                iconCircle.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Philosophy card pulse effect
    const philosophyCard = document.querySelector('.philosophy-card');
    if (philosophyCard) {
        setInterval(() => {
            philosophyCard.style.transform = 'scale(1.02)';
            setTimeout(() => {
                philosophyCard.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
}

// Tech Stack Interactions
function initializeTechStackInteractions() {
    const techCategories = document.querySelectorAll('.tech-category');
    
    techCategories.forEach((category, categoryIndex) => {
        const techItems = category.querySelectorAll('.tech-item');
        
        category.addEventListener('mouseenter', function() {
            // Animate tech items with stagger effect
            techItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(8px) scale(1.02)';
                    item.style.background = 'rgba(29, 185, 84, 0.15)';
                }, index * 50);
            });
            
            // Rotate category icon
            const categoryIcon = this.querySelector('h3 i');
            if (categoryIcon) {
                categoryIcon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            // Reset tech items
            techItems.forEach(item => {
                item.style.transform = 'translateX(0) scale(1)';
                item.style.background = 'rgba(255, 255, 255, 0.05)';
            });
            
            // Reset category icon
            const categoryIcon = this.querySelector('h3 i');
            if (categoryIcon) {
                categoryIcon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
        
        // Individual tech item interactions
        techItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.3) rotate(5deg)';
                    icon.style.color = '#1ed760';
                }
                
                this.style.boxShadow = '0 4px 20px rgba(29, 185, 84, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.color = '#1DB954';
                }
                
                this.style.boxShadow = '';
            });
        });
    });
    
    // Add pulse animation to tech categories on scroll
    const techStackObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const categories = entry.target.querySelectorAll('.tech-category');
                categories.forEach((category, index) => {
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                        
                        // Add subtle bounce effect
                        setTimeout(() => {
                            category.style.transform = 'translateY(-5px)';
                            setTimeout(() => {
                                category.style.transform = 'translateY(0)';
                            }, 200);
                        }, 100);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const techStackSection = document.querySelector('.tech-stack-section');
    if (techStackSection) {
        techStackObserver.observe(techStackSection);
    }
}

// Ripple Effect Function
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Parallax effect for belief quote
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const beliefQuote = document.querySelector('.belief-quote');
    
    if (beliefQuote && scrolled < window.innerHeight) {
        beliefQuote.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Intersection observer for mission stats
const missionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item');
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 200);
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

const missionSection = document.querySelector('.mission-visual');
if (missionSection) {
    missionObserver.observe(missionSection);
}

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
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
    
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
    
    .btn-primary .btn-loading {
        display: none;
    }
    
    .btn-primary.loading .btn-text {
        display: none;
    }
    
    .btn-primary.loading .btn-loading {
        display: inline;
    }
    
    .btn-primary:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }
    
    .skill-tag {
        transition: all 0.3s ease;
    }
    
    .philosophy-card {
        transition: all 0.3s ease;
    }
    
    .icon-circle {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Text typing effect for belief quote
function initializeTypingEffect() {
    const beliefQuote = document.querySelector('.belief-quote');
    if (!beliefQuote) return;
    
    const text = beliefQuote.textContent;
    beliefQuote.textContent = '';
    beliefQuote.style.borderRight = '2px solid #1ed760';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        beliefQuote.textContent += text[index];
        index++;
        
        if (index >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                beliefQuote.style.borderRight = 'none';
            }, 500);
        }
    }, 50);
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(initializeTypingEffect, 1000);
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