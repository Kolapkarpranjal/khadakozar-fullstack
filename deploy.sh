#!/bin/bash

# Deployment Script for Khadak Ozar Grampanchayat
# Run this script on your production server

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

# Navigate to project directory
PROJECT_DIR="/var/www/grampanchayat"
cd $PROJECT_DIR || exit

echo -e "${YELLOW}📦 Updating backend...${NC}"
cd backend
npm install --production
echo -e "${GREEN}✅ Backend dependencies installed${NC}"

echo -e "${YELLOW}📦 Building frontend...${NC}"
cd ../frontend
npm install
npm run build
echo -e "${GREEN}✅ Frontend built${NC}"

echo -e "${YELLOW}📦 Copying frontend build to backend...${NC}"
rm -rf ../backend/public/*
cp -r build/* ../backend/public/
echo -e "${GREEN}✅ Frontend files copied${NC}"

echo -e "${YELLOW}🔄 Restarting application...${NC}"
cd ../backend
pm2 restart grampanchayat-api || pm2 start ecosystem.config.js
echo -e "${GREEN}✅ Application restarted${NC}"

echo -e "${YELLOW}🔄 Reloading Nginx...${NC}"
sudo systemctl reload nginx
echo -e "${GREEN}✅ Nginx reloaded${NC}"

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${YELLOW}Check status with: pm2 status${NC}"

