import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { API_URL } from "../utils/config";

export default function MahimAhilyadeviLokSanchalitSadhanKendraPage() {
  const { t, language } = useLanguage();
  const [bachatGatData, setBachatGatData] = useState([]);

  // Fetch committee members from API
  useEffect(() => {
    // Static Bachat Gat (Savings Group) data (fallback)
    const staticBachatGatData = [
    {
      srNo: 1,
      groupName: "त्रीरश्मी गट",
      groupNameEn: "Trirashmi Group",
      presidentName: "मंगला गुलाब केदारे",
      presidentNameEn: "Mangala Gulab Kedare",
      secretary: "सुनिता संतोष केदारे",
      secretaryEn: "Sunita Santosh Kedare",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 2,
      groupName: "आंबेडकर बचत गट",
      groupNameEn: "Ambedkar Savings Group",
      presidentName: "छाया राजेंद्र केदारे",
      presidentNameEn: "Chhaya Rajendra Kedare",
      secretary: "भारताबाई बाबाजी पगार",
      secretaryEn: "Bharatabai Babaji Pagar",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 3,
      groupName: "आम्रपाली बचत गट",
      groupNameEn: "Amrapali Savings Group",
      presidentName: "चहाबाई नरहरी नागरे",
      presidentNameEn: "Chahabai Narhari Nagre",
      secretary: "अर्चना तुषार केदारे",
      secretaryEn: "Archana Tushar Kedare",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 4,
      groupName: "भगवती बचत गट",
      groupNameEn: "Bhagwati Savings Group",
      presidentName: "ज्योती हिरामण पगार",
      presidentNameEn: "Jyoti Hiraman Pagar",
      secretary: "उषा विष्णू निकम",
      secretaryEn: "Usha Vishnu Nikam",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 5,
      groupName: "यशोधरा बचत गट",
      groupNameEn: "Yashodhara Savings Group",
      presidentName: "अनिता संदीप केदारे",
      presidentNameEn: "Anita Sandeep Kedare",
      secretary: "सविता संजय केदारे",
      secretaryEn: "Savita Sanjay Kedare",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 6,
      groupName: "माता रमाई गट",
      groupNameEn: "Mata Ramai Group",
      presidentName: "प्रियंका शिवनाथ केदारे",
      presidentNameEn: "Priyanka Shivnath Kedare",
      secretary: "मंगला रामदास भदाणे",
      secretaryEn: "Mangala Ramdas Bhadane",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 7,
      groupName: "राजमाता बचत गट",
      groupNameEn: "Rajmata Savings Group",
      presidentName: "सविता योगेश पगार",
      presidentNameEn: "Savita Yogesh Pagar",
      secretary: "सखुबाई बाळू कंक",
      secretaryEn: "Sakhubai Balu Kank",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 8,
      groupName: "केद्राई माता गट",
      groupNameEn: "Kedrai Mata Group",
      presidentName: "",
      presidentNameEn: "",
      secretary: "मनीषा माधव माळी",
      secretaryEn: "Manisha Madhav Mali",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 9,
      groupName: "शिवराय बचत गट",
      groupNameEn: "Shivray Savings Group",
      presidentName: "सविता शरद पगार",
      presidentNameEn: "Savita Sharad Pagar",
      secretary: "मनीषा वसंत पगार",
      secretaryEn: "Manisha Vasant Pagar",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 10,
      groupName: "शिवानी बचत गट",
      groupNameEn: "Shivani Savings Group",
      presidentName: "रुपाली चव्हाण",
      presidentNameEn: "Rupali Chavan",
      secretary: "सविता सायकर",
      secretaryEn: "Savita Saykar",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 11,
      groupName: "सावित्रीबाई फुले गट",
      groupNameEn: "Savitribai Phule Group",
      presidentName: "गुलशन मुस्तफा पठाण",
      presidentNameEn: "Gulshan Mustafa Pathan",
      secretary: "कांचन आनंदा केदारे",
      secretaryEn: "Kanchan Ananda Kedare",
      memberCount: 11,
      remarks: ""
    },
    {
      srNo: 12,
      groupName: "लक्ष्मी माता गट",
      groupNameEn: "Laxmi Mata Group",
      presidentName: "मनीषा बाळासाहेब अगर",
      presidentNameEn: "Manisha Balasaheb Agar",
      secretary: "गायत्री संदीप पगार",
      secretaryEn: "Gayatri Sandeep Pagar",
      memberCount: 11,
      remarks: ""
    }
  ];

    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_URL.COMMITTEE_MEMBERS}/committee/mahimalyadeviloksanchalitsadhankendra`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            // Transform API data to match component format
            const dynamicData = result.data.map(member => ({
              srNo: member.srNo,
              groupName: language === 'mr' ? member.groupNameMarathi : member.groupName,
              groupNameEn: member.groupName,
              presidentName: language === 'mr' ? member.presidentNameMarathi : member.presidentName,
              presidentNameEn: member.presidentName,
              secretary: language === 'mr' ? member.secretaryMarathi : member.secretary,
              secretaryEn: member.secretary,
              memberCount: member.memberCount || 11,
              remarks: member.remarks || ''
            }));
            
            // Use API data (they now include the static data from database)
            setBachatGatData(dynamicData);
            return;
          }
        }
        // Fallback to static data
        setBachatGatData(staticBachatGatData);
      } catch (error) {
        console.warn('Failed to fetch committee members from API, using static data:', error);
        // Fallback to static data
        setBachatGatData(staticBachatGatData);
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
            {t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.pageTitle')}
          </h1>
          <p className="text-base sm:text-lg text-green-600 font-medium mb-2 px-4 sm:px-0">
            {t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.subtitle')}
          </p>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            {t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.description')}
          </p>
        </div>

        <div className="flex justify-center">
          {/* Main Content - Centered */}
          <div className="w-full max-w-4xl space-y-6 md:space-y-8">
            {/* Committee Information */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">🏛️</span>
                </div>
                {t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.committeeInfo')}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.description')}</p>
                <p className="mb-4">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.additionalInfo')}</p>
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">🎯</span>
                </div>
                {t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.objectives')}
              </h2>
              <ul className="space-y-3">
                {(Array.isArray(t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.objectivesList')) ? t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.objectivesList') : []).map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">⚙️</span>
                </div>
                {t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.services')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Array.isArray(t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.servicesList')) ? t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.servicesList') : []).map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm font-bold">+</span>
                    </div>
                    <span className="text-gray-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bachat Gat (Savings Groups) Table */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">💰</span>
                </div>
                {t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.bachatGat')}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.srNo')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.groupName')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.presidentName')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.secretary')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.memberCount')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left font-semibold text-sm">{t('samiti.mahimAhilyadeviLokSanchalitSadhanKendra.remarks')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bachatGatData.map((group) => (
                      <tr key={group.srNo} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-200">
                        <td className="border border-gray-200 px-3 py-3 text-gray-800 font-medium text-center text-sm">
                          {group.srNo}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-800 font-medium text-sm">
                          {language === 'en' ? group.groupNameEn : group.groupName}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-700 text-sm">
                          {(language === 'en' ? group.presidentNameEn : group.presidentName) ? (
                            <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              {language === 'en' ? group.presidentNameEn : group.presidentName}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-700 text-sm">
                          <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {language === 'en' ? group.secretaryEn : group.secretary}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-600 text-sm text-center">
                          {group.memberCount}
                        </td>
                        <td className="border border-gray-200 px-3 py-3 text-gray-600 text-sm">
                          {group.remarks || "-"}
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
