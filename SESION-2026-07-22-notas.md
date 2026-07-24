# Sesión 2026-07-22 — Exploración de estilos + nuevas P2/P3

## Contexto

El cliente (usuario) confirmó que **P2 "Cancha central" y P3 "Club moderno" no gustaron**.
Antes de rediseñar, pidió investigar qué estilos visuales/tipográficos existen.

## Qué se hizo

1. **Investigación de estilos web** (Tilda, Fontfabric 2026, Wix trends, Awwwards Sports,
   Behance Padel). Se armó un catálogo de **7 direcciones** mockeadas con datos reales del club:
   editorial deportivo, suizo/retícula, club heritage, neobrutalismo, maximalismo tipográfico,
   bento/app-like y gradientes atmosféricos.
   - Publicado como artifact: https://claude.ai/code/artifact/d8360f75-a90f-4922-85c6-dabba1477311
   - También entregado como 8 HTML autocontenidos (scratchpad `estilo-0..7-*.html`)
     porque el visor móvil truncaba el archivo grande.

2. **Nueva Propuesta 2 — "La revista"** (`propuesta-2.html`, reescrita desde cero).
   Editorial deportivo: Fraunces (serif, itálicas azules) + Hanken Grotesk, papel blanco,
   filetes y doble regla tipo cabecera de revista, secciones numeradas (N° 01–05),
   fotos con pie de foto, tarifas como tabla editorial con la prepagada en tinta,
   reseñas como pull quotes con retícula de hairlines, mapa a blanco y negro.

3. **Nueva Propuesta 3 — "Sin pose"** (`propuesta-3.html`, reescrita desde cero).
   Neobrutalismo: Archivo Black + Archivo, fondo hueso, bordes negros 3px, sombras duras,
   stickers rotados (amarillo #FFD93D de la fachada + azul del logo), hero "Squash sin pose,
   desde 2009", facts como stickers, sección experiencia sobre fondo azul, reseñas post-it,
   CTA final amarillo, footer negro.

4. **Selector `propuestas.html`**: tarjetas de P2/P3 actualizadas (nombres, descripciones,
   sensación, miniatura de P3 ahora usa comunidad-equipo.jpg).

5. Ambas nuevas propuestas conservan: mismo contenido y datos reales (WhatsApp 5554545578 /
   Tel 5541739456, $300/$330, horarios, retadoras L y Mié 7PM, reseñas con nombre, mapa),
   noindex, skip link, focus-visible, prefers-reduced-motion, scroll-margin-top,
   nav hamburguesa, reveals con IntersectionObserver, badge BridgeNode.

## Verificación

Capturas de página completa con **Edge headless** (`--headless=new --window-size=500,10000`
+ `--force-prefers-reduced-motion`, recorte de blanco con PIL): ambas páginas renderizan
completas (tipografías, fotos, tarifas, reseñas, mapa, footer). Capturas enviadas al
cliente en 3 tramos JPEG cada una (el uploader rechaza PNG de 8000+ px de alto).

Ojo técnico: Edge headless en Windows impone ancho mínimo de ventana ~460px; capturas a
390px salen recortadas a la derecha. Capturar a 500px.

Fix real encontrado en la pasada: `.hero figcaption` de P2 necesitaba `flex-wrap:wrap`
(overflow horizontal en móvil angosto).

## Pendiente

1. Retroalimentación del cliente sobre las nuevas P2/P3 (y si alguna sube a competir con P1).
2. Ver en vivo desde el celular: prender Tailscale en el teléfono y abrir
   `http://100.126.111.48:8737/propuestas.html` (la Mac ya alcanzó el servidor por esa ruta).
3. WhatsApp real de BridgeNode en `inversion.html` (placeholder `5215500000000`).
4. Todo sigue **sin commit** en la rama `rediseno-stitch`.
