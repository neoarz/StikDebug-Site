document.addEventListener('DOMContentLoaded', () => {
  // Set active class on current page's nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath) || 
        (currentPath.endsWith('/') && linkPath === 'index.html') ||
        (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Animation for sections on scroll
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Current year for copyright
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector('footer p');
  
  if (copyrightElement) {
    copyrightElement.textContent = copyrightElement.textContent.replace('2025', currentYear);
  }
}); 