import { useLanguage } from "../hooks/useLanguage";

export default function Footer() {
  const { language } = useLanguage();

  const footerContent = {
    en: {
      description:
        "The aim of this portal is to make our Khadak Ozar Gram Panchayat digital and it has been created to enable citizens to display our work and services from the comfort of their homes, in less time.",
      contentOwned: "Content Owned by",
      department: "Rural Development & Panchayat Raj Department",
      developedBy: "Developed and hosted by",
      nic: "National Informatics Centre",
      ministry:
        "Ministry of Electronics & Information Technology, Government of India",
      lastUpdated: "Last Updated: Sep 04, 2025",
    },
    mr: {
      description:
        "या पोर्टलचा उद्देश आमच्या खडक ओझर ग्राम पंचायताला डिजिटल बनवणे आहे आणि नागरिकांना त्यांच्या घरातूनच आरामात, कमी वेळात आमचे काम आणि सेवा दाखविण्यासाठी तयार केले आहे.",
      contentOwned: "सामग्रीचे मालक",
      department: "ग्रामीण विकास आणि पंचायत राज विभाग",
      developedBy: "विकसित आणि होस्ट केले",
      nic: "राष्ट्रीय सूचना विज्ञान केंद्र",
      ministry:
        "इलेक्ट्रॉनिक्स आणि माहिती तंत्रज्ञान मंत्रालय, भारत सरकार",
      lastUpdated: "शेवटचे अद्यतन: 04 सप्टेंबर, 2025",
    },
  };

  const content = footerContent[language] || footerContent.en;

  return (
    <footer style={{ backgroundColor: "#000", color: "#e5e7eb", marginTop: "2rem" }}>
      {/* Portal Description */}
      <div style={{ borderBottom: "1px solid #374151", padding: "1rem 0" }}>
        <div className="container" style={{ maxWidth: 960, margin: "0 auto", padding: "0 1rem" }}>
          <p style={{ fontSize: "0.95rem", textAlign: "center", lineHeight: 1.7, color: "#d1d5db" }}>
            {content.description}
          </p>
        </div>
      </div>

      {/* Department Info */}
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center", padding: "1rem 1rem" }}>
        <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem", lineHeight: 1.6 }}>
          {content.contentOwned} <span style={{ fontWeight: 600 }}>{content.department}</span>
        </p>
        <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem", lineHeight: 1.6 }}>
          {content.developedBy} <span style={{ fontWeight: 600 }}>{content.nic}</span>,<br />
          {content.ministry}
        </p>
        <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{content.lastUpdated}</p>
      </div>

      {/* Logos Row */}
      <div style={{ backgroundColor: "#000", padding: "0.75rem 0" }}>
        <div className="container" style={{ maxWidth: 960, margin: "0 auto", padding: "0 1rem", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <img src="/images/footer/S3WaaS.svg" alt="S3WaaS" width={120} height={40} style={{ height: 40, width: "auto" }} />
          <img src="/images/footer/NIC.svg" alt="NIC" width={120} height={40} style={{ height: 40, width: "auto" }} />
          <img src="/images/footer/Digital-India.svg" alt="Digital India" width={120} height={40} style={{ height: 40, width: "auto" }} />
        </div>
      </div>
    </footer>
  );
}














