// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation for about columns (simultaneous)
    function handleAboutScroll() {
        const aboutColumns = document.querySelectorAll('.about-column');
        
        aboutColumns.forEach(column => {
            if (isInViewport(column) && !column.classList.contains('visible')) {
                column.classList.add('visible');
            }
        });
    }
    
    // Initialize about columns with hidden state
    function initializeAboutColumns() {
        const aboutColumns = document.querySelectorAll('.about-column');
        
        aboutColumns.forEach(column => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(50px)';
            column.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        });
        
        // Add visible class styles
        if (!document.querySelector('style[data-about-animation]')) {
            const style = document.createElement('style');
            style.setAttribute('data-about-animation', 'true');
            style.textContent = `
                .about-column.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Add click event listeners to about columns
    function initializeAboutLinks() {
        const columns = {
            '.about-column.origin': '/origin/',
            '.about-column.vision': '/vision/',
            '.about-column.mission': '/mission/'
        };
        
        Object.entries(columns).forEach(([selector, url]) => {
            const column = document.querySelector(selector);
            if (column) {
                column.addEventListener('click', () => {
                    window.location.href = url;
                });
            }
        });
    }
    
    // Reveal elements on scroll with fade-in animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .project-card, .work-item, .portfolio-entry, .right-column');
        
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // Initialize animations
    function initializeAnimations() {
        const elements = document.querySelectorAll('.portfolio-item, .project-card, .work-item, .portfolio-entry, .right-column');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        // Add CSS for animated state
        if (elements.length > 0 && !document.querySelector('style[data-general-animation]')) {
            const style = document.createElement('style');
            style.setAttribute('data-general-animation', 'true');
            style.textContent = `
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Handle "Read More" functionality
    function initializeReadMore() {
        const readMoreButtons = document.querySelectorAll('.about-read-more');
        
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetContainer = document.getElementById(targetId);
                
                if (targetContainer) {
                    targetContainer.classList.toggle('expanded');
                    this.textContent = targetContainer.classList.contains('expanded') ? 'Read Less' : 'Read More';
                }
            });
        });
    }
    
    // Initialize everything
    initializeAboutColumns();
    initializeAboutLinks();
    initializeAnimations();
    initializeReadMore();
    
    // Initial check and scroll listener
    function checkAnimations() {
        handleAboutScroll();
        revealOnScroll();
    }
    
    checkAnimations();
    window.addEventListener('scroll', checkAnimations);
    
    // Check animations after short delay
    setTimeout(checkAnimations, 300);
});