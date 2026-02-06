"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        // Prevent scrolling while loading
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Simulate loading time (e.g., 2.5 seconds)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => {
            document.body.style.overflow = "";
            clearTimeout(timer);
        };
    }, [isLoading]);

    return (
        <AnimatePresence mode="wait" onExitComplete={onComplete}>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal text-cream"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="relative flex flex-col items-center justify-center overflow-hidden">
                        {/* Text Animation */}
                        <div className="overflow-hidden">
                            <motion.h1
                                className="font-header text-6xl md:text-9xl uppercase tracking-tighter"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                            >
                                {t('loading.title1')}
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden">
                            <motion.h1
                                className="font-header text-6xl md:text-9xl uppercase tracking-tighter text-caveman-red"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                            >
                                {t('loading.title2')}
                            </motion.h1>
                        </div>

                        {/* Separator Line */}
                        <motion.div
                            className="mt-6 h-[2px] bg-cream"
                            initial={{ width: 0 }}
                            animate={{ width: "200px" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        />

                        <motion.p
                            className="mt-4 font-body text-sm uppercase tracking-widest opacity-0"
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            {t('loading.text')}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
