# Genera revision-data.js a partir del index.html actual.
# Correr desde la raiz del repo:  pwsh -File deploy/gen-revision.ps1
# Hay que volver a correrlo cada vez que cambie index.html para que
# la herramienta de revision muestre el contenido actualizado.

$raiz = Split-Path $PSScriptRoot -Parent
$src  = Join-Path $raiz 'index.html'
$dst  = Join-Path $raiz 'revision-data.js'

if (-not (Test-Path $src)) { throw "No encuentro index.html en $raiz" }

$html = Get-Content -Raw -Encoding utf8 $src
$json = ConvertTo-Json -InputObject ([string]$html) -Compress
$fecha = Get-Date -Format 'yyyy-MM-dd HH:mm'

$out = "// Generado por deploy/gen-revision.ps1 el $fecha - no editar a mano.`r`nwindow.__REV_HTML = $json;`r`nwindow.__REV_FECHA = `"$fecha`";`r`n"
[System.IO.File]::WriteAllText($dst, $out, (New-Object System.Text.UTF8Encoding($false)))

Write-Host "OK: revision-data.js ($([math]::Round((Get-Item $dst).Length/1KB)) KB) generado desde index.html"
