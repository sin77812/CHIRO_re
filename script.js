// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        }
    });
    
    // Counter Animation with Intersection Observer
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const numbers = target.querySelectorAll('.stat-number[data-target], .number[data-target]');
                
                numbers.forEach((number, index) => {
                    const targetValue = parseInt(number.getAttribute('data-target'));
                    animateCounter(number, targetValue, index * 500); // 0.5s delay between counters
                });
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe sections with counters
    const statsSection = document.querySelector('.our-impact');
    const trustBadges = document.querySelector('.trust-badges');
    if (statsSection) counterObserver.observe(statsSection);
    if (trustBadges) counterObserver.observe(trustBadges);
    
    // Intersection Observer for scroll animations - Faster
    const observerOptions = {
        threshold: 0.05, // Trigger earlier
        rootMargin: '0px 0px -20px 0px' // Less margin
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements - Faster transitions
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .portfolio-item');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)'; // Smaller distance
        element.style.transition = `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`; // Faster
        observer.observe(element);
    });
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.hero__cta, .portfolio__cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Hero CTA button functionality
    const heroCtaBtn = document.getElementById('heroCtaBtn');
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.disabled = true;
            
            // Navigate to contact page after delay
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 1500);
        });
        
        // Add ripple effect
        heroCtaBtn.addEventListener('click', function(e) {
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
    
    // Premium Hero Animations
    initializeHeroAnimations();
    initializeParallaxEffect();
});

// Hero Word Rotation Animation
function initializeHeroAnimations() {
    const words = document.querySelectorAll('.rotating-words .word');
    const rotationInterval = 3500; // 3.5 seconds
    let currentIndex = 0;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || words.length <= 1) {
        return; // Skip animation if reduced motion is preferred or no words to rotate
    }
    
    function rotateWords() {
        // Fade out current word
        if (words[currentIndex]) {
            words[currentIndex].classList.remove('active');
            words[currentIndex].classList.add('fade-out');
        }
        
        // Move to next word
        currentIndex = (currentIndex + 1) % words.length;
        
        // Fade in next word after a short delay
        setTimeout(() => {
            // Remove fade-out class from previous word
            words.forEach(word => word.classList.remove('fade-out'));
            
            // Activate new word
            if (words[currentIndex]) {
                words[currentIndex].classList.add('active');
            }
        }, 300);
    }
    
    // Start the rotation
    if (words.length > 1) {
        setInterval(rotateWords, rotationInterval);
    }
}

// Parallax Effect for Hero Section
function initializeParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero__content');
    const heroBackground = document.querySelector('.hero__background');
    
    if (!hero || !heroContent || !heroBackground) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const backgroundRate = scrolled * -0.2;
        
        // Only apply parallax if we're in the hero section
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroBackground.style.transform = `translateY(${backgroundRate}px) scale(1.1)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Enhanced Brand Name Interaction
document.addEventListener('DOMContentLoaded', function() {
    const brandName = document.querySelector('.brand-name');
    
    if (brandName) {
        // Add enhanced hover effect with mouse position tracking
        brandName.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `scale(1.05) rotateX(${deltaY * 5}deg) rotateY(${deltaX * 5}deg)`;
        });
        
        brandName.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
});

// Add CSS for active navigation link and button effects
const style = document.createElement('style');
style.textContent = `
    .nav__link.active {
        color: var(--primary-green);
    }
    
    .nav__link.active::after {
        width: 100%;
    }
    
    .hero__cta {
        position: relative;
        overflow: hidden;
    }
    
    .hero__cta .btn-loading {
        display: none;
    }
    
    .hero__cta.loading .btn-text {
        display: none;
    }
    
    .hero__cta.loading .btn-loading {
        display: inline;
    }
    
    .hero__cta:disabled {
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
`;
document.head.appendChild(style);

// Counter Animation Function
function animateCounter(element, target, delay = 0) {
    setTimeout(() => {
        let current = 0;
        const increment = target / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }, delay);
}