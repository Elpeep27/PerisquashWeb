# CLAUDE.md — PeriSquash Web Platform

## Contexto del Proyecto

PeriSquash es un club de squash ubicado en Vicente Guerrero 7, Coapa, San Bartolo el Chico, Tlalpan 14380, CDMX. Tiene más de 16 años de operación, 3 canchas inglesas profesionales, calificación 4.6 en Google (67+ reseñas), y es conocido por sus canchas con piso de duela y pared trasera de vidrio, el servicio personalizado de Don Roger, y su comunidad activa de jugadores.

**Cliente:** PeriSquash (primer cliente de BridgeNode)
**Desarrollador:** BridgeNode (empresa matriz) / Zenit Security Architects (división de ciberseguridad que asegura los desarrollos)
**Objetivo:** Crear la página web del club que además sirva como vitrina orgánica de los productos de BridgeNode (app Marcador, futuro admin de clientes). La página debe sentirse 100% de PeriSquash — BridgeNode aparece solo en el footer como "Desarrollado por BridgeNode".

## Stack Tecnológico

```
Frontend:        HTML5 + CSS3 + Vanilla JS (sin frameworks — es un sitio estático de alto rendimiento)
Fonts:           Google Fonts — Syne (títulos, 700-800) + DM Sans (body, 300-600)
Hosting target:  VPS Debian con Nginx (infraestructura existente de BridgeNode)
SSL:             Cloudflare (proxy + cert)
Assets:          Imágenes locales optimizadas (WebP preferido), video MP4
Mapa:            Google Maps Embed API (no requiere API key para embed básico)
CTA principal:   WhatsApp Business API link (wa.me)
```

## Tono y Posicionamiento — CRÍTICO

PeriSquash NO es un complejo deportivo moderno de última generación. Es un club con historia, instalaciones funcionales (no lujosas), canchas de calidad real (duela + vidrio), y lo que lo hace especial es la experiencia humana. **NUNCA** usar lenguaje como:
- "Instalaciones de última generación"
- "Centro deportivo premium"
- "Tecnología de punta"
- "Club boutique"

**SÍ** usar lenguaje que refleje lo que los usuarios realmente valoran:
- La calidad de las canchas (duela, vidrio)
- El trato de Don Roger
- La comunidad de jugadores
- La accesibilidad (horarios amplios, zona sur de CDMX)
- Los torneos y la competencia local

## Identidad Visual

### Colores (basados en el logo real de PeriSquash)
```css
--blue: #2E5FBF;        /* Azul oscuro — "Peri" en el logo, color primario */
--blue-light: #4DA8E8;  /* Azul claro — "Squash" en el logo */
--blue-dark: #1B3A7A;   /* Azul profundo — gradientes, hover states */
--cyan: #3CC8E8;        /* Cyan — acentos, tags, highlights */
--dark: #06080C;        /* Background principal */
--dark2: #0C0F15;       /* Cards, secciones alternas */
--dark3: #12161F;       /* Elevated surfaces */
--light: #E8ECF2;       /* Texto principal */
--light2: #A0AAB8;      /* Texto secundario */
--light3: #636D7E;      /* Texto muted, labels */
--gold: #FFD93D;        /* Estrellas de reseñas */
```

### Tipografía
- **Títulos:** Syne, weight 700-800, tracking tight (-1px a -2px)
- **Body:** DM Sans, weight 300-500, line-height 1.6-1.8
- **Labels/tags:** DM Sans, weight 500-600, uppercase, letter-spacing 3-5px
- **Scores (app mockup):** Syne, weight 800, tamaño grande

### Logo
- Archivo: `assets/images/logo-perisquash.png` (logo sobre fondo negro)
- SVG de raqueta se usa como elemento decorativo animado, NO como logo
- En el nav, usar la imagen PNG del logo real

## Estructura del Proyecto

```
perisquash-web/
├── CLAUDE.md                    # Este archivo
├── index.html                   # Página principal (single page)
├── assets/
│   ├── images/
│   │   ├── logo-perisquash.png  # Logo oficial del club
│   │   ├── cancha-clase.jpg     # Foto: clase con instructor (niña + adulto, pared de vidrio visible)
│   │   ├── cancha-juego.jpg     # Foto: partido en cancha con duela (dos jugadores)
│   │   ├── fachada.jpg          # Foto: fachada amarilla del club con logo
│   │   └── og-image.jpg         # Open Graph image para redes sociales (generar)
│   ├── video/
│   │   └── perisquash-action.mp4 # Video del club en acción
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-32x32.png
│       └── apple-touch-icon.png
├── css/
│   └── styles.css               # Estilos extraídos del HTML monolítico
├── js/
│   └── main.js                  # Scripts extraídos (scroll reveal, racket, counters)
├── robots.txt
├── sitemap.xml
└── .htaccess                    # Redirects y cache headers (si Apache) o nginx.conf snippet
```

## Secciones de la Página (en orden)

> **ESTADO ACTUAL DE PRODUCCIÓN (`index.html`, junio 2026).** El orden vigente de secciones es:
> `Inicio (hero) → Stats → Nosotros → Canchas → Servicios → Torneos → Tienda → Don Roger → Horarios → Reservar → Galería → Reseñas → Ubicación → Contacto (footer)`.
>
> Secciones de contenido añadidas en la pasada de retroalimentación de Don Roger:
> - **`#nosotros`** — intro del club (16 años, 3 canchas inglesas, atención de Don Roger, comunidad).
> - **`#servicios`** — 4 tarjetas con íconos SVG: renta por hora ($300 prepagada / $330 casual), retadoras diarias, clases particulares, iniciación y desarrollo técnico.
> - **`#torneos`** — banner: 2 torneos al año, todas las categorías; agosto = mes de aniversario.
> - **`#tienda`** — pro shop: raquetas, grips, pelotas, calcetas, bandas y servicio de encordado.
> - **`#galeria`** — grid responsivo con el material real de `assets/images/` (webp + fallback, `loading="lazy"`) + video `assets/video/perisquash-action.mp4` (`preload="none"`, controles). Botón "Síguenos en Instagram" (solo enlace, sin widget). TODO: foto de las 3 canchas cuando Don Roger la comparta.
> - **`#contacto`** (footer) — redes sociales solo como enlaces SVG (IG/TikTok/FB), separación WhatsApp/Tel.
>
> Las descripciones numeradas abajo son del diseño original y pueden no coincidir con producción.

### 1. Nav (fixed)
- Logo PNG real del club (izquierda)
- Links: El Club, Galería, Horarios, Marcador, FAQ
- CTA: "Contactar" → ancla a sección de contacto
- Se comprime al scrollear (reduce padding, solidifica background)
- Menú hamburguesa en móvil

### 2. Hero (100vh)
- **Fondo:** Foto real de cancha (cancha-juego.jpg) con overlay oscuro al 85%
- **Orbs animados:** Gradientes blur azul/indigo en background
- **Grid líneas de cancha:** Patrón sutil de cuadrícula
- **Título:** "PERI" + "SQUASH" (gradient text) + subtítulo "Tu cancha de squash en Coapa desde 2011"
- **Párrafo:** Descripción honesta del club
- **Badges:** ⭐ 4.6 en Google | 🏆 Torneos | 🏸 Duela + Vidrio
- **Dirección:** Link a Google Maps
- **CTAs:** "Reservar por WhatsApp" (primary) + "Ver Instalaciones" (ghost → ancla a galería)
- **Phone mockup (desktop):** Simulación de la app Marcador con scores
- **Float cards:** Rating 4.6 + "16+ años en Coapa"
- **Scroll indicator:** Flecha animada "Descubre más" que desaparece al scrollear
- **Animación:** Entrada staggered de cada elemento (word reveal, fadeUp con delays)

### 3. Stats Bar
- 3 columnas: "16+ Años" | "4.6★ Estrellas" | "68+ Reseñas" (producción usa 3, no 4)
- Counters animados (easeOutCubic) que se activan al entrar en viewport

### 4. El Club (diferenciadores)
- Grid 3 columnas, 6 cards con hover effects
- Cards: Canchas Duela+Vidrio | Clases Todos Niveles | Torneos+Comunidad | Don Roger | Pro Shop | App Marcador
- Cada card tiene icono emoji, título Syne, párrafo DM Sans
- Hover: translateY(-5px), borde azul, barra gradient top

### 5. Galería (carrusel infinito)
- Carrusel horizontal con CSS animation (30s linear infinite)
- Fade edges (mask-image gradient)
- Pausa al hover
- Items: 3 fotos reales + 1 video (autoplay muted loop)
- Cada item tiene badge de categoría (Clases, Nuestro Club, En Cancha, Video)
- Items duplicados para loop seamless

### 6. Horarios y Ubicación
- Card con background dark2, border-radius 20px
- Grid 2 columnas: Horarios (L-V, Sáb, Dom) | Contacto (dirección, teléfono, Google Maps link)
- Mapa de Google embebido con filtro oscuro
- Hover en días: indent sutil

### 7. App Marcador (showcase) — DESHABILITADO POR AHORA
- Grid 2 columnas: Features (izq) | Phone landscape mockup (der)
- Se presenta como "La app oficial de PeriSquash" — NO como producto de BridgeNode
- 4 features: Toca y Suma | Varios Jugadores | Tus Reglas | Tabla de Posiciones
- Mockup landscape: pantalla dividida azul/rojo con scores grandes
- Nota: "Próximamente en Google Play Store"

### 8. Reseñas
- Grid 3 columnas con reseñas reales de Google
- Comilla decorativa grande en background de cada card
- Estrellas doradas
- Autor: "— Reseña en Google"

### 9. FAQ (accordion)
- 5 preguntas: Raqueta | Reservar | Principiantes | Torneos | Horario
- Toggle con JavaScript (classList.toggle)
- Flecha que rota 180° al abrir
- Max-height transition para animación suave

### 10. CTA Final
- Título: "¿Nos Vemos En La Cancha?"
- Párrafo + botón WhatsApp
- Orb glow de fondo

### 11. Footer
- Logo text "PeriSquash" con colores del brand
- Links de navegación
- Dirección + teléfono
- "Desarrollado por BridgeNode" (link al sitio de BridgeNode cuando exista)

## Elementos Interactivos

### Raqueta animada (solo desktop > 1024px) — DESHABILITADO POR AHORA
- SVG fixed position, pointer-events none
- Aparece después del hero (scrollY > 80% del hero height)
- Se mueve con funciones seno/coseno basadas en scroll progress
- Opacity 0.5, filter drop-shadow azul
- Stroke color: --blue (#2E5FBF)
- Incluye pelota circular cyan

### Scroll reveal
- Clase `.reveal` en todos los elementos que deben animar al entrar
- IntersectionObserver (threshold: 0.1, rootMargin: -30px)
- Transition: opacity 0→1, translateY(30px→0), 0.7s cubic-bezier

### Counter animation
- Data attributes: `data-target`, `data-decimal`, `data-suffix`
- EaseOutCubic: `1 - Math.pow(1 - p, 3)`
- Duration: 1500ms
- Se activa una vez al entrar en viewport

## Datos Reales del Club

```
Nombre:     PeriSquash
Dirección:  Vicente Guerrero 7, Coapa, San Bartolo el Chico, Tlalpan 14380, CDMX
Antigüedad: Más de 16 años de operación
Canchas:    3 canchas inglesas profesionales (piso de madera)
Teléfono:   55 4173 9456  (SOLO "Tel:", nunca como WhatsApp)
WhatsApp:   55 5454 5578  → https://wa.me/525554545578
Google:     4.6 estrellas, 67+ reseñas
Horarios:
  L-V:      6:00 AM — 10:00 PM
  Sáb-Dom:  7:00 AM — 6:00 PM
Tarifas:    Cancha por hora — $300 MXN prepagada · $330 MXN casual
Torneos:    2 al año, todas las categorías; agosto = mes de aniversario
Coords:     19.2836816, -99.1316249
Maps ID:    ChIJiyMb_Q4BzoURCgK5ocWZmtk
Redes:      Instagram https://www.instagram.com/perisquash_club/
            TikTok    https://www.tiktok.com/@perisquash
            Facebook  https://www.facebook.com/profile.php?id=100063724986177
```

> **Importante — dos números, nunca mezclar:** WhatsApp = `5554545578` (único destino de botones `wa.me`/`525554545578`). Teléfono = `5541739456` (solo como "Tel:", nunca como WhatsApp).
>
> **Raquetas:** Don Roger **presta** una raqueta de cortesía a quienes van empezando (no es renta). La **venta** de raquetas y accesorios se detalla en la sección Tienda.

### Reseñas reales (Google, textualmente)
1. "Instalaciones de primer nivel, las canchas están en excelentes condiciones, los baños muy limpios y Don Roger le agrega amenidades que le dan ese toque de comodidad que difícilmente ves en otro lado. Altamente recomendado."
2. "Las canchas tienen piso de duela y excelente servicio al cliente. Si eres principiante, te dan tips para mejorar."
3. "Excelente servicio con Don Roier. Canchas en buen estado. Gran ambiente deportivo."
4. "Gran lugar y excelente servicio de Roger. Las canchas están geniales y los baños de primera."
5. "Excelente lugar para practicar este deporte. Piso de duela, limpieza, servicio, grandes partidos. Todo en un solo lugar."

## Optimizaciones para Producción

### SEO
- Title: "PeriSquash — Club de Squash en Coapa, CDMX"
- Meta description: "Club de squash en Coapa, Tlalpan. Canchas con piso de duela y pared de vidrio. Clases, torneos y comunidad desde hace más de 16 años."
- Open Graph tags (og:title, og:description, og:image, og:url)
- Schema.org markup (SportsActivityLocation)
- Canonical URL
- Lang="es"

### Performance
- Imágenes: convertir a WebP, lazy loading en carrusel
- Video: poster frame, preload="none" excepto en viewport
- CSS: minificar para producción
- JS: defer, minificar
- Fonts: display=swap, preconnect a Google Fonts

### Accesibilidad
- Alt text en todas las imágenes
- Aria-labels en botones interactivos
- Focus states en links y botones
- Contraste mínimo WCAG AA
- Skip-to-content link

## Fases de Ejecución

### Fase 1 — Setup y estructura (este prompt)
1. Crear estructura de carpetas
2. Copiar assets (imágenes, video, logo)
3. Separar HTML monolítico en index.html + styles.css + main.js
4. Agregar meta tags SEO completos
5. Agregar Schema.org markup
6. Generar favicon desde el logo
7. Crear robots.txt y sitemap.xml
8. Optimizar imágenes (WebP + fallback)

### Fase 2 — Polish y producción
1. Minificar CSS/JS
2. Agregar service worker básico para cache
3. Configurar Nginx server block
4. SSL via Cloudflare
5. Pruebas Lighthouse (target: 90+ en todas las categorías)
6. Probar en móvil real (Android Chrome, iOS Safari)

### Fase 3 — Extras (post-entrega)
1. Google Analytics / Plausible analytics
2. Google Search Console
3. Google Business Profile link bidireccional
4. Formulario de contacto real (si el cliente lo pide — por ahora WhatsApp es el CTA)

## Referencia de la App Marcador (contexto para la sección de showcase) — DESHABILITADO POR AHORA

La app es una aplicación Android nativa (Kotlin + Jetpack Compose) que permite:
- Marcador en tiempo real (landscape, zonas táctiles divididas)
- Sistema de torneos con múltiples jugadores (king of the court)
- Reglas configurables (7/9/11/15/21 puntos, ganar por 2)
- Estadísticas por jugador (victorias, derrotas, rachas, porcentajes)
- Tabla de posiciones
- Historial de partidos (últimos 10)
- 8 colores de jugador personalizables
- Animaciones (confetti al ganar, bounce en scores, haptic feedback)
- Persistencia local con DataStore
- Material Design 3 con Dynamic Color

Stack: Kotlin, Jetpack Compose, MVVM, DataStore, Material3
Min SDK: 24 (Android 7.0), Target SDK: 35 (Android 15)

## Notas Importantes

- **NO usar Tailwind CSS.** El sitio usa CSS vanilla para zero-dependency.
- **NO usar frameworks JS.** Vanilla JS con IntersectionObserver y requestAnimationFrame.
- **NO usar imágenes stock.** Solo las fotos reales proporcionadas del club.
- **NO vender lo que no es.** El club tiene sus años, las instalaciones no son nuevas, pero las canchas sí están en buen estado y el servicio es excelente.
- **El video se reproduce en autoplay, muted, loop, playsinline** dentro del carrusel.
- **WhatsApp es el único CTA de contacto.** No hay formulario de contacto porque no hay backend todavía.
- **La app Marcador se presenta como "la app oficial de PeriSquash"**, no como un producto de BridgeNode.
