import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/config";

export default function SamitiPage() {
  const { t, language } = useLanguage();
  const [samitiOptions, setSamitiOptions] = useState([]);

  // Fetch committees from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchCommittees = async () => {
      try {
        const response = await fetch(API_URL.COMMITTEES);
        if (isMounted && response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            // Transform API data to match component format
            const committees = result.data
              .filter(committee => committee.isActive !== false) // Only show active committees
              .map(committee => ({
                path: committee.route || `/samiti/${committee.path}`,
                title: language === 'mr' ? (committee.titleMarathi || committee.title) : (committee.title || committee.titleMarathi),
                englishTitle: committee.title || committee.titleMarathi,
                description: language === 'mr' ? (committee.descriptionMarathi || committee.description || '') : (committee.description || committee.descriptionMarathi || ''),
                englishDescription: committee.description || committee.descriptionMarathi || ''
              }));
            
            setSamitiOptions(committees);
            return;
          }
        }
        // If API fails or returns no data, show empty array
        if (isMounted) {
          setSamitiOptions([]);
        }
      } catch (error) {
        console.warn('Failed to fetch committees from API:', error);
        // Fail silently - show empty array instead of static data
        if (isMounted) {
          setSamitiOptions([]);
        }
      }
    };

    fetchCommittees();
    return () => { isMounted = false; };
  }, [language]);

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
          
          {samitiOptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {language === 'mr' ? 'कोणतेही समिती उपलब्ध नाहीत' : 'No committees available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {samitiOptions.map((samiti, index) => (
                <Link 
                  key={samiti.path || index} 
                  to={samiti.path}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                      {samiti.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{samiti.englishTitle}</p>
                    {samiti.description && (
                      <p className="text-gray-700 mb-4">{samiti.description}</p>
                    )}
                    {samiti.englishDescription && (
                      <p className="text-sm text-gray-500">{samiti.englishDescription}</p>
                    )}
                    <div className="mt-6">
                      <span className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        {t('common.viewDetails')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}