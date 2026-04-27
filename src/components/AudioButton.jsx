export default function AudioButton({
    bgAudioRef,
    audioPlaying,
    setAudioPlaying,
}) {
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
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
                    />
                </svg>
            ) : (
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
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