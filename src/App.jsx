import { useEffect, useMemo, useRef, useState } from 'react';

import { weddingData } from './weddingData';

import AudioButton from './components/AudioButton';
import Countdown from './components/Countdown';
import EntryGate from './components/EntryGate';
import Events from './components/Events';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Memories from './components/Memories';
import RSVP from './components/RSVP';
import Venue from './components/Venue';

import { useEventAutoExpand } from './hooks/useEventAutoExpand';
import { usePetals } from './hooks/usePetals';
import { useReveal } from './hooks/useReveal';

export default function App() {
    const [revealed, setRevealed] = useState(false);
    const [entryClosed, setEntryClosed] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const bgAudioRef = useRef(null);
    const petals = usePetals(revealed);

    useReveal(revealed);
    useEventAutoExpand(revealed);

    useEffect(() => {
        document.body.style.overflow = revealed ? 'auto' : 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [revealed]);

    useEffect(() => {
        if (weddingData.seo?.title) {
            document.title = weddingData.seo.title;
        }
    }, []);

    const revealMain = () => {
        if (revealed) return;

        setRevealed(true);

        window.setTimeout(() => {
            setEntryClosed(true);
        }, 900);
    };

    const mainClass = useMemo(
        () => `main-content ${revealed ? 'visible fade-in' : ''}`,
        [revealed]
    );

    return (
        <>
            <canvas
                id="petals-canvas"
                ref={petals.canvasRef}
                className={petals.className}
            />

            <audio ref={bgAudioRef} id="bg-audio" loop preload="metadata">
                <source src={weddingData.assets.bgMusic} type="audio/mpeg" />
            </audio>

            <AudioButton
                bgAudioRef={bgAudioRef}
                audioPlaying={audioPlaying}
                setAudioPlaying={setAudioPlaying}
            />

            {!entryClosed && (
                <EntryGate
                    data={weddingData}
                    onReveal={revealMain}
                    bgAudioRef={bgAudioRef}
                    setAudioPlaying={setAudioPlaying}
                />
            )}

            <main id="main-content" className={mainClass}>
                <Hero data={weddingData} />
                <Countdown enabled={revealed} data={weddingData} />
                <Memories data={weddingData} />
                <Venue data={weddingData} />
                <Events data={weddingData} />
                <RSVP data={weddingData} />
                <Footer data={weddingData} />
            </main>
        </>
    );
}