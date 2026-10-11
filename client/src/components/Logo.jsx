import { Link } from 'react-router-dom';

// Arch ("mehrab") monogram with an R, followed by the studio name.
export function LogoMark({ size = 44 }) {
  return (
    <svg
      className="logo__mark"
      width={size}
      height={size * 1.25}
      viewBox="0 0 48 60"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 58V24C4 11 13 2 24 2s20 9 20 22v34" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 58V25C9.5 14.5 15.8 7.5 24 7.5S38.5 14.5 38.5 25v33" stroke="currentColor" strokeWidth="1" opacity=".5" />
      <text
        x="24"
        y="44"
        textAnchor="middle"
        fontFamily="'Bodoni Moda', Georgia, serif"
        fontStyle="italic"
        fontSize="30"
        fill="currentColor"
      >
        R
      </text>
    </svg>
  );
}

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" aria-label="Raja Photo Studio, Badwara. Home" onClick={onClick}>
      <LogoMark size={34} />
      <span className="logo__text">
        <span className="logo__name">Raja</span>
        <span className="logo__sub">Photo Studio, Badwara</span>
      </span>
    </Link>
  );
}
