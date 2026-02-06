'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import CartDrawer from '@/components/CartDrawer';
import ReservationModal from '@/components/ReservationModal';
import { useLanguage } from '@/lib/LanguageContext';
import { useSearchParams } from 'next/navigation';

const MENU_ITEMS = [
    // From The Pit (Meats)
    { id: 1, type: "pit", icon: "🍖", price: 24 },
    { id: 2, type: "pit", icon: "🥓", price: 19 },
    { id: 3, type: "pit", icon: "🐷", price: 16 },
    { id: 4, type: "pit", icon: "🍗", price: 15 },

    // Sideshow (Sides)
    { id: 5, type: "sides", icon: "🥣", price: 6 },
    { id: 6, type: "sides", icon: "🧀", price: 8 },
    { id: 7, type: "sides", icon: "🥬", price: 5 },
    { id: 8, type: "sides", icon: "🌽", price: 6 },

    // Liquid Gold (Drinks)
    { id: 9, type: "drinks", icon: "🍺", price: 7 },
    { id: 10, type: "drinks", icon: "🍋", price: 5 },
    { id: 11, type: "drinks", icon: "🥃", price: 12 },
];

function MenuContent() {
    const [activeTab, setActiveTab] = useState<'pit' | 'sides' | 'drinks'>('pit');
    const [cart, setCart] = useState<{ id: number, quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isReserveOpen, setIsReserveOpen] = useState(false);
    const { t } = useLanguage();

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('action') === 'reserve') {
            setIsReserveOpen(true);
        }
    }, [searchParams]);

    const addToCart = (id: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { id, quantity: 1 }];
        });
        // Visual feedback could go here
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const getCartItems = () => {
        return cart.map(cartItem => {
            const product = MENU_ITEMS.find(p => p.id === cartItem.id);
            return {
                ...cartItem,
                name: t(`menu.items.${product?.id}.name`) || 'Unknown',
                price: product?.price || 0
            };
        });
    };

    const categories = [
        { id: 'pit', label: t('menu.tab_eat') },
        { id: 'sides', label: t('menu.tab_sides') },
        { id: 'drinks', label: t('menu.tab_drink') },
    ];

    return (
        <main className="min-h-screen bg-cream selection:bg-caveman-red selection:text-white pb-24">

            {/* Fixed Cart Trigger */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-8 right-8 z-[60] bg-caveman-red text-white p-4 rounded-full border-4 border-charcoal shadow-[4px_4px_0px_#1A1A1A] flex items-center justify-center"
            >
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-mustard text-charcoal font-bold w-8 h-8 flex items-center justify-center rounded-full border-2 border-charcoal">
                        {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                )}
            </motion.button>

            {/* Header */}
            <section className="bg-charcoal text-cream py-24 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[15vw] leading-[0.8] font-header uppercase text-caveman-red mix-blend-hard-light relative z-10"
                >
                    {t('menu.header_repeat')}.
                </motion.h1>
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-10 opacity-10 pointer-events-none">
                    <span className="text-[10vw] font-header">{t('menu.header_eat')}</span>
                    <span className="text-[10vw] font-header">{t('menu.header_drink')}</span>
                </div>
            </section>

            {/* Menu Content */}
            <div className="max-w-7xl mx-auto px-4 mt-12">
                {/* Reservation CTA Strip */}
                <div className="bg-mustard border-4 border-charcoal p-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-4 transform -rotate-1">
                    <div>
                        <h3 className="font-header text-3xl uppercase">{t('menu.cta_title')}</h3>
                        <p className="font-body opacity-80">{t('menu.cta_desc')}</p>
                    </div>
                    <button
                        onClick={() => setIsReserveOpen(true)}
                        className="bg-charcoal text-white px-8 py-3 font-header text-xl uppercase hover:bg-white hover:text-charcoal transition-colors"
                    >
                        {t('menu.cta_btn')}
                    </button>
                </div>

                {/* Categories */}
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id as any)}
                            className={clsx(
                                "px-8 py-4 border-4 border-charcoal font-header text-3xl uppercase tracking-wider transition-all duration-300",
                                activeTab === cat.id
                                    ? "bg-caveman-red text-white shadow-[8px_8px_0px_#1A1A1A] -translate-y-2 rotate-2"
                                    : "bg-white hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A]"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {MENU_ITEMS.filter(item => item.type === activeTab).map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                className="group relative bg-white border-4 border-charcoal p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0px_#E84A42] transition-all duration-300 flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-header text-4xl uppercase leading-none max-w-[70%]">{t(`menu.items.${item.id}.name`)}</h3>
                                    <span className="text-4xl">{item.icon}</span>
                                </div>
                                <p className="font-body text-gray-600 mb-6 flex-grow">{t(`menu.items.${item.id}.desc`)}</p>

                                <div className="flex justify-between items-end border-t-2 border-dashed border-gray-300 pt-4 mt-auto">
                                    <span className="font-header text-4xl text-charcoal">€{item.price}</span>
                                    <button
                                        onClick={() => addToCart(item.id)}
                                        className="bg-charcoal text-white px-6 py-2 font-header uppercase tracking-wider hover:bg-caveman-red transition-colors"
                                    >
                                        {t('menu.add_btn')}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={getCartItems()} onRemove={removeFromCart} />
            <ReservationModal isOpen={isReserveOpen} onClose={() => setIsReserveOpen(false)} />
        </main>
    );
}

export default function MenuPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center font-header text-3xl">...</div>}>
            <MenuContent />
        </Suspense>
    );
}
