@echo off
echo Committing Terms of Service changes...
git add .
git commit -m "Add Terms of Service component with DEXY branding - Updated content and email"
git push origin main
echo.
echo Terms of Service component added successfully!
echo - Created new TermsOfService.jsx component
echo - Updated all "Chadswap" references to "DEXY"
echo - Changed email to support@dexy.com
echo - Updated date to July 30, 2025
echo - Added Terms of Service link to footer
echo.
echo Check the website in a few minutes to see the changes.
pause