@echo off
rem Abre o App de Matematica neste PC com dois cliques (atalho na Area de Trabalho).
rem Garante o Node no PATH, instala as dependencias na primeira vez e entrega o resto a scripts\abrir-app.mjs
rem (build so quando preciso, servidor em http://localhost:4173/ e navegador). Ver docs\HOSPEDAGEM.md.
setlocal
title App de Matematica
cd /d "%~dp0.."

where node >nul 2>nul
if errorlevel 1 if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
where node >nul 2>nul
if errorlevel 1 if exist "%USERPROFILE%\tools\node\node.exe" set "PATH=%USERPROFILE%\tools\node;%PATH%"
where node >nul 2>nul
if errorlevel 1 goto semnode

if exist "node_modules\" goto pronto
echo Instalando as dependencias - so na primeira vez, pode levar alguns minutos...
call npm install
if errorlevel 1 goto falhou

:pronto
node scripts\abrir-app.mjs
if errorlevel 1 goto falhou
exit /b 0

:semnode
echo Node.js nao encontrado. Instale em https://nodejs.org e abra o atalho de novo.
pause
exit /b 1

:falhou
echo.
echo O app nao abriu. Leia a mensagem acima.
pause
exit /b 1
