import { useCountdown } from '../hooks/useCountdown';

export default function Countdown({ enabled, data }) {
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