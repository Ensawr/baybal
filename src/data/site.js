// WhatsApp numarası: başında + ve boşluk olmadan, ülke koduyla yazılır.
export const WHATSAPP_NUMBER = '905394244050';
export const WHATSAPP_DISPLAY = '+90 539 424 40 50';

export const QTY_MIN = 1;
export const QTY_MAX = 20;

export function whatsappLink(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Sitenin yayındaki adresi. Kanonik adresler ve yapılandırılmış veri hep buna göre oluşur.
export const SITE_URL = 'https://baybal.tr';

export function absoluteUrl(path) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
