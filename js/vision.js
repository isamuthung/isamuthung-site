document.addEventListener('DOMContentLoaded', function () {
    // Wait for default.js to initialize first
    setTimeout(() => {
        initializeVisionPage();
    }, 100);
});

function initializeVisionPage() {
    // Animate words in vision text
    animateWords();
    
    // Add hover effects to vision sections
    addHoverEffects();
    
    // Ensure scroll is locked initially for animations
    document.body.classList.add('scroll-locked');
    
    // Unlock scroll after all animations complete
    setTimeout(() => {
        document.body.classList.remove('scroll-locked');
    }, 3000);
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
            const baseDelay = (sectionIndex * 400) + 1000; // Section stagger
            const wordDelay = wordIndex * 50; // Word stagger within section
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
        // Add click effect for mobile
        section.addEventListener('click', () => {
            section.style.transform = 'scale(0.98)';
            setTimeout(() => {
                section.style.transform = 'scale(1.02)';
            }, 100);
            setTimeout(() => {
                section.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Add subtle parallax effect on scroll (if needed in future)
function addParallaxEffect() {
    const visionSections = document.querySelectorAll('.vision-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        visionSections.forEach((section, index) => {
            const rate = scrolled * -0.1 * (index + 1);
            section.style.transform = `translateY(${rate}px)`;
        });
    });
}