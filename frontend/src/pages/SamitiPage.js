import { useLanguage } from "../hooks/useLanguage";
import { Link } from "react-router-dom";

export default function SamitiPage() {
  const { t } = useLanguage();

  const samitiOptions = [
    {
      path: "/samiti/janArogyaSamiti",
      title: "जन आरोग्य समिती",
      englishTitle: "Jan Arogya Samiti",
      description: "आरोग्य सेवा आणि कल्याण",
      englishDescription: "Health Services and Welfare"
    },
    {
      path: "/samiti/KrishiVikasSamiti", 
      title: "कृषी विकास समिती",
      englishTitle: "Krishi Vikas Samiti",
      description: "शेती विकास आणि सुधारणा",
      englishDescription: "Agricultural Development and Improvement"
    },
    {
      path: "/samiti/ShaleyVyavasthapanSamiti",
      title: "शालेय व्यवस्थापन समिती", 
      englishTitle: "Shaley Vyavasthapan Samiti",
      description: "शिक्षण व्यवस्थापन",
      englishDescription: "Education Management"
    },
    {
      path: "/samiti/RastaArakhaSamiti",
      title: "रस्ता आराखडा समिती",
      englishTitle: "Rasta Arakha Samiti", 
      description: "रस्ते आणि वाहतूक",
      englishDescription: "Roads and Transportation"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          {t('nav.samiti')}
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600 mb-12 text-lg">
            {t('samiti.overview.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {samitiOptions.map((samiti, index) => (
              <Link 
                key={index} 
                to={samiti.path}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-700 mb-4">
                    {samiti.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{samiti.englishTitle}</p>
                  <p className="text-gray-700 mb-4">{samiti.description}</p>
                  <p className="text-sm text-gray-500">{samiti.englishDescription}</p>
                  <div className="mt-6">
                    <span className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      {t('common.viewDetails')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}