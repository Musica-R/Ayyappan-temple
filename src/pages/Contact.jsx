import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/contact.css';

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); e.target.reset(); };
  return (
    <>
      <section className="page-hero"><Reveal><h1>{t.contact.title}</h1><p>{t.contact.sub}</p></Reveal></section>
      <section className="section">
        <div className="container contact-grid">
          <div className="c-info">
            {[[FaMapMarkerAlt, t.contact.address], [FaPhoneAlt, '+91 98765 43210'], [FaEnvelope, 'info@ayyappankaadutemple.org']].map(([Ic, tx], k) => (
              <Reveal key={k} index={k} className="c-row"><Ic /><span>{tx}</span></Reveal>
            ))}
          </div>
          <Reveal index={1}>
            <form className="c-form" onSubmit={submit}>
              <input required placeholder={t.contact.name} />
              <input required type="email" placeholder={t.contact.email} />
              <textarea required rows="5" placeholder={t.contact.msg} />
              <button className="btn btn-maroon" type="submit"><FaPaperPlane /> {t.contact.send}</button>
              {sent && <p className="thanks">{t.contact.thanks}</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
