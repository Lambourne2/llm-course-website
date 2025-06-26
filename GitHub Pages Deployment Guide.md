# GitHub Pages Deployment Guide
## LLMs From Scratch - Interactive Course Website

This guide provides step-by-step instructions for deploying your fully functional LLM course website to GitHub Pages.

## Prerequisites

Before you begin, make sure you have:
- A GitHub account
- Git installed on your computer
- The project files downloaded and extracted

## Step 1: Create a New GitHub Repository

1. **Log in to GitHub** and go to [github.com](https://github.com)

2. **Create a new repository**:
   - Click the "+" icon in the top right corner
   - Select "New repository"
   - Name your repository (e.g., `llm-course-website`)
   - Make sure it's set to **Public** (required for free GitHub Pages)
   - Do NOT initialize with README, .gitignore, or license (we'll add these later)
   - Click "Create repository"

## Step 2: Prepare Your Local Project

1. **Extract the downloaded project** to a folder on your computer

2. **Open terminal/command prompt** and navigate to the project folder:
   ```bash
   cd path/to/your/llm-course-website
   ```

3. **Initialize Git repository**:
   ```bash
   git init
   ```

4. **Add all files to Git**:
   ```bash
   git add .
   ```

5. **Make your first commit**:
   ```bash
   git commit -m "Initial commit: LLM course website"
   ```

## Step 3: Connect to GitHub Repository

1. **Add your GitHub repository as remote origin**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   ```
   Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPOSITORY_NAME` with your repository name.

2. **Push your code to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Step 4: Configure GitHub Pages

1. **Go to your repository on GitHub**

2. **Navigate to Settings**:
   - Click on the "Settings" tab in your repository

3. **Find the Pages section**:
   - Scroll down to "Pages" in the left sidebar
   - Click on "Pages"

4. **Configure the source**:
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Click "Save"

## Step 5: Build and Deploy

Since this is a React application, you need to build it for production and deploy the built files.

### Option A: Manual Deployment (Recommended)

1. **Build the project locally**:
   ```bash
   npm run build
   # or if using pnpm:
   pnpm run build
   ```

2. **Create a gh-pages branch**:
   ```bash
   git checkout -b gh-pages
   ```

3. **Copy built files to root**:
   ```bash
   cp -r dist/* .
   ```

4. **Add and commit the built files**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   ```

5. **Push to gh-pages branch**:
   ```bash
   git push origin gh-pages
   ```

6. **Update GitHub Pages settings**:
   - Go back to Settings > Pages
   - Change source to "gh-pages" branch
   - Select "/ (root)" folder
   - Click "Save"

### Option B: Using GitHub Actions (Advanced)

1. **Create `.github/workflows/deploy.yml`** in your project:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             
         - name: Install dependencies
           run: npm install
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Commit and push the workflow**:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deployment workflow"
   git push origin main
   ```

## Step 6: Access Your Website

1. **Wait for deployment** (usually takes 5-10 minutes)

2. **Find your website URL**:
   - Go to Settings > Pages
   - Your website will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`

3. **Test your website** by visiting the URL

## Step 7: Configure Stripe Payments (Optional)

To enable real payments, you need to update the Stripe configuration:

1. **Get your Stripe keys**:
   - Sign up at [stripe.com](https://stripe.com)
   - Get your publishable key from the dashboard

2. **Update the PaymentSection component**:
   - Open `src/components/PaymentSection.jsx`
   - Replace the demo Stripe key with your real publishable key
   - Update the price IDs with your actual Stripe price IDs

3. **Rebuild and redeploy**:
   ```bash
   npm run build
   git add .
   git commit -m "Update Stripe configuration"
   git push origin main
   ```

## Troubleshooting

### Common Issues and Solutions

**Issue**: Website shows blank page
- **Solution**: Make sure you're using the correct branch (gh-pages) and folder (root) in GitHub Pages settings

**Issue**: CSS/JS files not loading
- **Solution**: Check that the build process completed successfully and all files are in the dist folder

**Issue**: Routing doesn't work (404 errors)
- **Solution**: Add a `404.html` file to your dist folder that redirects to `index.html`

**Issue**: Images not displaying
- **Solution**: Make sure image paths are correct and images are included in the build

### Custom Domain (Optional)

To use a custom domain:

1. **Add a CNAME file** to your repository root with your domain name
2. **Configure DNS** with your domain provider to point to GitHub Pages
3. **Update GitHub Pages settings** to use your custom domain

## Maintenance and Updates

To update your website:

1. **Make changes** to your source code
2. **Build the project**: `npm run build`
3. **Commit and push** changes
4. **Update gh-pages branch** with new build files

## Security Notes

- Never commit sensitive information like private API keys
- Use environment variables for sensitive configuration
- Regularly update dependencies for security patches

## Support

If you encounter issues:
- Check the GitHub Pages documentation
- Review the repository's Issues section
- Ensure all dependencies are properly installed
- Verify that the build process completes without errors

---

**Congratulations!** Your LLM course website is now live on GitHub Pages. Students can access your interactive lessons, make payments, and learn about building Large Language Models from scratch.

Remember to test all functionality after deployment to ensure everything works correctly in the production environment.

