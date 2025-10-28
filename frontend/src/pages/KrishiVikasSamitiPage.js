import { useLanguage } from "../hooks/useLanguage";

export default function KrishiVikasSamitiPage() {
  const { t, language } = useLanguage();

  // Committee members data for 2025-26
  const committeeMembers = [
    {
      srNo: 1,
      name: language === 'mr' ? "श्री. सागर वसंतराव पगार" : "Shri. Sagar Vasantrao Pagar",
      position: language === 'mr' ? "सरपंच" : "Sarpanch",
      designation: language === 'mr' ? "अध्यक्ष" : "Chairman",
      mobile: ""
    },
    {
      srNo: 2,
      name: language === 'mr' ? "श्री. हर्षद जनार्दन पगार" : "Shri. Harshad Janardan Pagar",
      position: language === 'mr' ? "उपसरपंच" : "Up-Sarpanch",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 3,
      name: language === 'mr' ? "सौ. प्रियांका शिवनाथ केदारे" : "Smt. Priyanka Shivnath Kedare",
      position: language === 'mr' ? "ग्रा. पं. सदस्य" : "Gram Panchayat Member",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 4,
      name: language === 'mr' ? "सौ. लाक्षिमिबाई चहादू सूर्यवंशी" : "Smt. Lakshmibai Chahadu Suryavanshi",
      position: language === 'mr' ? "ग्रा. पं. सदस्य" : "Gram Panchayat Member",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 5,
      name: language === 'mr' ? "श्री. देविदास तात्याबा पगार" : "Shri. Devidas Tatya Pagar",
      position: language === 'mr' ? "ग्रा. पं. सदस्य" : "Gram Panchayat Member",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 6,
      name: language === 'mr' ? "श्री. गोविंद तुळशीराम पगार" : "Shri. Govind Tulshiram Pagar",
      position: language === 'mr' ? "ग्रा. पं. सदस्य" : "Gram Panchayat Member",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 7,
      name: language === 'mr' ? "सौ. रत्ना आत्माराम पगार" : "Smt. Ratna Atmaram Pagar",
      position: language === 'mr' ? "ग्रा. पं. सदस्य" : "Gram Panchayat Member",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 8,
      name: language === 'mr' ? "श्री. बाजीराव खंडेराव पगार" : "Shri. Bajirao Khanderao Pagar",
      position: language === 'mr' ? "विविध सह.संस्था अध्यक्ष" : "Various Co-operative Society President",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 9,
      name: language === 'mr' ? "सौ. सारिका अशोक पगार" : "Smt. Sarika Ashok Pagar",
      position: language === 'mr' ? "शेतकरी उत्पादक गट प्रतिनिधी" : "Farmer Producer Group Representative",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 10,
      name: language === 'mr' ? "सौ. कविता किशोर पगार" : "Smt. Kavita Kishor Pagar",
      position: language === 'mr' ? "महिला बचत गट प्रतिनिधी" : "Women's Savings Group Representative",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 11,
      name: language === 'mr' ? "श्री. भाऊलाल तात्याबा पगार" : "Shri. Bhaulal Tatya Pagar",
      position: language === 'mr' ? "कृषी पूरक व्यवसाय शेतकरी" : "Agricultural Supplementary Business Farmer",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 12,
      name: language === 'mr' ? "सौ. कावेरी योगेश पगार" : "Smt. Kaveri Yogesh Pagar",
      position: language === 'mr' ? "कृषी पूरक व्यवसाय शेतकरी" : "Agricultural Supplementary Business Farmer",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 13,
      name: language === 'mr' ? "श्री. नितीन गंगाधर एखंडे" : "Shri. Nitin Gangadhar Ekhande",
      position: language === 'mr' ? "ग्राम महसूल अधिकारी" : "Village Revenue Officer",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 14,
      name: language === 'mr' ? "सौ. वि.जाधव" : "Smt. V. Jadhav",
      position: language === 'mr' ? "कृषी सहायक अधिकारी" : "Agriculture Assistant Officer",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    },
    {
      srNo: 15,
      name: language === 'mr' ? "श्री. रोशन बळवंत सूर्यवंशी" : "Shri. Roshan Balwant Suryavanshi",
      position: language === 'mr' ? "ग्रामपंचायत अधिकारी" : "Gram Panchayat Officer",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: ""
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('samiti.krishiVikasSamiti.pageTitle')}</h1>
          <p className="text-lg text-green-600 font-medium mb-2">{t('samiti.krishiVikasSamiti.subtitle')}</p>
          <p className="text-lg text-gray-600">{t('samiti.krishiVikasSamiti.description')}</p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">🌾</span>
                </div>
                {t('samiti.krishiVikasSamiti.members')} - सन २०२५-२६
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'अ. नं.' : 'Sr. No.'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'सदस्यांचे नावे' : 'Member Names'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'प्रवर्ग' : 'Category'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {committeeMembers.map((member) => (
                      <tr key={member.srNo} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-200">
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium text-center">
                          {member.srNo}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">
                          {member.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {member.position}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          <span className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {member.designation}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}