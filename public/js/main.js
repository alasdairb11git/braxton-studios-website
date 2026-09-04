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

// ── FIELD KIT TRY-IT TOOL ──
(function () {
  const box = document.querySelector('.fieldkit-compare');
  if (!box) return;

  const before = box.querySelector('.fieldkit-layer.fieldkit-before');
  const after = box.querySelector('.fieldkit-layer.fieldkit-after');
  const overlay = box.querySelector('.fieldkit-filter-overlay');
  const handle = box.querySelector('.fieldkit-handle');
  const afterLabel = box.querySelector('.fieldkit-side-label.fieldkit-after');
  const pills = document.querySelectorAll('.fieldkit-lut-pill');
  const galleryCards = document.querySelectorAll('.fieldkit-gallery-card');
  const nameEl = document.querySelector('.fieldkit-active-name');
  const moodEl = document.querySelector('.fieldkit-active-mood');
  const swatchRow = document.querySelector('.fieldkit-active-swatches');
  const specEls = {
    format: document.querySelector('[data-spec="format"]'),
    best: document.querySelector('[data-spec="best"]'),
    intensity: document.querySelector('[data-spec="intensity"]'),
    pairs: document.querySelector('[data-spec="pairs"]')
  };

  let dragging = false;
  let currentBefore = pills[0] ? pills[0].dataset.realBefore : null;

  function applyLut(pill) {
    if (!pill) return;
    if (pill.dataset.realAfter) {
      currentBefore = pill.dataset.realBefore;
      before.style.backgroundImage = `url(${pill.dataset.realBefore})`;
      after.style.backgroundImage = `url(${pill.dataset.realAfter})`;
      after.style.filter = 'none';
      overlay.style.background = 'transparent';
    } else {
      before.style.backgroundImage = `url(${currentBefore})`;
      after.style.backgroundImage = `url(${currentBefore})`;
      after.style.filter = pill.dataset.filter;
      overlay.style.background = pill.dataset.tint;
    }
    if (afterLabel) afterLabel.textContent = pill.dataset.name.toUpperCase();
    if (nameEl) nameEl.textContent = pill.dataset.name;
    if (moodEl) moodEl.innerHTML = pill.dataset.mood;
    if (specEls.format) specEls.format.textContent = pill.dataset.format;
    if (specEls.best) specEls.best.textContent = pill.dataset.best;
    if (specEls.intensity) specEls.intensity.textContent = pill.dataset.intensity;
    if (specEls.pairs) specEls.pairs.textContent = pill.dataset.pairs;
    if (swatchRow) {
      swatchRow.innerHTML = '';
      pill.dataset.swatches.split(',').forEach((c) => {
        const sw = document.createElement('div');
        sw.className = 'fieldkit-swatch';
        sw.style.background = c;
        swatchRow.appendChild(sw);
      });
    }
    pills.forEach((p) => p.classList.toggle('active', p === pill));
  }

  pills.forEach((p) => p.addEventListener('click', () => applyLut(p)));

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pill = Array.from(pills).find((p) => p.dataset.lut === card.dataset.lut);
      applyLut(pill);
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  function setPos(pct) {
    pct = Math.max(2, Math.min(98, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = pct + '%';
  }
  setPos(50);

  function pointerMove(e) {
    if (!dragging) return;
    const rect = box.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    setPos((x / rect.width) * 100);
  }
  box.addEventListener('pointerdown', (e) => {
    dragging = true;
    pointerMove(e);
    e.stopPropagation();
  });
  window.addEventListener('pointermove', pointerMove);
  window.addEventListener('pointerup', () => { dragging = false; });
})();

// ── CART ──
(function () {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;

  const CART_KEY = 'bs-cart';
  const overlay = document.getElementById('cartOverlay');
  const trigger = document.getElementById('cartTrigger');
  const closeBtn = document.getElementById('cartClose');
  const itemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  const countEl = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('cartCheckout');
  const addButtons = document.querySelectorAll('[data-cart-add]');

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function saveCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
  }

  function render() {
    const items = getCart();
    countEl.textContent = String(items.length);
    countEl.classList.toggle('show', items.length > 0);

    addButtons.forEach((btn) => {
      const inCart = items.some((i) => i.id === btn.dataset.id);
      btn.textContent = inCart ? 'In Cart' : 'Add to Cart';
      btn.classList.toggle('in-cart', inCart);
    });

    if (!items.length) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      subtotalEl.textContent = '£0.00';
      return;
    }

    itemsEl.innerHTML = items.map((item) => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">£${item.price.toFixed(2)}</div>
        </div>
        <button type="button" class="cart-item-remove" data-remove="${item.id}">Remove</button>
      </div>
    `).join('');

    const subtotal = items.reduce((sum, i) => sum + i.price, 0);
    subtotalEl.textContent = '£' + subtotal.toFixed(2);

    itemsEl.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        saveCart(getCart().filter((i) => i.id !== btn.dataset.remove));
        render();
      });
    });
  }

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  if (trigger) trigger.addEventListener('click', () => { render(); openDrawer(); });
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const items = getCart();
      if (!items.length) return;

      const originalText = checkoutBtn.textContent;
      checkoutBtn.textContent = 'Redirecting…';
      checkoutBtn.style.pointerEvents = 'none';

      try {
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: items.map((i) => ({ id: i.id })) })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          window.location.href = data.url;
        } else {
          alert(data.error || 'Failed to start checkout. Please try again.');
          checkoutBtn.textContent = originalText;
          checkoutBtn.style.pointerEvents = '';
        }
      } catch (err) {
        alert('Network error. Please try again.');
        checkoutBtn.textContent = originalText;
        checkoutBtn.style.pointerEvents = '';
      }
    });
  }

  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const items = getCart();
      const exists = items.some((i) => i.id === btn.dataset.id);
      if (exists) {
        saveCart(items.filter((i) => i.id !== btn.dataset.id));
      } else {
        items.push({
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          image: btn.dataset.image,
          checkout: btn.dataset.checkout
        });
        saveCart(items);
        render();
        openDrawer();
        return;
      }
      render();
    });
  });

  render();
})();

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
