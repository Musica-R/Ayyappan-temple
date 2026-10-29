import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useLang } from '../utils/LanguageContext.jsx';
import { IMG } from '../data/images.js';
import Reveal from './Reveal.jsx';
import SmartImg from './SmartImg.jsx';

const PICS = [IMG.lamps, IMG.deity, IMG.kerala, IMG.festival];
export default function FestivalCards() {
  const { t } = useLang();
  return (
    <div className="fest-grid">
      {t.festivals.items.map((f, k) => (
        <Reveal key={k} index={k} className="fest-card">
          <SmartImg src={PICS[k]} alt={f.t} />
          <span className="fest-date"><FaCalendarAlt /> {f.m}</span>
          <div className="fest-body">
            <h3>{f.t}</h3>
            <p>{f.d}</p>
            <Link to="/festivals" className="more">{t.festivals.learn} <FaArrowRight /></Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
