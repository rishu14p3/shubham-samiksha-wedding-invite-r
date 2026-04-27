import { safeArray } from '../utils/safeArray';

export default function Footer({ data }) {
    const footer = data.footer || {};
    const primaryTitle =
        footer.complimentsTitle || footer.hostsTitle || 'With Compliments From';

    const primaryList =
        safeArray(footer.compliments).length > 0
            ? footer.compliments
            : safeArray(footer.hosts);

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
                <a
                    href={footer.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="insta-handle"
                >
                    {footer.instagramHandle}
                </a>
            )}
        </section>
    );
}