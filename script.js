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
    
    // Why Chiro 스크롤 애니메이션 제거됨 (미니멀 디자인으로 변경)


    // Impact Stats Animation with Intersection Observer
    const impactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                animateImpactStats();
                impactObserver.unobserve(target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe impact grid section
    const impactGrid = document.querySelector('.impact-grid');
    if (impactGrid) impactObserver.observe(impactGrid);
    
    // Counter Animation with Intersection Observer (for trust badges)
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const numbers = target.querySelectorAll('.number[data-target]');
                
                numbers.forEach((number, index) => {
                    const targetValue = parseInt(number.getAttribute('data-target'));
                    animateCounter(number, targetValue, index * 500);
                });
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe trust badges
    const trustBadges = document.querySelector('.trust-badges');
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
    
    // Premium Hero Animations Orchestra
    initializeHeroAnimations();
    initializeParallaxEffect();
    initializeHeroOrchestration();
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

// Premium Parallax Effect for Hero Section
function initializeParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero__content');
    const heroBackground = document.querySelector('.hero__background');
    
    if (!hero || !heroContent || !heroBackground) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    let ticking = false;
    
    // Mouse parallax effect
    function handleMouseMove(e) {
        if (prefersReducedMotion) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate mouse position as percentage
        const xPercent = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const yPercent = (clientY / innerHeight - 0.5) * 2; // -1 to 1
        
        // Apply subtle parallax (max 5px movement)
        const moveX = xPercent * 3;
        const moveY = yPercent * 3;
        
        heroBackground.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    // Scroll parallax effect
    function updateScrollParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const backgroundRate = scrolled * -0.1;
        
        // Only apply parallax if we're in the hero section
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            // Blend with mouse parallax
            const currentTransform = heroBackground.style.transform || 'translate(0px, 0px)';
            const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
            
            if (translateMatch) {
                const [, coords] = translateMatch;
                const [x] = coords.split(',').map(s => s.trim());
                heroBackground.style.transform = `${currentTransform.replace(/translate\([^)]+\)/, `translate(${x}, ${backgroundRate}px)`)}`;
            } else {
                heroBackground.style.transform = `translateY(${backgroundRate}px)`;
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollParallax);
            ticking = true;
        }
    }
    
    // Add mouse parallax
    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Add scroll parallax
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Cleanup on leave
    hero.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion) {
            heroBackground.style.transform = 'translate(0px, 0px)';
        }
    });
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

// Impact Stats Animation Function
function animateImpactStats() {
    // 1. 프로그레스 바 애니메이션
    document.querySelectorAll('.progress-ring-fill').forEach((circle, index) => {
        const targets = [47, 10, 100];  // 각 카드의 목표값
        const maxValues = [50, 15, 100]; // 프로그레스 바 최대값
        
        const target = targets[index];
        const maxValue = maxValues[index];
        const percentage = (target / maxValue) * 100;
        
        // 모바일과 데스크탑 구분
        const isMobile = window.innerWidth <= 768;
        const circumference = 220; // 2π × 35
        const offset = circumference - (percentage / 100) * circumference;
        
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, index * 300);
    });

    // 2. 숫자 카운터 애니메이션 (펄스 효과 포함)
    document.querySelectorAll('.impact-number[data-target]').forEach((num, index) => {
        const target = parseInt(num.dataset.target);
        let current = 0;
        
        setTimeout(() => {
            const increment = target / 60; // 60 frames
            const duration = 2000; // 2 seconds
            const stepTime = duration / 60;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    num.textContent = target;
                    clearInterval(timer);
                    
                    // 완료 시 체크 효과
                    num.style.color = '#1ed760';
                    num.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        num.style.color = '#1DB954';
                        num.style.transform = 'scale(1)';
                    }, 500);
                } else {
                    num.textContent = Math.floor(current);
                    
                    // 펄스 효과
                    if (Math.floor(current) % 10 === 0 && Math.floor(current) > 0) {
                        num.style.transform = 'scale(1.05)';
                        setTimeout(() => num.style.transform = 'scale(1)', 100);
                    }
                }
            }, stepTime);
        }, index * 500); // 0.5초 간격으로 순차 시작
    });
}

// Counter Animation Function (for trust badges)
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

// Premium Word Morphing Animation - 2024 Enhanced Version
function initializeMorphingWord() {
    const morphingElement = document.querySelector('.morphing-word');
    if (!morphingElement) return;

    const words = ['혁신을', '성장을', '차별화를', '미래를', '첫인상을'];
    let currentIndex = 0;
    let morphingTimer;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function changeWord() {
        // Add fade-out effect
        morphingElement.classList.add('fade-out');
        
        setTimeout(() => {
            // Change to next word
            currentIndex = (currentIndex + 1) % words.length;
            morphingElement.textContent = words[currentIndex];
            
            // Remove fade-out and add fade-in
            morphingElement.classList.remove('fade-out');
            morphingElement.classList.add('fade-in');
            
            setTimeout(() => {
                // Complete fade-in animation
                morphingElement.classList.remove('fade-in');
            }, 100);
        }, 300);
    }

    // Start morphing animation
    function startMorphing() {
        const interval = prefersReducedMotion ? 4000 : 3000;
        morphingTimer = setInterval(changeWord, interval);
    }

    // Initialize first word
    morphingElement.textContent = words[0];

    // Start animation after 3 seconds
    setTimeout(() => {
        startMorphing();
    }, 3000);

    // Cleanup function for memory management
    return function cleanup() {
        if (morphingTimer) {
            clearInterval(morphingTimer);
            morphingTimer = null;
        }
    };
}

// 스크롤 진행 바 기능
function initializeScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    let ticking = false;

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }

    // 초기 진행률 설정
    updateScrollProgress();
    
    // 스크롤 이벤트 리스너 추가 (패시브 모드)
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Cleanup function
    return function cleanup() {
        window.removeEventListener('scroll', onScroll);
    };
}

// Portfolio Card Click Functionality
function initializePortfolioCards() {
    const portfolioCards = document.querySelectorAll('.portfolio-card[data-demo-url]');
    
    portfolioCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const demoUrl = this.getAttribute('data-demo-url');
            
            if (demoUrl) {
                // Add loading state
                const cardContent = this.querySelector('.card-content p');
                const originalText = cardContent.textContent;
                
                cardContent.textContent = '사이트 열기 중...';
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Open the demo site
                window.open(demoUrl, '_blank');
                
                // Reset card after delay
                setTimeout(() => {
                    cardContent.textContent = originalText;
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 1500);
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Premium Hero Animation Orchestration - 2024 Enhanced
function initializeHeroOrchestration() {
    const heroContent = document.querySelector('.hero__content');
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroCta = document.querySelector('.hero__cta');
    const trustBadges = document.querySelector('.trust-badges');
    const floatingGeometry = document.querySelectorAll('.floating-geometry');
    const transformLines = document.querySelectorAll('.line-path');
    
    if (!heroContent) return;
    
    // Step 1: Background fade-in (0.5s)
    setTimeout(() => {
        document.querySelector('.hero__background').style.opacity = '0.7';
    }, 500);
    
    // Step 2: Signature graphics appear (0.8s, 0.3s intervals)
    floatingGeometry.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = index === 0 ? '0.15' : '0.12';
            element.style.transform = 'translateY(0)';
        }, 800 + (index * 300));
    });
    
    // Step 3: Main text slides in from bottom (1s)
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 1000);
    
    // Step 4: Subtitle + CTA button appear (1.3s)
    setTimeout(() => {
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }
    }, 1300);
    
    setTimeout(() => {
        if (heroCta) {
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }
    }, 1500);
    
    // Step 5: Trust badges appear (1.8s)
    setTimeout(() => {
        if (trustBadges) {
            trustBadges.style.opacity = '1';
            trustBadges.style.transform = 'translateY(0)';
        }
    }, 1800);
    
    // Step 6: Transformation lines draw (2s)
    setTimeout(() => {
        transformLines.forEach(line => {
            line.style.strokeDashoffset = '0';
        });
    }, 2000);
}

// Continuous Background Animation
function initializeContinuousAnimations() {
    const heroBackground = document.querySelector('.hero__background');
    if (!heroBackground) return;
    
    // Subtle background position shift every 30s
    let animationPhase = 0;
    
    setInterval(() => {
        animationPhase = (animationPhase + 1) % 4;
        
        const transforms = [
            'translate(0, 0) scale(1)',
            'translate(5px, -3px) scale(1.01)',
            'translate(-3px, 2px) scale(0.99)',
            'translate(2px, -5px) scale(1.005)'
        ];
        
        heroBackground.style.transform = transforms[animationPhase];
    }, 30000);
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing animations
    const morphingCleanup = initializeMorphingWord();
    const scrollProgressCleanup = initializeScrollProgress();
    
    // Initialize portfolio cards
    initializePortfolioCards();
    
    // Initialize continuous animations
    initializeContinuousAnimations();
    
    // Store cleanup functions
    window.morphingCleanup = morphingCleanup;
    window.scrollProgressCleanup = scrollProgressCleanup;
});