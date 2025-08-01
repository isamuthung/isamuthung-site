document.addEventListener('DOMContentLoaded', function () {
    // ===== Podcast Page Animation Logic =====
    
    // Lock scroll during initial animation
    const body = document.body;
    body.classList.add('scroll-locked');
    
    // Find animated elements
    const animatedElements = document.querySelectorAll('.podcast-banner, .podcast-content');
    
    // Calculate total animation time
    let maxAnimationTime = 0;
    
    animatedElements.forEach(element => {
        const style = getComputedStyle(element);
        const delay = parseFloat(style.animationDelay) || 0;
        const duration = parseFloat(style.animationDuration) || 0;
        const totalTime = delay + duration;
        maxAnimationTime = Math.max(maxAnimationTime, totalTime);
    });
    
    // Unlock scroll after animations complete
    if (maxAnimationTime > 0) {
        setTimeout(() => {
            body.classList.remove('scroll-locked');
        }, (maxAnimationTime * 1000) + 200);
    } else {
        // Fallback if no animations detected
        body.classList.remove('scroll-locked');
    }
    
    // ===== Banner Hover Enhancement =====
    const bannerLink = document.querySelector('.banner-link');
    
    if (bannerLink) {
        // Add subtle interaction feedback
        bannerLink.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        
        // Optional: Add click tracking or analytics here if needed
        bannerLink.addEventListener('click', function(e) {
            // Track click event (optional)
            console.log('Podcast banner clicked - redirecting to Spotify');
        });
    }
    
    // ===== Smooth Scroll Prevention During Animation =====
    function preventScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    // Temporarily disable scroll events during animation
    if (maxAnimationTime > 0) {
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, { passive: false });
        document.addEventListener('keydown', function(e) {
            // Prevent arrow keys, space, page up/down during animation
            if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
                preventScroll(e);
            }
        });
        
        // Re-enable scroll after animation
        setTimeout(() => {
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
            document.removeEventListener('keydown', preventScroll);
        }, (maxAnimationTime * 1000) + 200);
    }
});