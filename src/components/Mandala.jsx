/* Small decorative mandala (outline only, inherits colour via currentColor) */
export default function Mandala({ className = '' }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg className={`mandala ${className}`} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle r="94" />
        <circle r="72" />
        <circle r="40" />
        <circle r="12" />
        {petals.map((_, i) => (
          <path key={`a${i}`} transform={`rotate(${i * 30})`} d="M0 -40 C 14 -56, 14 -76, 0 -92 C -14 -76, -14 -56, 0 -40Z" />
        ))}
        {petals.map((_, i) => (
          <path key={`b${i}`} transform={`rotate(${i * 30 + 15})`} d="M0 -72 C 8 -82, 8 -90, 0 -98 C -8 -90, -8 -82, 0 -72Z" />
        ))}
      </g>
    </svg>
  );
}