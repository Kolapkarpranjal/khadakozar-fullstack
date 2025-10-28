import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getAllMembers } from "./data/members";

// Function to get translated member name
const getTranslatedMemberName = (englishName, lang, translations) => {
  // Create a mapping of English names to translation keys
  const nameMapping = {
    "Sagar Vasantrao Pagar": "sagarVasantraoPagar",
    "Govind Tulshiram Pagar": "govindTulshiramPagar", 
    "Harshad Janardan Pagar": "harshadJanardanPagar",
    "Devidas Tatyaba Pagar": "devidasTatyabaPagar",
    "Sharad Ramchandra Bhavar": "sharadRamchandraBhavar",
    "Shivaji Chindhu Ghodhade": "shivajiChindhuGhodhade",
    "Sarika Ashok Pagar": "sarikaAshokPagar",
    "Ratna Atmaram Pagar": "ratnaAtmaramPagar",
    "Sonali Sunil Bhavar": "sonaliSunilBhavar",
    "Aruna Khanderao Pagar": "arunaKhanderaoPagar",
    "Laxmibai Chahadu Suryawanshi": "laxmibaiChahaduSuryawanshi",
    "Priyanka Shivanath Kedare": "priyankaShivanathKedare",
    "Roshan Balwant Suryavanshi": "roshanBalwantSuryavanshi",
    "Sushil Rajendra Kedare": "sushilRajendraKedare",
    "Ganesh Kedu Pagar": "ganeshKeduPagar",
    "Kailas Ramdas Pagar": "kailasRamdasPagar",
    "Sahebrao Nivritti Kank": "sahebraoNivrittiKank"
  };

  const translationKey = nameMapping[englishName];
  if (translationKey && translations.directory?.members?.gramPanchayat) {
    return translations.directory.members.gramPanchayat[translationKey] || englishName;
  }
  
  // If no translation found, return the original name
  return englishName;
};

// Function to get translated designation
const getTranslatedDesignation = (englishDesignation, lang, translations) => {
  // Create a mapping of English designations to translation keys
  const designationMapping = {
    "Sarpanch (Head of Village Council)": "sarpanch",
    "Deputy Sarpanch (Deputy Head of Village Council)": "deputySarpanch",
    "Member": "member",
    "Member (Female)": "femaleMember",
    "Gram Panchayat Officer": "gramPanchayatOfficer",
    "Computer Operator": "computerOperator",
    "Clerk Vasuli Karkun": "clerkVasuliKarkun",
    "Gram Rojgar Sahayak": "gramRojgarSahayak",
    "Water Supply Employee": "waterSupplyEmployee"
  };

  const translationKey = designationMapping[englishDesignation];
  if (translationKey && translations.directory?.designations) {
    return translations.directory.designations[translationKey] || englishDesignation;
  }
  
  // If no translation found, return the original designation
  return englishDesignation;
};

export default function MembersSection() {
  const [memberImages, setMemberImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Load static members only (for static export compatibility)
    const staticMembers = getAllMembers(language);
    setMemberImages(staticMembers);
    setLoading(false);
  }, [language]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        <h2 className="section-title">
          {t('home.members.title')}
        </h2>

        {loading ? (
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            {/* Loading state for Sarpanch and Deputy Sarpanch */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1.5rem', 
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              {[...Array(2)].map((_, index) => {
                const isSarpanch = index === 0;
                const imageSize = isSarpanch ? '220px' : '180px';
                
                return (
                  <div key={index} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    marginTop: isSarpanch ? '0' : '12px',
                    minWidth: '200px'
                  }}>
                    <div style={{
                      width: imageSize,
                      height: imageSize,
                      backgroundColor: '#e5e7eb',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}></div>
                  <div style={{
                    marginTop: isSarpanch ? '1.5rem' : '1.7rem',
                    height: '1.25rem',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.25rem',
                    width: '10rem',
                    animation: 'pulse 2s infinite'
                  }}></div>
                    <div style={{
                      marginTop: isSarpanch ? '0.75rem' : '0.95rem',
                      height: '1rem',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '0.25rem',
                      width: '8rem',
                      animation: 'pulse 2s infinite'
                    }}></div>
                  </div>
                );
              })}
            </div>
            {/* Loading state for other members */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem', 
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {[...Array(15)].map((_, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <div style={{
                    marginTop: '1.25rem',
                    height: '1.125rem',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.25rem',
                    width: '8rem',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <div style={{
                    marginTop: '0.5rem',
                    height: '1rem',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.25rem',
                    width: '7rem',
                    animation: 'pulse 2s infinite'
                  }}></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: isMobile ? '100%' : '1140px', margin: '0 auto', paddingLeft: isMobile ? '1rem' : 0, paddingRight: isMobile ? '1rem' : 0 }}>
            {/* Sarpanch and Deputy Sarpanch - First Row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: isMobile ? '1.5rem' : '3rem', 
              marginBottom: isMobile ? '2rem' : '3rem',
              flexWrap: 'wrap'
            }}>
              {memberImages
                .filter(member => member.order <= 2)
                .map((member) => {
                  const translatedName = getTranslatedMemberName(member.memberName, language, t);
                  const translatedDesignation = getTranslatedDesignation(member.memberDesignation, language, t);
                  
                  // Make Sarpanch image bigger than Up-Sarpanch
                  const isSarpanch = member.order === 1;
                  const imageSize = isSarpanch ? (isMobile ? '180px' : '260px') : (isMobile ? '140px' : '220px');
                  
                  return (
                    <div key={member._id} style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      marginTop: isSarpanch ? '0' : '8px',
                      minWidth: '200px'
                    }}>
                      <div style={{
                        width: imageSize,
                        height: imageSize,
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: isMobile ? '4px solid #e5e7eb' : '6px solid #e5e7eb',
                        boxShadow: isMobile ? '0 10px 20px rgba(0,0,0,0.08)' : '0 18px 30px rgba(0,0,0,0.12)'
                      }}>
                        <img
                          src={member.imageUrl}
                          alt={translatedName}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <h3 style={{
                        marginTop: isSarpanch ? (isMobile ? '0.9rem' : '1.25rem') : (isMobile ? '1rem' : '1.4rem'),
                        fontSize: isSarpanch ? (isMobile ? '1.15rem' : '1.35rem') : (isMobile ? '1.05rem' : '1.25rem'),
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        color: '#1f2937'
                      }}>{translatedDesignation}</h3>
                      <p style={{
                        color: '#374151',
                        fontSize: isSarpanch ? (isMobile ? '1.05rem' : '1.25rem') : (isMobile ? '0.95rem' : '1.125rem'),
                        textAlign: 'center',
                        lineHeight: '1.2',
                        fontWeight: '500',
                        marginTop: isSarpanch ? (isMobile ? '0.3rem' : '0.35rem') : (isMobile ? '0.4rem' : '0.6rem')
                      }}>{translatedName}</p>
                    </div>
                  );
                })}
            </div>
            
            {/* Other Members - 3-column desktop grid like screenshot */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))',
              gap: isMobile ? '1.5rem' : '2rem',
              textAlign: 'center',
              maxWidth: '980px',
              margin: '0 auto'
            }}>
              {memberImages
                .filter(member => member.order > 2)
                .map((member) => {
                  const translatedName = getTranslatedMemberName(member.memberName, language, t);
                  const translatedDesignation = getTranslatedDesignation(member.memberDesignation, language, t);
                  
                  return (
                    <div key={member._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: isMobile ? '120px' : '150px',
                        height: isMobile ? '120px' : '150px',
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: isMobile ? '3px solid #e5e7eb' : '4px solid #e5e7eb',
                        boxShadow: isMobile ? '0 8px 14px rgba(0,0,0,0.06)' : '0 10px 18px rgba(0,0,0,0.08)'
                      }}>
                        <img
                          src={member.imageUrl}
                          alt={translatedName}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <h3 style={{
                        marginTop: isMobile ? '0.7rem' : '0.9rem',
                        fontSize: isMobile ? '0.95rem' : '1.05rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        color: '#1f2937'
                      }}>{translatedDesignation}</h3>
                      <p style={{
                        color: '#374151',
                        fontSize: isMobile ? '0.9rem' : '0.95rem',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        marginTop: isMobile ? '0.3rem' : '0.35rem',
                        fontWeight: '500'
                      }}>{translatedName}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
