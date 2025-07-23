document.addEventListener('DOMContentLoaded', function () {
    // ===== Scroll Animation =====
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }

    // Initial check and smoother load animation
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);

    // ===== Sidebar Logic =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    let contentOverlay = document.getElementById('contentOverlay');
    const body = document.body;

    // Create overlay if it doesn't exist
    if (!contentOverlay) {
        const newOverlay = document.createElement('div');
        newOverlay.id = 'contentOverlay';
        newOverlay.className = 'content-overlay';
        document.body.appendChild(newOverlay);
        contentOverlay = newOverlay;
    }

    function toggleSidebar() {
        sidebarToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        contentOverlay.classList.toggle('active');

        // Prevent scrolling when sidebar is open
        body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    }

    sidebarToggle.addEventListener('click', toggleSidebar);

    contentOverlay.addEventListener('click', function () {
        if (sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Optional: Handle window resize
    window.addEventListener('resize', function () {
        // Resize-related logic can go here
    });

    // Smooth navigation on sidebar link click
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (sidebar.classList.contains('active')) {
                e.preventDefault();
                const destination = this.getAttribute('href');
                toggleSidebar();
                setTimeout(() => {
                    window.location.href = destination;
                }, 800); // Match with CSS transition time
            }
        });
    });
});