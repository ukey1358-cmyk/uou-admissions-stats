// header.js — minimal page-header behaviors (mobile hamburger, back-to-top)
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger ---
    const toggle = document.querySelector('.page-header .nav-toggle');
    const nav = document.querySelector('.page-header nav.primary');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // Close menu when a link is clicked
      nav.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // --- Back-to-top button ---
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', '맨 위로');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);
    const onScroll = () => {
      if (window.scrollY > 480) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  });
})();
