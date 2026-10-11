import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Heading from './Heading.jsx';

const services = [
  {
    name: 'Weddings',
    text: 'From the first haldi laugh to the last vidaai, every ritual and every glance, told in order.',
    img: '/images/p09.jpg',
    alt: 'Smiling bride in red and gold',
  },
  {
    name: 'Pre-wedding',
    text: 'Unhurried, cinematic shoots in places that feel like the two of you.',
    img: '/images/p14.jpg',
    alt: 'Couple sharing a red rose',
  },
  {
    name: 'Engagements',
    text: 'The rings, the nerves and the quiet yes, kept safe for good.',
    img: '/images/p13.jpg',
    alt: 'Couple exchanging rings',
  },
  {
    name: 'Candid moments',
    text: 'No stiff poses. Only real smiles, caught in the middle of a laugh.',
    img: '/images/p11.jpg',
    alt: 'Couple showing henna hands',
  },
  {
    name: 'Bridal portraits',
    text: 'Light, jewellery and colour, composed with the care of a painting.',
    img: '/images/p07.jpg',
    alt: 'Bridal portrait against a magenta backdrop',
  },
  {
    name: 'Maternity and kids',
    text: 'Soft, tender frames for the smallest beginnings and the biggest love.',
    img: '/images/p16.jpg',
    alt: 'Portrait beneath a red veil',
  },
  {
    name: 'Product and commercial',
    text: 'Clean, sharp images that help a brand look as good as it works.',
    img: '/images/p10.jpg',
    alt: 'Editorial portrait in warm red light',
  },
  {
    name: 'Films and drone',
    text: 'Highlight films and aerial coverage, edited to the right song.',
    img: '/videos/hero-poster.jpg',
    alt: 'Still from a wedding film',
  },
  {
    name: 'Albums and frames',
    text: 'Hand-finished albums, frames and calendars you can hold for a lifetime.',
    img: '/images/p03.jpg',
    alt: 'Bride framed by pink fabric',
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="section section--maroon services" id="services">
      <div className="container">
        <Heading lines={['Everything a', 'story needs.']} />

        <div className="services__layout">
          <ul className="services__list">
            {services.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  className={`svc ${active === i ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                >
                  <span className="svc__name">{s.name}</span>
                  <span className="svc__plus" aria-hidden="true" />
                  <span className="svc__body">
                    <span className="svc__inner">
                      <span className="svc__text">{s.text}</span>
                      <img className="svc__inline" src={s.img} alt={s.alt} loading="lazy" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="services__panel" aria-hidden="true">
            <AnimatePresence mode="sync">
              <motion.img
                key={services[active].img}
                src={services[active].img}
                alt=""
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
