import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { site } from '../data/site.js';

const WORD = 'Raja'.split('');

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18]);

  // Browsers only autoplay a video that is muted, so make sure it is.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (reduce) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, [reduce]);

  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__media" style={{ scale: videoScale }}>
        <video
          ref={videoRef}
          className="hero__video"
          src="/videos/hero.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </motion.div>
      <div className="hero__shade" />

      <motion.div className="hero__content container" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.h1
          className="hero__word"
          aria-label={`${site.name}, ${site.place}`}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.3 }}
        >
          {WORD.map((ch, i) => (
            <span className="hero__mask" key={i} aria-hidden="true">
              <motion.span
                className="hero__letter"
                variants={{
                  hidden: reduce ? { opacity: 0 } : { y: '115%' },
                  show: reduce
                    ? { opacity: 1 }
                    : { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="hero__studio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          Photo Studio, {site.place}
        </motion.p>

        <motion.div
          className="hero__lower"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero__tagline">{site.tagline}</p>
          <p className="hero__text">
            {site.years} years of weddings, portraits and quiet moments, kept exactly the way they felt.
          </p>
          <div className="hero__buttons">
            <a className="btn btn--gold" href="#contact" onClick={go('contact')}>
              Book your date
            </a>
            <a className="btn btn--ghost" href="#films" onClick={go('films')}>
              Watch our films
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
