import StarOrnament from './StarOrnament';
import { safeArray } from '../utils/safeArray';

export default function Venue({ data }) {
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
                <img
                    className="venue-img"
                    src={data.assets.venueImage}
                    alt={data.venue.name}
                />

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