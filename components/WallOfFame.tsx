'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const REVIEWS = [
    { id: 1, name: "Karl Turkovic", role: "Local Guide - 18 Tales", text: "The best beef brisket I've ever had and I travelled the USA (including Texas) for 2 months. A complete surprise being on the outskirts of Paris.", img: "https://i.pravatar.cc/150?u=karl" },
    { id: 2, name: "Mehdi Mohammed", role: "Gastronomic", text: "Très bon restaurant, agréable surprise ! Gérant très aimable, à l'écoute des demandes de ma famille, et une cuisine halal orientée viande de très bonne qualité.", img: "https://i.pravatar.cc/150?u=mehdi" },
    { id: 3, name: "Sarah Jenkins", role: "Weekend Warrior", text: "Amazing atmosphere! We came for dinner and stayed for the vibes. The pulled pork sliders are a must-try. A bit loud on Friday nights but worth it.", img: "https://i.pravatar.cc/150?u=sarah" },
    { id: 4, name: "Jean Dupont", role: "BBQ Purist", text: "C'est magnifique! Une pépite pour les amateurs de barbecue à Colombes. Service impeccable et accueil chaleureux.", img: "https://i.pravatar.cc/150?u=jean" },
    { id: 5, name: "Maria Garcia", role: "Foodie", text: "Incredible smoky flavor. The ribs are to die for. Will be coming back every week.", img: "https://i.pravatar.cc/150?u=maria" },
];

export default function WallOfFame() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[250vh] bg-cream">
            <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden">

                {/* Sticky Score */}
                <div className="w-full md:w-[40%] flex flex-col items-center justify-center p-8 z-20 bg-cream md:border-r-4 border-charcoal relative">
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cream to-transparent z-10 pointer-events-none" />

                    <div className="text-center relative z-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block bg-charcoal text-cream px-4 py-1 mb-4 font-body uppercase text-sm tracking-widest rotate-2"
                        >
                            Top Notch
                        </motion.div>
                        <h2 className="text-[10rem] md:text-[15rem] leading-[0.8] font-header text-mustard drop-shadow-[8px_8px_0px_#1A1A1A]">
                            4.6
                        </h2>
                        <div className="flex justify-center space-x-2 text-caveman-red text-4xl mb-6 my-4">
                            {[...Array(4)].map((_, i) => <span key={i}>★</span>)}
                            <span className="opacity-50 relative overflow-hidden inline-block">★<span className="absolute left-0 top-0 w-[60%] overflow-hidden text-caveman-red">★</span></span>
                        </div>
                        <p className="font-header text-2xl uppercase tracking-wide mb-8">Based on 248 Tales of Glory</p>
                        <p className="font-body text-charcoal/60 text-sm max-w-xs mx-auto mb-8">Real reviews from our favorite carnivores.</p>
                        <a href="/reviews" className="bg-teal-600 px-8 py-3 font-header text-xl uppercase text-cream border-2 border-charcoal shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-1 hover:shadow-none transition-all transform -rotate-1 hover:rotate-0 inline-block">
                            Tell Us Your Tale
                        </a>
                    </div>
                </div>

                {/* Horizontal Scroll Area */}
                <div className="w-full md:w-[60%] h-full flex items-center overflow-hidden bg-cream relative">
                    {/* Background Text */}
                    <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[10rem] font-header text-charcoal opacity-5 whitespace-nowrap -rotate-12 pointer-events-none select-none">
                        WALL OF FAME
                    </div>

                    <motion.div style={{ x }} className="flex gap-16 pl-12 will-change-transform items-center">
                        {REVIEWS.map((review) => (
                            <div
                                key={review.id}
                                className="flex-shrink-0 w-[350px] md:w-[450px] bg-white border-4 border-charcoal p-8 relative shadow-[10px_10px_0px_#E84A42] transition-transform duration-300 transform even:rotate-2 odd:-rotate-1 hover:rotate-0 hover:scale-105 z-10"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={review.img} alt={review.name} className="w-16 h-16 rounded-full border-2 border-charcoal grayscale object-cover" />
                                    <div>
                                        <h4 className="font-header text-2xl uppercase">{review.name}</h4>
                                        <p className="font-body text-xs text-brand-blue uppercase font-bold text-teal-600">{review.role}</p>
                                    </div>
                                </div>

                                <div className="flex text-caveman-red mb-4 text-lg">★★★★★</div>

                                <p className="font-body text-lg italic leading-relaxed text-charcoal">
                                    "{review.text}"
                                </p>

                                <div className="mt-4 flex gap-2">
                                    {review.id === 1 && <span className="text-[0.6rem] border border-charcoal px-2 py-1 bg-gray-100">BRISKET</span>}
                                    {review.id === 1 && <span className="text-[0.6rem] border border-charcoal px-2 py-1 bg-gray-100">TEXAS STYLE</span>}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
