import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Heading from './Heading.jsx';
import Icon from './Icon.jsx';
import { postJSON } from '../lib/api.js';
import { eventTypes } from '../data/site.js';

const moods = [
  { value: 1, emoji: '\u{1F61E}', label: 'We missed the mark' },
  { value: 2, emoji: '\u{1F610}', label: 'It was okay' },
  { value: 3, emoji: '\u{1F642}', label: 'Good work' },
  { value: 4, emoji: '\u{1F60D}', label: 'We loved it' },
  { value: 5, emoji: '\u{1F929}', label: 'Absolutely magical' },
];

const tags = ['Photos', 'Video and film', 'Team behaviour', 'Delivery time', 'Album quality', 'Value for money'];

const empty = { name: '', eventType: '', message: '', allowPublic: true, website: '' };

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [picked, setPicked] = useState([]);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const shown = hover || rating;
  const mood = moods.find((m) => m.value === shown);

  const toggleTag = (t) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const submit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setError('Please tap a face to rate your experience.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      await postJSON('/api/feedback', { ...form, rating, tags: picked });
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const reset = () => {
    setRating(0);
    setPicked([]);
    setForm(empty);
    setStatus('idle');
  };

  return (
    <section className="section feedback" id="feedback">
      <div className="feedback__bg" aria-hidden="true">
        <img src="/images/p06.jpg" alt="" loading="lazy" />
      </div>

      <div className="container feedback__wrap">
        <Heading lines={['How did we do?']} />
        <p className="section__lead">
          Your honest words help us grow, and they help the next family decide. It takes less than a minute.
        </p>

        <div className="fb">
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div
                key="done"
                className="fb__done"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="form__tick"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <Icon name="check" size={32} />
                </motion.span>
                <h3>
                  Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
                </h3>
                <p>Your feedback means the world to us. We are grateful you let us be part of your story.</p>
                <button type="button" className="btn btn--ghost" onClick={reset}>
                  Share another thought
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }}>
                <fieldset className="fb__moods">
                  <legend>Tap a face to rate your experience</legend>
                  <div className="fb__faces">
                    {moods.map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        className={`face ${rating === m.value ? 'is-on' : ''}`}
                        aria-pressed={rating === m.value}
                        aria-label={`${m.value} out of 5. ${m.label}`}
                        onMouseEnter={() => setHover(m.value)}
                        onMouseLeave={() => setHover(0)}
                        onFocus={() => setHover(m.value)}
                        onBlur={() => setHover(0)}
                        onClick={() => setRating(m.value)}
                      >
                        <span>{m.emoji}</span>
                      </button>
                    ))}
                  </div>
                  <p className="fb__mood" aria-live="polite">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={mood ? mood.value : 0}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {mood ? mood.label : 'How was it?'}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </fieldset>

                <fieldset className="fb__tags">
                  <legend>What stood out? (optional)</legend>
                  <div>
                    {tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`chip chip--light ${picked.includes(t) ? 'is-on' : ''}`}
                        aria-pressed={picked.includes(t)}
                        onClick={() => toggleTag(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="field__row">
                  <div className="field field--dark">
                    <label htmlFor="f-name">Your name</label>
                    <input
                      id="f-name"
                      required
                      minLength={2}
                      maxLength={80}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      autoComplete="name"
                    />
                  </div>
                  <div className="field field--dark">
                    <label htmlFor="f-event">Which event? (optional)</label>
                    <select
                      id="f-event"
                      value={form.eventType}
                      onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    >
                      <option value="">Choose one</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field field--dark">
                  <label htmlFor="f-msg">Tell us more</label>
                  <textarea
                    id="f-msg"
                    rows={4}
                    maxLength={600}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What did you love? What could we do better?"
                  />
                  <span className="field__count">{form.message.length} / 600</span>
                </div>

                <div className="hp" aria-hidden="true">
                  <label htmlFor="f-web">Website</label>
                  <input
                    id="f-web"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>

                <label className="check">
                  <input
                    type="checkbox"
                    checked={form.allowPublic}
                    onChange={(e) => setForm({ ...form, allowPublic: e.target.checked })}
                  />
                  <span>You may show my words on your website (with my first name only).</span>
                </label>

                {status === 'error' && (
                  <p className="form__error form__error--dark" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="btn btn--gold fb__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send my feedback'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
