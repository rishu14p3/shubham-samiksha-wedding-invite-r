import StarOrnament from './StarOrnament';
import { safeArray } from '../utils/safeArray';

export default function Events({ data }) {
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
                            <p className="event-subtitle">
                                {event.subtitle || `Ceremony ${event.roman}`}
                            </p>
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