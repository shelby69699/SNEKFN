Write-Host "Pushing Terms of Service changes to Vercel..." -ForegroundColor Green
git add .
git commit -m "Add Terms of Service component with DEXY branding and updated content"
git push origin main
Write-Host "Successfully pushed to Vercel! Check https://snekfn.vercel.app in 2-3 minutes." -ForegroundColor Green
Read-Host "Press Enter to continue"