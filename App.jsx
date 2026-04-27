import { useEffect, useMemo, useRef, useState } from 'react';
import { weddingData } from './src/weddingData';

const safeArray = (value) => (Array.isArray(value) ? value : []);

function StarOrnament({ className = '' }) {
  return (
    <div className={`ornament ${className}`}>
      <div className="ornament-line rev" />
      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
      <div className="ornament-line" />
    </div>
  );
}

function usePetals(active) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let rafId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const colors = ['#D4806A', '#E8C07A', '#C9963E', '#B85940', '#EEDDD3', '#F5E4C0'];
    const count = window.innerWidth < 600 ? 28 : 52;

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height * 2 - canvas.height : -20;
        this.r = 4 + Math.random() * 5;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = 0.6 + Math.random() * 1.2;
        this.rot = Math.random() * Math.PI * 2;
        this.drot = (Math.random() - 0.5) * 0.04;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0.5 + Math.random() * 0.4;
      }

      update() {
        this.x += this.vx + Math.sin(this.y * 0.01) * 0.4;
        this.y += this.vy;
        this.rot += this.drot;

        if (this.y > canvas.height + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.r * 0.55, this.r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = Array.from({ length: count }, () => new Petal());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((petal) => {
        petal.update();
        petal.draw();
      });
      rafId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return {
    canvasRef,
    className: active ? 'active' : '',
  };
}

function useReveal(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const els = document.querySelectorAll('.reveal');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [enabled]);
}

function useEventAutoExpand(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const wraps = document.querySelectorAll('.event-video-wrap');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('unlocked');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    wraps.forEach((wrap) => io.observe(wrap));

    return () => io.disconnect();
  }, [enabled]);
}

function useCountdown(enabled, targetDate) {
  const [time, setTime] = useState({
    d: '00',
    h: '00',
    m: '00',
    s: '00',
    done: false,
  });

  useEffect(() => {
    if (!enabled) return undefined;

    const target = new Date(targetDate).getTime();
    const fmt = (n) => String(n).padStart(2, '0');

    const tick = () => {
      const diff = target - Date.now();

      if (diff <= 0) {
        setTime((prev) => (prev.done ? prev : { ...prev, done: true }));
        return;
      }

      setTime({
        d: fmt(Math.floor(diff / 86400000)),
        h: fmt(Math.floor((diff % 86400000) / 3600000)),
        m: fmt(Math.floor((diff % 3600000) / 60000)),
        s: fmt(Math.floor((diff % 60000) / 1000)),
        done: false,
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);

    return () => window.clearInterval(id);
  }, [enabled, targetDate]);

  return time;
}

function EntryGate({ data, onReveal, bgAudioRef, setAudioPlaying }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const openInvite = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    onReveal();
  };

  const startInvite = async () => {
    const video = videoRef.current;

    if (!video) {
      openInvite();
      return;
    }

    setPlaying(true);

    try {
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0;

      await video.play();

      timerRef.current = setTimeout(() => {
        openInvite();
      }, 8000);

      try {
        await bgAudioRef.current?.play();
        setAudioPlaying(true);
      } catch (audioErr) {
        console.warn('Audio blocked:', audioErr);
        setAudioPlaying(false);
      }
    } catch (err) {
      console.warn('Entry video blocked:', err);
      openInvite();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      id="entry-gate"
      className={playing ? 'video-playing' : ''}
      onClick={startInvite}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && startInvite()}
    >
      <video
        ref={videoRef}
        id="entry-video"
        playsInline
        preload="auto"
        muted
        onEnded={openInvite}
        onError={openInvite}
      >
        <source src={data.assets.entryVideo} type="video/mp4" />
      </video>

      {!playing && <div className="tap-hint">Tap to Begin</div>}

      {playing && (
        <button
          type="button"
          className="enter-invite-btn"
          onClick={(e) => {
            e.stopPropagation();
            openInvite();
          }}
        >
          Enter Invite
        </button>
      )}
    </div>
  );
}

function AudioButton({ bgAudioRef, audioPlaying, setAudioPlaying }) {
  const toggle = async (e) => {
    e.stopPropagation();

    const audio = bgAudioRef.current;
    if (!audio) return;

    if (audioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      try {
        await audio.play();
        setAudioPlaying(true);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <button
      id="audio-btn"
      title="Toggle music"
      aria-label="Toggle background music"
      onClick={toggle}
    >
      {audioPlaying ? (
        <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
          />
        </svg>
      ) : (
        <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"
          />
        </svg>
      )}
    </button>
  );
}

function Hero({ data }) {
  return (
    <section id="hero">
      <video id="hero-bg-video" autoPlay loop muted playsInline>
        <source src={data.assets.backgroundVideo} type="video/mp4" />
      </video>

      <div className="hero-frame">
        <span />
      </div>

      <div className="hero-card">
        <div className="card-corner tl" />
        <div className="card-corner tr" />
        <div className="card-corner bl" />
        <div className="card-corner br" />

        <img className="ganesh-icon" src={data.assets.ganeshImage} alt="Shri Ganesh" />

        <p className="ganesh-mantra">
          {safeArray(data.hero.mantra).map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>

        {data.hero.welcomeLine && (
          <p className="blessings-text">{data.hero.welcomeLine}</p>
        )}

        {data.hero.specialNote && (
          <p className="blessings-text">{data.hero.specialNote}</p>
        )}

        <p className="blessings-text">{data.hero.blessing}</p>

        <div className="couple-block">
          <span className="couple-name shimmer-gold">{data.hero.groom.name}</span>
          <p className="family-line">{data.hero.groom.parents}</p>
          <p className="family-subline">{data.hero.groom.grandparents}</p>
          {data.hero.groom.residence && (
            <p className="family-subline">{data.hero.groom.residence}</p>
          )}
        </div>

        <div className="ampersand-wrap">
          <div className="ampersand-line" />
          <span className="ampersand">&</span>
          <div className="ampersand-line" />
        </div>

        <div className="couple-block">
          <span className="couple-name shimmer-gold">{data.hero.bride.name}</span>
          <p className="family-line">{data.hero.bride.parents}</p>
          <p className="family-subline">{data.hero.bride.grandparents}</p>
          {data.hero.bride.residence && (
            <p className="family-subline">{data.hero.bride.residence}</p>
          )}
        </div>
      </div>

      <div className="scroll-cue">
        <p>Scroll</p>
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function Countdown({ enabled, data }) {
  const time = useCountdown(enabled, data.countdown.targetDate);

  return (
    <section id="countdown-section">
      <div className="countdown-card reveal">
        <span className="section-label">{data.countdown.label}</span>
        <p className="countdown-quote">{data.countdown.quote}</p>
        <p className="countdown-date">{data.countdown.displayDate}</p>

        {time.done ? (
          <p className="married-text">{data.countdown.completedText}</p>
        ) : (
          <div className="countdown-grid">
            {[
              ['Days', time.d],
              ['Hours', time.h],
              ['Mins', time.m],
              ['Secs', time.s],
            ].map(([label, value]) => (
              <div className="countdown-unit" key={label}>
                <span className="countdown-number">{value}</span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Memories({ data }) {
  return (
    <section id="memories-section">
      <div className="text-center reveal">
        <span className="section-label">{data.memories.label}</span>
        <h2 className="section-heading text-terra">
          {data.memories.headingLine1}
          <br />
          {data.memories.headingLine2}
        </h2>
        <StarOrnament className="mt-4" />
      </div>

      <div className="memories-frame reveal reveal-delay-2">
        <div className="memories-inner">
          <video autoPlay loop muted playsInline>
            <source src={data.assets.memoriesVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      <p className="text-center reveal reveal-delay-3 mt-8 quote-line">
        {data.memories.quote}
      </p>
    </section>
  );
}

function Venue({ data }) {
  return (
    <section id="venue-section">
      <div className="text-center reveal">
        <span className="section-label">{data.venue.label}</span>
        <h2 className="section-heading text-terra">
          {data.venue.headingLine1}
          <br />
          {data.venue.headingLine2}
        </h2>
        <StarOrnament className="mt-4 mb-8" />
      </div>

      <div className="venue-card reveal reveal-delay-2">
        <img className="venue-img" src={data.assets.venueImage} alt={data.venue.name} />

        <div className="venue-info text-center">
          <h3 className="venue-name">{data.venue.name}</h3>

          <p className="venue-address">
            {safeArray(data.venue.addressLines).map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>

          {data.venue.mapEmbedUrl && (
            <iframe
              className="venue-map"
              title={`${data.venue.name} map`}
              src={data.venue.mapEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}

          {data.venue.directionsUrl && (
            <a
              className="directions-btn"
              href={data.venue.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Events({ data }) {
  return (
    <section id="events-section">
      <div className="text-center reveal events-head">
        <span className="section-label">{data.eventsSection.label}</span>
        <h2 className="section-heading text-terra">
          {data.eventsSection.headingLine1}
          <br />
          {data.eventsSection.headingLine2}
        </h2>
        <StarOrnament className="mt-4" />
      </div>

      {safeArray(data.ceremonies).map((event, index) => (
        <div key={`${event.title}-${index}`}>
          <div className="event-block reveal">
            <div className="text-center mb-4">
              <p className="event-subtitle">{event.subtitle || `Ceremony ${event.roman}`}</p>
              <h3 className="event-title">{event.title}</h3>
              {event.description && (
                <p className="countdown-quote">{event.description}</p>
              )}
            </div>

            {event.video && (
              <div className="event-video-wrap">
                <video autoPlay muted loop playsInline>
                  <source src={event.video} type="video/mp4" />
                </video>
              </div>
            )}
          </div>

          {index < safeArray(data.ceremonies).length - 1 && (
            <div className="event-sep reveal">
              <div className="event-sep-line" />
              <div className="event-sep-dot" />
              <div className="event-sep-line" />
            </div>
          )}
        </div>
      ))}

      {data.barat?.title && (
        <div className="countdown-card reveal">
          <span className="section-label">{data.barat.title}</span>
          <p className="countdown-quote">{data.barat.details}</p>
        </div>
      )}
    </section>
  );
}

function RSVP({ data }) {
  const [attending, setAttending] = useState('yes');
  const [modal, setModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const disabled = attending === 'no';

  const emotionalGuessOptions =
    safeArray(data.rsvp.emotionalGuessOptions).length > 0
      ? data.rsvp.emotionalGuessOptions
      : [
        { label: data.hero.groom.name, value: data.hero.groom.name, letter: data.hero.groom.name?.[0] || 'G' },
        { label: data.hero.bride.name, value: data.hero.bride.name, letter: data.hero.bride.name?.[0] || 'B' },
        { label: 'Both', value: 'Both', letter: 'B' },
      ];

  const moodOptions =
    safeArray(data.rsvp.moodOptions).length > 0
      ? data.rsvp.moodOptions
      : [
        { label: 'The Food 🍛', value: 'The Food' },
        { label: 'Dance Floor 💃', value: 'The Dance Floor' },
        { label: 'The Love ❤️', value: 'The Love' },
        { label: 'All of It ✨', value: 'All of It' },
      ];

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const submitData = Object.fromEntries(formData.entries());

    submitData.attending_events = formData.getAll('attending_events');
    submitData.clientId = data.clientId;

    try {
      const res = await fetch(data.rsvp.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const result = await res.json();

      setModal(result.success ? 'success' : 'error');

      if (result.success) {
        e.currentTarget.reset();
        setAttending('yes');
      }
    } catch (err) {
      console.error(err);
      setModal('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section">
      <div className="text-center reveal">
        <span className="section-label">{data.rsvp.label}</span>
        <h2 className="section-heading text-terra">
          {data.rsvp.headingLine1}
          <br />
          {data.rsvp.headingLine2}
        </h2>
        <p className="reveal reveal-delay-2 mt-4 rsvp-intro">{data.rsvp.intro}</p>

        {safeArray(data.rsvp.contactNumbers).length > 0 && (
          <p className="countdown-quote">
            Contact: {data.rsvp.contactNumbers.join(' / ')}
          </p>
        )}
      </div>

      <form id="rsvp-form" className="rsvp-form" onSubmit={submit}>
        <div className="form-card reveal">
          <p className="form-card-title">Guest Details</p>

          <div className="field-group">
            <label className="field-label" htmlFor="f-name">
              Your Name
            </label>
            <input className="field-input" type="text" id="f-name" name="name" required placeholder="Full name" />
          </div>

          <div className="field-group no-margin">
            <label className="field-label" htmlFor="f-phone">
              Phone Number
            </label>
            <input className="field-input" type="tel" id="f-phone" name="phone" required placeholder="+91 00000 00000" />
          </div>
        </div>

        <div className="form-card reveal reveal-delay-1">
          <p className="form-card-title">Will you join us?</p>

          <div className="radio-pill-row">
            <label className="radio-pill">
              <input type="radio" name="attending" value="yes" checked={attending === 'yes'} onChange={(e) => setAttending(e.target.value)} />
              Joyfully Accept 🎉
            </label>

            <label className="radio-pill">
              <input type="radio" name="attending" value="no" checked={attending === 'no'} onChange={(e) => setAttending(e.target.value)} />
              Regrettably Decline
            </label>
          </div>
        </div>

        <div className={`form-card reveal reveal-delay-1 ${disabled ? 'card-disabled' : ''}`}>
          <p className="form-card-title">Party Size</p>
          <p className="form-card-subtitle">Including yourself, how many guests?</p>

          <select className="field-input" name="guest_count" required disabled={disabled}>
            <option value="1">1 (Just me)</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6+">6+ Guests</option>
          </select>
        </div>

        <div className={`form-card reveal reveal-delay-1 ${disabled ? 'card-disabled' : ''}`}>
          <p className="form-card-title">Events You'll Attend</p>
          <p className="form-card-subtitle">Select the days you will be joining us</p>

          <div className="checkbox-row">
            {safeArray(data.rsvp.eventOptions).map((event) => (
              <label className="checkbox-pill" key={event.value}>
                <div>
                  <span>{event.label}</span>
                  <small className="checkbox-date">{event.date}</small>
                </div>
                <input type="checkbox" name="attending_events" value={event.value} disabled={disabled} />
              </label>
            ))}
          </div>
        </div>

        <div className={`form-card reveal reveal-delay-1 ${disabled ? 'card-disabled' : ''}`}>
          <p className="form-card-title">Make a Guess</p>
          <p className="form-card-subtitle">Who will get emotional first?</p>

          <div className="circle-select">
            {emotionalGuessOptions.map((option) => (
              <label className="circle-opt" key={option.value}>
                <input type="radio" name="guess_emotional_first" value={option.value} disabled={disabled} />
                <div className="circle-face">{option.letter}</div>
                <span className="circle-opt-label">{option.label}</span>
              </label>
            ))}
          </div>

          <p className="reveal-note">Reveal after the wedding 😉</p>
        </div>

        <div className={`form-card reveal reveal-delay-2 ${disabled ? 'card-disabled' : ''}`}>
          <p className="form-card-title">Your Wedding Mood</p>
          <p className="form-card-subtitle">I'm coming for...</p>

          <div className="mood-grid">
            {moodOptions.map((option) => (
              <label className="mood-opt" key={option.value}>
                <input type="radio" name="wedding_mood" value={option.value} disabled={disabled} />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form-card reveal reveal-delay-2">
          <p className="form-card-title">Leave Us a Note</p>
          <p className="form-card-subtitle">Share a wish or memory.</p>
          <textarea className="text-area" name="message" rows="3" placeholder="Write something from the heart..." />
          <p className="memory-note">🔥 This becomes a digital memory book.</p>
        </div>

        <div className="form-card reveal reveal-delay-3">
          <p className="form-card-title">Words for Forever</p>
          <p className="form-card-subtitle">Advice for married life.</p>
          <textarea className="text-area" name="advice_for_forever" rows="3" placeholder="One piece of advice..." />
        </div>

        <div className="reveal reveal-delay-3 submit-wrap">
          <button type="submit" className="submit-btn" disabled={submitting}>
            <span>{submitting ? 'Sending...' : 'Send Love'}</span>

            {submitting && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin submit-spinner">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0110 10" strokeOpacity="0.75" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {modal && <RSVPModal type={modal} onClose={() => setModal(null)} />}
    </section>
  );
}

function RSVPModal({ type, onClose }) {
  const success = type === 'success';

  return (
    <div id="rsvp-modal" className="open" onClick={(e) => e.target.id === 'rsvp-modal' && onClose()}>
      <div className="modal-card">
        <div className="modal-icon-ring error-ring">
          {success ? (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="error-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        <h3 className="modal-title">{success ? 'Thank You!' : 'Oops!'}</h3>

        <p className="modal-msg">
          {success
            ? "We can't wait to celebrate with you on our special day!"
            : 'There was an error submitting your RSVP. Please try again.'}
        </p>

        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function Footer({ data }) {
  const footer = data.footer || {};
  const primaryTitle = footer.complimentsTitle || footer.hostsTitle || 'With Compliments From';
  const primaryList = safeArray(footer.compliments).length > 0 ? footer.compliments : safeArray(footer.hosts);

  return (
    <section id="footer-section">
      <div className="footer-top reveal">
        <span className="footer-couple">{footer.coupleName}</span>

        <div className="footer-divider">
          <div />
          <span>♥</span>
          <div />
        </div>
      </div>

      <div className="footer-grid">
        {safeArray(primaryList).length > 0 && (
          <div className="reveal">
            <span className="footer-heading">{primaryTitle}</span>
            <ul className="footer-list">
              {safeArray(primaryList).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {safeArray(footer.rsvpNames).length > 0 && (
          <div className="reveal reveal-delay-2">
            <span className="footer-heading">{footer.rsvpTitle || 'RSVP'}</span>
            <div className="footer-rsvp-names">
              {footer.rsvpNames.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </div>
        )}

        {safeArray(footer.blessingsFrom).length > 0 && (
          <div className="reveal reveal-delay-2">
            <span className="footer-heading">Blessings From</span>
            <ul className="footer-list">
              {footer.blessingsFrom.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {safeArray(footer.invitedBy).length > 0 && (
          <div className="reveal reveal-delay-2">
            <span className="footer-heading">Invited By</span>
            <ul className="footer-list">
              {footer.invitedBy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {(footer.kidsName || footer.kidsLine || footer.specialThanks) && (
          <div className="footer-endnote reveal">
            <div className="footer-mini-line" />
            {footer.kidsName && <strong>{footer.kidsName}</strong>}
            {footer.kidsLine && <p>{footer.kidsLine}</p>}
            {footer.specialThanks && <p>{footer.specialThanks}</p>}
          </div>
        )}

        <div className="footer-endnote reveal">
          <div className="footer-mini-line" />
          <p>{footer.endNote}</p>
        </div>
      </div>

      {footer.instagramUrl && footer.instagramHandle && (
        <a href={footer.instagramUrl} target="_blank" rel="noreferrer" className="insta-handle">
          {footer.instagramHandle}
        </a>
      )}
    </section>
  );
}

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [entryClosed, setEntryClosed] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const bgAudioRef = useRef(null);
  const petals = usePetals(revealed);

  useReveal(revealed);
  useEventAutoExpand(revealed);

  useEffect(() => {
    document.body.style.overflow = revealed ? 'auto' : 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [revealed]);

  useEffect(() => {
    if (weddingData.seo?.title) {
      document.title = weddingData.seo.title;
    }
  }, []);

  const revealMain = () => {
    if (revealed) return;

    setRevealed(true);

    window.setTimeout(() => {
      setEntryClosed(true);
    }, 900);
  };

  const mainClass = useMemo(
    () => `main-content ${revealed ? 'visible fade-in' : ''}`,
    [revealed]
  );

  return (
    <>
      <canvas id="petals-canvas" ref={petals.canvasRef} className={petals.className} />

      <audio ref={bgAudioRef} id="bg-audio" loop preload="metadata">
        <source src={weddingData.assets.bgMusic} type="audio/mpeg" />
      </audio>

      <AudioButton
        bgAudioRef={bgAudioRef}
        audioPlaying={audioPlaying}
        setAudioPlaying={setAudioPlaying}
      />

      {!entryClosed && (
        <EntryGate
          data={weddingData}
          onReveal={revealMain}
          bgAudioRef={bgAudioRef}
          setAudioPlaying={setAudioPlaying}
        />
      )}

      <main id="main-content" className={mainClass}>
        <Hero data={weddingData} />
        <Countdown enabled={revealed} data={weddingData} />
        <Memories data={weddingData} />
        <Venue data={weddingData} />
        <Events data={weddingData} />
        <RSVP data={weddingData} />
        <Footer data={weddingData} />
      </main>
    </>
  );
}