import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaOm, FaPrayingHands, FaMapMarkerAlt, FaClock, FaPlaceOfWorship, FaCalendarAlt,
  FaTree, FaHandsHelping, FaChevronDown, FaArrowRight, FaQuoteLeft, FaPhoneAlt,
} from 'react-icons/fa';
import { GiLotus } from 'react-icons/gi';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/about.css';

const PUBLIC = process.env.PUBLIC_URL || '';
const HERO_BG = `${PUBLIC}/assets/bc1.webp`;

/* one icon for each highlight card (same order as t.highlights.items) */
const HL_ICONS = [FaPlaceOfWorship, FaPrayingHands, FaOm, FaCalendarAlt, FaTree, FaHandsHelping];

/* journey photos (same order as t.abx.journey)
   if any file has a different name or extension, edit it in this list */
const JOURNEY_IMGS = [
  '/assets/r1.jpeg', '/assets/r2.webp', '/assets/r3.jpeg', '/assets/r4.jpeg',
  '/assets/r5.jpeg', '/assets/r6.webp', '/assets/r7.jpeg', '/assets/r8.jpeg',
  '/assets/r9.jpeg', '/assets/r10.jpeg', '/assets/r11.jpeg', '/assets/r12.jpeg',
  '/assets/r13.jpeg', '/assets/m10.jpg', '/assets/r15.jpeg', '/assets/r16.jpeg',
  '/assets/r17.jpeg','/assets/r18.jpeg', '/assets/r19.jpeg', '/assets/r20.jpeg',
];
const journeySrc = (k) => JOURNEY_IMGS[k];

/* ───────── Silasthapanam announcement settings ───────── */
const EVENT_AT = new Date('2026-11-05T07:10:00+05:30').getTime();      // muhurtham start (IST)
const HIDE_AFTER = new Date('2026-11-06T23:59:59+05:30').getTime();    // banner disappears after this

/* countdown to the ceremony; also tells the banner when to hide itself */
function useCountdown(target, hideAfter) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    show: now < hideAfter,
    done: diff === 0,
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
  };
}

/* compact section heading (own component so sizes stay small) */
function Head({ title, sub, eyebrow, light = false }) {
  return (
    <div className={`ab-head ${light ? 'light' : ''}`}>
      {eyebrow && <span className="ab-eyebrow ab-eyebrow-c"><FaOm /> {eyebrow}</span>}
      <h2>{title}</h2>
      <span className="ab-head-line"><i /><GiLotus /><i /></span>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  const [more, setMore] = useState(false);
  const x = t.abx;
  const s = t.silas;
  const cd = useCountdown(EVENT_AT, HIDE_AFTER);

  const facts = [
    [FaPrayingHands, t.about.deity, t.about.deityV],
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
            <SmartImg src="/assets/back.webp" alt="temple" className="ab-p ab-p1" />
            <SmartImg src="/assets/r3.jpeg" alt="" className="ab-p ab-p2" />
            <SmartImg src="/assets/a4.jpg" alt="" className="ab-p ab-p3" />
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

        
      {/* ================= silasthapanam announcement ================= */}
      {cd.show && (
        <section className="ab-sil">
          <div className="container">
            <Reveal className="ab-sil-card">
              <div className="ab-sil-main">
                <span className="ab-sil-tag"><FaCalendarAlt /> {s.eyebrow}</span>
                <h2>{s.title}</h2>
                <p className="ab-sil-sub">{s.subtitle}</p>
                <p className="ab-sil-temple"><FaMapMarkerAlt /> <span>{s.temple}</span></p>

                <div className="ab-sil-when">
                  <div><small>{s.dateL}</small><strong>{s.date}</strong></div>
                  <div><small>{s.timeL}</small><strong>{s.time}</strong></div>
                </div>

                {/* {cd.done ? (
                  <p className="ab-sil-done">{s.done}</p>
                ) : (
                  <div className="ab-sil-count" role="timer" aria-label={s.cdT}>
                    <span><b>{cd.d}</b><small>{s.dLabel}</small></span>
                    <span><b>{cd.h}</b><small>{s.hLabel}</small></span>
                    <span><b>{cd.m}</b><small>{s.mLabel}</small></span>
                  </div>
                )} */}
              </div>

              <div className="ab-sil-side">
                <h3>{s.guestsT}</h3>
                <ul className="ab-sil-guests">
                  {s.guests.map((g, k) => (
                    <li key={k}>
                      <span className="ab-sil-guest-ic"><FaPrayingHands /></span>
                      <div><strong>{g.n}</strong><small>{g.r}</small></div>
                    </li>
                  ))}
                </ul>

                <p className="ab-sil-org"><small>{s.orgL}</small><strong>{s.org}</strong></p>
                {/* <p className="ab-sil-invite">{s.invite}</p> */}

                <div className="ab-sil-btns">
                  <a href={`tel:${s.phone}`} className="ab-sil-call"><FaPhoneAlt /> {s.phone}</a>
                  <Link to="/renovation" className="ab-sil-ghost">{s.cta2} <FaArrowRight /></Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
      </section>

      {/* ================= our journey : photo moments ================= */}
      <section className="ab-sec ab-alt">
        <div className="container">
          <Head eyebrow={x.journeyEyebrow} title={x.journeyTitle} sub={x.journeySub} />
          <div className="ab-journey">
            {x.journey.map((title, k) => (
              <Reveal key={k} index={k % 4} className="ab-jcard">
                <div className="ab-jimg">
                  <SmartImg src={journeySrc(k)} alt={title} className="ab-jpic" />
                  <span className="ab-jnum">{k + 1}</span>
                </div>
                <p>{title}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= the idol : features, symbols, guiding idea ================= */}
      <section className="ab-sec">
        <div className="container">
          <Head eyebrow={x.deityEyebrow} title={x.deityTitle} sub={x.deitySub} />

          <Reveal className="ab-tablewrap">
            <table className="ab-table">
              <thead>
                <tr>{x.tableHead.map((h, k) => <th key={k}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {x.form.map((r, k) => (
                  <tr key={k}>
                    <td data-label={x.tableHead[0]}><strong>{r.p}</strong></td>
                    <td data-label={x.tableHead[1]}>{r.f}</td>
                    <td data-label={x.tableHead[2]}>{r.m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <h3 className="ab-sub">{x.chipsTitle}</h3>
          <div className="ab-chips">
            {x.chips.map(([a, b], k) => (
              <Reveal key={k} index={k} className="ab-chip">
                <strong>{a}</strong>
                <small>{b}</small>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= guiding idea band (pasha + ankusha) ================= */}
      <section className="ab-tattva">
        <div className="container">
          <Reveal className="ab-tattva-in">
            <span className="ab-tattva-eyebrow">{x.tattvaEyebrow}</span>
            <h2 className="ab-mantra">{x.mantra}</h2>
            <p>{x.mantraMeaning}</p>
          </Reveal>
          <div className="ab-roles">
            {x.roles.map((r, k) => (
              <Reveal key={k} index={k} className="ab-role">
                <h3>{r.t}</h3>
                <ul>
                  {r.pts.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= twelve shaktis ================= */}
      <section className="ab-sec ab-alt">
        <div className="container">
          <Head eyebrow={x.shaktiEyebrow} title={x.shaktiTitle} sub={x.shaktiSub} />
          <div className="ab-shaktis">
            {x.shaktis.map((sh, k) => (
              <Reveal key={k} index={k % 4} className="ab-sh">
                <span className="ab-sh-n">{String(k + 1).padStart(2, '0')}</span>
                <h3>{sh.t}</h3>
                <p>{sh.d}</p>
              </Reveal>
            ))}
          </div>
          <p className="ab-note">{x.note}</p>
        </div>
      </section>

      {/* ================= highlights ================= */}
      <section className="ab-sec">
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
      <section className="ab-sec ab-alt">
        <div className="container">
          <Head title={t.reno.stepsTitle} sub={t.reno.sub} />
          <div className="ab-steps">
            {t.reno.steps.map((st, k) => (
              <Reveal key={k} index={k} className="ab-step">
                <span className="ab-num">{k + 1}</span>
                <p>{st}</p>
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