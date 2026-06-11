// Register Service Worker for Cache & PWA Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registered successfully: ', reg.scope))
      .catch(err => console.log('SW registration failed: ', err));
  });
}

/* ==========================================================================
   1. UI Elements & Global Variables
   ========================================================================== */
const mainNav = document.getElementById('mainNav');
const scrollInd = document.getElementById('scrollInd');

/* ==========================================================================
   2. Scroll Reveal & Navbar Shrink
   ========================================================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

window.addEventListener('scroll', () => {
  const sY = window.scrollY;
  // Shrink Nav
  if (mainNav) {
    mainNav.classList.toggle('scrolled', sY > 30);
  }
  // Fade Scroll Indicator
  if (scrollInd) {
    scrollInd.style.opacity = sY > 60 ? '0' : '1';
    scrollInd.style.pointerEvents = sY > 60 ? 'none' : 'auto';
  }
}, { passive: true });

/* ==========================================================================
   3. Photo Card Touch Zoom Toggle (Rule 7)
   ========================================================================== */
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (window.matchMedia('(hover: none)').matches) {
      card.classList.toggle('zoom');
      // Remove zoom from others
      document.querySelectorAll('.photo-card').forEach(other => {
        if (other !== card) other.classList.remove('zoom');
      });
      e.stopPropagation();
    }
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.photo-card').forEach(card => {
    card.classList.remove('zoom');
  });
});

/* ==========================================================================
   4. Popover Modals Controller
   ========================================================================== */
const activeModals = new Set();

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    activeModals.add(id);
    document.body.style.overflow = 'hidden'; // Lock background scroll
    
    // Focus trapping
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    activeModals.delete(id);
    
    if (activeModals.size === 0) {
      document.body.style.overflow = ''; // Unlock scroll
    }
  }
}

// Event Listeners for Popover triggers
document.getElementById('btnReglas')?.addEventListener('click', () => openModal('modalReglas'));
document.getElementById('btnTarifas')?.addEventListener('click', () => openModal('modalTarifas'));

// Esc keyboard navigation close
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeModals.size > 0) {
    activeModals.forEach(id => closeModal(id));
  }
});

/* ==========================================================================
   5. GA4 Conversion Tracking Events (Rule 15.5)
   ========================================================================== */
function trackConversion(label) {
  if (window.gtag) {
    gtag('event', 'contacto_whatsapp', {
      'event_category': 'engagement',
      'event_label': label
    });
  } else {
    console.log(`GA4 Track Event (Simulation): contacto_whatsapp [${label}]`);
  }
}

document.getElementById('navReserveBtn')?.addEventListener('click', () => trackConversion('nav_reservar'));
document.getElementById('heroReserveBtn')?.addEventListener('click', () => trackConversion('hero_reservar'));
document.getElementById('contactWhatsAppLink')?.addEventListener('click', () => trackConversion('contact_whatsapp'));
document.getElementById('tarifasWhatsAppBtn')?.addEventListener('click', () => trackConversion('modal_tarifas'));

document.getElementById('mapsDirectionsBtn')?.addEventListener('click', () => {
  if (window.gtag) {
    gtag('event', 'como_llegar', {
      'event_category': 'engagement',
      'event_label': 'google_maps'
    });
  } else {
    console.log('GA4 Track Event (Simulation): como_llegar [google_maps]');
  }
});

/* ==========================================================================
   6. Lazy Load Videos (Core Web Vitals Optimization)
   ========================================================================== */
const videoObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const v = e.target;
      if (v.dataset.src) {
        v.src = v.dataset.src;
        v.removeAttribute('data-src');
        v.load();
        v.play().catch(err => console.log('Video play interrupted:', err));
        observer.unobserve(v);
      }
    }
  });
}, { threshold: 0.1, rootMargin: '100px' });

document.querySelectorAll('video[data-src]').forEach(v => videoObserver.observe(v));
