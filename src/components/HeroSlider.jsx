import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaOm, FaArrowRight, FaArrowDown, FaLandmark } from 'react-icons/fa';
import { MdTempleHindu } from 'react-icons/md';
import { GiLotus } from 'react-icons/gi';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/hero.css';

/* Background image: public/assets/bg.png (plain <img>, so a missing file never breaks the build) */
const BG = `${process.env.PUBLIC_URL || ''}/assets/back.png`;

/* ───────── Reveal timing (seconds) ───────── */
const T_OM = 0.1;
const T_EYEBROW = 0.4;
const T_RULE = 0.7;
const T_TITLE = 1.0;
const WORD_STEP = 0.14;   // gap between each title word
const GAP = 0.25;         // gap after title before text / buttons

/* Splits a title into words, each revealed one after another */
function Words({ text, start }) {
  const words = String(text || '').split(' ');
  return (
    <>
      {words.map((w, k) => (
        <span className="hs-word" key={k} style={{ '--d': `${(start + k * WORD_STEP).toFixed(2)}s` }}>
          {w}
          {k < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </>
  );
}

export default function HeroSlider() {
  const { t } = useLang();
  const slides = t.hero.slides;
  const n = slides.length;

  const [i, setI] = useState(0);
  const heroRef = useRef(null);

  /* slide text autoplay */
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % n), 6500);
    return () => clearInterval(id);
  }, [n, i]); /* restarts the timer when a dot is clicked */

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
        <img className="hero-img" src="/assets/bc1.png" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <div className="hero-shade" />

      <div className="hero-inner">
        <div className="hero-col">
          <div className="hero-slides">
            {slides.map((s, idx) => {
              const wordCount = String(s.title || '').split(' ').length;
              const tText = T_TITLE + wordCount * WORD_STEP + GAP;
              const tBtn1 = tText + 0.3;
              const tBtn2 = tText + 0.5;

              return (
                <div key={idx} className={`hslide ${idx === i ? 'active' : ''}`} aria-hidden={idx !== i}>
                  <span className="hero-om hs-item hs-pop" style={{ '--d': `${T_OM}s` }}><FaOm /></span>

                  <p className="hero-eyebrow hs-item" style={{ '--d': `${T_EYEBROW}s` }}>{s.eyebrow}</p>

                  <div className="hero-rule hs-item hs-rule" style={{ '--d': `${T_RULE}s` }}>
                    <span /><GiLotus /><span />
                  </div>

                  <h1 className="hs-title"><Words text={s.title} start={T_TITLE} /></h1>

                  <p className="hero-text hs-item" style={{ '--d': `${tText.toFixed(2)}s` }}>{s.text}</p>

                  <div className="hero-btns">
                    <Link
                      to="/renovation"
                      className="hbtn hbtn-gold hs-item"
                      style={{ '--d': `${tBtn1.toFixed(2)}s` }}
                      tabIndex={idx === i ? 0 : -1}
                    >
                      <MdTempleHindu /> {t.hero.cta1} <FaArrowRight />
                    </Link>
                    <Link
                      to="/about"
                      className="hbtn hbtn-line hs-item"
                      style={{ '--d': `${tBtn2.toFixed(2)}s` }}
                      tabIndex={idx === i ? 0 : -1}
                    >
                      <FaLandmark /> {t.hero.cta2}
                    </Link>
                  </div>
                </div>
              );
            })}
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