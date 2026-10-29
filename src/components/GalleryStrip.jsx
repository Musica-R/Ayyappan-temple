import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { useLang } from '../utils/LanguageContext.jsx';
import { GALLERY } from '../data/images.js';
import SectionTitle from './SectionTitle.jsx';
import Reveal from './Reveal.jsx';
import SmartImg from './SmartImg.jsx';

export default function GalleryStrip() {
  const { t } = useLang();
  const ref = useRef(null);
  const go = (d) => ref.current?.scrollBy({ left: d * 300, behavior: 'smooth' });
  return (
    <section className="band-maroon">
      <div className="container">
        <SectionTitle light title={t.gallery.title} sub={t.gallery.sub} />
        <div className="strip-wrap">
          <button className="strip-arrow" onClick={() => go(-1)} aria-label="prev"><FaChevronLeft /></button>
          <div className="strip" ref={ref}>
            {GALLERY.map((g, k) => <Reveal key={k} index={k} className="strip-item"><SmartImg src={g} alt="temple" /></Reveal>)}
          </div>
          <button className="strip-arrow" onClick={() => go(1)} aria-label="next"><FaChevronRight /></button>
        </div>
        <div className="center"><Link to="/gallery" className="btn btn-line">{t.gallery.all} <FaArrowRight /></Link></div>
      </div>
    </section>
  );
}
