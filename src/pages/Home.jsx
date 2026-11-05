import Hero from '../components/Hero';
import Story from '../components/Story';
import HoneyList from '../components/HoneyList';
import ProductSlider from '../components/ProductSlider';
import Faq from '../components/Faq';
import JsonLd from '../components/JsonLd';
import useSeo from '../hooks/useSeo';
import { honey } from '../data/products';
import { absoluteUrl, SITE_URL } from '../data/site';

// Bal çeşitleri için ürün bilgisi (arama sonuçlarında fiyatla görünebilmesi için)
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'BayBal bal çeşitleri ve fiyatları',
  itemListElement: honey.map((h, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `${h.name}${h.priceType === 'fixed' ? ` (${h.detail.replace(' kavanoz', '')})` : ''}`,
      description: `Erzincan'da kendi arılarımızla üretilen katkısız ${h.name.toLowerCase()}. ${h.detail}.`,
      image: absoluteUrl(h.image),
      brand: { '@type': 'Brand', name: 'BayBal' },
      countryOfOrigin: 'TR',
      offers: {
        '@type': 'Offer',
        price: h.price,
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/iletisim?urun=${h.id}`,
        seller: { '@id': `${SITE_URL}/#organization` },
        ...(h.priceType === 'perKg' && {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: h.price,
            priceCurrency: 'TRY',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'KGM' },
          },
        }),
      },
    },
  })),
};

export default function Home() {
  useSeo({
    title: 'BayBal | Erzincan Balı, Katkısız Doğal Bal Satışı',
    description:
      "Erzincan'da kendi arılarımızla ürettiğimiz katkısız süzme çiçek balı, karakovan ve petek bal. Pekmez, tulum peyniri ve doğal ürünler. Türkiye geneline kargo.",
    path: '/',
  });

  return (
    <>
      <JsonLd data={productSchema} />
      <Hero />
      <Story />
      <HoneyList />
      <ProductSlider />
      <Faq />
    </>
  );
}
