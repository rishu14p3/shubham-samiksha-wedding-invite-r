import { useEffect, useState } from 'react';

export function useCountdown(enabled, targetDate) {
    const [time, setTime] = useState({
        d: '00',
        h: '00',
        m: '00',
        s: '00',
        done: false,
    });

    useEffect(() => {
        if (!enabled) return undefined;

        const target = new Date(targetDate).getTime();
        const fmt = (n) => String(n).padStart(2, '0');

        const tick = () => {
            const diff = target - Date.now();

            if (diff <= 0) {
                setTime((prev) => (prev.done ? prev : { ...prev, done: true }));
                return;
            }

            setTime({
                d: fmt(Math.floor(diff / 86400000)),
                h: fmt(Math.floor((diff % 86400000) / 3600000)),
                m: fmt(Math.floor((diff % 3600000) / 60000)),
                s: fmt(Math.floor((diff % 60000) / 1000)),
                done: false,
            });
        };

        tick();
        const id = window.setInterval(tick, 1000);

        return () => window.clearInterval(id);
    }, [enabled, targetDate]);

    return time;
}