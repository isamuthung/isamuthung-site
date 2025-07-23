document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.error-content');
  content.style.opacity = 0;
  content.style.transition = 'opacity 1s ease-in-out';

  setTimeout(() => {
    content.style.opacity = 1;
  }, 100);
});