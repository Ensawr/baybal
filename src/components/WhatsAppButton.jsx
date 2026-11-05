import { Link } from '../router';
import WhatsAppIcon from './WhatsAppIcon';

// Sipariş formuna (iletişim sayfası) götüren WhatsApp butonu
export default function WhatsAppButton({ product, children = 'WhatsApp ile sipariş verin', className = '', ...rest }) {
  const to = product ? `/iletisim?urun=${encodeURIComponent(product)}#siparis` : '/iletisim#siparis';
  return (
    <Link to={to} className={`btn btn--wa ${className}`} {...rest}>
      <WhatsAppIcon className="btn__icon" />
      <span>{children}</span>
    </Link>
  );
}
