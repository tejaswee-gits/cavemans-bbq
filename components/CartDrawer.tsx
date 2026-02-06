'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export default function CartDrawer({
    isOpen,
    onClose,
    items,
    onRemove
}: {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onRemove: (id: number) => void;
}) {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const [isOrdered, setIsOrdered] = useState(false);

    const handleCheckout = () => {
        setIsOrdered(true);
        setTimeout(() => {
            setIsOrdered(false);
            onClose();
            // Here you would typically clear the cart, but this is a visual demo
        }, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-cream border-l-4 border-charcoal z-[70] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                    >
                        <div className="p-6 border-b-4 border-charcoal flex justify-between items-center bg-mustard">
                            <h2 className="font-header text-3xl uppercase">Your Tray</h2>
                            <button onClick={onClose} className="hover:bg-charcoal hover:text-white p-1 transition-colors border-2 border-transparent hover:border-white">
                                <X />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-40 text-center">
                                    <span className="text-6xl mb-4">🍗</span>
                                    <p className="font-header text-2xl uppercase">Tray Empty</p>
                                    <p className="font-body text-sm">Go hunt for some meat.</p>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center border-b-2 border-charcoal/10 pb-4">
                                        <div>
                                            <h4 className="font-header text-xl uppercase">{item.name}</h4>
                                            <p className="font-body text-sm opacity-60">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-header text-xl">€{item.price * item.quantity}</span>
                                            <button onClick={() => onRemove(item.id)} className="text-red-500 hover:bg-red-100 p-1 rounded">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t-4 border-charcoal bg-white">
                            <div className="flex justify-between font-header text-2xl mb-6">
                                <span>In Total:</span>
                                <span>€{total}</span>
                            </div>
                            {isOrdered ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-600 text-white p-4 flex items-center justify-center gap-2 font-header text-xl uppercase"
                                >
                                    <CheckCircle /> Order Sent to Pit!
                                </motion.div>
                            ) : (
                                <button
                                    onClick={handleCheckout}
                                    disabled={items.length === 0}
                                    className="w-full py-4 bg-caveman-red text-white font-header text-3xl uppercase tracking-widest border-4 border-charcoal hover:bg-red-600 hover:shadow-[4px_4px_0px_#1A1A1A] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Checkout
                                </button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
