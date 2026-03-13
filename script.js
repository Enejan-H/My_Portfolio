// ── NAVBAR SCROLL EFFECT ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

// ── ACTIVE NAV ───────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(s => {
    if (scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}

// ── SCROLL REVEAL ────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));

// ── HERO CARDS PARALLAX ─────────────────────────────
const cards = document.querySelectorAll('.hcard');
let mouseX = 0, mouseY = 0;
let rafId = null;

document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 24;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 16;

  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      cards.forEach((card, i) => {
        const depth = [1.2, 0.7, 0.4][i] || 0.5;
        const x = mouseX * depth;
        const y = mouseY * depth;
        const rot = parseFloat(card.dataset.baseRot || 0) + mouseX * 0.08 * depth;
        card.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      });
      rafId = null;
    });
  }
});

// Store base rotations
cards.forEach((card, i) => {
  const rots = [-1, 4, -3];
  card.dataset.baseRot = rots[i] || 0;
});

// ── TYPED EFFECT for hero subtitle ──────────────────
const roles = ['Data Scientist', 'ML Engineer', 'Maths Educator', 'AI Explorer'];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

if (typedEl) {
  function typeLoop() {
    const word = roles[rIdx];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typedEl.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 60 : 90);
  }
  setTimeout(typeLoop, 800);
}

// ── COUNTER ANIMATION ────────────────────────────────
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (Number.isInteger(target) ? Math.round(target * eased) : (target * eased).toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => countObserver.observe(c));

// ── SMOOTH HOVER LIFT on skill/project cards ─────────
document.querySelectorAll('.skill-card, .project-card, .edu-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.willChange = 'transform, box-shadow';
  });
  card.addEventListener('mouseleave', () => {
    card.style.willChange = 'auto';
  });
});

// ── MOBILE NAV TOGGLE ────────────────────────────────
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ── MODAL ────────────────────────────────────────────
const modal = document.getElementById('hire-modal');

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('f-name').focus(), 300);
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // Reset after animation
  setTimeout(() => {
    document.getElementById('modal-form-wrap').style.display = '';
    document.getElementById('modal-success').style.display = 'none';
    document.getElementById('hire-form').reset();
    document.getElementById('send-btn').textContent = 'Send Message \u2192';
    document.getElementById('send-btn').classList.remove('sending');
  }, 300);
}

function handleOverlayClick(e) {
  if (e.target === modal) closeModal();
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Email send — opens mailto as fallback (no backend needed for static site)
function sendEmail(e) {
  e.preventDefault();
  const btn = document.getElementById('send-btn');
  btn.textContent = 'Sending...';
  btn.classList.add('sending');

  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const message = document.getElementById('f-message').value.trim();

  // Build a mailto link so no backend is required
  const body = encodeURIComponent(
    `From: ${name} <${email}>\n\n${message}`
  );
  const mailto = `mailto:enejanhayytjanova@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  // Short delay for UX feel, then open mailto and show success
  setTimeout(() => {
    window.location.href = mailto;
    document.getElementById('modal-form-wrap').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
  }, 700);
}
