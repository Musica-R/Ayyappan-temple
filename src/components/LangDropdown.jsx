import { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useLang, LANGS } from '../utils/LanguageContext.jsx';

export default function LangDropdown() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  useEffect(() => {
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('touchstart', close); };
  }, []);

  return (
    <div className="lang-dd" ref={box}>
      <button type="button" className="lang-btn" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}>
        <FaGlobe /> <span>{current.label}</span> <FaChevronDown className={open ? 'rot' : ''} />
      </button>
      {open && (
        <ul className="lang-list" role="listbox">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button type="button" className={l.code === lang ? 'on' : ''} onClick={() => { setLang(l.code); setOpen(false); }}>{l.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
