@ echo off
setlocal

set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"
REM REMOVE database.sqlite from src\_db if it exists
if exist "%SCRIPT_DIR%src\_db\database.sqlite" (
    del /f /q "%SCRIPT_DIR%src\_db\database.sqlite"
)
endlocal

echo ==== RUNNING.... NPM scripts ==== 
echo.
call npm i || echo "installed failed, continuing"
echo.
echo ===== FINISHED INSTALLING REQUIRED SCRIPTS =====

echo ==== INSTALLING PLAYWRIGHT ====
echo.
call npx -y playwright install || echo "playwright install failed, continuing"
echo.
echo ==== FINISHED INSTALLING PLAYWRIGHT ====
echo.
echo ==== PUSHING DRIZZLE-KIT SCHEMAS TO DATABASE ====
echo.
call npx -y drizzle-kit push || echo "drizzle push failed, continuing ..."
echo.
echo ==== PUSH FINISHED ====
echo.
echo ==== INSTALL COMPLETE, starting run.bat ====
start cmd /k "run.bat"
