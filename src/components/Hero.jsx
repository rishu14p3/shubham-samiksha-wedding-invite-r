import { safeArray } from '../utils/safeArray';

export default function Hero({ data }) {
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

                <img
                    className="ganesh-icon"
                    src={data.assets.ganeshImage}
                    alt="Shri Ganesh"
                />

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
                    <span className="couple-name shimmer-gold">
                        {data.hero.groom.name}
                    </span>
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
                    <span className="couple-name shimmer-gold">
                        {data.hero.bride.name}
                    </span>
                    <p className="family-line">{data.hero.bride.parents}</p>
                    <p className="family-subline">{data.hero.bride.grandparents}</p>

                    {data.hero.bride.residence && (
                        <p className="family-subline">{data.hero.bride.residence}</p>
                    )}
                </div>
            </div>

            <div className="scroll-cue">
                <p>Scroll</p>
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}