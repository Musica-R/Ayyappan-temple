import { useEffect, useState } from 'react';
import { FaArrowUp, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import '../stylesheet/floating.css';

/* Number: +91 9447354285 */
const PHONE_HREF = 'tel:+919447354285';
const WHATSAPP_HREF = `https://wa.me/919447354285?text=${encodeURIComponent(
  'Namaskaram, I would like to know more about the temple.'
)}`;

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fab-wrap">
      <button
        type="button"
        className={`fab fab-top ${showTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        tabIndex={showTop ? 0 : -1}
      >
        <FaArrowUp />
      </button>

      <a
        className="fab fab-whatsapp"
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <a className="fab fab-call" href={PHONE_HREF} aria-label="Call us">
        <FaPhoneAlt />
      </a>
    </div>
  );
}