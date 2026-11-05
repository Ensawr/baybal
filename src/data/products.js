import karadut from '../assets/products/karadut-pekmezi.jpg';
import beyazDut from '../assets/products/beyaz-dut-pekmezi.jpg';
import kusburnu from '../assets/products/kusburnu.jpg';
import marmelat from '../assets/products/kusburnu-marmelati.jpg';
import tulum from '../assets/products/tulum-peyniri.jpg';
import elma from '../assets/products/elma-kurusu.jpg';
import kayisi from '../assets/products/kayisi-kurusu.jpg';
import ceviz from '../assets/products/kabuklu-ceviz.jpg';

import suzme1 from '../assets/honey/suzme-1kg.jpg';
import suzme13 from '../assets/honey/suzme-1300.jpg';
import fenni from '../assets/honey/fenni-petek.jpg';
import karakovanImg from '../assets/honey/karakovan.jpg';
import kutulu from '../assets/honey/karakovan-kutulu.jpg';

/*
  Ballar. Fiyatlar bal listesi görseliyle aynı olmalı.
  priceType: 'fixed'  -> kavanoz fiyatı sabit
             'perKg'  -> kilo fiyatı, ürün tartıya göre hesaplanır
  unit: formda ve WhatsApp mesajında kullanılan birim
*/
export const honey = [
  {
    id: 'suzme-cicek-1kg',
    name: 'Süzme çiçek balı',
    detail: 'Net 1 kg kavanoz',
    messageName: 'Süzme çiçek balı (1 kg)',
    price: 800,
    priceType: 'fixed',
    unit: 'kavanoz',
    image: suzme1,
  },
  {
    id: 'suzme-cicek-1300',
    name: 'Süzme çiçek balı',
    detail: 'Net 1,3 kg kavanoz',
    messageName: 'Süzme çiçek balı (1,3 kg)',
    price: 1000,
    priceType: 'fixed',
    unit: 'kavanoz',
    image: suzme13,
  },
  {
    id: 'fenni-petek',
    name: 'Fenni petek bal',
    detail: 'Kilo fiyatı, tartıya göre',
    messageName: 'Fenni petek bal',
    price: 800,
    priceType: 'perKg',
    unit: 'kilo',
    image: fenni,
  },
  {
    id: 'karakovan',
    name: 'Karakovan bal',
    detail: 'Kilo fiyatı, tartıya göre',
    messageName: 'Karakovan bal',
    price: 1250,
    priceType: 'perKg',
    unit: 'kilo',
    image: karakovanImg,
  },
  {
    id: 'karakovan-kutulu',
    name: 'Karakovan bal, kutulu',
    detail: 'Kilo fiyatı, tartıya göre',
    messageName: 'Karakovan bal (kutulu)',
    price: 1250,
    priceType: 'perKg',
    unit: 'kilo',
    image: kutulu,
  },
];

// Diğer doğal ürünler (anasayfadaki kaydırıcıda gösterilir)
const products = [
  {
    id: 'karadut-pekmezi',
    name: 'Karadut pekmezi',
    kind: 'Pekmez',
    unit: 'kilo',
    image: karadut,
    text: 'Yalnızca karadut. Koyu, yoğun ve şeker eklenmemiş.',
  },
  {
    id: 'beyaz-dut-pekmezi',
    name: 'Beyaz dut pekmezi',
    kind: 'Pekmez',
    unit: 'kilo',
    image: beyazDut,
    text: 'Yalnızca beyaz dut. Kahvaltıların vazgeçilmezi, tahinle bir başka güzel.',
  },
  {
    id: 'kusburnu',
    name: 'Kuşburnu',
    kind: 'Kurutulmuş',
    unit: 'kilo',
    image: kusburnu,
    text: 'Doğal yolla kurutulmuş kuşburnu. Çayı da, kendisi de kış sofrası için.',
  },
  {
    id: 'kusburnu-marmelati',
    name: 'Kuşburnu marmelatı',
    kind: 'Marmelat',
    unit: 'kilo',
    image: marmelat,
    text: 'Kuşburnundan, el emeğiyle kaynatılmış. Ekşimsi ve kıvamlı.',
  },
  {
    id: 'tulum-peyniri',
    name: 'Tulum peyniri',
    kind: 'Peynir',
    unit: 'kilo',
    image: tulum,
    text: 'Geleneksel yöntemle olgunlaşan Erzincan tulumu.',
  },
  {
    id: 'elma-kurusu',
    name: 'Elma kurusu',
    kind: 'Kurutulmuş',
    unit: 'kilo',
    image: elma,
    text: 'İnce dilimlenmiş, doğal yolla kurutulmuş elma. Atıştırmalık olarak birebir.',
  },
  {
    id: 'kayisi-kurusu',
    name: 'Kayısı kurusu',
    kind: 'Kurutulmuş',
    unit: 'kilo',
    image: kayisi,
    text: 'Kükürtsüz, güneşin rengini taşıyan doğal kayısı.',
  },
  {
    id: 'kabuklu-ceviz',
    name: 'Kabuklu ceviz',
    kind: 'Kuruyemiş',
    unit: 'kilo',
    image: ceviz,
    text: 'Kabuğuyla gelen, kırınca içi dolgun çıkan ceviz.',
  },
];

export default products;

export function formatPrice(n) {
  return `${n.toLocaleString('tr-TR')} ₺`;
}
