import { useRef, useState } from 'react';
import Heading from './Heading.jsx';
import Icon from './Icon.jsx';

const films = [
  {
    id: 'blessings',
    title: 'Blessings and Invitations',
    text: 'Where every wedding begins: the first prayer, the printed card and the first nervous smile.',
    src: '/videos/film-blessings.mp4',
    poster: '/videos/film-blessings.jpg',
    length: '0:44',
  },
  {
    id: 'morning',
    title: 'The Groom\u2019s Morning',
    text: 'Sherwani, safa and the quiet hour before the baraat arrives.',
    src: '/videos/film-morning.mp4',
    poster: '/videos/film-morning.jpg',
    length: '0:58',
  },
];

const fmt = (t) => {
  if (!Number.isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export default function Films() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const autoPlayNext = useRef(false);

  const film = films[current];

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const choose = (i) => {
    autoPlayNext.current = true; // the new video starts by itself, with sound
    if (i === current) {
      toggle();
    } else {
      setTime(0);
      setDuration(0);
      setPlaying(false);
      setCurrent(i);
    }
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    v.currentTime = (Number(e.target.value) / 1000) * duration;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };

  return (
    <section className="section section--ink films" id="films">
      <div className="container">
        <Heading lines={['Stories that move,', 'and sound as good.']} />
        <p className="section__lead">
          Press play and turn the sound on. Every film is cut to the rhythm of its music, the way a
          wedding is remembered.
        </p>

        <div className="films__layout">
          <div className="player" ref={wrapRef}>
            <video
              key={film.id}
              ref={videoRef}
              className="player__video"
              src={film.src}
              poster={film.poster}
              playsInline
              preload="metadata"
              autoPlay={autoPlayNext.current}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => {
                e.currentTarget.muted = muted;
                setDuration(e.currentTarget.duration);
              }}
              onClick={toggle}
            />

            {!playing && (
              <button type="button" className="player__big" onClick={() => { autoPlayNext.current = true; toggle(); }} aria-label={`Play ${film.title}`}>
                <Icon name="play" size={34} />
              </button>
            )}

            <div className="player__bar">
              <button type="button" className="player__btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                <Icon name={playing ? 'pause' : 'play'} size={18} />
              </button>
              <span className="player__time">{fmt(time)}</span>
              <input
                className="player__seek"
                type="range"
                min="0"
                max="1000"
                value={duration ? Math.round((time / duration) * 1000) : 0}
                onChange={seek}
                aria-label="Seek"
                style={{ '--p': `${duration ? (time / duration) * 100 : 0}%` }}
              />
              <span className="player__time">{duration ? fmt(duration) : film.length}</span>
              <button type="button" className="player__btn" onClick={toggleMute} aria-label={muted ? 'Turn sound on' : 'Mute'}>
                <Icon name={muted ? 'mute' : 'volume'} size={18} />
              </button>
              <button type="button" className="player__btn" onClick={fullscreen} aria-label="Full screen">
                <Icon name="fullscreen" size={18} />
              </button>
            </div>
          </div>

          <ul className="playlist">
            {films.map((f, i) => (
              <li key={f.id}>
                <button
                  type="button"
                  className={`reel ${i === current ? 'is-current' : ''}`}
                  onClick={() => choose(i)}
                  aria-label={`${i === current && playing ? 'Pause' : 'Play'} ${f.title}`}
                >
                  <span className="reel__thumb">
                    <img src={f.poster} alt="" loading="lazy" />
                    <span className="reel__icon">
                      <Icon name={i === current && playing ? 'pause' : 'play'} size={16} />
                    </span>
                  </span>
                  <span className="reel__text">
                    <span className="reel__title">{f.title}</span>
                    <span className="reel__desc">{f.text}</span>
                    <span className="reel__len">{i === current && playing ? 'Now playing' : f.length}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
