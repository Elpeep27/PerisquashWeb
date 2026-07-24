# Sesión 2026-07-20 — Paquete de propuestas de diseño + cotización

Contexto: el rediseño actual (`index.html`, rama `rediseno-stitch`) NO le gustó al cliente.
Busca algo más sencillo/simplificado, en la línea de ProSquash Polanco. Se replicó el modelo
de presentación de propuestas de `Musica-Web` (selector + N propuestas + página de inversión).

## Qué se construyó (archivos nuevos en la raíz del repo, sin commit)

1. **`propuestas.html`** — Selector de propuestas (modelo de `Musica-Web/propuestas.html`,
   adaptado a identidad PeriSquash: fondo hueso, Bricolage+Hanken, azul/cyan del logo).
   3 tarjetas + banda "Inversión y alcances" → `inversion.html`.
2. **`propuesta-1.html` — "La directa"** — Blanca, estilo ProSquash: nav blanco full-width,
   eslogan gigante "La mejor opción del sur." sobre foto de cancha, franja de datos navy,
   3 bloques de foto (El Club), acordeón tarifas/horarios/clases/torneos/tienda (horarios
   abierto por default), carrusel infinito de reseñas (tarjetas navy), mapa, footer oscuro
   multi-columna. Fuentes: Archivo Black + Archivo (Google Fonts).
3. **`propuesta-2.html` — "Marcador"** — Bandas planas navy/cyan, tipografía Space Grotesk,
   hero navy tipográfico con chip de marcador (4.6★), tiles de datos estilo marcador,
   tabla plana de tarifas con borde negro, banda azul de torneos, reseñas con borde, footer ink.
4. **`propuesta-3.html` — "La casa del squash"** — Fondo hueso cálido, Bricolage+Hanken
   auto-hospedadas, hero split con foto, tira de 4 fotos tipo álbum, sección Don Roger con
   cita real, servicios como lista de líneas, horarios+nota de tarifas, reseñas como citas,
   cierre navy. La más "humana".
5. **`inversion.html`** — Propuesta comercial (contenido del `propuesta-perisquash-v3.docx`
   de Musica-Web, actualizado a 17 años / 68 reseñas): Opción A $5,000 único (12 meses hosting)
   ★recomendada · Opción B $3,500 + $400/mes · acuerdo App Marcador · dominio a nombre del
   club · 5-7 días hábiles · vigencia 30 días · bloque de aceptación con firmas.
   **TODO:** el botón "Aceptar por WhatsApp" tiene número placeholder `5215500000000` —
   poner el WhatsApp real de BridgeNode.
6. Se copió `assets/images/logo-bn.png` (logo BridgeNode) desde Musica-Web.

Todas las páginas de propuesta llevan `noindex`, badge BridgeNode fijo (en las propuestas
el badge es link de regreso a `propuestas.html`) y datos reales del club (WhatsApp 5554545578,
Tel 5541739456, tarifas $300/$330, horarios, retadoras L y M 7PM, reseñas con nombre).

## Retroalimentación del cliente (fin de sesión, ANTES de revisar en navegador a fondo)

- **Propuesta 1 ("La directa"): LE GUSTA.** Tal vez cambiar las imágenes.
- **Propuestas 2 y 3: se van a REDISEÑAR** (están "bien" pero no convencen como están).
- El selector `propuestas.html` se alcanzó a ver en navegador y se veía bien
  (las 3 tarjetas cargan sus fotos, banda de inversión OK).

## Pendiente para mañana

1. **Propuesta 1:** revisar visualmente completa (solo se vio el selector) y cambiar
   imágenes — preguntar cuáles prefiere; hay material extra en `material/`
   (01_accion_pro.jpg, 02_comunidad_selfie_pro.jpg, 03_comunidad_equipo_pro.jpg,
   04_alma_pro.jpg, "iamgen para el home.jpg") además de `assets/images/`.
2. **Propuestas 2 y 3:** rediseñar — pedir observaciones concretas de qué no convence.
3. Poner el WhatsApp real de BridgeNode en `inversion.html` (placeholder actual).
4. Considerar screenshots reales de cada propuesta para las tarjetas del selector
   (ahora usan fotos del club, no capturas).
5. Sin commit todavía — todo son archivos nuevos sin trackear en rama `rediseno-stitch`.

## Cómo probar

```
cd C:\Users\elpee\Documents\GitHub\PerisquashWeb
python -m http.server 8737
# http://localhost:8737/propuestas.html
```
