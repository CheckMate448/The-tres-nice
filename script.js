// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initFiltering();
    initSmoothScrolling();
    initMobileMenu();
    initAnimations();
    initAccessibility();
    initEnhancedFeatures();
    
    console.log('Malek\'s Theatre website loaded successfully with Tailwind CSS!');
});

// Enhanced Filtering functionality
function initFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const theatreCards = document.querySelectorAll('.theatre-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button styling
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-theatre-blue', 'to-theatre-purple', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            this.classList.remove('bg-white', 'text-gray-700');
            this.classList.add('active', 'bg-gradient-to-r', 'from-theatre-blue', 'to-theatre-purple', 'text-white');
            
            // Filter cards with animation
            theatreCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s forwards`;
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.display = 'none';
                }
            });
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
    const mobileToggle = document.querySelector('#mobile-menu-btn');
    const nav = document.querySelector('header nav ul');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('flex');
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex-col');
            nav.classList.toggle('absolute');
            nav.classList.toggle('top-full');
            nav.classList.toggle('left-0');
            nav.classList.toggle('w-full');
            nav.classList.toggle('bg-white');
            nav.classList.toggle('bg-opacity-95');
            nav.classList.toggle('backdrop-blur-sm');
            nav.classList.toggle('p-4');
            nav.classList.toggle('space-y-4');
            nav.classList.toggle('space-x-8');
            
            // Update menu icon
            const svg = this.querySelector('svg');
            if (nav.classList.contains('flex')) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'bg-opacity-95', 'backdrop-blur-sm', 'p-4', 'space-y-4');
                nav.classList.add('hidden', 'space-x-8');
                
                const svg = mobileToggle.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            });
        });
    }
}

// Enhanced animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
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
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Observe theatre cards for staggered animation
    const theatreCards = document.querySelectorAll('.theatre-card');
    theatreCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Enhanced accessibility
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
        background: #1e40af;
        color: #fff;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 8px;
        z-index: 1001;
        transition: top 0.3s;
        font-weight: 600;
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

// Enhanced features
function initEnhancedFeatures() {
    // Add hover effects for theatre cards
    const theatreCards = document.querySelectorAll('.theatre-card');
    
    theatreCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add rating hover effects
    const ratingElements = document.querySelectorAll('.bg-theatre-gold');
    
    ratingElements.forEach(rating => {
        rating.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.8))';
            this.style.transform = 'scale(1.05)';
        });
        
        rating.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add scroll-triggered animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('#hero');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
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
        padding: 12px 20px;
        border: 2px solid #1e40af;
        border-radius: 25px;
        margin-bottom: 20px;
        width: 300px;
        max-width: 100%;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        outline: none;
        transition: all 0.3s ease;
    `;
    
    const projectsSection = document.querySelector('#projects .container');
    if (projectsSection) {
        const filterButtons = projectsSection.querySelector('.flex');
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
            const description = card.querySelector('p').textContent.toLowerCase();
            
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
    optimizePerformance();
    // Uncomment the line below to enable search functionality
    // initSearch();
});

// Add some fun interactive features
function addInteractiveFeatures() {
    // Add click ripple effect for theatre cards
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
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.6s ease-in-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
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