# Script to set Git remote
param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [string]$RepositoryName = "marbleFall"
)

$env:Path += ";$env:ProgramFiles\Git\cmd"

Write-Host "Setting up Git remote..." -ForegroundColor Green
Write-Host "GitHub Username: $GitHubUsername" -ForegroundColor Cyan
Write-Host "Repository: $RepositoryName" -ForegroundColor Cyan
Write-Host ""

# Remove existing remote if any
git remote remove origin 2>$null

# Add new remote
$remoteUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"
git remote add origin $remoteUrl

Write-Host "✓ Remote set to: $remoteUrl" -ForegroundColor Green
Write-Host ""
Write-Host "You can now push with:" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor Cyan

