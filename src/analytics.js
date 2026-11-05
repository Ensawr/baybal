/*
  Google Analytics 4

  Bağlamak için: Analytics'te bir "Web" veri akışı oluşturun ve size verilen
  ölçüm kimliğini (G- ile başlar) aşağıya yazın. Başka bir şey yapmanız gerekmez.

  Önemli: Analytics > Yönetici > Veri akışları > (akışınız) > Geliştirilmiş ölçüm >
  "Sayfa değişiklikleri (tarayıcı geçmişi etkinliklerine göre)" seçeneğini KAPATIN.
  Sayfa görüntülemelerini bu dosya kendisi gönderiyor; açık kalırsa her sayfa iki kez sayılır.
*/
export const GA_MEASUREMENT_ID = ''; // örnek: 'G-ABC123XYZ9'

const enabled = () =>
  Boolean(GA_MEASUREMENT_ID) && process.env.NODE_ENV === 'production' && typeof window !== 'undefined';

let started = false;

export function initAnalytics() {
  if (started || !enabled()) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
  };
  window.gtag('js', new Date());
  // İlk sayfa görüntülemesini de biz gönderiyoruz (sayfa başlığı güncellendikten sonra)
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

export function trackPageView() {
  if (!enabled() || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  });
}

export function trackEvent(name, params = {}) {
  if (!enabled() || !window.gtag) return;
  window.gtag('event', name, params);
}
