import Heading from './Heading.jsx';
import Icon from './Icon.jsx';
import { packages } from '../data/site.js';

export default function Packages({ onChoose }) {
  return (
    <section className="section packages" id="packages">
      <div className="packages__bg" aria-hidden="true">
        <img src="/images/p15.jpg" alt="" loading="lazy" />
      </div>

      <div className="container">
        <Heading lines={['Choose how much of', 'the day you want kept.']} />
        <p className="section__lead">
          Every package is shaped around your family and your dates. Prices below are a starting point.
        </p>

        <div className="pkgs">
          {packages.map((p) => (
            <article className={`pkg ${p.featured ? 'pkg--featured' : ''}`} key={p.name}>
              {p.featured && <span className="pkg__flag">Most booked</span>}
              <h3 className="pkg__name">{p.name}</h3>
              <p className="pkg__note">
                {p.days}. {p.note}
              </p>
              <p className="pkg__price">
                <span>Starting from</span>
                <strong>
                  <small>&#8377;</small>
                  {p.price}
                </strong>
              </p>
              <ul className="pkg__list">
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn ${p.featured ? 'btn--gold' : 'btn--ghost'} pkg__btn`}
                onClick={() => onChoose(p.name)}
              >
                Ask about {p.name}
              </button>
            </article>
          ))}
        </div>

        <p className="packages__foot">
          Final price depends on your dates, city and number of events. Call us for a custom quote.
        </p>
      </div>
    </section>
  );
}
