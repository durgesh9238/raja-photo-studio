import { useState } from 'react';
import { motion } from 'framer-motion';
import Heading from './Heading.jsx';
import Icon from './Icon.jsx';

// Each spread = [left page, right page]
const spreads = [
  ['/images/p07.jpg', '/images/p14.jpg'],
  ['/images/p01.jpg', '/images/p11.jpg'],
  ['/images/p09.jpg', '/images/p13.jpg'],
  ['/images/p05.jpg', '/images/p10.jpg'],
];

const offers = [
  { name: 'Premium wedding album', text: 'Layflat pages, hand-finished covers in fabric, leather or wood.' },
  { name: 'Mini albums', text: 'Pocket-sized copies, made for parents and grandparents.' },
  { name: 'Photo frames', text: 'Gold, wooden and acrylic frames in every size, ready to hang.' },
  { name: 'Calendars and keepsakes', text: 'Table calendars, canvas prints and gift boxes from your own photos.' },
];

const frames = [
  { src: '/images/p07.jpg', alt: 'Framed bridal portrait', cls: 'frame--tall' },
  { src: '/images/p13.jpg', alt: 'Framed engagement photograph', cls: 'frame--mid' },
  { src: '/images/p01.jpg', alt: 'Framed bride under a pink veil', cls: 'frame--arch' },
];

const flipEase = [0.65, 0, 0.35, 1];

export default function Albums() {
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(null); // null | 'next' | 'prev'

  const last = spreads.length - 1;
  const canNext = idx < last;
  const canPrev = idx > 0;

  const left = flip === 'prev' ? spreads[idx - 1][0] : spreads[idx][0];
  const right = flip === 'next' ? spreads[idx + 1][1] : spreads[idx][1];

  const finish = () => {
    setIdx((i) => (flip === 'next' ? i + 1 : i - 1));
    setFlip(null);
  };

  return (
    <section className="section section--ivory albums" id="albums">
      <div className="container">
        <div className="albums__grid">
          <div className="albums__book">
            <div className="album" aria-label="Wedding album preview">
              <div className="album__spread">
                <div className="album__page album__page--left">
                  <img src={left} alt="" />
                </div>
                <div className="album__page album__page--right">
                  <img src={right} alt="" />
                </div>
                <span className="album__spine" aria-hidden="true" />

                {flip === 'next' && (
                  <motion.div
                    className="album__flip album__flip--next"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -180 }}
                    transition={{ duration: 1, ease: flipEase }}
                    onAnimationComplete={finish}
                  >
                    <div className="album__face">
                      <img src={spreads[idx][1]} alt="" />
                    </div>
                    <div className="album__face album__face--back">
                      <img src={spreads[idx + 1][0]} alt="" />
                    </div>
                  </motion.div>
                )}
                {flip === 'prev' && (
                  <motion.div
                    className="album__flip album__flip--prev"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 180 }}
                    transition={{ duration: 1, ease: flipEase }}
                    onAnimationComplete={finish}
                  >
                    <div className="album__face">
                      <img src={spreads[idx][0]} alt="" />
                    </div>
                    <div className="album__face album__face--back">
                      <img src={spreads[idx - 1][1]} alt="" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="album__controls">
              <button
                type="button"
                className="round"
                aria-label="Previous page"
                disabled={!canPrev || flip !== null}
                onClick={() => setFlip('prev')}
              >
                <Icon name="left" size={20} />
              </button>
              <span className="album__count">
                Spread {idx + 1} of {spreads.length}
              </span>
              <button
                type="button"
                className="round"
                aria-label="Next page"
                disabled={!canNext || flip !== null}
                onClick={() => setFlip('next')}
              >
                <Icon name="right" size={20} />
              </button>
            </div>
          </div>

          <div className="albums__text">
            <Heading lines={['Made to be', 'held, not scrolled.']} />
            <p>
              A photograph on a phone is seen once. A photograph in an album is kept for a lifetime. We
              design every album with the family, so the story reads the way it was lived.
            </p>
            <ul className="offers">
              {offers.map((o) => (
                <li key={o.name}>
                  <strong>{o.name}</strong>
                  <span>{o.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="frames" aria-label="Photo frame examples">
          {frames.map((f) => (
            <motion.figure
              key={f.src}
              className={`frame ${f.cls}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="frame__mat">
                <img src={f.src} alt={f.alt} loading="lazy" />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
