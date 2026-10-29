import { Link } from 'react-router-dom';
import { FaPlaceOfWorship, FaPrayingHands, FaFire, FaCalendarAlt, FaImages, FaMapMarkerAlt, FaLeaf, FaUsers, FaOm, FaClock, FaArrowRight, FaHandHoldingHeart } from 'react-icons/fa';
import HeroSlider from '../components/HeroSlider.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import GalleryStrip from '../components/GalleryStrip.jsx';
import FestivalCards from '../components/FestivalCards.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/home.css';

const QUICK = [[FaPlaceOfWorship, '/about'], [FaFire, '/festivals'], [FaCalendarAlt, '/festivals'], [FaImages, '/gallery'], [FaMapMarkerAlt, '/contact']];
const HI = [FaPlaceOfWorship, FaPrayingHands, FaFire, FaCalendarAlt, FaLeaf, FaUsers];

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <HeroSlider />

      <section className="section about-sec">
        <div className="container about-grid">
          <Reveal dir="left"><SmartImg src="/assets/g2.png" alt="temple" className="about-img" /></Reveal>
          <div>
            <Reveal><span className="eyebrow"><FaOm /> {t.about.eyebrow}</span></Reveal>
            <Reveal index={1}><h2 className="h2">{t.about.title}</h2></Reveal>
            <Reveal index={2}><p>{t.about.p1}</p></Reveal>
            <Reveal index={3}><p>{t.about.p2}</p></Reveal>
            <Reveal index={4}><Link to="/about" className="btn btn-maroon">{t.about.more} <FaArrowRight /></Link></Reveal>
          </div>
          <div className="about-facts">
            {[[FaPrayingHands, t.about.deity, t.about.deityV], [FaMapMarkerAlt, t.about.location, t.about.locationV], [FaClock, t.about.est, t.about.estV]].map(([Ic, a, b], k) => (
              <Reveal key={k} index={k + 1} className="fact"><span><Ic /></span><div><strong>{a}</strong><small>{b}</small></div></Reveal>
            ))}
          </div>
        </div>
        <br />
        <div className="container quick">
          {QUICK.map(([Ic, to], k) => (
            <Reveal key={k} index={k} className="quick-item"><Link to={to}><span><Ic /></span>{t.quick[k]}</Link></Reveal>
          ))}
        </div>
      </section>

      <section className="band-dark">
        <div className="container">
          <SectionTitle light title={t.highlights.title} sub={t.highlights.sub} />
          <div className="hl-grid">
            {t.highlights.items.map((h, k) => {
              const Ic = HI[k];
              return (
                <Reveal key={k} index={k} className="hl">
                  <span className="hl-ic"><Ic /></span><h3>{h.t}</h3><p>{h.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <GalleryStrip />

      <section className="section reno-teaser">
        <div className="container">
          <Reveal className="reno-card">
            <span className="reno-ic"><FaHandHoldingHeart /></span>
            <div>
              <h2>{t.reno.title}</h2>
              <p>{t.reno.paras[0]}</p>
            </div>
            <Link to="/renovation" className="btn btn-maroon">{t.reno.sub} <FaArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section cream-2">
        <div className="container">
          <SectionTitle title={t.festivals.title} sub={t.festivals.sub} />
          <FestivalCards />
          <div className="center"><Link to="/festivals" className="btn btn-maroon">{t.festivals.all} <FaArrowRight /></Link></div>
        </div>
      </section>

      <section className="visit">
        <div className="container visit-in">
          <Reveal><h2>{t.visit.title}</h2><p>{t.visit.sub}</p><Link to="/contact" className="btn btn-gold"><FaMapMarkerAlt /> {t.visit.directions}</Link></Reveal>
          <Reveal index={1} className="visit-box"><FaClock /><div><strong>{t.visit.timingsT}</strong><small>{t.visit.timings}</small></div></Reveal>
          <Reveal index={2} className="visit-box"><FaMapMarkerAlt /><div><strong>{t.visit.locT}</strong><small>{t.visit.loc}</small></div></Reveal>
          <Reveal index={3} className="visit-box"><FaUsers /><div><strong>{t.visit.guideT}</strong><small>{t.visit.guide}</small></div></Reveal>
        </div>
      </section>

      <section className="quote-band"><Reveal><FaOm /><p>“ {t.quote} ”</p></Reveal></section>
    </>
  );
}
