# -*- coding: utf-8 -*-
"""Empaqueta index.html en UN solo archivo con todos los assets incrustados,
para abrirlo en el celular sin servidor."""
import base64
import io
import os
import re

ROOT = r"C:\Users\elpee\Documents\GitHub\PerisquashWeb"
SALIDA = os.path.join(ROOT, "PeriSquash-propuesta-celular.html")
MAX_LADO = 1100
CALIDAD = 72

html = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
cache = {}


def img_data_uri(rel):
    """Imagen redimensionada y convertida a WebP, como data: URI."""
    if rel in cache:
        return cache[rel]
    from PIL import Image
    im = Image.open(os.path.join(ROOT, rel))
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > MAX_LADO:
        e = MAX_LADO / max(w, h)
        im = im.resize((int(w * e), int(h * e)), Image.LANCZOS)
    buf = io.BytesIO()
    if im.mode == "RGBA":
        im.save(buf, "WEBP", quality=CALIDAD, method=6)
    else:
        im.convert("RGB").save(buf, "WEBP", quality=CALIDAD, method=6)
    uri = "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()
    cache[rel] = uri
    print("  %-38s %6d KB" % (rel.split("/")[-1], len(uri) // 1024))
    return uri


def archivo_data_uri(rel, mime):
    datos = open(os.path.join(ROOT, rel), "rb").read()
    print("  %-38s %6d KB" % (rel.split("/")[-1], len(datos) * 4 // 3 // 1024))
    return "data:%s;base64,%s" % (mime, base64.b64encode(datos).decode())


print("Fuentes:")
for rel, nombre in [("assets/fonts/archivo-latin-var.woff2", "archivo-latin-var"),
                    ("assets/fonts/archivo-black-latin.woff2", "archivo-black-latin")]:
    html = html.replace('url("%s")' % rel, 'url("%s")' % archivo_data_uri(rel, "font/woff2"))

# Quitar preloads y manifest: apuntan a rutas que ya no existen en el archivo suelto
html = re.sub(r'\s*<link rel="preload"[^>]*>', "", html)
html = re.sub(r'\s*<link rel="manifest"[^>]*>', "", html)
html = re.sub(r'\s*<link rel="apple-touch-icon"[^>]*>', "", html)

print("Favicon:")
fav = img_data_uri("assets/favicon/favicon-32x32.png")
html = re.sub(r'\s*<link rel="icon"[^>]*>', "", html)
html = html.replace("<style>", '<link rel="icon" type="image/webp" href="%s">\n<style>' % fav, 1)

print("Imagenes:")
# <picture><source webp><img jpg> -> un solo <img> con el webp incrustado
def fusiona_picture(m):
    bloque = m.group(0)
    src_img = re.search(r'<img[^>]*\ssrc="([^"]+)"', bloque)
    fuente = re.search(r'<source[^>]*srcset="([^"]+)"', bloque)
    rel = (fuente.group(1) if fuente else src_img.group(1))
    img = re.search(r"<img[^>]*>", bloque).group(0)
    img = img.replace(src_img.group(1), img_data_uri(rel))
    return img

html = re.sub(r"<picture>.*?</picture>", fusiona_picture, html, flags=re.S)

# <img> sueltos que quedaron
def inline_img(m):
    tag, rel = m.group(0), m.group(1)
    return tag.replace(rel, img_data_uri(rel))

html = re.sub(r'<img[^>]*\ssrc="(assets/[^"]+)"[^>]*>', inline_img, html)

# Fondo del hero en CSS (y el bloque @supports con image-set)
for rel in ["assets/images/portada-home.jpg", "assets/images/portada-home.webp"]:
    if 'url("%s")' % rel in html:
        html = html.replace('url("%s")' % rel, 'url("%s")' % img_data_uri("assets/images/portada-home.webp"))

print("Video:")
# El MP4 en data: URI pesa 3.4 MB y no reproduce bien en Safari de iOS.
# En esta copia va el fotograma + nota; el video real esta en el sitio publicado.
poster_uri = img_data_uri("assets/images/accion-pro.jpg")
html = re.sub(
    r'<div class="galeria__video">.*?</div>',
    '<figure class="galeria__video-nota">\n'
    '          <img src="%s" alt="Fotograma del video de PeriSquash en accion" '
    'width="960" height="1280" loading="lazy" decoding="async">\n'
    '          <figcaption>Video del club — se reproduce en el sitio publicado</figcaption>\n'
    '        </figure>' % poster_uri,
    html, flags=re.S)
html = html.replace(
    ".galeria__video{grid-column:1/-1;",
    ".galeria__video-nota{grid-column:1/-1;margin:0;position:relative;display:flex;"
    "justify-content:center;max-height:420px;overflow:hidden;border-radius:10px;"
    "background:var(--ink)}\n  .galeria__video{grid-column:1/-1;")
html = html.replace(
    "  .galeria__nota{",
    "  .galeria__video-nota img{width:auto;max-width:100%;object-fit:cover}\n"
    "  .galeria__video-nota figcaption{position:absolute;left:0;right:0;bottom:0;padding:26px 14px 11px;"
    "color:#fff;font-size:.86rem;font-weight:600;text-align:center;"
    "background:linear-gradient(180deg,rgba(16,20,27,0),rgba(16,20,27,.82))}\n"
    "  .galeria__nota{")

# Aviso de que es una copia para revisión
html = html.replace("<title>", "<!-- Copia autocontenida para revisar en el celular. "
                               "Generada desde index.html; no subir a produccion. -->\n<title>")

io.open(SALIDA, "w", encoding="utf-8", newline="\n").write(html)
restantes = re.findall(r'"(assets/[^"]+)"', html)
print("\nReferencias a assets sin incrustar:", sorted(set(restantes)) or "ninguna")
print("Archivo: %s  (%.1f MB)" % (SALIDA, os.path.getsize(SALIDA) / 1024 / 1024))
