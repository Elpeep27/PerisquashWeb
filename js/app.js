/* ==========================================================================
   PeriSquash — app.js
   Reveal suave progresivo. Sin componentes interactivos adicionales.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealItems = document.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (el) { io.observe(el); });
  }
})();

/* Nav: solidifica al hacer scroll + menú móvil */
(function () {
  'use strict';

  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (!nav) return;

  var onScroll = function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && menu) {
    var closeMenu = function () {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', isOpen);
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }
})();

/* Acordeón: Tarifas / Clases en la sección Horarios */
(function () {
  'use strict';

  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    var item = trigger.closest('.accordion-item');
    var panel = item.querySelector('.accordion-panel');
    if (!panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-expanded');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '';
    });
  });
})();

/* El Club: slideshow de fotos con crossfade */
(function () {
  'use strict';

  var slideshow = document.getElementById('clubSlideshow');
  if (!slideshow) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slides = Array.prototype.slice.call(slideshow.querySelectorAll('img'));
  if (reduce || slides.length < 2) return;

  var current = 0;
  setInterval(function () {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }, 4000);
})();
