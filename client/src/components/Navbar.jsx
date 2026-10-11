import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import { navLinks } from '../data/site.js';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <header className={`nav ${solid || !onHome ? 'is-solid' : ''}`}>
      <div className="nav__inner">
        <Logo onClick={() => setOpen(false)} />

        <nav className="nav__links" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.id} href={`/#${l.id}`} onClick={goTo(l.id)}>
              {l.label}
            </a>
          ))}
          <Link to="/blog">Blog</Link>
        </nav>

        <div className="nav__actions">
          <a className="btn btn--gold nav__cta" href="/#contact" onClick={goTo('contact')}>
            Book now
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile">
              {[...navLinks, { id: 'blog', label: 'Blog' }].map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5 }}
                >
                  {l.id === 'blog' ? (
                    <Link to="/blog" onClick={() => setOpen(false)}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={`/#${l.id}`} onClick={goTo(l.id)}>
                      {l.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
