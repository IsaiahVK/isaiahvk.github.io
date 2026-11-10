/**
 * Personal Portfolio Website Script
 * Provides Theme Switching, Responsive Navigation, Scroll Spy, and Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark / Light Mode)
  initTheme();

  // 2. Mobile Menu Navigation
  initMobileMenu();

  // 3. Scroll Spy for Active Navigation Link
  initScrollSpy();

  // 4. Dynamic Year in Footer
  initFooterYear();
});

/**
 * Initializes and manages Dark / Light theme preferences
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    // Default to dark mode for modern developer portfolio feel
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });
}

/**
 * Handles mobile hamburger toggle and menu interactions
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Tracks scrolling position and marks current active section in nav bar
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Sets current year automatically in footer
 */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

