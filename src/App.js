import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import ScrollToTop from './utils/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Renovation from './pages/Renovation.jsx';
import Gallery from './pages/Gallery.jsx';
import Festivals from './pages/Festivals.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/renovation" element={<Renovation />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}