import Reveal from './Reveal';
import './Delivery.css';

const ITEMS = [
  {
    title: 'İstanbul’da belirli bölgelere elden',
    text: 'İstanbul’un belirli bölgelerine siparişinizi kapınıza kadar elden getiriyoruz. Adresinizin bu bölgelerde olup olmadığını WhatsApp’tan bildiriyoruz.',
    icon: (
      <path d="M3.5 11.2 12 4l8.5 7.2M6 9.5V20h12V9.5M10 20v-5.5h4V20" />
    ),
  },
  {
    title: 'Türkiye’nin her yerine kargo',
    text: 'Türkiye’nin her iline kargo ile gönderiyoruz. Ürünler özenle paketlenir.',
    icon: (
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Zm0 0 9 4.5 9-4.5M12 12v9M7.5 5.2l9 4.6" />
    ),
  },
];

export default function Delivery({ compact = false }) {
  return (
    <ul className={`delivery ${compact ? 'delivery--compact' : ''}`}>
      {ITEMS.map((it, i) => (
        <Reveal as="li" className="delivery__item" key={it.title} delay={i * 120}>
          <span className="delivery__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {it.icon}
            </svg>
          </span>
          <div>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
