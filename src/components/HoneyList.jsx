import { useId, useState } from 'react';
import listImg from '../assets/honey/bal-listesi.jpg';
import { honey, formatPrice } from '../data/products';
import Reveal from './Reveal';
import Delivery from './Delivery';
import WhatsAppButton from './WhatsAppButton';
import './HoneyList.css';

const minPrice = Math.min(...honey.map((h) => h.price));

export default function HoneyList() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className="honey" id="ballar">
      <div className="container">
        <div className="honey__head">
          <Reveal as="h2" className="honey__title">
            Ballarımız
          </Reveal>
          <Reveal as="p" className="honey__lead" delay={120}>
            Süzme çiçek balından karakovan bala kadar, hepsi Erzincan’daki kendi kovanlarımızdan. Güncel bal fiyatlarını
            listede bulabilirsiniz.
          </Reveal>
        </div>

        <Reveal className={`accordion ${open ? 'is-open' : ''}`} delay={180}>
          <button
            type="button"
            className="accordion__trigger"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="accordion__thumbs" aria-hidden="true">
              {honey.slice(0, 4).map((h) => (
                <img key={h.id} src={h.image} alt="" />
              ))}
            </span>
            <span className="accordion__label">
              <span className="accordion__title">Güncel bal listemiz</span>
              <span className="accordion__sub">
                {honey.length} çeşit, {formatPrice(minPrice)}’den başlayan fiyatlar
              </span>
            </span>
            <span className="accordion__chevron" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>

          <div className="accordion__panel" id={panelId} role="region" aria-label="Güncel bal listemiz" inert={!open}>
            <div className="accordion__inner">
              <div className="accordion__body">
                <figure className="accordion__figure">
                  <img
                    src={listImg}
                    width="1131"
                    height="1600"
                    alt="BayBal güncel bal fiyat listesi: süzme çiçek balı, fenni petek ve karakovan bal fiyatları"
                    loading="lazy"
                  />
                </figure>

                <div className="pricing">
                  <div className="pricing__note">
                    <h3>Kavanoz fiyatları sabit</h3>
                    <p>Süzme çiçek balı kavanozlarında listedeki fiyat geçerlidir.</p>
                  </div>
                  <div className="pricing__note">
                    <h3>Petek ve karakovan tartıya göre</h3>
                    <p>
                      Fenni petek ve karakovan ballarında listedeki fiyat kilo fiyatıdır. Toplam fiyat, ürünün tartıda
                      çıkan ağırlığına göre hesaplanır. Örneğin 1 kilo 200 gram gelen bir karakovan balında 200 gramın
                      fiyatı da eklenir.
                    </p>
                  </div>
                  <div className="pricing__note">
                    <h3>Kesin fiyatı WhatsApp’tan iletiyoruz</h3>
                    <p>
                      Bu yüzden siparişleri WhatsApp üzerinden alıyoruz. Ürününüzü tartıp kesin fiyatı ve gönderim
                      bilgisini size yazıyoruz.
                    </p>
                  </div>
                  <WhatsAppButton />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="honey__delivery">
          <Delivery />
        </div>
      </div>
    </section>
  );
}
