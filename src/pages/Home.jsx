import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import {
  FaPlaceOfWorship, FaPrayingHands, FaFire, FaCalendarAlt, FaImages, FaMapMarkerAlt,
  FaLeaf, FaUsers, FaOm, FaClock, FaArrowRight, FaHandHoldingHeart, FaHandsHelping,
  FaPhoneAlt, FaRegGem,
} from 'react-icons/fa';
import HeroSlider from '../components/HeroSlider.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import GalleryStrip from '../components/GalleryStrip.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import hanumanAnim from '../lottie/ayyappan-sketch-animation.json';
import '../stylesheet/home.css';
import LightALamp from '../components/LightALamp.jsx';

const QUICK = [
  [FaPlaceOfWorship, '/about'],
  [FaFire, '/festivals'],
  [FaCalendarAlt, '/festivals'],
  [FaImages, '/gallery'],
  [FaMapMarkerAlt, '/contact'],
];
const HI = [FaPlaceOfWorship, FaPrayingHands, FaFire, FaCalendarAlt, FaLeaf, FaUsers];
const WAYS_ICONS = [FaHandHoldingHeart, FaHandsHelping, FaCalendarAlt, FaMapMarkerAlt];
const WAYS_LINKS = ['/renovation', '/contact', '/festivals', '/contact'];
const FEST_ICONS = [FaFire, FaOm, FaCalendarAlt, FaPrayingHands];

/* last 4 journey moments shown on Home (same order as the LAST 4 of t.abx.journey) */
const JR_IMGS = ['/assets/r17.jpeg', '/assets/r18.jpeg', '/assets/r19.jpeg', '/assets/r20.jpeg'];

/* Deity images – order: Main Deity (Ayyappa), Deity 1 (Devi), Deity 2 (Ganapathy) */
const DEITY_IMGS = [
  '/assets/s2.webp',
  '/assets/y4.jpg.jpeg',
  '/assets/y5.jpg.jpeg',
];

/* Silasthapanam: Thursday 5 Nov 2026, auspicious window starts 7:10 AM IST */
const SILAS_START = new Date('2026-11-05T07:10:00+05:30').getTime();
const SILAS_END = new Date('2026-11-05T09:20:00+05:30').getTime();

/* ───────── Lottie settings ───────── */
const LOTTIE_SPEED = 0.5;                    // 1 = original speed, lower = slower
const LOTTIE_GOLD = [0.74, 0.53, 0.07];      // ≈ #BD8812 (RGB 0–1) – rich premium gold

/* Sparkles around the divine stage (position in %, size in px, delay in s) */
const SPARKS = [
  { top: '6%',  left: '16%', size: 10, delay: 0 },
  { top: '14%', left: '88%', size: 8,  delay: 0.8 },
  { top: '46%', left: '-3%', size: 7,  delay: 1.6 },
  { top: '58%', left: '100%', size: 11, delay: 0.4 },
  { top: '86%', left: '12%', size: 8,  delay: 2.0 },
  { top: '90%', left: '82%', size: 9,  delay: 1.2 },
];

/* Recolors every fill / stroke / gradient in the Lottie JSON to gold.
   Works for any Lottie file, so the original JSON stays untouched. */
function recolorLottieGold(src) {
  const data = JSON.parse(JSON.stringify(src));
  const [r, g, b] = LOTTIE_GOLD;

  const paintColor = (c) => {
    if (!c || c.k === undefined) return;
    if (Array.isArray(c.k) && c.k.length && typeof c.k[0] === 'object') {
      // keyframed color
      c.k.forEach((kf) => {
        if (Array.isArray(kf.s)) kf.s = [r, g, b, kf.s[3] ?? 1];
        if (Array.isArray(kf.e)) kf.e = [r, g, b, kf.e[3] ?? 1];
      });
    } else {
      c.k = [r, g, b, 1];
    }
  };

  const paintGradient = (grad) => {
    if (!grad || !grad.k) return;
    const stops = grad.p || 0;
    const fix = (arr) => {
      if (!Array.isArray(arr)) return arr;
      const out = arr.slice();
      for (let i = 0; i < stops; i += 1) {
        out[i * 4 + 1] = r;
        out[i * 4 + 2] = g;
        out[i * 4 + 3] = b;
      }
      return out;
    };
    if (Array.isArray(grad.k.k) && grad.k.k.length && typeof grad.k.k[0] === 'object') {
      grad.k.k.forEach((kf) => {
        if (kf.s) kf.s = fix(kf.s);
        if (kf.e) kf.e = fix(kf.e);
      });
    } else {
      grad.k.k = fix(grad.k.k);
    }
  };

  const walk = (node) => {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (!node || typeof node !== 'object') return;
    if (node.ty === 'fl' || node.ty === 'st') paintColor(node.c);
    if (node.ty === 'gf' || node.ty === 'gs') paintGradient(node.g);
    Object.values(node).forEach(walk);
  };

  walk(data);
  return data;
}

const goldAnim = recolorLottieGold(hanumanAnim);

/* English fallback – used only if t.home is missing in translations */
const HOME_DEFAULT = {
  waysEyebrow: 'Be a Part of It',
  waysTitle: 'Ways to Support the Temple',
  waysSub: 'Every small offering brings the shrine closer to being whole again.',
  ways: [
    { t: 'Support Renovation', d: 'Contribute towards rebuilding the sacred shrine.' },
    { t: 'Volunteer Seva', d: 'Offer your time and skills to the Samithi.' },
    { t: 'Join Festivals', d: 'Celebrate Vilakku and Mandala Pooja with us.' },
    { t: 'Visit the Temple', d: 'Come for darshan and experience the peace.' },
  ],
  go: 'Know more',
  pathEyebrow: 'Renovation Journey',
  ctaTitle: 'Join Us in Restoring a Sacred Abode',
  ctaText: 'Your prayers, presence and support light the way for generations to come.',
  ctaBtn1: 'Support Renovation',
  ctaBtn2: 'Contact the Samithi',
};

/* English fallback for the deities section – used only if t.deities is missing */
const DEITIES_DEFAULT = {
  eyebrow: 'The Sacred Shrines',
  title: 'Deities of the Temple',
  sub: 'The presiding and accompanying deities who bless every devotee at Ayyappankadu.',
  items: [
    { tag: 'Main Deity', name: 'Lord Ayyappa', d: 'Lord Dharma Sastha, the meditating yogi, upholder of dharma and guardian of the forest.' },
    { tag: 'Deity 1', name: 'Devi', d: 'The Divine Mother, enshrined beside the main sanctum, who showers compassion on all devotees.' },
    { tag: 'Deity 2', name: 'Lord Ganapathy', d: 'The remover of obstacles, invoked at the beginning of every pooja and auspicious work.' },
  ],
};

/* Respect users who prefer reduced motion – animation stays on first frame */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/* Live countdown to the ceremony (updates every 15 s) */
function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, done: true };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      done: false,
    };
  };
  const [left, setLeft] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return left;
}

const pad = (n) => String(n).padStart(2, '0');

export default function Home() {
  const { t } = useLang();
  const h = { ...HOME_DEFAULT, ...(t.home || {}) };
  const dty = { ...DEITIES_DEFAULT, ...(t.deities || {}) };
  const s = t.silas;
  const recent = t.abx.journey.slice(-4);
  const [featFest, ...otherFest] = t.festivals.items;
  const FeatIcon = FEST_ICONS[0];
  const reduceMotion = usePrefersReducedMotion();
  const lottieRef = useRef(null);
  const cd = useCountdown(SILAS_START);
  const ceremonyOver = Date.now() > SILAS_END + 6 * 3600000; // hide banner the evening after

  return (
    <>
      <HeroSlider />

      {/* ───────── UPCOMING CEREMONY: SILASTHAPANAM ───────── */}
      {/* {!ceremonyOver && (
        <section className="hp-silas">
          <div className="container">
            <Reveal className="hp-silas-card">
              <div className="hp-silas-main">
                <span className="eyebrow hp-silas-eyebrow"><FaCalendarAlt /> {s.eyebrow}</span>
                <h2>{s.title}</h2>
                <p className="hp-silas-sub">{s.subtitle}</p>
                <p className="hp-silas-temple"><FaMapMarkerAlt /> {s.temple}</p>

                <div className="hp-silas-meta">
                  <div className="hp-silas-meta-box">
                    <FaCalendarAlt />
                    <div><small>{s.dateL}</small><strong>{s.date}</strong></div>
                  </div>
                  <div className="hp-silas-meta-box">
                    <FaClock />
                    <div><small>{s.timeL}</small><strong>{s.time}</strong></div>
                  </div>
                </div>

                <div className="hp-silas-guests">
                  <span className="hp-silas-guests-t">{s.guestsT}</span>
                  <ul>
                    {s.guests.map((g, k) => (
                      <li key={k}>
                        <FaPrayingHands />
                        <div><strong>{g.n}</strong><small>{g.r}</small></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="hp-silas-side">
                <span className="hp-silas-cd-t">{s.cdT}</span>
                {cd.done ? (
                  <p className="hp-silas-done">{s.done}</p>
                ) : (
                  <div className="hp-silas-cd">
                    <div><b>{pad(cd.d)}</b><small>{s.dLabel}</small></div>
                    <div><b>{pad(cd.h)}</b><small>{s.hLabel}</small></div>
                    <div><b>{pad(cd.m)}</b><small>{s.mLabel}</small></div>
                  </div>
                )}

                <p className="hp-silas-invite">{s.invite}</p>
                <p className="hp-silas-org"><small>{s.orgL}</small>{s.org}</p>

                <div className="hp-silas-btns">
                  <a href={`tel:${s.phone}`} className="btn btn-gold">
                    <FaPhoneAlt /> {s.phone}
                  </a>
                  <Link to="/renovation" className="hp-btn-ghost">{s.cta2} <FaArrowRight /></Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )} */}

      {/* ───────── ABOUT + QUICK LINKS (original look) ───────── */}
      <section className="section hp-about">
        <div className="container hp-about-grid">
          <Reveal dir="left">
            <SmartImg src="/assets/s2.webp" alt="temple" className="hp-about-img" />
          </Reveal>

          <div>
            <Reveal><span className="eyebrow"><FaOm /> {t.about.eyebrow}</span></Reveal>
            <Reveal index={1}><h2 className="h2">{t.about.title}</h2></Reveal>
            <Reveal index={2}><p>{t.about.p1}</p></Reveal>
            <Reveal index={3}><p>{t.about.p2}</p></Reveal>
            <Reveal index={4}>
              <Link to="/about" className="btn btn-maroon">{t.about.more} <FaArrowRight /></Link>
            </Reveal>
          </div>

          <div className="hp-about-facts">
            {[
              [FaPrayingHands, t.about.deity, t.about.deityV],
              [FaClock, t.about.est, t.about.estV],
            ].map(([Ic, a, b], k) => (
              <Reveal key={k} index={k + 1} className="hp-fact">
                <span><Ic /></span>
                <div><strong>{a}</strong><small>{b}</small></div>
              </Reveal>
            ))}
          </div>
        </div>
        <br />
      </section>

      {/* ───────── HIGHLIGHTS ───────── */}
      <section className="hp-band-dark">
        <div className="container">
          <SectionTitle light title={t.highlights.title} sub={t.highlights.sub} />
          <div className="hp-hl-grid">
            {t.highlights.items.map((it, k) => {
              const Ic = HI[k];
              return (
                <Reveal key={k} index={k} className="hp-hl">
                  <span className="hp-hl-ic"><Ic /></span>
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── DEITIES: Main Deity, Deity 1, Deity 2 ───────── */}
      <section className="hp-sec hp-deities">
        <div className="container">
          <SectionTitle title={dty.title} sub={dty.sub} />

          <div className="hp-deity-grid">
            {dty.items.map((dt, k) => (
              <Reveal
                key={k}
                index={k}
                className={`hp-deity${k === 0 ? ' hp-deity-main' : ''}`}
              >
                <div className="hp-deity-frame">
                  <div className="hp-deity-img">
                    <SmartImg src={DEITY_IMGS[k]} alt={dt.name} className="hp-deity-pic" />
                  </div>
                </div>
                <span className="hp-deity-tag">{k === 0 ? <FaOm /> : <FaRegGem />} {dt.tag}</span>
                <h3>{dt.name}</h3>
                {/* <p>{dt.d}</p> */}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── THE SACRED FORM: mantra, symbols & 12 shaktis ───────── */}
      <section className="hp-sec hp-sacred">
        <div className="container">
          <SectionTitle title={t.abx.shaktiTitle} sub={t.abx.shaktiSub} />

          <Reveal className="hp-mantra">
            <span className="hp-mantra-om"><FaOm /></span>
            <div className="hp-mantra-body">
              <small>{t.abx.tattvaEyebrow}</small>
              <h3>{t.abx.mantra}</h3>
              <p>{t.abx.mantraMeaning}</p>
            </div>
          </Reveal>

          <div className="hp-chips">
            {t.abx.chips.map(([a, b], k) => (
              <Reveal key={k} index={k} className="hp-chip">
                <FaRegGem />
                <div><strong>{a}</strong><small>{b}</small></div>
              </Reveal>
            ))}
          </div>

          <div className="hp-shakti-grid">
            {t.abx.shaktis.map((sh, k) => (
              <Reveal key={k} index={k % 4} className="hp-shakti">
                <span className="hp-shakti-num">{pad(k + 1)}</span>
                <h4>{sh.t}</h4>
                <p>{sh.d}</p>
              </Reveal>
            ))}
          </div>

          <div className="hp-center">
            <Link to="/about" className="btn btn-maroon">{t.about.more} <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ───────── FESTIVALS & EVENTS ───────── */}
      <section className="hp-sec hp-festivals">
        <div className="container">
          <SectionTitle title={t.festivals.title} sub={t.festivals.sub} />

          <div className="hp-fest-grid">
            {/* Featured festival */}
            <Reveal dir="left" className="hp-fest-feature">
              <span className="hp-fest-feature-ic"><FeatIcon /></span>
              <span className="hp-fest-chip"><FaCalendarAlt /> {featFest.m}</span>
              <h3>{featFest.t}</h3>
              <p>{featFest.d}</p>
              <Link to="/festivals" className="btn btn-gold">{t.festivals.learn} <FaArrowRight /></Link>
            </Reveal>

            {/* Other festivals */}
            <div className="hp-fest-list">
              {otherFest.map((f, k) => {
                const Ic = FEST_ICONS[k + 1];
                return (
                  <Reveal key={k} index={k} className="hp-fest-row">
                    <span className="hp-fest-row-ic"><Ic /></span>
                    <div className="hp-fest-row-body">
                      <small>{f.m}</small>
                      <h4>{f.t}</h4>
                      <p>{f.d}</p>
                    </div>
                    <Link to="/festivals" className="hp-fest-row-go" aria-label={f.t}><FaArrowRight /></Link>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="hp-center">
            <Link to="/festivals" className="btn btn-maroon">{t.festivals.all} <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ───────── GALLERY ───────── */}
      <GalleryStrip />

      {/* ───────── RECENT MOMENTS (latest journey photos) ───────── */}
      <section className="hp-sec hp-jr">
        <div className="container">
          <SectionTitle title={s.jrTitle} sub={s.jrSub} />
          <div className="hp-jr-grid">
            {recent.map((title, k) => (
              <Reveal key={k} index={k} className="hp-jr-card">
                <div className="hp-jr-img">
                  <SmartImg src={JR_IMGS[k]} alt={title} className="hp-jr-pic" />
                </div>
                <p>{title}</p>
              </Reveal>
            ))}
          </div>
          <div className="hp-center">
            <Link to="/about" className="btn btn-maroon">{s.jrAll} <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ───────── RENOVATION: appeal + path ───────── */}
      <section className="hp-sec hp-reno">
        <div className="container">
          <Reveal className="hp-reno-card">
            <span className="hp-reno-ic"><FaHandHoldingHeart /></span>
            <div className="hp-reno-body">
              <h2>{t.reno.title}</h2>
              <p>{t.reno.paras[0]}</p>
            </div>
            <Link to="/renovation" className="btn btn-maroon">{t.reno.sub} <FaArrowRight /></Link>
          </Reveal>

          <div className="hp-path">
            <Reveal><span className="eyebrow hp-center-eyebrow"><FaOm /> {h.pathEyebrow}</span></Reveal>
            <Reveal index={1}><h3 className="hp-path-title">{t.reno.stepsTitle}</h3></Reveal>
            <ol className="hp-path-list">
              {t.reno.steps.map((st, k) => (
                <Reveal key={k} index={k} className="hp-path-step">
                  <span className="hp-path-num">{k + 1}</span>
                  <p>{st}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── PLAN YOUR VISIT ───────── */}
      <section className="hp-visit">
        <div className="container hp-visit-in">
          <Reveal>
            <h2>{t.visit.title}</h2>
            <p>{t.visit.sub}</p>
            <Link to="/contact" className="btn btn-gold"><FaMapMarkerAlt /> {t.visit.directions}</Link>
          </Reveal>
          <Reveal index={1} className="hp-visit-box">
            <FaClock /><div><strong>{t.visit.timingsT}</strong><small>{t.visit.timings}</small></div>
          </Reveal>
          {/* <Reveal index={2} className="hp-visit-box">
            <FaMapMarkerAlt /><div><strong>{t.visit.locT}</strong><small>{t.visit.loc}</small></div>
          </Reveal> */}
          <Reveal index={3} className="hp-visit-box">
            <FaUsers /><div><strong>{t.visit.guideT}</strong><small>{t.visit.guide}</small></div>
          </Reveal>
        </div>
      </section>

      {/* ───────── FINAL CTA (gold Lottie on premium divine stage) ───────── */}
      <section className="hp-cta">
        <div className="container hp-cta-grid">
          <Reveal className="hp-cta-in">
            <small className="hp-cta-saranam">{t.reno.saranam}</small>
            <h2>{h.ctaTitle}</h2>
            <p>{h.ctaText}</p>
            <div className="hp-cta-btns">
              <Link to="/renovation" className="btn btn-gold"><FaHandHoldingHeart /> {h.ctaBtn1}</Link>
              <Link to="/contact" className="hp-btn-ghost">{h.ctaBtn2} <FaArrowRight /></Link>
            </div>
          </Reveal>

          <Reveal dir="right" index={1} className="hp-cta-lottie" aria-hidden="true">
            <div className="hp-cta-stage">
              <span className="hp-cta-halo" />
              <span className="hp-cta-rays" />
              <span className="hp-cta-ring" />
              <span className="hp-cta-ring hp-cta-ring-dots" />

              {SPARKS.map((sp, k) => (
                <span
                  key={k}
                  className="hp-cta-spark"
                  style={{
                    top: sp.top,
                    left: sp.left,
                    width: sp.size,
                    height: sp.size,
                    animationDelay: `${sp.delay}s`,
                  }}
                />
              ))}

              <div className="hp-cta-disc">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={goldAnim}
                  loop
                  autoplay={!reduceMotion}
                  className="hp-cta-lottie-anim"
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                  onDOMLoaded={() => lottieRef.current?.setSpeed(LOTTIE_SPEED)}
                />
              </div>

              <span className="hp-cta-om"><FaOm /></span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── WAYS TO SUPPORT ───────── */}
      <section className="hp-sec hp-ways">
        <div className="container">
          <SectionTitle title={h.waysTitle} sub={h.waysSub} />
          <div className="hp-ways-grid">
            {h.ways.map((w, k) => {
              const Ic = WAYS_ICONS[k];
              return (
                <Reveal key={k} index={k} className="hp-way">
                  <span className="hp-way-ic"><Ic /></span>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                  <Link to={WAYS_LINKS[k]} className="hp-way-link">{h.go} <FaArrowRight /></Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}