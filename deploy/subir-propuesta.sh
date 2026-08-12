#!/usr/bin/env bash
# =============================================================================
# Sube la propuesta final al subdominio de revisión de BridgeNode.
#
# Sube SOLO lo que debe verse: index.html + assets + robots/sitemap/manifest.
# Deja fuera el selector viejo, propuesta-1/2/3.html, inversion.html, material/,
# los .md de notas y los borradores (index2, perisquash-v4, etc.).
#
# Uso:  bash deploy/subir-propuesta.sh usuario@host /ruta/del/docroot
# Ej.:  bash deploy/subir-propuesta.sh root@74.208.216.63 /var/www/propuestas-perisquash
# =============================================================================
set -euo pipefail

DESTINO_SSH="${1:?Falta usuario@host. Uso: bash deploy/subir-propuesta.sh usuario@host /ruta/docroot}"
DOCROOT="${2:?Falta la ruta del docroot en el servidor}"

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Repo local : $REPO"
echo "Destino    : $DESTINO_SSH:$DOCROOT"
echo

# --- 1. Verificación previa: que exista lo indispensable ---
for f in index.html site.webmanifest robots.txt sitemap.xml llms.txt \
         assets/images/og-image-v2.png assets/favicon/favicon.ico \
         assets/fonts/archivo-latin-var.woff2; do
  [ -f "$REPO/$f" ] || { echo "FALTA: $f"; exit 1; }
done
echo "Archivos indispensables: OK"

# --- 2. Simulacro (no escribe nada) ---
RSYNC_OPTS=(
  -av --delete
  --include='index.html'
  --include='site.webmanifest'
  --include='robots.txt'
  --include='sitemap.xml'
  --include='llms.txt'
  --include='assets/'
  --include='assets/images/***'
  --include='assets/fonts/***'
  --include='assets/favicon/***'
  --exclude='*'
)

echo
echo "── SIMULACRO (dry-run) ─────────────────────────────────────────"
rsync "${RSYNC_OPTS[@]}" --dry-run "$REPO/" "$DESTINO_SSH:$DOCROOT/"
echo "────────────────────────────────────────────────────────────────"
echo
echo "OJO: --delete borra del servidor lo que no esté en esta lista,"
echo "     incluidos el selector de propuestas, propuesta-1/2/3.html"
echo "     e inversion.html. Eso es lo que se decidió (2026-07-28)."
echo
read -r -p "¿Subir de verdad? (escribe SI): " ok
[ "$ok" = "SI" ] || { echo "Cancelado."; exit 0; }

# --- 3. Subida real ---
rsync "${RSYNC_OPTS[@]}" "$REPO/" "$DESTINO_SSH:$DOCROOT/"

echo
echo "Listo. Abre el subdominio con Ctrl+Shift+R (recarga dura)."
echo
echo "Recuerda, para que la miniatura de WhatsApp se vea durante la revisión:"
echo "  las etiquetas Open Graph apuntan a https://perisquash.com/assets/images/og-image-v2.png"
echo "  Sube ese archivo también al docroot de perisquash.com (es aditivo, no toca el sitio vivo):"
echo "  rsync -av assets/images/og-image-v2.png $DESTINO_SSH:/var/www/perisquash/assets/images/"
