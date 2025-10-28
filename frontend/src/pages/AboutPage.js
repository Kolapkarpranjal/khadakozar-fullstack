import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function AboutPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("All");

  // Gram Panchayat Level Data with translations
  const gramPanchayatData = [
    {
      division: t('directory.committees.gramPanchayat') || 'ग्रामपंचायत',
      officials: [
        {
          name: t('directory.members.gramPanchayat.sagarVasantraoPagar') || 'सागर वसंतराव पगार',
          designation: t('directory.designations.sarpanch') || 'सरपंच',
          email: "sagar.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 21/05/1997 | Education: B.A. | Mobile: 8805815671"
        },
        {
          name: t('directory.members.gramPanchayat.govindTulshiramPagar'),
          designation: t('directory.designations.deputySarpanch'),
          email: "govind.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 30/08/1994 | Education: S.S.C. (10th Pass) | Mobile: 8805815671"
        },
        {
          name: t('directory.members.gramPanchayat.harshadJanardanPagar'),
          designation: t('directory.designations.member'),
          email: "harshad.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 28/07/1995 | Education: B.E. (Civil Engineering) | Mobile: 8806018793"
        },
        {
          name: t('directory.members.gramPanchayat.devidasTatyabaPagar'),
          designation: t('directory.designations.member'),
          email: "devidas.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 07/10/1984 | Education: B.Com. | Mobile: 9518357405"
        },
        {
          name: t('directory.members.gramPanchayat.sharadRamchandraBhavar'),
          designation: t('directory.designations.member'),
          email: "sharad.bhavar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 01/06/1981 | Education: F.Y. (First Year of Graduation) | Mobile: 9545347626"
        },
        {
          name: t('directory.members.gramPanchayat.shivajiChindhuGhodhade'),
          designation: t('directory.designations.member'),
          email: "shivaji.ghodhade@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 21/09/1994 | Education: H.S.C. (12th Pass) | Mobile: 9359410216"
        },
        {
          name: t('directory.members.gramPanchayat.sarikaAshokPagar'),
          designation: t('directory.designations.femaleMember'),
          email: "sarika.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 05/07/1989 | Education: S.S.C. (10th Pass) | Mobile: 9834763723"
        },
        {
          name: t('directory.members.gramPanchayat.ratnaAtmaramPagar'),
          designation: t('directory.designations.femaleMember'),
          email: "ratna.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 12/02/1990 | Education: S.S.C. (10th Pass) | Mobile: 7620913417"
        },
        {
          name: t('directory.members.gramPanchayat.sonaliSunilBhavar'),
          designation: t('directory.designations.femaleMember'),
          email: "sonali.bhavar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 10/06/1989 | Education: H.S.C. (12th Pass) | Mobile: 9850261067"
        },
        {
          name: t('directory.members.gramPanchayat.arunaKhanderaoPagar'),
          designation: t('directory.designations.femaleMember'),
          email: "aruna.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 16/04/1988 | Education: F.Y.J.C. (First Year Junior College – 11th) | Mobile: 9373225120"
        },
        {
          name: t('directory.members.gramPanchayat.laxmibaiChahaduSuryawanshi'),
          designation: t('directory.designations.femaleMember'),
          email: "laxmibai.suryawanshi@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: — | Education: — | Mobile: 8805370716"
        },
        {
          name: t('directory.members.gramPanchayat.priyankaShivanathKedare'),
          designation: t('directory.designations.femaleMember'),
          email: "priyanka.kedare@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 24/03/1996 | Education: S.S.C. (10th Pass) | Mobile: 9822827919"
        }
      ]
    },
    {
      division: t('directory.committees.executiveCommittee') || 'कार्यकारी समिती',
      officials: [
        {
          name: t('directory.members.executiveCommittee.roshanBalwantSuryavanshi'),
          designation: t('directory.designations.gramPanchayatOfficer'),
          email: "roshan.suryavanshi@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 03/04/1988 | Education: Agricultural Diploma | Mobile: 8275586264"
        },
        {
          name: t('directory.members.executiveCommittee.sushilRajendraKedare'),
          designation: t('directory.designations.computerOperator'),
          email: "sushil.kedare@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 30/08/1994 | Education: HSC | Mobile: 8850366248"
        },
        {
          name: t('directory.members.executiveCommittee.ganeshKeduPagar'),
          designation: t('directory.designations.clerkVasuliKarkun'),
          email: "ganesh.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 27/09/1993 | Education: HSC | Mobile: 9764268193"
        },
        {
          name: t('directory.members.executiveCommittee.kailasRamdasPagar'),
          designation: t('directory.designations.gramRojgarSahayak'),
          email: "kailas.pagar@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 28/12/1995 | Education: HSC | Mobile: 8805815671"
        },
        {
          name: t('directory.members.executiveCommittee.sahebraoNivrittiKank'),
          designation: t('directory.designations.waterSupplyEmployee'),
          email: "sahebrao.kank@khadakozar.gov.in",
          address: "Khadak Ozar, Taluka: Nashik, District: Nashik, Maharashtra | DOB: 28/06/1986 | Education: SSC | Mobile: 8010045761"
        }
      ]
    }
  ];

  // Use only Gram Panchayat data
  const allData = gramPanchayatData;
  const divisions = ["All", ...allData.map(item => item.division)];

  // Filter officials data
  const filteredData = allData.filter(item => 
    selectedDivision === "All" || item.division === selectedDivision
  ).map(item => ({
    ...item,
    officials: item.officials.filter(official =>
      official.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      official.designation.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(item => item.officials.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-12">
      {/* Page Header with Image */}
      <section className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-6 md:mb-8 px-4">{t('about.title')}</h1>
        <div className="relative w-full h-48 sm:h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mx-4 sm:mx-0">
          <img
            src="/images/about/about.jpg"
            alt={t('about.imageAlt')}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Village Overview */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('about.villageOverview.title')}</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('about.villageOverview.description')}
          </p>
        </div>
      </section>

      {/* Village Statistics */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('about.statistics.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(t('about.statistics.items') || []).map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
              <div className="text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Village Facilities */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('about.facilities.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(t('about.facilities.categories') || []).map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {(category.items || []).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Village Facilities - Schools, Health, Anganwadi */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">@ गावात :-</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">शाळा</h3>
              <ul className="space-y-2">
                {(Array.isArray(t('about.villageFacilities.schools')) ? t('about.villageFacilities.schools') : []).map((school, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">📚</span>
                    <span className="text-gray-700">{school}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">आरोग्य</h3>
              <ul className="space-y-2">
                {(Array.isArray(t('about.villageFacilities.health')) ? t('about.villageFacilities.health') : []).map((health, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">🏥</span>
                    <span className="text-gray-700">{health}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">अंगणवाडी</h3>
              <ul className="space-y-2">
                {(Array.isArray(t('about.villageFacilities.anganwadi')) ? t('about.villageFacilities.anganwadi') : []).map((anganwadi, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">👶</span>
                    <span className="text-gray-700">{anganwadi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Area Information */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('about.areaInfo.title')}</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Array.isArray(t('about.areaInfo.items')) ? t('about.areaInfo.items') : []).map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-green-600 font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distance Information */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('about.distance.title')}</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Array.isArray(t('about.distance.items')) ? t('about.distance.items') : []).map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{item.location}</span>
                <span className="text-green-600 font-semibold">{item.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agriculture Information */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('about.agriculture.title')}</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">{t('about.agriculture.landInfo.title')}</h3>
              <ul className="space-y-2">
                {(Array.isArray(t('about.agriculture.landInfo.items')) ? t('about.agriculture.landInfo.items') : []).map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-semibold text-green-600">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">{t('about.agriculture.areaInfo.title')}</h3>
              <ul className="space-y-2">
                {(Array.isArray(t('about.agriculture.areaInfo.items')) ? t('about.agriculture.areaInfo.items') : []).map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-semibold text-green-600">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">{t('about.agriculture.crops.title')}</h3>
              <ul className="space-y-2">
                {(Array.isArray(t('about.agriculture.crops.items')) ? t('about.agriculture.crops.items') : []).map((crop, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">🌾</span>
                    <span className="text-gray-700">{crop}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tourist Attractions */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">🏞️ प्रेक्षणीय स्थळे</h2>
        <div className="space-y-6">
          {(Array.isArray(t('about.attractions.places')) ? t('about.attractions.places') : []).map((place, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">{place.name}</h3>
              {place.image && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-64 h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              {place.images && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(Array.isArray(place.images) ? place.images : []).map((image, imageIndex) => (
                      <div key={imageIndex} className="flex justify-center">
                        <img
                          src={image}
                          alt={`${place.name} - Image ${imageIndex + 1}`}
                          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-gray-700 leading-relaxed mb-4">{place.description}</p>
              
              {place.features && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{place.features.title}</h4>
                  <ul className="space-y-1">
                    {(Array.isArray(place.features?.items) ? place.features.items : []).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">🏛️</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {place.festivals && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{place.festivals.title}</h4>
                  <ul className="space-y-1">
                    {(Array.isArray(place.festivals?.items) ? place.festivals.items : []).map((festival, festivalIndex) => (
                      <li key={festivalIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">🎉</span>
                        <span className="text-gray-700">{festival}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {place.pilgrimages && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{place.pilgrimages.title}</h4>
                  <ul className="space-y-1">
                    {(Array.isArray(place.pilgrimages?.items) ? place.pilgrimages.items : []).map((pilgrimage, pilgrimageIndex) => (
                      <li key={pilgrimageIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">🚶‍♂️</span>
                        <span className="text-gray-700">{pilgrimage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Special Features */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('about.specialFeatures.title')}</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="space-y-3">
            {(Array.isArray(t('about.specialFeatures.items')) ? t('about.specialFeatures.items') : []).map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✨</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* Directory Tables Section */}
      <section>
        <h2 className="text-3xl font-bold text-green-700 mb-6">{t('directory.title') || 'अधिकारी निर्देशिका'}</h2>
        
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-md">
              {t('directory.filterText') || 'फिल्टर करा:'}
            </div>
            <div className="flex-1">
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder={t('directory.searchPlaceholder') || 'नाव किंवा पद शोधा...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
        
        {/* Officials Tables */}
        <div className="space-y-6">
          {filteredData.map((division, divisionIndex) => (
            <div key={divisionIndex} className="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-4">
                <h3 className="text-lg font-semibold">{division.division}</h3>
              </div>
              
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{t('directory.tableHeaders.name') || 'नाव'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{t('directory.tableHeaders.designation') || 'पद'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{t('directory.tableHeaders.address') || 'पत्ता'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {division.officials.map((official, index) => (
                      <tr key={index} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200">
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">
                          {official.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {official.designation}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-600 text-sm">
                          {official.address}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('directory.noOfficialsFound') || 'कोणतेही अधिकारी सापडले नाहीत'}</h3>
            <p className="text-gray-600">{t('directory.noOfficialsMessage') || 'आपल्या शोध निकषांशी जुळणारे कोणतेही अधिकारी सापडले नाहीत.'}</p>
          </div>
        )}
      </section>
    </div>
  );
}
