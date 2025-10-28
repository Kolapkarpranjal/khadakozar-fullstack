import { useLanguage } from "../hooks/useLanguage";

export default function NewsTicker() {
  const { t } = useLanguage();

  const newsItems = [
    t('home.title'),
    "Latest updates from Grampanchayat Khadakozar",
    "Digital services now available",
    "Community development programs in progress"
  ];

  return (
    <div className="news-ticker">
      <div className="news-content">
        <span className="news-badge">
          {t('common.loading')}
        </span>
        <div className="news-text">
          <div className="news-scroll">
            {newsItems.map((item, index) => (
              <span key={index} style={{ marginRight: '2rem' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
