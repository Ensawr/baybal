import { useEffect, useState } from 'react';
import Logo from './Logo';
import useTheme from '../hooks/useTheme';
import { Link } from '../router';
import WhatsAppIcon from './WhatsAppIcon';
import './Header.css';

function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? 'Açık temaya geç' : 'Koyu temaya geç'}
      title={dark ? 'Açık tema' : 'Koyu tema'}
    >
      <span className={`theme-toggle__icon ${dark ? 'is-dark' : ''}`} aria-hidden="true">
        <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </svg>
        <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      </span>
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <nav className="site-header__nav site-header__nav--left" aria-label="Ana menü">
          <Link to="/#aricilik">Arıcılık</Link>
          <Link to="/#ballar">Ballarımız</Link>
          <Link to="/#urunler">Ürünler</Link>
        </nav>

        <Link to="/" className="site-header__logo" aria-label="BayBal anasayfa">
          <Logo className="site-header__mark" />
        </Link>

        <div className="site-header__nav site-header__nav--right">
          <Link to="/iletisim">İletişim</Link>
          <Link
            to="/iletisim#siparis"
            className="header-wa"
            aria-label="WhatsApp ile sipariş verin"
          >
            <WhatsAppIcon className="header-wa__icon" />
            <span>Sipariş ver</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
