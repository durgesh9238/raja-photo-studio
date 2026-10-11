import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Heading from './Heading.jsx';
import { reviews } from '../data/reviews.js';

export default function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % reviews.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const r = reviews[i];

  return (
    <section
      className="section section--maroon reviews"
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <Heading lines={['Kind words from', 'the families we know.']} />

        <div className="reviews__stage" aria-live="polite">
          <span className="reviews__mark" aria-hidden="true">&ldquo;</span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>{r.quote}</p>
              <footer>
                <strong>{r.name}</strong>
                <span>{r.event}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="dots" role="tablist" aria-label="Choose a review">
          {reviews.map((rv, n) => (
            <button
              key={rv.name}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`Review from ${rv.name}`}
              className={`dot ${n === i ? 'is-on' : ''}`}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
