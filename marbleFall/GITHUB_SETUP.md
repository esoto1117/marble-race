# Setting Up GitHub Repository

## Step 1: Install Git (if not installed)

1. Download Git from: https://git-scm.com/download/win
2. Install it with default settings
3. Restart your terminal/PowerShell after installation

## Step 2: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `marbleFall` (or any name you prefer)
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 3: Initialize Git in Your Project

Open PowerShell or Terminal in your project folder and run:

```powershell
cd C:\Users\edwin\OneDrive\Desktop\marbleFall
git init
git add .
git commit -m "Initial commit - Marble Fall game"
```

## Step 4: Connect to GitHub and Push

```powershell
# Replace YOUR_USERNAME with your GitHub username
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/marbleFall.git
git push -u origin main
```

When prompted, enter your GitHub username and password (or use a Personal Access Token).

## Step 5: Enable GitHub Pages (Optional - to play online)

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select "main" branch
4. Click "Save"
5. Your game will be live at: `https://YOUR_USERNAME.github.io/marbleFall/`

## Alternative: Using GitHub Desktop (Easier GUI)

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Click "File" → "Add Local Repository"
4. Select your `marbleFall` folder
5. Click "Publish repository" to create it on GitHub
6. All files will be uploaded automatically

## Troubleshooting

- If Git commands don't work, make sure Git is installed and the terminal is restarted
- If authentication fails, you may need to use a Personal Access Token instead of password
- To generate a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

