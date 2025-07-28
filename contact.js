// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize FAQ accordion
    initializeFAQ();
    
    // Initialize contact options
    initializeContactOptions();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('consultationForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = '필수 입력 항목입니다.';
        }
        
        // Specific field validations
        if (value && fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = '올바른 이메일 형식이 아닙니다.';
            }
        }
        
        if (value && fieldName === 'phone') {
            const phoneRegex = /^[0-9-+\s()]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = '올바른 전화번호 형식이 아닙니다.';
            }
        }
        
        if (value && fieldName === 'currentWebsite') {
            try {
                new URL(value);
            } catch {
                isValid = false;
                errorMessage = '올바른 URL 형식이 아닙니다. (예: https://example.com)';
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    function validateForm() {
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    function submitForm() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Send notification (you can replace this with actual email service)
            sendNotification(data);
            
        }, 2000);
    }
    
    function showSuccessMessage() {
        const existingSuccess = form.querySelector('.form-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <strong>상담 신청이 완료되었습니다!</strong><br>
            24시간 내에 연락드리겠습니다. 감사합니다.
        `;
        
        form.appendChild(successDiv);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function sendNotification(data) {
        // This would typically send an email or notification
        // For demo purposes, we'll just log it
        console.log('Notification sent for:', data.companyName);
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// Contact Options
function initializeContactOptions() {
    // Kakao Talk buttons
    const kakaoBtn = document.querySelector('.kakao-btn');
    const kakaoBtnMobile = document.querySelector('.kakao-btn-mobile');
    
    if (kakaoBtn) {
        kakaoBtn.addEventListener('click', function() {
            // Replace with actual Kakao Talk channel URL
            window.open('https://pf.kakao.com/_your_channel_id', '_blank');
        });
    }
    
    if (kakaoBtnMobile) {
        kakaoBtnMobile.addEventListener('click', function() {
            // Mobile Kakao Talk deep link
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                window.location.href = 'kakaoplus://plusfriend/friend/_your_channel_id';
            } else {
                window.open('https://pf.kakao.com/_your_channel_id', '_blank');
            }
        });
    }
    
    // Phone call button
    const callBtn = document.querySelector('.call-btn');
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            const phoneNumber = document.querySelector('.phone-number').textContent;
            window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
        });
    }
    
    // Meeting booking button
    const meetingBtn = document.querySelector('.meeting-btn');
    if (meetingBtn) {
        meetingBtn.addEventListener('click', function() {
            // Replace with actual calendar booking service (Calendly, etc.)
            window.open('https://calendly.com/your-calendar', '_blank');
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.contact-form-section, .instant-contact, .faq-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        observer.observe(element);
    });
}

// Global functions for CTA buttons
window.scrollToForm = function() {
    const form = document.getElementById('consultationForm');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.openKakao = function() {
    // Same as kakaoBtn click handler
    window.open('https://pf.kakao.com/_your_channel_id', '_blank');
};

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length <= 3) {
        formattedValue = value;
    } else if (value.length <= 7) {
        formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
        formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
    
    input.value = formattedValue;
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .contact-option {
        transition: all 0.3s ease;
    }
    
    .contact-option:hover .option-icon {
        transform: scale(1.1);
    }
    
    .faq-item {
        transition: all 0.3s ease;
    }
    
    .faq-item:hover {
        transform: translateX(5px);
    }
`;
document.head.appendChild(style);

// Form auto-save functionality (optional)
function initializeAutoSave() {
    const form = document.getElementById('consultationForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Load saved data
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(`contact_form_${input.name}`);
        if (savedValue && input.type !== 'submit') {
            input.value = savedValue;
        }
    });
    
    // Save data on input
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            localStorage.setItem(`contact_form_${this.name}`, this.value);
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        inputs.forEach(input => {
            localStorage.removeItem(`contact_form_${input.name}`);
        });
    });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAutoSave, 1000);
});

// Add loading animation when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
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

// Track form interactions for analytics (optional)
function trackFormInteraction(action, field = null) {
    // This would typically send data to Google Analytics or other analytics service
    console.log('Form interaction:', action, field);
    
    // Example: gtag('event', action, { 'custom_parameter': field });
}

// Add interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            trackFormInteraction('form_field_focus', this.name);
        });
    });
    
    form.addEventListener('submit', function() {
        trackFormInteraction('form_submit');
    });
});