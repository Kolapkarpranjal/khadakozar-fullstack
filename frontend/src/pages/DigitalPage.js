import { useLanguage } from "../hooks/useLanguage";

export default function DigitalPage() {
  const { t, language } = useLanguage();


  // Tax Collection Data
  const taxData = {
    title: t('digital.taxCollection.title'),
    year: t('digital.taxCollection.year'),
    houseTax: {
      title: t('digital.taxCollection.houseTax.title'),
      data: t('digital.taxCollection.houseTax.data'),
      scanner: {
        title: t('digital.taxCollection.houseTax.scanner.title'),
        image: "/images/scanner/gharpatti.jpg"
      }
    },
    waterTax: {
      title: t('digital.taxCollection.waterTax.title'),
      data: t('digital.taxCollection.waterTax.data'),
      scanner: {
        title: t('digital.taxCollection.waterTax.scanner.title'),
        image: "/images/scanner/panipatti.jpg"
      }
    },
    rentTax: {
      title: t('digital.taxCollection.rentTax.title'),
      data: t('digital.taxCollection.rentTax.data')
    }
  };

  // Applications (Arj) list with bilingual labels
  const arjItems = [
    { labelMr: 'अर्ज नमुना', labelEn: 'Application Sample', href: '/images/arjvibhag/दाखले_अर्ज_नमुना.pdf' },
    { labelMr: 'अर्ज सोबत जोडावयाची कागदपत्रांची यादी', labelEn: 'List of Documents to Attach', href: '/images/arjvibhag/अर्जासोबत_जोडावयाच्या_कागदपत्रांची_यादी.pdf' },
    { labelMr: 'बांधकाम परवानगी', labelEn: 'Building Permission (PDF)', href: '/images/arjvibhag/बांधकाम_परवानगी_अर्ज.pdf' },
    { labelMr: 'बांधकाम परवानगी (ऑनलाईन)', labelEn: 'Building Permission (Online)', href: '/bandhkam-parvangi-form' },
    { labelMr: 'जन्म नोंद दाखला मागणी अर्ज (ऑनलाईन)', labelEn: 'Birth Certificate Application (Online)', href: '/janm-nond-dakhla-form' },
    { labelMr: 'मृत्यू नोंद दाखला मागणी अर्ज (ऑनलाईन)', labelEn: 'Death Certificate Application (Online)', href: '/mrutyu-nond-dakhla-form' },
    { labelMr: 'विवाह नोंदणी दाखल्यासाठी अर्ज (ऑनलाईन)', labelEn: 'Marriage Registration Certificate (Online)', href: '/vivah-nondani-dakhla-form' },
    { labelMr: 'नमुना क्र ०८ मागणी अर्ज (ऑनलाईन)', labelEn: 'Form No. 08 Request (Online)', href: '/namuna-no08-form' },
    { labelMr: 'फेरफार नोंदीची अर्ज (ऑनलाईन)', labelEn: 'Mutation Registration (Online)', href: '/ferfar-nondani-form' },
    { labelMr: 'माहितीचा अधिकार अंतर्गत अर्जाचा नमुना', labelEn: 'RTI Application Sample', href: '/images/arjvibhag/माहितीचा-अधिकार-अंतर्गत-अर्जाचा-नमुना-जोडपत्र-अ.pdf' },
    { labelMr: 'नमुना क्र. ०४ काम मागणी अर्ज (ऑनलाईन)', labelEn: 'Form No. 04 Work Request (Online)', href: '/namuna-no04-kam-form' },
    { labelMr: 'व्यवसाय ना हरकत दाखला अर्ज (ऑनलाईन)', labelEn: 'Business NOC Application (Online)', href: '/vyavasay-naharakat-dakhla-form' },
    { labelMr: 'दारिद्र्य रेषा दाखला मागणी अर्ज (ऑनलाईन)', labelEn: 'Poverty Line Certificate (Online)', href: '/daridrya-resha-dakhla-form' },
    { labelMr: 'रहिवाशी दाखला मागणी अर्ज (ऑनलाईन)', labelEn: 'Residence Certificate (Online)', href: '/rahivashi-dakhla-form' },
    { labelMr: 'ऑनलाईन दाखल माहितीसाठी इथे क्लिक करा.', labelEn: 'Click here for online submission info', href: '#' }
  ];

  // Certificates (Dakhle) list with bilingual labels
  const dakhleItems = [
    { labelMr: 'जातीचा दाखला अर्ज', labelEn: 'Caste Certificate Application', href: '/images/arjvibhag/जातीचा_फॉर्म.pdf' },
    { labelMr: 'अल्पभूधारक फॉर्म', labelEn: 'Small Landholder Form', href: '/images/arjvibhag/अल्पभूधारक_फॉर्म.pdf' },
    { labelMr: 'वय व अधिवास प्रमाणपत्र अर्ज', labelEn: 'Age & Domicile Certificate Application', href: '/images/arjvibhag/Domocail_From.pdf' },
    { labelMr: 'अल्प उत्पन्न गट प्रमाणपत्र अर्ज', labelEn: 'EWS Certificate Application', href: '/images/arjvibhag/EWS_ApplicationForm.pdf' }
  ];

  // Self Declaration (Swayam Ghoshanapatra) list with bilingual labels
  const swayamGhoshanapatraItems = [
    { labelMr: 'रहिवाशी स्वयंघोषणापत्र', labelEn: 'Resident Self-Declaration', href: '/images/arjvibhag/रहिवाशी_दाखला_स्व_घोषणापत्र.pdf' },
    { labelMr: 'वीज जोडणी स्वयंघोषणापत्र', labelEn: 'Electricity Connection Self-Declaration', href: '/images/arjvibhag/वीज-जोडणी-स्वयंघोषणापत्र.pdf' },
    { labelMr: 'शौचालय असल्याबाबत स्वयंघोषणापत्र', labelEn: 'Toilet Availability Self-Declaration', href: '/images/arjvibhag/शौचालय-असल्याबाबत-स्वयंघोषणापत्र.pdf' },
    { labelMr: 'हयात असल्याबाबत स्वयंघोषणापत्र', labelEn: 'Alive Self-Declaration', href: '/images/arjvibhag/हयात-असल्याबाबत-स्वयंघोषणापत्र.pdf' },
    { labelMr: 'विधवा असल्याबाबत स्वयंघोषणापत्र', labelEn: 'Widow Self-Declaration', href: '/images/arjvibhag/विधवा-असल्याबाबत-स्वयंघोषणापत्र-1.pdf' },
    { labelMr: 'परित्यक्त्या असत्याबाबत स्वयंघोषणापत्र', labelEn: 'Abandoned/Deserted Self-Declaration', href: '/images/arjvibhag/परितक्या-असल्याबाबत-स्वयंघोषणापत्र.pdf' },
    { labelMr: 'विभक्त कुटुंब असल्यास स्वयंघोषणापत्र', labelEn: 'Separated Family Self-Declaration', href: '/images/arjvibhag/विभक्त-कुटुंब-असल्यास-स्वयंघोषणापत्र.pdf' },
    { labelMr: 'कोणत्याही योजनेचा लाभ न घेतत्याचे स्वयंघोषणापत्र', labelEn: 'Declaration of Not Availing Any Scheme', href: '/images/arjvibhag/कोणत्याही-योजनेचा-लाभ-न-घेतल्याचे-स्वयंघोषणापत्र.pdf' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800 px-4">
          {t('nav.digital')}
        </h1>
        <div className="max-w-4xl mx-auto">

          {/* Tax Collection Overview Section */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 text-gray-800">
                {taxData.title}
              </h2>
              <p className="text-center text-lg text-gray-600 mb-8">
                {taxData.year}
              </p>

              {/* House Tax Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">
                  {taxData.houseTax.title}
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-green-50">
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'अ.नं' : 'Sr. No.'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'कारचा प्रकार' : 'Tax Type'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'मागील' : 'Previous'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'चालू' : 'Current'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'एकूण' : 'Total'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">1</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">{language === 'mr' ? 'घरपट्टी' : 'House Tax'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">12310</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">213300</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">225610</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">2</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">{language === 'mr' ? 'सफाईपट्टी' : 'Sanitation Tax'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">230</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">3500</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">3730</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">3</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">{language === 'mr' ? 'दिवाबत्ती' : 'Lighting Tax'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">230</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">3500</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">3730</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="border border-gray-300 px-4 py-2" colSpan="2">{language === 'mr' ? 'एकूण' : 'Total'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">12770</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">220300</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">233070</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">
                    {taxData.houseTax.scanner.title}
                  </h4>
                  <div className="relative inline-block">
                    <img
                      src={taxData.houseTax.scanner.image}
                      alt={language === 'mr' ? 'घरपट्टी जमा करणे कामी स्कॅनर' : 'House Tax Collection QR Scanner'}
                      className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-lg shadow-md mx-auto"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {language === 'mr' ? 'घरपट्टी' : 'House Tax'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Water Tax Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">
                  {taxData.waterTax.title}
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-green-50">
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'अ.नं' : 'Sr. No.'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'कारचा प्रकार' : 'Tax Type'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'मागील' : 'Previous'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'चालू' : 'Current'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'एकूण' : 'Total'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">1</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">{language === 'mr' ? 'खास पाणीपट्टी' : 'Special Water Tax'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">3600</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">82800</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">86400</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">2</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">{language === 'mr' ? 'सामान्य पाणीपट्टी' : 'General Water Tax'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">00</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">00</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">00</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="border border-gray-300 px-4 py-2" colSpan="2">{language === 'mr' ? 'एकूण' : 'Total'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">3600</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">82800</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">86400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">
                    {taxData.waterTax.scanner.title}
                  </h4>
                  <div className="relative inline-block">
                    <img
                      src={taxData.waterTax.scanner.image}
                      alt={language === 'mr' ? 'पाणीपट्टी जमा करणे कामी स्कॅनर' : 'Water Tax Collection QR Scanner'}
                      className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-lg shadow-md mx-auto"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {language === 'mr' ? 'पाणीपट्टी' : 'Water Tax'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rent Tax Section */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-green-600">
                  {taxData.rentTax.title}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-green-50">
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'अ.नं' : 'Sr. No.'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'कारचा प्रकार' : 'Tax Type'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'मागील' : 'Previous'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'चालू' : 'Current'}</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">{language === 'mr' ? 'एकूण' : 'Total'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">1</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">{language === 'mr' ? 'व्यापारी गाळे भाडे' : 'Commercial Stall Rent'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">2400</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">18000</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">20400</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">2</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">{language === 'mr' ? 'जागा भाडे' : 'Space Rent'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">22000</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">84400</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">106400</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="border border-gray-300 px-4 py-2" colSpan="2">{language === 'mr' ? 'एकूण' : 'Total'}</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">24400</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">102400</td>
                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">126800</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Arj (Applications) Section */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-yellow-400 px-4 sm:px-6 py-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {language === 'mr' ? 'अर्ज' : 'Applications'}
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {arjItems.map((item, index) => (
                    <div key={index} className="w-full">
                      <a
                        href={item.href}
                        target={item.href && item.href !== '#' ? '_blank' : undefined}
                        rel={item.href && item.href !== '#' ? 'noopener noreferrer' : undefined}
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        {language === 'mr' ? item.labelMr : (item.labelEn || item.labelMr)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dakhle (Certificates) Section */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-yellow-400 px-4 sm:px-6 py-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {language === 'mr' ? 'दाखले' : 'Certificates'}
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {dakhleItems.map((item, index) => (
                    <div key={index} className="w-full">
                      <a
                        href={item.href}
                        target={item.href && item.href !== '#' ? '_blank' : undefined}
                        rel={item.href && item.href !== '#' ? 'noopener noreferrer' : undefined}
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        {language === 'mr' ? item.labelMr : (item.labelEn || item.labelMr)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Swayam Ghoshanapatra (Self Declaration) Section */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-yellow-400 px-4 sm:px-6 py-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {language === 'mr' ? 'स्वयं घोषणापत्र' : 'Self Declaration Forms'}
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {swayamGhoshanapatraItems.map((item, index) => (
                    <div key={index} className="w-full">
                      <a
                        href={item.href}
                        target={item.href && item.href !== '#' ? '_blank' : undefined}
                        rel={item.href && item.href !== '#' ? 'noopener noreferrer' : undefined}
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        {language === 'mr' ? item.labelMr : (item.labelEn || item.labelMr)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Takrar / Suchana (Complaint / Suggestion) Section */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-yellow-400 px-4 sm:px-6 py-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {language === 'mr' ? 'तक्रार / सूचना' : 'Complaint / Suggestion'}
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {language === 'mr' ? 'तक्रार / सूचना नोंदवा:' : 'Register Complaint / Suggestion:'}
                  </h3>
                  
                  <div className="mb-6">
                    <a
                      href="/takrar-suchana-form"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center mx-auto shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {language === 'mr' ? 'तक्रार / सूचना' : 'Complaint / Suggestion'}
                    </a>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    {language === 'mr' 
                      ? 'आपण हा फॉर्म भरून आपली तक्रार, सूचना आपल्या ग्रामपंचायत ता कळवू शकता'
                      : 'You can fill this form and inform your Gram Panchayat about your complaint, suggestion'
                    }
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">* Note:</span> {language === 'mr' 
                        ? 'यापैकी जे ग्रामपंचायतीच्या अखत्यारीत आहे त्याची नक्कीच दखल घेतली जाईल. आपली तक्रार, सूचना किंवा माहिती दखलपात्र असत्यास आपणांस व्हाट्सऍप क्र. किंवा इमेलवर कळविले जाईल.'
                        : 'Among these, those that fall under the jurisdiction of the Gram Panchayat will definitely be taken into consideration. If your complaint, suggestion, or information is noteworthy, you will be informed via WhatsApp number or email.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
                {t('digital.contact.title')}
              </h2>
              <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-700">
                      {t('digital.contact.email')}: chdkhadakozar@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-700">
                      {t('digital.contact.gramPanchayatOfficer')}: 8275586264
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-700">
                      {t('digital.contact.sarpanch')}: 8805815671
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-700">
                      {t('digital.contact.ambulance')}: 9764268193
                    </span>
                  </div>
                </div>
          </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

