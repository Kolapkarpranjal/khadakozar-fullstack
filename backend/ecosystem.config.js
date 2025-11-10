// PM2 Ecosystem Configuration
// This file helps manage the application in production
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'grampanchayat-api',
    script: './server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '500M',
    watch: false
  }]
};

