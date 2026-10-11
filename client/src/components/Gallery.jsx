import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Heading from './Heading.jsx';
import Lightbox from './Lightbox.jsx';
import { categories, photos } from '../data/photos.js';

// 3 columns on desktop, 2 on phones
function useColumnCount() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setCols(mq.matches ? 2 : 3);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return cols;
}

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const cols = useColumnCount();

  const items = useMemo(
    () => (filter === 'all' ? photos : photos.filter((p) => p.cat === filter)),
    [filter]
  );

  // deal photos into columns, one by one, like cards
  const columns = useMemo(() => {
    const out = Array.from({ length: cols }, () => []);
    items.forEach((p, i) => out[i % cols].push({ ...p, index: i }));
    return out;
  }, [items, cols]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y0 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ys = [y0, y1, y2];
  const parallax = !reduce && cols === 3;

  const close = useCallback(() => setLightbox(null), []);

  return (
    <section className="section section--dark gallery" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery__head">
          <Heading lines={['Frames we are', 'proud to keep.']} />
          <div className="filters" role="group" aria-label="Filter photos">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`chip ${filter === c.key ? 'is-on' : ''}`}
                aria-pressed={filter === c.key}
                onClick={() => setFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={`${filter}-${cols}`}
          className="wall"
          style={{ '--cols': cols }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {columns.map((col, c) => (
            <motion.div className="wall__col" key={c} style={{ y: parallax ? ys[c] : 0 }}>
              {col.map((p) => (
                <button
                  type="button"
                  className="tile"
                  key={p.id}
                  onClick={() => setLightbox(p.index)}
                  aria-label={`Open photo: ${p.label}`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" />
                  <span className="tile__label">{p.label}</span>
                </button>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox items={items} index={lightbox} onClose={close} onChange={setLightbox} />
    </section>
  );
}
