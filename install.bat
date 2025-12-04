@ echo off

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
exit