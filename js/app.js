/* ==========================================================================
   PeriSquash — app.js
   Fase 1: scroll-reveal, nav, menú móvil, indicador de scroll.
   (Conteo animado, parallax, lógica de reserva y popovers → Fase 2.)
   ========================================================================== */
(function () {
  'use strict';

  /* 1. Scroll reveal ------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* 2. Nav shrink + indicador de scroll ---------------------------------- */
  var nav = document.getElementById('mainNav');
  var scrollInd = document.getElementById('scrollInd');
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (scrollInd) {
      scrollInd.style.opacity = y > 60 ? '0' : '1';
      scrollInd.style.pointerEvents = y > 60 ? 'none' : 'auto';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 3. Menú móvil --------------------------------------------------------- */
  var menuBtn = document.getElementById('mobileMenuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 4. Reserva: evita recarga hasta cablear la lógica en Fase 2 ---------- */
  var reservaForm = document.getElementById('reservaForm');
  if (reservaForm) {
    reservaForm.addEventListener('submit', function (e) { e.preventDefault(); });
  }
})();
