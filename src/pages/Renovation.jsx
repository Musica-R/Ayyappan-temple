import { Link } from 'react-router-dom';
import { FaOm, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import '../stylesheet/renovation.css';

export default function Renovation() {
  const { t } = useLang();
  const r = t.reno;
  return (
    <>
      <section className="page-hero"><Reveal><h1>{r.title}</h1><p>{r.sub}</p></Reveal></section>
      <section className="section">
        <div className="container reno-grid">
          <article className="notice">
            <Reveal><h3>{r.greeting}</h3></Reveal>
            {r.paras.map((p, k) => <Reveal key={k} index={k % 3}><p>{p}</p></Reveal>)}
            <Reveal className="sign">
              <p className="saranam"><FaOm /> {r.saranam}</p>
              <strong>{r.org}</strong>
              <small>{r.behalf}</small>
            </Reveal>
          </article>
          <aside className="steps">
            <Reveal><h3>{r.stepsTitle}</h3></Reveal>
            {r.steps.map((s, k) => <Reveal key={k} index={k} className="step"><FaCheckCircle /><span>{s}</span></Reveal>)}
            <Reveal index={4}><Link to="/contact" className="btn btn-gold">{r.cta} <FaArrowRight /></Link></Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
