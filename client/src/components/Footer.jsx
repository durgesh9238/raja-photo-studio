import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import { navLinks, site } from '../data/site.js';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  const goTo = (id) => (e) => {
    e.preventDefault();
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="thanks">
          <motion.h2
            className="thanks__big"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Thank you.
          </motion.h2>
          <p>
            Every frame we make begins with your trust. Thank you for visiting, and for letting us be a
            small part of your story. We would love to meet you, share a cup of tea and listen to how
            you imagine your day.
          </p>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>
              Wedding, pre-wedding, candid and portrait photography, films, albums and frames. Made with
              feeling, for {site.years} years and counting.
            </p>
            <div className="social">
              <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={20} />
              </a>
              <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Icon name="facebook" size={20} />
              </a>
              <a href={site.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <Icon name="youtube" size={20} />
              </a>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <Icon name="whatsapp" size={20} />
              </a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h4>Explore</h4>
            {navLinks.map((l) => (
              <a key={l.id} href={`/#${l.id}`} onClick={goTo(l.id)}>
                {l.label}
              </a>
            ))}
            <Link to="/blog">Blog</Link>
            <a href="/#feedback" onClick={goTo('feedback')}>
              Share feedback
            </a>
          </nav>

          <div className="footer__col">
            <h4>Reach us</h4>
            <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer">
              {site.name}, {site.place}
            </a>
            <span>Open daily, {site.hours}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} {site.name}, {site.place}. All rights reserved.</span>
          <button
            type="button"
            className="totop"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Icon name="up" size={16} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
