import { FaOm, FaPrayingHands, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import { IMG } from '../data/images.js';
import '../stylesheet/about.css';

export default function About() {
  const { t } = useLang();
  const facts = [[FaPrayingHands, t.about.deity, t.about.deityV], [FaMapMarkerAlt, t.about.location, t.about.locationV], [FaClock, t.about.est, t.about.estV]];
  return (
    <>
      <section className="page-hero"><Reveal><h1>{t.about.title}</h1><p>{t.about.eyebrow}</p></Reveal></section>
      <section className="section">
        <div className="container about-page">
          <Reveal dir="left"><SmartImg src={IMG.temple} alt="temple" className="about-big" /></Reveal>
          <div>
            <Reveal><span className="eyebrow"><FaOm /> {t.about.historyTitle}</span></Reveal>
            <Reveal index={1}><p>{t.about.p1}</p></Reveal>
            <Reveal index={2}><p>{t.about.p2}</p></Reveal>
            <Reveal index={3}><p>{t.about.history}</p></Reveal>
          </div>
        </div>
        <br />
        <div className="container fact-row">
          {facts.map(([Ic, a, b], k) => (
            <Reveal key={k} index={k} className="fact-card"><Ic /><strong>{a}</strong><small>{b}</small></Reveal>
          ))}
        </div>
      </section>
      <section className="section cream-2">
        <div className="container">
          <SectionTitle title={t.highlights.title} sub={t.highlights.sub} />
          <div className="about-list">
            {t.highlights.items.map((h, k) => <Reveal key={k} index={k} className="about-li"><h3>{h.t}</h3><p>{h.d}</p></Reveal>)}
          </div>
        </div>
      </section>
    </>
  );
}
