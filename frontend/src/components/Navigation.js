import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { API_URL } from "../utils/config";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSamitiOpen, setIsSamitiOpen] = useState(false);
  const [samitiSubItems, setSamitiSubItems] = useState([]);
  const { language, changeLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSamitiOpen(false);
  };

  const menuItems = [
    { path: "/", key: "home" },
    { path: "/about", key: "about" },
    // Samiti will have a submenu, keep main path
    { path: "/samiti", key: "samiti" },
    { path: "/yojna", key: "yojna" },
    { path: "/digital", key: "digital" },
    { path: "/gallery", key: "gallery" },
    { path: "/upakaram", key: "upakaram" },
    { path: "/puraskar", key: "puraskar" }
  ];

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
            const dynamicCommittees = result.data
              .filter(committee => committee.isActive !== false) // Only show active committees
              .map(committee => ({
              path: committee.route || `/samiti/${committee.path}`,
                label: language === 'mr' ? (committee.titleMarathi || committee.title) : (committee.title || committee.titleMarathi)
            }));
            
            // Use only dynamic committees from API
            setSamitiSubItems(dynamicCommittees);
            return;
          }
        }
        // If API fails or returns no data, show empty array
        if (isMounted) {
          setSamitiSubItems([]);
        }
      } catch (error) {
        console.warn('Failed to fetch committees from API:', error);
        // Fail silently - show empty array instead of static data
        if (isMounted) {
          setSamitiSubItems([]);
        }
      }
    };

    fetchCommittees();
    return () => { isMounted = false; };
  }, [language]);


  return (
    <>
      {/* Upper Header Section */}
      <div className="upper-header-section">
        <div className="upper-header-container">
          {/* Left Side - Main Logo and Title */}
          <div className="left-content">
            <Link to="/" onClick={closeMenu} className="main-logo-link">
              <img 
                src="/images/logo.jpg" 
                alt={language === 'mr' ? 'खडकोजर' : 'Khadakozar'}
                className="main-logo-image"
              />
            </Link>
            <div className="title-section">
              <h1 className="main-title">
                {language === 'mr' ? 'ग्रामपंचायत खडक ओझर' : 'Khadak Ozar Grampanchayat'}
              </h1>
              <p className="subtitle">
                {language === 'mr' ? 'महाराष्ट्र शासन' : 'Government of Maharashtra'}
              </p>
            </div>
          </div>
          
          {/* Right Side - Satyamav Logo */}
          <div className="right-logo">
            <img 
              src="/images/satyamavlogo.png" 
              alt="Satyamav Jayate"
              className="satyamav-logo"
            />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="nav-container">

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {menuItems.map((item) => (
            item.key === 'samiti' ? (
              <li 
                key={item.key} 
                className="dropdown" 
                onMouseEnter={() => setIsSamitiOpen(true)}
                onMouseLeave={() => setIsSamitiOpen(false)}
              >
                <button 
                  className="nav-link dropdown-toggle" 
                  onClick={() => setIsSamitiOpen(!isSamitiOpen)}
                >
                  {t(`nav.${item.key}`)} ▼
                </button>
                {isSamitiOpen && (
                  <div 
                    className="dropdown-menu"
                    onMouseEnter={() => setIsSamitiOpen(true)}
                    onMouseLeave={() => setIsSamitiOpen(false)}
                  >
                    {samitiSubItems.map((sub, index) => (
                      <Link 
                        key={sub.path} 
                        to={sub.path} 
                        className="dropdown-item"
                        onClick={() => setIsSamitiOpen(false)}
                        style={{ 
                          borderBottom: index < samitiSubItems.length - 1 ? '1px solid #f3f4f6' : 'none'
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={item.key}>
                <Link to={item.path} className="nav-link">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            )
          ))}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => changeLanguage(language === 'mr' ? 'en' : 'mr')}
            className="language-btn"
          >
            {language === 'mr' ? 'English' : 'मराठी'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Open menu"
            className="mobile-toggle"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {menuItems.map((item) => (
            item.key === 'samiti' ? (
              <div key={item.key}>
                <button className="mobile-link" onClick={() => setIsSamitiOpen(!isSamitiOpen)}>
                  {t(`nav.${item.key}`)} {isSamitiOpen ? '▼' : '▶'}
                </button>
                {isSamitiOpen && (
                  <div style={{ paddingLeft: '1rem' }}>
                    {samitiSubItems.map((sub) => (
                      <Link 
                        key={sub.path} 
                        to={sub.path} 
                        className="mobile-link" 
                        onClick={closeMenu}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.key} to={item.path} className="mobile-link" onClick={closeMenu}>
                {t(`nav.${item.key}`)}
              </Link>
            )
          ))}
        </div>
      )}
      </nav>
    </>
  );
}
