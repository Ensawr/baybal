import lines from '../assets/logo-lines.png';
import fill from '../assets/logo-fill.png';
import './Logo.css';

// BayBal logosu. Çizgiler temaya göre renk alır, altıgenin içi zemin rengiyle dolar.
export default function Logo({ className = '' }) {
  const mask = (src) => ({ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` });
  return (
    <span className={`logo ${className}`} role="img" aria-label="BayBal">
      <span className="logo__fill" style={mask(fill)} />
      <span className="logo__lines" style={mask(lines)} />
    </span>
  );
}
