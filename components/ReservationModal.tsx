'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users } from 'lucide-react';
import { useState } from 'react';

export default function ReservationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 2,
        name: '',
        email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2); // Success state
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-charcoal z-[80] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        className="fixed inset-0 m-auto max-w-lg h-fit bg-cream border-8 border-caveman-red z-[90] shadow-[20px_20px_0px_#1A1A1A] p-8 md:p-12 overflow-hidden"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 hover:rotate-90 transition-transform">
                            <X size={32} />
                        </button>

                        {step === 1 ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <h2 className="font-header text-5xl md:text-6xl text-center mb-4 uppercase leading-[0.85]">
                                    Secure <br /> <span className="text-caveman-red">The Feast</span>
                                </h2>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="font-header text-lg uppercase">When?</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 ml-1" size={18} />
                                                <input
                                                    required
                                                    type="date"
                                                    className="w-full bg-white border-4 border-charcoal p-3 pl-10 font-bold focus:outline-none focus:ring-4 focus:ring-mustard"
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-header text-lg uppercase">Time?</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 ml-1" size={18} />
                                                <select
                                                    className="w-full bg-white border-4 border-charcoal p-3 pl-10 font-bold focus:outline-none focus:ring-4 focus:ring-mustard appearance-none"
                                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                >
                                                    <option>18:00</option>
                                                    <option>19:00</option>
                                                    <option>20:00</option>
                                                    <option>21:00</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="font-header text-lg uppercase">How Many Hunters?</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 ml-1" size={18} />
                                            <input
                                                type="number"
                                                min="1"
                                                max="20"
                                                defaultValue={2}
                                                className="w-full bg-white border-4 border-charcoal p-3 pl-10 font-bold focus:outline-none focus:ring-4 focus:ring-mustard"
                                                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="font-header text-lg uppercase">Your Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Chief Hungry Wolf"
                                            className="w-full bg-white border-4 border-charcoal p-3 font-bold focus:outline-none focus:ring-4 focus:ring-mustard placeholder:opacity-40"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="mt-4 bg-charcoal text-white font-header text-2xl uppercase py-4 border-2 border-transparent hover:bg-caveman-red hover:border-charcoal hover:shadow-[8px_8px_0px_#1A1A1A] transition-all transform hover:-translate-y-1">
                                    Book Table
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-8xl mb-6 mx-auto w-fit"
                                >
                                    🔥
                                </motion.div>
                                <h3 className="font-header text-4xl mb-4">You're Booked!</h3>
                                <p className="font-body text-xl max-w-xs mx-auto mb-8">Get ready for the smoke. We'll keep a cold one waiting.</p>
                                <button onClick={onClose} className="underline font-bold uppercase hover:text-caveman-red">Close</button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
