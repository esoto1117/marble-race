# Complete GitHub Setup Script
# This will prepare everything and guide you through creating the repo

$env:Path += ";$env:ProgramFiles\Git\cmd"

Write-Host "=== Marble Fall - GitHub Setup ===" -ForegroundColor Green
Write-Host ""

# Check if GitHub CLI is available
$ghAvailable = Get-Command gh -ErrorAction SilentlyContinue

if ($ghAvailable) {
    Write-Host "GitHub CLI found! Creating repository..." -ForegroundColor Green
    gh repo create marbleFall --public --source=. --remote=origin --push
    Write-Host ""
    Write-Host "✓ Repository created and code pushed!" -ForegroundColor Green
} else {
    Write-Host "Manual setup required:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "STEP 1: Create Repository on GitHub" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
    Write-Host "2. Repository name: marbleFall" -ForegroundColor White
    Write-Host "3. Choose Public or Private" -ForegroundColor White
    Write-Host "4. DO NOT check 'Initialize with README'" -ForegroundColor White
    Write-Host "5. Click 'Create repository'" -ForegroundColor White
    Write-Host ""
    Write-Host "STEP 2: After creating, press any key to push your code..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    git push -u origin main
    Write-Host ""
    Write-Host "✓ Done! Your code is now on GitHub!" -ForegroundColor Green
    Write-Host "View it at: https://github.com/esoto1117/marbleFall" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Next: Deploy to Vercel at https://vercel.com" -ForegroundColor Yellow

