# Deploy to Vercel

## Option 1: GitHub Integration (Easiest - Recommended)

1. **Push your code to GitHub first** (see GITHUB_SETUP.md)
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect settings - just click "Deploy"
6. Done! Your game will be live in seconds

## Option 2: Vercel CLI (If you have Node.js)

1. **Install Node.js** (if not installed):
   - Download from: https://nodejs.org/
   - Install it and restart terminal

2. **Install Vercel CLI**:
   ```powershell
   npm install -g vercel
   ```

3. **Deploy from your project folder**:
   ```powershell
   cd C:\Users\edwin\OneDrive\Desktop\marbleFall
   vercel
   ```

4. Follow the prompts:
   - Login to Vercel
   - Link/create project
   - Accept defaults
   - Your game deploys!

## Option 3: Vercel Web Dashboard (Drag & Drop)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Choose "Deploy without Git" option
4. Upload your project folder
5. Wait for deployment to complete

## After Deployment

Your game will have a URL like:
- `marble-fall-abc123.vercel.app` (automatic)
- Or you can set a custom domain

## Benefits of Vercel

- ✅ Free hosting
- ✅ Fast CDN globally
- ✅ Automatic HTTPS
- ✅ Works on mobile and desktop
- ✅ Easy updates (just push to GitHub)

## Files Already Configured

- ✅ `vercel.json` - Deployment configuration already created
- ✅ Your project is ready to deploy!



