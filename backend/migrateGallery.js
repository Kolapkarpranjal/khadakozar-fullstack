require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const GalleryItem = require('./models/GalleryItem');

// Static gallery images from frontend
const staticGalleryItems = [
  {
    title: "रस्त्याचे काम पूर्ण",
    titleEn: "Road Work Completed",
    titleMr: "रस्त्याचे काम पूर्ण",
    description: "रस्त्याचे काम पूर्ण",
    descriptionEn: "Road Work Completed",
    descriptionMr: "रस्त्याचे काम पूर्ण",
    altText: "रस्त्याचे काम पूर्ण",
    altTextEn: "Road Work Completed",
    altTextMr: "रस्त्याचे काम पूर्ण",
    imageUrl: "/images/gallery/gallery1.jpg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery2.jpg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery3.jpg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "केद्राई माता मंदिर सोलार बसविणे",
    titleEn: "Kedrai Mata Temple Solar Installation",
    titleMr: "केद्राई माता मंदिर सोलार बसविणे",
    description: "केद्राई माता मंदिर सोलार बसविणे",
    descriptionEn: "Kedrai Mata Temple Solar Installation",
    descriptionMr: "केद्राई माता मंदिर सोलार बसविणे",
    altText: "केद्राई माता मंदिर सोलार बसविणे",
    altTextEn: "Kedrai Mata Temple Solar Installation",
    altTextMr: "केद्राई माता मंदिर सोलार बसविणे",
    imageUrl: "/images/gallery/gallery4.jpg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery5.jpg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery6.jpg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery7.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery8.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery9.jpg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery10.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "आई माउली मंदिर नवीन शेड",
    titleEn: "Ai Mauli Temple New Shed",
    titleMr: "आई माउली मंदिर नवीन शेड",
    description: "आई माउली मंदिर नवीन शेड",
    descriptionEn: "Ai Mauli Temple New Shed",
    descriptionMr: "आई माउली मंदिर नवीन शेड",
    altText: "आई माउली मंदिर नवीन शेड",
    altTextEn: "Ai Mauli Temple New Shed",
    altTextMr: "आई माउली मंदिर नवीन शेड",
    imageUrl: "/images/gallery/gallery11.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery12.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery13.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    titleEn: "Gram Panchayat Khadak Ozar Photos",
    titleMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    description: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    descriptionEn: "Gram Panchayat Khadak Ozar Photos",
    descriptionMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altText: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    altTextEn: "Gram Panchayat Khadak Ozar Photos",
    altTextMr: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
    imageUrl: "/images/gallery/gallery14.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "सभामंडप",
    titleEn: "Assembly Hall",
    titleMr: "सभामंडप",
    description: "सभामंडप",
    descriptionEn: "Assembly Hall",
    descriptionMr: "सभामंडप",
    altText: "सभामंडप",
    altTextEn: "Assembly Hall",
    altTextMr: "सभामंडप",
    imageUrl: "/images/gallery/gallery15.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "केद्राई माता मंदिर सोलार बसविणे",
    titleEn: "Kedrai Mata Temple Solar Installation",
    titleMr: "केद्राई माता मंदिर सोलार बसविणे",
    description: "केद्राई माता मंदिर सोलार बसविणे",
    descriptionEn: "Kedrai Mata Temple Solar Installation",
    descriptionMr: "केद्राई माता मंदिर सोलार बसविणे",
    altText: "केद्राई माता मंदिर सोलार बसविणे",
    altTextEn: "Kedrai Mata Temple Solar Installation",
    altTextMr: "केद्राई माता मंदिर सोलार बसविणे",
    imageUrl: "/images/gallery/gallery16.jpeg",
    category: "general",
    isVideo: false,
    isActive: true
  },
  {
    title: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
    titleEn: "Chief Minister Samruddh Panchayatraj Abhiyan Launch",
    titleMr: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
    description: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
    descriptionEn: "Chief Minister Samruddh Panchayatraj Abhiyan Launch",
    descriptionMr: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
    altText: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
    altTextEn: "Chief Minister Samruddh Panchayatraj Abhiyan Launch",
    altTextMr: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
    imageUrl: "/images/gallery/shubharambhvdo.mp4",
    category: "video",
    isVideo: true,
    isActive: true
  }
];

async function migrateGallery() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log('Database:', mongoose.connection.db.databaseName);

    // Check existing gallery items
    const existingItems = await GalleryItem.find({});
    console.log(`Found ${existingItems.length} existing gallery items`);

    if (existingItems.length > 0) {
      // Check which items are missing based on imageUrl
      const existingUrls = new Set(existingItems.map(item => item.imageUrl));
      const missingItems = staticGalleryItems.filter(item => !existingUrls.has(item.imageUrl));
      
      if (missingItems.length > 0) {
        console.log(`Adding ${missingItems.length} missing gallery items...`);
        await GalleryItem.insertMany(missingItems);
        console.log(`Successfully added ${missingItems.length} gallery items`);
      } else {
        console.log('All gallery items already exist. No new items to add.');
      }
    } else {
      // No items exist, insert all
      console.log('No existing gallery items found. Adding all items...');
      await GalleryItem.insertMany(staticGalleryItems);
      console.log(`Successfully added ${staticGalleryItems.length} gallery items`);
    }

    console.log('\n=== Migration completed successfully! ===');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateGallery();
