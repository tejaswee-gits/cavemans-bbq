'use client';
import { useEffect, useRef, useState } from 'react';

export default function BrisketAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [framesLoaded, setFramesLoaded] = useState(0);
    const totalFrames = 240;

    useEffect(() => {
        // Preload images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const loadImages = async () => {
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                const frameStr = i.toString().padStart(3, '0');
                img.src = `/brisket-frames/ezgif-frame-${frameStr}.jpg`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        setFramesLoaded(loadedCount);
                        resolve(null);
                    };
                    // If error, just skip
                    img.onerror = () => resolve(null);
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let currentFrame = 0;

        // Playback speed
        const fps = 30;
        const interval = 1000 / fps;
        let then = Date.now();

        let loopCount = 0;
        const MAX_LOOPS = 2;

        const render = () => {
            const now = Date.now();
            const delta = now - then;

            if (delta > interval) {
                then = now - (delta % interval);

                const img = images[currentFrame];
                if (img) {
                    // Draw image covering the canvas (object-cover equivalent)
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                }

                const nextFrame = currentFrame + 1;

                if (nextFrame >= images.length) {
                    loopCount++;
                    if (loopCount >= MAX_LOOPS) {
                        return; // Stop animation
                    }
                    currentFrame = 0;
                } else {
                    currentFrame = nextFrame;
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [images]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block"
            width={1920}
            height={1080}
        />
    );
}
