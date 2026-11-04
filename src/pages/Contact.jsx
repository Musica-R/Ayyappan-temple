import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaDirections } from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/contact.css';
import LightALamp from '../components/LightALamp.jsx';

/* Contact details – change them here only */
const PHONE_RAW = '9447354285';
const PHONE_SHOW = '+91 94473 54285';
const PHONE_HREF = `tel:+91${PHONE_RAW}`;
const WHATSAPP_NUMBER = `91${PHONE_RAW}`; // country code + number, no "+" or spaces

/* Location – your Google Maps link */
const MAP_LINK = 'https://maps.app.goo.gl/c9hU6RK27voWvDrF9?g_st=awb';
/* Embedded map. For an exact pin, replace with the src from
   Google Maps > Share > Embed a map */
const MAP_EMBED =
  'https://www.google.com/maps?q=Ayyappankadu+Dharma+Sastha+Temple+Kerala&output=embed';

const EMPTY_FORM = { name: '', email: '', message: '' };

export default function Contact() {
  const { t } = useLang();
  const f = t.footer; // address lines live in the footer translations
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (sent) setSent(false);
  };

  const submit = (e) => {
    e.preventDefault();

    const text =
      `*New message from website*\n\n` +
      `*Name:* ${form.name.trim()}\n` +
      `*Email:* ${form.email.trim()}\n` +
      `*Message:* ${form.message.trim()}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp (app on mobile, WhatsApp Web on desktop)
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) window.location.href = url; // fallback if popup is blocked

    setSent(true);
    setForm(EMPTY_FORM);
  };

  /* Three-line address */
  const address = (
    <>
      {f.addr1}<br />
      {f.addr2}<br />
      {f.addr3}
    </>
  );

  /* [icon, content, link (optional), opens in new tab?] */
  const rows = [
    [FaMapMarkerAlt, address, MAP_LINK, true],
    [FaPhoneAlt, PHONE_SHOW, PHONE_HREF, false],
  ];

  return (
    <>
      <section className="page-hero">
        <Reveal><h1>{t.contact.title}</h1><p>{t.contact.sub}</p></Reveal>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="c-info">
            {rows.map(([Ic, tx, href, external], k) => (
              <Reveal key={k} index={k} className="c-row">
                <Ic />
                {href ? (
                  <a
                    className="c-link"
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {tx}
                  </a>
                ) : (
                  <span>{tx}</span>
                )}
              </Reveal>
            ))}

            {/* Location map */}
            <Reveal index={2} className="c-map">
              <iframe
                title="Temple location"
                src={MAP_EMBED}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="btn btn-maroon c-map-btn"
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDirections /> Open in Google Maps
              </a>
            </Reveal>
          </div>

          <Reveal index={1}>
            <form className="c-form" onSubmit={submit}>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.contact.name}
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t.contact.email}
              />
              <textarea
                required
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t.contact.msg}
              />
              <button className="btn btn-maroon" type="submit">
                <FaPaperPlane /> {t.contact.send}
              </button>
              {sent && <p className="thanks" role="status">{t.contact.thanks}</p>}
            </form>
          </Reveal>
        </div>
      </section>

      <LightALamp />
    </>
  );
}