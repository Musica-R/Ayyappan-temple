import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import { GALLERY } from '../data/images.js';
import '../stylesheet/gallery.css';

export default function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  return (
    <>
      <section className="page-hero"><Reveal><h1>{t.gallery.title}</h1><p>{t.gallery.sub}</p></Reveal></section>
      <section className="section">
        <div className="container gal-grid">
          {GALLERY.map((g, k) => (
            <Reveal key={k} index={k % 4} className="gal-item"><button onClick={() => setOpen(g)}><SmartImg src={g} alt="gallery" /></button></Reveal>
          ))}
        </div>
      </section>
      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="lb-close" aria-label="close"><FaTimes /></button>
          <img src={open} alt="large" />
        </div>
      )}
    </>
  );
}
