# Prompt para Claude Code — Integrar retroalimentación de Don Roger (INICIO.docx)

> Pégalo en Claude Code dentro de `C:\Users\elpee\Documents\GitHub\PerisquashWeb`.
> Ejecuta por FASES, con commit al final de cada una. No edites en el VPS: todo se sube por GitHub → deploy.

---

## CONTEXTO Y REGLAS (aplican a TODO)

Estás editando el sitio de PeriSquash. Archivo de producción: `index.html` (es el que sirve nginx). NO toques `index2.html`, `perisquash-v4.html` ni `perisquash-rediseno-integrado.html` (son borradores).

Reglas firmes:
- **Vanilla CSS + vanilla JS.** Sin frameworks, sin Tailwind. Respeta el estilo existente.
- **Paleta del logo:** `--blue: #2E5FBF`, `--cyan: #3CC8E8`. Usa las variables ya definidas en `css/styles.css`.
- **Dos números, nunca mezclar:** WhatsApp = `5554545578` (único destino de botones `wa.me`/`525554545578`). Teléfono = `5541739456` (solo como "Tel:", nunca como WhatsApp).
- **Imágenes:** usar solo `assets/images/` (minúsculas). NUNCA la carpeta `Img/` (rsync la excluye y no se despliega).
- **Emojis en JS:** evítalos o usa escapes Unicode. Para íconos de las secciones nuevas usa **SVG inline** (más nítido y sin riesgo de corrupción), no emojis.
- **Tono honesto** basado en reseñas, como el resto del sitio. El único superlativo permitido es el slogan aprobado: **"La mejor opción del sur"**.
- **Cache-busting:** al final, incrementa `?v=N` en `<script src="js/app.js">`.
- Al terminar, **actualiza `CLAUDE.md`** con las secciones y datos nuevos.

Orden final de secciones en la página:
`Inicio → Nosotros → Canchas → Servicios → Torneos → Tienda → Don Roger → Horarios → Reservar → Galería → Reseñas → Ubicación → Contacto(footer)`

Nav (escritorio + drawer móvil): incluye anclas de todas las secciones nuevas. En escritorio prioriza: `Nosotros · Servicios · Torneos · Tienda · Horarios · Reservar · Contacto`. El menú móvil lista todas.

---

## FASE 0 — Datos globales (correcciones)

1. **Años: 13 → 16** en TODO el sitio. Cambia "13 años" → "16 años" y "más de 13 años" → "más de 16 años". Incluye el contador del hero ("Años en Coapa" debe llegar a 16).

2. **Horarios** (el documento es mandatorio). Reemplaza la tabla de `#horarios` por:
   - **Lunes a Viernes: 6:00 AM – 10:00 PM**
   - **Sábado y Domingo: 7:00 AM – 6:00 PM**
   (Ya no hay horarios distintos por día de fin de semana.)

3. **Canchas confirmadas:** son **3 canchas inglesas profesionales**. En `#reserva` quita la nota "* Número y nombres de canchas: por confirmar" (deja Cancha 1 / 2 / 3).

4. **Slogan:** agrega **"La mejor opción del sur"** en el hero `#inicio`, como subtítulo/lema junto al mensaje actual (no reemplaces "No es lujo — es squash bien hecho"; conviven).

5. **Corrige el encuadre de raquetas** en `#donroger`: el bloque "Renta y venta — Raquetas… por confirmar" es incorrecto. Cámbialo a algo como:
   > "¿Vas empezando? Don Roger te presta una raqueta las primeras veces para que pruebes. Y si quieres la tuya, en el club hay tienda."
   (La venta se detalla en la sección Tienda; aquí solo el préstamo de cortesía.)

**Commit:** `fix(contenido): años 16, horarios del doc, canchas confirmadas, slogan y aclaración préstamo de raquetas`

---

## FASE 1 — Secciones nuevas de contenido

Crea estas secciones con el mismo lenguaje visual (tarjetas, íconos SVG, variables de color). Copy sugerido (ajústalo al layout, mantén el tono):

### `#nosotros` — Nosotros
> **Más de 16 años** promoviendo el squash en el sur de la Ciudad de México. Tres canchas inglesas profesionales, instalaciones cuidadas y la atención personalizada de Don Roger. No es un club de lujo — es uno donde te tratan bien y la comunidad regresa.

### `#servicios` — Servicios (4 tarjetas)
- **Renta de cancha por hora.** Aparta tu hora y juega. Tarifa: **$300 MXN/hora prepagada** · **$330 MXN/hora casual**.
- **Retadoras todos los días.** Llega, anótate y mide tu nivel contra otros jugadores.
- **Clases particulares.** Para principiantes y para quienes quieren afinar su técnica.
- **Iniciación deportiva y desarrollo técnico.** Empieza de cero y avanza con bases sólidas.

### `#torneos` — Torneos
> **Agosto es el mes de aniversario.** Cada año organizamos **dos torneos**, en **todas las categorías** — de principiantes a avanzados. Ven a competir o a echar porra.

### `#tienda` — Tienda (lista de productos/servicio)
> En el club encuentras lo que necesitas para jugar:
> - Raquetas de las mejores marcas
> - Grips
> - Pelotas
> - Calcetas
> - Bandas
> - Servicio de **encordado**

Agrega las anclas al nav (escritorio + móvil) y enlaces internos suaves donde tenga sentido (ej. botón "Ver servicios" / "Ir a la tienda").

**Commit:** `feat(secciones): Nosotros, Servicios, Torneos y Tienda con nav actualizado`

---

## FASE 2 — Galería

### `#galeria` — Galería
- Grid responsivo con las fotos que YA existen en `assets/images/`: `cancha-juego`, `cancha-clase`, `comunidad`, `raquetas`, `fachada`, `don-roger` (usa `.webp` cuando exista, con fallback). Usa `loading="lazy"` en todas.
- Incluye el video `assets/video/perisquash-action.mp4` (con `preload="none"`, controles, sin autoplay con sonido).
- **NO inventes una foto de "las 3 canchas"** — aún no la tenemos. Deja un comentario `<!-- TODO: foto de las 3 canchas cuando Don Roger la comparta -->` y que el grid no se rompa con material faltante.
- **Sin feed/embed de Instagram.** Las redes van únicamente como enlaces (Fase 3). Opcional: un botón "Síguenos en Instagram" que abra el perfil (solo link, sin widget ni script de terceros).

**Commit:** `feat(galeria): galería con el material disponible`

---

## FASE 3 — Contacto, redes y cierre

1. **Redes sociales** en `#contacto`/footer — SOLO enlaces con íconos SVG (abren en pestaña nueva, `rel="noopener"`). Nada de feeds ni scripts de terceros.
   - Instagram: `https://www.instagram.com/perisquash_club/`
   - TikTok: `https://www.tiktok.com/@perisquash`
   - Facebook: `https://www.facebook.com/perisquash.raquet`  <!-- CONFIRMAR: hay varias páginas de PeriSquash en FB (perisquash.raquet, id=100063724986177, id=100072470621410). Usar la que esté más activa/reciente. -->
2. **Contacto** mantiene la separación correcta:
   - Botón WhatsApp directo → `https://wa.me/525554545578`
   - Tel: 55 4173 9456 (texto, no WhatsApp)
3. Bump de cache: incrementa `?v=N` en `js/app.js`.
4. Actualiza `CLAUDE.md`: nuevas secciones (Nosotros, Servicios, Torneos, Tienda, Galería), datos (16 años, horarios nuevos, 3 canchas inglesas, redes), y la aclaración de que las raquetas se **prestan**, no se rentan.

**Commit:** `feat(contacto): redes IG/FB/TikTok, separación WhatsApp/Tel, cache bump y CLAUDE.md`

---

## Verificación final (antes de deploy)
- [ ] No queda ningún "13 años" ni "por confirmar" de canchas/accesorios.
- [ ] Horarios = L-V 6:00–22:00, Sáb y Dom 7:00–18:00.
- [ ] Tarifas = $300 prepagada / $330 casual.
- [ ] Ningún `wa.me` apunta a 5541739456.
- [ ] Ninguna imagen referencia la carpeta `Img/`.
- [ ] Lighthouse móvil sigue alto (redes = solo enlaces, sin scripts de terceros).
- [ ] Validar en iPhone/Safari real (el feed y el video).
