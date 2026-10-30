import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaOm, FaPrayingHands, FaMapMarkerAlt, FaClock, FaPlaceOfWorship, FaCalendarAlt,
  FaTree, FaHandsHelping, FaChevronDown, FaArrowRight, FaQuoteLeft,
} from 'react-icons/fa';
import { GiLotus } from 'react-icons/gi';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/about.css';

const PUBLIC = process.env.PUBLIC_URL || '';
const HERO_BG = `${PUBLIC}/assets/bg.png`;

/* one icon for each highlight card (same order as t.highlights.items) */
const HL_ICONS = [FaPlaceOfWorship, FaPrayingHands, FaOm, FaCalendarAlt, FaTree, FaHandsHelping];

/* compact section heading (own component so sizes stay small) */
function Head({ title, sub, light = false }) {
  return (
    <div className={`ab-head ${light ? 'light' : ''}`}>
      <h2>{title}</h2>
      <span className="ab-head-line"><i /><GiLotus /><i /></span>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  const [more, setMore] = useState(false);

  const facts = [
    [FaPrayingHands, t.about.deity, t.about.deityV],
    [FaMapMarkerAlt, t.about.location, t.about.locationV],
    [FaClock, t.about.est, t.about.estV],
  ];

  return (
    <>
      {/* ================= hero banner with photo ================= */}
      <section className="ab-hero" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div className="ab-hero-shade" />
        <Reveal className="ab-hero-in">
          <span className="ab-om"><FaOm /></span>
          <h1>{t.about.title}</h1>
          <p>{t.about.eyebrow}</p>
        </Reveal>
      </section>

      {/* ================= story : photos + short text ================= */}
      <section className="ab-sec">
        <div className="container ab-intro">
          <Reveal dir="left" className="ab-photos">
            <SmartImg src="/assets/t5.jpg" alt="temple" className="ab-p ab-p1" />
            <SmartImg src="/assets/t3.jpg" alt="" className="ab-p ab-p2" />
            <SmartImg src="/assets/t2.jpg" alt="" className="ab-p ab-p3" />
            <div className="ab-badge">
              <FaOm />
              <span><small>{t.about.est}</small><strong>{t.about.estV}</strong></span>
            </div>
          </Reveal>

          <div className="ab-text">
            <Reveal><span className="ab-eyebrow"><FaOm /> {t.about.eyebrow}</span></Reveal>
            <Reveal index={1}><h2 className="ab-h2">{t.about.historyTitle}</h2></Reveal>
            <Reveal index={2}><p className="ab-lead">{t.about.p1}</p></Reveal>

            <Reveal index={3}>
              <blockquote className="ab-quote">
                <FaQuoteLeft />
                <p>{t.about.p2}</p>
              </blockquote>
            </Reveal>

            {/* longer story stays hidden until the visitor asks for it */}
            <div className={`ab-more ${more ? 'open' : ''}`}>
              <div><p className="ab-history">{t.about.history}</p></div>
            </div>
            <button type="button" className={`ab-link ${more ? 'on' : ''}`} onClick={() => setMore(!more)} aria-expanded={more}>
              {t.about.more} <FaChevronDown />
            </button>

            <div className="ab-facts">
              {facts.map(([Ic, a, b], k) => (
                <Reveal key={k} index={k} className="ab-fact">
                  <span className="ab-fact-ic"><Ic /></span>
                  <span><small>{a}</small><strong>{b}</strong></span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= highlights ================= */}
      <section className="ab-sec ab-alt">
        <div className="container">
          <Head title={t.highlights.title} sub={t.highlights.sub} />
          <div className="ab-grid">
            {t.highlights.items.map((h, k) => {
              const Ic = HL_ICONS[k] || FaOm;
              return (
                <Reveal key={k} index={k} className="ab-card">
                  <span className="ab-card-ic"><Ic /></span>
                  <div><h3>{h.t}</h3><p>{h.d}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= path forward (a real sequence -> numbered) ================= */}
      <section className="ab-sec">
        <div className="container">
          <Head title={t.reno.stepsTitle} sub={t.reno.sub} />
          <div className="ab-steps">
            {t.reno.steps.map((s, k) => (
              <Reveal key={k} index={k} className="ab-step">
                <span className="ab-num">{k + 1}</span>
                <p>{s}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= festivals strip ================= */}
      <section className="ab-fest">
        <div className="container">
          <div className="ab-fest-head">
            <h2>{t.festivals.title}</h2>
            <Link to="/festivals" className="ab-fest-all">{t.festivals.all} <FaArrowRight /></Link>
          </div>
          <div className="ab-fest-row">
            {t.festivals.items.map((f, k) => (
              <Reveal key={k} index={k} className="ab-fest-item">
                <span className="ab-fest-m">{f.m}</span>
                <strong>{f.t}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}