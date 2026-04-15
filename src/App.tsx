import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/Home';
import ContactPage from './pages/Contact';
import PartnersPage from './pages/Partners';
import NewsDetail from './pages/details/News';
import NewsPage from './pages/News';
import ProjectDetail from './pages/details/Project';
import ProjectsPage from './pages/Projects';
import AIChat from './components/sections/AIChat';
// import { CookieProvider } from './contexts/CookieContext';

function App() {
  return (
    <LanguageProvider>
      {/* <CookieProvider> */}
      <Router>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="grow pt-16.25">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <AIChat />
          {/* <CookieConsent /> */}
        </div>
      </Router>
      {/* </CookieProvider> */}
    </LanguageProvider>
  );
}

export default App;