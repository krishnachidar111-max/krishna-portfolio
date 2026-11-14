# One-Click Deploy Script for Krishna Chidar's Portfolio
Write-Host "🚀 Pushing Portfolio updates to GitHub..." -ForegroundColor Cyan

# Push main branch
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub (https://github.com/krishnachidar111-max/krishna-portfolio)!" -ForegroundColor Green
    Write-Host "🌐 If connected to Vercel, your live site is now deploying automatically." -ForegroundColor Cyan
} else {
    Write-Host "⚠️ If the repository does not exist yet on GitHub, please create it at:" -ForegroundColor Yellow
    Write-Host "👉 https://github.com/new (Repository name: krishna-portfolio)" -ForegroundColor White
    Write-Host "Then run this script again." -ForegroundColor Yellow
}
