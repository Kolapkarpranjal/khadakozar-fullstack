import { useLanguage } from "../hooks/useLanguage";

export default function RastaArakhaSamitiPage() {
  const { t, language } = useLanguage();
  

  // Committee members data
  const committeeMembers = [
    {
      srNo: 1,
      name: language === 'mr' ? "सौ. योगिता भोये" : "Smt. Yogita Bhoye",
      position: language === 'mr' ? "मंडळ अधिकारी महसूल" : "Circle Officer Revenue",
      designation: language === 'mr' ? "अध्यक्ष" : "Chairman",
      mobile: "9421106264"
    },
    {
      srNo: 2,
      name: language === 'mr' ? "श्री. रोषण बळवंत सूर्यवंशी" : "Shri. Roshan Balwant Suryavanshi",
      position: language === 'mr' ? "ग्रामपंचायत अधिकारी" : "Gram Panchayat Officer",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: "8275586264"
    },
    {
      srNo: 3,
      name: language === 'mr' ? "सौ. चंद्रकला पगार" : "Smt. Chandrakala Pagar",
      position: language === 'mr' ? "कृषी सहायक अधिकारी" : "Agriculture Assistant Officer",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: "9420355425"
    },
    {
      srNo: 4,
      name: language === 'mr' ? "श्री. माणिक संपत शिंदे" : "Shri. Manik Sampat Shinde",
      position: language === 'mr' ? "पोलीस पाटील" : "Police Patil",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: "9763440766"
    },
    {
      srNo: 5,
      name: language === 'mr' ? "श्री. संदीप गांगुर्डे" : "Shri. Sandeep Gangurde",
      position: language === 'mr' ? "कोतवाल" : "Kotwal",
      designation: language === 'mr' ? "सदस्य" : "Member",
      mobile: "9822910075"
    },
    {
      srNo: 6,
      name: language === 'mr' ? "श्री. सागर वसंत पगार" : "Shri. Sagar Vasant Pagar",
      position: language === 'mr' ? "सरपंच" : "Sarpanch",
      designation: language === 'mr' ? "निमंत्रित सदस्य" : "Invited Member",
      mobile: "8805815671"
    },
    {
      srNo: 7,
      name: language === 'mr' ? "श्री. गोविंद तुळशीराम पगार" : "Shri. Govind Tulshiram Pagar",
      position: language === 'mr' ? "उपसरपंच" : "Up-Sarpanch",
      designation: language === 'mr' ? "निमंत्रित सदस्य" : "Invited Member",
      mobile: "7972194302"
    },
    {
      srNo: 8,
      name: language === 'mr' ? "त्या गावाचे जिल्हा परिषद पंचायत समिती सदस्य" : "District Council Panchayat Committee Member of that Village",
      position: "",
      designation: "",
      mobile: ""
    },
    {
      srNo: 9,
      name: language === 'mr' ? "श्री. तुकाराम कोंडाजी पगार" : "Shri. Tukaram Kondaji Pagar",
      position: language === 'mr' ? "ग्राम.तंटामुक्त अध्यक्ष" : "Village Dispute-Free Chairman",
      designation: language === 'mr' ? "निमंत्रित सदस्य" : "Invited Member",
      mobile: "9881460440"
    },
    {
      srNo: 10,
      name: language === 'mr' ? "श्री. शिवाजी पी. नेव्हल" : "Shri. Shivaji P. Naval",
      position: language === 'mr' ? "ग्राम महसूल अधिकारी" : "Village Revenue Officer",
      designation: language === 'mr' ? "सदस्य / सचिव" : "Member / Secretary",
      mobile: "9850493951"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('samiti.rastaArakhaSamiti.pageTitle')}</h1>
          <p className="text-lg text-blue-600 font-medium mb-2">{t('samiti.rastaArakhaSamiti.subtitle')}</p>
          <p className="text-lg text-gray-600">{t('samiti.rastaArakhaSamiti.description')}</p>
        </div>

        <div className="flex justify-center">
          {/* Main Content - Centered */}
          <div className="w-full max-w-6xl space-y-8">
            {/* Committee Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">🛣️</span>
                </div>
                {t('samiti.rastaArakhaSamiti.committeeInfo')}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">{t('samiti.rastaArakhaSamiti.description')}</p>
                <p className="mb-4">{t('samiti.rastaArakhaSamiti.additionalInfo')}</p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-bold">🎯</span>
                </div>
                {t('samiti.rastaArakhaSamiti.responsibilities')}
              </h2>
              <ul className="space-y-3">
                {t('samiti.rastaArakhaSamiti.responsibilitiesList', []).map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Road Development Services */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold">🔧</span>
                </div>
                {t('samiti.rastaArakhaSamiti.roadServices')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t('samiti.rastaArakhaSamiti.roadServicesList', []).map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-sm font-bold">+</span>
                    </div>
                    <span className="text-gray-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Committee Members Table */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">👥</span>
                </div>
                {t('samiti.rastaArakhaSamiti.members')}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'अ. नं.' : 'Sr. No.'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'समिती मधील पद' : 'Position in Committee'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'प्रवर्ग' : 'Category'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'मोबाईल. नंबर' : 'Mobile Number'}</th>
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
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          {member.mobile ? (
                            <a href={`tel:${member.mobile}`} className="text-blue-600 hover:text-blue-800 font-medium">
                              {member.mobile}
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

            {/* Road Safety Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                {t('samiti.rastaArakhaSamiti.roadSafetyTips')}
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                {t('samiti.rastaArakhaSamiti.roadSafetyTipsList', []).map((tip, index) => (
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