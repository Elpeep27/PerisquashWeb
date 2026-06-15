/* ==========================================================================
   PeriSquash — app.js
   Fase 2: scroll-reveal, conteo animado, parallax sutil del hero,
   lógica de reserva (cancha+día+hora → WhatsApp con vista previa),
   popovers y menú móvil. Todos los efectos respetan prefers-reduced-motion.
   Código de efectos/reserva portado de perisquash-rediseno-integrado.html.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Reveal + disparo de contadores ------------------------------------ */
  var counted = false;
  function runCounts() {
    if (counted) return;
    counted = true;
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var to = parseFloat(el.getAttribute('data-count'));
      var dec = el.getAttribute('data-dec') ? 1 : 0;
      var start = null, dur = 1100;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var v = to * (0.2 + 0.8 * p);
        el.textContent = (p < 1) ? v.toFixed(dec) : to.toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          if (e.target.id === 'stats') runCounts();
        }
      });
    }, { threshold: 0.18 });
    document.querySelectorAll('.reveal').forEach(function (s) { io.observe(s); });
    var statsEl = document.getElementById('stats');
    if (statsEl) io.observe(statsEl);
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    runCounts();
  }

  // Si se prefiere menos movimiento: fija los valores finales sin animar
  if (reduce) {
    counted = true;
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = parseFloat(el.getAttribute('data-count')).toFixed(el.getAttribute('data-dec') ? 1 : 0);
    });
  }

  /* 2. Nav shrink + parallax sutil del hero ------------------------------ */
  var nav = document.getElementById('mainNav');
  var scrollInd = document.getElementById('scrollInd');
  var heroimg = document.getElementById('heroimg');
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (scrollInd) {
      scrollInd.style.opacity = y > 60 ? '0' : '1';
      scrollInd.style.pointerEvents = y > 60 ? 'none' : 'auto';
    }
    if (!reduce && heroimg && y < innerHeight) {
      heroimg.style.transform = 'translateY(' + (y * 0.25) + 'px)';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 3. Menú móvil -------------------------------------------------------- */
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

  /* 4. Reserva ----------------------------------------------------------- */
  // Minutos de apertura por día de la semana (getDay: 0=Dom … 6=Sáb)
  // Dom 7:00–15:00 · Lun-Vie 6:30–23:00 · Sáb 8:00–14:00
  var TEL = '525541739456';
  var HORAS = { 0: [420, 900], 1: [390, 1380], 2: [390, 1380], 3: [390, 1380], 4: [390, 1380], 5: [390, 1380], 6: [480, 840] };
  var cancha = document.getElementById('cancha'),
      dia = document.getElementById('dia'),
      hora = document.getElementById('hora'),
      nombre = document.getElementById('nombre'),
      btn = document.getElementById('enviar'),
      bubble = document.getElementById('bubble'),
      hintHora = document.getElementById('hint-hora');

  if (cancha && dia && hora && btn && bubble) {
    dia.min = new Date().toISOString().split('T')[0];
    var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    function fmtMin(m) { var h = Math.floor(m / 60), mm = m % 60; return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm; }
    function fmtFecha(v) { var p = v.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]); return DIAS[d.getDay()] + ' ' + (+p[2]) + ' de ' + MESES[+p[1] - 1]; }

    function llenarHoras() {
      hora.innerHTML = '';
      if (!dia.value) { hora.disabled = true; hora.innerHTML = '<option value="">Primero elige un día…</option>'; return; }
      var p = dia.value.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]), r = HORAS[d.getDay()];
      hora.disabled = false;
      hora.innerHTML = '<option value="">Selecciona una hora…</option>';
      // Reservas por hora; la última inicia 60 min antes del cierre
      for (var m = r[0]; m <= r[1] - 60; m += 60) {
        var o = document.createElement('option');
        o.value = fmtMin(m); o.textContent = fmtMin(m);
        hora.appendChild(o);
      }
      if (hintHora) hintHora.textContent = 'Abierto ese día: ' + fmtMin(r[0]) + ' – ' + fmtMin(r[1]) + '. Reservas por hora.';
    }

    function upd() {
      var ok = cancha.value && dia.value && hora.value;
      if (ok) {
        var msg = 'Hola Don Roger 👋\nQuiero apartar una cancha:\n\n🏟 Cancha: ' + cancha.value +
          '\n📅 Día: ' + fmtFecha(dia.value) +
          '\n🕐 Hora: ' + hora.value +
          (nombre && nombre.value ? ('\n👤 A nombre de: ' + nombre.value) : '') +
          '\n\n¿Me confirmas si está disponible? ¡Gracias!';
        bubble.textContent = msg;
        bubble.classList.remove('empty');
        btn.href = 'https://wa.me/' + TEL + '?text=' + encodeURIComponent(msg);
        btn.setAttribute('aria-disabled', 'false');
      } else {
        bubble.textContent = 'Llena los campos y aquí verás el mensaje que se enviará a Don Roger…';
        bubble.classList.add('empty');
        btn.setAttribute('aria-disabled', 'true');
        btn.removeAttribute('href');
      }
    }

    dia.addEventListener('change', function () { llenarHoras(); upd(); });
    cancha.addEventListener('change', upd);
    hora.addEventListener('change', upd);
    if (nombre) nombre.addEventListener('input', upd);
    // Evita navegar a "#" cuando aún no está listo
    btn.addEventListener('click', function (e) { if (btn.getAttribute('aria-disabled') === 'true') e.preventDefault(); });
  }

  /* 5. Popovers (overlay único) ------------------------------------------ */
  var ov = document.getElementById('popov');
  if (ov) {
    var pbody = ov.querySelector('.pop-body'), px = ov.querySelector('.pop-x'), lastF = null;
    var POPS = {
      reglas: '<h3>Squash en 1 minuto</h3><p>Si vas empezando, con esto te alcanza:</p><ul class="pop-list">' +
        '<li>Pégale a la pelota contra la <b>pared frontal</b>, por arriba de la línea baja (el <i>tin</i>).</li>' +
        '<li>Por turnos: la pelota puede botar <b>una vez</b> antes de tu golpe.</li>' +
        '<li>Puede tocar paredes laterales o la trasera, mientras termine en la frontal.</li>' +
        '<li>Se juega a <b>11 puntos</b> (gana por 2), al mejor de 3 o 5.</li>' +
        '<li>Cuida tu swing y deja que tu rival vea la pelota.</li></ul>',
      tarifas: '<h3>Tarifas</h3><p>Renta de cancha.</p><ul class="pop-specs">' +
        '<li><span>Cancha · 1 hora</span><b>$350 MXN</b></li>' +
        '<li><span>Clase con instructor</span><b><span class="pop-pc">por confirmar</span></b></li>' +
        '<li><span>Renta de raqueta</span><b><span class="pop-pc">por confirmar</span></b></li></ul>'
    };
    var openPop = function (k) {
      if (!POPS[k]) return;
      pbody.innerHTML = POPS[k];
      ov.classList.add('show');
      ov.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      lastF = document.activeElement;
      px.focus();
    };
    var closePop = function () {
      ov.classList.remove('show');
      ov.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (lastF) lastF.focus();
    };
    document.querySelectorAll('[data-pop]').forEach(function (b) {
      b.addEventListener('click', function () { openPop(b.getAttribute('data-pop')); });
    });
    px.addEventListener('click', closePop);
    ov.addEventListener('click', function (e) { if (e.target === ov) closePop(); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('show')) closePop(); });
  }
})();
