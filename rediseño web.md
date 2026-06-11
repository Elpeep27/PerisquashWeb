# CLAUDE.md — PeriSquash (landing page)

Spec de desarrollo para CLI. Construir una **landing page larga, una sola página**, para PeriSquash, club de squash en Coapa, Tlalpan, CDMX.

---

## 0. Contexto y reglas de marca

- **Cliente:** PeriSquash — club de squash con +13 años, operado por "Don Roger". Sus fuerzas reales: **calidad de las canchas (piso de madera), limpieza, el servicio de Don Roger y el ambiente**. NO es un lugar de lujo.
- **Quién construye:** BridgeNode. **La página debe sentirse 100% de PeriSquash.** BridgeNode aparece **solo en el footer**: `Desarrollado por BridgeNode`. Nada más.
- **Tono del copy:** honesto, de barrio, aterrizado. Frase guía: *"No es lujo — es squash bien hecho."* Evitar lenguaje aspiracional/premium.
- **Idioma del sitio:** español mexicano (todo el contenido visible). Los comentarios de código pueden ir en español.

---

## 1. Stack y estructura

- **Vanilla HTML / CSS / JS.** Sin frameworks, sin Tailwind, sin librerías de CSS.
- Una sola página: `index.html`. CSS y JS pueden ir en archivos separados (`styles.css`, `app.js`) o inline; preferir separados para producción.

```
perisquash-web/
├── index.html
├── styles.css
├── app.js
└── assets/
    ├── logo-perisquash.png
    ├── fachada.jpg
    ├── cancha-juego.jpg
    ├── cancha-clase.jpg
    └── video-perisquash.mp4
```

- **Deploy:** GitHub Pages, cuenta `Elpeep27`, repo `perisquash-web` → `https://elpeep27.github.io/perisquash-web/`.

---

## 2. Paleta (tokens) y reglas de uso

Calibrada al logo y fachada reales. **Identidad fría guiada por el logo; el amarillo es solo guiño puntual.**

```css
:root{
  /* Primarios — logo */
  --blue:      #2E5FBF;   /* acción y estructura: botones, links, texto destacado */
  --blue-deep: #1E3A6B;   /* títulos, énfasis */
  --cyan:      #3CC8E8;   /* acento principal (la gota del logo) */
  --teal:      #19707D;   /* secciones oscuras, hover, texto-acento sobre claro */

  /* Neutros */
  --bone:    #FAF9F5;     /* fondo de página (cálido) */
  --surface: #F1F0EB;     /* tarjetas, secciones */
  --border:  #DDDBD3;
  --gray:    #6B6E70;     /* texto secundario */
  --ink:     #1E2224;     /* texto de cuerpo */
  --charcoal:#26292B;     /* footer, fondos oscuros */
  --white:   #FFFFFF;

  /* Hover derivados */
  --blue-hover: #234C9C;
  --cyan-hover: #2BB4D4;

  /* Acento cálido — guiño, no estructura */
  --yellow:  #F4B400;

  /* Semánticos */
  --success: #2E9E5B;
  --error:   #D64545;
}
```

**Reglas de contraste (obligatorias, validadas WCAG):**

1. Sobre **amarillo** y sobre **cian**: SIEMPRE texto oscuro (`--ink` o `--blue-deep`). Texto blanco sobre ellos es ilegible — nunca.
2. **Azul** = acción primaria (botones de reserva, links). Texto del eyebrow/etiquetas pequeñas sobre fondo claro: usar `--teal`, no `--cyan` (el cian no contrasta sobre claro).
3. **Footer y secciones oscuras**: `--charcoal` o `--teal`/`--blue-deep` con texto blanco; el amarillo brilla bien como acento sobre estos fondos.
4. **El amarillo solo en detalles puntuales** (estrellas del rating, el punto de la pelota, un badge). Regla de oro: si quitas el elemento amarillo, el diseño se ve completo igual.

---

## 3. Tipografía

Google Fonts (no usar Inter/Roboto/Arial):

- **Display / títulos:** `Bricolage Grotesque` (400, 500, 700, 800). Tracking apretado, `line-height` ~1.0–1.04.
- **Cuerpo:** `Hanken Grotesk` (400, 500, 600).

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 4. Concepto central — "la página es la cancha"

La página simula estar **dentro de una cancha de squash**:

- **Hero oscuro = la entrada/fachada de noche.** Foto de cancha tratada en duotono azul (escala de grises + `--blue-deep` en `multiply`), scrim oscuro, glow cian. Energía de club, sin lujo.
- Al hacer scroll **"pisas la cancha"**: el fondo se vuelve `--bone` (paredes blancas de la cancha).
- **Sistema gráfico de cancha** en el cuerpo claro: paredes laterales (líneas verticales cian al 6vw y 94vw), línea central punteada, y líneas de servicio (dashed) como divisores entre secciones. **Dibujadas en cian/azul, NUNCA en rojo** (el rojo real choca con la identidad fría).
- **La pelota** (carbón con dos puntos amarillos = pelota de competencia, doble punto amarillo) es la compañera de scroll. La **raqueta** es el cursor.

---

## 5. Estructura de la landing (en orden)

1. **Nav fijo** — logo (gota cian + "PeriSquash") + links (Canchas, Horarios, Reseñas, Ubicación) + botón "Reservar". Transparente sobre el hero; al hacer scroll (>30px) se encoge y toma fondo `--bone` con blur.
2. **Hero** (oscuro) — eyebrow "Squash en Coapa · 13 años", título grande ("Pisa la **cancha.**"), subtítulo honesto, CTA primario "Reserva tu cancha" (cian) + secundario, rating (4.6 ★ · 68 reseñas), indicador "Entra a la cancha".
3. **Canchas** — copy + grid de fotos (hover-enlarge, ver §7) + botón popover "Reglas en 1 minuto" + (más adelante) **carrusel auto-scroll** de fotos.
4. **Horarios** — tabla de horarios + botón popover "Ver tarifas".
5. **Reseñas** — 3 testimonios reales (parafraseados) + rating.
6. **Ubicación** — **mapa de Google embebido** con filtro oscuro (ver §10) + dirección y teléfono reales + botón "Cómo llegar".
7. **Franja Marcador** (azul) — "App oficial: lleva el marcador con Marcador" + botón popover.
8. **Footer** (`--charcoal`) — logo + "Squash en Coapa" + `Desarrollado por BridgeNode`.

---

## 6. Mecánica pelota + raqueta

### Cursor raqueta
- Elemento que sigue al mouse (no `cursor:` CSS). Cabeza ovalada (contorno `--blue-deep`), cuerdas `--cyan`, mango `--charcoal`.
- **Rota hacia la dirección del movimiento** (ángulo desde la velocidad del cursor), con leve lag para sensación de swing. En reposo vuelve a ~22°.
- `pointer-events:none`. Ocultar cursor nativo con `body.racket-on { cursor:none }`. Solo en `(hover:hover) and (pointer:fine)`.

### Pelota — dos modos
**Modo scroll (default):** la pelota baja contigo en zig-zag pared a pared (su posición = función del progreso de scroll), con arco de rebote. Al cambiar de "tramo" pega y la sección visible reacciona (nudge del `<h2>` + ripple cian).

**Easter egg — "pegarle la suelta":** el **primer raquetazo que conecta** (raqueta cerca de la pelota + cursor en movimiento) la **libera permanentemente** a física libre. Toast: "¡La soltaste! Mantenla en el aire". Para devolverla a la cancha: **doble clic** o `Esc`.

**Modo libre:** gravedad + rebote en los 4 bordes del viewport (pelota `position:fixed`). Se batea con la raqueta (o el dedo en táctil). Gira y se achata (squash) al impacto.

### Knobs (valores actuales)
```js
// scroll-spring
SPRING=0.014; DAMP=0.82; HITR=58;      // resorte de retorno / radio de golpe
MAXX=innerWidth*0.32; MAXY=innerHeight*0.28;
bounces=4;                              // paredes que pega a lo largo del recorrido
// física libre
GRAV=0.42; REST=0.86; AIRX=0.996; AIRY=0.999; FLOORFRIC=0.93;
BALLR=15;                              // radio de la pelota
// Si se quiere flotante (sin caer, estilo DVD): GRAV≈0
```
Render con `requestAnimationFrame` + `transform: translate()` (GPU). El cambio scroll↔libre reusa el resorte para que el retorno sea suave (setear `ox=ballX-baseX`, `oy=ballY-baseY` y dejar que el resorte la lleve a casa).

---

## 7. Imágenes (Canchas) — crecer al pasar el mouse

No abren popover. **Al hover crecen** (`transform:scale(1.13)`, `z-index` arriba, sombra). En táctil (`hover:none`), un **tap** las agranda.

```css
#canchas .card{position:relative;transition:transform .32s cubic-bezier(.2,.8,.3,1),box-shadow .32s;transform-origin:center}
@media(hover:hover){#canchas .card:hover{transform:scale(1.13);z-index:6;box-shadow:0 26px 54px -18px rgba(30,58,107,.42)}}
#canchas .card.zoom{transform:scale(1.13);z-index:6;box-shadow:0 26px 54px -18px rgba(30,58,107,.42)}
```

---

## 8. Popovers (modales)

Sistema reutilizable: cierra con `Esc`, clic en backdrop, o la X; bloquea scroll de fondo; devuelve el foco; `role="dialog"` + `aria-modal`. Al abrir, restaurar cursor nativo (quitar `racket-on`). Tres popovers:

- **Reglas en 1 minuto** (contenido real, listo): pared frontal por arriba del *tin*; por turnos, un bote máximo; 11 puntos, gana por 2; cuidar el swing.
- **Tarifas** — `PLACEHOLDER`. Marcar montos como "por confirmar". CTA a WhatsApp.
- **Marcador** — `PLACEHOLDER`. "App oficial de PeriSquash" (posicionada desde el club, no desde BridgeNode). Botón "Próximamente" hasta confirmar publicación.

> La antigua "info por cancha" se reemplazó por el hover-enlarge (§7).

---

## 9. Animaciones y reveal

- **Secciones aparecen al scroll** vía `IntersectionObserver` (fade + `translateY`, y el subrayado cian que se dibuja). Independiente de la pelota.
- Entrada del hero escalonada al cargar.
- Nav se encoge al hacer scroll.

---

## 10. Mapa de Google

Embed real del lugar (Vicente Guerrero 7, San Bartolo el Chico) con **filtro oscuro** CSS para casar con la marca, p. ej.:
```css
.map iframe{filter:grayscale(.4) contrast(1.05) brightness(.85);}
```

---

## 11. Accesibilidad y guardrails (obligatorios)

- `prefers-reduced-motion: reduce` → apagar pelota, raqueta y movimiento; secciones visibles sin animación.
- **Táctil** (`hover:none` / `pointer:coarse`) → sin raqueta; la pelota acompaña scroll y el dedo puede batearla en modo libre.
- **Nunca scroll-jacking:** la pelota acompaña, no secuestra el scroll.
- Rendimiento: un solo loop `rAF`, `transform`/`opacity`, `will-change` en elementos animados.
- Contraste según §2.

---

## 12. Datos reales

- **Teléfono:** 55 4173 9456
- **WhatsApp:** `https://wa.me/525541739456`
- **Dirección:** Vicente Guerrero 7, San Bartolo el Chico, Tlalpan, 14380, CDMX
- **Rating (referencia):** 4.6 ★ · 68 reseñas (Google; se actualiza)
- **Coordenadas:** tomar del listado de Google Maps del lugar `[CONFIRMAR lat/lng]`

### Placeholders — CONFIRMAR con Don Roger antes de publicar
- [ ] **Horarios** reales (working: Lun–Vie 6:30–23:00, Sáb 8:00–14:00, Dom 7:00–15:00 → verificar).
- [ ] **Tarifas** (renta/hora, hora pico/valle, clase con instructor).
- [ ] **Número de canchas** y si tienen algún detalle que las distinga.
- [ ] **Marcador**: ¿ya en Play Store o "próximamente"? Link de tienda.
- [ ] **Año de fundación** (para "desde 20XX").
- [ ] **Fotos en alta resolución** (las actuales están a ~390 px; el hero necesita originales).

---

## 13. Plan de ejecución por fases

**Fase 1 — Estructura y marca.** `index.html` con todas las secciones (§5), tokens (§2), tipografía (§3), nav, hero oscuro→cuerpo claro, footer con atribución. Contenido real + placeholders marcados.

**Fase 2 — Mecánica e interacción.** Cursor raqueta, pelota (scroll + easter egg libre, §6), reveal por scroll (§9), hover-enlarge de imágenes (§7), popovers (§8). Respetar guardrails (§11).

**Fase 3 — Integraciones y cierre.** Carrusel auto-scroll en Canchas, mapa embebido con filtro (§10), video (`video-perisquash.mp4`) si aplica, y cerrar todos los placeholders con datos reales. QA en móvil y con `reduced-motion`.

---

## 14. Copy — frases clave y qué evitar

- **Usar:** "No es lujo — es squash bien hecho", "piso de madera", "el trato de Don Roger", "13 años en Coapa", "a un paso del Periférico".
- **Evitar:** "premium", "exclusivo", "instalaciones de primer nivel", membresías, lenguaje corporativo.
- Reseñas: parafrasear (no copiar textual), atribuir como "Reseña en Google".
