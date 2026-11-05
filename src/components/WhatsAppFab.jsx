import { useEffect, useState } from 'react';
import { Link } from '../router';
import WhatsAppIcon from './WhatsAppIcon';
import './WhatsAppFab.css';

export default function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      to="/iletisim#siparis"
      className={`wa-fab ${show ? 'is-shown' : ''}`}
      aria-label="WhatsApp ile sipariş verin"
    >
      <span className="wa-fab__ring" aria-hidden="true" />
      <WhatsAppIcon className="wa-fab__icon" />
      <span className="wa-fab__label">WhatsApp ile sipariş</span>
    </Link>
  );
}
