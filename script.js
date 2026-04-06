/* =====================================================
   JENNY JCREA — JavaScript Interactions
   ===================================================== */

(function () {
  'use strict';

  // ───────────────────────────────
  // Smooth Active Nav on scroll
  // ───────────────────────────────
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) currentId = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ───────────────────────────────
  // Scroll-based reveal animations
  // ───────────────────────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .blog-card, .testimonial-card, .project-card, .about-layout, .contact-layout, .trust-badge'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${i * 0.07}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));

  // Timeline items reveal
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  timelineItems.forEach(el => timelineObs.observe(el));

  // ───────────────────────────────
  // Portfolio Filter
  // ───────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          // Re-trigger animation
          card.classList.remove('visible');
          void card.offsetWidth;
          card.classList.add('visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ───────────────────────────────
  // Contact form submission
  // ───────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Send Message ✉️';
        btn.disabled = false;
        formSuccess.hidden = false;
        contactForm.reset();
        setTimeout(() => { formSuccess.hidden = true; }, 5000);
      }, 1400);
    });
  }

  // ───────────────────────────────
  // Newsletter submit button
  // ───────────────────────────────
  function handleNewsletter(inputId, btnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (!btn || !input) return;

    btn.addEventListener('click', () => {
      if (!input.value || !input.value.includes('@')) {
        input.focus();
        input.style.outline = '2px solid #F4813F';
        setTimeout(() => { input.style.outline = ''; }, 1500);
        return;
      }
      const originalText = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.disabled = true;
      input.value = '';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    });
  }

  handleNewsletter('newsletter-email', 'newsletter-send');
  handleNewsletter('footer-newsletter-email', 'footer-newsletter-btn');

  // ───────────────────────────────
  // Navbar scroll shadow
  // ───────────────────────────────
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.paddingTop = '12px';
      header.style.paddingBottom = '12px';
    } else {
      header.style.paddingTop = '20px';
      header.style.paddingBottom = '';
    }
  }, { passive: true });

  // ───────────────────────────────
  // Portfolio dots (decorative)
  // ───────────────────────────────
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('dot--active'));
      dot.classList.add('dot--active');
    });
  });

  // ───────────────────────────────
  // Smooth scroll on all anchor links
  // ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ───────────────────────────────
  // Micro counter animation for hero stats
  // ───────────────────────────────
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      el.querySelector('.stat-num').innerHTML = start + '<span class="stat-plus">' + suffix + '</span>';
    }, 16);
  }

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statItems = document.querySelectorAll('.stat-item');
          const data = [
            { val: 450, suf: '+' },
            { val: 25, suf: '+' },
            { val: 4.9, suf: '/5' },
            { val: 10, suf: '+' },
          ];
          statItems.forEach((item, i) => {
            setTimeout(() => {
              if (data[i]) {
                const el = item;
                animateCounter(el, Math.round(data[i].val), data[i].suf, 1200);
              }
            }, i * 150);
          });
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObs.observe(heroStats);
  // ───────────────────────────────
  // Dark Mode Toggle
  // ───────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add a smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });

})();


// 1. Grab all the buttons inside our container
const buttons = document.querySelectorAll('.hero-cta .btn');

// 2. Loop through each button and listen for a click
buttons.forEach(button => {
  button.addEventListener('click', function () {

    // 3. First, remove the 'active' class from ALL buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // 4. Then, add the 'active' class ONLY to the button that was just clicked
    this.classList.add('active');
  });
});