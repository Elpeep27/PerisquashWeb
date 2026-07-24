# Sesión 2026-07-21 — Nueva portada + rediseño de propuestas 2 y 3

## Qué se hizo

1. **Nueva portada oficial del home.** La imagen editada por el cliente
   (`material/iamgen para el home.jpg`) se copió a `assets/images/portada-home.jpg`
   y ahora es el hero de las propuestas 1, 2 y 3 (y la miniatura del selector).
2. **Propuesta 1 "La directa"** (la aprobada): solo se cambió la imagen del hero
   por la portada nueva. Sin cambios de diseño.
3. **Propuesta 2 — "Cancha central" (rediseñada desde cero).** Oscura y cinematográfica:
   la portada a pantalla completa con degradado, tipografía Unbounded + Manrope,
   la línea roja de saque como divisor firma (con etiquetas tipo señalización de cancha),
   grid de 4 fotos con hover zoom, tarifas como tarjetas premium, mapa con filtro.
4. **Propuesta 3 — "Club moderno" (rediseñada desde cero).** Clara, tipo club de pádel
   premium: nav píldora flotante, headline + "court card" redondeada (28px) con chips
   de vidrio esmerilado (4.6★ / 3 canchas / 17 años), tarjetas redondeadas con foto,
   panel de precios con tarjeta navy destacada, cita de Don Roger, reseñas con avatar,
   CTA final navy redondeado. Tipografía Gabarito + Figtree.
5. **Selector `propuestas.html`** actualizado: nuevos nombres, descripciones y
   miniaturas de P2/P3; miniatura de P1 con la portada nueva.
6. Fotos pro copiadas a assets con nombres limpios: `accion-pro.jpg`,
   `comunidad-equipo.jpg`, `raquetas-vidrio.jpg`.
7. Ambas propuestas nuevas: noindex, badge BridgeNode de regreso, datos reales
   (WhatsApp 5554545578 / Tel 5541739456, tarifas $300/$330, horarios, retadoras
   L y M 7PM, torneos, reseñas con nombre), skip link, focus visible,
   prefers-reduced-motion, responsive, `scroll-margin-top` para anclajes.

## Verificado en navegador (localhost:8737)

Las tres propuestas y el selector se revisaron con capturas: heros, tarjetas,
tarifas, reseñas, mapa y footer se ven correctos en desktop.

## Inversión reestructurada (misma sesión, 2a pasada)

`inversion.html` ahora tiene **3 opciones** con blindaje anti-cancelación:

- **Opción A · Plan Básico de contado — $5,000** (recomendada). 12 meses de hosting +
  mantenimiento menor. Renovación $3,500/año.
- **Opción B · Plan Básico a meses — 12 × $600 = $7,200** (plazo forzoso 12 meses;
  el sitio se pone en línea al primer pago). Facilidad de pago: total mayor al contado
  a propósito. Nota: si se quiere que esta opción sí se venda, bajar a $500 (=$6,000, +20%).
- **Opción C · Plan Mantenimiento — $3,500 + $400/mes, permanencia mínima 12 meses**
  (primer año $8,300). Mantenimiento mayor: actualizaciones ilimitadas, soporte continuo,
  atención prioritaria. Después del año: mes a mes con 30 días de aviso.
  La permanencia evita el truco de "tomo la B barata y cancelo al mes 2".

Letra chica actualizada: define mantenimiento menor (límite razonable de solicitudes)
vs mayor (ilimitado). Aceptación con 3 casillas.

## Pendiente

1. Revisar P2/P3 en móvil real y pedir retroalimentación del cliente.
2. WhatsApp real de BridgeNode en `inversion.html` (placeholder `5215500000000`).
3. Todo sigue **sin commit** en la rama `rediseno-stitch`.

## Cómo probar

```
cd C:\Users\elpee\Documents\GitHub\PerisquashWeb
python -m http.server 8737
# http://localhost:8737/propuestas.html
```
