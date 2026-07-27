import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ChartResult from './pages/ChartResult.jsx';
import Compatibility from './pages/Compatibility.jsx';
import About from './pages/About.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import BlogIndex from './pages/blog/BlogIndex.jsx';
import WhatIsAVedicBirthChart from './pages/blog/WhatIsAVedicBirthChart.jsx';
import MoonSignVsSunSign from './pages/blog/MoonSignVsSunSign.jsx';
import NumerologyBasics from './pages/blog/NumerologyBasics.jsx';
import CompatibilityMatchingExplained from './pages/blog/CompatibilityMatchingExplained.jsx';
import CareerAstrologyBasics from './pages/blog/CareerAstrologyBasics.jsx';
import UnderstandingNakshatras from './pages/blog/UnderstandingNakshatras.jsx';

function Header() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'active' : '');
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          <span className="brand-mark">AstroYantra</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className={isActive('/')}>Your Chart</Link>
          <Link to="/compatibility" className={isActive('/compatibility')}>Compatibility</Link>
          <Link to="https://www.youtube.com/channel/UCHI8_cRMDp4LJJaYkXz5Fbw" target="_blank" rel="noopener noreferrer">
            Youtube
          </Link>
          <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          <Link to="/blog" className={isActive('/blog')}>Blog</Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<ChartResult />} />
          <Route path="/compatibility" element={<Compatibility />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/BlogIndex" element={<BlogIndex />} />
          <Route path="/blog/WhatIsAVedicBirthChart" element={<WhatIsAVedicBirthChart />} />
          <Route path="/blog/MoonSignVsSunSign" element={<MoonSignVsSunSign />} />
          <Route path="/blog/NumerologyBasics" element={<NumerologyBasics />} />
          <Route path="/blog/CompatibilityMatchingExplained" element={<CompatibilityMatchingExplained />} />
          <Route path="/blog/CareerAstrologyBasics" element={<CareerAstrologyBasics />} />
          <Route path="/blog/UnderstandingNakshatras" element={<UnderstandingNakshatras />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
