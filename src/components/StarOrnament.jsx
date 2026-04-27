export default function StarOrnament({ className = '' }) {
    return (
        <div className={`ornament ${className}`}>
            <div className="ornament-line rev" />
            <svg
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <div className="ornament-line" />
        </div>
    );
}