import useReveal from '../utils/useReveal.js';
// Wraps content; "index" staggers the animation so items appear one by one.
export default function Reveal({ children, index = 0, dir = 'up', className = '', as: Tag = 'div' }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal reveal-${dir} ${visible ? 'in' : ''} ${className}`} style={{ transitionDelay: `${index * 140}ms` }}>
      {children}
    </Tag>
  );
}
