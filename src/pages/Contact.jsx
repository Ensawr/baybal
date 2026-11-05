import { useEffect, useMemo, useRef, useState } from 'react';
import naturals, { honey, formatPrice } from '../data/products';
import { QTY_MAX, QTY_MIN, WHATSAPP_DISPLAY, whatsappLink } from '../data/site';
import Delivery from '../components/Delivery';
import useSeo from '../hooks/useSeo';
import WhatsAppIcon from '../components/WhatsAppIcon';
import './Contact.css';

const GROUPS = [
  { id: 'bal', title: 'Ballarımız', items: honey },
  { id: 'dogal', title: 'Diğer doğal ürünler', items: naturals },
];
const ALL = [...honey, ...naturals];

const DELIVERY = [
  { id: 'kargo', label: 'Kargo ile gönderim', hint: 'Türkiye’nin her yerine', message: 'Kargo ile gönderim' },
  { id: 'elden', label: 'İstanbul’da elden teslim', hint: 'Belirli bölgelerde', message: 'İstanbul içi elden teslim' },
];

const clamp = (n) => Math.min(QTY_MAX, Math.max(QTY_MIN, n));

function priceLabel(p) {
  if (!p.price) return null;
  return p.priceType === 'perKg' ? `${formatPrice(p.price)} / kg, tartıya göre` : `${formatPrice(p.price)} / kavanoz`;
}

function buildMessage({ items, delivery, address, name, note }) {
  const d = DELIVERY.find((x) => x.id === delivery);
  const lines = [
    'Merhabalar, sizden aşağıdaki ürünleri almak istiyorum:',
    '',
    ...items.map(({ product, qty }) => `- ${qty} ${product.unit} ${product.messageName || product.name}`),
    '',
    `Teslimat: ${d.message}`,
    `Adresim: ${address.trim()}`,
  ];
  if (name.trim()) lines.push(`Ad soyad: ${name.trim()}`);
  if (note.trim()) lines.push(`Not: ${note.trim()}`);
  lines.push('');
  lines.push(
    delivery === 'elden'
      ? 'Adresime elden teslim yapılıp yapılamayacağını ve bu ürünlerin fiyat bilgisini öğrenmek istiyorum.'
      : 'Bu ürünler için fiyat ve kargo bilgisi almak istiyorum.'
  );
  return lines.join('\n');
}

function Stepper({ product, value, onChange }) {
  const set = (v) => onChange(v);
  const num = Number(value);
  return (
    <div className="stepper" role="group" aria-label={`${product.name} miktarı`}>
      <button type="button" onClick={() => set(clamp((num || QTY_MIN) - 1))} disabled={num <= QTY_MIN} aria-label="Azalt">
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={QTY_MIN}
        max={QTY_MAX}
        step="1"
        value={value}
        onChange={(e) => set(e.target.value === '' ? '' : Math.round(Number(e.target.value)))}
        onBlur={() => set(clamp(Number(value) || QTY_MIN))}
        aria-label={`${product.name} için ${product.unit} sayısı (${QTY_MIN} ile ${QTY_MAX} arası)`}
      />
      <button type="button" onClick={() => set(clamp((num || 0) + 1))} disabled={num >= QTY_MAX} aria-label="Artır">
        +
      </button>
      <span className="stepper__unit">{product.unit}</span>
    </div>
  );
}

function ProductOption({ product, qty, onToggle, onQty }) {
  const checked = qty !== undefined;
  const price = priceLabel(product);
  return (
    <li className={`option ${checked ? 'is-checked' : ''}`}>
      <label className="option__main">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <span className="option__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        {product.image && <img className="option__img" src={product.image} alt="" />}
        <span className="option__text">
          <span className="option__name">{product.name}</span>
          <span className="option__detail">{product.detail || product.kind}</span>
          {price && <span className="option__price">{price}</span>}
        </span>
      </label>
      <div className="option__qty" inert={!checked}>
        <div>{checked && <Stepper product={product} value={qty} onChange={onQty} />}</div>
      </div>
    </li>
  );
}

export default function Contact({ search }) {
  const [selected, setSelected] = useState({});
  const [delivery, setDelivery] = useState('kargo');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState(null);
  const productsRef = useRef(null);
  const addressRef = useRef(null);

  useSeo({
    title: 'Bal Siparişi Ver | BayBal Erzincan Balı ve Doğal Ürünler',
    description:
      "BayBal'dan WhatsApp ile bal ve doğal ürün siparişi verin. Süzme çiçek balı, karakovan ve petek bal, pekmez, tulum peyniri. Türkiye geneline kargo.",
    path: '/iletisim',
  });

  // Anasayfadan bir ürünle gelindiyse o ürünü seçili başlat
  useEffect(() => {
    const id = new URLSearchParams(search).get('urun');
    if (id && ALL.some((p) => p.id === id)) {
      setSelected((s) => (s[id] !== undefined ? s : { ...s, [id]: 1 }));
    }
  }, [search]);

  const items = useMemo(
    () => ALL.filter((p) => selected[p.id] !== undefined).map((p) => ({ product: p, qty: clamp(Number(selected[p.id]) || QTY_MIN) })),
    [selected]
  );

  const toggle = (id) => {
    setSelected((s) => {
      const next = { ...s };
      if (next[id] !== undefined) delete next[id];
      else next[id] = 1;
      return next;
    });
    setErrors((e) => ({ ...e, products: undefined }));
    setSentUrl(null);
  };

  const setQty = (id, v) => {
    setSelected((s) => ({ ...s, [id]: v }));
    setSentUrl(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!items.length) errs.products = 'En az bir ürün seçin.';
    if (address.trim().length < 10) errs.address = 'Gönderim için açık adresinizi yazın (mahalle, sokak, ilçe, il).';
    setErrors(errs);
    if (errs.products) {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (errs.address) {
      addressRef.current?.focus();
      return;
    }
    const url = whatsappLink(buildMessage({ items, delivery, address, name, note }));
    setSentUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact">
      <section className="contact__hero container">
        <h1 className="contact__title">Bal siparişi verin</h1>
        <p className="contact__lead">
          Erzincan balı ve doğal ürünlerimizden almak istediklerinizi seçin, miktarını yazın. Formu gönderdiğinizde siparişiniz WhatsApp’ta hazır bir
          mesaj olarak açılır, sizin yalnızca göndermeniz kalır.
        </p>
      </section>

      <div className="contact__grid container">
        <aside className="contact__aside">
          <a
            className="contact__wa"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="contact__wa-icon" />
            <span>
              <small>Doğrudan yazmak isterseniz</small>
              {WHATSAPP_DISPLAY}
            </span>
          </a>

          <Delivery compact />

          <div className="contact__note">
            <h2>Fiyatlar nasıl hesaplanır?</h2>
            <p>
              Kavanoz fiyatları sabittir. Fenni petek ve karakovan gibi kiloyla satılan ürünlerde fiyat, ürünün tartıda
              çıkan ağırlığına göre hesaplanır. Örneğin 1 kilo 200 gram gelen bir karakovanda 200 gramın fiyatı da
              eklenir. Kesin fiyatı ve gönderim bilgisini WhatsApp’tan size iletiyoruz.
            </p>
          </div>
        </aside>

        <form className="order" id="siparis" onSubmit={onSubmit} noValidate>
          <fieldset className="order__section" ref={productsRef}>
            <legend>Ürünleri seçin</legend>
            {GROUPS.map((g) => (
              <div className="order__group" key={g.id}>
                <h3>{g.title}</h3>
                <ul className="options">
                  {g.items.map((p) => (
                    <ProductOption
                      key={p.id}
                      product={p}
                      qty={selected[p.id]}
                      onToggle={() => toggle(p.id)}
                      onQty={(v) => setQty(p.id, v)}
                    />
                  ))}
                </ul>
              </div>
            ))}
            {errors.products && (
              <p className="order__error" role="alert">
                {errors.products}
              </p>
            )}
          </fieldset>

          <fieldset className="order__section">
            <legend>Teslimat</legend>
            <div className="choices">
              {DELIVERY.map((d) => (
                <label className={`choice ${delivery === d.id ? 'is-checked' : ''}`} key={d.id}>
                  <input type="radio" name="delivery" value={d.id} checked={delivery === d.id} onChange={() => setDelivery(d.id)} />
                  <span className="choice__dot" aria-hidden="true" />
                  <span>
                    <strong>{d.label}</strong>
                    <small>{d.hint}</small>
                  </span>
                </label>
              ))}
            </div>
            {delivery === 'elden' && (
              <p className="order__info">
                Elden teslimi İstanbul’un belirli bölgelerinde yapabiliyoruz. Adresinizin bu bölgelerde olup olmadığını
                WhatsApp’tan size bildireceğiz; olmadığı durumda kargo ile gönderebiliriz.
              </p>
            )}

            <div className="field">
              <label htmlFor="address">Adresiniz</label>
              <textarea
                id="address"
                ref={addressRef}
                rows="3"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((er) => ({ ...er, address: undefined }));
                  setSentUrl(null);
                }}
                placeholder="Mahalle, sokak, bina ve daire no, ilçe, il"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? 'address-error' : undefined}
                required
              />
              {errors.address && (
                <p className="order__error" id="address-error" role="alert">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="name">
                  Adınız soyadınız <span className="field__opt">(isteğe bağlı)</span>
                </label>
                <input id="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="note">
                  Notunuz <span className="field__opt">(isteğe bağlı)</span>
                </label>
                <input id="note" type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Örneğin teslimat saati" />
              </div>
            </div>
          </fieldset>

          <div className="order__footer">
            <button type="submit" className="btn btn--wa order__submit">
              <WhatsAppIcon className="btn__icon" />
              <span>WhatsApp’tan gönder</span>
            </button>
            {sentUrl && (
              <p className="order__sent" role="status">
                WhatsApp yeni sekmede açıldı. Açılmadıysa{' '}
                <a href={sentUrl} target="_blank" rel="noopener noreferrer">
                  buraya dokunun
                </a>
                .
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
