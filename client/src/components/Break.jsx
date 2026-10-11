import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const words = 'Years from now, you will not remember the schedule. You will remember how it felt. We make sure you can.'.split(' ');

export default function Break() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -90, reduce ? 0 : 90]);

  return (
    <section className="break" ref={ref} aria-label="Our promise">
      <motion.div className="break__bg" style={{ y }}>
        <img src="/images/p05.jpg" alt="" loading="lazy" />
      </motion.div>
      <div className="break__shade" />

      <motion.p
        className="break__quote"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.07 }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="break__word"
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}
