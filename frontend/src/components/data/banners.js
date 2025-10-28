// Static banner data for the website
export const getActiveBanners = (lang = 'mr') => {
  // Sample banner data - you can replace with your actual banner images
  const banners = [
    {
      _id: '1',
      title: lang === 'mr' ? 'ग्रामपंचायत खडकोजर' : 'Grampanchayat Khadakozar',
      imageUrl: '/images/banners/banner1.jpg',
      isActive: true,
      order: 1
    },
    {
      _id: '2',
      title: lang === 'mr' ? 'डिजिटल ग्रामपंचायत' : 'Digital Grampanchayat',
      imageUrl: '/images/banners/banner2.jpg',
      isActive: true,
      order: 2
    },
    {
      _id: '3',
      title: lang === 'mr' ? 'समुदाय सेवा' : 'Community Service',
      imageUrl: '/images/banners/banner3.jpg',
      order: 3
    }
  ];

  return banners.filter(banner => banner.isActive).sort((a, b) => a.order - b.order);
};

// Banner image type definition (for TypeScript if needed)
export const BannerImage = {
  _id: String,
  title: String,
  imageUrl: String,
  isActive: Boolean,
  order: Number
};
