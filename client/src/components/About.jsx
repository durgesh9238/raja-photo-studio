import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Heading from './Heading.jsx';
import Counter from './Counter.jsx';
import { site } from '../data/site.js';

// Sample numbers for the demo. Edit them to match the studio.
const stats = [
  { to: site.years, suffix: '+', label: 'Years of stories' },
  { to: 500, suffix: '+', label: 'Weddings covered' },
  { to: 800, suffix: '+', label: 'Albums delivered' },
];

export default function About() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bigY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -50, reduce ? 0 : 50]);
  const smallY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -70]);

  return (
    <section className="section section--ivory about" id="about" ref={ref}>
      <div className="container about__grid">
        <div className="about__media">
          <div className="about__arch about__arch--big">
            <motion.img
              src="/images/p09.jpg"
              alt="Bride with a wide, joyful smile in a red and gold lehenga"
              loading="lazy"
              style={{ y: bigY, scale: 1.18 }}
            />
          </div>
          <div className="about__arch about__arch--small">
            <motion.img
              src="/images/p14.jpg"
              alt="Couple sharing a red rose"
              loading="lazy"
              style={{ y: smallY, scale: 1.25 }}
            />
          </div>
        </div>

        <div className="about__text">
          <Heading lines={['We keep the feeling,', 'not just the frame.']} />
          <p>
            For {site.years} years, {site.name} in {site.place} has stood a little to the side of life&apos;s
            biggest days. We have been there for the nervous laugh before the pheras, the hand that reaches
            for another hand, and the tear nobody planned.
          </p>
          <p>
            We do not stage those moments. We wait for them, and when they arrive, we are ready. Then we
            carry them all the way home: in sharp photographs, in films cut to the right song, in albums
            and frames you can hold.
          </p>

          <dl className="stats">
            {stats.map((s) => (
              <div className="stats__item" key={s.label}>
                <dt>
                  <Counter to={s.to} suffix={s.suffix} />
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
