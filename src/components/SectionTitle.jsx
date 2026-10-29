import { FaOm } from 'react-icons/fa';
import Reveal from './Reveal.jsx';
export default function SectionTitle({ title, sub, light = false }) {
  return (
    <Reveal className={`section-title ${light ? 'light' : ''}`}>
      <span className="st-icon"><FaOm /></span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}
