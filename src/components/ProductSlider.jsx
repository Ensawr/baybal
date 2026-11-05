import { useCallback, useEffect, useRef, useState } from 'react';
import products from '../data/products';
import Reveal from './Reveal';
import WhatsAppButton from './WhatsAppButton';
import './ProductSlider.css';

const AUTOPLAY_MS = 5000;

function Placeholder({ name }) {
  return (
    <div className="slide__placeholder">
      <svg viewBox="0 0 100 88" aria-hidden="true">
        <path d="M25 2 H75 L98 44 L75 86 H25 L2 44 Z" />
      </svg>
      <span>{name}</span>
      <small>Fotoğraf yakında</small>
    </div>
  );
}

export default function ProductSlider() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const moved = useRef(false);
  const downIndex = useRef(null);
  const count = products.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Otomatik ilerleme: üzerine gelindiğinde, sürüklenirken ya da hareket azaltma açıkken durur
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || startX.current !== null) return undefined;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  const onPointerDown = (e) => {
    startX.current = e.clientX;
    moved.current = false;
    const slide = e.target.closest('[data-index]');
    downIndex.current = slide ? Number(slide.dataset.index) : null;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) moved.current = true;
    setDrag(dx);
  };

  const endDrag = () => {
    if (startX.current === null) return;
    if (drag < -60) next();
    else if (drag > 60) prev();
    else if (!moved.current && downIndex.current !== null) go(downIndex.current);
    startX.current = null;
    setDrag(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const active = products[index];

  return (
    <section className="showcase" id="urunler">
      <div className="container showcase__head">
        <Reveal as="h2" className="showcase__title">
          Baldan fazlası
        </Reveal>
        <Reveal as="p" className="showcase__lead" delay={120}>
          Arıcılığın yanında bahçemizden ve bölgemizden gelenleri de aynı özenle hazırlıyoruz. Hepsi %100 doğal, el
          yapımı ve katkı maddesiz.
        </Reveal>
      </div>

      <div
        className={`slider ${startX.current !== null ? 'is-dragging' : ''}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Doğal ürünlerimiz"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="slider__track"
          style={{ '--i': index, '--drag': `${drag}px` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {products.map((p, i) => {
            const offset = i - index;
            return (
              <article
                key={p.id}
                className={`slide ${i === index ? 'is-active' : ''}`}
                style={{ '--offset': offset }}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${count}: ${p.name}`}
                aria-hidden={i !== index}
                data-index={i}
              >
                <div className="slide__media">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`BayBal ${p.name}, Erzincan'dan katkısız doğal ürün`}
                      draggable="false"
                      loading="lazy"
                    />
                  ) : (
                    <Placeholder name={p.name} />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container showcase__foot">
        <div className="showcase__info" key={active.id} aria-live="polite">
          <span className="showcase__kind">{active.kind}</span>
          <h3 className="showcase__name">{active.name}</h3>
          <p className="showcase__text">{active.text}</p>
          <WhatsAppButton product={active.id} className="showcase__cta">
            Bu üründen sipariş verin
          </WhatsAppButton>
        </div>

        <div className="showcase__controls">
          <span className="showcase__count">
            {String(index + 1).padStart(2, '0')}
            <span> / {String(count).padStart(2, '0')}</span>
          </span>
          <div className="showcase__progress" aria-hidden="true">
            <span
              key={`${index}-${paused}`}
              className={paused ? 'is-paused' : ''}
              style={{ '--dur': `${AUTOPLAY_MS}ms` }}
            />
          </div>
          <button type="button" className="slider__btn" onClick={prev} aria-label="Önceki ürün">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="slider__btn" onClick={next} aria-label="Sonraki ürün">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
