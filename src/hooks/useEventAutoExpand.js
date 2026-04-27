import { useEffect } from 'react';

export function useEventAutoExpand(enabled) {
    useEffect(() => {
        if (!enabled) return undefined;

        const wraps = document.querySelectorAll('.event-video-wrap');

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('unlocked');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.35 }
        );

        wraps.forEach((wrap) => io.observe(wrap));

        return () => io.disconnect();
    }, [enabled]);
}