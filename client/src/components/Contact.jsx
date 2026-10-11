import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Heading from './Heading.jsx';
import Icon from './Icon.jsx';
import { postJSON } from '../lib/api.js';
import { eventTypes, packages, site } from '../data/site.js';

const empty = { name: '', phone: '', eventType: '', eventDate: '', packageName: '', message: '', website: '' };

export default function Contact({ selectedPackage }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  // when someone taps "Ask about Saptapadi" in the packages, fill it in here
  useEffect(() => {
    if (selectedPackage) setForm((f) => ({ ...f, packageName: selectedPackage }));
  }, [selectedPackage]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const today = new Date().toISOString().split('T')[0];

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await postJSON('/api/bookings', form);
      setStatus('done');
      setForm(empty);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const waText = encodeURIComponent('Namaste! I would like to know more about Raja Photo Studio.');

  return (
    <section className="section section--ivory contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <Heading lines={['Let us hold', 'your date.']} />
          <p>
            Tell us about your day, and we will call you back to talk it through. No pressure, just a
            friendly conversation.
          </p>

          <ul className="contact__list">
            <li>
              <Icon name="phone" />
              <span>
                <small>Call us</small>
                <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
              </span>
            </li>
            <li>
              <Icon name="whatsapp" />
              <span>
                <small>WhatsApp</small>
                <a href={`https://wa.me/${site.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer">
                  Message us on WhatsApp
                </a>
              </span>
            </li>
            <li>
              <Icon name="mail" />
              <span>
                <small>Email</small>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </li>
            <li>
              <Icon name="pin" />
              <span>
                <small>Visit the studio</small>
                <a href={site.mapsUrl} target="_blank" rel="noreferrer">
                  {site.name}, {site.place}. Open in Google Maps
                </a>
              </span>
            </li>
            <li>
              <Icon name="clock" />
              <span>
                <small>Open every day</small>
                {site.hours}
              </span>
            </li>
            <li>
              <Icon name="instagram" />
              <span>
                <small>Follow our work</small>
                <a href={site.instagram} target="_blank" rel="noreferrer">
                  {site.instagramHandle}
                </a>
              </span>
            </li>
          </ul>
        </div>

        <motion.form
          className="form"
          onSubmit={submit}
          noValidate={false}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === 'done' ? (
            <div className="form__done" role="status">
              <span className="form__tick">
                <Icon name="check" size={30} />
              </span>
              <h3>Thank you. We have your request.</h3>
              <p>We will call you soon to talk about your day. You can also message us on WhatsApp any time.</p>
              <button type="button" className="btn btn--maroon" onClick={() => setStatus('idle')}>
                Send another request
              </button>
            </div>
          ) : (
            <>
              <h3 className="form__title">Book a call</h3>

              <div className="field">
                <label htmlFor="b-name">Your name</label>
                <input id="b-name" name="name" required minLength={2} maxLength={80} value={form.name} onChange={set('name')} autoComplete="name" />
              </div>

              <div className="field">
                <label htmlFor="b-phone">Phone number</label>
                <input
                  id="b-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  pattern="[0-9+\-\s]{8,15}"
                  title="Enter a valid phone number"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                />
              </div>

              <div className="field__row">
                <div className="field">
                  <label htmlFor="b-event">What are we shooting?</label>
                  <select id="b-event" name="eventType" required value={form.eventType} onChange={set('eventType')}>
                    <option value="" disabled>
                      Choose one
                    </option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="b-date">Event date</label>
                  <input id="b-date" name="eventDate" type="date" min={today} value={form.eventDate} onChange={set('eventDate')} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="b-package">Package you like</label>
                <select id="b-package" name="packageName" value={form.packageName} onChange={set('packageName')}>
                  <option value="">Not sure yet</option>
                  {packages.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="b-message">Anything we should know?</label>
                <textarea id="b-message" name="message" rows={4} maxLength={800} value={form.message} onChange={set('message')} />
              </div>

              {/* hidden trap for spam bots; real people never see or fill it */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="b-web">Website</label>
                <input id="b-web" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </div>

              {status === 'error' && (
                <p className="form__error" role="alert">
                  {error}{' '}
                  <a href={`https://wa.me/${site.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer">
                    Message us on WhatsApp instead.
                  </a>
                </p>
              )}

              <button type="submit" className="btn btn--maroon form__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Request a call back'}
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
