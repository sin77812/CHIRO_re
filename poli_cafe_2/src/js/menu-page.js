// Menu Page JavaScript Functionality

// Menu data for modal content
const menuData = {
    'honey-latte': {
        name: '허니 라떼',
        image: '허니 라떼',
        description: '은은한 아카시아 꿀, 싱글 오리진 에스프레소, 스팀밀크의 조화. 부드러운 바디감, 따뜻하거나 아이스로도 추천.',
        details: {
            origin: 'Colombia Supremo',
            roast: '미디엄',
            notes: '카라멜, 플로럴, 너트',
            calories: '180kcal',
            vegan: '불가',
            pairing: '수제 티라미수',
            allergens: '우유'
        },
        price: '₩5,900'
    },
    'americano': {
        name: '아메리카노',
        image: '아메리카노',
        description: '진한 바디감과 클린한 애프터테이스트. Urban Roastery의 대표 메뉴로 매일 신선하게 로스팅된 원두를 사용합니다.',
        details: {
            origin: 'Brazil Nova',
            roast: '미디엄',
            notes: '초콜릿, 너트, 달콤함',
            calories: '8kcal',
            vegan: '가능',
            pairing: '크루아상',
            allergens: '없음'
        },
        price: '₩4,500'
    },
    'flat-white': {
        name: '플랫화이트',
        image: '플랫화이트',
        description: '벨벳 같은 질감의 마이크로폼과 진한 에스프레소. 두유나 귀리우유로 교체 가능합니다.',
        details: {
            origin: 'Colombia Supremo',
            roast: '라이트',
            notes: '플로럴, 시트러스',
            calories: '120kcal',
            vegan: '두유 선택시 가능',
            pairing: '바닐라 스콘',
            allergens: '우유 (선택사항)'
        },
        price: '₩5,200'
    },
    'coldbrew-peach': {
        name: '콜드브루 피치',
        image: '콜드브루 피치',
        description: '24시간 저온 추출한 콜드브루와 달콤한 복숭아의 완벽한 조화. 여름 시즌 한정 메뉴입니다.',
        details: {
            origin: 'Ethiopia Yirgacheffe',
            roast: '라이트',
            notes: '플로럴, 베리, 복숭아',
            calories: '45kcal',
            vegan: '가능',
            pairing: '마카롱',
            allergens: '없음'
        },
        price: '₩6,500'
    },
    'latte': {
        name: '라떼',
        image: '라떼',
        description: '깊고 진한 에스프레소에 부드러운 스팀 우유. 클래식한 맛의 완벽한 조화를 경험해보세요.',
        details: {
            origin: 'Colombia Supremo',
            roast: '미디엄',
            notes: '카라멜, 스톤프룻',
            calories: '150kcal',
            vegan: '두유 선택시 가능',
            pairing: '쿠키',
            allergens: '우유'
        },
        price: '₩5,000'
    },
    'pour-over': {
        name: '핸드드립',
        image: '핸드드립',
        description: '숙련된 바리스타가 직접 내리는 핸드드립 커피. 에티오피아 싱글 오리진의 깊은 풍미를 느껴보세요.',
        details: {
            origin: 'Ethiopia Yirgacheffe',
            roast: '라이트',
            notes: '플로럴, 베리, 시트러스',
            calories: '5kcal',
            vegan: '가능',
            pairing: '다크 초콜릿',
            allergens: '없음'
        },
        price: '₩6,000'
    },
    'tiramisu': {
        name: '수제 티라미수',
        image: '수제 티라미수',
        description: '이탈리안 마스카포네 치즈와 홈메이드 커피 시럽으로 만든 정통 티라미수. 매장에서만 맛볼 수 있는 특별한 디저트입니다.',
        details: {
            ingredients: '마스카포네, 레이디핑거, 코코아파우더',
            특징: '홈메이드 커피 시럽',
            calories: '310kcal',
            vegan: '불가',
            pairing: '에스프레소',
            allergens: '달걀, 우유, 글루텐'
        },
        price: '₩7,000'
    },
    'croissant': {
        name: '버터 크루아상',
        image: '크루아상',
        description: '프랑스 정통 방식으로 만든 버터 크루아상. 바삭한 겉면과 부드러운 속살의 완벽한 조화.',
        details: {
            특징: '프랑스 버터 사용, 72시간 발효',
            calories: '280kcal',
            vegan: '불가',
            pairing: '아메리카노',
            allergens: '글루텐, 우유, 달걀'
        },
        price: '₩3,800'
    },
    'earl-grey': {
        name: '얼그레이 티',
        image: '얼그레이 티',
        description: '진한 실론 홍차에 베르가못 오일의 은은한 향. 카페인이 적어 오후 시간에도 부담 없이 즐기실 수 있습니다.',
        details: {
            종류: '블랙 티 (실론)',
            특징: '베르가못 오일, 잎차 사용',
            calories: '0kcal',
            vegan: '가능',
            pairing: '스콘',
            allergens: '없음'
        },
        price: '₩4,800'
    }
};

// DOM Elements
const filterButtons = document.querySelectorAll('.filter');
const menuCards = document.querySelectorAll('.menu-card');
const searchInput = document.querySelector('.menu-search');
const modal = document.getElementById('menuModal');
const modalBody = document.getElementById('modalBody');
const noResults = document.getElementById('noResults');
const menuCount = document.querySelector('.menu-count');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateMenuCount();
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterMenu(category);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchMenu(searchTerm);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Initialize single-row class for fallback browsers
    const grids = document.querySelectorAll('.menu-grid');
    grids.forEach(grid => {
        const cards = grid.children;
        if (cards.length <= 4) {
            grid.classList.add('single-row');
        }
    });
});

// Filter menu by category
function filterMenu(category) {
    let visibleCount = 0;
    
    menuCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'block';
        noResults.innerHTML = `
            <h3>해당 카테고리에 메뉴가 없습니다</h3>
            <p>다른 카테고리를 선택해보세요.</p>
        `;
    } else {
        noResults.style.display = 'none';
    }
    
    updateMenuCount(visibleCount);
}

// Search menu
function searchMenu(searchTerm) {
    let visibleCount = 0;
    
    menuCards.forEach(card => {
        const menuName = card.querySelector('h3').textContent.toLowerCase();
        const menuDescription = card.querySelector('p').textContent.toLowerCase();
        const menuBean = card.querySelector('.bean')?.textContent.toLowerCase() || '';
        
        if (menuName.includes(searchTerm) || 
            menuDescription.includes(searchTerm) || 
            menuBean.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    if (searchTerm && visibleCount === 0) {
        noResults.style.display = 'block';
        noResults.innerHTML = `
            <h3>검색 결과가 없습니다</h3>
            <p>"<strong>${searchTerm}</strong>"에 대한 검색 결과를 찾을 수 없습니다.<br>다른 키워드로 검색해보세요.</p>
        `;
    } else {
        noResults.style.display = 'none';
    }
    
    // Reset filter buttons when searching
    if (searchTerm) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
    }
    
    updateMenuCount(visibleCount);
}

// Update menu count
function updateMenuCount(count = null) {
    const totalCount = menuCards.length;
    const displayCount = count !== null ? count : totalCount;
    menuCount.textContent = `총 ${displayCount}종`;
}

// Open modal with menu details
function openModal(menuId) {
    const menu = menuData[menuId];
    if (!menu) return;
    
    const modalContent = `
        <div class="img-placeholder">${menu.image}</div>
        <h2>${menu.name}</h2>
        <p class="modal-price">${menu.price}</p>
        <p class="modal-description">${menu.description}</p>
        <div class="modal-details">
            <h4>상세 정보</h4>
            <ul>
                ${Object.entries(menu.details).map(([key, value]) => 
                    `<li><strong>${key}:</strong> ${value}</li>`
                ).join('')}
            </ul>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add CSS for modal content
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-price {
        font-family: 'Roboto Mono', monospace;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--espresso-brown);
        margin-bottom: 1.5rem;
    }
    
    .modal-description {
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 2rem;
        color: var(--text-gray);
    }
    
    .modal-details {
        text-align: left;
        background: var(--natural-gray);
        padding: 1.5rem;
        border-radius: 16px;
        margin-top: 1.5rem;
    }
    
    .modal-details h4 {
        color: var(--espresso-brown);
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .modal-details ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .modal-details li {
        margin-bottom: 0.8rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(183, 142, 88, 0.2);
        color: var(--text-gray);
    }
    
    .modal-details li:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .modal-details strong {
        color: var(--espresso-brown);
        min-width: 80px;
        display: inline-block;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(modalStyles);

// Enhanced search with debouncing
let searchTimeout;
const originalSearchMenu = searchMenu;

searchMenu = function(searchTerm) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        originalSearchMenu(searchTerm);
    }, 300);
};

// Add smooth scroll to top when filtering
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Enhanced filter function with scroll
const originalFilterMenu = filterMenu;
filterMenu = function(category) {
    originalFilterMenu(category);
    scrollToTop();
};

// Add loading animation for better UX
function showLoading() {
    const menuGrid = document.querySelector('.menu-grid');
    menuGrid.style.opacity = '0.6';
    setTimeout(() => {
        menuGrid.style.opacity = '1';
    }, 200);
}