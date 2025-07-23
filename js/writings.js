document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll effect for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Staggered fade-in animation for list items
    const animateListItems = () => {
        const listItems = document.querySelectorAll('.writings-list li');
        
        listItems.forEach((item, index) => {
            // Add staggered delay for each item
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100); // 100ms delay between each item
        });
    };
    
    // Enhanced scroll reveal effect (for future use or other elements)
    const observeScrollElements = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);
        
        // Observe any elements with 'scroll-reveal' class
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    };
    
    // Initialize animations
    const initAnimations = () => {
        // Animate list items on page load
        setTimeout(animateListItems, 300); // Small delay after page load
        
        // Initialize scroll observer for other elements
        observeScrollElements();
    };
    
    // Start animations
    initAnimations();
    
    // Optional: Add hover effects for enhanced interactivity
    const addHoverEffects = () => {
        const listItems = document.querySelectorAll('.writings-list li');
        
        listItems.forEach(item => {
            const link = item.querySelector('a');
            
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    };
    
    // Add hover effects after initial animation completes
    setTimeout(addHoverEffects, 1000);
});