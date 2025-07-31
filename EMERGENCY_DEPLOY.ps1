Write-Host "🚀 EMERGENCY DEPLOYMENT - FIXING BLANK PAGE" -ForegroundColor Red -BackgroundColor Yellow
Write-Host ""
Write-Host "Adding all files..." -ForegroundColor Green
git add .

Write-Host "Committing critical fixes..." -ForegroundColor Green  
git commit -m "EMERGENCY: Fix blank page + Terms of Service + Complete DEXY rebrand"

Write-Host "Pushing to trigger Vercel deployment..." -ForegroundColor Green
git push origin main

Write-Host ""
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green -BackgroundColor Black
Write-Host "Check https://snekfn.vercel.app in 2-3 minutes" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"