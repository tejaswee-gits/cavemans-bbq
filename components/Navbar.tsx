'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const NAV_ITEMS = [
    { nameKey: 'nav.home', path: '/' },
    { nameKey: 'nav.eat_drink', path: '/menu' },
    { nameKey: 'nav.wall_of_fame', path: '/reviews' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'en' : 'fr');
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-8 bg-cream/90 backdrop-blur-sm border-b-2 border-charcoal flex justify-between items-center transition-all">
                <Link href="/" className="relative z-50">
                    <h1 className="font-header text-2xl md:text-3xl text-caveman-red tracking-tighter hover:scale-105 transition-transform">
                        CAVEMAN'S
                    </h1>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.path} href={item.path} className="relative group">
                            <span className={clsx(
                                "font-header text-xl uppercase tracking-wide transition-colors duration-300",
                                pathname === item.path ? "text-caveman-red" : "text-charcoal group-hover:text-caveman-red"
                            )}>
                                {t(item.nameKey)}
                            </span>
                            {pathname === item.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 -bottom-1 w-full h-1 bg-caveman-red"
                                />
                            )}
                        </Link>
                    ))}
                    <Link href="/menu?action=reserve">
                        <button className="bg-charcoal text-cream font-header text-lg px-6 py-1 uppercase border-2 border-transparent hover:bg-caveman-red hover:border-charcoal transition-all shadow-[4px_4px_0px_#E84A42] hover:translate-y-1 hover:shadow-none">
                            {t('nav.book_table')}
                        </button>
                    </Link>

                    {/* Language Toggle */}
                    <button onClick={toggleLanguage} className="flex items-center gap-1 font-header text-lg hover:text-caveman-red transition-colors">
                        <Globe size={20} />
                        <span>{language === 'fr' ? 'EN' : 'FR'}</span>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button onClick={toggleLanguage} className="font-header text-lg border-2 border-charcoal bg-white w-10 h-10 flex items-center justify-center">
                        {language === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="z-50 relative w-10 h-10 flex items-center justify-center border-2 border-charcoal bg-white"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={false}
                animate={{ clipPath: isOpen ? "circle(150% at 100% 0)" : "circle(0% at 100% 0)" }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                className="fixed inset-0 z-40 bg-mustard flex flex-col items-center justify-center pointer-events-none md:hidden"
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >
                <div className="flex flex-col gap-8 text-center">
                    {NAV_ITEMS.map((item, i) => (
                        <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}>
                            <motion.div
                                custom={i}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 50 }}
                                transition={{ delay: i * 0.1 }}
                                className={clsx(
                                    "font-header text-6xl uppercase",
                                    pathname === item.path ? "text-white text-stroke-charcoal" : "text-charcoal"
                                )}
                            >
                                {t(item.nameKey)}
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </>
    );
}
