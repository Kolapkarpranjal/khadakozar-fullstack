import { useLanguage } from "../hooks/useLanguage";

export default function JanArogyaSamitiPage() {
  const { t, language } = useLanguage();

  // Committee members data for Jan Arogya Samiti
  const committeeMembers = [
    {
      srNo: 1,
      name: language === 'mr' ? "मा. सागर वसंतराव पगार" : "Shri. Sagar Vasantrao Pagar",
      designation: language === 'mr' ? "अध्यक्ष सरपंच" : "Chairman Sarpanch",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 2,
      name: language === 'mr' ? "मा. डॉ.सुलोचना लहानू भोये" : "Dr. Sulochana Lahanu Bhoye",
      designation: language === 'mr' ? "सह अध्यक्ष (वैद्यकीय अधिकारी)" : "Vice Chairman (Medical Officer)",
      address: language === 'mr' ? "वादळी भोई" : "Vadali Bhoi"
    },
    {
      srNo: 3,
      name: language === 'mr' ? "मा. डॉ अजय शिवाजी शार्दुल" : "Dr. Ajay Shivaji Shardul",
      designation: language === 'mr' ? "सदस्य सचिव (समुदाय आरोग्य अधिकारी)" : "Member Secretary (Community Health Officer)",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 4,
      name: language === 'mr' ? "मा. श्रीम. शोभना आण्णा देशमुख" : "Smt. Shobhana Anna Deshmukh",
      designation: language === 'mr' ? "सदस्य (आरोग्य सेविका)" : "Member (Health Worker)",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 5,
      name: language === 'mr' ? "मा. श्री. ज्ञानेश्वर सुनील कानडे" : "Shri. Gyaneshwar Sunil Kanade",
      designation: language === 'mr' ? "सदस्य (आरोग्य सेवक)" : "Member (Health Worker)",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 6,
      name: language === 'mr' ? "मा. श्रीम. मंगला भाऊसाहेब नागरे" : "Smt. Mangala Bhausaheb Nagre",
      designation: language === 'mr' ? "सदस्य आशा" : "Member ASHA",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 7,
      name: language === 'mr' ? "मा. श्रीम. मनीषा राहुल गिधाडे" : "Smt. Manisha Rahul Gidhade",
      designation: language === 'mr' ? "सदस्य (बचत गट अध्यक्ष)" : "Member (Savings Group President)",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 8,
      name: language === 'mr' ? "मा. श्रीम. अरुणा खंडेराव पगार" : "Smt. Aruna Khanderao Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 9,
      name: language === 'mr' ? "मा. श्री. शरद रामचंद्र भवर" : "Shri. Sharad Ramchandra Bhavar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 10,
      name: language === 'mr' ? "मा. श्री. हर्षद जनार्दन पगार" : "Shri. Harshad Janardan Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 11,
      name: language === 'mr' ? "मा. श्री. गोविंद तुळशीराम पगार" : "Shri. Govind Tulshiram Pagar",
      designation: language === 'mr' ? "सदस्य" : "Member",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    },
    {
      srNo: 12,
      name: language === 'mr' ? "मा. श्री. संतोष केदू पगार" : "Shri. Santosh Kedu Pagar",
      designation: language === 'mr' ? "युवा प्रतिनिधी" : "Youth Representative",
      address: language === 'mr' ? "खडक ओझर" : "Khadak Ozar"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('samiti.janArogyaSamiti.pageTitle')}</h1>
          <p className="text-lg text-green-600 font-medium mb-2">{t('samiti.janArogyaSamiti.subtitle')}</p>
          <p className="text-lg text-gray-600">{t('samiti.janArogyaSamiti.description')}</p>
        </div>

        <div className="flex justify-center">
          {/* Main Content - Centered */}
          <div className="w-full max-w-4xl space-y-8">
            {/* Committee Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">🏥</span>
                </div>
                {t('samiti.janArogyaSamiti.committeeInfo')}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">{t('samiti.janArogyaSamiti.description')}</p>
                <p className="mb-4">{t('samiti.janArogyaSamiti.additionalInfo')}</p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">🎯</span>
                </div>
                {t('samiti.janArogyaSamiti.responsibilities')}
              </h2>
              <ul className="space-y-3">
                {t('samiti.janArogyaSamiti.responsibilitiesList', []).map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health Services */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold">⚕️</span>
                </div>
                {t('samiti.janArogyaSamiti.healthServices')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t('samiti.janArogyaSamiti.healthServicesList', []).map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-sm font-bold">+</span>
                    </div>
                    <span className="text-gray-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Committee Members Table */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">👥</span>
                </div>
                {t('samiti.janArogyaSamiti.members')}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'अ.नं.' : 'Sr. No.'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'नावे' : 'Name'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'पत्ता' : 'Address'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {committeeMembers.map((member) => (
                      <tr key={member.srNo} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200">
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium text-center">
                          {member.srNo}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">
                          {member.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {member.designation}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-sm">
                          {member.address}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                {t('samiti.janArogyaSamiti.healthTips')}
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                {t('samiti.janArogyaSamiti.healthTipsList', []).map((tip, index) => (
                  <p key={index}>• {tip}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
