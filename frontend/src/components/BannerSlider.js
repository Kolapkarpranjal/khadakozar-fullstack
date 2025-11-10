import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { API_URL } from "../utils/config";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import static banner data as fallback
import { getActiveBanners } from "./data/banners";

export default function BannerSlider() {
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_URL.BASE}/api/banners?activeOnly=true`);
        const data = await res.json();
        if (isMounted && data && data.success) {
          const mapped = (data.data || []).map(item => {
            const title = language === 'mr' ? (item.titleMr || item.title) : (item.titleEn || item.title);
            const alt = language === 'mr' ? (item.altTextMr || item.altText || title) : (item.altTextEn || item.altText || title);
            return {
              _id: item._id,
              title,
              imageUrl: `${API_URL.BASE}${item.imageUrl}`,
              altText: alt,
              order: item.order || 0,
              isActive: item.isActive
            };
          });
          // Sort by order
          mapped.sort((a, b) => a.order - b.order);
          setBannerImages(mapped);
          setLoading(false);
        }
      } catch (e) {
        // Fail silently and use static banners as fallback
        console.warn('Failed to load banners from API, using static banners', e);
        if (isMounted) {
    const staticBanners = getActiveBanners(language);
    setBannerImages(staticBanners);
    setLoading(false);
        }
      }
    })();
    return () => { isMounted = false; };
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
                alt={banner.altText || banner.title}
                className="banner-image"
                onError={(e) => {
                  // Fallback to static image if API image fails
                  const staticBanners = getActiveBanners(language);
                  const staticBanner = staticBanners.find(sb => sb._id === banner._id);
                  if (staticBanner) {
                    e.target.src = staticBanner.imageUrl;
                  }
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
