import { useState } from 'react';
import RSVPModal from './RSVPModal';
import { safeArray } from '../utils/safeArray';

export default function RSVP({ data }) {
    const [attending, setAttending] = useState('yes');
    const [modal, setModal] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const disabled = attending === 'no';

    const emotionalGuessOptions =
        safeArray(data.rsvp.emotionalGuessOptions).length > 0
            ? data.rsvp.emotionalGuessOptions
            : [
                {
                    label: data.hero.groom.name,
                    value: data.hero.groom.name,
                    letter: data.hero.groom.name?.[0] || 'G',
                },
                {
                    label: data.hero.bride.name,
                    value: data.hero.bride.name,
                    letter: data.hero.bride.name?.[0] || 'B',
                },
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

                <p className="reveal reveal-delay-2 mt-4 rsvp-intro">
                    {data.rsvp.intro}
                </p>

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
                        <input
                            className="field-input"
                            type="text"
                            id="f-name"
                            name="name"
                            required
                            placeholder="Full name"
                        />
                    </div>

                    <div className="field-group no-margin">
                        <label className="field-label" htmlFor="f-phone">
                            Phone Number
                        </label>
                        <input
                            className="field-input"
                            type="tel"
                            id="f-phone"
                            name="phone"
                            required
                            placeholder="+91 00000 00000"
                        />
                    </div>
                </div>

                <div className="form-card reveal reveal-delay-1">
                    <p className="form-card-title">Will you join us?</p>

                    <div className="radio-pill-row">
                        <label className="radio-pill">
                            <input
                                type="radio"
                                name="attending"
                                value="yes"
                                checked={attending === 'yes'}
                                onChange={(e) => setAttending(e.target.value)}
                            />
                            Joyfully Accept 🎉
                        </label>

                        <label className="radio-pill">
                            <input
                                type="radio"
                                name="attending"
                                value="no"
                                checked={attending === 'no'}
                                onChange={(e) => setAttending(e.target.value)}
                            />
                            Regrettably Decline
                        </label>
                    </div>
                </div>

                <div className={`form-card reveal reveal-delay-1 ${disabled ? 'card-disabled' : ''}`}>
                    <p className="form-card-title">Party Size</p>
                    <p className="form-card-subtitle">Including yourself, how many guests?</p>

                    <select
                        className="field-input"
                        name="guest_count"
                        required
                        disabled={disabled}
                    >
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
                                <input
                                    type="checkbox"
                                    name="attending_events"
                                    value={event.value}
                                    disabled={disabled}
                                />
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
                                <input
                                    type="radio"
                                    name="guess_emotional_first"
                                    value={option.value}
                                    disabled={disabled}
                                />
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
                                <input
                                    type="radio"
                                    name="wedding_mood"
                                    value={option.value}
                                    disabled={disabled}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-card reveal reveal-delay-2">
                    <p className="form-card-title">Leave Us a Note</p>
                    <p className="form-card-subtitle">Share a wish or memory.</p>

                    <textarea
                        className="text-area"
                        name="message"
                        rows="3"
                        placeholder="Write something from the heart..."
                    />

                    <p className="memory-note">
                        🔥 This becomes a digital memory book.
                    </p>
                </div>

                <div className="form-card reveal reveal-delay-3">
                    <p className="form-card-title">Words for Forever</p>
                    <p className="form-card-subtitle">Advice for married life.</p>

                    <textarea
                        className="text-area"
                        name="advice_for_forever"
                        rows="3"
                        placeholder="One piece of advice..."
                    />
                </div>

                <div className="reveal reveal-delay-3 submit-wrap">
                    <button type="submit" className="submit-btn" disabled={submitting}>
                        <span>{submitting ? 'Sending...' : 'Send Love'}</span>

                        {submitting && (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="spin submit-spinner"
                            >
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