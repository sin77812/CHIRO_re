// Menu page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initMenuFilters();
    initMenuAnimations();
});

// Menu category filtering
function initMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter categories
            if (category === 'all') {
                showAllCategories(menuCategories);
            } else {
                filterCategories(menuCategories, category);
            }
        });
    });
}

function showAllCategories(categories) {
    categories.forEach((category, index) => {
        category.classList.remove('hidden', 'fade-out');
        category.classList.add('fade-in');
        
        // Stagger the animation
        setTimeout(() => {
            category.style.display = 'block';
        }, index * 100);
    });
}

function filterCategories(categories, targetCategory) {
    categories.forEach((category, index) => {
        const categoryType = category.getAttribute('data-category');
        
        if (categoryType === targetCategory) {
            category.classList.remove('hidden', 'fade-out');
            category.classList.add('fade-in');
            category.style.display = 'block';
        } else {
            category.classList.add('fade-out');
            category.classList.remove('fade-in');
            
            setTimeout(() => {
                category.style.display = 'none';
                category.classList.add('hidden');
            }, 300);
        }
    });
}

// Menu item animations
function initMenuAnimations() {
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    // Intersection Observer for menu items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    menuItems.forEach((item, index) => {
        // Add initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        // Observe for animation
        observer.observe(item);
        
        // Add staggered animation delay
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover interaction
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Search functionality (can be added later)
function initMenuSearch() {
    const searchInput = document.getElementById('menu-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item-card');
            
            menuItems.forEach(item => {
                const itemName = item.querySelector('h3').textContent.toLowerCase();
                const itemDescription = item.querySelector('p').textContent.toLowerCase();
                
                if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    }
}

// Menu item modal (for detailed view)
function initMenuModal() {
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const price = this.querySelector('.price').textContent;
            const image = this.querySelector('img').src;
            
            showMenuModal(title, description, price, image);
        });
    });
}

function showMenuModal(title, description, price, image) {
    // Create modal HTML
    const modalHTML = `
        <div class="menu-modal" id="menu-modal">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-image">
                    <img src="${image}" alt="${title}" />
                </div>
                <div class="modal-info">
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <div class="modal-price">${price}</div>
                    <button class="btn btn-primary">주문하기</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles dynamically
    const modalStyles = `
        <style>
            .menu-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                cursor: pointer;
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                overflow: hidden;
                transform: scale(0.8);
                animation: modalShow 0.3s ease forwards;
            }
            
            @keyframes modalShow {
                to {
                    transform: scale(1);
                }
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                z-index: 1;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(0,0,0,0.5);
            }
            
            .modal-image img {
                width: 100%;
                height: 250px;
                object-fit: cover;
            }
            
            .modal-info {
                padding: 2rem;
            }
            
            .modal-price {
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--point-brown);
                margin: 1rem 0;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Add close functionality
    const modal = document.getElementById('menu-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    function closeModal() {
        modal.style.animation = 'modalHide 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // Add modal hide animation
    const hideAnimation = `
        @keyframes modalHide {
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
    `;
    
    document.head.insertAdjacentHTML('beforeend', `<style>${hideAnimation}</style>`);
}

// Price formatting
function formatPrice(price) {
    return price.toLocaleString('ko-KR') + '원';
}

// Menu item sorting
function initMenuSorting() {
    const sortSelect = document.getElementById('menu-sort');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const menuItems = Array.from(document.querySelectorAll('.menu-item-card'));
            
            menuItems.sort((a, b) => {
                if (sortBy === 'name') {
                    const nameA = a.querySelector('h3').textContent;
                    const nameB = b.querySelector('h3').textContent;
                    return nameA.localeCompare(nameB);
                } else if (sortBy === 'price') {
                    const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                    const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                    return priceA - priceB;
                }
                return 0;
            });
            
            // Re-append sorted items
            const container = menuItems[0].parentNode;
            menuItems.forEach(item => container.appendChild(item));
        });
    }
}

// Initialize additional features if needed
// initMenuSearch();
// initMenuModal();
// initMenuSorting();