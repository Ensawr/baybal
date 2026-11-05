import Reveal from './Reveal';
import './Story.css';

const FACTS = [
  {
    title: 'Kendi arılarımız',
    text: 'Kovanlarımızı kendimiz kuruyor, arılarımıza her mevsim kendimiz bakıyoruz.',
  },
  {
    title: "Erzincan'da üretim",
    text: 'Sattığımız her ürün Erzincan’dan, kendi elimizden çıkıyor.',
  },
  {
    title: 'Katkı maddesi yok',
    text: 'Ne balımıza ne de diğer ürünlerimize hiçbir şey eklemiyoruz.',
  },
  {
    title: '30 yılı aşkın tecrübe',
    text: 'Bildiğimiz her şeyi yıllar içinde, kovanın başında öğrendik.',
  },
];

const STEPS = [
  { title: 'Kovan', text: 'Arılarımız yayla çiçeklerinden nektar toplar.' },
  { title: 'Hasat', text: 'Petekler olgunlaşınca hasadı elle yaparız.' },
  { title: 'Süzme', text: 'Balı petekten süzeriz, başka hiçbir işlem eklemeyiz.' },
  { title: 'Kavanoz', text: 'Doldurduğumuz kavanozlar doğrudan sofranıza gelir.' },
];

function Hex({ children }) {
  return (
    <svg className="hex" viewBox="0 0 100 88" aria-hidden="true">
      <path d="M25 2 H75 L98 44 L75 86 H25 L2 44 Z" />
      {children}
    </svg>
  );
}

export default function Story() {
  return (
    <section className="story" id="aricilik">
      <div className="drip" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C80,40 110,40 140,40 C170,40 172,96 196,96 C220,96 222,40 260,40 L520,40 C560,40 566,70 590,70 C614,70 618,40 660,40 L860,40 C900,40 904,112 934,112 C964,112 968,40 1010,40 L1190,40 C1226,40 1230,78 1254,78 C1278,78 1282,40 1320,40 L1440,40 L1440,0 L0,0 Z" />
        </svg>
        <span className="drip__drop" />
      </div>
      <div className="container story__intro">
        <Reveal as="h2" className="story__title">
          Bal, acele etmeyenlerin işi.
        </Reveal>
        <div className="story__body">
          <Reveal as="p" delay={120}>
            BayBal, Erzincan’da otuz yılı aşkın süredir arıcılık yapan bir ailenin işi. Kovanlarımız yaylada, arılarımız
            bizim. Hasat zamanını aceleye getirmiyor, balı kendi doğal hâliyle kavanoza koyuyoruz.
          </Reveal>
          <Reveal as="p" delay={220}>
            Arıcılığın yanında bahçemizden ve bölgemizden gelen pekmez, kurutulmuş meyve, ceviz ve tulum peyniri de
            hazırlıyoruz. Hepsi %100 doğal, hepsi el yapımı ve hiçbirinde katkı maddesi yok.
          </Reveal>
        </div>
      </div>

      <ul className="container comb" aria-label="Neden BayBal">
        {FACTS.map((f, i) => (
          <Reveal as="li" className="comb__cell" key={f.title} delay={i * 110}>
            <Hex />
            <div className="comb__content">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="container process">
        <Reveal as="h2" className="process__title">
          Kovandan kavanoza
        </Reveal>
        <ol className="process__steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" className="process__step" key={s.title} delay={i * 140}>
              <span className="process__num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
