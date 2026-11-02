import { useState, useEffect, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaRegClock } from 'react-icons/fa';
import { useLang } from '../utils/LanguageContext.jsx';
import LangDropdown from './LangDropdown.jsx';
import '../stylesheet/header.css';
import { GiByzantinTemple } from "react-icons/gi";


const LINKS = [['/', 'home'], ['/about', 'about'], ['/renovation', 'renovation'], ['/gallery', 'gallery'], ['/festivals', 'festivals'], ['/contact', 'contact']];

 /* small scrolling strip above the navbar (pooja / festival timings).
   Everything comes from your existing translation keys – nothing new to add. */
function Ticker({ t }) {
  const items = useMemo(
    () => [
      `${t.visit.timingsT}: ${t.visit.timings}`,
      ...t.festivals.items.map((f) => `${f.t}: ${f.m}`),
      `${t.reno.title}: ${t.reno.sub}`,
      t.footer.om,
    ],
    [t]
  );

  return (
    <div className="ticker" role="marquee" aria-label={t.visit.timingsT}>
      <span className="tick-label"><FaRegClock /> {t.visit.timingsT}</span>
      <div className="tick-view">
        <div className="tick-track">
          {[0, 1].map((g) => (
            <div className="tick-group" key={g} aria-hidden={g === 1}>
              {items.map((txt, k) => <span className="tick-item" key={k}>{txt}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="header">
        <Ticker t={t} />

        <div className="container header-in">
          <Link to="/" className="logo">
            <GiByzantinTemple className="logo-icon" />
            <span className="logo-txt">
              <strong>{t.brand.name}</strong>
              <small><i />{t.brand.tag}<i /></small>
            </span>
          </Link>

          <nav className={`nav ${open ? 'open' : ''}`}>
            {LINKS.map(([to, key]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{t.nav[key]}</NavLink>
            ))}
            <LangDropdown />
          </nav>

          <button className="burger" onClick={() => setOpen(!open)} aria-label="menu">{open ? <FaTimes /> : <FaBars />}</button>
        </div>
      </header>

      {/* pushes the page down by the height of the ticker, because the header is position:fixed */}
      <div className="header-spacer" aria-hidden="true" />
    </>
  );
}