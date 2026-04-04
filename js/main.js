// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed: ', err));
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Nav shrink
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
  
  const si = document.getElementById('scrollInd');
  if (si) si.style.opacity = window.scrollY > 100 ? '0' : '1';
}, { passive: true });

// Racket animation (desktop only)
if (window.innerWidth > 1024) {
  const racket = document.getElementById('racketSvg');
  const hero = document.querySelector('.hero');
  if (racket && hero) {
    const heroH = hero.offsetHeight;
    (function animateRacket() {
      const s = window.scrollY;
      const d = document.documentElement.scrollHeight - window.innerHeight;
      const p = s / d;
      if (s < heroH * 0.7) { 
        racket.classList.remove('visible'); 
      } else {
        racket.classList.add('visible');
        racket.style.left = (40 + Math.sin(p * 18) * 55) + 'px';
        racket.style.top = (window.innerHeight * 0.3 + Math.cos(p * 12) * (window.innerHeight * 0.18)) + 'px';
        racket.style.transform = `rotate(${-30 + Math.sin(p * 8) * 35}deg)`;
      }
      requestAnimationFrame(animateRacket);
    })();
  }
}

// Counter animation
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.classList.contains('counted')) {
      e.target.classList.add('counted');
      const t = parseFloat(e.target.dataset.target);
      const dec = e.target.dataset.decimal === 'true';
      const suf = e.target.dataset.suffix || '';
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / 1500, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = eased * t;
        if (suf) e.target.textContent = Math.round(cur) + suf;
        else if (dec) e.target.textContent = cur.toFixed(1) + '★';
        else e.target.textContent = Math.round(cur) + '+';
        if (p < 1) requestAnimationFrame(tick);
      })(performance.now());
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.sb-num[data-target]').forEach(el => counterObs.observe(el));
