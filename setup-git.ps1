# Git Setup Script for Marble Fall
# Run this AFTER installing Git and creating a GitHub repository

Write-Host "Setting up Git for Marble Fall..." -ForegroundColor Green
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host "Please download Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or use GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    exit
}

# Check if already initialized
if (Test-Path ".git") {
    Write-Host "Git repository already initialized" -ForegroundColor Yellow
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
}

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Cyan
git add .

# Create commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit - Marble Fall game"

# Set main branch
Write-Host "Setting branch to 'main'..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "✓ Git setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a repository on GitHub.com" -ForegroundColor White
Write-Host "2. Copy the repository URL (e.g., https://github.com/YOUR_USERNAME/marbleFall.git)" -ForegroundColor White
Write-Host "3. Run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/marbleFall.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""


