@echo off
echo ========================================
echo PUSHING ALL CRITICAL FIXES TO VERCEL
echo ========================================
echo.
echo 1. Blank page fix (API fallbacks)
echo 2. Terms of Service component  
echo 3. DEXY branding updates
echo 4. Static data fallbacks
echo.
git add .
git status
echo.
echo Committing all changes...
git commit -m "CRITICAL: Fix blank page + Terms of Service + All DEXY updates"
echo.
echo Pushing to Vercel...
git push origin main
echo.
echo ========================================
echo SUCCESS! Changes pushed to Vercel
echo Check https://snekfn.vercel.app in 2-3 minutes
echo ========================================
echo.
pause