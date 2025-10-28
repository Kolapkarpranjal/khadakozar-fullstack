import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SamitiPage from './pages/SamitiPage';
import JanArogyaSamitiPage from './pages/JanArogyaSamitiPage';
import KrishiVikasSamitiPage from './pages/KrishiVikasSamitiPage';
import ShaleyVyavasthapanSamitiPage from './pages/ShaleyVyavasthapanSamitiPage';
import RastaArakhaSamitiPage from './pages/RastaArakhaSamitiPage';
import MahimAhilyadeviLokSanchalitSadhanKendraPage from './pages/MahimAhilyadeviLokSanchalitSadhanKendraPage';
import GramSansadhanGatPage from './pages/GramSansadhanGatPage';
import YojnaPage from './pages/YojnaPage';
import DigitalPage from './pages/DigitalPage';
import GalleryPage from './pages/GalleryPage';
import UpakaramPage from './pages/UpakaramPage';
import PuraskarPage from './pages/PuraskarPage';
import BandhkamParvangiForm from './pages/BandhkamParvangiForm';
import JanmNondDakhlaForm from './pages/JanmNondDakhlaForm';
import MrutyuNondDakhlaForm from './pages/MrutyuNondDakhlaForm';
import VivahNondaniDakhlaForm from './pages/VivahNondaniDakhlaForm';
import NamunaNo08Form from './pages/NamunaNo08Form';
import FerfarNondaniForm from './pages/FerfarNondaniForm';
import NamunaNo04KamForm from './pages/NamunaNo04KamForm';
import VyavasayNaharakatDakhlaForm from './pages/VyavasayNaharakatDakhlaForm';
import DaridryaReshaDakhlaForm from './pages/DaridryaReshaDakhlaForm';
import RahivashiDakhlaForm from './pages/RahivashiDakhlaForm';
import TakrarSuchanaForm from './pages/TakrarSuchanaForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/samiti" element={<SamitiPage />} />
            <Route path="/samiti/janArogyaSamiti" element={<JanArogyaSamitiPage />} />
            <Route path="/samiti/KrishiVikasSamiti" element={<KrishiVikasSamitiPage />} />
            <Route path="/samiti/ShaleyVyavasthapanSamiti" element={<ShaleyVyavasthapanSamitiPage />} />
            <Route path="/samiti/RastaArakhaSamiti" element={<RastaArakhaSamitiPage />} />
            <Route path="/samiti/MahimAhilyadeviLokSanchalitSadhanKendra" element={<MahimAhilyadeviLokSanchalitSadhanKendraPage />} />
            <Route path="/samiti/GramSansadhanGat" element={<GramSansadhanGatPage />} />
            <Route path="/yojna" element={<YojnaPage />} />
            <Route path="/digital" element={<DigitalPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/upakaram" element={<UpakaramPage />} />
            <Route path="/puraskar" element={<PuraskarPage />} />
            <Route path="/bandhkam-parvangi-form" element={<BandhkamParvangiForm />} />
            <Route path="/janm-nond-dakhla-form" element={<JanmNondDakhlaForm />} />
            <Route path="/mrutyu-nond-dakhla-form" element={<MrutyuNondDakhlaForm />} />
            <Route path="/vivah-nondani-dakhla-form" element={<VivahNondaniDakhlaForm />} />
            <Route path="/namuna-no08-form" element={<NamunaNo08Form />} />
            <Route path="/ferfar-nondani-form" element={<FerfarNondaniForm />} />
            <Route path="/namuna-no04-kam-form" element={<NamunaNo04KamForm />} />
            <Route path="/vyavasay-naharakat-dakhla-form" element={<VyavasayNaharakatDakhlaForm />} />
            <Route path="/daridrya-resha-dakhla-form" element={<DaridryaReshaDakhlaForm />} />
            <Route path="/rahivashi-dakhla-form" element={<RahivashiDakhlaForm />} />
            <Route path="/takrar-suchana-form" element={<TakrarSuchanaForm />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
