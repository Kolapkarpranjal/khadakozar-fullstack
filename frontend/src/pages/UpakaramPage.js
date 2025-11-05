import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { API_URL } from "../utils/config";

export default function UpakaramPage() {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Static events data
  const staticEvents = [
    {
      _id: 1,
      title: language === 'mr' ? 'अम्बुलंस' : 'Ambulance',
      description: language === 'mr'
        ? 'ग्रामस्थांना आपत्कालीन वैद्यकीय सेवा उपलब्ध करून देण्यासाठी अम्बुलंसची सुविधा. आरोग्य सेवांच्या सुलभतेसाठी महत्त्वपूर्ण योगदान.'
        : 'Ambulance facility to provide emergency medical services to villagers. Important contribution for accessibility of healthcare services.',
      imageUrl: '/images/upakaram/event2.jpg',
      altText: language === 'mr' ? 'अम्बुलंस' : 'Ambulance',
      status: 'Completed',
      date: '2024'
    },
    {
      _id: 2,
      title: language === 'mr' ? 'अम्बुलंस' : 'Ambulance',
      description: language === 'mr'
        ? 'ग्रामस्थांना आपत्कालीन वैद्यकीय सेवा उपलब्ध करून देण्यासाठी अम्बुलंसची सुविधा. आरोग्य सेवांच्या सुलभतेसाठी महत्त्वपूर्ण योगदान.'
        : 'Ambulance facility to provide emergency medical services to villagers. Important contribution for accessibility of healthcare services.',
      imageUrl: '/images/upakaram/event3.jpg',
      altText: language === 'mr' ? 'अम्बुलंस' : 'Ambulance',
      status: 'Completed',
      date: '2024'
    },
    {
      _id: 3,
      title: language === 'mr' ? 'वैकुंठ रथ' : 'Vaikunth Rath',
      description: language === 'mr'
        ? 'वैकुंठ रथ हा एक महत्त्वपूर्ण धार्मिक आणि सांस्कृतिक कार्यक्रम आहे. हा रथ गावातील सर्व भाविकांसाठी आध्यात्मिक आनंद आणि शांती आणतो. वैकुंठ रथाच्या माध्यमातून गावातील लोकांची धार्मिक भावना जागृत होते आणि सामुदायिक एकता मजबूत होते. हा कार्यक्रम गावाच्या सांस्कृतिक वारसाचा एक महत्त्वपूर्ण भाग आहे. वैकुंठ रथाच्या आयोजनामुळे गावातील सर्व वयोगटातील लोक एकत्र येतात आणि सामूहिक प्रार्थना करतात. या कार्यक्रमाच्या माध्यमातून गावातील लोकांच्या मध्ये आध्यात्मिक जागृती निर्माण होते. वैकुंठ रथ हा केवळ धार्मिक कार्यक्रम नसून तो गावाच्या सामाजिक एकतेचे प्रतीक आहे. या कार्यक्रमामुळे गावातील लोकांच्या मध्ये परस्पर प्रेम आणि सहकार्याची भावना वाढते. वैकुंठ रथाच्या आयोजनामुळे गावाची धार्मिक आणि सांस्कृतिक ओळख मजबूत होते.'
        : 'Vaikunth Rath is an important religious and cultural program. This rath brings spiritual joy and peace to all devotees in the village. Through Vaikunth Rath, the religious sentiments of the villagers are awakened and community unity is strengthened. This program is an important part of the village cultural heritage. The organization of Vaikunth Rath brings together people of all age groups in the village for collective prayers. Through this program, spiritual awakening is created among the villagers. Vaikunth Rath is not just a religious program but a symbol of social unity of the village. This program increases the feeling of mutual love and cooperation among the villagers. The organization of Vaikunth Rath strengthens the religious and cultural identity of the village.',
      imageUrl: '/images/upakaram/event4.jpg',
      altText: language === 'mr' ? 'वैकुंठ रथ' : 'Vaikunth Rath',
      status: 'Ongoing',
      date: '2024'
    },
    {
      _id: 4,
      title: language === 'mr' ? 'पिण्याच्या पाण्याचा टँकर' : 'Drinking Water Tanker',
      description: language === 'mr'
        ? 'सततच्या दुष्काळामुळे पिण्याच्या पाण्याची टंचाई निर्माण होते. यावर उपाय म्हणून, ग्रामपंचायतने टँकर खरेदी केला.'
        : 'Continuous drought creates shortage of drinking water. As a solution, the Gram Panchayat purchased a tanker.',
      imageUrl: '/images/upakaram/event5.jpg',
      altText: language === 'mr' ? 'पिण्याच्या पाण्याचा टँकर' : 'Drinking Water Tanker',
      status: 'Completed',
      date: '2024'
    },
    {
      _id: 5,
      title: language === 'mr' ? 'शेड उभारणी' : 'Shed Construction',
      description: language === 'mr'
        ? 'अम्बुलंस व वैकुंठ रथ साठी स्वतंत्र शेड उभारणी केली.'
        : 'Separate shed construction for ambulance and Vaikunth Rath.',
      imageUrl: '/images/upakaram/event6.jpg',
      altText: language === 'mr' ? 'शेड उभारणी' : 'Shed Construction',
      status: 'Completed',
      date: '2024'
    }
  ];

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await fetch(`${API_URL.BASE}/api/events`);
        const data = await res.json();
        const dynamic = Array.isArray(data?.data) ? data.data.map(item => {
          const title = language === 'mr' ? (item.titleMr || item.title) : (item.titleEn || item.title);
          const desc = language === 'mr' ? (item.descriptionMr || item.description || title) : (item.descriptionEn || item.description || title);
          const alt = language === 'mr' ? (item.altTextMr || item.altText || title) : (item.altTextEn || item.altText || title);
          return {
            _id: item._id,
            title,
            description: desc,
            imageUrl: `${API_URL.BASE}${item.imageUrl}`,
            altText: alt,
            status: item.status || 'Completed',
            date: item.date || ''
          };
        }) : [];
        if (isMounted) {
          setEvents([...dynamic, ...staticEvents]);
          setLoading(false);
        }
      } catch (e) {
        // If API fails, show static ones so page still renders
        if (isMounted) {
          setEvents(staticEvents);
          setLoading(false);
        }
      }
    })();

    return () => { isMounted = false; };
  }, [language]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-4 sm:px-0">
            {language === 'mr' ? 'ग्रामपंचायत उपक्रम' : 'Gram Panchayat Initiatives'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            {language === 'mr' 
              ? 'ग्रामपंचायत खडक ओझरद्वारे चालविल्या जाणाऱ्या विविध उपक्रम आणि कार्यक्रमांची माहिती'
              : 'Information about various initiatives and programs run by Gram Panchayat Khadak Ozar'
            }
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 animate-pulse rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {language === 'mr' ? 'कोणतेही उपक्रम नाहीत' : 'No Events Available'}
            </h3>
            <p className="text-gray-500">
              {language === 'mr' 
                ? 'सध्या कोणतेही उपक्रम उपलब्ध नाहीत.'
                : 'Currently no events are available.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.altText}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-event.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'Ongoing' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {language === 'mr' ? 'तारीख' : 'Date'}: {event.date}
                  </p>
                  <button
                    onClick={() => handleViewDetails(event)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {language === 'mr' ? 'तपशील पहा' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {isLightboxOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.altText}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-2 transition-all duration-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === 'mr' ? 'स्थान' : 'Location'}
                      </p>
                      <p className="font-semibold">
                        {language === 'mr' ? 'खडक ओझर' : 'Khadak Ozar'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === 'mr' ? 'सहभागी' : 'Attendees'}
                      </p>
                      <p className="font-semibold">
                        {language === 'mr' ? 'अपेक्षित सहभागी' : 'Expected Attendees'}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'mr' ? 'उपक्रमाचे वर्णन' : 'Event Description'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeLightbox}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                  >
                    {language === 'mr' ? 'बंद करा' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
