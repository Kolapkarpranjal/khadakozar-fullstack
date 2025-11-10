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
            const src = `${API_URL.BASE}${item.imageUrl}`;
            const isVideo = item.isVideo || false;
            
            // Log video items for debugging
            if (isVideo) {
              console.log('Video item:', {
                title,
                src,
                imageUrl: item.imageUrl,
                isVideo: item.isVideo
              });
            }
            
            return {
              _id: item._id,
              src,
              alt,
              title,
              description: desc,
              video: isVideo
            };
          });
          setDynamicImages(mapped);
        }
      } catch (e) {
        // Fail silently
        console.warn('Failed to load gallery from API', e);
      }
    })();
    return () => { isMounted = false; };
  }, [language]);

  // Use only API data - no static images
  const allImages = dynamicImages;

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-800 px-4">
          {t('nav.gallery')}
        </h1>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allImages.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">कोणतेही गॅलेरी आयटम उपलब्ध नाहीत</p>
                <p className="text-gray-500 text-sm mt-2">No gallery items available</p>
              </div>
            ) : (
              allImages.map((image, index) => {
                // Determine video MIME type from file extension
                const getVideoType = (src) => {
                  if (src.endsWith('.mp4')) return 'video/mp4';
                  if (src.endsWith('.webm')) return 'video/webm';
                  if (src.endsWith('.ogg') || src.endsWith('.ogv')) return 'video/ogg';
                  if (src.endsWith('.mov')) return 'video/quicktime';
                  if (src.endsWith('.avi')) return 'video/x-msvideo';
                  return 'video/mp4'; // default
                };

                return (
                <div key={image._id || index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {image.video ? (
                  <video
                    controls
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                    preload="metadata"
                    onError={(e) => {
                      console.error('Failed to load video:', image.src);
                      console.error('Video error:', e);
                    }}
                    onLoadStart={() => {
                      console.log('Loading video:', image.src);
                    }}
                  >
                    <source src={image.src} type={getVideoType(image.src)} />
                    <source src={image.src} type="video/mp4" />
                    <source src={image.src} type="video/webm" />
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
              );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
