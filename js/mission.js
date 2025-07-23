// Sidebar functionality
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const contentOverlay = document.getElementById('contentOverlay');

sidebarToggle?.addEventListener('click', () => {
    sidebarToggle.classList.toggle('active');
    sidebar?.classList.toggle('active');
    contentOverlay?.classList.toggle('active');
});

contentOverlay?.addEventListener('click', () => {
    sidebarToggle?.classList.remove('active');
    sidebar?.classList.remove('active');
    contentOverlay?.classList.remove('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mission page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const missionContainer = document.querySelector('.mission-container');
    
    // Add subtle hover effect to mission content
    if (missionContainer) {
        missionContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        missionContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});