import { useEffect, useRef } from 'react';

export function usePetals(active) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const ctx = canvas.getContext('2d');
        let rafId = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        const colors = [
            '#D4806A',
            '#E8C07A',
            '#C9963E',
            '#B85940',
            '#EEDDD3',
            '#F5E4C0',
        ];

        const count = window.innerWidth < 600 ? 28 : 52;

        class Petal {
            constructor() {
                this.reset(true);
            }

            reset(initial) {
                this.x = Math.random() * canvas.width;
                this.y = initial
                    ? Math.random() * canvas.height * 2 - canvas.height
                    : -20;
                this.r = 4 + Math.random() * 5;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = 0.6 + Math.random() * 1.2;
                this.rot = Math.random() * Math.PI * 2;
                this.drot = (Math.random() - 0.5) * 0.04;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = 0.5 + Math.random() * 0.4;
            }

            update() {
                this.x += this.vx + Math.sin(this.y * 0.01) * 0.4;
                this.y += this.vy;
                this.rot += this.drot;

                if (this.y > canvas.height + 20) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rot);
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.ellipse(0, 0, this.r * 0.55, this.r, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const petals = Array.from({ length: count }, () => new Petal());

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach((petal) => {
                petal.update();
                petal.draw();
            });
            rafId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return {
        canvasRef,
        className: active ? 'active' : '',
    };
}