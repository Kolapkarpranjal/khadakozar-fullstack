# 🚀 Railway Deployment Guide

## Quick Steps to Deploy Backend to Railway

### Option 1: Auto-Deploy from GitHub (Recommended)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Update backend: Fixed gallery/events uploads, image paths, admin panel"
   git push origin main
   ```

2. **Railway will auto-deploy** (if connected to GitHub)

### Option 2: Manual Deploy on Railway

1. Go to: https://railway.app
2. Open your existing project: `khadakozar-fullstack-production`
3. Click on the backend service
4. Click "Redeploy" or "Deploy Latest"

---

## ✅ Environment Variables on Railway

Make sure these are set in Railway Dashboard → Variables:

```
MONGODB_URI=mongodb+srv://khadakozar_admin:Khadak%40123456@cluster0.aj1km5i.mongodb.net/grampanchayat_khadak_ozar?retryWrites=true&w=majority&appName=Cluster0

PORT=5000

NODE_ENV=production

JWT_SECRET=your_strong_secret_key_here

JWT_EXPIRE=7d

ADMIN_EMAIL=admin@khadakozar.com

ADMIN_PASSWORD=your_secure_password

MAX_FILE_SIZE=10485760

UPLOAD_PATH=./uploads
```

---

## 🔧 Railway Configuration

- **Root Directory:** `backend` (if deploying from root)
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Node Version:** Railway auto-detects

---

## ✅ After Deployment

1. **Test Admin Panel:**
   - Go to: `https://your-backend.up.railway.app/admin-panel/`
   - Login with admin credentials

2. **Test API:**
   - Health check: `https://your-backend.up.railway.app/api/health`
   - Gallery: `https://your-backend.up.railway.app/api/gallery`
   - Events: `https://your-backend.up.railway.app/api/events`

3. **Update Frontend:**
   - Update `frontend/.env.production` with Railway backend URL
   - Or set `REACT_APP_API_URL=https://your-backend.up.railway.app`

---

## 🎯 What's Fixed in This Deployment

✅ Gallery uploads save to correct folder  
✅ Events uploads working  
✅ Image paths fixed  
✅ Delete buttons working in admin panel  
✅ Image sizing fixed  
✅ CORS configured for Railway  
✅ All recent fixes included  

---

**Your Railway URL:** `https://khadakozar-fullstack-production.up.railway.app`









