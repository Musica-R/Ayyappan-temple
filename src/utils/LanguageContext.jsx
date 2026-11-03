import { createContext, useContext, useEffect, useState } from 'react';
import translations from '../data/translations.js';

const Ctx = createContext(null);
export const DEFAULT_LANG = 'ml';

export const LANGS = [
  { code: 'ml', label: 'മലയാളം' },
  { code: 'en', label: 'English' },
  // { code: 'ta', label: 'தமிழ்' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('temple_lang_v2');
      return translations[saved] ? saved : DEFAULT_LANG;
    } catch { return DEFAULT_LANG; }
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('temple_lang_v2', lang); } catch {}
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
