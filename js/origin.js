// Sidebar functionality
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const contentOverlay = document.getElementById('contentOverlay');

sidebarToggle.addEventListener('click', () => {
    sidebarToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    contentOverlay.classList.toggle('active');
});

contentOverlay.addEventListener('click', () => {
    sidebarToggle.classList.remove('active');
    sidebar.classList.remove('active');
    contentOverlay.classList.remove('active');
});

// Image fade-in animation with staggered timing - NO PARALLAX
const imageObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const images = entry.target.querySelectorAll('img');
            images.forEach((img, index) => {
                // Only animate if not already visible
                if (!img.classList.contains('visible')) {
                    setTimeout(() => {
                        img.classList.add('visible');
                    }, index); // Stagger the animations
                }
            });
            // Stop observing this container once images are visible
            imageObserver.unobserve(entry.target);
        }
    });
}, imageObserverOptions);

// Section visibility observer for scroll animations
const sectionObserverOptions = {
    threshold: 0.01,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, sectionObserverOptions);

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    // Observe all origin sections for animations
    document.querySelectorAll('.origin-section').forEach((section) => {
        sectionObserver.observe(section);
    });
    
    // Observe image containers for staggered image animations
    document.querySelectorAll('.origin-images').forEach((imageContainer) => {
        imageObserver.observe(imageContainer);
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Remove parallax effect - images stay static after initial animation

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes sidebar
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebarToggle.classList.remove('active');
        sidebar.classList.remove('active');
        contentOverlay.classList.remove('active');
    }
});

// Prevent sidebar from opening on page load if window is resized
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            // Keep sidebar behavior consistent on resize
        }
    }, 250);
});