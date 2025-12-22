// Viseyyon Technologies - Main JavaScript
// Modern, Interactive UI Components

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initProductFilter();
  initAnimations();
  initSmoothScroll();
  initPricingToggle();
});

// ==================== Navbar ====================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });
}

// ==================== Mobile Menu ====================
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

// ==================== Product Filter ====================
function initProductFilter() {
  const tabs = document.querySelectorAll('.category-tab');
  const products = document.querySelectorAll('.product-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;

      // Filter products
      products.forEach(product => {
        const productCategories = product.dataset.category?.split(' ') || [];

        if (category === 'all' || productCategories.includes(category)) {
          product.style.display = '';
          product.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

// ==================== Scroll Animations ====================
function initAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ==================== Smooth Scroll ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==================== Pricing Toggle ====================
function initPricingToggle() {
  const toggle = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.pricing-monthly');
  const annualLabel = document.querySelector('.pricing-annual');
  const prices = document.querySelectorAll('.pricing-price');

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');

      if (monthlyLabel) monthlyLabel.classList.toggle('active');
      if (annualLabel) annualLabel.classList.toggle('active');

      // Update prices (you'd populate this with real data)
      prices.forEach(price => {
        const monthly = price.dataset.monthly;
        const annual = price.dataset.annual;
        if (monthly && annual) {
          price.innerHTML = toggle.classList.contains('active')
            ? `$${annual}<span>/year</span>`
            : `$${monthly}<span>/month</span>`;
        }
      });
    });
  }
}

// ==================== Counter Animation ====================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = formatNumber(Math.floor(current));
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = formatNumber(target);
    }
  };

  updateCounter();
}

function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// ==================== Form Validation ====================
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }

    // Email validation
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        input.classList.add('error');
      }
    }
  });

  return isValid;
}

// ==================== Toast Notifications ====================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==================== Copy to Clipboard ====================
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy', 'error');
  });
}

// ==================== Theme Toggle ====================
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// ==================== Lazy Loading Images ====================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ==================== Dropdown Hover Intent ====================
function initDropdownHoverIntent() {
  const dropdowns = document.querySelectorAll('.nav-link.has-dropdown');

  dropdowns.forEach(dropdown => {
    let timeout;

    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      dropdown.querySelector('.nav-dropdown').style.opacity = '1';
      dropdown.querySelector('.nav-dropdown').style.visibility = 'visible';
    });

    dropdown.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        dropdown.querySelector('.nav-dropdown').style.opacity = '0';
        dropdown.querySelector('.nav-dropdown').style.visibility = 'hidden';
      }, 150);
    });
  });
}

// ==================== Utility Functions ====================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==================== API Helper ====================
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==================== Event Tracking ====================
function trackEvent(category, action, label) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }

  // Console log for debugging
  console.log('Event:', { category, action, label });
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('CTA', 'click', btn.textContent.trim());
  });
});

// ==================== Export for modules ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showToast,
    copyToClipboard,
    validateForm,
    fetchAPI,
    trackEvent
  };
}
