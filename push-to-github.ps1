# Script to push to GitHub
# Run this AFTER creating a repository on GitHub.com

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    [string]$RepositoryName = "marbleFall"
)

$env:Path += ";$env:ProgramFiles\Git\cmd"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "Repository: https://github.com/$GitHubUsername/$RepositoryName.git" -ForegroundColor Cyan
Write-Host ""

# Remove existing remote if any
git remote remove origin 2>$null

# Add GitHub remote
git remote add origin "https://github.com/$GitHubUsername/$RepositoryName.git"

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✓ Done! Your code is now on GitHub!" -ForegroundColor Green
Write-Host "View it at: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan


