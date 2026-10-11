import { motion, useReducedMotion } from 'framer-motion';

// Section headings rise line by line out of a mask when they scroll into view.
// Pass lines as an array: <Heading lines={['First line', 'Second line']} />
export default function Heading({ lines, as: Tag = 'h2', className = '', lang }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={`heading ${className}`}
      lang={lang}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.12 }}
      aria-label={lines.join(' ')}
    >
      {lines.map((line, i) => (
        <span className="heading__mask" key={i} aria-hidden="true">
          <motion.span
            className="heading__line"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: '110%' },
              show: reduce
                ? { opacity: 1 }
                : { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
