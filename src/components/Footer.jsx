import Logo from './Logo';
import Reveal from './Reveal';
import WhatsAppButton from './WhatsAppButton';
import { Link } from '../router';
import { WHATSAPP_DISPLAY, whatsappLink } from '../data/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__cta">
        <Reveal as="h2" className="footer__title">
          Sofranıza Erzincan’dan bal gelsin.
        </Reveal>
        <Reveal as="div" delay={150} className="footer__cta-side">
          <p>
            Ürünleri seçin, kilosunu yazın; siparişiniz WhatsApp’ta hazır bir mesaj olarak açılsın. Türkiye’nin her yerine
            kargo, İstanbul’un belirli bölgelerine elden teslim.
          </p>
          <WhatsAppButton />
        </Reveal>
      </div>

      <div className="container footer__bottom">
        <Logo className="footer__logo" />
        <nav className="footer__nav" aria-label="Alt menü">
          <Link to="/">Anasayfa</Link>
          <Link to="/#ballar">Ballarımız</Link>
          <Link to="/#urunler">Ürünler</Link>
          <Link to="/#sss">Sık sorulanlar</Link>
          <Link to="/iletisim">İletişim</Link>
        </nav>
        <a
          className="footer__phone"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp: {WHATSAPP_DISPLAY}
        </a>
        <p className="footer__copy">© {new Date().getFullYear()} BayBal, Erzincan</p>
      </div>
    </footer>
  );
}
