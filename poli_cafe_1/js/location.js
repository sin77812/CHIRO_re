// Location page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGalleryInteractions();
    initMapFunctionality();
    initContactFeatures();
});

// Gallery interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Add click event for lightbox
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h3').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            
            openLightbox(img.src, title, description, index);
        });
        
        // Touch events for mobile
        let touchStartY = 0;
        
        item.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        item.addEventListener('touchend', function(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            // Swipe up to show overlay on mobile
            if (diff > 50) {
                this.classList.add('show-overlay');
            } else if (diff < -50) {
                this.classList.remove('show-overlay');
            }
        });
    });
}

// Lightbox functionality
function openLightbox(imageSrc, title, description, currentIndex) {
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">‹</button>
                <button class="lightbox-next">›</button>
                <div class="lightbox-image">
                    <img src="${imageSrc}" alt="${title}" />
                </div>
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    document.body.classList.add('lightbox-open');
    
    // Add lightbox styles
    addLightboxStyles();
    
    const lightbox = document.getElementById('lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    
    // Navigation events
    let currentImageIndex = currentIndex;
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage(currentImageIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
    
    function updateLightboxImage(index) {
        const newImg = galleryImages[index];
        const newTitle = newImg.closest('.gallery-item').querySelector('.gallery-overlay h3').textContent;
        const newDescription = newImg.closest('.gallery-item').querySelector('.gallery-overlay p').textContent;
        
        lightbox.querySelector('.lightbox-image img').src = newImg.src;
        lightbox.querySelector('.lightbox-info h3').textContent = newTitle;
        lightbox.querySelector('.lightbox-info p').textContent = newDescription;
    }
    
    function handleLightboxKeyboard(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.remove();
            document.body.classList.remove('lightbox-open');
            document.removeEventListener('keydown', handleLightboxKeyboard);
        }, 300);
    }
}

function addLightboxStyles() {
    const lightboxStyles = `
        <style>
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
                transition: opacity 0.3s ease;
            }
            
            .lightbox-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                cursor: pointer;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                animation: lightboxShow 0.3s ease;
            }
            
            @keyframes lightboxShow {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            .lightbox-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.7);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1;
                transition: background 0.3s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(0,0,0,0.9);
            }
            
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.7);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                font-size: 2rem;
                cursor: pointer;
                transition: background 0.3s ease;
                border-radius: 50%;
            }
            
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
            
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(0,0,0,0.9);
            }
            
            .lightbox-image {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f0f0f0;
            }
            
            .lightbox-image img {
                max-width: 100%;
                max-height: 70vh;
                object-fit: contain;
            }
            
            .lightbox-info {
                padding: 1.5rem;
                background: white;
            }
            
            .lightbox-info h3 {
                margin-bottom: 0.5rem;
                color: var(--accent-black);
            }
            
            .lightbox-info p {
                color: var(--text-gray);
                margin: 0;
            }
            
            body.lightbox-open {
                overflow: hidden;
            }
            
            @media (max-width: 768px) {
                .lightbox-content {
                    max-width: 95vw;
                    max-height: 95vh;
                }
                
                .lightbox-prev,
                .lightbox-next {
                    width: 40px;
                    height: 40px;
                    font-size: 1.5rem;
                }
                
                .lightbox-info {
                    padding: 1rem;
                }
                
                .lightbox-image img {
                    max-height: 60vh;
                }
            }
        </style>
    `;
    
    if (!document.querySelector('#lightbox-styles')) {
        document.head.insertAdjacentHTML('beforeend', lightboxStyles.replace('<style>', '<style id="lightbox-styles">'));
    }
}

// Map functionality
function initMapFunctionality() {
    // Map button handlers
    window.openMap = function(mapType) {
        const address = '서울 강남구 테헤란로 123';
        const encodedAddress = encodeURIComponent(address);
        
        let url;
        
        switch(mapType) {
            case 'kakao':
                url = `https://map.kakao.com/link/search/${encodedAddress}`;
                break;
            case 'naver':
                url = `https://map.naver.com/v5/search/${encodedAddress}`;
                break;
            case 'google':
                url = `https://maps.google.com/maps?q=${encodedAddress}`;
                break;
            default:
                return;
        }
        
        window.open(url, '_blank');
    };
    
    // Add click-to-copy functionality for address
    const addressElements = document.querySelectorAll('.info-card p, .footer-info p');
    
    addressElements.forEach(element => {
        if (element.textContent.includes('테헤란로')) {
            element.style.cursor = 'pointer';
            element.title = '클릭하여 주소 복사';
            
            element.addEventListener('click', function() {
                copyToClipboard(this.textContent);
                showToast('주소가 복사되었습니다!');
            });
        }
    });
    
    // Add click-to-call functionality for phone numbers
    const phoneElements = document.querySelectorAll('.phone-number');
    
    phoneElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.title = '클릭하여 전화걸기';
        
        element.addEventListener('click', function() {
            const phoneNumber = this.textContent.replace(/[^0-9]/g, '');
            window.location.href = `tel:${phoneNumber}`;
        });
    });
}

// Contact features
function initContactFeatures() {
    // Operating hours status
    updateOperatingStatus();
    setInterval(updateOperatingStatus, 60000); // Update every minute
    
    // Contact form handling (if added later)
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(handleContactForm);
}

function updateOperatingStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    let isOpen = false;
    let statusText = '';
    
    if (currentDay === 0) { // Sunday - closed
        statusText = '휴무일';
    } else if (currentDay === 6) { // Saturday
        isOpen = currentHour >= 8 && currentHour < 20;
        statusText = isOpen ? '영업중' : '영업종료';
    } else { // Weekdays
        isOpen = currentHour >= 7 && currentHour < 21;
        statusText = isOpen ? '영업중' : '영업종료';
    }
    
    // Update status indicators
    const statusElements = document.querySelectorAll('.store-status');
    statusElements.forEach(element => {
        element.textContent = statusText;
        element.className = `store-status ${isOpen ? 'open' : 'closed'}`;
    });
    
    // Add status to hours display
    const hoursElements = document.querySelectorAll('.hours-detail');
    hoursElements.forEach(element => {
        let statusIndicator = element.querySelector('.status-indicator');
        if (!statusIndicator) {
            statusIndicator = document.createElement('div');
            statusIndicator.className = 'status-indicator';
            element.appendChild(statusIndicator);
        }
        
        statusIndicator.textContent = `현재 ${statusText}`;
        statusIndicator.className = `status-indicator ${isOpen ? 'open' : 'closed'}`;
    });
}

function handleContactForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = '전송중...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage('문의가 성공적으로 전송되었습니다!');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Utility functions
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent-black);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);
    
    // Hide toast
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <p>${message}</p>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const successContent = successDiv.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 12px;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const successIcon = successDiv.querySelector('.success-icon');
    successIcon.style.cssText = `
        font-size: 4rem;
        color: var(--point-brown);
        margin-bottom: 1rem;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successContent.style.transform = 'scale(1)';
    }, 100);
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
    
    // Click to close
    successDiv.addEventListener('click', () => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    });
}