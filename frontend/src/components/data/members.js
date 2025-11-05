// Static member data for the Grampanchayat
export const getAllMembers = (lang = 'mr') => {
  const members = [
    {
      _id: '1',
      memberName: lang === 'mr' ? 'सागर वसंतराव पगार' : 'Sagar Vasantrao Pagar',
      memberDesignation: lang === 'mr' ? 'सरपंच' : 'Sarpanch (Head of Village Council)',
      imageUrl: '/images/members/sarpanch.jpg',
      order: 1,
      isActive: true
    },
    {
      _id: '2',
      memberName: lang === 'mr' ? 'गोविंद तुळशीराम पगार' : 'Govind Tulshiram Pagar',
      memberDesignation: lang === 'mr' ? 'उपसरपंच' : 'Deputy Sarpanch (Deputy Head of Village Council)',
      imageUrl: '/images/members/upsarpanch.jpg',
      order: 2,
      isActive: true
    },
    {
      _id: '3',
      memberName: lang === 'mr' ? 'हर्षद जनार्दन पगार' : 'Harshad Janardan Pagar',
      memberDesignation: lang === 'mr' ? 'सदस्य' : 'Member',
      imageUrl: '/images/members/harshad.jpg',
      order: 3,
      isActive: true
    },
    {
      _id: '4',
      memberName: lang === 'mr' ? 'देविदास तात्याबा पगार' : 'Devidas Tatyaba Pagar',
      memberDesignation: lang === 'mr' ? 'सदस्य' : 'Member',
      imageUrl: '/images/members/devidas.jpg',
      order: 4,
      isActive: true
    },
    {
      _id: '5',
      memberName: lang === 'mr' ? 'शरद रामचंद्र भावर' : 'Sharad Ramchandra Bhavar',
      memberDesignation: lang === 'mr' ? 'सदस्य' : 'Member',
      imageUrl: '/images/members/sharad.jpg',
      order: 5,
      isActive: true
    },
    {
      _id: '6',
      memberName: lang === 'mr' ? 'शिवाजी चिंधू घोधडे' : 'Shivaji Chindhu Ghodhade',
      memberDesignation: lang === 'mr' ? 'सदस्य' : 'Member',
      imageUrl: '/images/members/shivajighodke.jpg',
      order: 6,
      isActive: true
    },
    {
      _id: '7',
      memberName: lang === 'mr' ? 'सारिका अशोक पगार' : 'Sarika Ashok Pagar',
      memberDesignation: lang === 'mr' ? 'महिला सदस्य' : 'Member (Female)',
      imageUrl: '/images/members/sarika.jpg',
      order: 7,
      isActive: true
    },
    {
      _id: '8',
      memberName: lang === 'mr' ? 'रत्ना आत्माराम पगार' : 'Ratna Atmaram Pagar',
      memberDesignation: lang === 'mr' ? 'महिला सदस्य' : 'Member (Female)',
      imageUrl: '/images/members/ratna.jpg',
      order: 8,
      isActive: true
    },
    {
      _id: '9',
      memberName: lang === 'mr' ? 'सोनाली सुनील भावर' : 'Sonali Sunil Bhavar',
      memberDesignation: lang === 'mr' ? 'महिला सदस्य' : 'Member (Female)',
      imageUrl: '/images/members/sonali.jpg',
      order: 9,
      isActive: true
    },
    {
      _id: '10',
      memberName: lang === 'mr' ? 'अरुणा खंडेराव पगार' : 'Aruna Khanderao Pagar',
      memberDesignation: lang === 'mr' ? 'महिला सदस्य' : 'Member (Female)',
      imageUrl: '/images/members/aruna.jpg',
      order: 10,
      isActive: true
    },
    {
      _id: '11',
      memberName: lang === 'mr' ? 'लक्ष्मीबाई चहादु सुर्यवंशी' : 'Laxmibai Chahadu Suryawanshi',
      memberDesignation: lang === 'mr' ? 'महिला सदस्य' : 'Member (Female)',
      imageUrl: '/images/members/laxmibai.jpg',
      order: 11,
      isActive: true
    },
    {
      _id: '12',
      memberName: lang === 'mr' ? 'प्रियांका शिवनाथ केदारे' : 'Priyanka Shivanath Kedare',
      memberDesignation: lang === 'mr' ? 'महिला सदस्य' : 'Member (Female)',
      imageUrl: '/images/members/priyanka.jpg',
      order: 12,
      isActive: true
    },
    {
      _id: '13',
      memberName: lang === 'mr' ? 'रोशन बळवंत सूर्यवंशी' : 'Roshan Balwant Suryavanshi',
      memberDesignation: lang === 'mr' ? 'ग्रामपंचायत अधिकारी' : 'Gram Panchayat Officer',
      imageUrl: '/images/members/member1.jpg',
      order: 13,
      isActive: true
    },
    {
      _id: '14',
      memberName: lang === 'mr' ? 'सुशील राजेंद्र केदारे' : 'Sushil Rajendra Kedare',
      memberDesignation: lang === 'mr' ? 'संगणक ऑपरेटर' : 'Computer Operator',
      imageUrl: '/images/members/member2.jpg',
      order: 14,
      isActive: true
    },
    {
      _id: '15',
      memberName: lang === 'mr' ? 'गणेश केदू पगार' : 'Ganesh Kedu Pagar',
      memberDesignation: lang === 'mr' ? 'लिपिक वसुली कारकून' : 'Clerk Vasuli Karkun',
      imageUrl: '/images/members/गणेश केदू पगार.jpg',
      order: 15,
      isActive: true
    },
    {
      _id: '16',
      memberName: lang === 'mr' ? 'कैलास रामदास पगार' : 'Kailas Ramdas Pagar',
      memberDesignation: lang === 'mr' ? 'ग्राम रोजगार सहायक' : 'Gram Rojgar Sahayak',
      imageUrl: '/images/members/कैलास रामदास पगार.jpg',
      order: 16,
      isActive: true
    },
    {
      _id: '17',
      memberName: lang === 'mr' ? 'साहेबराव निवृत्ती कंक' : 'Sahebrao Nivritti Kank',
      memberDesignation: lang === 'mr' ? 'पाणीपुरवठा कर्मचारी' : 'Water Supply Employee',
      imageUrl: '/images/members/member5.jpg',
      order: 17,
      isActive: true
    }
  ];

  return members.filter(member => member.isActive).sort((a, b) => a.order - b.order);
};

// Member image type definition
export const MemberImage = {
  _id: String,
  memberName: String,
  memberDesignation: String,
  imageUrl: String,
  order: Number,
  isActive: Boolean
};
