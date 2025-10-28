import { useLanguage } from "../hooks/useLanguage";

export default function ShaleyVyavasthapanSamitiPage() {
  const { t, language } = useLanguage();
  

  // Committee members data for Secondary School
  const secondarySchoolMembers = [
    {
      srNo: 1,
      name: language === 'mr' ? "श्री. रवींद्र रामनाथ पगार" : "Shri. Ravindra Ramnath Pagar",
      designation: language === 'mr' ? "अध्यक्ष" : "Chairman"
    },
    {
      srNo: 2,
      name: language === 'mr' ? "श्री. शरद किसान पगार" : "Shri. Sharad Kisan Pagar",
      designation: language === 'mr' ? "उपाध्यक्ष" : "Vice Chairman"
    },
    {
      srNo: 3,
      name: language === 'mr' ? "श्री. नामदेव तुकाराम पगार" : "Shri. Namdev Tukaram Pagar",
      designation: language === 'mr' ? "तज्ञ संचालक" : "Expert Director"
    },
    {
      srNo: 4,
      name: language === 'mr' ? "श्री. पुंजाराम काशिनाथ सूर्यवंशी" : "Shri. Punjaram Kashinath Suryavanshi",
      designation: language === 'mr' ? "सचिव" : "Secretary"
    },
    {
      srNo: 5,
      name: language === 'mr' ? "श्री. चंद्रभान तुळशीराम पगार" : "Shri. Chandrabhan Tulshiram Pagar",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 6,
      name: language === 'mr' ? "श्री. सोपान तुळशीराम पगार" : "Shri. Sopan Tulshiram Pagar",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 7,
      name: language === 'mr' ? "श्री. नंदकिशोर गंगाधर सायकर" : "Shri. Nandkishor Gangadhar Saykar",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 8,
      name: language === 'mr' ? "श्री. सुकदेव प्रभाकर घोरपडे" : "Shri. Sukdev Prabhakar Ghorpade",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 9,
      name: language === 'mr' ? "श्री. बाबाजी भिमाजी पगार" : "Shri. Babaji Bhimaji Pagar",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 10,
      name: language === 'mr' ? "श्री. दत्तू माधव पगार" : "Shri. Dattu Madhav Pagar",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 11,
      name: language === 'mr' ? "श्री. अजय त्रंबक पगार" : "Shri. Ajay Trimbak Pagar",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 12,
      name: language === 'mr' ? "श्री. शिवाजी गोपाळा पगार" : "Shri. Shivaji Gopala Pagar",
      designation: language === 'mr' ? "पा. सदस्य" : "Parent Member"
    },
    {
      srNo: 13,
      name: language === 'mr' ? "श्री. कृष्णा दिनकर पगार" : "Shri. Krishna Dinkar Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 14,
      name: language === 'mr' ? "श्री. गोविंद तुळशीराम पगार" : "Shri. Govind Tulshiram Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 15,
      name: language === 'mr' ? "श्री. संजय माधव पोटे" : "Shri. Sanjay Madhav Pote",
      designation: language === 'mr' ? "शि. सदस्य" : "Teacher Member"
    },
    {
      srNo: 16,
      name: language === 'mr' ? "कु. अविष्कार गणपत सायकर" : "Kum. Avishkar Ganpat Saykar",
      designation: language === 'mr' ? "वि. सदस्य" : "Student Member"
    },
    {
      srNo: 17,
      name: language === 'mr' ? "कु. सुजाता सिद्धार्थ केदारे" : "Kum. Sujata Siddharth Kedare",
      designation: language === 'mr' ? "वि. सदस्य" : "Student Member"
    },
    {
      srNo: 18,
      name: language === 'mr' ? "सौ. कलावती संतोष सोनवणे" : "Smt. Kalavati Santosh Sonavane",
      designation: language === 'mr' ? "महिला सदस्या" : "Women Member"
    }
  ];

  // Committee members data for Primary School
  const primarySchoolMembers = [
    {
      srNo: 1,
      name: language === 'mr' ? "श्री. बापू रामभाऊ पगार" : "Shri. Bapu Rambahau Pagar",
      designation: language === 'mr' ? "अध्यक्ष" : "Chairman"
    },
    {
      srNo: 2,
      name: language === 'mr' ? "श्री. लक्ष्मण तुळशीराम पगार" : "Shri. Lakshman Tulshiram Pagar",
      designation: language === 'mr' ? "उपाध्यक्ष" : "Vice Chairman"
    },
    {
      srNo: 3,
      name: language === 'mr' ? "श्री. नामदेव कोंडाजी पगार" : "Shri. Namdev Kondaji Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 4,
      name: language === 'mr' ? "सौ. सुनिता बाळासाहेब पगार" : "Smt. Sunita Balasaheb Pagar",
      designation: language === 'mr' ? "सदस्या" : "Member"
    },
    {
      srNo: 5,
      name: language === 'mr' ? "श्री. राजेंद्र निवृत्ती पगार" : "Shri. Rajendra Nivruti Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 6,
      name: language === 'mr' ? "श्री. सोपान तुळशीराम पगार" : "Shri. Sopan Tulshiram Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 7,
      name: language === 'mr' ? "सौ. श्वेता सोमनाथ पगार" : "Smt. Shweta Somanath Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 8,
      name: language === 'mr' ? "सौ. भाग्यश्री संदीप पगार" : "Smt. Bhagyshri Sandeep Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 9,
      name: language === 'mr' ? "श्री. योगेश रामनाथ पगार" : "Shri. Yogesh Ramnath Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 10,
      name: language === 'mr' ? "सौ. सोनाली अमित केदारे" : "Smt. Sonali Amit Kedare",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 11,
      name: language === 'mr' ? "सौ. संगीता सुनील पगार" : "Smt. Sangita Sunil Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 12,
      name: language === 'mr' ? "सौ. रत्न आत्माराम पगार" : "Smt. Ratna Atmaram Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 13,
      name: language === 'mr' ? "श्री. सोमनाथ बाळासाहेब पगार" : "Shri. Somanath Balasaheb Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 14,
      name: language === 'mr' ? "श्री. रामनाथ गंगाधर पगार" : "Shri. Ramnath Gangadhar Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member"
    },
    {
      srNo: 15,
      name: language === 'mr' ? "श्री. राजू भिला आहेर" : "Shri. Raju Bhila Aher",
      designation: language === 'mr' ? "सदस्य सचिव" : "Member Secretary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-4 sm:px-0">{t('samiti.shaleyVyavasthapanSamiti.pageTitle')}</h1>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">{t('samiti.shaleyVyavasthapanSamiti.description')}</p>
        </div>

        <div className="flex justify-center">
          {/* Main Content - Centered */}
          <div className="w-full max-w-4xl space-y-6 md:space-y-8">
            {/* Committee Information */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">📋</span>
                </div>
                {t('samiti.shaleyVyavasthapanSamiti.committeeInfo')}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">{t('samiti.shaleyVyavasthapanSamiti.description')}</p>
                <p className="mb-4">{t('samiti.shaleyVyavasthapanSamiti.additionalInfo')}</p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">🎯</span>
                </div>
                {t('samiti.shaleyVyavasthapanSamiti.responsibilities')}
              </h2>
              <ul className="space-y-3">
                {t('samiti.shaleyVyavasthapanSamiti.responsibilitiesList', []).map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secondary School Committee Members Table */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">🏫</span>
                </div>
                माध्यमिक विद्यालय खडक ओझर ता. चांदवड जि.नाशिक
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6 text-center px-4 sm:px-0">शालेय व्यवस्थापन समिती सन -२०२५-२६</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-xs sm:text-sm">{language === 'mr' ? 'अ. नं.' : 'Sr. No.'}</th>
                      <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-xs sm:text-sm">{language === 'mr' ? 'प्रतिनिधी' : 'Representative'}</th>
                      <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-xs sm:text-sm">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondarySchoolMembers.map((member) => (
                      <tr key={member.srNo} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-200">
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium text-center">
                          {member.srNo}
                        </td>
                          <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">
                          {member.name}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-1 sm:px-2 py-1 rounded-full text-xs font-medium">
                            {member.designation}
                            </span>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Primary School Committee Members Table */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">📚</span>
                </div>
                जिल्हा परिषद आदर्श प्राथमिक शाळा खडक ओझर ता. चांदवड जि.नाशिक
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6 text-center px-4 sm:px-0">शालेय व्यवस्थापन समिती सन -२०२५-२६</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-xs sm:text-sm">{language === 'mr' ? 'अ. नं.' : 'Sr. No.'}</th>
                      <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-xs sm:text-sm">{language === 'mr' ? 'प्रतिनिधी' : 'Representative'}</th>
                      <th className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-xs sm:text-sm">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {primarySchoolMembers.map((member) => (
                      <tr key={member.srNo} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-200">
                        <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium text-center text-xs sm:text-sm">
                          {member.srNo}
                        </td>
                        <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-gray-800 font-medium text-xs sm:text-sm">
                          {member.name}
                        </td>
                        <td className="border border-gray-200 px-2 sm:px-4 py-2 sm:py-3 text-gray-700 text-xs sm:text-sm">
                          <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-1 sm:px-2 py-1 rounded-full text-xs font-medium">
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