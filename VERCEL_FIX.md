# Fixing Vercel 404 Error

The 404 error usually happens because Vercel doesn't know how to serve your static files.

## Solution 1: Redeploy with Updated Config

1. Make sure all files are committed (if using GitHub) or uploaded
2. Delete your current Vercel deployment
3. Create a new deployment
4. Vercel should now auto-detect it as a static site

## Solution 2: Check Build Settings in Vercel Dashboard

1. Go to your project on Vercel
2. Click "Settings" → "General"
3. Under "Build & Development Settings":
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: (leave empty)
4. Save and redeploy

## Solution 3: Use Netlify Instead (Easier for Static Sites)

Netlify is often easier for static HTML/JS/CSS sites:

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `marbleFall` folder
3. Done - works immediately!

## Solution 4: Manual Vercel Deployment

Try removing vercel.json entirely:
- Delete `vercel.json` 
- Redeploy
- Vercel will auto-detect as static site

## Quick Fix Checklist

- ✅ Make sure `index.html` is in the root folder
- ✅ All files (`style.css`, `main.js`, `src/` folder) are included
- ✅ No build command needed (it's pure HTML/JS)
- ✅ Framework preset should be "Other" or "None"


