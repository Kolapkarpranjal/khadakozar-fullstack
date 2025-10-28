import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import static banner data
import { getActiveBanners } from "./data/banners";

export default function BannerSlider() {
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Load static banners only (for static export compatibility)
    const staticBanners = getActiveBanners(language);
    setBannerImages(staticBanners);
    setLoading(false);
  }, [language]);

  if (loading) {
    return (
      <div className="banner-container">
        <div className="banner-slide">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: 'linear-gradient(to right, #16a34a, #22c55e)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <div style={{ color: '#6b7280', fontWeight: '500' }}>{t('home.banner.loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  // If no banners are loaded, show a fallback
  if (bannerImages.length === 0) {
    return (
      <div className="banner-container">
        <div className="banner-slide">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ color: '#6b7280', fontWeight: '500', fontSize: '1.125rem' }}>{t('home.banner.noBanners')}</div>
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>{t('home.banner.checkConfig')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="banner-container">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        pagination={{ 
          clickable: true,
          dynamicBullets: false,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={bannerImages.length > 1}
        style={{ height: 'clamp(180px, 45vw, 520px)', borderRadius: '12px' }}
      >
        {bannerImages.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
              <img 
                src={banner.imageUrl} 
                alt={banner.title}
                className="banner-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
