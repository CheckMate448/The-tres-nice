// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initFiltering();
    initSmoothScrolling();
    initMobileMenu();
    initAnimations();
    initAccessibility();
    
    console.log('Malek\'s Theatre website loaded successfully!');
});

// Filtering functionality
function initFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const theatreCards = document.querySelectorAll('.theatre-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            theatreCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Add loading effect
            const projectGrid = document.querySelector('.project-grid');
            projectGrid.classList.add('loading');
            setTimeout(() => {
                projectGrid.classList.remove('loading');
            }, 300);
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('header nav ul');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #87ceeb;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
}

// Rating system enhancement
function initRatingSystem() {
    const ratingElements = document.querySelectorAll('.rating');
    
    ratingElements.forEach(rating => {
        const stars = rating.querySelector('.stars');
        const ratingText = rating.querySelector('.rating-text');
        
        if (stars && ratingText) {
            const ratingValue = parseFloat(ratingText.textContent);
            
            // Add tooltip on hover
            rating.addEventListener('mouseenter', function() {
                this.style.cursor = 'help';
            });
            
            rating.addEventListener('mouseleave', function() {
                this.style.cursor = 'default';
            });
        }
    });
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

// Search functionality (for future enhancement)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Rechercher un théâtre...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 10px 15px;
        border: 2px solid #87ceeb;
        border-radius: 25px;
        margin-bottom: 20px;
        width: 300px;
        max-width: 100%;
        font-size: 1rem;
    `;
    
    const projectsSection = document.querySelector('#projects .container');
    if (projectsSection) {
        const filterButtons = projectsSection.querySelector('.filter-buttons');
        if (filterButtons) {
            filterButtons.parentNode.insertBefore(searchInput, filterButtons);
        }
    }
    
    // Add search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const theatreCards = document.querySelectorAll('.theatre-card');
        
        theatreCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.theatre-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initRatingSystem();
    optimizePerformance();
    // Uncomment the line below to enable search functionality
    // initSearch();
});

// Add some fun interactive features
function addInteractiveFeatures() {
    // Add click sound effect for theatre cards
    const theatreCards = document.querySelectorAll('.theatre-card');
    
    theatreCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        header nav ul {
            display: none;
        }
        
        header nav ul.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveFeatures();
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
});

// Add analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // This would integrate with Google Analytics or similar
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title
    });
});

// Track filter usage
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        trackEvent('filter_used', {
            filter: e.target.getAttribute('data-filter')
        });
    }
}); 