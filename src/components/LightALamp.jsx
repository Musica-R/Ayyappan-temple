import { useState } from 'react';
import { FaOm } from 'react-icons/fa';
import Reveal from './Reveal.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/lightalamp.css';

const LAMPS = 7;

/* English fallback – used only if t.renoPage is missing in translations */
const LAMP_DEFAULT = {
  lampEyebrow: 'Offer a Prayer',
  lampTitle: 'Light a Lamp for the Temple',
  lampSub: 'Tap a lamp to light it with your prayer. Every flame is a wish for the shrine to rise again.',
  lampsLit: 'lamps lit',
  lampAll: 'Light all lamps',
  lampReset: 'Start again',
  lampBless: 'Swamiye Saranam! May your prayer be heard.',
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
        <linearGradient id="ll-brass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8b5a12" />
          <stop offset=".22" stopColor="#f6dc8b" />
          <stop offset=".5" stopColor="#c9993f" />
          <stop offset=".78" stopColor="#f0cf75" />
          <stop offset="1" stopColor="#7a4c0e" />
        </linearGradient>
        <radialGradient id="ll-flame-out" cx=".5" cy=".75" r=".75">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset=".55" stopColor="#ff9a1f" />
          <stop offset="1" stopColor="#ff5a00" />
        </radialGradient>
        <radialGradient id="ll-flame-core" cx=".5" cy=".8" r=".8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#fff3b0" />
          <stop offset="1" stopColor="#ffd34d" />
        </radialGradient>
        <radialGradient id="ll-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffbe46" stopOpacity=".5" />
          <stop offset=".5" stopColor="#ffa526" stopOpacity=".18" />
          <stop offset="1" stopColor="#ffa526" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* One brass oil lamp (viewBox 80 × 130) */
function Lamp() {
  return (
    <svg className="ll-lamp-svg" viewBox="0 0 80 130" aria-hidden="true" focusable="false">
      {/* warm glow behind the flame */}
      <circle className="ll-glow" cx="40" cy="48" r="58" fill="url(#ll-glow)" />

      {/* base + stem + knob */}
      <ellipse cx="40" cy="124" rx="25" ry="4.5" fill="url(#ll-brass)" />
      <path d="M20 124 C20 114 30 108 40 108 C50 108 60 114 60 124 Z" fill="url(#ll-brass)" />
      <path d="M35 96 L45 96 L43.5 109 L36.5 109 Z" fill="url(#ll-brass)" />
      <ellipse cx="40" cy="102" rx="7.5" ry="3.5" fill="url(#ll-brass)" />
      <ellipse cx="40" cy="109" rx="9" ry="2.4" fill="#f6dc8b" opacity=".55" />

      {/* bowl */}
      <path d="M13 72 C13 88 27 96 40 96 C53 96 67 88 67 72 Z" fill="url(#ll-brass)" />
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
      <ellipse cx="40" cy="72" rx="27" ry="6.5" fill="url(#ll-brass)" />
      <ellipse className="ll-oil" cx="40" cy="72" rx="22.5" ry="4.4" />

      {/* wick */}
      <rect x="38.4" y="62" width="3.2" height="10" rx="1.4" fill="#2a1408" />

      {/* flame */}
      <g className="ll-flame">
        <path
          d="M40 24 C48 37 53 46 51 55 C50 62 45 66 40 66 C35 66 30 62 29 55 C27 46 32 37 40 24 Z"
          fill="url(#ll-flame-out)"
        />
        <path
          className="ll-flame-in"
          d="M40 40 C45 48 46.5 54 44.5 59 C43.5 62 42 63.5 40 63.5 C38 63.5 36.5 62 35.5 59 C33.5 54 35 48 40 40 Z"
          fill="url(#ll-flame-core)"
        />
      </g>
    </svg>
  );
}

export default function LightALamp() {
  const { t } = useLang();
  const c = { ...LAMP_DEFAULT, ...(t.renoPage || {}) };

  const [lit, setLit] = useState(() => Array(LAMPS).fill(false));
  const count = lit.filter(Boolean).length;
  const toggle = (i) => setLit((l) => l.map((v, k) => (k === i ? !v : v)));
  const lightAll = () => setLit(Array(LAMPS).fill(true));
  const reset = () => setLit(Array(LAMPS).fill(false));

  return (
    <section className="ll-section">
      <LampDefs />
      <div className="container">
        <Reveal>
          <span className="ll-eyebrow"><FaOm /> {c.lampEyebrow}</span>
          <h2>{c.lampTitle}</h2>
          <p className="ll-sub">{c.lampSub}</p>
        </Reveal>

        <div className="ll-row">
          {lit.map((on, i) => (
            <button
              key={i}
              type="button"
              className={`ll-lamp${on ? ' is-lit' : ''}`}
              onClick={() => toggle(i)}
              aria-pressed={on}
              aria-label={`${c.lampTitle} ${i + 1}`}
            >
              <Lamp />
            </button>
          ))}
        </div>

        <p className="ll-count" aria-live="polite">
          <strong>{count} / {LAMPS}</strong> {c.lampsLit}
        </p>
        <p className={`ll-bless${count > 0 ? ' is-on' : ''}`} aria-live="polite">
          {count > 0 ? c.lampBless : '\u00A0'}
        </p>

        <div className="ll-actions">
          <button type="button" className="ll-btn ll-btn-fill" onClick={lightAll}>
            <FaOm /> {c.lampAll}
          </button>
          <button type="button" className="ll-btn" onClick={reset}>{c.lampReset}</button>
        </div>
      </div>
    </section>
  );
}