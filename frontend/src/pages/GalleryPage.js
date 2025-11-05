import { useLanguage } from "../hooks/useLanguage";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const [dynamicImages, setDynamicImages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_URL.BASE}/api/gallery`);
        const data = await res.json();
        if (isMounted && data && data.success) {
          const mapped = (data.data || []).map(item => {
            const title = language === 'mr' ? (item.titleMr || item.title) : (item.titleEn || item.title);
            const desc = language === 'mr' ? (item.descriptionMr || item.description || title) : (item.descriptionEn || item.description || title);
            const alt = language === 'mr' ? (item.altTextMr || item.altText || title || 'Gallery image') : (item.altTextEn || item.altText || title || 'Gallery image');
            return {
            src: `${API_URL.BASE}${item.imageUrl}`,
              alt,
              title,
              description: desc
            };
          });
          setDynamicImages(mapped);
        }
      } catch (e) {
        // Fail silently; static images will still show
        console.warn('Failed to load dynamic gallery', e);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const galleryImages = [
    {
      src: "/images/gallery/gallery1.jpg",
      alt: "रस्त्याचे काम पूर्ण",
      description: "रस्त्याचे काम पूर्ण"
    },
    {
      src: "/images/gallery/gallery2.jpg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery3.jpg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery4.jpg",
      alt: "केद्राई माता मंदिर सोलार बसविणे",
      description: "केद्राई माता मंदिर सोलार बसविणे"
    },
    {
      src: "/images/gallery/gallery5.jpg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery6.jpg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery7.jpeg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery8.jpeg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery9.jpg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery10.jpeg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery11.jpeg",
      alt: "आई माउली मंदिर नवीन शेड",
      description: "आई माउली मंदिर नवीन शेड"
    },
    {
      src: "/images/gallery/gallery12.jpeg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery13.jpeg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery14.jpeg",
      alt: "ग्रामपंचायत खडक ओझरची छायाचित्रे",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery15.jpeg",
      alt: "सभामंडप",
      description: "सभामंडप"
    },
    {
      src: "/images/gallery/gallery16.jpeg",
      alt: "केद्राई माता मंदिर सोलार बसविणे",
      description: "केद्राई माता मंदिर सोलार बसविणे"
    },
    {
      video: true,
      src: "/images/gallery/shubharambhvdo.mp4",
      alt: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
      title: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ",
      description: "मुख्यमंत्री समृध्द पंचायतराज अभियान शुभारंभ"
    }
  ];

  const allImages = [...dynamicImages, ...galleryImages];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800 px-4">
          {t('nav.gallery')}
        </h1>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allImages.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {image.video ? (
                  <video
                    controls
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                  >
                    <source src={image.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.log(`Failed to load image: ${image.src}`);
                      e.target.src = '/images/placeholder-gallery.jpg';
                    }}
                    onLoad={(e) => {
                      console.log(`Successfully loaded image: ${image.src}`);
                    }}
                  />
                )}
                <div className="p-3 sm:p-4">
                  {image.title && <h3 className="font-semibold text-gray-800">{image.title}</h3>}
                  <p className="text-gray-600 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
