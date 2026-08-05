@echo off
REM Abre la hoja de revision por bloques en el navegador.
REM Regenera primero revision-data.js para que la hoja muestre el index.html actual.
REM Deja esta ventana negra abierta mientras revisas; al cerrarla se apaga el servidor.
cd /d "%~dp0"

where pwsh >nul 2>&1
if %errorlevel%==0 (
  pwsh -NoProfile -File deploy\gen-revision.ps1
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File deploy\gen-revision.ps1
)
if errorlevel 1 (
  echo.
  echo   ERROR: no se pudo generar revision-data.js
  pause
  exit /b 1
)

start "" http://127.0.0.1:8765/revision.html
echo.
echo   Hoja de revision de PeriSquash corriendo en http://127.0.0.1:8765/revision.html
echo   NO cierres esta ventana mientras revisas.
echo.
python -m http.server 8765 --bind 127.0.0.1
