import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaOm, FaArrowRight, FaLandmark, FaMapMarkedAlt, FaScroll, FaFemale,
  FaQuoteLeft, FaHandHoldingHeart, FaSyncAlt, FaLeaf,
  FaHome, FaColumns, FaGem, FaLayerGroup, FaMonument, FaTree,
  FaPencilRuler, FaSearchPlus, FaTimes,
  FaStar, FaMountain, FaFire,
  FaUsers,
} from 'react-icons/fa';
import { GiLotusFlower } from 'react-icons/gi';
import Reveal from '../components/Reveal.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/renovation.css';

const FACT_ICONS = [FaLandmark, FaMapMarkedAlt, FaScroll, FaFemale];
const STRUCT_ICONS = [FaMonument, FaHome, FaColumns, FaGem, FaLayerGroup, FaTree];
const JY_ICONS = [FaStar, FaMountain, FaHandHoldingHeart];
const LAMPS = 7;
const HANG_LAMP = '/assets/lamp1.png';
const IMG_RENDER = '/assets/bc1.png';
const IMG_BLUEPRINT = '/assets/blueprint.jpeg';

/* fixed star positions for the Makara Jyothi night scene: [x, y, radius, delay] */
const STARS = [
  [40, 30, 1.6, 0], [95, 62, 1.1, 1.2], [150, 24, 1.4, .6], [210, 70, 1, 2.1],
  [262, 38, 1.7, .3], [330, 22, 1.2, 1.6], [385, 66, 1.5, .9], [440, 34, 1, 2.4],
  [500, 58, 1.6, .2], [558, 26, 1.3, 1.4], [70, 110, 1, 1.9], [180, 120, 1.2, .5],
  [420, 112, 1.1, 1.1], [535, 104, 1.4, 2.2], [290, 96, 1, .8],
];

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

  /* ── temple structure ── */
  structEyebrow: 'The New Shrine',
  structTitle: 'The Temple Structure',
  structSub: 'This is how the restored shrine will look once construction is complete, in the traditional Kerala style.',
  renderTag: 'After Construction',
  renderCap: 'Artist’s impression of the completed shrines',
  blueprintTag: 'Original Plan',
  blueprintCap: 'Hand-drawn blueprint prepared for the construction',
  zoomHint: 'Tap an image to enlarge',
  closeLabel: 'Close',
  structFeaturesT: 'Highlights of the Design',
  structFeatures: [
    { t: 'Twin Shrines', d: 'Two sreekovils side by side: one for Lord Dharma Sastha and one for Devi.' },
    { t: 'Tiled Roof', d: 'A four-sided sloping roof of red clay tiles with graceful upturned corners.' },
    { t: 'Wooden Pillars', d: 'Turned and polished timber pillars with carved wooden walls and eaves.' },
    { t: 'Golden Kalasam', d: 'A golden finial crowns each roof, the sacred mark of a Kerala shrine.' },
    { t: 'Granite Base', d: 'A stepped granite base (adhishthanam) raises each shrine above the ground.' },
    { t: 'Open Courtyard', d: 'A sandy courtyard shaded by coconut palms and greenery for a peaceful setting.' },
  ],
  structNote: 'The images are for reference. The final construction may vary slightly as guided by the Deva Prashnam and the temple tantri.',

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

/* English fallback for the Makara Jyothi section – used only if t.jyothi is missing */
const JY_DEFAULT = {
  eyebrow: 'Faith of the Elders',
  title: 'Makara Jyothi Darshan at Ayyappankadu',
  sub: 'A belief and tradition handed down by the elders of the village.',
  tag: 'Makara Jyothi',
  intro: 'The elders recall that the Makara Jyothi darshan was once a part of life at Ayyappankadu too.',
  beats: [
    {
      tag: 'The Belief',
      t: 'Uthram, the Lord’s birth star',
      d: 'The Uthram star of the month of Makaram is believed to be the birth star of Lord Ayyappa. On this holy day, the sages of the Sabarimala ashrams and the tribal communities worshipped the Lord with camphor aarti and chants of Saranam, and devotees bowed to that light from afar. We know that this custom continues even today.',
    },
    {
      tag: 'The Sight',
      t: 'The light from Ayyappanmala',
      d: 'On Makara Vilakku day, the devotees of Ayyappankadu would behold the glow of the camphor aarti lit at the forest shrine known as Ayyappanmala in Palakkad. They saw that divine light with devotion, called out Saranam and bowed to the Lord, say the elders.',
    },
    {
      tag: 'The Hope',
      t: 'To be revived after the rebuilding',
      d: 'Once the reconstruction of the Ayyappankadu temple is complete, it is the wish of the devotees to revive this sacred Jyothi darshan and make it a grand spiritual celebration.',
    },
  ],
  quote: 'In the darkness of adharma in Kali Yuga, may the Ayyappa Jyothi lead people into the light of hope and dharma, and bring the light of devotion and goodness to every heart.',
  saranam: 'Swamiye Saranam Ayyappa!',
};

/* English fallback for the committee section – used only if t.committee is missing */
const COM_DEFAULT = {
  eyebrow: 'Our Office Bearers',
  title: 'The Temple Committee',
  sub: 'Devotees who lead the restoration with faith and dedication.',
  head: ['No.', 'Position', 'Name'],
  groups: [
    { role: 'President', names: ['Prof. Shobha Rani'] },
    { role: 'Vice President', names: ['Prasanna Vasudevan'] },
    { role: 'Secretaries', names: ['Sreemathy Radha Ramanunni', 'Premakumari', 'Maheshwari Mani'] },
    { role: 'Treasurer', names: ['Saritha Ramdas'] },
    { role: 'Joint Treasurer', names: ['Bhamini Murali'] },
  ],
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
      <circle className="rn-lamp-glow" cx="40" cy="48" r="58" fill="url(#rn-glow)" />

      <ellipse cx="40" cy="124" rx="25" ry="4.5" fill="url(#rn-brass)" />
      <path d="M20 124 C20 114 30 108 40 108 C50 108 60 114 60 124 Z" fill="url(#rn-brass)" />
      <path d="M35 96 L45 96 L43.5 109 L36.5 109 Z" fill="url(#rn-brass)" />
      <ellipse cx="40" cy="102" rx="7.5" ry="3.5" fill="url(#rn-brass)" />
      <ellipse cx="40" cy="109" rx="9" ry="2.4" fill="#f6dc8b" opacity=".55" />

      <path d="M13 72 C13 88 27 96 40 96 C53 96 67 88 67 72 Z" fill="url(#rn-brass)" />
      <path d="M18 82 C26 88 54 88 62 82" stroke="#5a3508" strokeOpacity=".35" strokeWidth="1" fill="none" />
      <path d="M20 77 C20 84 25 89 31 91" stroke="#fff" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" fill="none" />

      <ellipse cx="40" cy="72" rx="27" ry="6.5" fill="url(#rn-brass)" />
      <ellipse className="rn-oil" cx="40" cy="72" rx="22.5" ry="4.4" />

      <rect x="38.4" y="62" width="3.2" height="10" rx="1.4" fill="#2a1408" />

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

/* Night scene: the Jyothi glowing on a distant forest ridge, the shrine in the foreground */
function JyothiScene() {
  return (
    <svg className="rn-jy-svg" viewBox="0 0 600 380" role="img" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="jy-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12061a" />
          <stop offset=".55" stopColor="#3a0f2c" />
          <stop offset="1" stopColor="#7a2a2a" />
        </linearGradient>
        <radialGradient id="jy-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff3b0" stopOpacity=".95" />
          <stop offset=".25" stopColor="#ffbe46" stopOpacity=".55" />
          <stop offset="1" stopColor="#ff8a1f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="jy-flame-out" cx=".5" cy=".75" r=".75">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset=".6" stopColor="#ff9a1f" />
          <stop offset="1" stopColor="#ff5a00" />
        </radialGradient>
        <radialGradient id="jy-flame-core" cx=".5" cy=".8" r=".8">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#ffd34d" />
        </radialGradient>
      </defs>

      <rect width="600" height="380" fill="url(#jy-sky)" />

      {STARS.map(([x, y, r, d], i) => (
        <circle
          key={i}
          className="rn-jy-star"
          cx={x}
          cy={y}
          r={r}
          fill="#fff3d0"
          style={{ animationDelay: `${d}s` }}
        />
      ))}

      {/* the Jyothi: halo, rays and flame above the far ridge */}
      <g className="rn-jy-light">
        <circle className="rn-jy-halo" cx="410" cy="188" r="120" fill="url(#jy-glow)" />
        <g className="rn-jy-rays" stroke="#ffd98a" strokeLinecap="round">
          <path d="M410 120 V96" strokeWidth="2" opacity=".55" />
          <path d="M410 256 V280" strokeWidth="2" opacity=".0" />
          <path d="M355 140 L338 122" strokeWidth="2" opacity=".5" />
          <path d="M465 140 L482 122" strokeWidth="2" opacity=".5" />
          <path d="M340 188 H314" strokeWidth="2" opacity=".45" />
          <path d="M480 188 H506" strokeWidth="2" opacity=".45" />
        </g>
        <g className="rn-jy-flame">
          <path
            d="M410 150 C422 170 428 182 426 194 C425 204 418 210 410 210 C402 210 395 204 394 194 C392 182 398 170 410 150 Z"
            fill="url(#jy-flame-out)"
          />
          <path
            d="M410 174 C416 184 418 192 415 199 C413.5 203 412 205 410 205 C408 205 406.5 203 405 199 C402 192 404 184 410 174 Z"
            fill="url(#jy-flame-core)"
          />
        </g>
      </g>

      {/* far ridge (Ayyappanmala) */}
      <path
        d="M0 262 C60 236 120 250 190 226 C260 202 330 236 410 214 C470 198 530 226 600 206 L600 380 L0 380 Z"
        fill="#2b0d22"
      />
      {/* nearer hill */}
      <path
        d="M0 306 C90 280 170 300 250 288 C340 274 430 300 520 284 C560 278 585 282 600 286 L600 380 L0 380 Z"
        fill="#1a0814"
      />

      {/* tree line */}
      <g fill="#120510">
        <path d="M30 300 l14 -46 l14 46 Z" />
        <path d="M58 304 l12 -38 l12 38 Z" />
        <path d="M520 296 l14 -44 l14 44 Z" />
        <path d="M548 300 l12 -36 l12 36 Z" />
        <path d="M574 298 l10 -30 l10 30 Z" />
      </g>

      {/* the shrine: twin tiled roofs with golden kalasam */}
      <g fill="#0c030a">
        <path d="M168 330 L200 292 L232 330 Z" />
        <rect x="178" y="328" width="44" height="30" />
        <path d="M236 334 L262 304 L288 334 Z" />
        <rect x="244" y="332" width="36" height="26" />
        <rect x="0" y="356" width="600" height="24" />
      </g>
      <circle cx="200" cy="290" r="2.6" fill="#f6dc8b" />
      <circle cx="262" cy="302" r="2.2" fill="#f6dc8b" />
      <rect x="196" y="338" width="8" height="12" rx="4" fill="#ffbe46" opacity=".85" />
      <rect x="258" y="340" width="7" height="10" rx="3.5" fill="#ffbe46" opacity=".85" />

      {/* a few devotees' lamps near the shrine */}
      <g className="rn-jy-tiny" fill="#ffbe46">
        <circle cx="318" cy="350" r="2" />
        <circle cx="334" cy="353" r="1.6" />
        <circle cx="350" cy="350" r="2" />
        <circle cx="366" cy="353" r="1.6" />
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
  const j = { ...JY_DEFAULT, ...(t.jyothi || {}) };
  const cm = { ...COM_DEFAULT, ...(t.committee || {}) };
  /* flatten groups into table rows; the role cell spans all names of a group */
  const comRows = cm.groups.flatMap((g) =>
    g.names.map((name, i) => ({ role: g.role, name, first: i === 0, span: g.names.length }))
  );

  const [lit, setLit] = useState(() => Array(LAMPS).fill(false));
  const count = lit.filter(Boolean).length;
  const toggle = (i) => setLit((l) => l.map((v, k) => (k === i ? !v : v)));
  const lightAll = () => setLit(Array(LAMPS).fill(true));
  const reset = () => setLit(Array(LAMPS).fill(false));

  /* image zoom (lightbox) */
  const [zoom, setZoom] = useState(null); // { src, alt } | null

  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setZoom(null); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [zoom]);

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

      {/* ───────── TEMPLE COMMITTEE ───────── */}
      <section className="section rn-com">
        <div className="container">
          <Reveal className="rn-com-head">
            <span className="rn-eyebrow"><FaUsers /> {cm.eyebrow}</span>
            <h2 className="rn-com-title">{cm.title}</h2>
            <p className="rn-com-sub">{cm.sub}</p>
          </Reveal>

          <Reveal className="rn-com-wrap">
            <table className="rn-com-table">
              <caption className="rn-sr">{cm.title}</caption>
              <thead>
                <tr>
                  <th scope="col" className="rn-com-no">{cm.head[0]}</th>
                  <th scope="col">{cm.head[1]}</th>
                  <th scope="col">{cm.head[2]}</th>
                </tr>
              </thead>
              <tbody>
                {comRows.map((row, k) => (
                  <tr key={k} className={row.first ? 'rn-com-start' : undefined}>
                    <td className="rn-com-no"><span>{k + 1}</span></td>
                    {row.first && (
                      <th scope="rowgroup" rowSpan={row.span} className="rn-com-pos">
                        {row.role}
                      </th>
                    )}
                    <td className="rn-com-person">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ───────── TEMPLE STRUCTURE ───────── */}
      <section className="section rn-struct">
        <div className="container">
          <Reveal className="rn-struct-head">
            <span className="rn-eyebrow"><FaLandmark /> {c.structEyebrow}</span>
            <h2 className="rn-struct-title">{c.structTitle}</h2>
            <p className="rn-struct-sub">{c.structSub}</p>
          </Reveal>

          <div className="rn-struct-grid">
            {/* finished look */}
            <Reveal className="rn-fig rn-fig-main">
              <button
                type="button"
                className="rn-fig-frame"
                onClick={() => setZoom({ src: IMG_RENDER, alt: c.renderCap })}
                aria-label={`${c.renderCap} – ${c.zoomHint}`}
              >
                <img src={IMG_RENDER} alt={c.renderCap} loading="lazy" />
                <span className="rn-fig-tag"><FaLandmark /> {c.renderTag}</span>
                <span className="rn-fig-zoom" aria-hidden="true"><FaSearchPlus /></span>
              </button>
              <figcaption>{c.renderCap}</figcaption>
            </Reveal>

            {/* blueprint */}
            <Reveal index={1} className="rn-fig rn-fig-plan">
              <button
                type="button"
                className="rn-fig-frame"
                onClick={() => setZoom({ src: IMG_BLUEPRINT, alt: c.blueprintCap })}
                aria-label={`${c.blueprintCap} – ${c.zoomHint}`}
              >
                <img src={IMG_BLUEPRINT} alt={c.blueprintCap} loading="lazy" />
                <span className="rn-fig-tag rn-fig-tag-plan"><FaPencilRuler /> {c.blueprintTag}</span>
                <span className="rn-fig-zoom" aria-hidden="true"><FaSearchPlus /></span>
              </button>
              <figcaption>{c.blueprintCap}</figcaption>
            </Reveal>
          </div>

          <p className="rn-zoom-hint"><FaSearchPlus /> {c.zoomHint}</p>

          <Reveal>
            <h3 className="rn-feat-title"><span className="rn-orn-dark" aria-hidden="true" />{c.structFeaturesT}<span className="rn-orn-dark rn-orn-dark-r" aria-hidden="true" /></h3>
          </Reveal>

          <div className="rn-feat-grid">
            {c.structFeatures.map((f, k) => {
              const Icon = STRUCT_ICONS[k % STRUCT_ICONS.length];
              return (
                <Reveal key={k} index={k % 3} className="rn-feat">
                  <span className="rn-feat-ic"><Icon /></span>
                  <div>
                    <strong>{f.t}</strong>
                    <p>{f.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="rn-struct-note"><FaScroll /> {c.structNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ───────── MAKARA JYOTHI ───────── */}
      <section className="section rn-jy">
        <div className="container">
          <Reveal className="rn-jy-head">
            <span className="rn-eyebrow"><FaFire /> {j.eyebrow}</span>
            <h2 className="rn-jy-title">{j.title}</h2>
            <p className="rn-jy-sub">{j.sub}</p>
          </Reveal>

          <div className="rn-jy-stage">
            <Reveal className="rn-jy-scene">
              <div className="rn-jy-frame">
                <JyothiScene />
                <span className="rn-fig-tag rn-jy-tag"><FaFire /> {j.tag}</span>
              </div>
              <p className="rn-jy-intro">{j.intro}</p>
            </Reveal>

            <div className="rn-jy-beats">
              {j.beats.map((b, k) => {
                const Icon = JY_ICONS[k % JY_ICONS.length];
                return (
                  <Reveal key={k} index={k} className="rn-jy-beat">
                    <span className="rn-jy-beat-ic"><Icon /></span>
                    <div>
                      <span className="rn-jy-beat-tag">{b.tag}</span>
                      <h3>{b.t}</h3>
                      <p>{b.d}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal className="rn-jy-quote">
            <FaQuoteLeft className="rn-jy-quote-q" />
            <p>{j.quote}</p>
            <strong><FaOm /> {j.saranam}</strong>
          </Reveal>
        </div>
      </section>

      {/* ───────── LIGHT A LAMP ───────── */}
      <section className="rn-lamps">
        <LampDefs />

        <Hang className="rn-hang-tl" />
        <Hang className="rn-hang-tr1" />
        {/* <Hang className="rn-hang-tr2" /> */}

        <span className="rn-leaves rn-leaves-l" aria-hidden="true">
          <FaLeaf /><FaLeaf /><FaLeaf />
        </span>
        <span className="rn-leaves rn-leaves-r" aria-hidden="true">
          <FaLeaf /><FaLeaf /><FaLeaf />
        </span>

        <div className="container rn-lamps-grid">
          <Reveal className="rn-lamps-media">
            <div className="rn-lamps-frame">
              <span className="rn-frame-lotus rn-frame-lotus-t" aria-hidden="true"><GiLotusFlower /></span>
              <span className="rn-frame-lotus rn-frame-lotus-b" aria-hidden="true"><GiLotusFlower /></span>

              <div className="rn-lamps-pic">
                <img src="/assets/a2.png" alt={c.lampTitle} loading="lazy" />
              </div>
            </div>
          </Reveal>

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

      {/* ───────── IMAGE LIGHTBOX ───────── */}
      {zoom && (
        <div
          className="rn-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            className="rn-lightbox-close"
            onClick={() => setZoom(null)}
            aria-label={c.closeLabel}
          >
            <FaTimes />
          </button>
          <img src={zoom.src} alt={zoom.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}