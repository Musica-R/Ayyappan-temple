import Reveal from '../components/Reveal.jsx';
import FestivalCards from '../components/FestivalCards.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/festivals.css';

export default function Festivals() {
  const { t } = useLang();
  return (
    <>
      <section className="page-hero"><Reveal><h1>{t.festivals.title}</h1><p>{t.festivals.sub}</p></Reveal></section>
      <section className="section"><div className="container"><FestivalCards /></div></section>
    </>
  );
}
