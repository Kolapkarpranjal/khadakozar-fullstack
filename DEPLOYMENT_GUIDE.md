# 🚀 Deployment Guide - Khadak Ozar Grampanchayat Website

This guide will help you deploy the website to production so your office can use it live.

## 📋 Prerequisites

1. **Server/VPS** (Options):
   - DigitalOcean Droplet (Recommended - $5-10/month)
   - AWS EC2
   - Azure VM
   - Any Linux VPS with Ubuntu 20.04+

2. **Domain Name** (Optional but recommended)
   - Example: `khadakozar.gov.in` or `grampanchayat-khadakozar.in`

3. **MongoDB Atlas Account** (Already configured ✅)

---

## 🎯 Step 1: Prepare Your Server

### Option A: Using a VPS (Recommended)

1. **Create a VPS instance:**
   - Ubuntu 20.04 or 22.04 LTS
   - Minimum: 1GB RAM, 1 CPU, 25GB storage
   - Recommended: 2GB RAM, 2 CPU, 50GB storage

2. **Connect to your server:**
   ```bash
   ssh root@your-server-ip
   ```

3. **Update system:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Install Node.js (v18 or higher):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   node --version  # Should show v18.x or higher
   ```

5. **Install Nginx (Web Server):**
   ```bash
   sudo apt install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

6. **Install PM2 (Process Manager):**
   ```bash
   sudo npm install -g pm2
   ```

7. **Install Git:**
   ```bash
   sudo apt install git -y
   ```

---

## 🎯 Step 2: Upload Your Code to Server

### Method 1: Using Git (Recommended)

1. **Create a Git repository** (GitHub/GitLab/Bitbucket)

2. **Push your code:**
   ```bash
   cd /path/to/your/project
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

3. **On your server, clone the repository:**
   ```bash
   cd /var/www
   sudo git clone your-repo-url grampanchayat
   sudo chown -R $USER:$USER grampanchayat
   ```

### Method 2: Using SCP (Direct Upload)

```bash
# From your local machine
scp -r /path/to/your/project root@your-server-ip:/var/www/grampanchayat
```

---

## 🎯 Step 3: Configure Backend

1. **Navigate to backend directory:**
   ```bash
   cd /var/www/grampanchayat/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create production config file:**
   ```bash
   nano config.env
   ```

4. **Update config.env with production values:**
   ```env
   # Database Configuration
   MONGODB_URI=mongodb+srv://khadakozar_admin:Khadak%40123456@cluster0.aj1km5i.mongodb.net/grampanchayat_khadak_ozar?retryWrites=true&w=majority&appName=Cluster0

   # Server Configuration
   PORT=5000
   NODE_ENV=production

   # JWT Configuration - CHANGE THIS TO A STRONG SECRET!
   JWT_SECRET=your_very_strong_secret_key_here_minimum_32_characters
   JWT_EXPIRE=7d

   # Admin Credentials - CHANGE THESE!
   ADMIN_EMAIL=admin@khadakozar.com
   ADMIN_PASSWORD=your_strong_password_here

   # File Upload Configuration
   MAX_FILE_SIZE=10485760
   MAX_VIDEO_SIZE=209715200
   UPLOAD_PATH=./uploads

   # Frontend URL (for CORS)
   FRONTEND_URL=https://your-domain.com
   ```

5. **Create uploads directory:**
   ```bash
   mkdir -p uploads/{gallery,events,banners,members}
   ```

---

## 🎯 Step 4: Build Frontend

1. **Navigate to frontend directory:**
   ```bash
   cd /var/www/grampanchayat/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create production environment file:**
   ```bash
   nano .env.production
   ```

4. **Add production API URL:**
   ```env
   REACT_APP_API_URL=https://your-domain.com
   ```

5. **Build the frontend:**
   ```bash
   npm run build
   ```

6. **Copy build to backend public folder:**
   ```bash
   cp -r build/* ../backend/public/
   ```

---

## 🎯 Step 5: Start Backend with PM2

1. **Start the backend server:**
   ```bash
   cd /var/www/grampanchayat/backend
   pm2 start server.js --name "grampanchayat-api"
   ```

2. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

3. **Check if server is running:**
   ```bash
   pm2 status
   pm2 logs grampanchayat-api
   ```

---

## 🎯 Step 6: Configure Nginx

1. **Create Nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/grampanchayat
   ```

2. **Add this configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       # Frontend static files
       location / {
           root /var/www/grampanchayat/backend/public;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # File uploads (increase size limit)
       client_max_body_size 200M;

       # Admin panel
       location /admin-panel {
           root /var/www/grampanchayat/backend;
           try_files $uri $uri/ /admin-panel/index.html;
       }

       # Uploads (serve uploaded files)
       location /uploads {
           alias /var/www/grampanchayat/backend/uploads;
           expires 30d;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/grampanchayat /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl reload nginx
   ```

---

## 🎯 Step 7: Setup SSL Certificate (HTTPS)

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Get SSL certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-renewal is set up automatically**

---

## 🎯 Step 8: Firewall Configuration

1. **Allow HTTP, HTTPS, and SSH:**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

---

## 🎯 Step 9: Final Steps

1. **Update MongoDB Atlas IP Whitelist:**
   - Go to MongoDB Atlas Dashboard
   - Network Access → Add IP Address
   - Add your server's IP address (or 0.0.0.0/0 for all IPs - less secure)

2. **Test the deployment:**
   - Visit: `https://your-domain.com`
   - Visit: `https://your-domain.com/admin-panel`
   - Test login with admin credentials

3. **Run migrations (if needed):**
   ```bash
   cd /var/www/grampanchayat/backend
   node migrateMembers.js
   node migrateCommitteeMembers.js
   node migrateBanners.js
   ```

---

## 🔄 Updating the Website

When you need to update the website:

```bash
# 1. Pull latest code
cd /var/www/grampanchayat
git pull

# 2. Update backend
cd backend
npm install
pm2 restart grampanchayat-api

# 3. Update frontend
cd ../frontend
npm install
npm run build
cp -r build/* ../backend/public/

# 4. Restart server
pm2 restart grampanchayat-api
```

---

## 📊 Monitoring

1. **Check PM2 status:**
   ```bash
   pm2 status
   pm2 logs grampanchayat-api
   ```

2. **Check Nginx status:**
   ```bash
   sudo systemctl status nginx
   ```

3. **Monitor server resources:**
   ```bash
   htop
   df -h  # Check disk space
   ```

---

## 🆘 Troubleshooting

### Backend not starting:
```bash
pm2 logs grampanchayat-api
cd /var/www/grampanchayat/backend
node server.js  # Run directly to see errors
```

### Frontend not loading:
- Check Nginx configuration: `sudo nginx -t`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

### Database connection issues:
- Check MongoDB Atlas IP whitelist
- Verify MONGODB_URI in config.env

### File upload issues:
- Check uploads directory permissions: `sudo chmod -R 755 uploads`
- Check disk space: `df -h`

---

## 📝 Important Security Notes

1. **Change default admin password** immediately after deployment
2. **Use strong JWT_SECRET** (minimum 32 characters)
3. **Keep server updated:** `sudo apt update && sudo apt upgrade`
4. **Regular backups** of database and uploads folder
5. **Monitor logs** regularly for suspicious activity

---

## 📞 Support

If you face any issues during deployment, check:
- PM2 logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/error.log`
- Backend logs: Check PM2 output

---

## ✅ Deployment Checklist

- [ ] Server/VPS created and configured
- [ ] Node.js and Nginx installed
- [ ] Code uploaded to server
- [ ] Backend dependencies installed
- [ ] Frontend built and copied
- [ ] config.env configured with production values
- [ ] PM2 started and configured
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Admin password changed
- [ ] Website tested and working
- [ ] Backups configured

---

**Good luck with your deployment! 🚀**

