# Git Setup Instructions

## Step 1: Install Git

**Option A: Git for Windows (Command Line)**
1. Download from: https://git-scm.com/download/win
2. Run the installer
3. Use all default settings (just click Next)
4. **Restart your PowerShell/Terminal after installation**

**Option B: GitHub Desktop (Easier GUI - Recommended)**
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Much easier to use with visual interface!

## Step 2: After Installing Git

Once Git is installed, I'll help you:
- Initialize the repository
- Add all your files
- Create the initial commit
- Connect to GitHub

## Step 3: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon (top right) → "New repository"
3. Name it: `marbleFall`
4. Choose Public or Private
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click "Create repository"

## Step 4: Once Git is Installed, Run These Commands

Open PowerShell in your project folder and run:

```powershell
cd C:\Users\edwin\OneDrive\Desktop\marbleFall

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Marble Fall game"

# Connect to GitHub (replace YOUR_USERNAME)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/marbleFall.git

# Push to GitHub
git push -u origin main
```

## Using GitHub Desktop Instead (Easier!)

If you install GitHub Desktop:
1. Open GitHub Desktop
2. File → Add Local Repository
3. Select: `C:\Users\edwin\OneDrive\Desktop\marbleFall`
4. Click "Publish repository"
5. Done! Files are on GitHub

---

**Which would you prefer?**
- GitHub Desktop (easier, visual)
- Git command line (more control)

Let me know once Git is installed and I'll help you push everything!


