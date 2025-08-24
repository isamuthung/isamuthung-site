document.addEventListener('DOMContentLoaded', function () {
    // Try multiple possible selectors for the toggle button
    const sidebarToggle = document.getElementById('sidebarToggle') || 
                         document.querySelector('.sidebar-toggle') ||
                         document.querySelector('[data-sidebar-toggle]');
    
    // Try multiple possible selectors for the sidebar
    const sidebar = document.getElementById('sidebar') || 
                   document.querySelector('.sidebar') ||
                   document.querySelector('[data-sidebar]');
    
    let contentOverlay = document.getElementById('contentOverlay') || 
                        document.querySelector('.content-overlay');
    
    const body = document.body;
    const main = document.querySelector('main');

    // Debug logging to help identify issues
    console.log('Sidebar Toggle:', sidebarToggle);
    console.log('Sidebar:', sidebar);
    console.log('Content Overlay:', contentOverlay);

    // ===== Scroll Lock Before Animations =====
    body.classList.add('scroll-locked'); // Locks both body and main via CSS

    // ===== Create overlay if it doesn't exist =====
    if (!contentOverlay) {
        const newOverlay = document.createElement('div');
        newOverlay.id = 'contentOverlay';
        newOverlay.className = 'content-overlay';
        document.body.appendChild(newOverlay);
        contentOverlay = newOverlay;
        console.log('Created content overlay:', contentOverlay);
    }

    // ===== Sidebar Toggle Function =====
    function toggleSidebar() {
        if (!sidebarToggle || !sidebar) {
            console.error('Sidebar elements not found');
            return;
        }
        
        console.log('Toggling sidebar');
        sidebarToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        contentOverlay.classList.toggle('active');
        
        // Handle body overflow
        const isActive = sidebar.classList.contains('active');
        body.style.overflow = isActive ? 'hidden' : 'auto';
        
        console.log('Sidebar active:', isActive);
    }

    // ===== Event Listeners =====
    
    // Toggle button click
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle button clicked');
            toggleSidebar();
        });
    } else {
        console.error('Sidebar toggle button not found! Make sure your HTML has an element with id="sidebarToggle" or class="sidebar-toggle"');
    }

    // Overlay click to close
    if (contentOverlay) {
        contentOverlay.addEventListener('click', function () {
            console.log('Overlay clicked');
            if (sidebar && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            console.log('Escape key pressed');
            toggleSidebar();
        }
    });

    // Window resize handler
    window.addEventListener('resize', function () {
        if (sidebar) {
            const isActive = sidebar.classList.contains('active');
            body.style.overflow = isActive ? 'hidden' : 'auto';
        }
    });

    // Navigation link clicks (with delay for animation)
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (sidebar && sidebar.classList.contains('active')) {
                e.preventDefault();
                const destination = this.getAttribute('href');
                console.log('Navigation link clicked:', destination);
                toggleSidebar();
                setTimeout(() => {
                    window.location.href = destination;
                }, 800);
            }
        });
    });

    // ===== Unlock Scroll After Animation =====
    const items = document.querySelectorAll('.portfolio-item');
    if (items.length > 0) {
        const lastItem = items[items.length - 1];
        const style = getComputedStyle(lastItem);
        const delay = parseFloat(style.animationDelay) || 0;
        const duration = parseFloat(style.animationDuration) || 0;
        const totalTime = (delay + duration) * 1000;

        setTimeout(() => {
            body.classList.remove('scroll-locked');
            console.log('Scroll unlocked after animations');
        }, totalTime + 100);
    } else {
        // If no portfolio items, unlock immediately
        setTimeout(() => {
            body.classList.remove('scroll-locked');
            console.log('Scroll unlocked (no portfolio items found)');
        }, 1000);
    }

    // ===== Additional Debugging =====
    // Check if elements are properly structured in HTML
    setTimeout(() => {
        const toggleCheck = document.querySelector('.sidebar-toggle');
        const sidebarCheck = document.querySelector('.sidebar');
        
        if (!toggleCheck) {
            console.warn('No element with class "sidebar-toggle" found in HTML');
        }
        if (!sidebarCheck) {
            console.warn('No element with class "sidebar" found in HTML');
        }
        
        // Log current HTML structure for debugging
        const verticalBar = document.querySelector('.vertical-bar');
        if (verticalBar) {
            console.log('Vertical bar HTML:', verticalBar.outerHTML.substring(0, 200) + '...');
        }
    }, 100);
});