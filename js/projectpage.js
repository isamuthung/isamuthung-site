// Deeper Learning specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior for the main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.scrollBehavior = 'smooth';
    }
    
    // Add intersection observer for content animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all content sections and photo containers
    const elementsToObserve = document.querySelectorAll('.content-section, .photo-container');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effects for photo placeholders
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click functionality for photo placeholders (for future photo uploads)
    photoPlaceholders.forEach((placeholder, index) => {
        placeholder.addEventListener('click', function() {
            // This could be extended to handle photo uploads in the future
            console.log(`Photo ${index + 1} placeholder clicked`);
            
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
    
    // Keyboard navigation enhancements
    document.addEventListener('keydown', function(e) {
        // Space or Page Down to scroll down
        if (e.code === 'Space' || e.code === 'PageDown') {
            e.preventDefault();
            mainContent.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
        
        // Page Up to scroll up  
        if (e.code === 'PageUp') {
            e.preventDefault();
            mainContent.scrollBy({
                top: -window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
        
        // Home key to go to top
        if (e.code === 'Home') {
            e.preventDefault();
            mainContent.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // End key to go to bottom
        if (e.code === 'End') {
            e.preventDefault();
            mainContent.scrollTo({
                top: mainContent.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Handle dynamic orientation changes (if you want to change image orientations programmatically)
    function setImageOrientation(photoNumber, orientation) {
        const photoContainer = document.querySelector(`[data-photo="${photoNumber}"]`);
        if (photoContainer) {
            photoContainer.setAttribute('data-orientation', orientation);
        }
    }
    
    // Example usage (you can remove this or use it for dynamic changes):
    // setImageOrientation(1, 'vertical'); // Changes photo 1 to vertical
    // setImageOrientation(2, 'horizontal'); // Changes photo 2 to horizontal
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('content-loaded');
        
        // Add a subtle fade-in for the entire content
        const deeperLearningContent = document.querySelector('.deeper-learning-content');
        if (deeperLearningContent) {
            deeperLearningContent.style.opacity = '0';
            deeperLearningContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                deeperLearningContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                deeperLearningContent.style.opacity = '1';
                deeperLearningContent.style.transform = 'translateY(0)';
            }, 100);
        }
    });
    
    // Clear floats after sections to prevent layout issues
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        // Add clearfix to ensure proper text flow around floated images
        section.style.overflow = 'hidden';
    });
    
});