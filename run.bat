@echo off
call npx -y drizzle-kit push
start cmd /k "npx -y drizzle-kit studio"
npm run dev