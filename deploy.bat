@echo off
git add .
git commit -m "Fix blank page: disable backend API calls in production, add static data fallbacks"
git push origin main
echo.
echo Deployment pushed to Vercel!
echo Check https://snekfn.vercel.app in a few minutes.
pause