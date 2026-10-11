const words = [
  'Weddings',
  'Pre-wedding',
  'Engagements',
  'Candid moments',
  'Bridal portraits',
  'Maternity',
  'Kids',
  'Albums',
  'Photo frames',
  'Films',
  'Drone',
];

function Diamond() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M7 0l7 7-7 7-7-7z" fill="currentColor" />
    </svg>
  );
}

export default function Marquee() {
  const row = (suffix) =>
    words.map((w) => (
      <span className="marquee__item" key={`${w}-${suffix}`}>
        {w}
        <Diamond />
      </span>
    ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}
