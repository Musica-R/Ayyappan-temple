import { Link } from 'react-router-dom';
import { FaPlaceOfWorship, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/footer.css';

export default function Footer() {
  const { t } = useLang();
  const links = [['/', 'home'], ['/about', 'about'], ['/renovation', 'renovation'], ['/gallery', 'gallery'], ['/festivals', 'festivals'], ['/contact', 'contact']];
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="f-brand">
          <FaPlaceOfWorship className="logo-icon" />
          <div><strong>{t.brand.name}</strong><small>{t.brand.tag}</small></div>
        </div>
        <div>
          <h4>{t.footer.links}</h4>
          <ul>{links.map(([to, k]) => <li key={to}><Link to={to}>{t.nav[k]}</Link></li>)}</ul>
        </div>
        <div>
          <h4>{t.footer.contact}</h4>
          <ul className="f-contact">
            <li><FaMapMarkerAlt /> {t.contact.address}</li>
            <li><FaPhoneAlt /> +91 98765 43210</li>
            <li><FaEnvelope /> info@ayyappankaadutemple.org</li>
          </ul>
        </div>
        <div>
          <h4>{t.footer.follow}</h4>
          <div className="socials"><a href="#!"><FaFacebookF /></a><a href="#!"><FaInstagram /></a><a href="#!"><FaYoutube /></a></div>
        </div>
      </div>
      <div className="footer-bar">
        <div className="container footer-bar-in">
          <span>© {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}</span>
          <span className="dev">{t.footer.dev}</span>
          <span>{t.footer.om}</span>
        </div>
      </div>
    </footer>
  );
}
