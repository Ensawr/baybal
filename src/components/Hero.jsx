import { useEffect, useLayoutEffect, useRef } from 'react';
import heroImg from '../assets/hero.jpg';
import { Link } from '../router';
import WhatsAppButton from './WhatsAppButton';
import './Hero.css';

const WORD = 'BayBal';
const BADGE = "Erzincan'dan, 30 yılı aşkın emekle ✦ Katkısız ve doğal ✦ ";

export default function Hero() {
  const frameRef = useRef(null);
  const wordRef = useRef(null);

  // "BayBal" yazısı hangi yazı tipi yüklenirse yüklensin bulunduğu alana sığsın
  useLayoutEffect(() => {
    const word = wordRef.current;
    if (!word) return undefined;
    const fit = () => {
      word.style.fontSize = '';
      const avail = word.clientWidth;
      const needed = word.scrollWidth;
      if (avail > 0 && needed > avail) {
        const current = parseFloat(window.getComputedStyle(word).fontSize);
        word.style.fontSize = `${Math.floor((current * avail * 0.97) / needed)}px`;
      }
    };
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(word);
    return () => ro && ro.disconnect();
  }, []);

  // Görsele hafif bir derinlik (parallax) etkisi
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        if (frameRef.current) frameRef.current.style.setProperty('--parallax', `${y * 0.12}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__copy">
          <h1 className="hero__heading">
            <span className="hero__word" ref={wordRef}>
              {WORD.split('').map((ch, i) => (
                <span className="hero__letter" key={i} style={{ '--i': i }}>
                  <span>{ch}</span>
                </span>
              ))}
            </span>{' '}
            <span className="hero__lead">Erzincan’ın yaylalarından katkısız, doğal bal.</span>
          </h1>
          <p className="hero__text">
            Otuz yılı aşkın süredir Erzincan’da arıcılık yapıyoruz. Süzme çiçek balını, karakovan ve petek balı kendi
            arılarımızdan alıyor, içine hiçbir şey katmadan kavanoza koyuyoruz.
          </p>

          <div className="hero__actions">
            <WhatsAppButton />
            <Link className="btn btn--ghost" to="/#ballar">
              Bal listemiz
            </Link>
          </div>

          <ul className="hero__delivery">
            <li>İstanbul’un belirli bölgelerine elden teslim</li>
            <li>Türkiye'nin her yerine kargo</li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__frame" ref={frameRef}>
            <img
              src={heroImg}
              width="900"
              height="1600"
              fetchPriority="high"
              alt="BayBal etiketli cam kapta Erzincan petek balı ve yanında ballı çay"
            />
          </div>

          <div className="hero__badge" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#badge-circle">{BADGE}</textPath>
              </text>
            </svg>
            <span className="hero__badge-core">%100<br />doğal</span>
          </div>
        </div>
      </div>

      <Link className="hero__scroll" to="/#aricilik" aria-label="Aşağı kaydır">
        <span />
      </Link>

    </section>
  );
}
