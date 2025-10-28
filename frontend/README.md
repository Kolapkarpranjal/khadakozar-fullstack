# Khadak Ozar Grampanchayat Website

A modern, responsive website for Khadak Ozar Grampanchayat built with React and multilingual support (Marathi & English).

## 🚀 Features

- **Multilingual Support**: Marathi and English language switching
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Modern UI**: Clean and professional design with Tailwind CSS
- **Interactive Components**: Banner slider, news ticker, gallery
- **Navigation**: Complete navigation with all required pages

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── BannerSlider.js  # Image slider component
│   ├── Navigation.js    # Main navigation
│   ├── NewsTicker.js    # Scrolling news ticker
│   ├── MembersSection.js # Committee members display
│   ├── AboutEventsSection.js # About and events section
│   ├── GallerySection.js # Photo gallery
│   └── data/
│       └── banners.js   # Banner data
├── pages/              # Page components
│   ├── HomePage.js     # Home page
│   ├── AboutPage.js    # About us page
│   ├── SamitiPage.js   # Committee page
│   ├── YojnaPage.js    # Government schemes page
│   ├── DigitalPage.js  # Digital services page
│   ├── GalleryPage.js  # Gallery page
│   ├── UpakaramPage.js # Initiatives page
│   └── PuraskarPage.js # Awards page
├── locales/            # Language files
│   ├── en/
│   │   └── common.json # English translations
│   └── mr/
│       └── common.json # Marathi translations
├── hooks/
│   └── useLanguage.js  # Language context and hook
└── assets/
    └── images/         # Static images
```

## 🛠️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🌐 Available Pages

- **Home** (`/`) - Main landing page with banner, news, and sections
- **About Us** (`/about`) - Information about the grampanchayat
- **Samiti** (`/samiti`) - Committee members
- **Shaskiya Yojna** (`/yojna`) - Government schemes
- **Digital Grampanchayat** (`/digital`) - Online services
- **Photo and Video Gallery** (`/gallery`) - Media gallery
- **Upakaram** (`/upakaram`) - Initiatives and programs
- **Puraskar** (`/puraskar`) - Awards and recognition

## 🎨 Customization

### Adding New Translations

1. Edit `src/locales/en/common.json` for English
2. Edit `src/locales/mr/common.json` for Marathi
3. Use the `t()` function in components: `t('nav.home')`

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/Navigation.js`
4. Add translations for the new page

### Customizing Banner Images

Edit `src/components/data/banners.js` to add your banner images:

```javascript
{
  _id: '1',
  title: 'Your Banner Title',
  imageUrl: 'path/to/your/image.jpg',
  isActive: true,
  order: 1
}
```

## 🔧 Technologies Used

- **React 19** - Frontend framework
- **React Router** - Client-side routing
- **Swiper.js** - Banner slider
- **Tailwind CSS** - Styling framework
- **Context API** - State management for language

## 📱 Responsive Design

The website is fully responsive and works on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🌍 Multilingual Support

- **Default Language**: Marathi
- **Language Toggle**: Available in navigation
- **Persistent**: Language choice saved in localStorage
- **Easy to Extend**: Add new languages by creating new locale files

## 🚀 Deployment

### Build Process
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment Options
- **Netlify**: Drag and drop the `build/` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions
- **Traditional Hosting**: Upload `build/` folder contents

## 📞 Support

For any issues or questions, please contact the development team.

---

**Built with ❤️ for Grampanchayat Khadakozar**