# Prompt para Claude Code — Pasada de rediseño visual (observaciones de David)

> Repo: `C:\Users\elpee\Documents\GitHub\PerisquashWeb`. Archivo de producción: `index.html`.
> NO toques `index2.html`, `perisquash-v4.html`, `perisquash-rediseno-integrado.html`.

---

## PASO 0 — Usa skills de diseño ANTES de escribir código
Usa tu búsqueda de skills (find skill) para localizar y CARGAR las mejores skills disponibles de **diseño frontend / CSS** (p. ej. una skill de `frontend-design` o de sistemas de CSS). Sigue sus lineamientos al implementar todo lo de abajo. Si encuentras varias relevantes, cárgalas todas.

---

## REGLAS DURAS (no negociables — ya nos costaron antes)
1. **Vanilla CSS + vanilla JS.** Sin frameworks, sin CDNs, sin librerías externas (el lightbox y todo lo interactivo, a mano).
2. **Todo `<svg>` de ícono lleva `width` y `height` en el HTML.** Nunca dependas solo del CSS. (Ya hay un failsafe global de 32px; mantenlo.)
3. **Si editas `css/styles.css`, sube el cache-bust:** `styles.css?v=5` → `?v=6`. Si editas/agregas JS (lightbox), sube también `app.js?v=N`. Sin esto, los cambios no se ven por caché.
4. **Imágenes solo en `assets/images/` (minúsculas).** Nunca en `Img/`. No agregues imágenes nuevas: reusa las que ya existen (`hero-cancha`, `cancha-juego`, `cancha-clase`, `comunidad`, `raquetas`, `fachada`, `don-roger`).
5. Paleta: `--blue #2E5FBF`, `--cyan #3CC8E8`. WhatsApp solo `wa.me/525554545578`; Tel `5541739456` aparte.
6. **Responsive obligatorio:** todo debe verse bien en móvil (~360px) y escritorio. Nada que se desborde.
7. Reusa patrones existentes (`section-eyebrow`, `h2`, `section-desc`, tarjetas) en vez de inventar estilos sueltos.

---

## CAMBIO 1 — Hero: que mande el slogan
En `#inicio`:
- El **H1 pasa a ser "La mejor opción del sur"** (grande, protagonista).
- Quita "Pisa la cancha." (o déjala como línea pequeña arriba del H1, tipo kicker). Recomendado: quitarla para que el slogan no compita.
- Conserva el eyebrow "Squash en Coapa · 16 años" y el subtítulo "No es lujo — es squash bien hecho." + el párrafo y la calificación.
- Mantén los botones "Reservar cancha" y "Ver el club".

## CAMBIO 2 — Nosotros: medallones circulares (reemplaza las 3 tarjetas con iconito)
Reemplaza el bloque actual de 3 `nos-fact` por **tres medallones circulares** grandes que ocupen el ancho de la sección:
- Cada medallón = **foto recortada en círculo** (`border-radius:50%`, `object-fit:cover`, ~180–220px en escritorio) + título + una línea:
  1. **3 canchas inglesas** — foto `cancha-juego` (o `hero-cancha`). "Canchas profesionales con piso de madera."
  2. **Atención de Don Roger** — foto `don-roger`. "Trato cercano e instalaciones limpias, lo que más repiten las reseñas."
  3. **Comunidad que regresa** — foto `comunidad`. "Jugadores de todos los niveles y torneos locales desde hace años."
- En escritorio: los tres en fila, centrados, con buen aire. Opcional: leve desfase vertical (el de en medio un poco más arriba) para dar dinamismo en arco — sin romper el layout.
- En móvil: se apilan verticalmente, centrados.
- Mantén los botones "Ver servicios" y "Reservar una cancha".

## CAMBIO 3 — Servicios: más cuerpo, que destaque
Mismo contenido (renta por hora, retadoras, clases particulares, iniciación/desarrollo), pero con mejor terminado:
- Cada tarjeta: ícono dentro de un **círculo relleno de color de marca** (no solo línea), título, descripción, y **hover con elevación** sutil.
- **Destaca la tarjeta "Renta de cancha por hora"** (es el servicio principal): bórde/acento de marca y el precio en **píldoras** visibles → `$300 MXN/h prepagada` · `$330 MXN/h casual`.
- Que la sección se sienta rica, no una lista plana. Cuida espaciados y jerarquía.

## CAMBIO 4 — Torneos: banda tipográfica (tenemos poca info)
Convierte `#torneos` en una **banda visual** que se vea intencional sin fotos:
- Fondo con gradiente de marca (`--blue`/`--cyan`), tipografía grande.
- Elemento gráfico grande con **"AGOSTO"** (o el número/mes como protagonista) + píldora "Mes de aniversario".
- Dos datos destacados tipo stat: **"2 torneos al año"** y **"Todas las categorías"**.
- Ícono de **trofeo** (SVG con width/height) y un botón **"Pregunta por el próximo torneo"** → `wa.me/525554545578` con texto prellenado.
- Texto base actual de apoyo (de principiantes a avanzados, ven a competir o a echar porra).

## CAMBIO 5 — Galería: lightbox interactivo
Convierte `#galeria` en una galería **con lightbox** (vanilla JS):
- Las miniaturas (las que ya hay + el video) al hacer **clic abren una vista a pantalla completa** (overlay).
- El visor debe tener: **flechas anterior/siguiente**, cerrar con la **X** y con **Esc**, navegación con **teclado** (← →) y **swipe** en táctil. Incluye el **video** en el flujo.
- Muestra el caption (En cancha, Clases, Comunidad, etc.).
- **Quita el enlace suelto "Síguenos en Instagram"** que estaba al final de la galería (queda redundante con los íconos de header/footer del Cambio 6).
- Accesible: `aria-label`s, foco atrapado en el overlay, scroll del body bloqueado mientras está abierto.

## CAMBIO 6 — Redes sociales arriba y abajo
- **Header:** agrega los íconos de **Instagram, TikTok y Facebook** (reusa los SVG que ya están en el footer, con `width`/`height`, `target="_blank" rel="noopener"`, `aria-label`). En escritorio a la derecha del nav; en móvil, dentro del drawer de forma ordenada (sin encimar el logo).
  - Instagram: `https://www.instagram.com/perisquash_club/`
  - TikTok: `https://www.tiktok.com/@perisquash`
  - Facebook: `https://www.facebook.com/profile.php?id=100063724986177`
- **Footer:** deja los tres tal como están.

---

## SELF-CHECK antes de commitear (OBLIGATORIO — abre el sitio y verifica)
- [ ] Ningún ícono ni imagen se desborda; todo responsive en ~360px y escritorio.
- [ ] Hero muestra "La mejor opción del sur" como titular.
- [ ] Los 3 medallones circulares se ven bien (fotos circulares, alineados, apilan en móvil).
- [ ] Servicios destaca (tarjeta de renta featured con precios en píldora).
- [ ] Torneos se ve como banda intencional, con el botón a WhatsApp.
- [ ] Lightbox abre/cierra, flechas, teclado y swipe funcionan; el video entra.
- [ ] Íconos de redes en header y footer; ya NO está el enlace suelto de Instagram.
- [ ] Subiste `styles.css?v=6` (y `app.js?v=N` si tocaste JS).
- [ ] Ningún `wa.me` apunta a 5541739456; ninguna imagen en `Img/`.

---

## COMMIT (local)
```bash
git add -A
git commit -m "redesign: hero con slogan, medallones circulares en Nosotros, Servicios destacado, banda de Torneos, galeria lightbox y redes en header"
git push origin main
```

## DEPLOY (en el VPS, por SSH)
```bash
ssh USUARIO@TU_VPS               # cambia por tu usuario/host
cd ~/PerisquashWeb               # tu ruta del clon
git fetch origin && git reset --hard origin/main
rsync -av --delete \
  --exclude='.git' --exclude='Img' --exclude='deploy' \
  --exclude='material' --exclude='*.md' --exclude='*.lnk' \
  --exclude='index2.html' --exclude='perisquash-v4.html' \
  --exclude='perisquash-rediseno-integrado.html' \
  ~/PerisquashWeb/ /var/www/perisquash/
```
Al abrir: **Ctrl+Shift+R** (hard refresh).
