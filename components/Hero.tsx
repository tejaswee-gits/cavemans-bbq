'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    const words = ["EAT.", "DRINK.", "REPEAT."];

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-charcoal text-cream z-10 selection:bg-caveman-red selection:text-white">
            {/* Background with smoke-like gradient/noise */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-charcoal to-black opacity-80" />

            {/* Smoke overlay simulation */}
            <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

            <div className="z-10 text-center flex flex-col space-y-2 md:space-y-6 mix-blend-screen">
                {words.map((word, i) => (
                    <motion.h1
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(15px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.4,
                            type: "spring",
                            damping: 20,
                            stiffness: 80
                        }}
                        whileHover={{ scale: 1.02, skewX: -2, color: "#EBCB6B", transition: { duration: 0.2 } }}
                        className="text-7xl md:text-9xl lg:text-[12rem] leading-[0.85] font-header tracking-tighter text-caveman-red drop-shadow-[0_0_20px_rgba(232,74,66,0.2)] cursor-default"
                    >
                        {word}
                    </motion.h1>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 text-cream font-body text-xs md:text-sm uppercase tracking-[0.2em] opacity-60"
            >
                Scroll for the pit
            </motion.div>
        </section>
    );
}
