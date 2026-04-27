export default function RSVPModal({ type, onClose }) {
    const success = type === 'success';

    return (
        <div
            id="rsvp-modal"
            className="open"
            onClick={(e) => e.target.id === 'rsvp-modal' && onClose()}
        >
            <div className="modal-card">
                <div className="modal-icon-ring error-ring">
                    {success ? (
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    ) : (
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="error-svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
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