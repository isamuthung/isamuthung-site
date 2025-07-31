document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    let contentOverlay = document.getElementById('contentOverlay');
    const body = document.body;
    const main = document.querySelector('main');

    // ===== Scroll Lock Before Animations =====
    body.classList.add('scroll-locked'); // Locks both body and main via CSS

    // ===== Sidebar Logic =====
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
        body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

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

    window.addEventListener('resize', function () {
        body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    });

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (sidebar.classList.contains('active')) {
                e.preventDefault();
                const destination = this.getAttribute('href');
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
        }, totalTime + 100);
    } else {
        body.classList.remove('scroll-locked');
    }
});
