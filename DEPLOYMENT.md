# 🚀 Deployment Guide

## 📱 Frontend (React App) - GitHub Pages ✅

The frontend React app is automatically deployed to GitHub Pages using GitHub Actions.

### Setup:
1. ✅ Workflow already configured: `.github/workflows/deploy-frontend.yml`
2. ✅ Triggers on push to `main` branch
3. ✅ Deploys to: `https://[username].github.io/what-to-eat/`

### Required GitHub Secrets:
- **HUGGINGFACE_API_KEY**: Your Hugging Face API token
- **API_URL**: Your backend URL (optional, for backend integration)

1. Go to repository **Settings** → **Pages**
2. Set source to **GitHub Actions**

---

## 🖥️ Backend (Node.js API) - Hosting Options

Since GitHub Pages only hosts static sites, you need a separate hosting service for the backend:

### Option 1: Railway (Recommended) 🚂
```bash
# Deploy to Railway
cd recipe-backend
railway login
railway up
```

**Pros:**
- Easy deployment
- Built-in database support
- Free tier available
- GitHub integration

**Setup:**
1. Push `recipe-backend` to GitHub
2. Connect to Railway dashboard
3. Set environment variables
4. Deploy!

---

### Option 2: Vercel (Serverless) ⚡
Convert to serverless functions using Vercel's API routes.

**Pros:**
- Excellent free tier
- Automatic deployments
- Edge functions

---

### Option 3: Render 🎨
```bash
# Deploy to Render
# Connect GitHub repo to Render dashboard
# Set build command: npm install
# Set start command: npm start
```

**Pros:**
- Simple setup
- Free tier for web services
- Automatic SSL

---

### Option 4: Heroku 🛠️
```bash
# Deploy to Heroku
cd recipe-backend
heroku create your-app-name
git push heroku main
```

**Pros:**
- Established platform
- Easy to use
- Good documentation

---

## 🔗 Connecting Frontend to Backend

Once your backend is deployed:

1. **Update GitHub Secret:**
   - Go to repository **Settings** → **Secrets**
   - Set `API_URL` to your backend URL
   - Example: `https://your-backend.railway.app/api`

2. **Update Frontend .env:**
   ```env
   VITE_API_URL=https://your-backend.railway.app/api
   ```

3. **Redeploy Frontend:**
   - Push changes to trigger GitHub Actions
   - Frontend will connect to your deployed backend

---

## 📋 Complete Deployment Checklist

### Frontend (GitHub Pages):
- [ ] Enable GitHub Pages in repository settings
- [ ] Add `HUGGINGFACE_API_KEY` to GitHub Secrets
- [ ] Add `API_URL` to GitHub Secrets (if using backend)
- [ ] Push to main branch to trigger deployment

### Backend (Choose one):
- [ ] Deploy to Railway/Vercel/Render/Heroku
- [ ] Set environment variables in hosting service
- [ ] Test API endpoints
- [ ] Update `API_URL` in frontend

---

## 🌐 Final URLs

After deployment:
- **Frontend**: `https://[username].github.io/what-to-eat/`
- **Backend**: `https://your-service.railway.app` (or your chosen host)

---

## 🔧 Environment Variables

### Frontend (.env):
```env
VITE_HUGGINGFACE_API_KEY=your_hf_key
VITE_API_URL=https://your-backend-url/api
```

### Backend (.env):
```env
NODE_ENV=production
PORT=8080
JWT_SECRET=your-jwt-secret
DATABASE_URL=./database.sqlite
CORS_ORIGIN=https://[username].github.io/what-to-eat
```

---

## 🛠️ Local Development Setup

### Frontend:
```bash
cd recipe-app
cp .env.example .env
# Add your local API keys
npm run dev
```

### Backend:
```bash
cd recipe-backend
cp .env.example .env
npm install
npm run dev
```

---

## 🔍 Troubleshooting

### Frontend Issues:
- **Build fails**: Check GitHub Secrets and Actions logs
- **API calls fail**: Verify CORS settings on backend
- **404 errors**: Check `base` path in `vite.config.ts`

### Backend Issues:
- **Database errors**: Check file permissions and path
- **CORS errors**: Update `CORS_ORIGIN` environment variable
- **Deployment fails**: Check hosting service logs

---

## 💡 Recommended Architecture

For production:
1. **Frontend**: GitHub Pages (free, fast, CDN)
2. **Backend**: Railway (easy, database included)
3. **Database**: SQLite (built into Railway)
4. **Domain**: Custom domain for professional look

This setup gives you:
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ SSL certificates
- ✅ Global CDN
- ✅ Easy scaling
