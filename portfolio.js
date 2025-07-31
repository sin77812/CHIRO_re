// Portfolio Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    initializeFilters();
    
    // Before/After slider functionality
    initializeBeforeAfterSliders();
    
    // Demo button functionality
    initializeDemoButtons();
});

// Filter System
function initializeFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const caseCards = document.querySelectorAll('.case-card');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter tag
            filterTags.forEach(t => t.classList.remove('filter-tag--active'));
            this.classList.add('filter-tag--active');
            
            // Filter case cards
            caseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Smooth scroll to cases section after filtering
            setTimeout(() => {
                document.querySelector('.portfolio-cases').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
    });
}

// Before/After Slider
function initializeBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const container = slider.querySelector('.before-after-container');
        const afterImage = slider.querySelector('.after-image');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;
        
        // Mouse events
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        
        // Touch events
        handle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', stopDrag);
        
        function startDrag(e) {
            isDragging = true;
            slider.style.cursor = 'ew-resize';
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const rect = container.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            // Update clip-path
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            
            // Update handle position
            handle.style.left = `${percentage}%`;
            
            e.preventDefault();
        }
        
        function stopDrag() {
            isDragging = false;
            slider.style.cursor = 'default';
        }
        
        // Click anywhere on slider to move handle
        container.addEventListener('click', function(e) {
            if (e.target === handle) return;
            
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            // Animate to new position
            afterImage.style.transition = 'clip-path 0.3s ease';
            handle.style.transition = 'left 0.3s ease';
            
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            handle.style.left = `${percentage}%`;
            
            // Remove transition after animation
            setTimeout(() => {
                afterImage.style.transition = '';
                handle.style.transition = '';
            }, 300);
        });
    });
}

// Demo Button Functionality
function initializeDemoButtons() {
    const demoButtons = document.querySelectorAll('.btn-demo');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Check if button has specific demo URL
            const demoUrl = this.getAttribute('data-demo-url');
            
            if (demoUrl) {
                // Add loading state
                const originalText = this.textContent;
                this.textContent = '사이트 열기 중...';
                this.disabled = true;
                
                // Open the specific demo site
                window.open(demoUrl, '_blank');
                
                // Reset button after delay
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            } else {
                // Fallback for other buttons
                const caseCard = this.closest('.case-card');
                const category = caseCard.getAttribute('data-category');
                
                // Demo URLs for other categories
                const demoUrls = {
                    'manufacturing': 'https://example-manufacturing.com',
                    'hospital': 'https://example-hospital.com',
                    'lawyer': 'https://example-lawyer.com',
                    'service': 'https://example-service.com'
                };
                
                const fallbackUrl = demoUrls[category];
                
                if (fallbackUrl) {
                    // Add loading state
                    const originalText = this.textContent;
                    this.textContent = '사이트 열기 중...';
                    this.disabled = true;
                    
                    // Open in new tab
                    window.open(fallbackUrl, '_blank');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.disabled = false;
                    }, 1000);
                } else {
                    // Show coming soon message
                    this.textContent = '준비 중입니다';
                    setTimeout(() => {
                        this.textContent = '실제 사이트 보기';
                    }, 2000);
                }
            }
        });
    });
}

// Intersection Observer for animations - Faster
const observerOptions = {
    threshold: 0.05, // Trigger earlier
    rootMargin: '0px 0px -20px 0px' // Less margin
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all case cards for scroll animations - Faster transitions
document.addEventListener('DOMContentLoaded', function() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)'; // Smaller distance
        card.style.transition = `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.03}s`; // Faster
        observer.observe(card);
    });
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

// Add loading animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle URL hash for direct filtering
window.addEventListener('load', function() {
    const hash = window.location.hash;
    const filterMap = {
        '#manufacturing': 'manufacturing',
        '#hospital': 'hospital',
        '#cafe': 'cafe',
        '#lawyer': 'lawyer',
        '#service': 'service'
    };
    
    if (filterMap[hash]) {
        const filterButton = document.querySelector(`[data-filter="${filterMap[hash]}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
});