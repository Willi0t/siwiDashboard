@echo off
REM Flytta till den här filens mapp
cd /d %~dp0

echo ================================
echo   SIWI Chat Viewer Starter
echo ================================
echo.

REM 1. Installera dependencies (körs snabbt om allt redan är installerat)
echo Installing dependencies...
npm install
echo.

REM 2. Starta dev-server i separat fönster
echo Starting Vite development server...
start "" cmd /c "npm run dev"
echo.

REM 3. Vänta lite så servern hinner starta
timeout /t 3 >nul

REM 4. Öppna webbläsaren
echo Opening browser at http://localhost:5173 ...
start "" http://localhost:5173

echo.
echo Server is running. Close window to stop it.
echo.
pause
