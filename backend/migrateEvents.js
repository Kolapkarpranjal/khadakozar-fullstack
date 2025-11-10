require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const Event = require('./models/Event');

// Static upakram (events) data from frontend
const staticEvents = [
  {
    title: 'अम्बुलंस',
    titleEn: 'Ambulance',
    titleMr: 'अम्बुलंस',
    description: 'ग्रामस्थांना आपत्कालीन वैद्यकीय सेवा उपलब्ध करून देण्यासाठी अम्बुलंसची सुविधा. आरोग्य सेवांच्या सुलभतेसाठी महत्त्वपूर्ण योगदान.',
    descriptionEn: 'Ambulance facility to provide emergency medical services to villagers. Important contribution for accessibility of healthcare services.',
    descriptionMr: 'ग्रामस्थांना आपत्कालीन वैद्यकीय सेवा उपलब्ध करून देण्यासाठी अम्बुलंसची सुविधा. आरोग्य सेवांच्या सुलभतेसाठी महत्त्वपूर्ण योगदान.',
    altText: 'अम्बुलंस',
    altTextEn: 'Ambulance',
    altTextMr: 'अम्बुलंस',
    imageUrl: '/images/upakaram/event2.jpg',
    status: 'Completed',
    date: '2024',
    isActive: true
  },
  {
    title: 'अम्बुलंस',
    titleEn: 'Ambulance',
    titleMr: 'अम्बुलंस',
    description: 'ग्रामस्थांना आपत्कालीन वैद्यकीय सेवा उपलब्ध करून देण्यासाठी अम्बुलंसची सुविधा. आरोग्य सेवांच्या सुलभतेसाठी महत्त्वपूर्ण योगदान.',
    descriptionEn: 'Ambulance facility to provide emergency medical services to villagers. Important contribution for accessibility of healthcare services.',
    descriptionMr: 'ग्रामस्थांना आपत्कालीन वैद्यकीय सेवा उपलब्ध करून देण्यासाठी अम्बुलंसची सुविधा. आरोग्य सेवांच्या सुलभतेसाठी महत्त्वपूर्ण योगदान.',
    altText: 'अम्बुलंस',
    altTextEn: 'Ambulance',
    altTextMr: 'अम्बुलंस',
    imageUrl: '/images/upakaram/event3.jpg',
    status: 'Completed',
    date: '2024',
    isActive: true
  },
  {
    title: 'वैकुंठ रथ',
    titleEn: 'Vaikunth Rath',
    titleMr: 'वैकुंठ रथ',
    description: 'वैकुंठ रथ हा एक महत्त्वपूर्ण धार्मिक आणि सांस्कृतिक कार्यक्रम आहे. हा रथ गावातील सर्व भाविकांसाठी आध्यात्मिक आनंद आणि शांती आणतो. वैकुंठ रथाच्या माध्यमातून गावातील लोकांची धार्मिक भावना जागृत होते आणि सामुदायिक एकता मजबूत होते. हा कार्यक्रम गावाच्या सांस्कृतिक वारसाचा एक महत्त्वपूर्ण भाग आहे. वैकुंठ रथाच्या आयोजनामुळे गावातील सर्व वयोगटातील लोक एकत्र येतात आणि सामूहिक प्रार्थना करतात. या कार्यक्रमाच्या माध्यमातून गावातील लोकांच्या मध्ये आध्यात्मिक जागृती निर्माण होते. वैकुंठ रथ हा केवळ धार्मिक कार्यक्रम नसून तो गावाच्या सामाजिक एकतेचे प्रतीक आहे. या कार्यक्रमामुळे गावातील लोकांच्या मध्ये परस्पर प्रेम आणि सहकार्याची भावना वाढते. वैकुंठ रथाच्या आयोजनामुळे गावाची धार्मिक आणि सांस्कृतिक ओळख मजबूत होते.',
    descriptionEn: 'Vaikunth Rath is an important religious and cultural program. This rath brings spiritual joy and peace to all devotees in the village. Through Vaikunth Rath, the religious sentiments of the villagers are awakened and community unity is strengthened. This program is an important part of the village cultural heritage. The organization of Vaikunth Rath brings together people of all age groups in the village for collective prayers. Through this program, spiritual awakening is created among the villagers. Vaikunth Rath is not just a religious program but a symbol of social unity of the village. This program increases the feeling of mutual love and cooperation among the villagers. The organization of Vaikunth Rath strengthens the religious and cultural identity of the village.',
    descriptionMr: 'वैकुंठ रथ हा एक महत्त्वपूर्ण धार्मिक आणि सांस्कृतिक कार्यक्रम आहे. हा रथ गावातील सर्व भाविकांसाठी आध्यात्मिक आनंद आणि शांती आणतो. वैकुंठ रथाच्या माध्यमातून गावातील लोकांची धार्मिक भावना जागृत होते आणि सामुदायिक एकता मजबूत होते. हा कार्यक्रम गावाच्या सांस्कृतिक वारसाचा एक महत्त्वपूर्ण भाग आहे. वैकुंठ रथाच्या आयोजनामुळे गावातील सर्व वयोगटातील लोक एकत्र येतात आणि सामूहिक प्रार्थना करतात. या कार्यक्रमाच्या माध्यमातून गावातील लोकांच्या मध्ये आध्यात्मिक जागृती निर्माण होते. वैकुंठ रथ हा केवळ धार्मिक कार्यक्रम नसून तो गावाच्या सामाजिक एकतेचे प्रतीक आहे. या कार्यक्रमामुळे गावातील लोकांच्या मध्ये परस्पर प्रेम आणि सहकार्याची भावना वाढते. वैकुंठ रथाच्या आयोजनामुळे गावाची धार्मिक आणि सांस्कृतिक ओळख मजबूत होते.',
    altText: 'वैकुंठ रथ',
    altTextEn: 'Vaikunth Rath',
    altTextMr: 'वैकुंठ रथ',
    imageUrl: '/images/upakaram/event4.jpg',
    status: 'Ongoing',
    date: '2024',
    isActive: true
  },
  {
    title: 'पिण्याच्या पाण्याचा टँकर',
    titleEn: 'Drinking Water Tanker',
    titleMr: 'पिण्याच्या पाण्याचा टँकर',
    description: 'सततच्या दुष्काळामुळे पिण्याच्या पाण्याची टंचाई निर्माण होते. यावर उपाय म्हणून, ग्रामपंचायतने टँकर खरेदी केला.',
    descriptionEn: 'Continuous drought creates shortage of drinking water. As a solution, the Gram Panchayat purchased a tanker.',
    descriptionMr: 'सततच्या दुष्काळामुळे पिण्याच्या पाण्याची टंचाई निर्माण होते. यावर उपाय म्हणून, ग्रामपंचायतने टँकर खरेदी केला.',
    altText: 'पिण्याच्या पाण्याचा टँकर',
    altTextEn: 'Drinking Water Tanker',
    altTextMr: 'पिण्याच्या पाण्याचा टँकर',
    imageUrl: '/images/upakaram/event5.jpg',
    status: 'Completed',
    date: '2024',
    isActive: true
  },
  {
    title: 'शेड उभारणी',
    titleEn: 'Shed Construction',
    titleMr: 'शेड उभारणी',
    description: 'अम्बुलंस व वैकुंठ रथ साठी स्वतंत्र शेड उभारणी केली.',
    descriptionEn: 'Separate shed construction for ambulance and Vaikunth Rath.',
    descriptionMr: 'अम्बुलंस व वैकुंठ रथ साठी स्वतंत्र शेड उभारणी केली.',
    altText: 'शेड उभारणी',
    altTextEn: 'Shed Construction',
    altTextMr: 'शेड उभारणी',
    imageUrl: '/images/upakaram/event6.jpg',
    status: 'Completed',
    date: '2024',
    isActive: true
  }
];

async function migrateEvents() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grampanchayat_khadak_ozar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check which static events already exist
    const existingEvents = await Event.find({});
    console.log(`📊 Found ${existingEvents.length} existing events in database.`);
    
    // Check which static events need to be added
    const eventsToAdd = [];
    for (const staticEvent of staticEvents) {
      const exists = existingEvents.some(existing => 
        existing.title === staticEvent.title && 
        existing.imageUrl === staticEvent.imageUrl
      );
      if (!exists) {
        eventsToAdd.push(staticEvent);
      }
    }

    if (eventsToAdd.length === 0) {
      console.log('✅ All static upakram events already exist in database. No migration needed.');
      process.exit(0);
    }

    // Insert only missing static events
    console.log(`📝 Inserting ${eventsToAdd.length} missing static upakram (events) data...`);
    const inserted = await Event.insertMany(eventsToAdd);
    console.log(`✅ Successfully inserted ${inserted.length} events`);

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateEvents();

