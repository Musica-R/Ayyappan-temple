import { Link } from 'react-router-dom';
import {
  FaCalendarAlt, FaArrowRight, FaCheckCircle,
  FaOm, FaFire, FaPrayingHands, FaTshirt, FaUsers,
  FaOilCan, FaCalendarCheck,
} from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/festivals.css';

/* Order matches t.festivals.items: Makara, Mandala, Karthika, Sabarimala */
const PICS = [
  '/images/Light4.jpg.jpeg',
  '/images/poojai2.jpg.jpeg',
  '/images/karthika vilakku 2.jpg.jpeg',
  '/images/yatra2.jpg.jpeg',
];

/* Month indexes (0 = Jan) in which each festival is observed */
const FEST_MONTHS = [
  [0, 1],    // Makara Vilakku
  [10, 11],  // Mandala Pooja
  [10, 11],  // Karthika Vilakku
  [11, 0],   // Sabarimala Yatra
];

const GUIDE_ICONS = [FaOm, FaTshirt, FaFire, FaUsers];

/* Special Vazhipad: only images and icons live here.
   All text comes from t.festPage (vzEyebrow, vzTitle, vzSub, vzNote, vzItems),
   in the same order: Neyvilakku, Ezhuthiri Kathikkal, Neeranjanam */
const VZ_MEDIA = [
  { img: '/assets/n1.jpg.jpeg', Icon: FaOilCan },
  { img: '/assets/n2.jpg.jpeg', Icon: FaCalendarCheck },
  { img: '/assets/y3.jpg.jpeg', Icon: FaFire },
];

export default function Festivals() {
  const { t } = useLang();
  const fp = t.festPage;

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <Reveal>
          <span className="fp-eyebrow">{fp.eyebrow}</span>
          <h1>{t.festivals.title}</h1>
          <p>{t.festivals.sub}</p>
        </Reveal>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <Reveal className="fp-intro">
            <FaPrayingHands className="fp-intro-icon" />
            <p>{fp.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* SPECIAL VAZHIPAD (OFFERINGS) */}
      <section className="section fp-vz-sec">
        <div className="container">
          <Reveal className="fp-head">
            <span className="fp-eyebrow fp-eyebrow--dark">{fp.vzEyebrow}</span>
            <h2>{fp.vzTitle}</h2>
            <p>{fp.vzSub}</p>
          </Reveal>

          <div className="fp-vz">
            {fp.vzItems.map((v, k) => {
              const media = VZ_MEDIA[k] || VZ_MEDIA[0];
              const VzIcon = media.Icon;
              return (
                <Reveal key={k} index={k} className="fp-vz-card">
                  <div className="fp-vz-media">
                    <SmartImg src={media.img} alt={v.t} />
                    <span className="fp-vz-tag"><FaCalendarAlt /> {v.tag}</span>
                  </div>

                  <div className="fp-vz-body">
                    <span className="fp-vz-icon"><VzIcon /></span>
                    <h3>{v.t}</h3>
                    <p>{v.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="fp-note">{fp.vzNote}</p>
        </div>
      </section>

      {/* FESTIVAL DETAILS */}
      <section className="section fp-details">
        <div className="container">
          <Reveal className="fp-head">
            <span className="fp-eyebrow fp-eyebrow--dark">{fp.detailsEyebrow}</span>
            <h2>{fp.detailsTitle}</h2>
          </Reveal>

          <div className="fp-rows">
            {t.festivals.items.map((f, k) => (
              <Reveal key={k} index={k} className={`fp-row ${k % 2 ? 'fp-row--rev' : ''}`}>
                <div className="fp-media">
                  <SmartImg src={PICS[k]} alt={f.t} />
                  <span className="fp-date"><FaCalendarAlt /> {f.m}</span>
                </div>

                <div className="fp-copy">
                  <span className="fp-num">0{k + 1}</span>
                  <h3>{f.t}</h3>
                  <p className="fp-lead">{f.d}</p>
                  <p>{fp.items[k].long}</p>

                  <h4>{fp.highlightsT}</h4>
                  <ul className="fp-points">
                    {fp.items[k].points.map((p, i) => (
                      <li key={i}><FaCheckCircle /> {p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section className="section">
        <div className="container">
          <Reveal className="fp-head">
            <span className="fp-eyebrow fp-eyebrow--dark">{fp.calEyebrow}</span>
            <h2>{fp.calTitle}</h2>
            <p>{fp.calSub}</p>
          </Reveal>

          <Reveal className="fp-cal">
            <div className="fp-months">
              {fp.months.map((m, i) => {
                const active = FEST_MONTHS
                  .map((arr, fi) => (arr.includes(i) ? fi : -1))
                  .filter((fi) => fi >= 0);
                return (
                  <div key={i} className={`fp-month ${active.length ? 'is-on' : ''}`}>
                    <span className="fp-month-name">{m}</span>
                    <span className="fp-dots">
                      {active.map((fi) => (
                        <i key={fi} className={`fp-dot fp-c${fi}`} title={t.festivals.items[fi].t} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>

            <ul className="fp-legend">
              {t.festivals.items.map((f, k) => (
                <li key={k}><i className={`fp-dot fp-c${k}`} /> {f.t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* DEVOTEE GUIDE */}
      <section className="section fp-guide-sec">
        <div className="container">
          <Reveal className="fp-head">
            <span className="fp-eyebrow fp-eyebrow--dark">{fp.guideEyebrow}</span>
            <h2>{fp.guideTitle}</h2>
          </Reveal>

          <div className="fp-guide">
            {fp.guide.map((g, k) => {
              const Icon = GUIDE_ICONS[k];
              return (
                <Reveal key={k} index={k} className="fp-guide-card">
                  <span className="fp-guide-icon"><Icon /></span>
                  <h3>{g.t}</h3>
                  <p>{g.d}</p>
                </Reveal>
              );
            })}
          </div>

          <p className="fp-note">{fp.note}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal className="fp-cta">
            <h2>{fp.ctaTitle}</h2>
            <p>{fp.ctaText}</p>
            <div className="fp-cta-btns">
              <Link to="/contact" className="fp-btn fp-btn--gold">{fp.ctaBtn1} <FaArrowRight /></Link>
              <Link to="/renovation" className="fp-btn fp-btn--ghost">{fp.ctaBtn2}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}