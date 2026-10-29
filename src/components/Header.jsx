import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaPlaceOfWorship, FaBars, FaTimes } from 'react-icons/fa';
import { useLang } from '../utils/LanguageContext.jsx';
import LangDropdown from './LangDropdown.jsx';
import '../stylesheet/header.css';

const LINKS = [['/', 'home'], ['/about', 'about'], ['/renovation', 'renovation'], ['/gallery', 'gallery'], ['/festivals', 'festivals'], ['/contact', 'contact']];

export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header">
      <div className="container header-in">
        <Link to="/" className="logo">
          <FaPlaceOfWorship className="logo-icon" />
          <span className="logo-txt"><strong>{t.brand.name}</strong><small>{t.brand.tag}</small></span>
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
  );
}
