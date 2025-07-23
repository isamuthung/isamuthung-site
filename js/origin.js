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

// Image fade-in animation for stacked images
const imageObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const images = entry.target.querySelectorAll('img');
            images.forEach((img, index) => {
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * 300); // Stagger the animations
            });
        }
    });
}, imageObserverOptions);

// Section visibility observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animation delays for multiple sections
            const sections = entry.target.querySelectorAll('.origin-text, .origin-image');
            sections.forEach((section, index) => {
                section.style.animationDelay = `${index * 0.2}s`;
            });
        }
    });
}, observerOptions);

// Add two images to each section dynamically
function addStackedImages() {
    const imageContainers = document.querySelectorAll('.origin-image');
    const additionalImages = [
        [
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        [
            'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        [
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        [
            'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        [
            'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ]
    ];
    
    imageContainers.forEach((container, index) => {
        if (additionalImages[index]) {
            additionalImages[index].forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Additional visual ${index + 1}`;
                container.appendChild(img);
            });
        }
    });
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    // Observe all origin sections for animations
    document.querySelectorAll('.origin-section').forEach((section) => {
        observer.observe(section);
    });
    
    // Observe image containers for stacked image animations
    document.querySelectorAll('.origin-image').forEach((imageContainer) => {
        imageObserver.observe(imageContainer);
    });
    
    // Add stacked images after DOM is ready
    setTimeout(addStackedImages, 100);
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

// Add subtle parallax effect to images
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const images = document.querySelectorAll('.origin-image img');
    
    images.forEach((img, index) => {
        const rate = scrolled * -0.05;
        img.style.transform = `translateY(${rate}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});