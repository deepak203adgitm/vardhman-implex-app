// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
const darkIcon = darkToggle.querySelector('i');
function setDark(on) {
  document.body.classList.toggle('dark', on);
  darkIcon.className = on ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('dark', on);
}
setDark(localStorage.getItem('dark') === 'true');
darkToggle.addEventListener('click', () => setDark(!document.body.classList.contains('dark')));

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('active');
  });
});

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 80) {
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.1)';
  } else {
    nav.style.boxShadow = '0 1px 16px rgba(0,0,0,0.06)';
  }
});

// Scroll-triggered animations with staggered delays
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Cards — staggered slide up
document.querySelectorAll('.feature-card, .category-card, .step-card').forEach((el, i) => {
  el.classList.add('animate-in');
  el.dataset.delay = i * 100;
  scrollObserver.observe(el);
});

// Social cards — scale in
document.querySelectorAll('.social-card').forEach((el, i) => {
  el.classList.add('animate-scale');
  el.dataset.delay = i * 120;
  scrollObserver.observe(el);
});

// Video cards — scale in
document.querySelectorAll('.video-card').forEach((el, i) => {
  el.classList.add('animate-scale');
  el.dataset.delay = i * 150;
  scrollObserver.observe(el);
});

// Section titles & descriptions — fade in
document.querySelectorAll('.section-title, .section-desc').forEach(el => {
  el.classList.add('animate-fade');
  scrollObserver.observe(el);
});

// Location items — slide from left
document.querySelectorAll('.loc-item').forEach((el, i) => {
  el.classList.add('animate-slide-left');
  el.dataset.delay = i * 120;
  scrollObserver.observe(el);
});

// Map — slide from right
document.querySelectorAll('.map-container').forEach(el => {
  el.classList.add('animate-slide-right');
  scrollObserver.observe(el);
});

// CTA box — fade in
document.querySelectorAll('.cta-box').forEach(el => {
  el.classList.add('animate-fade');
  scrollObserver.observe(el);
});

// Animated stat counter
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      if (text === '500+') animateCounter(el, 500, '+');
      else if (text === '1000+') animateCounter(el, 1000, '+');
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

// Parallax on hero orbs
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-orb').forEach((orb, i) => {
    const speed = (i + 1) * 0.15;
    orb.style.transform = `translateY(${y * speed}px)`;
  });
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = '#e63946';
      } else {
        link.style.color = '';
      }
    }
  });
});
