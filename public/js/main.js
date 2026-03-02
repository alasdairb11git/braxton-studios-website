// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const toggleKnob = document.getElementById('toggleKnob');
let isLight = false;

themeToggle.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  toggleKnob.innerHTML = isLight
    ? '🌙'
    : "<img src='/images/logo-toggle.jpg' style='width:16px;height:16px;border-radius:50%;object-fit:cover;'>";
});

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

// ── CURSOR HOVER ON PROJECT CARDS ──
document.querySelectorAll('.project-card, .project-card-link').forEach(card => {
  card.addEventListener('mouseenter', () => {
    ring.classList.add('hover-active');
    cursor.style.opacity = '0';
  });
  card.addEventListener('mouseleave', () => {
    ring.classList.remove('hover-active');
    cursor.style.opacity = '1';
  });
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('navHamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const msgEl = document.getElementById('formMessage');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    if (msgEl) msgEl.textContent = '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name.value,
          email: contactForm.email.value,
          message: contactForm.message.value
        })
      });
      const data = await res.json();

      if (res.ok) {
        if (msgEl) {
          msgEl.textContent = data.message;
          msgEl.className = 'form-message success';
        }
        contactForm.reset();
      } else {
        if (msgEl) {
          msgEl.textContent = data.error || 'Something went wrong.';
          msgEl.className = 'form-message error';
        }
      }
    } catch (err) {
      if (msgEl) {
        msgEl.textContent = 'Network error. Please try again.';
        msgEl.className = 'form-message error';
      }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}
