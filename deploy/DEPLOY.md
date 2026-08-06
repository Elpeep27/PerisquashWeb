# Deploy del rediseño — PeriSquash

`index.html` es **el archivo de producción**: el rediseño aprobado (formato P1 + contenido de
perisquash.com, sin mencionar el nombre del cliente). Es un solo archivo autocontenido — CSS y
JS van embebidos; lo único externo son los assets.

> **Formato de entrega (decisión 2026-07-28):** se muestra **solo la propuesta final**.
> Ya no se publican el selector de propuestas, `propuesta-1/2/3.html` ni `inversion.html`
> (la cotización). Quedan en el repo como histórico, pero **no se suben al servidor**.

## Archivos que se suben

| Archivo / carpeta | Para qué |
|---|---|
| `index.html` | La página completa (CSS y JS embebidos) |
| `assets/images/` | Fotos `.jpg` + `.webp`, logo y `og-image.jpg` |
| `assets/fonts/` | `archivo-latin-var.woff2` y `archivo-black-latin.woff2` (autoalojadas) |
| `assets/favicon/` | `favicon.ico`, 16/32, `apple-touch-icon`, iconos 192/512 |
| `site.webmanifest` | Nombre e iconos al "Agregar a pantalla de inicio" |
| `robots.txt`, `sitemap.xml` | Indexación |

## Fase 1 — Revisión (subdominio de BridgeNode)

Subir la lista de arriba tal cual. El sitio se ve exactamente como quedará en producción: sin
badge flotante, sin enlaces a otras propuestas, sin link a la cotización.

Dos cosas del subdominio de revisión:

1. **Vista previa de WhatsApp/redes.** Las etiquetas Open Graph apuntan en absoluto a
   `https://perisquash.com/assets/images/og-image.jpg` (así deben quedar en producción). Para
   que la miniatura ya se vea durante la revisión, sube **solo ese archivo** al docroot actual de
   perisquash.com — es aditivo, no toca nada del sitio vivo.
2. **No indexar la copia.** `robots.txt` con `Disallow: /` o header `X-Robots-Tag: noindex` en el
   subdominio. El `canonical` ya apunta a perisquash.com, así que el riesgo es bajo.

## Fase 2 — Producción (perisquash.com), al recibir la autorización

1. Subir todos los archivos de la tabla al docroot (`/var/www/perisquash`). No requiere edición
   previa: el HTML ya sale listo para producción.
2. GA4: reemplazar `G-XXXXXXXXXX` por el Measurement ID real cuando el cliente lo entregue
   (mientras tenga el placeholder, el script no carga nada — hay guard).
3. Nginx: `deploy/nginx-perisquash.conf` (`server_name perisquash.com`, SSL para el VPS +
   Cloudflare, caché larga para fuentes/imágenes y `no-cache` para el HTML).
4. Verificar: `https://perisquash.com/` carga el rediseño; llamar y WhatsApp usan el único
   número `55 5454 5578`; y **no aparece ninguna mención de nombres propios**.

## Después del deploy — SEO

1. **Google Search Console** (`search.google.com/search-console`): dar de alta la propiedad de
   dominio, verificar con registro TXT en Cloudflare y enviar `https://perisquash.com/sitemap.xml`.
2. **Validación de Schema** (`validator.schema.org`) y **Rich Results Test**
   (`search.google.com/test/rich-results`): confirmar que el JSON-LD es válido.
3. **Vista previa social**: pasar la URL por el depurador de Facebook
   (`developers.facebook.com/tools/debug/`) para forzar el refresco de caché de la miniatura, y
   probar el link en un chat de WhatsApp real.
4. **Google Business Profile**: poner `https://perisquash.com` como sitio web de la ficha; eso
   liga la ficha (4.6★, 68 reseñas) con el dominio.

## SEO ya implementado en el HTML

- Title, meta description, `canonical`, `lang="es-MX"`, `robots` con `max-image-preview:large`.
- Open Graph completo (`og:image` 1200×630 con `width`/`height`/`type`/`alt`) + Twitter Card.
- Datos estructurados: `SportsActivityLocation` + `SportsClub` (dirección, geo, horarios,
  catálogo de servicios y `sameAs`), `WebSite` y `FAQPage` con las 5 preguntas visibles.
- Señales locales: `geo.*`, `ICBM`, `areaServed` (Coapa, Villa Coapa, Tlalpan, Coyoacán,
  Xochimilco), `hasMap` con el place ID de Google.
- Rendimiento: WebP con fallback JPG, `width`/`height` en todas las imágenes (evita CLS),
  `loading="lazy"`, preload del hero, fuentes autoalojadas (cero peticiones a terceros salvo el
  iframe del mapa, que es lazy).

## Datos canónicos

- Teléfono y WhatsApp (único número): 55 5454 5578 → `tel:+525554545578` y
  `wa.me/525554545578`
- Antigüedad confirmada por el cliente: **17 años**
  (⚠️ el brief original de INICIO.docx dice "más de 16" — confirmar cuál se publica)
- Tarifas: $300 prepagada · $330 casual (por hora)
- **Retadoras: lunes y miércoles, 7:00 PM** — NO son todos los días. El brief viejo decía
  "retadoras todos los días"; el dato correcto viene del TikTok del club y lo confirmó el
  cliente (2026-07-28). Corregido en tarjeta de servicios, marquesina, acordeón de horarios,
  FAQ visible y FAQ del JSON-LD.
- Horarios: L-V 6:00–22:00 · Sáb y Dom 7:00–18:00
