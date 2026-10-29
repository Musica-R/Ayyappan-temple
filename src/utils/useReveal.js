import { useEffect, useRef, useState } from 'react';

// Shows an element when it scrolls into view. Uses IntersectionObserver AND a
// scroll-position fallback so content can never stay invisible.
export default function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let done = false;
    const show = () => { if (!done) { done = true; setVisible(true); cleanup(); } };
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) show();
    };
    let io;
    function cleanup() {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      if (io) io.disconnect();
    }
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((e) => { if (e[0].isIntersecting) show(); }, { threshold: 0.01 });
      io.observe(el);
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const t = setTimeout(check, 100);
    return () => { clearTimeout(t); cleanup(); };
  }, []);

  return [ref, visible];
}
