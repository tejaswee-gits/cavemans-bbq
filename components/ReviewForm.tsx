'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewForm({ onForceRefetch }: { onForceRefetch?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
            setRating(0);
            // In a real app, this would refresh the list
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-20 relative z-20">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-caveman-red text-white font-header text-4xl uppercase py-8 border-4 border-charcoal shadow-[10px_10px_0px_#1A1A1A] hover:translate-y-1 hover:shadow-none transition-all transform hover:rotate-1"
                >
                    🔥 Spread The Fire (Rate Us)
                </button>
            ) : (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white border-4 border-charcoal p-8 shadow-[15px_15px_0px_#1A1A1A]"
                >
                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <h3 className="font-header text-3xl mb-2 text-green-600">LOUD AND CLEAR!</h3>
                            <p className="font-body">Thanks for adding fuel to the fire.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-header text-3xl uppercase">Your Tale</h3>
                                <button type="button" onClick={() => setIsOpen(false)} className="underline text-sm uppercase font-bold text-gray-500">Cancel</button>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-header uppercase text-xl">How was the meat?</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={40}
                                                fill={(hoverRating || rating) >= star ? "#E84A42" : "transparent"}
                                                color={(hoverRating || rating) >= star ? "#E84A42" : "#1A1A1A"}
                                                strokeWidth={2}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required placeholder="Your Name" className="border-4 border-charcoal p-4 font-bold bg-cream focus:outline-none focus:ring-4 focus:ring-mustard" />
                                <input required placeholder="Your Title (e.g. Carnivore)" className="border-4 border-charcoal p-4 font-bold bg-cream focus:outline-none focus:ring-4 focus:ring-mustard" />
                            </div>

                            <textarea
                                required
                                placeholder="Tell us the truth. Was it smoky enough?"
                                rows={4}
                                className="border-4 border-charcoal p-4 font-bold bg-cream focus:outline-none focus:ring-4 focus:ring-mustard resize-none"
                            />

                            <button
                                type="submit"
                                disabled={rating === 0}
                                className="bg-charcoal text-white font-header text-2xl uppercase py-4 hover:bg-caveman-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Post Review
                            </button>
                        </form>
                    )}
                </motion.div>
            )}
        </div>
    );
}
