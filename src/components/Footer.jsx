import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaBell, FaArrowRight, FaAngleRight, FaRegCopyright } from 'react-icons/fa';
import { MdTempleHindu } from 'react-icons/md';
import { GiLotus } from 'react-icons/gi';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/footer.css';
import { GiByzantinTemple } from "react-icons/gi";

/* small four-diamond ornament used in the dividers */
const Ornament = ({ size = 14 }) => (
  <svg className="orn" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 0l3 3-3 3-3-3zM12 18l3 3-3 3-3-3zM0 12l3-3 3 3-3 3zM18 12l3-3 3 3-3 3zM12 8l4 4-4 4-4-4z" />
  </svg>
);

const PUBLIC = process.env.PUBLIC_URL || '';
const TEMPLE_IMG = `${PUBLIC}/assets/t1.jpg`;
const LAMP_IMG = `${PUBLIC}/images/t3.jpg`;
const hideIfMissing = (e) => { e.currentTarget.style.display = 'none'; };

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const brand = t.brand;
  const tagParts = brand.tag.split('•').map((x) => x.trim());

  const links = [['/', 'home'], ['/about', 'about'], ['/renovation', 'renovation'], ['/gallery', 'gallery'], ['/festivals', 'festivals'], ['/contact', 'contact']];

  return (
    <footer className="footer">
      {/* ===== HERO BAND ===== */}
      <div className="f-hero">
        <img className="f-lamp" src={LAMP_IMG} alt="" aria-hidden="true" onError={hideIfMissing} />
        <div className="f-quote">
          <div className="f-om">
            <span className="f-line" />
            <Ornament size={13} />
            <span className="om-sym">ॐ</span>
            <Ornament size={13} />
            <span className="f-line" />
          </div>
          <p>
            “ {f.quote1}
            <span className="indent">{f.quote2}”</span>
          </p>
        </div>
        <div className="f-temple-img" aria-hidden="true">
          <img src={TEMPLE_IMG} alt="" onError={hideIfMissing} />
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="f-main">
        <div className="footer-grid">
          {/* Brand */}
          <div className="f-brand">
            <GiByzantinTemple className="f-brand-icon" />
            <h3>{brand.name}</h3>
            <div className="f-divider"><span /><Ornament size={18} /><span /></div>
            <p className="f-values">
              {tagParts.map((w, i) => (
                <span key={i} className="f-val">{i > 0 && <i>•</i>}<span>{w}</span></span>
              ))}
            </p>
            <p className="f-about">{f.about}</p>
          </div>

          {/* Quick links */}
          <div className="f-col">
            <h4><GiLotus className="h-ico" />{f.links}</h4>
            <ul className="f-links">
              {links.map(([to, k]) => (
                <li key={to}>
                  <FaAngleRight className="chev" />
                  <Link to={to}>{t.nav[k]}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Temple information */}
          <div className="f-col">
            <h4><MdTempleHindu className="h-ico" />{f.info}</h4>
            <ul className="f-contact">
              <li><span className="ico-ring"><FaMapMarkerAlt /></span>{t.contact.address}</li>
              <li><span className="ico-ring"><FaPhoneAlt /></span>+91 98765 43210</li>
              <li><span className="ico-ring"><FaEnvelope /></span>info@ayyappankadutemple.org</li>
            </ul>
            <div className="f-sep" />
            <h5>{f.follow}</h5>
            <div className="socials">
              <a href="#!" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#!" aria-label="Instagram"><FaInstagram /></a>
              <a href="#!" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Subscribe card */}
          <div className="f-card">
            <span className="card-top"><GiLotus /></span>
            <h4>{f.stay1}<br />{f.stay2}</h4>
            <p>{f.stayText}</p>
            <button type="button" className="f-btn">
              <FaBell /> {f.subscribe} <FaArrowRight />
            </button>
            <span className="card-bot"><Ornament size={16} /></span>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="footer-bar">
        <div className="footer-bar-in">
          <span className="copy">
            <FaRegCopyright /> {new Date().getFullYear()} {brand.name}. {f.rights}
          </span>
          <span className="f-mid"><span className="f-line" /><GiLotus /><span className="f-line" /></span>
          <span className="f-right">
            <span className="dev">{f.devBy} <strong>Mpeoples</strong></span>
            <span className="bar-sep" />
            <span className="om-text">{f.om}</span>
          </span>
        </div>
      </div>

      <div className="f-pattern" aria-hidden="true" />
    </footer>
  );
}