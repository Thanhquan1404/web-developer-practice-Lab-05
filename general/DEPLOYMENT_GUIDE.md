# 🚀 Deployment Guide - LAB 05 React Project

Complete guide để deploy project này lên các production environments khác nhau.

---

## 📋 Pre-Deployment Checklist

- [ ] Tất cả tests pass (`npm test`)
- [ ] No console errors/warnings
- [ ] Code linting clean (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Performance acceptable (check with Lighthouse)
- [ ] All dependencies updated
- [ ] .env variables configured
- [ ] README updated with deployment info

---

## 1️⃣ Local Production Build

### Build the Project

```bash
npm run build
```

Tạo ra folder `dist/` với optimized production build.

### Preview Production Build Locally

```bash
npm run preview
```

Mở browser tại `http://localhost:4173`

---

## 2️⃣ Deploy to Vercel (Recommended)

Vercel là platform tốt nhất cho Vite projects.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
vercel
```

Làm theo hướng dẫn interactive.

### Step 3: Configure vercel.json (Optional)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

### Environment Variables

Tại Vercel dashboard:
1. Vào Project Settings
2. Environment Variables
3. Add your variables

---

## 3️⃣ Deploy to Netlify

### Option A: Using Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy
```

### Option B: Using Git Integration

1. Push code to GitHub
2. Connect repository tại [netlify.com](https://netlify.com)
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

### netlify.toml Configuration

```toml
[build]
command = "npm run build"
publish = "dist"

[build.environment]
NODE_VERSION = "18"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

---

## 4️⃣ Deploy to GitHub Pages

### Step 1: Update vite.config.js

```javascript
export default defineConfig({
  // ... existing config
  base: '/repo-name/',  // Replace with your repo name
});
```

### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 3: Enable GitHub Pages

1. Go to Repository Settings
2. Scroll to "GitHub Pages"
3. Set source to "gh-pages" branch
4. Save

---

## 5️⃣ Deploy to AWS S3 + CloudFront

### Prerequisites

- AWS account
- AWS CLI installed
- S3 bucket created
- CloudFront distribution configured

### Step 1: Build

```bash
npm run build
```

### Step 2: Deploy to S3

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

### Step 3: Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Automate with Script

Create `deploy.sh`:

```bash
#!/bin/bash

echo "Building project..."
npm run build

echo "Deploying to S3..."
aws s3 sync dist/ s3://your-bucket-name --delete

echo "Invalidating CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deploy complete!"
```

Run with:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 6️⃣ Deploy to Traditional Hosting (cPanel, etc.)

### Step 1: Build

```bash
npm run build
```

### Step 2: Upload dist/ Folder

Using FTP/SFTP:
1. Connect via FTP client (FileZilla, WinSCP)
2. Upload contents of `dist/` folder to public_html/

### Step 3: Configure .htaccess (if needed)

Create `.htaccess` in public_html/:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 7️⃣ Deploy with Docker

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build Docker Image

```bash
docker build -t react-lab-05 .
```

### Run Container

```bash
docker run -p 3000:3000 react-lab-05
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

Run with:
```bash
docker-compose up
```

---

## 📊 Performance Optimization

### Before Deployment

1. **Minify & Bundle Analysis**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

2. **Lighthouse Audit**
   - Use Chrome DevTools Lighthouse
   - Aim for 90+ scores

3. **Gzip Compression**
   - Most hosts enable this automatically
   - Test with: `npm install -g http-server`

4. **Image Optimization**
   - Compress all images
   - Use modern formats (WebP)

### Monitor Performance

After deployment:
- Set up monitoring with Sentry
- Use Google Analytics for tracking
- Monitor Core Web Vitals

---

## 🔐 Security Checklist

- [ ] Remove console.logs in production
- [ ] Set proper CORS headers
- [ ] Configure CSP headers
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Validate all user inputs
- [ ] Keep dependencies updated
- [ ] Regular security audits

### Add Security Headers

For Vercel/Netlify, create `netlify.toml` or `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Routes Not Working

Ensure your hosting has SPA rewrite rules configured.

For Vite with SPA:
```javascript
// vite.config.js - already configured
```

### Blank Page After Deployment

1. Check browser console for errors
2. Verify `base` path in vite.config.js matches deployment path
3. Check that all assets loaded correctly (Network tab)

### 404 on Refresh

Configure hosting to serve `index.html` for all routes.

---

## 📈 Post-Deployment

### Monitor

- Set up error tracking (Sentry)
- Monitor performance (Datadog, New Relic)
- Set up analytics (Google Analytics)

### Update Process

```bash
# Make changes locally
git add .
git commit -m "feat: new feature"
git push origin main

# Deployment happens automatically (if CI/CD configured)
# Or manually:
vercel --prod  # For Vercel
```

---

## 💡 Deployment Comparison

| Platform | Ease | Cost | Best For | Cold Start |
|----------|------|------|----------|-----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | Free | Production React apps | < 100ms |
| **Netlify** | ⭐⭐⭐⭐⭐ | Free | Static sites | < 200ms |
| **GitHub Pages** | ⭐⭐⭐⭐ | Free | Public projects | N/A |
| **AWS** | ⭐⭐ | Pay-per-use | Large scale | < 50ms |
| **Docker** | ⭐⭐⭐ | Variable | Self-hosted | < 1s |

---

## 🎯 Recommended Deployment Path

For this project:

1. **Development**: Local with `npm run dev`
2. **Staging**: Vercel preview deployment
3. **Production**: Vercel with custom domain

This gives you:
- Automatic deployments on push
- Environment variables management
- Analytics and monitoring
- Easy rollback
- Custom domain support

---

## 📞 Support

For deployment issues:
- Check the hosting platform's documentation
- Review error logs in platform's dashboard
- Check browser console for client-side errors

Happy deploying! 🚀
