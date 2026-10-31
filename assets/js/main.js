// Vinay Soni Portfolio — robust, accessible, performant
(() => {
  const nav = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('navOverlay');
  const links = navLinks ? [...navLinks.querySelectorAll('a[href^="#"]')] : [];
  const backToTop = document.getElementById('backToTop');
  const toast = document.getElementById('toast');
  const cvBtn = document.getElementById('cvBtn');

  // Helper: lock body scroll when menu open
  const lockScroll = (lock) => {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
    document.body.style.touchAction = lock ? 'none' : '';
  };

  const setMenu = (open) => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (overlay) {
      overlay.hidden = !open;
      overlay.style.display = open ? 'block' : 'none';
    }
    lockScroll(open);
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    setMenu(!isOpen);
  });
  overlay?.addEventListener('click', () => setMenu(false));
  links.forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Active nav + navbar shadow + back-to-top visibility — throttled via rAF
  const sectionIds = ['home','about','skills','work','experience','process','contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (nav) nav.style.boxShadow = y > 8 ? '0 6px 30px rgba(0,0,0,0.06)' : 'none';
      if (backToTop) backToTop.classList.toggle('show', y > 600);

      let current = 'home';
      for (const s of sections) {
        const top = s.offsetTop - 110;
        if (y >= top) current = s.id;
      }
      document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === '#' + current);
      });
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll with offset (sticky header)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
        history.pushState(null, '', id);
      }
    });
  });

  // Back to top
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal on scroll — respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.project-card, .exp-card, .process-step, .skill-group, .trait, .about-ill, .hero-text, .hero-ill')
      .forEach(el => el.classList.add('in'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.project-card, .exp-card, .process-step, .skill-group, .trait, .about-ill, .hero-text, .hero-ill').forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // Toast helper
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  // CV button: if placeholder is text file, show friendly message
  cvBtn?.addEventListener('click', async (e) => {
    try {
      const res = await fetch(cvBtn.getAttribute('href'), { method: 'HEAD' });
      const ct = res.headers.get('content-type') || '';
      const len = Number(res.headers.get('content-length') || 0);
      if (len < 2000 && !ct.includes('pdf')) {
        // Let download happen but also inform
        setTimeout(() => showToast('CV placeholder — replace assets/Vinay_Soni_CV.pdf with your real PDF'), 300);
      }
    } catch { /* ignore, allow download */ }
  });

  // Handle external skillicons failing — add fallback text already present
  document.querySelectorAll('.skill-card img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });

  console.log('Vinay Soni Portfolio v2 — responsive, a11y, Vercel-ready ✓');
})();
