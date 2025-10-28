# 🌐 Deploy Frontend to Netlify

**⚠️ IMPORTANT:** Complete backend deployment first (see DEPLOY-TO-RENDER.md)

---

## Prerequisites:

✅ Backend deployed to Render.com  
✅ Backend URL noted (e.g., `https://khadakozar-backend.onrender.com`)  
✅ Admin panel accessible at backend URL  

---

## Step 1: Update Frontend API URLs

Before building, you need to update all API calls in your frontend to point to your deployed backend.

### Option A: Quick Update (Recommended)

I'll create an environment file for you:

Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://YOUR-BACKEND-URL.onrender.com
```

**Replace `YOUR-BACKEND-URL` with your actual Render backend URL!**

### Option B: Manual Update (If Option A doesn't work)

You'll need to update API URLs in all form files. The pattern is:

**Change from:**
```javascript
const response = await fetch('http://localhost:5000/api/forms/submit', {
```

**Change to:**
```javascript
const response = await fetch('https://YOUR-BACKEND-URL.onrender.com/api/forms/submit', {
```

Files to update:
- `frontend/src/pages/BandhkamParvangiForm.js`
- `frontend/src/pages/JanmNondDakhlaForm.js`
- `frontend/src/pages/MrutyuNondDakhlaForm.js`
- `frontend/src/pages/VivahNondaniDakhlaForm.js`
- `frontend/src/pages/NamunaNo08Form.js`
- `frontend/src/pages/FerfarNondaniForm.js`
- `frontend/src/pages/NamunaNo04KamForm.js`
- `frontend/src/pages/VyavasayNaharakatDakhlaForm.js`
- `frontend/src/pages/DaridryaReshaDakhlaForm.js`
- `frontend/src/pages/RahivashiDakhlaForm.js`
- `frontend/src/pages/TakrarSuchanaForm.js`

---

## Step 2: Build Frontend

```bash
cd frontend
npm run build
```

This creates a `frontend/build` folder with your production-ready files.

**Wait for build to complete** (takes 1-2 minutes)

---

## Step 3: Deploy to Netlify

### Method 1: Drag & Drop (Easiest!)

1. Go to: https://app.netlify.com
2. Sign up / Login (use GitHub for easy login)
3. Click "Add new site" → "Deploy manually"
4. Drag and drop the `frontend/build` folder
5. Wait 30 seconds for deployment
6. Your site is live! 🎉

**Your Netlify URL:** `https://random-name-12345.netlify.app`

### Method 2: GitHub Integration (Better for updates)

1. Push your code to GitHub (if not already)
2. Go to: https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Select your repository
6. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
7. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com`
8. Click "Deploy site"
9. Wait 2-3 minutes
10. Your site is live! 🎉

---

## Step 4: Custom Domain (Optional)

### If you have a domain:

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain: `khadakozar.com`
4. Follow DNS configuration instructions
5. Add these records to your domain provider:

**A Record:**
```
Name: @
Value: 75.2.60.5
```

**CNAME Record:**
```
Name: www
Value: your-site-name.netlify.app
```

6. Wait 24-48 hours for DNS propagation
7. Enable HTTPS (free SSL) in Netlify

---

## Step 5: Update Backend CORS

After deploying frontend, update your backend to allow requests from Netlify:

**Edit `backend/server.js`:**

Find:
```javascript
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
```

Change to:
```javascript
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://your-site-name.netlify.app',
        'https://your-custom-domain.com'
    ],
    credentials: true
};
```

Then redeploy backend on Render:
1. Go to Render dashboard
2. Click your service
3. Click "Manual Deploy" → "Deploy latest commit"

---

## Step 6: Test Everything

### Test Frontend:
1. Go to your Netlify URL
2. Navigate through pages
3. Check if all images load
4. Test navigation

### Test Forms:
1. Fill out a form (e.g., "बांधकाम परवानगी अर्ज")
2. Upload a test document
3. Submit the form
4. Should see success message: "अर्ज यशस्वीरित्या सबमिट झाला!"

### Test Admin Panel:
1. Go to: `https://YOUR-BACKEND-URL.onrender.com/admin-panel/`
2. Login with admin credentials
3. Check if submitted form appears
4. Test download button
5. Download should work with formatted HTML

---

## 🎯 Final URLs:

**Frontend (Public):**
```
https://your-site-name.netlify.app
```
or
```
https://your-custom-domain.com
```

**Admin Panel:**
```
https://YOUR-BACKEND-URL.onrender.com/admin-panel/
```

---

## 📱 Share With Client:

**Public Website:**
```
https://your-site-name.netlify.app
```

**Admin Panel Login:**
```
URL: https://YOUR-BACKEND-URL.onrender.com/admin-panel/
Email: admin@khadakozar.com
Password: [Your Admin Password]
```

---

## 🎨 Customize Site Name:

1. In Netlify dashboard
2. Go to "Site settings"
3. Click "Change site name"
4. Enter: `khadakozar-grampanchayat`
5. New URL: `https://khadakozar-grampanchayat.netlify.app`

---

## 🆘 Troubleshooting:

### Forms not submitting?
- Check browser console (F12) for errors
- Verify API URL is correct (check `.env.production`)
- Check CORS settings in backend
- Ensure backend is awake (visit admin panel first)

### Images not loading?
- Check image paths in `public/images/`
- Rebuild and redeploy

### "404 Not Found" on refresh?
- Add `_redirects` file in `frontend/public/`:
```
/*    /index.html   200
```
- Rebuild and redeploy

---

## 💰 Cost:

- **Netlify (Frontend)**: FREE forever
- **Render (Backend)**: FREE tier (with cold starts)
- **MongoDB Atlas**: FREE 512MB
- **Custom Domain**: $10-15/year (optional)

**Total: FREE** (or ~$10-15/year with custom domain)

---

## 🚀 Ready to Deploy!

Follow these steps in order:
1. ✅ Deploy backend to Render
2. ✅ Create MongoDB Atlas database
3. ✅ Test admin panel
4. ✅ Update frontend API URLs
5. ✅ Build frontend
6. ✅ Deploy to Netlify
7. ✅ Update backend CORS
8. ✅ Test everything
9. ✅ Share with client!

---

**Need help?** Check the troubleshooting sections or contact me!


