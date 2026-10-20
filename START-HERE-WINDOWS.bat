@echo off
cd /d "%~dp0"
echo Starting Shantanu's portfolio at http://localhost:8000
start "" http://localhost:8000
py -m http.server 8000
pause
