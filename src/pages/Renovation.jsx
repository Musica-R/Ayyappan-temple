import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaOm, FaArrowRight, FaLandmark, FaMapMarkedAlt, FaScroll, FaFemale,
  FaQuoteLeft, FaHandHoldingHeart, FaSyncAlt, FaLeaf,
} from 'react-icons/fa';
import { GiLotusFlower } from 'react-icons/gi';
import Reveal from '../components/Reveal.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/renovation.css';

const FACT_ICONS = [FaLandmark, FaMapMarkedAlt, FaScroll, FaFemale];
const LAMPS = 7;
const HANG_LAMP = '/assets/lamp1.png';

/* English fallback – used only if t.renoPage is missing in translations */
const RENO_DEFAULT = {
  eyebrow: 'A Sincere Appeal',
  facts: [
    { v: 'Centuries', l: 'Of temple heritage' },
    { v: '40 cents', l: 'Land set aside for the shrine' },
    { v: 'Deva Prashnam', l: 'Guides every step' },
    { v: 'Women-led', l: 'Devotee group at the helm' },
  ],
  noticeTag: 'Important Notice',
  lampEyebrow: 'Offer a Prayer',
  lampTitle: 'Light a Lamp for the Temple',
  lampSub: 'Tap a lamp to light it with your prayer. Every flame is a wish for the shrine to rise again.',
  lampsLit: 'lamps lit',
  lampAll: 'Light all lamps',
  lampReset: 'Start again',
  lampBless: 'Swamiye Saranam! May your prayer be heard.',
  ctaTitle: 'Be Part of the Restoration',
  ctaText: 'Come forward with your prayers, your presence and your support.',
  ctaBtn2: 'Learn about the temple',
};

/* Shared gradients – rendered once, referenced by every lamp */
function LampDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="rn-brass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8b5a12" />
          <stop offset=".22" stopColor="#f6dc8b" />
          <stop offset=".5" stopColor="#c9993f" />
          <stop offset=".78" stopColor="#f0cf75" />
          <stop offset="1" stopColor="#7a4c0e" />
        </linearGradient>
        <radialGradient id="rn-flame-out" cx=".5" cy=".75" r=".75">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset=".55" stopColor="#ff9a1f" />
          <stop offset="1" stopColor="#ff5a00" />
        </radialGradient>
        <radialGradient id="rn-flame-core" cx=".5" cy=".8" r=".8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#fff3b0" />
          <stop offset="1" stopColor="#ffd34d" />
        </radialGradient>
        <radialGradient id="rn-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffbe46" stopOpacity=".5" />
          <stop offset=".5" stopColor="#ffa526" stopOpacity=".18" />
          <stop offset="1" stopColor="#ffa526" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rn-wave-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9993f" stopOpacity=".2" />
          <stop offset=".5" stopColor="#f6dc8b" />
          <stop offset="1" stopColor="#c9993f" stopOpacity=".2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* One brass oil lamp (viewBox 80 × 130) */
function Lamp() {
  return (
    <svg className="rn-lamp-svg" viewBox="0 0 80 130" aria-hidden="true" focusable="false">
      {/* warm glow behind the flame */}
      <circle className="rn-lamp-glow" cx="40" cy="48" r="58" fill="url(#rn-glow)" />

      {/* base + stem + knob */}
      <ellipse cx="40" cy="124" rx="25" ry="4.5" fill="url(#rn-brass)" />
      <path d="M20 124 C20 114 30 108 40 108 C50 108 60 114 60 124 Z" fill="url(#rn-brass)" />
      <path d="M35 96 L45 96 L43.5 109 L36.5 109 Z" fill="url(#rn-brass)" />
      <ellipse cx="40" cy="102" rx="7.5" ry="3.5" fill="url(#rn-brass)" />
      <ellipse cx="40" cy="109" rx="9" ry="2.4" fill="#f6dc8b" opacity=".55" />

      {/* bowl */}
      <path d="M13 72 C13 88 27 96 40 96 C53 96 67 88 67 72 Z" fill="url(#rn-brass)" />
      <path
        d="M18 82 C26 88 54 88 62 82"
        stroke="#5a3508"
        strokeOpacity=".35"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M20 77 C20 84 25 89 31 91"
        stroke="#fff"
        strokeOpacity=".4"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* rim + oil */}
      <ellipse cx="40" cy="72" rx="27" ry="6.5" fill="url(#rn-brass)" />
      <ellipse className="rn-oil" cx="40" cy="72" rx="22.5" ry="4.4" />

      {/* wick */}
      <rect x="38.4" y="62" width="3.2" height="10" rx="1.4" fill="#2a1408" />

      {/* flame */}
      <g className="rn-flame">
        <path
          d="M40 24 C48 37 53 46 51 55 C50 62 45 66 40 66 C35 66 30 62 29 55 C27 46 32 37 40 24 Z"
          fill="url(#rn-flame-out)"
        />
        <path
          className="rn-flame-in"
          d="M40 40 C45 48 46.5 54 44.5 59 C43.5 62 42 63.5 40 63.5 C38 63.5 36.5 62 35.5 59 C33.5 54 35 48 40 40 Z"
          fill="url(#rn-flame-core)"
        />
      </g>
    </svg>
  );
}

/* Hanging brass lamp image (decorative) */
function Hang({ className }) {
  return (
    <img
      src={HANG_LAMP}
      alt=""
      aria-hidden="true"
      className={`rn-hang ${className}`}
      loading="lazy"
      draggable="false"
    />
  );
}

export default function Renovation() {
  const { t } = useLang();
  const r = t.reno;
  const c = { ...RENO_DEFAULT, ...(t.renoPage || {}) };

  const [lit, setLit] = useState(() => Array(LAMPS).fill(false));
  const count = lit.filter(Boolean).length;
  const toggle = (i) => setLit((l) => l.map((v, k) => (k === i ? !v : v)));
  const lightAll = () => setLit(Array(LAMPS).fill(true));
  const reset = () => setLit(Array(LAMPS).fill(false));

  const last = r.paras.length - 1;

  /* "Light a Lamp for the" + big italic last word ("Temple") */
  const titleWords = c.lampTitle.trim().split(/\s+/);
  const titleEm = titleWords.length > 1 ? titleWords.pop() : '';
  const titleMain = titleWords.join(' ');

  return (
    <>
      <section className="page-hero">
        <Reveal><h1>{r.title}</h1><p>{r.sub}</p></Reveal>
      </section>

      {/* ───────── APPEAL LETTER + PATH ───────── */}
      <section className="section rn-main">
        <div className="container rn-grid">
          <article className="rn-notice">
            <Reveal>
              <span className="rn-eyebrow"><FaOm /> {c.eyebrow}</span>
              <h3 className="rn-greeting">{r.greeting}</h3>
            </Reveal>

            {r.paras.map((p, k) => {
              if (k === 0) {
                return <Reveal key={k} className="rn-lead"><p>{p}</p></Reveal>;
              }
              if (k === 3) {
                return (
                  <Reveal key={k} className="rn-callout">
                    <span className="rn-callout-tag"><FaScroll /> {c.noticeTag}</span>
                    <p>{p}</p>
                  </Reveal>
                );
              }
              if (k === last) {
                return (
                  <Reveal key={k} className="rn-close">
                    <FaQuoteLeft className="rn-close-q" />
                    <p>{p}</p>
                  </Reveal>
                );
              }
              return <Reveal key={k} index={k % 3} className="rn-para"><p>{p}</p></Reveal>;
            })}

            <Reveal className="rn-sign">
              <div>
                <p className="rn-saranam"><FaOm /> {r.saranam}</p>
                <strong>{r.org}</strong>
                <small>{r.behalf}</small>
              </div>
              <span className="rn-seal"><FaOm /></span>
            </Reveal>
          </article>

          <aside className="rn-steps">
            <Reveal>
              <h3><FaOm /> {r.stepsTitle}</h3>
            </Reveal>
            <ol className="rn-steps-list">
              {r.steps.map((s, k) => (
                <Reveal key={k} index={k} className="rn-step">
                  <span className="rn-step-num">{k + 1}</span>
                  <span className="rn-step-text">{s}</span>
                </Reveal>
              ))}
            </ol>
            <Reveal index={4}>
              <Link to="/contact" className="btn btn-gold">{r.cta} <FaArrowRight /></Link>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ───────── LIGHT A LAMP ───────── */}
      <section className="rn-lamps">
        <LampDefs />

        {/* hanging lamps – section corners */}
        <Hang className="rn-hang-tl" />
        <Hang className="rn-hang-tr1" />
        {/* <Hang className="rn-hang-tr2" /> */}

        {/* gold leaf sprigs – bottom corners */}
        <span className="rn-leaves rn-leaves-l" aria-hidden="true">
          <FaLeaf /><FaLeaf /><FaLeaf />
        </span>
        <span className="rn-leaves rn-leaves-r" aria-hidden="true">
          <FaLeaf /><FaLeaf /><FaLeaf />
        </span>

        <div className="container rn-lamps-grid">
          {/* left: framed image */}
          <Reveal className="rn-lamps-media">
            <div className="rn-lamps-frame">
              <span className="rn-frame-lotus rn-frame-lotus-t" aria-hidden="true"><GiLotusFlower /></span>
              <span className="rn-frame-lotus rn-frame-lotus-b" aria-hidden="true"><GiLotusFlower /></span>

              {/* lamps hanging inside the frame */}
              {/* <Hang className="rn-hang-in1" />
              <Hang className="rn-hang-in2" /> */}

              <div className="rn-lamps-pic">
                <img src="/assets/a2.png" alt={c.lampTitle} loading="lazy" />
              </div>
            </div>
          </Reveal>

          {/* right: heading + lamps */}
          <div className="rn-lamps-body">
            <Reveal>
              <div className="rn-eyebrow-wrap">
                <span className="rn-orn" aria-hidden="true" />
                <span className="rn-lamps-eyebrow"><FaOm /> {c.lampEyebrow}</span>
                <span className="rn-orn rn-orn-r" aria-hidden="true" />
              </div>

              <h2 className="rn-title">
                <span className="rn-title-main">{titleMain}</span>
                {titleEm && <span className="rn-title-em">{titleEm}</span>}
              </h2>

              <p className="rn-lamps-sub">{c.lampSub}</p>
            </Reveal>

            <div className="rn-lamp-row">
              {lit.map((on, i) => (
                <button
                  key={i}
                  type="button"
                  className={`rn-lamp${on ? ' is-lit' : ''}`}
                  onClick={() => toggle(i)}
                  aria-pressed={on}
                  aria-label={`${c.lampTitle} ${i + 1}`}
                >
                  <Lamp />
                </button>
              ))}
            </div>

            <div className="rn-count-wrap">
              <span className="rn-orn" aria-hidden="true" />
              <p className="rn-lamp-count" aria-live="polite">
                <strong>{count} / {LAMPS}</strong> {c.lampsLit}
              </p>
              <span className="rn-orn rn-orn-r" aria-hidden="true" />
            </div>

            <p className={`rn-lamp-bless${count > 0 ? ' is-on' : ''}`} aria-live="polite">
              {count > 0 ? c.lampBless : '\u00A0'}
            </p>

            <div className="rn-lamp-actions">
              <button type="button" className="rn-lamp-btn rn-lamp-btn-fill" onClick={lightAll}>
                <FaOm /> {c.lampAll}
              </button>
              <button type="button" className="rn-lamp-btn" onClick={reset}>
                <FaSyncAlt /> {c.lampReset}
              </button>
            </div>
          </div>
        </div>

        {/* curved cream bottom edge + lotus */}
        <div className="rn-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" focusable="false">
            <path className="rn-wave-fill" d="M0 38 C180 10 360 56 720 58 C1080 60 1260 10 1440 38 L1440 90 L0 90 Z" />
            <path d="M0 38 C180 10 360 56 720 58 C1080 60 1260 10 1440 38" fill="none" stroke="url(#rn-wave-gold)" strokeWidth="3" />
          </svg>
          <div className="rn-wave-lotus">
            <span className="rn-orn" />
            <GiLotusFlower />
            <span className="rn-orn rn-orn-r" />
          </div>
        </div>
      </section>

      {/* ───────── CLOSING CTA ───────── */}
      <section className="rn-cta">
        <div className="container rn-cta-in">
          <Reveal className="rn-cta-text">
            <span className="rn-cta-ic"><FaHandHoldingHeart /></span>
            <div>
              <h2>{c.ctaTitle}</h2>
              <p>{c.ctaText}</p>
            </div>
          </Reveal>
          <Reveal index={1} className="rn-cta-btns">
            <Link to="/contact" className="btn btn-maroon">{r.cta} <FaArrowRight /></Link>
            <Link to="/about" className="rn-btn-ghost">{c.ctaBtn2} <FaArrowRight /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}