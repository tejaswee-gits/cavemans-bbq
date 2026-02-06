'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Beer } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HappyHourModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HappyHourModal({ isOpen, onClose }: HappyHourModalProps) {
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen) {
            // Auto close after 20 seconds
            timer = setTimeout(() => {
                onClose();
            }, 20000);
        }
        return () => clearTimeout(timer);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative bg-[#D64933] w-full max-w-md p-8 text-center border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute -top-4 -right-4 bg-white text-[#D64933] p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                            <X size={20} strokeWidth={3} />
                        </button>

                        <div className="flex justify-center mb-4 text-white">
                            <Beer size={48} strokeWidth={1.5} />
                        </div>

                        <h2 className="font-header text-4xl uppercase text-white mb-4 leading-none">
                            HAPPY HOUR CHEZ CAVEMAN!
                        </h2>

                        <p className="font-body text-white text-sm mb-6 px-4">
                            -20% sur toutes les bières pression et cocktails fumés.<br />
                            Du mardi au vendredi, de 17h30 à 19h30.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Link href="/menu">
                                <button className="w-full bg-white text-[#D64933] font-header uppercase py-3 text-lg tracking-wider hover:bg-gray-100 transition-colors">
                                    Voir la carte des boissons
                                </button>
                            </Link>
                            <button
                                onClick={onClose}
                                className="text-white text-xs uppercase font-bold underline hover:text-gray-200"
                            >
                                Non merci... je n'ai pas soif
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
