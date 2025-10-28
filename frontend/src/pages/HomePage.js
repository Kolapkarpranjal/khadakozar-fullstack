import BannerSlider from "../components/BannerSlider";
import NewsTicker from "../components/NewsTicker";
import MembersSection from "../components/MembersSection";
import { useLanguage } from "../hooks/useLanguage";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about');
  };

  const quickLinks = [
    { key: 'gallery', title: t('nav.gallery'), icon: '🖼️', to: '/gallery' },
    { key: 'yojna', title: t('nav.yojna'), icon: '📋', to: '/yojna' },
    { key: 'digital', title: t('nav.digital'), icon: '💻', to: '/digital' },
    { key: 'puraskar', title: t('nav.puraskar'), icon: '🏆', to: '/puraskar' },
  ];

  return (
    <div>
      <BannerSlider />
      <NewsTicker />
      <MembersSection />
      
      {/* About Section */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 px-4">
              {t('home.aboutEvents.aboutUs.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
              {t('home.aboutEvents.aboutUs.content')}
            </p>
            <button 
              onClick={handleAboutClick}
              className="bg-green-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base"
            >
              {t('home.aboutEvents.aboutUs.readMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
            {t('home.quickLinks.title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {quickLinks.map(link => (
              <button
                key={link.key}
                onClick={() => navigate(link.to)}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition flex flex-col items-center gap-3 border border-gray-100"
              >
                <span className="text-4xl" role="img" aria-label={link.key}>{link.icon}</span>
                <span className="font-semibold text-gray-800 text-sm sm:text-base text-center">{link.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
