document.addEventListener('DOMContentLoaded', () => {
  // Set active class on current page's nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar nav a, .mobile-menu nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath) || 
        (currentPath.endsWith('/') && linkPath === 'index.html') ||
        (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile menu toggle - enhanced for dropdown style
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  console.log('Menu toggle found:', menuToggle !== null);
  console.log('Mobile menu found:', mobileMenu !== null);
  
  if (menuToggle && mobileMenu) {
    // Only add visible class if we're on mobile
    if (window.innerWidth <= 768) {
      menuToggle.classList.add('visible');
    }
    
    // Update visibility on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        menuToggle.classList.add('visible');
      } else {
        menuToggle.classList.remove('visible');
        menuToggle.classList.remove('menu-active');
        mobileMenu.classList.remove('show');
      }
    });
    
    menuToggle.addEventListener('click', (e) => {
      console.log('Menu toggle clicked');
      e.preventDefault();
      e.stopPropagation();
      menuToggle.classList.toggle('menu-active');
      mobileMenu.classList.toggle('show');
      
      // Force repaint to ensure transitions work properly
      void mobileMenu.offsetWidth;
    });
    
    // Close menu when clicking on a mobile menu link
    const mobileLinks = document.querySelectorAll('.mobile-menu nav a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('menu-active');
        mobileMenu.classList.remove('show');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (mobileMenu.classList.contains('show') && 
          !mobileMenu.contains(event.target) && 
          !menuToggle.contains(event.target)) {
        menuToggle.classList.remove('menu-active');
        mobileMenu.classList.remove('show');
      }
    });
  }

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