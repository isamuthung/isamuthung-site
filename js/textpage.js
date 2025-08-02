document.addEventListener('DOMContentLoaded', function () {
    // ===== CRITICAL FIX: Immediately enable scrolling for text pages =====
    const body = document.body;
    
    // Add textpage-body class to identify this as a text page
    body.classList.add('textpage-body');
    
    // Force remove scroll lock immediately for text pages
    body.classList.remove('scroll-locked');
    body.style.overflow = 'auto';
    body.style.overflowY = 'auto';
    body.style.height = 'auto';
    
    // Ensure main element is also scrollable
    const main = document.querySelector('main');
    if (main) {
        main.style.overflow = 'visible';
        main.style.overflowY = 'visible';
        main.style.height = 'auto';
    }
    
    // Override any scroll locking that might happen from default.js
    const forceScrollUnlock = () => {
        if (body.classList.contains('textpage-body')) {
            body.classList.remove('scroll-locked');
            body.style.overflow = 'auto';
            body.style.overflowY = 'auto';
            body.style.height = 'auto';
            
            if (main) {
                main.style.overflow = 'visible';
                main.style.overflowY = 'visible';
                main.style.height = 'auto';
            }
        }
    };
    
    // Call immediately and set up observer to catch any future changes
    forceScrollUnlock();
    setTimeout(forceScrollUnlock, 100);
    setTimeout(forceScrollUnlock, 500);
    
    // Set up a mutation observer to catch any class changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (body.classList.contains('scroll-locked') && body.classList.contains('textpage-body')) {
                    forceScrollUnlock();
                }
            }
        });
    });
    
    observer.observe(body, {
        attributes: true,
        attributeFilter: ['class', 'style']
    });

    // ===== Text Content Scroll Animation =====
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function handleTextScroll() {
        // Handle any additional text elements that need scroll animations
        const textElements = document.querySelectorAll('.page-content p, .page-header');
        textElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check for text animations
    handleTextScroll();
    window.addEventListener('scroll', handleTextScroll);
    setTimeout(handleTextScroll, 100);

    // ===== Text-specific interactions =====
    
    // Optional: Add smooth scrolling behavior for text content
    const textContent = document.querySelector('.main-content');
    if (textContent) {
        // Add any text-specific behaviors here
        // For example, reading progress indicator, text size adjustment, etc.
    }

    // Optional: Handle text selection enhancements
    document.addEventListener('selectionchange', function() {
        // Add any text selection related functionality here if needed
    });
    
    // ===== Handle sidebar interactions without breaking scroll =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        // Override sidebar toggle to maintain scroll capability
        const originalToggle = sidebarToggle.onclick;
        
        sidebarToggle.addEventListener('click', function(e) {
            // Let the original sidebar functionality work
            // but always ensure body remains scrollable for text pages
            setTimeout(() => {
                if (body.classList.contains('textpage-body')) {
                    // Only lock scroll when sidebar is actually open
                    if (sidebar.classList.contains('active')) {
                        body.style.overflow = 'hidden';
                    } else {
                        forceScrollUnlock();
                    }
                }
            }, 10);
        });
        
        // Handle sidebar close to restore scrolling
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('content-overlay')) {
                setTimeout(forceScrollUnlock, 10);
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                setTimeout(forceScrollUnlock, 10);
            }
        });
    }
});