// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project type selection
    initializeProjectTypeSelection();
    
    // Initialize form validation (new inquiry form)
    initializeInquiryForm();
    
    // Initialize kakao contact
    initializeKakaoContact();
    
    // Initialize contact options
    initializeContactOptions();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// 프로젝트 타입 선택 기능
function initializeProjectTypeSelection() {
    const projectTypeCards = document.querySelectorAll('.project-type-card');
    const formFields = document.getElementById('formFields');
    const submitBtn = document.querySelector('.btn-submit');
    const messageTextarea = document.querySelector('textarea[name="message"]');
    
    // 초기에는 폼 필드와 버튼 비활성화
    formFields.style.opacity = '0';
    formFields.style.pointerEvents = 'none';
    submitBtn.classList.remove('active');
    
    projectTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const input = this.querySelector('input');
            const projectType = input.value;
            
            // 다른 카드들 비활성화
            projectTypeCards.forEach(otherCard => {
                otherCard.classList.remove('selected');
                otherCard.querySelector('input').checked = false;
            });
            
            // 선택된 카드 활성화
            this.classList.add('selected');
            input.checked = true;
            
            // 폼 필드 표시
            showFormFields();
            
            // placeholder 업데이트
            updatePlaceholders(projectType);
            
            // 버튼 활성화
            submitBtn.classList.add('active');
        });
        
        // 호버 효과
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    function showFormFields() {
        formFields.style.opacity = '1';
        formFields.style.pointerEvents = 'all';
        formFields.classList.add('show');
        
        // 순차적 애니메이션
        const fields = formFields.children;
        Array.from(fields).forEach((field, index) => {
            setTimeout(() => {
                field.style.opacity = '1';
                field.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    function updatePlaceholders(projectType) {
        const placeholders = {
            manufacturing: '제조업체로서 제품 소개와 회사 신뢰도를 높이는 홈페이지를 원합니다...',
            service: '서비스업체로서 고객 경험을 개선하고 브랜드를 강화할 수 있는 홈페이지를 원합니다...',
            restaurant: '카페/음식점으로서 매력적인 메뉴와 분위기를 전달하는 홈페이지를 원합니다...',
            medical: '병원/의료 기관으로서 신뢰감 있는 전문적 이미지를 전달하는 홈페이지를 원합니다...',
            other: '저희 업체에 맞는 맞춤형 홈페이지 솔루션을 원합니다...'
        };
        
        if (messageTextarea && placeholders[projectType]) {
            messageTextarea.placeholder = placeholders[projectType];
        }
    }
}

// 카카오톡 연락 기능
function initializeKakaoContact() {
    const kakaoBtn = document.getElementById('kakaoBtn');
    const qrCode = document.querySelector('.qr-placeholder');
    
    if (kakaoBtn) {
        kakaoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모바일 감지
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // 모바일에서 카카오톡 앱 직접 연결
                window.location.href = 'kakaotalk://plusfriend/chat/_your_channel_id';
                
                // 만약 앱이 없으면 웹으로 대체
                setTimeout(() => {
                    window.open('https://pf.kakao.com/_your_channel_id', '_blank');
                }, 1000);
            } else {
                // 데스크톱에서 웹 카카오톡 열기
                window.open('https://pf.kakao.com/_your_channel_id', '_blank');
            }
            
            // 클릭 이벤트 트래킹
            trackContactInteraction('kakao_button_click');
        });
        
        // 호버 효과
        kakaoBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        kakaoBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // QR 코드 클릭 효과
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            // QR 코드 스캔 안내 모달 표시 (예시)
            showQRModal();
        });
    }
}

function showQRModal() {
    // QR 코드 모달 생성 (예시)
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>카카오톡 QR 코드</h3>
            <div class="qr-image">
                <i class="fas fa-qrcode" style="font-size: 120px; color: #FFCD00;"></i>
            </div>
            <p>모바일로 QR코드를 스캔하면<br>카카오톡으로 바로 연결됩니다</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 모달 닫기
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    
    // 3초 후 자동 닫기
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 3000);
}

// 새로운 문의 폼 처리
function initializeInquiryForm() {
    const form = document.getElementById('inquiryForm');
    const submitBtn = form.querySelector('.btn-submit');
    
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

// 기타 연락 방법 처리
function initializeContactOptions() {
    // 전화 연락 링크
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackContactInteraction('phone_click', this.href);
        });
    });
    
    // 이메일 연락 링크
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackContactInteraction('email_click', this.href);
        });
    });
    
    // 미팅 예약 링크
    const meetingLinks = document.querySelectorAll('.contact-link');
    meetingLinks.forEach(link => {
        if (link.textContent.includes('미팅')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // 캘린드리 또는 다른 예약 서비스로 리다이렉트
                window.open('https://calendly.com/chiro-meeting', '_blank');
                trackContactInteraction('meeting_booking_click');
            });
        }
    });
    
    // 연락 옵션 카드 호버 효과
    const contactOptions = document.querySelectorAll('.contact-option');
    contactOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

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
            }
        });
    }, observerOptions);

    // Observe elements for animation - Faster transitions
    const animatedElements = document.querySelectorAll(
        '.kakao-card, .project-type-card, .contact-option'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)'; // Smaller distance
        element.style.transition = `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`; // Faster
        
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

// CSS for animations and interactions
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .project-type-card.selected {
        border-color: #1DB954 !important;
        background: rgba(29, 185, 84, 0.15) !important;
        transform: translateY(-8px) scale(1.05) !important;
        box-shadow: 0 15px 40px rgba(29, 185, 84, 0.2) !important;
    }
    
    .project-type-card.selected .card-content i {
        color: #1ed760 !important;
        transform: scale(1.2) rotate(10deg) !important;
    }
    
    .form-fields > * {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
    }
    
    .qr-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: #1a1a1a;
        border: 2px solid #FFCD00;
        border-radius: 20px;
        padding: 30px;
        text-align: center;
        position: relative;
        max-width: 300px;
        animation: slideUp 0.3s ease;
    }
    
    .close-modal {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
        color: #FFCD00;
    }
    
    .modal-content h3 {
        color: #FFCD00;
        margin-bottom: 20px;
    }
    
    .modal-content p {
        color: #ccc;
        margin-top: 15px;
        line-height: 1.5;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(50px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
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

// 연락 인터랙션 트래킹
function trackContactInteraction(action, detail = null) {
    console.log('Contact interaction:', action, detail);
    // 실제 구현 시 Google Analytics 또는 다른 분석 도구로 전송
    // gtag('event', action, { 'contact_method': detail });
}

// 폼 인터랙션 트래킹
document.addEventListener('DOMContentLoaded', function() {
    // 프로젝트 타입 선택 트래킹
    const projectTypeCards = document.querySelectorAll('.project-type-card');
    projectTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectType = this.querySelector('input').value;
            trackContactInteraction('project_type_select', projectType);
        });
    });
    
    // 폼 제출 트래킹
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function() {
            const selectedType = this.querySelector('input[name="project-type"]:checked');
            trackContactInteraction('inquiry_form_submit', selectedType ? selectedType.value : 'none');
        });
    }
});