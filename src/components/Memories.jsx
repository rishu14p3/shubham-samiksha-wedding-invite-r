import StarOrnament from './StarOrnament';

export default function Memories({ data }) {
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