import { useEffect } from 'react';

export function useReveal(enabled) {
    useEffect(() => {
        if (!enabled) return undefined;

        const els = document.querySelectorAll('.reveal');

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        els.forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, [enabled]);
}