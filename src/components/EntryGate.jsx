import { useEffect, useRef, useState } from 'react';

export default function EntryGate({
    data,
    onReveal,
    bgAudioRef,
    setAudioPlaying,
}) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const timerRef = useRef(null);

    const openInvite = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        const video = videoRef.current;
        if (video) {
            video.pause();
        }

        onReveal();
    };

    const startInvite = async () => {
        const video = videoRef.current;

        if (!video) {
            openInvite();
            return;
        }

        setPlaying(true);

        try {
            video.muted = true;
            video.playsInline = true;
            video.currentTime = 0;

            await video.play();

            timerRef.current = setTimeout(() => {
                openInvite();
            }, 8000);

            try {
                await bgAudioRef.current?.play();
                setAudioPlaying(true);
            } catch (audioErr) {
                console.warn('Audio blocked:', audioErr);
                setAudioPlaying(false);
            }
        } catch (err) {
            console.warn('Entry video blocked:', err);
            openInvite();
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div
            id="entry-gate"
            className={playing ? 'video-playing' : ''}
            onClick={startInvite}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && startInvite()}
        >
            <video
                ref={videoRef}
                id="entry-video"
                playsInline
                preload="auto"
                muted
                onEnded={openInvite}
                onError={openInvite}
            >
                <source src={data.assets.entryVideo} type="video/mp4" />
            </video>

            {!playing && <div className="tap-hint">Tap to Begin</div>}

            {playing && (
                <button
                    type="button"
                    className="enter-invite-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        openInvite();
                    }}
                >
                    Enter Invite
                </button>
            )}
        </div>
    );
}