require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const Banner = require('./models/Banner');

// Static banner data from frontend
const staticBanners = [
  {
    title: 'ग्रामपंचायत खडकोजर',
    titleEn: 'Grampanchayat Khadakozar',
    titleMr: 'ग्रामपंचायत खडकोजर',
    altText: 'ग्रामपंचायत खडकोजर',
    altTextEn: 'Grampanchayat Khadakozar',
    altTextMr: 'ग्रामपंचायत खडकोजर',
    imageUrl: '/images/banners/banner1.jpg',
    order: 1,
    isActive: true
  },
  {
    title: 'डिजिटल ग्रामपंचायत',
    titleEn: 'Digital Grampanchayat',
    titleMr: 'डिजिटल ग्रामपंचायत',
    altText: 'डिजिटल ग्रामपंचायत',
    altTextEn: 'Digital Grampanchayat',
    altTextMr: 'डिजिटल ग्रामपंचायत',
    imageUrl: '/images/banners/banner2.jpg',
    order: 2,
    isActive: true
  },
  {
    title: 'समुदाय सेवा',
    titleEn: 'Community Service',
    titleMr: 'समुदाय सेवा',
    altText: 'समुदाय सेवा',
    altTextEn: 'Community Service',
    altTextMr: 'समुदाय सेवा',
    imageUrl: '/images/banners/banner3.jpg',
    order: 3,
    isActive: true
  }
];

async function migrateBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grampanchayat_khadak_ozar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check which static banners already exist
    const existingBanners = await Banner.find({});
    console.log(`📊 Found ${existingBanners.length} existing banners in database.`);
    
    // Check which static banners need to be added
    const bannersToAdd = [];
    for (const staticBanner of staticBanners) {
      const exists = existingBanners.some(existing => 
        existing.title === staticBanner.title && 
        existing.imageUrl === staticBanner.imageUrl
      );
      if (!exists) {
        bannersToAdd.push(staticBanner);
      }
    }

    if (bannersToAdd.length === 0) {
      console.log('✅ All static banners already exist in database. No migration needed.');
      process.exit(0);
    }

    // Insert only missing static banners
    console.log(`📝 Inserting ${bannersToAdd.length} missing static banners...`);
    const inserted = await Banner.insertMany(bannersToAdd);
    console.log(`✅ Successfully inserted ${inserted.length} banners`);

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateBanners();


