import { useLanguage } from "../hooks/useLanguage";

export default function GallerySection() {
  const { t } = useLanguage();

  const galleryImages = [
    {
      src: "/images/gallery/gallery1.jpg",
      alt: "Gallery Image 1",
      title: "Gallery Image 1",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery2.jpg",
      alt: "Gallery Image 2", 
      title: "Gallery Image 2",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery3.jpg",
      alt: "Gallery Image 3",
      title: "Gallery Image 3", 
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery4.jpg",
      alt: "Gallery Image 4",
      title: "Gallery Image 4",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery5.jpg",
      alt: "Gallery Image 5",
      title: "Gallery Image 5",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery6.jpg",
      alt: "Gallery Image 6",
      title: "Gallery Image 6",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery7.jpg",
      alt: "Gallery Image 7",
      title: "Gallery Image 7",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery8.jpg",
      alt: "Gallery Image 8",
      title: "Gallery Image 8",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    },
    {
      src: "/images/gallery/gallery9.jpg",
      alt: "Gallery Image 9",
      title: "Gallery Image 9",
      description: "ग्रामपंचायत खडक ओझरची छायाचित्रे"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {t('nav.gallery')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  console.log(`Failed to load image: ${image.src}`);
                  e.target.src = '/images/placeholder-gallery.jpg';
                }}
                onLoad={(e) => {
                  console.log(`Successfully loaded image: ${image.src}`);
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
            {t('common.viewAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
