# 🚀 Deploy Backend to Render.com (FREE)

## Step 1: Create Render Account

1. Go to: https://render.com
2. Click "Get Started" or "Sign Up"
3. Sign up with GitHub (recommended) or Email

---

## Step 2: Prepare Your Backend

Your backend is already ready! But let's verify:

### Check `backend/package.json` has start script:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```
✅ This is already correct in your project!

---

## Step 3: Create MongoDB Atlas Database (FREE)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for FREE account
3. Create a FREE cluster (M0 Sandbox - 512MB)
4. Click "Create Cluster" (takes 3-5 minutes)
5. Create Database User:
   - Click "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `khadakozar_admin`
   - Password: Create a strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

6. Whitelist All IPs:
   - Click "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"

7. Get Connection String:
   - Click "Database" (left sidebar)
   - Click "Connect" button on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://khadakozar_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Add database name: `/khadakozar` before the `?`
   - Final string:
   ```
   mongodb+srv://khadakozar_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/khadakozar?retryWrites=true&w=majority
   ```

---

## Step 4: Deploy Backend to Render

### A. Push Your Code to GitHub (if not already)

```bash
# In your project root
git init
git add .
git commit -m "Initial commit - Khadak Ozar Grampanchayat"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### B. Deploy on Render

1. Go to Render Dashboard: https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

**Settings:**
- **Name**: `khadakozar-backend` (or any name)
- **Region**: Singapore (closest to India)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free` (select free tier)

5. Click "Advanced" and add Environment Variables:

```
MONGODB_URI=mongodb+srv://khadakozar_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/khadakozar?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_at_least_32_characters_long_123456
ADMIN_EMAIL=admin@khadakozar.com
ADMIN_PASSWORD=YourSecurePassword123!
PORT=5000
NODE_ENV=production
```

6. Click "Create Web Service"
7. Wait 3-5 minutes for deployment
8. Your backend URL will be: `https://khadakozar-backend.onrender.com`

---

## Step 5: Test Your Backend

1. Go to: `https://your-backend-url.onrender.com/api/admin/stats`
2. You should see an error (expected - requires auth)
3. Go to: `https://your-backend-url.onrender.com/admin-panel/`
4. You should see the beautiful green login page!
5. Login with your ADMIN_EMAIL and ADMIN_PASSWORD

**✅ If login works, your backend is deployed successfully!**

---

## Step 6: Note Your Backend URL

**IMPORTANT:** Save this URL, you'll need it for frontend deployment:
```
https://khadakozar-backend.onrender.com
```

---

## 🎯 What You Get:

✅ Backend running 24/7  
✅ Admin panel accessible  
✅ API endpoints working  
✅ File uploads working  
✅ MongoDB connected  
✅ FREE forever (with limitations)  

---

## ⚠️ Free Tier Limitations:

- **Cold starts**: If no traffic for 15 minutes, service sleeps. First request takes 30-60 seconds to wake up.
- **750 hours/month**: Sufficient for most small projects
- **For production**: Consider upgrading to paid tier ($7/month) for better performance

---

## 🆘 Troubleshooting:

### Backend won't start?
- Check logs in Render dashboard
- Verify MONGODB_URI is correct
- Ensure all environment variables are set

### Can't login to admin panel?
- Check ADMIN_EMAIL and ADMIN_PASSWORD in environment variables
- Make sure JWT_SECRET is at least 32 characters

### MongoDB connection error?
- Verify IP whitelist (0.0.0.0/0)
- Check database user credentials
- Ensure connection string has database name

---

**Next:** Deploy frontend to Netlify (see DEPLOY-TO-NETLIFY.md)


