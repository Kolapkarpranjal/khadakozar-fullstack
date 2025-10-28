const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: './config.env' });

async function setupDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grampanchayat_khadak_ozar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Create default admin user
    console.log('👤 Creating default admin user...');
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        email: process.env.ADMIN_EMAIL || 'admin@khadakozar.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      
      await admin.save();
      console.log('✅ Default admin user created');
      console.log(`📧 Email: ${admin.email}`);
      console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Access admin panel: http://localhost:5000/admin-panel/index.html');
    console.log('3. Update your frontend forms to submit to: http://localhost:5000/api/forms/submit');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

setupDatabase();










