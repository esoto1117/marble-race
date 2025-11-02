# Next Steps - Push to GitHub

✅ **Git is set up!** Your code is committed and ready to push.

## Step 1: Create GitHub Repository

1. Go to **https://github.com** and sign in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Name it: **`marbleFall`** (or any name you want)
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, run this command (replace YOUR_USERNAME):

```powershell
.\push-to-github.ps1 -GitHubUsername YOUR_USERNAME
```

Or manually:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/marbleFall.git
git push -u origin main
```

## Step 3: Deploy to Vercel

Once your code is on GitHub:
1. Go to **https://vercel.com**
2. Click **"Add New Project"**
3. **Import from GitHub**
4. Select your `marbleFall` repository
5. **Framework Preset:** Select **"Other"**
6. Click **"Deploy"**
7. ✅ Your game is live!

---

**Your repository is ready!** Just create the GitHub repo and run the push command.


