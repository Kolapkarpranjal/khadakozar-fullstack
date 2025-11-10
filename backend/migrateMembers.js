// Migration script to populate members from static data
const mongoose = require('mongoose');
const Member = require('./models/Member');
require('dotenv').config({ path: './config.env' });

// Static members data (from frontend/src/components/data/members.js)
const staticMembers = [
  {
    memberName: 'Sagar Vasantrao Pagar',
    memberNameMarathi: 'सागर वसंतराव पगार',
    memberDesignation: 'Sarpanch (Head of Village Council)',
    memberDesignationMarathi: 'सरपंच',
    imageUrl: '/images/members/sarpanch.jpg',
    order: 1,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Govind Tulshiram Pagar',
    memberNameMarathi: 'गोविंद तुळशीराम पगार',
    memberDesignation: 'Deputy Sarpanch (Deputy Head of Village Council)',
    memberDesignationMarathi: 'उपसरपंच',
    imageUrl: '/images/members/upsarpanch.jpg',
    order: 2,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Harshad Janardan Pagar',
    memberNameMarathi: 'हर्षद जनार्दन पगार',
    memberDesignation: 'Member',
    memberDesignationMarathi: 'सदस्य',
    imageUrl: '/images/members/harshad.jpg',
    order: 3,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Devidas Tatyaba Pagar',
    memberNameMarathi: 'देविदास तात्याबा पगार',
    memberDesignation: 'Member',
    memberDesignationMarathi: 'सदस्य',
    imageUrl: '/images/members/devidas.jpg',
    order: 4,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Sharad Ramchandra Bhavar',
    memberNameMarathi: 'शरद रामचंद्र भावर',
    memberDesignation: 'Member',
    memberDesignationMarathi: 'सदस्य',
    imageUrl: '/images/members/sharad.jpg',
    order: 5,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Shivaji Chindhu Ghodhade',
    memberNameMarathi: 'शिवाजी चिंधू घोधडे',
    memberDesignation: 'Member',
    memberDesignationMarathi: 'सदस्य',
    imageUrl: '/images/members/shivajighodke.jpg',
    order: 6,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Sarika Ashok Pagar',
    memberNameMarathi: 'सारिका अशोक पगार',
    memberDesignation: 'Member (Female)',
    memberDesignationMarathi: 'महिला सदस्य',
    imageUrl: '/images/members/sarika.jpg',
    order: 7,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Ratna Atmaram Pagar',
    memberNameMarathi: 'रत्ना आत्माराम पगार',
    memberDesignation: 'Member (Female)',
    memberDesignationMarathi: 'महिला सदस्य',
    imageUrl: '/images/members/ratna.jpg',
    order: 8,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Sonali Sunil Bhavar',
    memberNameMarathi: 'सोनाली सुनील भावर',
    memberDesignation: 'Member (Female)',
    memberDesignationMarathi: 'महिला सदस्य',
    imageUrl: '/images/members/sonali.jpg',
    order: 9,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Aruna Khanderao Pagar',
    memberNameMarathi: 'अरुणा खंडेराव पगार',
    memberDesignation: 'Member (Female)',
    memberDesignationMarathi: 'महिला सदस्य',
    imageUrl: '/images/members/aruna.jpg',
    order: 10,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Laxmibai Chahadu Suryawanshi',
    memberNameMarathi: 'लक्ष्मीबाई चहादु सुर्यवंशी',
    memberDesignation: 'Member (Female)',
    memberDesignationMarathi: 'महिला सदस्य',
    imageUrl: '/images/members/laxmibai.jpg',
    order: 11,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Priyanka Shivanath Kedare',
    memberNameMarathi: 'प्रियांका शिवनाथ केदारे',
    memberDesignation: 'Member (Female)',
    memberDesignationMarathi: 'महिला सदस्य',
    imageUrl: '/images/members/priyanka.jpg',
    order: 12,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Roshan Balwant Suryavanshi',
    memberNameMarathi: 'रोशन बळवंत सूर्यवंशी',
    memberDesignation: 'Gram Panchayat Officer',
    memberDesignationMarathi: 'ग्रामपंचायत अधिकारी',
    imageUrl: '/images/members/member1.jpg',
    order: 13,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Sushil Rajendra Kedare',
    memberNameMarathi: 'सुशील राजेंद्र केदारे',
    memberDesignation: 'Computer Operator',
    memberDesignationMarathi: 'संगणक ऑपरेटर',
    imageUrl: '/images/members/member2.jpg',
    order: 14,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Ganesh Kedu Pagar',
    memberNameMarathi: 'गणेश केदू पगार',
    memberDesignation: 'Clerk Vasuli Karkun',
    memberDesignationMarathi: 'लिपिक वसुली कारकून',
    imageUrl: '/images/members/गणेश केदू पगार.jpg',
    order: 15,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Kailas Ramdas Pagar',
    memberNameMarathi: 'कैलास रामदास पगार',
    memberDesignation: 'Gram Rojgar Sahayak',
    memberDesignationMarathi: 'ग्राम रोजगार सहायक',
    imageUrl: '/images/members/कैलास रामदास पगार.jpg',
    order: 16,
    isActive: true,
    mobile: ''
  },
  {
    memberName: 'Sahebrao Nivritti Kank',
    memberNameMarathi: 'साहेबराव निवृत्ती कंक',
    memberDesignation: 'Water Supply Employee',
    memberDesignationMarathi: 'पाणीपुरवठा कर्मचारी',
    imageUrl: '/images/members/member5.jpg',
    order: 17,
    isActive: true,
    mobile: ''
  }
];

async function migrateMembers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grampanchayat_khadak_ozar');
    
    console.log('✅ Connected to MongoDB');
    
    // Check if members already exist
    const existingCount = await Member.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  ${existingCount} members already exist in database.`);
      console.log('📝 Checking for missing static members...');
      
      // Get existing members by order to check which ones are missing
      const existingMembers = await Member.find().select('order memberName');
      const existingOrders = new Set(existingMembers.map(m => m.order));
      
      // Find members that don't exist (by order)
      const membersToAdd = staticMembers.filter(m => !existingOrders.has(m.order));
      
      if (membersToAdd.length === 0) {
        console.log('✅ All static members already exist in database!');
        console.log('   You can manage them through the admin panel.');
        await mongoose.disconnect();
        process.exit(0);
      }
      
      console.log(`📝 Adding ${membersToAdd.length} missing static members...`);
      const result = await Member.insertMany(membersToAdd);
      console.log(`✅ Successfully added ${result.length} members to database!`);
      console.log(`📊 Total members in database: ${existingCount + result.length}`);
      
      await mongoose.disconnect();
      process.exit(0);
    }
    
    // Insert all members if database is empty
    console.log('📝 Migrating all static members to database...');
    const result = await Member.insertMany(staticMembers);
    console.log(`✅ Successfully migrated ${result.length} members to database!`);
    console.log('\n📋 Next steps:');
    console.log('1. All static members are now in the database');
    console.log('2. You can manage them through the admin panel');
    console.log('3. You can add new members through the admin panel');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    if (error.code === 11000) {
      console.error('   Duplicate key error - some members may already exist');
    }
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run migration
migrateMembers().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

