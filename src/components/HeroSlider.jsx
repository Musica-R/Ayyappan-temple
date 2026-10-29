import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaOm, FaArrowRight } from 'react-icons/fa';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/hero.css';

const BGS = ["/assets/t1.jpg", "/assets/t2.jpg", "/assets/t3.jpg"];

export default function HeroSlider() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const n = t.hero.slides.length;

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(id);
  }, [n]);

  return (
    <section className="hero">
      {t.hero.slides.map((s, idx) => (
        <div key={idx} className={`slide ${idx === i ? 'active' : ''}`} style={{ backgroundImage: `url(${BGS[idx]})` }}>
          <div className="slide-shade" />
          <div className="container slide-content">
            <span className="hero-om"><FaOm /></span>
            <p className="hero-eyebrow">{s.eyebrow}</p>
            <h1>{s.title}</h1>
            <p className="hero-text">{s.text}</p>
            <div className="hero-btns">
              <Link to="/renovation" className="btn btn-gold">{t.hero.cta1} <FaArrowRight /></Link>
              <Link to="/about" className="btn btn-line">{t.hero.cta2}</Link>
            </div>
          </div>
        </div>
      ))}
      <button className="h-arrow left" onClick={() => setI((i - 1 + n) % n)} aria-label="prev"><FaChevronLeft /></button>
      <button className="h-arrow right" onClick={() => setI((i + 1) % n)} aria-label="next"><FaChevronRight /></button>
      <div className="h-dots">{t.hero.slides.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`slide ${k + 1}`} />)}</div>
    </section>
  );
}
