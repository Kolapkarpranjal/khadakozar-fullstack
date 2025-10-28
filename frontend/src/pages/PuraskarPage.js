import { useLanguage } from "../hooks/useLanguage";

export default function PuraskarPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-4 sm:px-0">
            {language === 'mr' ? 'पुरस्कार' : 'Awards & Recognition'}
          </h1>
          <p className="text-base sm:text-lg text-green-600 font-medium mb-2 px-4 sm:px-0">
            {language === 'mr' ? 'ग्रामपंचायत खडक ओझरचे पुरस्कार आणि ओळख' : 'Gram Panchayat Khadak Ozar Awards & Recognition'}
          </p>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            {language === 'mr' 
              ? 'आमच्या ग्रामपंचायतने मिळवलेले विविध पुरस्कार आणि ओळख येथे पाहू शकता.' 
              : 'Explore the various awards and recognition received by our Gram Panchayat.'
            }
          </p>
        </div>

        {/* Awards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Award 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'mr' ? 'पुरस्कार' : 'Award'}
                </h3>
                <p className="text-lg text-green-600 font-semibold">
                  {language === 'mr' 
                    ? 'सन २०२३/२०२४ टीबी मुक्त ग्रामपंचायत पुरस्कार प्राप्त' 
                    : 'TB Free Gram Panchayat Award 2023/2024 Received'
                  }
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/images/award/award1.jpg" 
                  alt={language === 'mr' ? 'टीबी मुक्त ग्रामपंचायत पुरस्कार' : 'TB Free Gram Panchayat Award'}
                  className="w-full max-w-sm h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Award 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'mr' ? 'पुरस्कार' : 'Award'}
                </h3>
                <p className="text-lg text-green-600 font-semibold">
                  {language === 'mr' 
                    ? 'महानगरपालिका नाशिककडून पुरस्कार' 
                    : 'Award from Mahanagar Palika Nashik'
                  }
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/images/award/award2.jpg" 
                  alt={language === 'mr' ? 'महानगरपालिका नाशिक पुरस्कार' : 'Mahanagar Palika Nashik Award'}
                  className="w-full max-w-sm h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-green-50 p-6 rounded-xl max-w-4xl mx-auto">
            <p className="text-green-700 font-medium text-lg">
              {language === 'mr' 
                ? 'आमच्या ग्रामपंचायतच्या उत्कृष्ट कामगिरीबद्दल आम्हाला अनेक पुरस्कार मिळाले आहेत.' 
                : 'Our Gram Panchayat has received numerous awards for excellent performance.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
