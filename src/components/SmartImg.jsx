export default function SmartImg({ src, alt = '', className = '' }) {
  return (
    <span className={`smart-img ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = 0; }} />
    </span>
  );
}
