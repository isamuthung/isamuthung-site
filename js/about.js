document.addEventListener('DOMContentLoaded', function () {
    // Wait for default.js to initialize first
    setTimeout(() => {
        initializeVisionPage();
    }, 100);
});

function initializeVisionPage() {
    // Skip word animation to prevent dipping effect
    // animateWords();
    
    // Add simplified hover effects
    addHoverEffects();
    
    // Ensure scroll is locked initially for animations
    document.body.classList.add('scroll-locked');
    
    // Unlock scroll after all animations complete
    setTimeout(() => {
        document.body.classList.remove('scroll-locked');
    }, 2000); // Increased to ensure all section animations complete
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
            // Only apply on mobile/touch devices
            if ('ontouchstart' in window) {
                // Temporarily add a class for the touch effect
                section.classList.add('touch-effect');
                
                // Remove the class after animation
                setTimeout(() => {
                    section.classList.remove('touch-effect');
                }, 300);
            }
        });
        
        // Ensure animations have completed before allowing hover effects
        section.addEventListener('animationend', () => {
            section.classList.add('animation-complete');
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
        
        /* Only allow hover effects after animations complete */
        .vision-section:not(.animation-complete):hover {
            transform: translateY(40px) !important; /* Maintain animation state */
        }
    `;
    document.head.appendChild(style);
}

// Initialize touch styles
document.addEventListener('DOMContentLoaded', addTouchEffectStyles);