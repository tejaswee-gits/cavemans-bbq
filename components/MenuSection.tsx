'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';

const MENU_ITEMS = [
    // From The Pit (Meats)
    { id: 1, name: "BEEF BRISKET", desc: "18-hour slow smoked black angus. Served with pit juice and pickles.", price: "€24", type: "pit", icon: "🍖" },
    { id: 2, name: "ST. LOUIS RIBS", desc: "Half rack, dry rubbed or glazed. Falls off the bone like it's 10,000 BC.", price: "€19", type: "pit", icon: "🥓" },
    { id: 3, name: "PULLED PORK", desc: "Hand-shredded shoulder. The messier, the better.", price: "€16", type: "pit", icon: "🐷" },
    { id: 4, name: "THE CHOPPED CHICKEN", desc: "Smoked over hickory. Quarter bird, maximum flavor.", price: "€15", type: "pit", icon: "🍗" },

    // Sideshow (Sides)
    { id: 5, name: "PIT BEANS", desc: "Simmered with brisket burnt ends.", price: "€6", type: "sides", icon: "🥣" },
    { id: 6, name: "MAC & CHEESE", desc: "Smoked gouda & cheddar crust.", price: "€8", type: "sides", icon: "🧀" },
    { id: 7, name: "SLAW REVOLUTION", desc: "Vinegar slaw, crisp and sharp.", price: "€5", type: "sides", icon: "🥬" },
    { id: 8, name: "CORNBREAD", desc: "Jalapeno honey butter on top.", price: "€6", type: "sides", icon: "🌽" },

    // Liquid Gold (Drinks)
    { id: 9, name: "PITMASTER ALE", desc: "Custom craft brew. Pairs with smoke.", price: "€7", type: "drinks", icon: "🍺" },
    { id: 10, name: "TEXAS LEMONADE", desc: "House squeezed. Sweet enough to melt a glacier.", price: "€5", type: "drinks", icon: "🍋" },
    { id: 11, name: "NEGRONI ROCKS", desc: "The Caveman classic. Hard and cold.", price: "€12", type: "drinks", icon: "🥃" },
];

export default function MenuSection() {
    const [activeTab, setActiveTab] = useState<'pit' | 'sides' | 'drinks'>('pit');

    const categories = [
        { id: 'pit', label: 'FROM THE PIT' },
        { id: 'sides', label: 'THE SIDESHOW' },
        { id: 'drinks', label: 'LIQUID GOLD' },
    ];

    const filteredItems = MENU_ITEMS.filter(item => item.type === activeTab);

    return (
        <section className="min-h-screen py-24 px-4 md:px-8 bg-cream text-charcoal relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <h2 className="text-6xl md:text-9xl font-header uppercase leading-[0.8] text-caveman-red">
                            {categories.find(c => c.id === activeTab)?.label.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h2>
                    </motion.div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap gap-4 z-50">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id as any)}
                                className={clsx(
                                    "px-6 py-3 border-4 border-charcoal font-header text-xl uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A]",
                                    activeTab === cat.id ? "bg-caveman-red text-cream shadow-[4px_4px_0px_#1A1A1A]" : "bg-transparent hover:bg-mustard"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </nav>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 perspective-1000">
                    <AnimatePresence mode="wait">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, rotateX: -10 }}
                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                whileHover={{
                                    scale: 1.05,
                                    rotateX: 5,
                                    rotateY: 2,
                                    zIndex: 50,
                                    boxShadow: "15px 15px 0px rgba(26,26,26,1)"
                                }}
                                className="group relative bg-mustard p-8 border-4 border-charcoal h-full flex flex-col justify-between overflow-hidden cursor-crosshair transform-style-3d min-h-[300px]"
                            >
                                {/* Card Texture */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] mix-blend-multiply pointer-events-none" />

                                <div className="relative z-10 flex justify-between items-start mb-6">
                                    <h3 className="text-4xl md:text-5xl font-header uppercase leading-none text-charcoal max-w-[80%] group-hover:text-cream transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <span className="text-2xl opacity-50">{item.icon}</span>
                                </div>

                                <div className="relative z-10">
                                    <p className="font-body text-charcoal/80 text-lg mb-4 font-medium leading-relaxed border-t-2 border-charcoal pt-4 group-hover:border-cream/20 group-hover:text-cream transition-colors">
                                        {item.desc}
                                    </p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="text-5xl font-header text-charcoal group-hover:text-white transition-colors">{item.price}</span>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal text-cream px-3 py-1 font-bold font-body text-xs uppercase">Order Now</div>
                                    </div>
                                </div>

                                {/* Hover Background - reveals red */}
                                <div className="absolute inset-0 bg-caveman-red translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 origin-bottom" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {activeTab === 'drinks' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-12 text-center text-charcoal/60 font-body text-sm uppercase"
                    >
                        Happy Hour 17h - 19h
                    </motion.div>
                )}
            </div>

            <div className="flex justify-center mt-12">
                <a href="/menu" className="inline-block px-12 py-4 bg-caveman-red text-white font-header text-2xl uppercase tracking-widest border-4 border-charcoal shadow-[6px_6px_0px_#1A1A1A] hover:translate-y-1 hover:shadow-none hover:rotate-1 transition-all">
                    View Full Menu & Order
                </a>
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </section>
    );
}
