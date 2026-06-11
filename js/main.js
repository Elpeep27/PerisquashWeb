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
const racketCursor = document.getElementById('racketCursor');
const ballCompanion = document.getElementById('ballCompanion');

// Racket position tracking
let racketX = -100, racketY = -100;
let targetX = -100, targetY = -100;
let lastRacketX = -100, lastRacketY = -100;
let racketAngle = 22;
let racketSpeed = 0;
let isMouseOnScreen = false;

// Physics parameters
const SPRING = 0.014;
const DAMP = 0.82;
const HITR = 50; // Hit radius (pixels)

// Ball status
let ballMode = 'scroll'; // 'scroll' or 'free'
let ballX = window.innerWidth / 2;
let ballY = window.innerHeight * 0.4;
let ballVx = 0;
let ballVy = 0;
let lastIndex = null;
const bounces = 4; // Bounces per full scroll range

// Free Physics constants (Rule 6 knobs)
const GRAV = 0.42;
const REST = 0.86;
const AIRX = 0.996;
const AIRY = 0.999;
const FLOORFRIC = 0.93;
const BALLR = 13; // Ball radius

let hitCooldown = 0;
let returnProgress = 1; // Spring back progress [0-1]

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
   3. Custom Racket Cursor & Interaction
   ========================================================================== */
window.addEventListener('mousemove', (e) => {
  isMouseOnScreen = true;
  targetX = e.clientX;
  targetY = e.clientY;
  
  if (racketX === -100) {
    racketX = targetX;
    racketY = targetY;
  }
});

document.addEventListener('mouseleave', () => {
  isMouseOnScreen = false;
});

document.addEventListener('mouseenter', (e) => {
  isMouseOnScreen = true;
  targetX = e.clientX;
  targetY = e.clientY;
});

// Photo Card Touch Zoom Toggle (Rule 7)
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
   4. Physics Loop (requestAnimationFrame)
   ========================================================================== */
function triggerRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple-effect';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function triggerSquish() {
  if (ballCompanion) {
    ballCompanion.classList.remove('squashed');
    void ballCompanion.offsetWidth; // Reflow trigger
    ballCompanion.classList.add('squashed');
  }
}

function nudgeHeader() {
  const sections = document.querySelectorAll('section');
  let activeSection = null;
  
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!activeSection || Math.abs(rect.top) < Math.abs(activeSection.getBoundingClientRect().top)) {
        activeSection = sec;
      }
    }
  });

  if (activeSection) {
    const h2 = activeSection.querySelector('h2');
    if (h2) {
      h2.style.transform = 'translateY(-6px) scale(1.02)';
      h2.style.transition = 'transform 0.1s ease-out';
      setTimeout(() => {
        h2.style.transform = 'none';
        h2.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }, 100);
    }
  }
}

// Show temporary toast notification
function showToast(message) {
  const oldToast = document.querySelector('.physics-toast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.className = 'physics-toast';
  toast.innerHTML = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(40px);
    background-color: var(--blue-deep);
    color: var(--white);
    padding: 0.8rem 1.6rem;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10005;
    box-shadow: 0 10px 30px rgba(30, 58, 107, 0.3);
    border: 1px solid var(--cyan);
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
  `;
  document.body.appendChild(toast);
  
  // Trigger animation reflow
  void toast.offsetWidth;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(40px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Double click or Esc key returns ball to scroll mode
function returnToScroll() {
  if (ballMode === 'free') {
    ballMode = 'scroll';
    returnProgress = 0; // Trigger spring return animation
    showToast('🎾 Pelota devuelta a la cancha.');
  }
}

window.addEventListener('dblclick', returnToScroll);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') returnToScroll();
});

// Core Physics & Cursor Animation Tick
function updatePhysics() {
  // 1. Racket tracking math
  if (isMouseOnScreen) {
    // Spring physics tracking
    racketX += (targetX - racketX) * 0.16;
    racketY += (targetY - racketY) * 0.16;
  }
  
  racketSpeed = Math.hypot(racketX - lastRacketX, racketY - lastRacketY);
  
  // Calculate orientation angle based on racket movement vector
  let targetAngle = 22; // default rest angle
  if (racketSpeed > 0.8 && isMouseOnScreen) {
    const angleRad = Math.atan2(racketY - lastRacketY, racketX - lastRacketX);
    targetAngle = angleRad * 180 / Math.PI;
  }

  // Smooth rotation wrapping shortest path
  let diff = targetAngle - racketAngle;
  while (diff < -180) diff += 360;
  while (diff > 180) diff -= 360;
  racketAngle += diff * 0.15;
  
  // Apply transformations to Racket SVG
  if (racketCursor) {
    if (isMouseOnScreen) {
      racketCursor.style.transform = `translate3d(${racketX - 30}px, ${racketY - 30}px, 0) rotate(${racketAngle}deg)`;
    } else {
      // Hide cursor off-screen
      racketCursor.style.transform = `translate3d(-100px, -100px, 0)`;
    }
  }

  lastRacketX = racketX;
  lastRacketY = racketY;

  // 2. Ball companion math
  const leftWall = window.innerWidth * 0.06;
  const rightWall = window.innerWidth * 0.94;
  const W = rightWall - leftWall;
  
  if (ballMode === 'scroll') {
    // Scroll tracking mode
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const p = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    
    // Triangle wave horizontally between leftWall and rightWall
    const phase = p * bounces;
    const index = Math.floor(phase);
    const t = phase - index;
    
    let targetBallX = 0;
    if (index % 2 === 0) {
      targetBallX = leftWall + W * t;
    } else {
      targetBallX = rightWall - W * t;
    }

    // Parabolic arc bounce vertically
    const arcHeight = 80;
    const baselineY = window.innerHeight * 0.42;
    const targetBallY = baselineY - Math.sin(t * Math.PI) * arcHeight;

    // Detect wall impacts in scroll progress
    if (lastIndex !== null && index !== lastIndex) {
      const contactX = (lastIndex % 2 === 0) ? rightWall : leftWall;
      triggerRipple(contactX, baselineY);
      triggerSquish();
      nudgeHeader();
    }
    lastIndex = index;

    // Smooth return path spring
    if (returnProgress < 1) {
      returnProgress += 0.02;
      ballX += (targetBallX - ballX) * SPRING * 10;
      ballY += (targetBallY - ballY) * SPRING * 10;
    } else {
      // Slight lag for fluid scroll feel
      ballX += (targetBallX - ballX) * 0.12;
      ballY += (targetBallY - ballY) * 0.12;
    }

    // Check for Easter egg racket contact
    if (isMouseOnScreen && racketSpeed > 6) {
      const dist = Math.hypot(racketX - ballX, racketY - ballY);
      if (dist < HITR) {
        ballMode = 'free';
        // Transfer impulse vector
        const angleRad = Math.atan2(ballY - racketY, ballX - racketX);
        const impulse = racketSpeed * 1.3 + 5;
        ballVx = Math.cos(angleRad) * impulse;
        ballVy = Math.sin(angleRad) * impulse;
        
        triggerSquish();
        triggerRipple(ballX, ballY);
        showToast('💥 <strong>¡Pelota libre!</strong> Mantenla en el aire bateando con tu raqueta.<br>Presiona <kbd>Esc</kbd> o <kbd>Doble Clic</kbd> para devolverla.');
      }
    }

  } else if (ballMode === 'free') {
    // Free physical simulation
    ballVy += GRAV;
    ballVx *= AIRX;
    ballVy *= AIRY;

    ballX += ballVx;
    ballY += ballVy;

    // Wall bounce constraints
    if (ballX <= leftWall + BALLR) {
      ballX = leftWall + BALLR;
      ballVx = -ballVx * REST;
      triggerSquish();
      triggerRipple(leftWall, ballY);
    } else if (ballX >= rightWall - BALLR) {
      ballX = rightWall - BALLR;
      ballVx = -ballVx * REST;
      triggerSquish();
      triggerRipple(rightWall, ballY);
    }

    // Floor / Ceiling constraints
    const floorY = window.innerHeight - BALLR;
    const ceilingY = BALLR;

    if (ballY >= floorY) {
      ballY = floorY;
      ballVy = -ballVy * REST;
      ballVx *= FLOORFRIC; // Roll friction
      triggerSquish();
      triggerRipple(ballX, floorY);
    } else if (ballY <= ceilingY) {
      ballY = ceilingY;
      ballVy = -ballVy * REST;
      triggerSquish();
      triggerRipple(ballX, ceilingY);
    }

    // Hit checking with racket
    if (hitCooldown > 0) {
      hitCooldown--;
    } else if (isMouseOnScreen) {
      const dist = Math.hypot(racketX - ballX, racketY - ballY);
      if (dist < HITR && racketSpeed > 1.5) {
        hitCooldown = 12; // Prevent sticky multi-hits
        
        const angleRad = Math.atan2(ballY - racketY, ballX - racketX);
        const impulse = racketSpeed * 1.2 + 4;
        ballVx = Math.cos(angleRad) * impulse;
        ballVy = Math.sin(angleRad) * impulse;
        
        triggerSquish();
        triggerRipple(ballX, ballY);
        nudgeHeader();
      }
    }
  }

  // Update DOM Ball position
  if (ballCompanion) {
    ballCompanion.style.transform = `translate3d(${ballX - 13}px, ${ballY - 13}px, 0)`;
  }

  requestAnimationFrame(updatePhysics);
}

// Start physics loop if motion is not reduced
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  requestAnimationFrame(updatePhysics);
} else {
  // Hide custom cursor and ball if reduced motion is enabled
  if (racketCursor) racketCursor.style.display = 'none';
  if (ballCompanion) ballCompanion.style.display = 'none';
  document.body.classList.remove('racket-on');
}

/* ==========================================================================
   5. Popover Modals Controller
   ========================================================================== */
const activeModals = new Set();

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    activeModals.add(id);
    
    // Hide racket cursor and restore standard cursor
    document.body.classList.remove('racket-on');
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
      // Re-enable custom racket cursor
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('racket-on');
      }
      document.body.style.overflow = ''; // Unlock scroll
    }
  }
}

// Event Listeners for Popover triggers
document.getElementById('btnReglas')?.addEventListener('click', () => openModal('modalReglas'));
document.getElementById('btnTarifas')?.addEventListener('click', () => openModal('modalTarifas'));
document.getElementById('btnMarcador')?.addEventListener('click', () => openModal('modalMarcador'));

// Esc keyboard navigation close
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeModals.size > 0) {
    activeModals.forEach(id => closeModal(id));
  }
});

/* ==========================================================================
   6. GA4 Conversion Tracking Events (Rule 15.5)
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
   7. Lazy Load Videos (Core Web Vitals Optimization)
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
