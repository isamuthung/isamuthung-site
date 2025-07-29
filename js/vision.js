document.addEventListener('DOMContentLoaded', function () {
    // Wait for default.js to initialize first
    setTimeout(() => {
        initializeVisionPage();
    }, 100);
});

function initializeVisionPage() {
    const visionContainer = document.querySelector('.vision-container');
    
    // Disable pointer events during animations
    if (visionContainer) {
        visionContainer.classList.add('animating');
    }
    
    // Skip word animation to prevent dipping effect
    // animateWords();
    
    // Add simplified hover effects
    addHoverEffects();
    
    // Ensure scroll is locked initially for animations
    document.body.classList.add('scroll-locked');
    
    // Calculate total animation time: container delay (0.1s) + container duration (1s) + last section delay (1.6s) + section duration (0.8s) = 3.5s
    const totalAnimationTime = 3500;
    
    // Unlock scroll and enable pointer events after all animations complete
    setTimeout(() => {
        document.body.classList.remove('scroll-locked');
        if (visionContainer) {
            visionContainer.classList.remove('animating');
        }
    }, totalAnimationTime);
}

function animateWords() {
    const visionTexts = document.querySelectorAll('.vision-text');
    
    visionTexts.forEach((textElement, sectionIndex) => {
        const text = textElement.textContent.trim();
        const words = text.split(' ').filter(word => word.length > 0);
        
        // Clear original text
        textElement.innerHTML = '';
        
        // Create spans for each word
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.classList.add('word');
            
            // Calculate delay based on section and word position
            const baseDelay = (sectionIndex * 200) + 1200; // Start after section animations
            const wordDelay = wordIndex * 30;
            wordSpan.style.animationDelay = `${baseDelay + wordDelay}ms`;
            
            textElement.appendChild(wordSpan);
            
            // Add space after each word except the last one
            if (wordIndex < words.length - 1) {
                textElement.appendChild(document.createTextNode(' '));
            }
        });
    });
}

function addHoverEffects() {
    const visionSections = document.querySelectorAll('.vision-section');
    
    visionSections.forEach(section => {
        // Simplified mobile touch effect that doesn't conflict with CSS animations
        section.addEventListener('click', (e) => {
            // Only apply on mobile/touch devices and after animations complete
            if ('ontouchstart' in window && !document.querySelector('.vision-container').classList.contains('animating')) {
                // Temporarily add a class for the touch effect
                section.classList.add('touch-effect');
                
                // Remove the class after animation
                setTimeout(() => {
                    section.classList.remove('touch-effect');
                }, 300);
            }
        });
    });
}

// Add CSS for touch effect via JavaScript (alternative approach)
function addTouchEffectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .vision-section.touch-effect {
            transform: translateY(-1px) !important;
            transition: transform 0.15s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize touch styles
document.addEventListener('DOMContentLoaded', addTouchEffectStyles);