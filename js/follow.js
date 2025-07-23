document.addEventListener('DOMContentLoaded', () => {
  const socialIcons = document.querySelectorAll('.social-icon');
  
  // Add animation class to trigger roll-in effect
  setTimeout(() => {
    socialIcons.forEach(icon => {
      icon.classList.add('animate');
    });
  }, 100);

  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1)';
    });
  });
});