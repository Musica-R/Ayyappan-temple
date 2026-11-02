import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  FaPlay, FaTimes, FaChevronLeft, FaChevronRight,
  FaPrayingHands, FaFire, FaMonument, FaHandsHelping,
} from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import SmartImg from '../components/SmartImg.jsx';
import { useLang } from '../utils/LanguageContext.jsx';
import { GALLERY } from '../data/images.js';
import '../stylesheet/gallery.css';

// Put your video files in public/assets/ and list them here
const VIDEOS = [
  '/assets/video1.mp4',
  '/assets/video2.mp4',
  '/assets/video3.mp4',
  '/assets/video4.mp4',
];

const STEP = 12; // photos shown first, and added per "load more"
const MOMENT_ICONS = [FaPrayingHands, FaFire, FaMonument, FaHandsHelping];

// Size pattern for the mosaic layout (repeats every 9 photos)
const sizeOf = (k) => {
  const n = k % 9;
  if (n === 0) return 'is-big';
  if (n === 4) return 'is-tall';
  if (n === 6) return 'is-wide';
  return '';
};

const pad = (n) => String(n + 1).padStart(2, '0');

export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery;

  const [mode, setMode] = useState('mosaic');
  const [count, setCount] = useState(STEP);
  const [active, setActive] = useState(null); // index of the video in the popup
  const playerRef = useRef(null);
  const openY = useRef(0);

  const shown = GALLERY.slice(0, count);
  const hasMore = count < GALLERY.length;
  const titles = g.videoTitles || [];
  const vTitle = (k) => titles[k] || `${g.videosTitle ?? 'Temple Video'} ${k + 1}`;

  const close = useCallback(() => {
    if (playerRef.current) playerRef.current.pause();
    setActive(null);
  }, []);

  const step = useCallback((d) => {
    if (playerRef.current) playerRef.current.pause();
    setActive((a) => (a === null ? a : (a + d + VIDEOS.length) % VIDEOS.length));
  }, []);

  // While the popup is open: lock page scroll, keyboard control,
  // stop the video if the tab is hidden or the page is scrolled away
  useEffect(() => {
    if (active === null) return undefined;

    openY.current = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - openY.current) > 60) close();
    };
    const onHide = () => {
      if (document.hidden && playerRef.current) playerRef.current.pause();
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onHide);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, [active, close, step]);

  // Restore page scroll when leaving the page
  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  const moments = g.moments || [
    { t: 'Daily Poojas', d: 'Morning and evening prayers that keep the shrine alive.' },
    { t: 'Festival Lamps', d: 'Rows of vilakku glowing across the temple grounds.' },
    { t: 'Village Shrine', d: 'The quiet beauty of a Kerala village temple.' },
    { t: 'Renovation Seva', d: 'Devotees coming together to rebuild the shrine.' },
  ];

  // Popup player, rendered into <body> so it always sits above the sticky header
  const modal = active !== null && (
    <div
      className="gal-modal"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <button type="button" className="gal-modal-close" aria-label={g.close ?? 'Close'} onClick={close}>
        <FaTimes />
      </button>

      <button
        type="button"
        className="gal-modal-nav prev"
        aria-label={g.prev ?? 'Previous'}
        onClick={(e) => { e.stopPropagation(); step(-1); }}
      >
        <FaChevronLeft />
      </button>

      <div className="gal-modal-box" onClick={(e) => e.stopPropagation()}>
        <video
          key={active}
          ref={playerRef}
          src={VIDEOS[active]}
          controls
          autoPlay
          playsInline
          controlsList="nodownload"
        />
        <div className="gal-modal-cap">
          <span>{pad(active)} / {String(VIDEOS.length).padStart(2, '0')}</span>
          <b>{vTitle(active)}</b>
        </div>
      </div>

      <button
        type="button"
        className="gal-modal-nav next"
        aria-label={g.next ?? 'Next'}
        onClick={(e) => { e.stopPropagation(); step(1); }}
      >
        <FaChevronRight />
      </button>
    </div>
  );

  return (
    <>
      {/* Page hero (unchanged) */}
      <section className="page-hero">
        <Reveal>
          <h1>{g.title}</h1>
          <p>{g.sub}</p>
        </Reveal>
      </section>

      {/* Intro + tiger image */}
      <section className="section gal-intro">
        <div className="container gal-intro-grid">
          <Reveal>
            <div className="gal-intro-text">
              <span className="gal-eyebrow">{g.introEyebrow ?? 'Our Gallery'}</span>
              <h2>{g.introTitle ?? 'Glimpses of a Sacred Abode'}</h2>
              <p>
                {g.introText ??
                  'Browse photographs and videos from Ayyappankadu: daily poojas, festival lamps, the quiet village shrine and the devotion of the community working to restore it.'}
              </p>
              <p className="gal-intro-quote">{t.quote}</p>
            </div>
          </Reveal>

          <Reveal index={1} className="gal-intro-img">
            <div className="gal-tiger">
              <img src="/assets/tiger.png" alt="Tiger" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Moments */}
      <section className="section gal-moments-section">
        <div className="container">
          <Reveal>
            <div className="gal-head">
              <span className="gal-eyebrow">{g.momentsEyebrow ?? 'What You Will See'}</span>
              <h2>{g.momentsTitle ?? 'Moments We Treasure'}</h2>
              <span className="gal-divider"><i /></span>
            </div>
          </Reveal>

          <div className="gal-moments">
            {moments.map((m, k) => {
              const Icon = MOMENT_ICONS[k % MOMENT_ICONS.length];
              return (
                <Reveal key={k} index={k} className="gal-moment">
                  <div className="gal-moment-card">
                    <span className="gal-moment-ico"><Icon /></span>
                    <h3>{m.t}</h3>
                    <p>{m.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo gallery (static: no click, no popup) */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="gal-bar">
              <div className="gal-bar-left">
                <span className="gal-eyebrow">{g.eyebrow}</span>
                <span className="gal-count">
                  <b>{GALLERY.length}</b> {g.photos}
                </span>
              </div>

              <div className="gal-toggle" role="tablist">
                <button
                  type="button"
                  className={mode === 'mosaic' ? 'on' : ''}
                  onClick={() => setMode('mosaic')}
                >
                  {g.mosaic}
                </button>
                <button
                  type="button"
                  className={mode === 'grid' ? 'on' : ''}
                  onClick={() => setMode('grid')}
                >
                  {g.grid}
                </button>
              </div>
            </div>
          </Reveal>

          <div className={`gal-board ${mode}`}>
            {shown.map((src, k) => (
              <Reveal
                key={k}
                index={k % 4}
                className={`gal-tile ${mode === 'mosaic' ? sizeOf(k) : ''}`}
              >
                <figure className="gal-frame">
                  <SmartImg src={src} alt={`gallery ${k + 1}`} />
                  <span className="gal-shade" />
                  <span className="gal-num">{pad(k)}</span>
                </figure>
              </Reveal>
            ))}
          </div>

          {hasMore && (
            <div className="gal-more">
              <button type="button" onClick={() => setCount((c) => c + STEP)}>
                {g.loadMore}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video section: 2 per row, click a card to open the popup player */}
      <section className="section gal-video-section">
        <div className="container">
          <Reveal>
            <div className="gal-head">
              <span className="gal-eyebrow">{g.videosEyebrow ?? 'Watch'}</span>
              <h2>{g.videosTitle ?? 'Temple Videos'}</h2>
              <p>{g.videosSub ?? 'Tap a video to watch it in full screen.'}</p>
              <span className="gal-divider"><i /></span>
            </div>
          </Reveal>

          <div className="gal-video-grid">
            {VIDEOS.map((v, k) => (
              <Reveal key={k} index={k % 2} className="gal-video-item">
                <button
                  type="button"
                  className="gal-video-card"
                  onClick={() => setActive(k)}
                  aria-label={`${g.play ?? 'Play video'}: ${vTitle(k)}`}
                >
                  {/* thumbnail only: never plays inline */}
                  <video src={`${v}#t=0.5`} preload="metadata" muted playsInline tabIndex={-1} />
                  <span className="gal-video-shade" />
                  <span className="gal-video-tag">{pad(k)}</span>
                  <span className="gal-video-play"><FaPlay /></span>
                  <span className="gal-video-title">{vTitle(k)}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="section gal-cta-section">
        <div className="container">
          <Reveal>
            <div className="gal-cta">
              <h2>{g.ctaTitle ?? 'Be a Part of Our Story'}</h2>
              <p>
                {g.ctaText ??
                  'Visit the temple, join the festivals and help bring the shrine back to life.'}
              </p>
              <div className="gal-cta-btns">
                <Link to="/renovation" className="gal-cta-btn solid">
                  {g.ctaBtn1 ?? 'Support Renovation'}
                </Link>
                <Link to="/contact" className="gal-cta-btn line">
                  {g.ctaBtn2 ?? 'Contact the Samithi'}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Popup video player (portal to <body>) */}
      {modal && createPortal(modal, document.body)}
    </>
  );
}