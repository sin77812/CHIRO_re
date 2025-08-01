// Portfolio Page JavaScript - 애플식 미니멀 디자인

document.addEventListener('DOMContentLoaded', function() {
    // 모든 초기화 함수 실행
    initializeFilters();
    initializeBeforeAfterSliders();
    initializeLiveDemoButtons();
    initializeCaseDetailModals();
    initializeScrollAnimations();
    initializeHeroStats();
});

// 필터링 시스템 (새로운 구조)
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const caseCards = document.querySelectorAll('.case-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 활성 필터 탭 업데이트
            filterTabs.forEach(t => t.classList.remove('filter-active'));
            this.classList.add('filter-active');
            
            // 케이스 카드 필터링
            caseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // 부드러운 스크롤
            setTimeout(() => {
                document.querySelector('.portfolio-content').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 150);
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

// Live Demo 버튼 기능
function initializeLiveDemoButtons() {
    const liveDemoButtons = document.querySelectorAll('.live-demo-btn');
    
    liveDemoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const demoUrl = this.getAttribute('data-demo-url');
            
            if (demoUrl) {
                // 로딩 상태 추가
                const originalText = this.textContent;
                this.textContent = '사이트 열기 중...';
                this.disabled = true;
                this.style.opacity = '0.7';
                
                // 실제 데모 사이트 열기
                window.open(demoUrl, '_blank');
                
                // 버튼 상태 복원
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.opacity = '1';
                }, 1500);
            } else {
                // 준비 중 메시지
                const originalText = this.textContent;
                this.textContent = '준비 중입니다';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 2000);
            }
        });
    });
}

// 상세보기 모달 기능
function initializeCaseDetailModals() {
    const detailButtons = document.querySelectorAll('.case-detail-btn');
    const modal = document.getElementById('caseDetailModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    
    // 케이스별 상세 정보
    const caseDetails = {
        'manufacturing': {
            problem: '오래된 디자인과 복잡한 구조로 인한 낮은 사용자 경험',
            solution: '모던한 UI/UX 디자인과 직관적인 네비게이션 구조',
            result: '방문자 180% 증가, 문의율 240% 향상, 브랜드 신뢰도 대폭 개선'
        },
        'hospital': {
            problem: '복잡한 온라인 예약 시스템과 환자 불편 증가',
            solution: '간편한 원클릭 예약 시스템과 모바일 최적화',
            result: '온라인 예약 150% 증가, 환자 만족도 85% 향상, 업무 효율성 개선'
        },
        'cafe': {
            problem: '복잡한 메뉴 구조와 브랜드 아이덴티티 부족',
            solution: 'NOC Coffee급 미니멀 디자인과 카테고리 필터링',
            result: '브랜드 인지도 300% 향상, 메뉴 탐색 120% 개선, 완벽한 모바일 경험'
        }
    };
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const caseCard = this.closest('.case-card');
            const category = caseCard.getAttribute('data-category');
            const details = caseDetails[category];
            
            if (details) {
                // 모달 내용 업데이트
                document.getElementById('modalProblem').textContent = details.problem;
                document.getElementById('modalSolution').textContent = details.solution;
                document.getElementById('modalResult').textContent = details.result;
                
                // 모달 표시
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // 모달 닫기 기능
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 스크롤 애니메이션 초기화
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 케이스 카드들에 관찰자 연결
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        observer.observe(card);
    });
}

// Hero 통계 애니메이션
function initializeHeroStats() {
    const stats = document.querySelectorAll('.hero-stat__number');
    const animateNumbers = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const isPercentage = stat.textContent.includes('%');
            let current = 0;
            const increment = target / 60; // 60프레임
            const duration = 2000; // 2초
            const stepTime = duration / 60;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = isPercentage ? `${target}%` : target;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(current);
                    stat.textContent = isPercentage ? `${displayValue}%` : displayValue;
                }
            }, stepTime);
        });
    };
    
    // Hero 섹션이 화면에 보일 때 애니메이션 시작
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateNumbers, 1000);
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.portfolio-hero__stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
}

// 부드러운 스크롤 링크 처리
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

// URL 해시로 직접 필터링 처리
window.addEventListener('load', function() {
    const hash = window.location.hash;
    const filterMap = {
        '#manufacturing': 'manufacturing',
        '#hospital': 'hospital', 
        '#cafe': 'cafe',
        '#service': 'service'
    };
    
    if (filterMap[hash]) {
        const filterButton = document.querySelector(`[data-filter="${filterMap[hash]}"]`);
        if (filterButton) {
            setTimeout(() => filterButton.click(), 500);
        }
    }
});

// 페이지 로드 완료 처리
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 초기 케이스 카드들을 visible로 설정
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 100);
    });
});