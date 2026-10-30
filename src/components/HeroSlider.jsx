import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaOm, FaArrowRight, FaArrowDown, FaLandmark } from 'react-icons/fa';
import { MdTempleHindu } from 'react-icons/md';
import { GiLotus } from 'react-icons/gi';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/hero.css';

/* Background image: public/assets/bg.png (plain <img>, so a missing file never breaks the build) */
const BG = `${process.env.PUBLIC_URL || ''}/assets/bg.png`;

export default function HeroSlider() {
  const { t } = useLang();
  const slides = t.hero.slides;
  const n = slides.length;

  const [i, setI] = useState(0);
  const heroRef = useRef(null);

  /* slide text autoplay */
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(id);
  }, [n]);

  const scrollDown = () => {
    const el = heroRef.current;
    if (!el) return;
    const hdr = document.querySelector('.header');
    const top = window.scrollY + el.getBoundingClientRect().bottom - (hdr ? hdr.offsetHeight : 118);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-stage">
        <img className="hero-img" src={BG} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <div className="hero-shade" />

      <div className="hero-inner">
        <div className="hero-col">
          <div className="hero-slides">
            {slides.map((s, idx) => (
              <div key={idx} className={`hslide ${idx === i ? 'active' : ''}`} aria-hidden={idx !== i}>
                <span className="hero-om"><FaOm /></span>
                <p className="hero-eyebrow">{s.eyebrow}</p>
                <div className="hero-rule"><span /><GiLotus /><span /></div>
                <h1>{s.title}</h1>
                <p className="hero-text">{s.text}</p>
                <div className="hero-btns">
                  <Link to="/renovation" className="hbtn hbtn-gold" tabIndex={idx === i ? 0 : -1}>
                    <MdTempleHindu /> {t.hero.cta1} <FaArrowRight />
                  </Link>
                  <Link to="/about" className="hbtn hbtn-line" tabIndex={idx === i ? 0 : -1}>
                    <FaLandmark /> {t.hero.cta2}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-dots">
        {slides.map((_, k) => (
          <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`slide ${k + 1}`} />
        ))}
      </div>
      <button type="button" className="h-down" onClick={scrollDown} aria-label="scroll down"><FaArrowDown /></button>
    </section>
  );
}