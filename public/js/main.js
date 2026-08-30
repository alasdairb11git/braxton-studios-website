// ── IMAGE PROTECTION ──
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', function(e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

// ── SPLASH SCREEN ──
const splash = document.getElementById('splash');
if (splash) {
  const splashLogo = splash.querySelector('.splash-logo');
  // Fade logo in
  setTimeout(() => { splashLogo.classList.add('show'); }, 200);
  // Fade logo back out
  setTimeout(() => { splashLogo.classList.remove('show'); }, 1800);
  // Once logo has faded out, fade away the black overlay
  setTimeout(() => { splash.classList.add('done'); }, 2400);
  // Remove from DOM after fade finishes
  setTimeout(() => { splash.remove(); }, 3400);
}

// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const toggleKnob = document.getElementById('toggleKnob');
const THEME_KEY = 'bs-theme';
let isLight = document.body.classList.contains('light');

function updateToggleIcon() {
  toggleKnob.innerHTML = isLight
    ? '🌙'
    : "<img src='/images/logo-toggle.jpg' style='width:16px;height:16px;border-radius:50%;object-fit:cover;'>";
}
updateToggleIcon();

themeToggle.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  try { localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark'); } catch(e) {}
  updateToggleIcon();
});

// ── MEMBERS CALL DROPDOWN (click to open, like a menu) ──
const membersDropdown = document.querySelector('.nav-members-dropdown');
const membersToggle = document.getElementById('membersDropdownToggle');
if (membersDropdown && membersToggle) {
  const closeDropdown = () => {
    membersDropdown.classList.remove('open');
    membersToggle.setAttribute('aria-expanded', 'false');
  };
  membersToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !membersDropdown.classList.contains('open');
    membersDropdown.classList.toggle('open', willOpen);
    membersToggle.setAttribute('aria-expanded', String(willOpen));
  });
  document.addEventListener('click', (e) => {
    if (!membersDropdown.contains(e.target)) closeDropdown();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });
}

// ── CREUCAST FAQ ACCORDION ──
document.querySelectorAll('.creucast-faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('active');
    item.parentElement.querySelectorAll('.creucast-faq-item.active').forEach(el => el.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
    btn.setAttribute('aria-expanded', String(!isOpen));
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

// ── STORIES ARROWS ──
const storiesGrid = document.querySelector('.stories-grid');
const prevBtn = document.querySelector('.stories-prev');
const nextBtn = document.querySelector('.stories-next');
if (storiesGrid && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = storiesGrid.querySelector('.story-card');
    if (!card) return 0;
    const gap = parseInt(getComputedStyle(storiesGrid).gap) || 0;
    return card.offsetWidth + gap;
  };
  prevBtn.addEventListener('click', () => {
    storiesGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    storiesGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });
}

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
          message: (contactForm.projectType && contactForm.projectType.value ? '[' + contactForm.projectType.value + '] ' : '') + contactForm.message.value
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

// ── EMAIL SIGNUP ──
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector('button');
    const msgEl = document.getElementById('signupMsg');
    btn.disabled = true;
    btn.textContent = 'Subscribing...';
    if (msgEl) msgEl.textContent = '';

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupForm.email.value
        })
      });
      const data = await res.json();

      if (res.ok) {
        if (msgEl) {
          msgEl.textContent = data.message;
          msgEl.className = 'signup-msg success';
        }
        signupForm.reset();
      } else {
        if (msgEl) {
          msgEl.textContent = data.error || 'Something went wrong.';
          msgEl.className = 'signup-msg error';
        }
      }
    } catch (err) {
      if (msgEl) {
        msgEl.textContent = 'Network error. Please try again.';
        msgEl.className = 'signup-msg error';
      }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }
  });
}
