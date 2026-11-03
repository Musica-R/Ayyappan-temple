import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/contact.css';
import LightALamp from '../components/LightALamp.jsx';

/* Contact details – change them here only */
const PHONE_RAW = '9447354285';
const PHONE_SHOW = '+91 94473 54285';
const PHONE_HREF = `tel:+91${PHONE_RAW}`;
const WHATSAPP_NUMBER = `91${PHONE_RAW}`; // country code + number, no "+" or spaces
const EMAIL = 'info@ayyappankaadutemple.org';

const EMPTY_FORM = { name: '', email: '', message: '' };

export default function Contact() {
  const { t } = useLang();
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

  /* [icon, text, link (optional)] */
  const rows = [
    [FaMapMarkerAlt, t.contact.address, null],
    [FaPhoneAlt, PHONE_SHOW, PHONE_HREF],
    [FaEnvelope, EMAIL, `mailto:${EMAIL}`],
  ];

  return (
    <>
      <section className="page-hero">
        <Reveal><h1>{t.contact.title}</h1><p>{t.contact.sub}</p></Reveal>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="c-info">
            {rows.map(([Ic, tx, href], k) => (
              <Reveal key={k} index={k} className="c-row">
                <Ic />
                {href ? <a className="c-link" href={href}>{tx}</a> : <span>{tx}</span>}
              </Reveal>
            ))}
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