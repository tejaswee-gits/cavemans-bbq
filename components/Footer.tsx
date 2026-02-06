'use client';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-cream pt-32 pb-12 px-4 md:px-8 overflow-hidden relative">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <h2 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.9] font-header uppercase mb-8 text-center max-w-5xl mx-auto">
                        ALORS, ON <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">MANGE ?</span>
                    </h2>
                </motion.div>

                <p className="font-body text-xl md:text-2xl max-w-2xl text-cream/70 mb-16 leading-relaxed font-light">
                    Ready to join the tribe? Our pits are fired up and the beer is ice cold. Whether you're a lone hunter or part of a large pack, we've got the space.
                </p>

                <div className="flex flex-col md:flex-row gap-8 z-10 w-full md:w-auto">
                    <button className="group relative px-10 py-5 bg-caveman-red border-4 border-white text-white font-header text-2xl uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(232,74,66,0.4)] hover:shadow-[0_0_50px_rgba(232,74,66,0.6)]">
                        <span className="relative z-20 font-bold group-hover:text-white transition-colors duration-300">BOOK A TABLE</span>
                        {/* Fire effect background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500 via-orange-600 to-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10" />
                    </button>

                    <button className="px-10 py-5 bg-transparent border-4 border-white text-white font-header text-2xl uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors">
                        View Events
                    </button>
                </div>

                <div className="mt-32 w-full grid grid-cols-1 md:grid-cols-4 gap-12 text-left border-t border-cream/10 pt-16">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-header text-3xl mb-4 leading-none">CAVEMAN'S<br />BAR-B-QUE</h3>
                        <p className="font-body text-sm opacity-60 mt-4 leading-relaxed">
                            1 RUE ESTELLE ROUAT<br />
                            92700 COLOMBES
                        </p>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-header text-xl text-mustard mb-4">OPEN HOURS</h3>
                        <p className="font-body text-sm opacity-60 font-medium">MON - FRI: 17H - 23H</p>
                        <p className="font-body text-sm opacity-60 font-medium">SAT - SUN: 12H - 00H</p>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-header text-xl text-mustard mb-4">SOCIALS</h3>
                        <div className="flex flex-col space-y-2 font-body text-sm opacity-60 font-bold tracking-wider">
                            <a href="#" className="hover:text-caveman-red transition-colors flex items-center gap-2">INSTAGRAM</a>
                            <a href="#" className="hover:text-caveman-red transition-colors flex items-center gap-2">FACEBOOK</a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-[10px] uppercase opacity-30 font-body w-full flex flex-col md:flex-row justify-between items-center gap-4">
                    <span>© 2026 CAVEMAN'S BBQ. NO FORKS REQUIRED.</span>
                    <div className="flex gap-4">
                        <span className="cursor-pointer hover:text-white">PRIVACY</span>
                        <span className="cursor-pointer hover:text-white">TERMS</span>
                        <span className="cursor-pointer hover:text-white">COOKIES</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
