import { useLanguage } from "../hooks/useLanguage";

export default function YojnaPage() {
  const { t, language } = useLanguage();

  const schemes = [
    {
      id: 1,
      department: language === 'mr' ? "सांस्कृतिक कार्य विभाग" : "Cultural Affairs Department",
      departmentEn: "Cultural Affairs Department",
      image: "/images/yojna/1.jpg",
      schemes: language === 'mr' ? [
        "महाराष्ट्र वैभव राज्य संरक्षित स्मारक संगोपन योजना",
        "वृध्द कलावंत मानधन योजना",
        "नैतिक मूल्य"
      ] : [
        "Maharashtra Vaibhav State Protected Monument Conservation Scheme",
        "Senior Artist Honorarium Scheme",
        "Moral Values"
      ]
    },
    {
      id: 2,
      department: language === 'mr' ? "कौशल्य विकास व उद्योजकता विभाग" : "Skill Development and Entrepreneurship Department",
      departmentEn: "Skill Development and Entrepreneurship Department",
      image: "/images/yojna/2.jpg",
      schemes: language === 'mr' ? [
        "रोजगार मेळावे",
        "आदिवासी उमेदवारांसाठी सेवा योजना प्रशिक्षण व मार्गदर्शन केंद्रे",
        "रोजगार प्रोत्साहन कार्यक्रम योजना",
        "ग्रंथालयसदृश अभ्यासिका सुरु करणे"
      ] : [
        "Employment Fairs",
        "Service Scheme Training and Guidance Centers for Tribal Candidates",
        "Employment Incentive Program Scheme",
        "Starting Library-like Study Centers"
      ]
    },
    {
      id: 3,
      department: language === 'mr' ? "राष्ट्रीय सामाजिक सहाय्य कार्यक्रम" : "National Social Assistance Program",
      departmentEn: "National Social Assistance Program",
      image: "/images/yojna/3.jpg",
      schemes: language === 'mr' ? [
        "प्रधानमंत्री जीवनज्योती विमा योजना पुरस्कार",
        "प्रधानमंत्री सुरक्षा योजना",
        "अटल पेंशन योजना",
        "सुकन्या समृध्दी योजना",
        "इंदिरा गांधी राष्ट्रीय वृध्दापकाळ निवृत्ती वेतन योजना",
        "इंदिरा गांधी राष्ट्रीय विधवा निवृत्ती वेतन योजना",
        "इंदिरा गांधी राष्ट्रीय दिव्यांग निवृत्ती योजना",
        "राष्ट्रीय कुटुंब लाभ योजना"
      ] : [
        "Pradhan Mantri Jeevan Jyoti Bima Yojana",
        "Pradhan Mantri Suraksha Yojana",
        "Atal Pension Yojana",
        "Sukanya Samriddhi Yojana",
        "Indira Gandhi National Old Age Pension Scheme",
        "Indira Gandhi National Widow Pension Scheme",
        "Indira Gandhi National Disability Pension Scheme",
        "National Family Benefit Scheme"
      ]
    },
    {
      id: 4,
      department: language === 'mr' ? "आदिवासी विकास विभाग" : "Tribal Development Department",
      departmentEn: "Tribal Development Department",
      image: "/images/yojna/4.jpg",
      schemes: language === 'mr' ? [
        "केंद्रीय अर्थसंकल्प (न्यूक्लिअस बजेट) योजना",
        "खावटी कर्ज योजना",
        "ठक्कर बाप्पा आदिवासी बस्ती सुधारणा एकात्मिक कार्यक्रम",
        "नवसंजीवनी योजना"
      ] : [
        "Central Budget (Nucleus Budget) Scheme",
        "Khavati Loan Scheme",
        "Thakkar Bappa Tribal Settlement Improvement Integrated Program",
        "Nav Sanjeevani Scheme"
      ]
    },
    {
      id: 5,
      department: language === 'mr' ? "महिला बाल विकास विभाग" : "Women and Child Development Department",
      departmentEn: "Women and Child Development Department",
      image: "/images/yojna/5.jpg",
      schemes: language === 'mr' ? [
        "एकात्मिक बाल विकास सेवा योजना",
        "मनोधैर्य योजना",
        "राजीव गांधी सबला योजना",
        "बेटी बचाओ-बेटी पढाओ योजना",
        "माझी कन्या भाग्यश्री योजना",
        "बाल संगोपन योजना",
        "बाल सल्ला केंद्र",
        "निराश्रित महिलांसाठी आधार गृहे",
        "अत्याचारग्रस्त पीडित महिलांसाठी सावित्री बाई फुले बहुउदशिय महिला केंद्र",
        "महिला समपदेश केंद्र शुभमंगल",
        "शुभ मंगल सामूहिक विवाह योजना",
        "अनाथालय महिला स्वीकृती केंद्रे आणि संरक्षित गृहे",
        "निराधार आणि परित्यक्त्या विधवांच्यामुलींच्या विवाहाकरीता अनुदान"
      ] : [
        "Integrated Child Development Services Scheme",
        "Manodhairya Scheme",
        "Rajiv Gandhi Sabla Scheme",
        "Beti Bachao Beti Padhao Scheme",
        "Majhi Kanya Bhagya Shree Scheme",
        "Child Care Scheme",
        "Child Counseling Centers",
        "Shelter Homes for Destitute Women",
        "Savitribai Phule Multi-purpose Women's Center for Violence Affected Women",
        "Shubhamangal Women Counseling Center",
        "Shubh Mangal Mass Marriage Scheme",
        "Orphanage Women Adoption Centers and Protective Homes",
        "Grant for Marriage of Daughters of Destitute and Abandoned Widows"
      ]
    },
    {
      id: 6,
      department: language === 'mr' ? "पंधरावा वित्त आयोग योजना" : "15th Finance Commission Scheme",
      departmentEn: "15th Finance Commission Scheme",
      image: "/images/yojna/6.jpg",
      schemes: language === 'mr' ? [
        "ग्रामविकास व जलसंधारण विभाग यांचे कडील शासन निर्णय क्रमांक पंविआ 2020 /प्र.क्र.59/वित्त-4 दिनांक 26 जून, 2020 अन्वये दिनांक 1 एप्रिल, 2020 ते दिनांक 31 मार्च 2025 या कालावधीत केंद्रशासनाकडून राज्यातील ग्रामिण स्थानिक स्वराज्य संस्थांच्या बळकटीकरणासाठी राज्याला मुलभूत/बेसिक अनुदान (अनटाईड) व बंधित अनुदान (टाईड) या दोन प्रकारच्या अनुदानाच्या स्वरुपात निधी प्राप्त होणार आहे."
      ] : [
        "According to Government Decision No. PMVIA 2020/Proc.59/Finance-4 dated June 26, 2020, from the Rural Development and Water Conservation Department, during the period from April 1, 2020 to March 31, 2025, the state will receive funds from the central government in the form of two types of grants - Basic Grant (Untied) and Tied Grant for strengthening rural local self-government institutions in the state."
      ]
    },
    {
      id: 7,
      department: language === 'mr' ? "प्रधानमंत्री आवाज योजना (PMY)" : "Pradhan Mantri Awas Yojana (PMY)",
      departmentEn: "Pradhan Mantri Awas Yojana (PMY)",
      image: "/images/yojna/7.jpg",
      schemes: language === 'mr' ? [
        "ग्रामीण भागातील दारिद्रय रेषेखालील बेघर/कच्चेघर असलेल्या कुटूंबांना घरकुल बांधकामासाठी अर्थसहाय्य देणे हा योजनेचा उद्देश आहे. लाभार्थ्यांची निवड ग्रामपंचायतीमार्फत केली जाते. घरकुल बांधकामाकरिता साधारण क्षेत्रात रू.1.20 लक्ष व नक्षलग्रस्त भागाकरिता रू.1.30 लक्ष प्रति लाभार्थी अर्थसहाय्य देण्यात येणार आहे."
      ] : [
        "The objective of this scheme is to provide financial assistance to homeless/thatched house families below the poverty line in rural areas for house construction. Beneficiary selection is done through Gram Panchayats. Financial assistance of Rs.1.20 lakh for normal areas and Rs.1.30 lakh for Naxal-affected areas per beneficiary will be provided for house construction."
      ]
    },
    {
      id: 8,
      department: language === 'mr' ? "महात्मा गांधी रोजगार हमी योजना (MGNAREGA)" : "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
      departmentEn: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
      image: "/images/yojna/8.jpg",
      schemes: language === 'mr' ? [
        "ग्रामीण भागाचा सुयोग्य विकास करणेचे दृष्टीने उपलब्ध मानवी संपत्तीद्वारे ग्रामीण भागात टिकाऊ सामुहिक मालमत्ता निर्माण करीत असतानाच ग्रामीण भागात रहाण्या-या व अंग मेहनतीची अकुशल कामे करण्या-या, मजुरांना रोजगार उपलब्ध व्हावा या उद्देशाने केंद्र सरकारने राष्ट्रीय ग्रामीण रोजगार हमी अधिनियम २००५ पारीत केला असुन सदर कायदयान्वये ग्रामीण भागातील कुटुंबाला १०० दिवसांचा रोजगार उपलब्ध करुन देण्याची हमी देण्यात आलेली आहे."
      ] : [
        "With the objective of providing employment to laborers living in rural areas and doing unskilled manual work, while creating sustainable collective assets in rural areas through available human resources for proper development of rural areas, the central government has enacted the National Rural Employment Guarantee Act 2005, and under this act, a guarantee has been given to provide 100 days of employment to families in rural areas."
      ]
    },
    {
      id: 9,
      department: language === 'mr' ? "शबरी आवास योजना" : "Shabari Awas Yojana",
      departmentEn: "Shabari Awas Yojana",
      image: "/images/yojna/9.jpg",
      schemes: language === 'mr' ? [
        "आदिवासी उपयोजनेंतर्गत आदिवासी क्षेत्रात येणाऱ्या जिल्ह्यांतील अनुसूचित जमातीच्या लाभार्थ्यांसाठी तसेच आदिवासी बाह्य क्षेत्रात येणाऱ्या जिल्ह्यांतील अनुसूचित जमातीच्या पात्र लाभार्थ्यांना घराचे 269.00 चौ.फु. चटई क्षेत्र असलेले पक्के घरकुल उपलब्ध करून देणे."
      ] : [
        "Under the tribal sub-plan, providing permanent houses with 269.00 sq.ft. carpet area to eligible beneficiaries of scheduled tribes in districts coming under tribal areas as well as eligible beneficiaries of scheduled tribes in districts coming under tribal external areas."
      ]
    },
    {
      id: 10,
      department: language === 'mr' ? "पेसा निधी - अबंध निधी योजना" : "PESA Fund - Untied Fund Scheme",
      departmentEn: "PESA Fund - Untied Fund Scheme",
      image: "/images/yojna/1.jpg", // Using image 1 as fallback
      schemes: language === 'mr' ? [
        "पेसा निधी योजना, जी 'पंचायती (अनुसूचित क्षेत्रांचा विस्तार) कायदा, 1996' (PESA Act) अंतर्गत येते, ही अनुसूचित क्षेत्रांतील ग्रामपंचायतींना विशेष निधी पुरवते. या निधीचा उपयोग ग्रामपंचायतींना त्यांच्या विकासासाठी आणि आदिवासी समुदायाच्या गरजा पूर्ण करण्यासाठी केला जातो."
      ] : [
        "PESA Fund Scheme, which comes under the 'Panchayats (Extension to Scheduled Areas) Act, 1996' (PESA Act), provides special funds to Gram Panchayats in scheduled areas. This fund is used by Gram Panchayats for their development and to fulfill the needs of the tribal community."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-4 sm:px-0">
            {t('nav.yojna') || 'शासकीय योजना'}
          </h1>
          <p className="text-base sm:text-lg text-green-600 font-medium mb-2 px-4 sm:px-0">
            {language === 'mr' ? 'ग्रामपंचायत खडक ओझर - शासकीय योजना' : 'Gram Panchayat Khadak Ozar - Government Schemes'}
          </p>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            {language === 'mr' ? 'विविध शासकीय विभागांतर्गत चालविल्या जाणाऱ्या योजना आणि कार्यक्रमांची माहिती' : 'Information about schemes and programs run under various government departments'}
          </p>
        </div>

        {/* Schemes Section */}
        <div className="space-y-8">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-2/5">
                    <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-md bg-gray-100">
                      <img
                        src={scheme.image}
                        alt={language === 'mr' ? scheme.department : scheme.departmentEn}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          console.log(`Failed to load image: ${scheme.image}`);
                          e.target.src = '/images/yojna/1.jpg'; // Fallback to first image
                          e.target.onerror = null; // Prevent infinite loop
                        }}
                        onLoad={(e) => {
                          console.log(`Successfully loaded image: ${scheme.image}`);
                          // Hide loading placeholder when image loads
                          const placeholder = e.target.parentElement.querySelector('.loading-placeholder');
                          if (placeholder) {
                            placeholder.style.display = 'none';
                          }
                        }}
                      />
                      {/* Loading placeholder - will be hidden when image loads */}
                      <div className="loading-placeholder absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Loading...</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="lg:w-3/5">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                      {scheme.department}
                    </h3>
                    <div className="space-y-3">
                      {scheme.schemes.map((schemeItem, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">•</span>
                          <p className="text-gray-700 leading-relaxed">
                            {schemeItem}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-green-50 p-6 rounded-xl max-w-4xl mx-auto">
            <p className="text-green-700 font-medium text-lg">
              {language === 'mr' ? 'या सर्व योजनांची अधिक माहिती आणि अर्ज करण्यासाठी ग्रामपंचायत कार्यालयात संपर्क करा.' : 'For more information about all these schemes and to apply, contact the Gram Panchayat office.'}
            </p>
          </div>
        </div>

        {/* Schemes Count */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-700 font-medium">
              {language === 'mr' ? `एकूण ${schemes.length} विभागांतर्गत योजना उपलब्ध` : `Total ${schemes.length} schemes available under departments`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
