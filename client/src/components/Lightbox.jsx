import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon.jsx';

export default function Lightbox({ items, index, onClose, onChange }) {
  const open = index !== null && index >= 0;
  const count = items.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % count);
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, count, onClose, onChange]);

  const item = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button type="button" className="lightbox__btn lightbox__close" aria-label="Close" onClick={onClose}>
            <Icon name="close" size={24} />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + count) % count);
            }}
          >
            <Icon name="left" size={26} />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % count);
            }}
          >
            <Icon name="right" size={26} />
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              className="lightbox__figure"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={item.src} alt={item.alt} />
              <figcaption>
                {item.label}
                <span>
                  {index + 1} / {count}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
