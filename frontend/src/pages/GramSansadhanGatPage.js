import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { API_URL } from "../utils/config";

export default function GramSansadhanGatPage() {
  const { t, language } = useLanguage();
  const [committeeMembers, setCommitteeMembers] = useState([]);

  // Fetch committee members from API
  useEffect(() => {
    // Static committee members data (fallback)
    const staticMembers = [
    {
      srNo: 1,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. सागर वसंतराव पगार" : "Shri. Sagar Vasantrao Pagar",
      designation: language === 'mr' ? "सरपंच" : "Sarpanch",
      category: language === 'mr' ? "अध्यक्ष" : "Chairman",
      contact: "८८०५८१५६७१"
    },
    {
      srNo: 2,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. हर्षद जनार्दन पगार" : "Shri. Harshad Janardan Pagar",
      designation: language === 'mr' ? "उपसरपंच" : "Up-Sarpanch",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "८८०६०१८७९३"
    },
    {
      srNo: 3,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. प्रियांका शिवनाथ केदारे" : "Smt. Priyanka Shivnath Kedare",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९८२२८२७९१९"
    },
    {
      srNo: 4,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. लक्षिमिबाई चहादू सूर्यवंशी" : "Smt. Lakshmibai Chahadu Suryavanshi",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: ""
    },
    {
      srNo: 5,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. सारिका अशोक पगार" : "Smt. Sarika Ashok Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९८३४७६३७२३"
    },
    {
      srNo: 6,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. अरुणा खंडेराव पगार" : "Smt. Aruna Khanderao Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९३७३२२५१२०"
    },
    {
      srNo: 7,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. रत्ना आत्माराम पगार" : "Smt. Ratna Atmaram Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "७६२०९१३४१७"
    },
    {
      srNo: 8,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. सोनाली सुनील भवर" : "Smt. Sonali Sunil Bhavar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९८५०२६१०६७"
    },
    {
      srNo: 9,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. गोविंद तुळशीराम पगार" : "Shri. Govind Tulshiram Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "७९७२१९४३०२"
    },
    {
      srNo: 10,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. देविदास तात्याबा पगार" : "Shri. Devidas Tatya Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९५१८३५७४०५"
    },
    {
      srNo: 11,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. शरद रामचंद्र भवर" : "Shri. Sharad Ramchandra Bhavar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सचिव" : "Secretary",
      contact: "९५४५३४७६२६"
    },
    {
      srNo: 12,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. शिवाजी चिंधू गोधडे" : "Shri. Shivaji Chindhu Godhade",
      designation: language === 'mr' ? "सदस्य" : "Member",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९३५९४१०२१६"
    },
    {
      srNo: 13,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. रोषण बळवंत सूर्यवंशी" : "Shri. Roshan Balwant Suryavanshi",
      designation: language === 'mr' ? "ग्रामपंचायत अधिकारी" : "Gram Panchayat Officer",
      category: "",
      contact: "८२७५५८६२६४"
    },
    {
      srNo: 14,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. साहेबराव निवृत्ती कंक" : "Shri. Sahebrao Nivruti Kank",
      designation: language === 'mr' ? "पाणीपुरवठा कर्मचारी" : "Water Supply Employee",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "८०१००४५७६१"
    },
    {
      srNo: 15,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. गणेश केदू पगार" : "Shri. Ganesh Kedu Pagar",
      designation: language === 'mr' ? "ग्रा.प. लिपिक" : "Gram Panchayat Clerk",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९७६४२६८१९३"
    },
    {
      srNo: 16,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. सुशील राजेंद्र केदारे" : "Shri. Sushil Rajendra Kedare",
      designation: language === 'mr' ? "संगणक परिचालक" : "Computer Operator",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "८८५०३६६२४८"
    },
    {
      srNo: 17,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. कैलास रामनाथ पगार" : "Shri. Kailas Ramnath Pagar",
      designation: language === 'mr' ? "ग्रामरोजगार सेवक" : "Village Employment Worker",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "८८३०४३५७९३"
    },
    {
      srNo: 18,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. सुलोचना भोये" : "Shri. Sulochana Bhoye",
      designation: language === 'mr' ? "आरोग्य सेविका" : "Health Worker",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "८६६८३६१९२३"
    },
    {
      srNo: 19,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. राजू भिला आहेर" : "Shri. Raju Bhila Aher",
      designation: language === 'mr' ? "मुख्या जि.प.प्रा.शाळा खडक ओझर" : "Head Teacher Z.P. Primary School Khadak Ozar",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९७६७०१३८६२"
    },
    {
      srNo: 20,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. हिरे" : "Shri. Hire",
      designation: language === 'mr' ? "मुख्याध्यापक जि.प.प्रा.शाळा" : "Principal Z.P. Primary School",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९४०४८०५२५७"
    },
    {
      srNo: 21,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. अशोक सोमवंशी सर" : "Shri. Ashok Somvanshi Sir",
      designation: language === 'mr' ? "मुख्याध्यापक मा. विद्यालय .शाळा" : "Principal Secondary School",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९४२१५६२८६६"
    },
    {
      srNo: 22,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. ताराबाई दत्तू पगार" : "Smt. Tarabai Dattu Pagar",
      designation: language === 'mr' ? "अंगणवाडी कार्यकर्ती खडक ओझर" : "Anganwadi Worker Khadak Ozar",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "७४९८९६५०६४"
    },
    {
      srNo: 23,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. छाया अंबादास पगार" : "Smt. Chhaya Ambadas Pagar",
      designation: language === 'mr' ? "अंगणवाडी कार्यकर्ती खडक ओझर" : "Anganwadi Worker Khadak Ozar",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९८३४६०२४२९"
    },
    {
      srNo: 24,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. उषा विष्णू निकम" : "Smt. Usha Vishnu Nikam",
      designation: language === 'mr' ? "अंगणवाडी कार्यकर्ती गुऱ्हाळे" : "Anganwadi Worker Gurhale",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९०२२०१७८३१"
    },
    {
      srNo: 25,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. वैशाली बाळू पगार" : "Smt. Vaishali Balu Pagar",
      designation: language === 'mr' ? "आशा सेविका खडक ओझर" : "ASHA Worker Khadak Ozar",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "७०४०७४०३०२"
    },
    {
      srNo: 26,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. मंदाकिनी मयूर केदारे" : "Smt. Mandakini Mayur Kedare",
      designation: language === 'mr' ? "आशा सेविका खडक ओझर" : "ASHA Worker Khadak Ozar",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९३७०५८६५४६"
    },
    {
      srNo: 27,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. ज्योती विक्रम पगार" : "Smt. Jyoti Vikram Pagar",
      designation: language === 'mr' ? "अंगणवाडी कार्यकर्ती विष्णुवाडी" : "Anganwadi Worker Vishnuwadi",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९०२१२८६४०३"
    },
    {
      srNo: 28,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "सौ. मंगला भाऊसाहेब नागरे" : "Smt. Mangala Bhausaheb Nagre",
      designation: language === 'mr' ? "आशा सेविका खडक ओझर" : "ASHA Worker Khadak Ozar",
      category: language === 'mr' ? "सदस्य" : "Member",
      contact: "९३५९४५७१२०"
    },
    {
      srNo: 29,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. जयंत सोनवणे" : "Shri. Jayant Sonavane",
      designation: language === 'mr' ? "कृषी अधिकारी" : "Agriculture Officer",
      category: language === 'mr' ? "कृषी" : "Agriculture",
      contact: "९४२२५८९२९०"
    },
    {
      srNo: 30,
      taluka: language === 'mr' ? "चांदवड" : "Chandwad",
      grampanchayat: language === 'mr' ? "खडक ओझर" : "Khadak Ozar",
      name: language === 'mr' ? "श्री. नितीन गंगाधर एखांडे" : "Shri. Nitin Gangadhar Ekhande",
      designation: language === 'mr' ? "तलाठी" : "Talathi",
      category: language === 'mr' ? "तलाठी" : "Talathi",
      contact: "८७२६२४०२६४"
    }
  ];

    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_URL.COMMITTEE_MEMBERS}/committee/gramsansadhangat`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            // Transform API data to match component format
            const dynamicMembers = result.data.map(member => ({
              srNo: member.srNo,
              taluka: language === 'mr' ? member.talukaMarathi : member.taluka,
              grampanchayat: language === 'mr' ? member.grampanchayatMarathi : member.grampanchayat,
              name: language === 'mr' ? member.nameMarathi : member.name,
              designation: language === 'mr' ? member.designationMarathi : member.designation,
              category: language === 'mr' ? member.categoryMarathi : member.category,
              contact: member.contact || member.mobile || ''
            }));
            
            // Use API members (they now include the static members from database)
            setCommitteeMembers(dynamicMembers);
            return;
          }
        }
        // Fallback to static members
        setCommitteeMembers(staticMembers);
      } catch (error) {
        console.warn('Failed to fetch committee members from API, using static data:', error);
        // Fallback to static members
        setCommitteeMembers(staticMembers);
      }
    };

    fetchMembers();
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-4 sm:px-0">
            {t('samiti.gramSansadhanGat.pageTitle')}
          </h1>
          <p className="text-base sm:text-lg text-green-600 font-medium mb-2 px-4 sm:px-0">
            {t('samiti.gramSansadhanGat.subtitle')}
          </p>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            {t('samiti.gramSansadhanGat.description')}
          </p>
        </div>

        <div className="flex justify-center">
          {/* Main Content - Centered */}
          <div className="w-full max-w-4xl space-y-6 md:space-y-8">
            {/* Committee Information */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">🏘️</span>
                </div>
                {t('samiti.gramSansadhanGat.committeeInfo')}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">{t('samiti.gramSansadhanGat.description')}</p>
                <p className="mb-4">{t('samiti.gramSansadhanGat.additionalInfo')}</p>
              </div>
            </div>

            {/* Functions */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">⚡</span>
                </div>
                {t('samiti.gramSansadhanGat.functions')}
              </h2>
              <ul className="space-y-3">
                {(Array.isArray(t('samiti.gramSansadhanGat.functionsList')) ? t('samiti.gramSansadhanGat.functionsList') : []).map((func, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{func}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">🌱</span>
                </div>
                {t('samiti.gramSansadhanGat.activities')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Array.isArray(t('samiti.gramSansadhanGat.activitiesList')) ? t('samiti.gramSansadhanGat.activitiesList') : []).map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm font-bold">+</span>
                    </div>
                    <span className="text-gray-700 font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Committee Members Table */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">👥</span>
                </div>
                {t('samiti.gramSansadhanGat.members')}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{language === 'mr' ? 'अ.क्र' : 'Sr. No.'}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{language === 'mr' ? 'तालुक्याचे नाव' : 'Taluka Name'}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{language === 'mr' ? 'ग्रा.प.नाव' : 'Gram Panchayat Name'}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{language === 'mr' ? 'प्रशिक्षणार्थीचे संपूर्ण नाव' : 'Full Name of Trainee'}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{language === 'mr' ? 'जातीचा प्रवर्ग' : 'Category'}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{language === 'mr' ? 'संपर्क क्रमांक' : 'Contact Number'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {committeeMembers.map((member) => (
                      <tr key={member.srNo} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-200">
                        <td className="border border-gray-200 px-3 py-3 text-gray-800 font-medium text-center text-sm">
                          {member.srNo}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-800 font-medium text-sm">
                          {member.taluka}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-800 font-medium text-sm">
                          {member.grampanchayat}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-800 font-medium text-sm">
                          {member.name}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-700 text-sm">
                          <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {member.designation}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-700 text-sm">
                          {member.category && (
                            <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              {member.category}
                            </span>
                          )}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-600 text-sm">
                          {member.contact ? (
                            <a href={`tel:${member.contact}`} className="text-blue-600 hover:text-blue-800 font-medium">
                              {member.contact}
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                {t('samiti.gramSansadhanGat.benefits')}
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                {(Array.isArray(t('samiti.gramSansadhanGat.benefitsList')) ? t('samiti.gramSansadhanGat.benefitsList') : []).map((benefit, index) => (
                  <p key={index}>• {benefit}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
