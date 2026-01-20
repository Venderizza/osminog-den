// Simple landing interactions: mobile nav, smooth closing, lightbox, year

(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.getElementById('navList');

  function setExpanded(isExpanded) {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  }

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('is-open');
      setExpanded(open);
    });

    // Close menu on link click
    navList.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      navList.classList.remove('is-open');
      setExpanded(false);
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navList.classList.contains('is-open')) return;
      const inside = e.target.closest('.nav');
      if (!inside) {
        navList.classList.remove('is-open');
        setExpanded(false);
      }
    });
  }

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb?.querySelector('.lightbox__img');
  const lbClose = lb?.querySelector('.lightbox__close');

  function openLb(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || 'Фото';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    if (!lb || !lbImg) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const img = btn.querySelector('img');
      if (src) openLb(src, img?.alt || '');
    });
  });

  lbClose?.addEventListener('click', closeLb);
  lb?.addEventListener('click', (e) => {
    if (e.target === lb) closeLb();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb?.classList.contains('is-open')) closeLb();
  });
})();
