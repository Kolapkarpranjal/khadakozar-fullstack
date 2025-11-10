const mongoose = require('mongoose');
const CommitteeMember = require('./models/CommitteeMember');
const Committee = require('./models/Committee');
require('dotenv').config();

// Static committee members for Krishi Vikas Samiti
const krishiVikasSamitiMembers = [
  {
    srNo: 1,
    name: "Shri. Sagar Vasantrao Pagar",
    nameMarathi: "श्री. सागर वसंतराव पगार",
    position: "Sarpanch",
    positionMarathi: "सरपंच",
    designation: "Chairman",
    designationMarathi: "अध्यक्ष",
    mobile: ""
  },
  {
    srNo: 2,
    name: "Shri. Harshad Janardan Pagar",
    nameMarathi: "श्री. हर्षद जनार्दन पगार",
    position: "Up-Sarpanch",
    positionMarathi: "उपसरपंच",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 3,
    name: "Smt. Priyanka Shivnath Kedare",
    nameMarathi: "सौ. प्रियांका शिवनाथ केदारे",
    position: "Gram Panchayat Member",
    positionMarathi: "ग्रा. पं. सदस्य",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 4,
    name: "Smt. Lakshmibai Chahadu Suryavanshi",
    nameMarathi: "सौ. लाक्षिमिबाई चहादू सूर्यवंशी",
    position: "Gram Panchayat Member",
    positionMarathi: "ग्रा. पं. सदस्य",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 5,
    name: "Shri. Devidas Tatya Pagar",
    nameMarathi: "श्री. देविदास तात्याबा पगार",
    position: "Gram Panchayat Member",
    positionMarathi: "ग्रा. पं. सदस्य",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 6,
    name: "Shri. Govind Tulshiram Pagar",
    nameMarathi: "श्री. गोविंद तुळशीराम पगार",
    position: "Gram Panchayat Member",
    positionMarathi: "ग्रा. पं. सदस्य",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 7,
    name: "Smt. Ratna Atmaram Pagar",
    nameMarathi: "सौ. रत्ना आत्माराम पगार",
    position: "Gram Panchayat Member",
    positionMarathi: "ग्रा. पं. सदस्य",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 8,
    name: "Shri. Bajirao Khanderao Pagar",
    nameMarathi: "श्री. बाजीराव खंडेराव पगार",
    position: "Various Co-operative Society President",
    positionMarathi: "विविध सह.संस्था अध्यक्ष",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 9,
    name: "Smt. Sarika Ashok Pagar",
    nameMarathi: "सौ. सारिका अशोक पगार",
    position: "Farmer Producer Group Representative",
    positionMarathi: "शेतकरी उत्पादक गट प्रतिनिधी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 10,
    name: "Smt. Kavita Kishor Pagar",
    nameMarathi: "सौ. कविता किशोर पगार",
    position: "Women's Savings Group Representative",
    positionMarathi: "महिला बचत गट प्रतिनिधी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 11,
    name: "Shri. Bhaulal Tatya Pagar",
    nameMarathi: "श्री. भाऊलाल तात्याबा पगार",
    position: "Agricultural Supplementary Business Farmer",
    positionMarathi: "कृषी पूरक व्यवसाय शेतकरी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 12,
    name: "Smt. Kaveri Yogesh Pagar",
    nameMarathi: "सौ. कावेरी योगेश पगार",
    position: "Agricultural Supplementary Business Farmer",
    positionMarathi: "कृषी पूरक व्यवसाय शेतकरी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 13,
    name: "Shri. Nitin Gangadhar Ekhande",
    nameMarathi: "श्री. नितीन गंगाधर एखंडे",
    position: "Village Revenue Officer",
    positionMarathi: "ग्राम महसूल अधिकारी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 14,
    name: "Smt. V. Jadhav",
    nameMarathi: "सौ. वि.जाधव",
    position: "Agriculture Assistant Officer",
    positionMarathi: "कृषी सहायक अधिकारी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  },
  {
    srNo: 15,
    name: "Shri. Roshan Balwant Suryavanshi",
    nameMarathi: "श्री. रोशन बळवंत सूर्यवंशी",
    position: "Gram Panchayat Officer",
    positionMarathi: "ग्रामपंचायत अधिकारी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: ""
  }
];

// Static committee members for Shaley Vyavasthapan Samiti (Secondary + Primary School)
const shaleyVyavasthapanSamitiMembers = [
  // Secondary School Members
  {
    srNo: 1,
    name: "Shri. Ravindra Ramnath Pagar",
    nameMarathi: "श्री. रवींद्र रामनाथ पगार",
    designation: "Chairman",
    designationMarathi: "अध्यक्ष",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 2,
    name: "Shri. Sharad Kisan Pagar",
    nameMarathi: "श्री. शरद किसान पगार",
    designation: "Vice Chairman",
    designationMarathi: "उपाध्यक्ष",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 3,
    name: "Shri. Namdev Tukaram Pagar",
    nameMarathi: "श्री. नामदेव तुकाराम पगार",
    designation: "Expert Director",
    designationMarathi: "तज्ञ संचालक",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 4,
    name: "Shri. Punjaram Kashinath Suryavanshi",
    nameMarathi: "श्री. पुंजाराम काशिनाथ सूर्यवंशी",
    designation: "Secretary",
    designationMarathi: "सचिव",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 5,
    name: "Shri. Chandrabhan Tulshiram Pagar",
    nameMarathi: "श्री. चंद्रभान तुळशीराम पगार",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 6,
    name: "Shri. Sopan Tulshiram Pagar",
    nameMarathi: "श्री. सोपान तुळशीराम पगार",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 7,
    name: "Shri. Nandkishor Gangadhar Saykar",
    nameMarathi: "श्री. नंदकिशोर गंगाधर सायकर",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 8,
    name: "Shri. Sukdev Prabhakar Ghorpade",
    nameMarathi: "श्री. सुकदेव प्रभाकर घोरपडे",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 9,
    name: "Shri. Babaji Bhimaji Pagar",
    nameMarathi: "श्री. बाबाजी भिमाजी पगार",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 10,
    name: "Shri. Dattu Madhav Pagar",
    nameMarathi: "श्री. दत्तू माधव पगार",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 11,
    name: "Shri. Ajay Trimbak Pagar",
    nameMarathi: "श्री. अजय त्रंबक पगार",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 12,
    name: "Shri. Shivaji Gopala Pagar",
    nameMarathi: "श्री. शिवाजी गोपाळा पगार",
    designation: "Parent Member",
    designationMarathi: "पा. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 13,
    name: "Shri. Krishna Dinkar Pagar",
    nameMarathi: "श्री. कृष्णा दिनकर पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 14,
    name: "Shri. Govind Tulshiram Pagar",
    nameMarathi: "श्री. गोविंद तुळशीराम पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 15,
    name: "Shri. Sanjay Madhav Pote",
    nameMarathi: "श्री. संजय माधव पोटे",
    designation: "Teacher Member",
    designationMarathi: "शि. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 16,
    name: "Kum. Avishkar Ganpat Saykar",
    nameMarathi: "कु. अविष्कार गणपत सायकर",
    designation: "Student Member",
    designationMarathi: "वि. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 17,
    name: "Kum. Sujata Siddharth Kedare",
    nameMarathi: "कु. सुजाता सिद्धार्थ केदारे",
    designation: "Student Member",
    designationMarathi: "वि. सदस्य",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  {
    srNo: 18,
    name: "Smt. Kalavati Santosh Sonavane",
    nameMarathi: "सौ. कलावती संतोष सोनवणे",
    designation: "Women Member",
    designationMarathi: "महिला सदस्या",
    category: "Secondary School",
    categoryMarathi: "माध्यमिक विद्यालय"
  },
  // Primary School Members
  {
    srNo: 19,
    name: "Shri. Bapu Rambahau Pagar",
    nameMarathi: "श्री. बापू रामभाऊ पगार",
    designation: "Chairman",
    designationMarathi: "अध्यक्ष",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 20,
    name: "Shri. Lakshman Tulshiram Pagar",
    nameMarathi: "श्री. लक्ष्मण तुळशीराम पगार",
    designation: "Vice Chairman",
    designationMarathi: "उपाध्यक्ष",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 21,
    name: "Shri. Namdev Kondaji Pagar",
    nameMarathi: "श्री. नामदेव कोंडाजी पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 22,
    name: "Smt. Sunita Balasaheb Pagar",
    nameMarathi: "सौ. सुनिता बाळासाहेब पगार",
    designation: "Member",
    designationMarathi: "सदस्या",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 23,
    name: "Shri. Rajendra Nivruti Pagar",
    nameMarathi: "श्री. राजेंद्र निवृत्ती पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 24,
    name: "Shri. Sopan Tulshiram Pagar",
    nameMarathi: "श्री. सोपान तुळशीराम पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 25,
    name: "Smt. Shweta Somanath Pagar",
    nameMarathi: "सौ. श्वेता सोमनाथ पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 26,
    name: "Smt. Bhagyshri Sandeep Pagar",
    nameMarathi: "सौ. भाग्यश्री संदीप पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 27,
    name: "Shri. Yogesh Ramnath Pagar",
    nameMarathi: "श्री. योगेश रामनाथ पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 28,
    name: "Smt. Sonali Amit Kedare",
    nameMarathi: "सौ. सोनाली अमित केदारे",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 29,
    name: "Smt. Sangita Sunil Pagar",
    nameMarathi: "सौ. संगीता सुनील पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 30,
    name: "Smt. Ratna Atmaram Pagar",
    nameMarathi: "सौ. रत्न आत्माराम पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 31,
    name: "Shri. Somanath Balasaheb Pagar",
    nameMarathi: "श्री. सोमनाथ बाळासाहेब पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 32,
    name: "Shri. Ramnath Gangadhar Pagar",
    nameMarathi: "श्री. रामनाथ गंगाधर पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  },
  {
    srNo: 33,
    name: "Shri. Raju Bhila Aher",
    nameMarathi: "श्री. राजू भिला आहेर",
    designation: "Member Secretary",
    designationMarathi: "सदस्य सचिव",
    category: "Primary School",
    categoryMarathi: "प्राथमिक शाळा"
  }
];

// Static committee members for Rasta Arakha Samiti
const rastaArakhaSamitiMembers = [
  {
    srNo: 1,
    name: "Smt. Yogita Bhoye",
    nameMarathi: "सौ. योगिता भोये",
    position: "Circle Officer Revenue",
    positionMarathi: "मंडळ अधिकारी महसूल",
    designation: "Chairman",
    designationMarathi: "अध्यक्ष",
    mobile: "9421106264"
  },
  {
    srNo: 2,
    name: "Shri. Roshan Balwant Suryavanshi",
    nameMarathi: "श्री. रोषण बळवंत सूर्यवंशी",
    position: "Gram Panchayat Officer",
    positionMarathi: "ग्रामपंचायत अधिकारी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: "8275586264"
  },
  {
    srNo: 3,
    name: "Smt. Chandrakala Pagar",
    nameMarathi: "सौ. चंद्रकला पगार",
    position: "Agriculture Assistant Officer",
    positionMarathi: "कृषी सहायक अधिकारी",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: "9420355425"
  },
  {
    srNo: 4,
    name: "Shri. Manik Sampat Shinde",
    nameMarathi: "श्री. माणिक संपत शिंदे",
    position: "Police Patil",
    positionMarathi: "पोलीस पाटील",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: "9763440766"
  },
  {
    srNo: 5,
    name: "Shri. Sandeep Gangurde",
    nameMarathi: "श्री. संदीप गांगुर्डे",
    position: "Kotwal",
    positionMarathi: "कोतवाल",
    designation: "Member",
    designationMarathi: "सदस्य",
    mobile: "9822910075"
  },
  {
    srNo: 6,
    name: "Shri. Sagar Vasant Pagar",
    nameMarathi: "श्री. सागर वसंत पगार",
    position: "Sarpanch",
    positionMarathi: "सरपंच",
    designation: "Invited Member",
    designationMarathi: "निमंत्रित सदस्य",
    mobile: "8805815671"
  },
  {
    srNo: 7,
    name: "Shri. Govind Tulshiram Pagar",
    nameMarathi: "श्री. गोविंद तुळशीराम पगार",
    position: "Up-Sarpanch",
    positionMarathi: "उपसरपंच",
    designation: "Invited Member",
    designationMarathi: "निमंत्रित सदस्य",
    mobile: "7972194302"
  },
  {
    srNo: 8,
    name: "District Council Panchayat Committee Member of that Village",
    nameMarathi: "त्या गावाचे जिल्हा परिषद पंचायत समिती सदस्य",
    position: "",
    positionMarathi: "",
    designation: "",
    designationMarathi: "",
    mobile: ""
  },
  {
    srNo: 9,
    name: "Shri. Tukaram Kondaji Pagar",
    nameMarathi: "श्री. तुकाराम कोंडाजी पगार",
    position: "Village Dispute-Free Chairman",
    positionMarathi: "ग्राम.तंटामुक्त अध्यक्ष",
    designation: "Invited Member",
    designationMarathi: "निमंत्रित सदस्य",
    mobile: "9881460440"
  },
  {
    srNo: 10,
    name: "Shri. Shivaji P. Naval",
    nameMarathi: "श्री. शिवाजी पी. नेव्हल",
    position: "Village Revenue Officer",
    positionMarathi: "ग्राम महसूल अधिकारी",
    designation: "Member / Secretary",
    designationMarathi: "सदस्य / सचिव",
    mobile: "9850493951"
  }
];

// Static committee members for Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra (Bachat Gat Groups)
const mahimAhilyadeviMembers = [
  {
    srNo: 1,
    name: "Trirashmi Group",
    nameMarathi: "त्रीरश्मी गट",
    groupName: "Trirashmi Group",
    groupNameMarathi: "त्रीरश्मी गट",
    presidentName: "Mangala Gulab Kedare",
    presidentNameMarathi: "मंगला गुलाब केदारे",
    secretary: "Sunita Santosh Kedare",
    secretaryMarathi: "सुनिता संतोष केदारे",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 2,
    name: "Ambedkar Savings Group",
    nameMarathi: "आंबेडकर बचत गट",
    groupName: "Ambedkar Savings Group",
    groupNameMarathi: "आंबेडकर बचत गट",
    presidentName: "Chhaya Rajendra Kedare",
    presidentNameMarathi: "छाया राजेंद्र केदारे",
    secretary: "Bharatabai Babaji Pagar",
    secretaryMarathi: "भारताबाई बाबाजी पगार",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 3,
    name: "Amrapali Savings Group",
    nameMarathi: "आम्रपाली बचत गट",
    groupName: "Amrapali Savings Group",
    groupNameMarathi: "आम्रपाली बचत गट",
    presidentName: "Chahabai Narhari Nagre",
    presidentNameMarathi: "चहाबाई नरहरी नागरे",
    secretary: "Archana Tushar Kedare",
    secretaryMarathi: "अर्चना तुषार केदारे",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 4,
    name: "Bhagwati Savings Group",
    nameMarathi: "भगवती बचत गट",
    groupName: "Bhagwati Savings Group",
    groupNameMarathi: "भगवती बचत गट",
    presidentName: "Jyoti Hiraman Pagar",
    presidentNameMarathi: "ज्योती हिरामण पगार",
    secretary: "Usha Vishnu Nikam",
    secretaryMarathi: "उषा विष्णू निकम",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 5,
    name: "Yashodhara Savings Group",
    nameMarathi: "यशोधरा बचत गट",
    groupName: "Yashodhara Savings Group",
    groupNameMarathi: "यशोधरा बचत गट",
    presidentName: "Anita Sandeep Kedare",
    presidentNameMarathi: "अनिता संदीप केदारे",
    secretary: "Savita Sanjay Kedare",
    secretaryMarathi: "सविता संजय केदारे",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 6,
    name: "Mata Ramai Group",
    nameMarathi: "माता रमाई गट",
    groupName: "Mata Ramai Group",
    groupNameMarathi: "माता रमाई गट",
    presidentName: "Priyanka Shivnath Kedare",
    presidentNameMarathi: "प्रियंका शिवनाथ केदारे",
    secretary: "Mangala Ramdas Bhadane",
    secretaryMarathi: "मंगला रामदास भदाणे",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 7,
    name: "Rajmata Savings Group",
    nameMarathi: "राजमाता बचत गट",
    groupName: "Rajmata Savings Group",
    groupNameMarathi: "राजमाता बचत गट",
    presidentName: "Savita Yogesh Pagar",
    presidentNameMarathi: "सविता योगेश पगार",
    secretary: "Sakhubai Balu Kank",
    secretaryMarathi: "सखुबाई बाळू कंक",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 8,
    name: "Kedrai Mata Group",
    nameMarathi: "केद्राई माता गट",
    groupName: "Kedrai Mata Group",
    groupNameMarathi: "केद्राई माता गट",
    presidentName: "",
    presidentNameMarathi: "",
    secretary: "Manisha Madhav Mali",
    secretaryMarathi: "मनीषा माधव माळी",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 9,
    name: "Shivray Savings Group",
    nameMarathi: "शिवराय बचत गट",
    groupName: "Shivray Savings Group",
    groupNameMarathi: "शिवराय बचत गट",
    presidentName: "Savita Sharad Pagar",
    presidentNameMarathi: "सविता शरद पगार",
    secretary: "Manisha Vasant Pagar",
    secretaryMarathi: "मनीषा वसंत पगार",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 10,
    name: "Shivani Savings Group",
    nameMarathi: "शिवानी बचत गट",
    groupName: "Shivani Savings Group",
    groupNameMarathi: "शिवानी बचत गट",
    presidentName: "Rupali Chavan",
    presidentNameMarathi: "रुपाली चव्हाण",
    secretary: "Savita Saykar",
    secretaryMarathi: "सविता सायकर",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 11,
    name: "Savitribai Phule Group",
    nameMarathi: "सावित्रीबाई फुले गट",
    groupName: "Savitribai Phule Group",
    groupNameMarathi: "सावित्रीबाई फुले गट",
    presidentName: "Gulshan Mustafa Pathan",
    presidentNameMarathi: "गुलशन मुस्तफा पठाण",
    secretary: "Kanchan Ananda Kedare",
    secretaryMarathi: "कांचन आनंदा केदारे",
    memberCount: 11,
    remarks: ""
  },
  {
    srNo: 12,
    name: "Laxmi Mata Group",
    nameMarathi: "लक्ष्मी माता गट",
    groupName: "Laxmi Mata Group",
    groupNameMarathi: "लक्ष्मी माता गट",
    presidentName: "Manisha Balasaheb Agar",
    presidentNameMarathi: "मनीषा बाळासाहेब अगर",
    secretary: "Gayatri Sandeep Pagar",
    secretaryMarathi: "गायत्री संदीप पगार",
    memberCount: 11,
    remarks: ""
  }
];

// Static committee members for Gram Sansadhan Gat
const gramSansadhanGatMembers = [
  {
    srNo: 1,
    name: "Shri. Sagar Vasantrao Pagar",
    nameMarathi: "श्री. सागर वसंतराव पगार",
    designation: "Sarpanch",
    designationMarathi: "सरपंच",
    category: "Chairman",
    categoryMarathi: "अध्यक्ष",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8805815671"
  },
  {
    srNo: 2,
    name: "Shri. Harshad Janardan Pagar",
    nameMarathi: "श्री. हर्षद जनार्दन पगार",
    designation: "Up-Sarpanch",
    designationMarathi: "उपसरपंच",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8806018793"
  },
  {
    srNo: 3,
    name: "Smt. Priyanka Shivnath Kedare",
    nameMarathi: "सौ. प्रियांका शिवनाथ केदारे",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9822827919"
  },
  {
    srNo: 4,
    name: "Smt. Lakshmibai Chahadu Suryavanshi",
    nameMarathi: "सौ. लक्षिमिबाई चहादू सूर्यवंशी",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: ""
  },
  {
    srNo: 5,
    name: "Smt. Sarika Ashok Pagar",
    nameMarathi: "सौ. सारिका अशोक पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9834763723"
  },
  {
    srNo: 6,
    name: "Smt. Aruna Khanderao Pagar",
    nameMarathi: "सौ. अरुणा खंडेराव पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9373225120"
  },
  {
    srNo: 7,
    name: "Smt. Ratna Atmaram Pagar",
    nameMarathi: "सौ. रत्ना आत्माराम पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "7620913417"
  },
  {
    srNo: 8,
    name: "Smt. Sonali Sunil Bhavar",
    nameMarathi: "सौ. सोनाली सुनील भवर",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9850261067"
  },
  {
    srNo: 9,
    name: "Shri. Govind Tulshiram Pagar",
    nameMarathi: "श्री. गोविंद तुळशीराम पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "7972194302"
  },
  {
    srNo: 10,
    name: "Shri. Devidas Tatya Pagar",
    nameMarathi: "श्री. देविदास तात्याबा पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9518357405"
  },
  {
    srNo: 11,
    name: "Shri. Sharad Ramchandra Bhavar",
    nameMarathi: "श्री. शरद रामचंद्र भवर",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Secretary",
    categoryMarathi: "सचिव",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9545347626"
  },
  {
    srNo: 12,
    name: "Shri. Shivaji Chindhu Godhade",
    nameMarathi: "श्री. शिवाजी चिंधू गोधडे",
    designation: "Member",
    designationMarathi: "सदस्य",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9359410216"
  },
  {
    srNo: 13,
    name: "Shri. Roshan Balwant Suryavanshi",
    nameMarathi: "श्री. रोषण बळवंत सूर्यवंशी",
    designation: "Gram Panchayat Officer",
    designationMarathi: "ग्रामपंचायत अधिकारी",
    category: "",
    categoryMarathi: "",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8275586264"
  },
  {
    srNo: 14,
    name: "Shri. Sahebrao Nivruti Kank",
    nameMarathi: "श्री. साहेबराव निवृत्ती कंक",
    designation: "Water Supply Employee",
    designationMarathi: "पाणीपुरवठा कर्मचारी",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8010045761"
  },
  {
    srNo: 15,
    name: "Shri. Ganesh Kedu Pagar",
    nameMarathi: "श्री. गणेश केदू पगार",
    designation: "Gram Panchayat Clerk",
    designationMarathi: "ग्रा.प. लिपिक",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9764268193"
  },
  {
    srNo: 16,
    name: "Shri. Sushil Rajendra Kedare",
    nameMarathi: "श्री. सुशील राजेंद्र केदारे",
    designation: "Computer Operator",
    designationMarathi: "संगणक परिचालक",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8850366248"
  },
  {
    srNo: 17,
    name: "Shri. Kailas Ramnath Pagar",
    nameMarathi: "श्री. कैलास रामनाथ पगार",
    designation: "Village Employment Worker",
    designationMarathi: "ग्रामरोजगार सेवक",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8830435793"
  },
  {
    srNo: 18,
    name: "Shri. Sulochana Bhoye",
    nameMarathi: "श्री. सुलोचना भोये",
    designation: "Health Worker",
    designationMarathi: "आरोग्य सेविका",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8668361923"
  },
  {
    srNo: 19,
    name: "Shri. Raju Bhila Aher",
    nameMarathi: "श्री. राजू भिला आहेर",
    designation: "Head Teacher Z.P. Primary School Khadak Ozar",
    designationMarathi: "मुख्या जि.प.प्रा.शाळा खडक ओझर",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9767013862"
  },
  {
    srNo: 20,
    name: "Shri. Hire",
    nameMarathi: "श्री. हिरे",
    designation: "Principal Z.P. Primary School",
    designationMarathi: "मुख्याध्यापक जि.प.प्रा.शाळा",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9404805257"
  },
  {
    srNo: 21,
    name: "Shri. Ashok Somvanshi Sir",
    nameMarathi: "श्री. अशोक सोमवंशी सर",
    designation: "Principal Secondary School",
    designationMarathi: "मुख्याध्यापक मा. विद्यालय .शाळा",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9421562866"
  },
  {
    srNo: 22,
    name: "Smt. Tarabai Dattu Pagar",
    nameMarathi: "सौ. ताराबाई दत्तू पगार",
    designation: "Anganwadi Worker Khadak Ozar",
    designationMarathi: "अंगणवाडी कार्यकर्ती खडक ओझर",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "7498965064"
  },
  {
    srNo: 23,
    name: "Smt. Chhaya Ambadas Pagar",
    nameMarathi: "सौ. छाया अंबादास पगार",
    designation: "Anganwadi Worker Khadak Ozar",
    designationMarathi: "अंगणवाडी कार्यकर्ती खडक ओझर",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9834602429"
  },
  {
    srNo: 24,
    name: "Smt. Usha Vishnu Nikam",
    nameMarathi: "सौ. उषा विष्णू निकम",
    designation: "Anganwadi Worker Gurhale",
    designationMarathi: "अंगणवाडी कार्यकर्ती गुऱ्हाळे",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9022017831"
  },
  {
    srNo: 25,
    name: "Smt. Vaishali Balu Pagar",
    nameMarathi: "सौ. वैशाली बाळू पगार",
    designation: "ASHA Worker Khadak Ozar",
    designationMarathi: "आशा सेविका खडक ओझर",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "7040740302"
  },
  {
    srNo: 26,
    name: "Smt. Mandakini Mayur Kedare",
    nameMarathi: "सौ. मंदाकिनी मयूर केदारे",
    designation: "ASHA Worker Khadak Ozar",
    designationMarathi: "आशा सेविका खडक ओझर",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9370586546"
  },
  {
    srNo: 27,
    name: "Smt. Jyoti Vikram Pagar",
    nameMarathi: "सौ. ज्योती विक्रम पगार",
    designation: "Anganwadi Worker Vishnuwadi",
    designationMarathi: "अंगणवाडी कार्यकर्ती विष्णुवाडी",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9021286403"
  },
  {
    srNo: 28,
    name: "Smt. Mangala Bhausaheb Nagre",
    nameMarathi: "सौ. मंगला भाऊसाहेब नागरे",
    designation: "ASHA Worker Khadak Ozar",
    designationMarathi: "आशा सेविका खडक ओझर",
    category: "Member",
    categoryMarathi: "सदस्य",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9359457120"
  },
  {
    srNo: 29,
    name: "Shri. Jayant Sonavane",
    nameMarathi: "श्री. जयंत सोनवणे",
    designation: "Agriculture Officer",
    designationMarathi: "कृषी अधिकारी",
    category: "Agriculture",
    categoryMarathi: "कृषी",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "9422589290"
  },
  {
    srNo: 30,
    name: "Shri. Nitin Gangadhar Ekhande",
    nameMarathi: "श्री. नितीन गंगाधर एखांडे",
    designation: "Talathi",
    designationMarathi: "तलाठी",
    category: "Talathi",
    categoryMarathi: "तलाठी",
    taluka: "Chandwad",
    talukaMarathi: "चांदवड",
    grampanchayat: "Khadak Ozar",
    grampanchayatMarathi: "खडक ओझर",
    contact: "8726240264"
  }
];

// Static committee members for Jan Arogya Samiti
const janArogyaSamitiMembers = [
  {
    srNo: 1,
    name: "Shri. Sagar Vasantrao Pagar",
    nameMarathi: "मा. सागर वसंतराव पगार",
    designation: "Chairman Sarpanch",
    designationMarathi: "अध्यक्ष सरपंच",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 2,
    name: "Dr. Sulochana Lahanu Bhoye",
    nameMarathi: "मा. डॉ.सुलोचना लहानू भोये",
    designation: "Vice Chairman (Medical Officer)",
    designationMarathi: "सह अध्यक्ष (वैद्यकीय अधिकारी)",
    address: "Vadali Bhoi",
    addressMarathi: "वादळी भोई"
  },
  {
    srNo: 3,
    name: "Dr. Ajay Shivaji Shardul",
    nameMarathi: "मा. डॉ अजय शिवाजी शार्दुल",
    designation: "Member Secretary (Community Health Officer)",
    designationMarathi: "सदस्य सचिव (समुदाय आरोग्य अधिकारी)",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 4,
    name: "Smt. Shobhana Anna Deshmukh",
    nameMarathi: "मा. श्रीम. शोभना आण्णा देशमुख",
    designation: "Member (Health Worker)",
    designationMarathi: "सदस्य (आरोग्य सेविका)",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 5,
    name: "Shri. Gyaneshwar Sunil Kanade",
    nameMarathi: "मा. श्री. ज्ञानेश्वर सुनील कानडे",
    designation: "Member (Health Worker)",
    designationMarathi: "सदस्य (आरोग्य सेवक)",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 6,
    name: "Smt. Mangala Bhausaheb Nagre",
    nameMarathi: "मा. श्रीम. मंगला भाऊसाहेब नागरे",
    designation: "Member ASHA",
    designationMarathi: "सदस्य आशा",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 7,
    name: "Smt. Manisha Rahul Gidhade",
    nameMarathi: "मा. श्रीम. मनीषा राहुल गिधाडे",
    designation: "Member (Savings Group President)",
    designationMarathi: "सदस्य (बचत गट अध्यक्ष)",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 8,
    name: "Smt. Aruna Khanderao Pagar",
    nameMarathi: "मा. श्रीम. अरुणा खंडेराव पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 9,
    name: "Shri. Sharad Ramchandra Bhavar",
    nameMarathi: "मा. श्री. शरद रामचंद्र भवर",
    designation: "Member",
    designationMarathi: "सदस्य",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 10,
    name: "Shri. Harshad Janardan Pagar",
    nameMarathi: "मा. श्री. हर्षद जनार्दन पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 11,
    name: "Shri. Govind Tulshiram Pagar",
    nameMarathi: "मा. श्री. गोविंद तुळशीराम पगार",
    designation: "Member",
    designationMarathi: "सदस्य",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  },
  {
    srNo: 12,
    name: "Shri. Santosh Kedu Pagar",
    nameMarathi: "मा. श्री. संतोष केदू पगार",
    designation: "Youth Representative",
    designationMarathi: "युवा प्रतिनिधी",
    address: "Khadak Ozar",
    addressMarathi: "खडक ओझर"
  }
];

async function migrateCommitteeMembers() {
  try {
    // Connect to MongoDB - use same config as server
    require('dotenv').config({ path: './config.env' });
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/grampanchayat_khadak_ozar';
    console.log('Connecting to MongoDB...');
    console.log('Database:', mongoUri.includes('@') ? mongoUri.split('@')[1].split('/')[1].split('?')[0] : 'local');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Use lowercase path to match Committee model (which stores paths as lowercase)
    const committeePath = 'janarogyasamiti';
    
    // Find or create the committee
    let committee = await Committee.findOne({ path: committeePath });
    if (!committee) {
      // Create the committee if it doesn't exist
      committee = await Committee.create({
        title: 'Jan Arogya Samiti',
        titleMarathi: 'जन आरोग्य समिती',
        path: committeePath,
        route: '/samiti/janArogyaSamiti',
        description: 'Health Committee',
        descriptionMarathi: 'आरोग्य समिती',
        isActive: true,
        order: 1
      });
      console.log('Created committee: Jan Arogya Samiti');
    } else {
      console.log('Found existing committee: Jan Arogya Samiti');
    }

    // Delete existing members with old path (if any) and re-insert with correct path
    const existingMembers = await CommitteeMember.find({ committeePath: committeePath });
    
    if (existingMembers.length > 0) {
      console.log(`Found ${existingMembers.length} existing members for Jan Arogya Samiti`);
      
      // Check which members are missing based on srNo
      const existingSrNos = new Set(existingMembers.map(m => m.srNo));
      const missingMembers = janArogyaSamitiMembers.filter(m => !existingSrNos.has(m.srNo));
      
      if (missingMembers.length > 0) {
        console.log(`Adding ${missingMembers.length} missing members...`);
        const membersToInsert = missingMembers.map(member => ({
          committeeId: committee._id,
          committeePath: committeePath,
          ...member,
          isActive: true
        }));
        
        await CommitteeMember.insertMany(membersToInsert);
        console.log(`Successfully added ${missingMembers.length} members to Jan Arogya Samiti`);
      } else {
        console.log('All members already exist. No new members to add.');
      }
    } else {
      // No members exist, insert all
      console.log('No existing members found. Adding all 12 members...');
      const membersToInsert = janArogyaSamitiMembers.map(member => ({
        committeeId: committee._id,
        committeePath: committeePath,
        ...member,
        isActive: true
      }));
      
      await CommitteeMember.insertMany(membersToInsert);
      console.log(`Successfully added ${janArogyaSamitiMembers.length} members to Jan Arogya Samiti`);
    }

    // Now migrate Krishi Vikas Samiti members
    console.log('\n=== Migrating Krishi Vikas Samiti Members ===');
    const krishiVikasPath = 'krishivikassamiti';
    
    // Find or create the committee
    let krishiVikasCommittee = await Committee.findOne({ path: krishiVikasPath });
    if (!krishiVikasCommittee) {
      krishiVikasCommittee = await Committee.create({
        title: 'Krishi Vikas Samiti',
        titleMarathi: 'कृषी विकास समिती',
        path: krishiVikasPath,
        route: '/samiti/krishiVikasSamiti',
        description: 'Agriculture Development Committee',
        descriptionMarathi: 'कृषी विकास समिती',
        isActive: true,
        order: 2
      });
      console.log('Created committee: Krishi Vikas Samiti');
    } else {
      console.log('Found existing committee: Krishi Vikas Samiti');
    }

    // Check if members already exist
    const existingKrishiVikasMembers = await CommitteeMember.find({ committeePath: krishiVikasPath });
    
    if (existingKrishiVikasMembers.length > 0) {
      console.log(`Found ${existingKrishiVikasMembers.length} existing members for Krishi Vikas Samiti`);
      
      // Check which members are missing based on srNo
      const existingSrNos = new Set(existingKrishiVikasMembers.map(m => m.srNo));
      const missingMembers = krishiVikasSamitiMembers.filter(m => !existingSrNos.has(m.srNo));
      
      if (missingMembers.length > 0) {
        console.log(`Adding ${missingMembers.length} missing members...`);
        const membersToInsert = missingMembers.map(member => ({
          committeeId: krishiVikasCommittee._id,
          committeePath: krishiVikasPath,
          ...member,
          isActive: true
        }));
        
        await CommitteeMember.insertMany(membersToInsert);
        console.log(`Successfully added ${missingMembers.length} members to Krishi Vikas Samiti`);
      } else {
        console.log('All members already exist. No new members to add.');
      }
    } else {
      // No members exist, insert all
      console.log('No existing members found. Adding all 15 members...');
      const membersToInsert = krishiVikasSamitiMembers.map(member => ({
        committeeId: krishiVikasCommittee._id,
        committeePath: krishiVikasPath,
        ...member,
        isActive: true
      }));
      
      await CommitteeMember.insertMany(membersToInsert);
      console.log(`Successfully added ${krishiVikasSamitiMembers.length} members to Krishi Vikas Samiti`);
    }

    // Now migrate Shaley Vyavasthapan Samiti members
    console.log('\n=== Migrating Shaley Vyavasthapan Samiti Members ===');
    const shaleyPath = 'shaleyvyavasthapansamiti';
    
    // Find or create the committee
    let shaleyCommittee = await Committee.findOne({ path: shaleyPath });
    if (!shaleyCommittee) {
      shaleyCommittee = await Committee.create({
        title: 'Shaley Vyavasthapan Samiti',
        titleMarathi: 'शालेय व्यवस्थापन समिती',
        path: shaleyPath,
        route: '/samiti/shaleyVyavasthapanSamiti',
        description: 'School Management Committee',
        descriptionMarathi: 'शालेय व्यवस्थापन समिती',
        isActive: true,
        order: 3
      });
      console.log('Created committee: Shaley Vyavasthapan Samiti');
    } else {
      console.log('Found existing committee: Shaley Vyavasthapan Samiti');
    }

    // Check if members already exist
    const existingShaleyMembers = await CommitteeMember.find({ committeePath: shaleyPath });
    
    if (existingShaleyMembers.length > 0) {
      console.log(`Found ${existingShaleyMembers.length} existing members for Shaley Vyavasthapan Samiti`);
      
      // Check which members are missing based on srNo
      const existingSrNos = new Set(existingShaleyMembers.map(m => m.srNo));
      const missingMembers = shaleyVyavasthapanSamitiMembers.filter(m => !existingSrNos.has(m.srNo));
      
      if (missingMembers.length > 0) {
        console.log(`Adding ${missingMembers.length} missing members...`);
        const membersToInsert = missingMembers.map(member => ({
          committeeId: shaleyCommittee._id,
          committeePath: shaleyPath,
          ...member,
          isActive: true
        }));
        
        await CommitteeMember.insertMany(membersToInsert);
        console.log(`Successfully added ${missingMembers.length} members to Shaley Vyavasthapan Samiti`);
      } else {
        console.log('All members already exist. No new members to add.');
      }
    } else {
      // No members exist, insert all
      console.log('No existing members found. Adding all 33 members...');
      const membersToInsert = shaleyVyavasthapanSamitiMembers.map(member => ({
        committeeId: shaleyCommittee._id,
        committeePath: shaleyPath,
        ...member,
        isActive: true
      }));
      
      await CommitteeMember.insertMany(membersToInsert);
      console.log(`Successfully added ${shaleyVyavasthapanSamitiMembers.length} members to Shaley Vyavasthapan Samiti`);
    }

    // Now migrate Rasta Arakha Samiti members
    console.log('\n=== Migrating Rasta Arakha Samiti Members ===');
    const rastaPath = 'rastaarakhasamiti';
    
    // Find or create the committee
    let rastaCommittee = await Committee.findOne({ path: rastaPath });
    if (!rastaCommittee) {
      rastaCommittee = await Committee.create({
        title: 'Rasta Arakha Samiti',
        titleMarathi: 'रस्ता आराखडा समिती',
        path: rastaPath,
        route: '/samiti/rastaArakhaSamiti',
        description: 'Road Development Committee',
        descriptionMarathi: 'रस्ता विकास समिती',
        isActive: true,
        order: 4
      });
      console.log('Created committee: Rasta Arakha Samiti');
    } else {
      console.log('Found existing committee: Rasta Arakha Samiti');
    }

    // Check if members already exist
    const existingRastaMembers = await CommitteeMember.find({ committeePath: rastaPath });
    
    if (existingRastaMembers.length > 0) {
      console.log(`Found ${existingRastaMembers.length} existing members for Rasta Arakha Samiti`);
      
      // Check which members are missing based on srNo
      const existingSrNos = new Set(existingRastaMembers.map(m => m.srNo));
      const missingMembers = rastaArakhaSamitiMembers.filter(m => !existingSrNos.has(m.srNo));
      
      if (missingMembers.length > 0) {
        console.log(`Adding ${missingMembers.length} missing members...`);
        const membersToInsert = missingMembers.map(member => ({
          committeeId: rastaCommittee._id,
          committeePath: rastaPath,
          ...member,
          isActive: true
        }));
        
        await CommitteeMember.insertMany(membersToInsert);
        console.log(`Successfully added ${missingMembers.length} members to Rasta Arakha Samiti`);
      } else {
        console.log('All members already exist. No new members to add.');
      }
    } else {
      // No members exist, insert all
      console.log('No existing members found. Adding all 10 members...');
      const membersToInsert = rastaArakhaSamitiMembers.map(member => ({
        committeeId: rastaCommittee._id,
        committeePath: rastaPath,
        ...member,
        isActive: true
      }));
      
      await CommitteeMember.insertMany(membersToInsert);
      console.log(`Successfully added ${rastaArakhaSamitiMembers.length} members to Rasta Arakha Samiti`);
    }

    // Now migrate Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra members
    console.log('\n=== Migrating Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra Members ===');
    const mahimPath = 'mahimalyadeviloksanchalitsadhankendra';
    
    // Find or create the committee
    let mahimCommittee = await Committee.findOne({ path: mahimPath });
    if (!mahimCommittee) {
      mahimCommittee = await Committee.create({
        title: 'Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra',
        titleMarathi: 'माहीम अहिल्यादेवी लोक संचलित साधन केंद्र',
        path: mahimPath,
        route: '/samiti/mahimAhilyadeviLokSanchalitSadhanKendra',
        description: 'Mahim Ahilyadevi Public Managed Resource Center',
        descriptionMarathi: 'माहीम अहिल्यादेवी लोक संचलित साधन केंद्र',
        isActive: true,
        order: 5
      });
      console.log('Created committee: Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra');
    } else {
      console.log('Found existing committee: Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra');
    }

    // Check if members already exist
    const existingMahimMembers = await CommitteeMember.find({ committeePath: mahimPath });
    
    if (existingMahimMembers.length > 0) {
      console.log(`Found ${existingMahimMembers.length} existing members for Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra`);
      
      // Check which members are missing based on srNo
      const existingSrNos = new Set(existingMahimMembers.map(m => m.srNo));
      const missingMembers = mahimAhilyadeviMembers.filter(m => !existingSrNos.has(m.srNo));
      
      if (missingMembers.length > 0) {
        console.log(`Adding ${missingMembers.length} missing members...`);
        const membersToInsert = missingMembers.map(member => ({
          committeeId: mahimCommittee._id,
          committeePath: mahimPath,
          ...member,
          isActive: true
        }));
        
        await CommitteeMember.insertMany(membersToInsert);
        console.log(`Successfully added ${missingMembers.length} members to Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra`);
      } else {
        console.log('All members already exist. No new members to add.');
      }
    } else {
      // No members exist, insert all
      console.log('No existing members found. Adding all 12 members...');
      const membersToInsert = mahimAhilyadeviMembers.map(member => ({
        committeeId: mahimCommittee._id,
        committeePath: mahimPath,
        ...member,
        isActive: true
      }));
      
      await CommitteeMember.insertMany(membersToInsert);
      console.log(`Successfully added ${mahimAhilyadeviMembers.length} members to Mahim Ahilyadevi Lok Sanchalit Sadhan Kendra`);
    }

    // Now migrate Gram Sansadhan Gat members
    console.log('\n=== Migrating Gram Sansadhan Gat Members ===');
    const gramPath = 'gramsansadhangat';
    
    // Find or create the committee
    let gramCommittee = await Committee.findOne({ path: gramPath });
    if (!gramCommittee) {
      gramCommittee = await Committee.create({
        title: 'Gram Sansadhan Gat',
        titleMarathi: 'ग्रामसंसाधन गट',
        path: gramPath,
        route: '/samiti/gramSansadhanGat',
        description: 'Village Resource Group',
        descriptionMarathi: 'ग्रामसंसाधन गट',
        isActive: true,
        order: 6
      });
      console.log('Created committee: Gram Sansadhan Gat');
    } else {
      console.log('Found existing committee: Gram Sansadhan Gat');
    }

    // Check if members already exist
    const existingGramMembers = await CommitteeMember.find({ committeePath: gramPath });
    
    if (existingGramMembers.length > 0) {
      console.log(`Found ${existingGramMembers.length} existing members for Gram Sansadhan Gat`);
      
      // Check which members are missing based on srNo
      const existingSrNos = new Set(existingGramMembers.map(m => m.srNo));
      const missingMembers = gramSansadhanGatMembers.filter(m => !existingSrNos.has(m.srNo));
      
      if (missingMembers.length > 0) {
        console.log(`Adding ${missingMembers.length} missing members...`);
        const membersToInsert = missingMembers.map(member => ({
          committeeId: gramCommittee._id,
          committeePath: gramPath,
          ...member,
          isActive: true
        }));
        
        await CommitteeMember.insertMany(membersToInsert);
        console.log(`Successfully added ${missingMembers.length} members to Gram Sansadhan Gat`);
      } else {
        console.log('All members already exist. No new members to add.');
      }
    } else {
      // No members exist, insert all
      console.log('No existing members found. Adding all 30 members...');
      const membersToInsert = gramSansadhanGatMembers.map(member => ({
        committeeId: gramCommittee._id,
        committeePath: gramPath,
        ...member,
        isActive: true
      }));
      
      await CommitteeMember.insertMany(membersToInsert);
      console.log(`Successfully added ${gramSansadhanGatMembers.length} members to Gram Sansadhan Gat`);
    }

    console.log('\n=== Migration completed successfully! ===');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateCommitteeMembers();

