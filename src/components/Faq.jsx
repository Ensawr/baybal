import { useState } from 'react';
import faq from '../data/faq';
import Reveal from './Reveal';
import JsonLd from './JsonLd';
import './Faq.css';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="sss" aria-labelledby="faq-title">
      <JsonLd data={schema} />
      <div className="container faq__inner">
        <div className="faq__side">
          <Reveal as="h2" id="faq-title" className="faq__title">
            Erzincan balı hakkında merak edilenler
          </Reveal>
          <Reveal as="p" className="faq__lead" delay={120}>
            Ballarımız, fiyatlar ve teslimat hakkında en çok sorulan sorular.
          </Reveal>
        </div>
        <ul className="faq__list">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <li className={`faq__item ${isOpen ? 'is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__answer" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
