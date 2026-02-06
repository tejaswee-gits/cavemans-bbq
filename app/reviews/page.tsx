'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Footer from '@/components/Footer';
import ReviewForm from '@/components/ReviewForm';

const REVIEWS = [
    { id: 1, name: "Karl Turkovic", role: "Local Guide - 18 Tales", text: "The best beef brisket I've ever had and I travelled the USA (including Texas) for 2 months. A complete surprise being on the outskirts of Paris.", img: "https://i.pravatar.cc/150?u=karl", rating: 5, date: "2 days ago" },
    { id: 2, name: "Mehdi Mohammed", role: "Gastronomic", text: "Très bon restaurant, agréable surprise ! Gérant très aimable, à l'écoute des demandes de ma famille, et une cuisine halal orientée viande de très bonne qualité.", img: "https://i.pravatar.cc/150?u=mehdi", rating: 5, date: "1 week ago" },
    { id: 3, name: "Sarah Jenkins", role: "Weekend Warrior", text: "Amazing atmosphere! We came for dinner and stayed for the vibes. The pulled pork sliders are a must-try. A bit loud on Friday nights but worth it.", img: "https://i.pravatar.cc/150?u=sarah", rating: 4, date: "2 weeks ago" },
    { id: 4, name: "Jean Dupont", role: "BBQ Purist", text: "C'est magnifique! Une pépite pour les amateurs de barbecue à Colombes. Service impeccable et accueil chaleureux.", img: "https://i.pravatar.cc/150?u=jean", rating: 5, date: "3 weeks ago" },
    { id: 5, name: "Maria Garcia", role: "Foodie", text: "Incredible smoky flavor. The ribs are to die for. Will be coming back every week.", img: "https://i.pravatar.cc/150?u=maria", rating: 5, date: "1 month ago" },
    { id: 6, name: "Tom Holland", role: "Actor", text: "Actually stumbled upon this place while filming. The owner didn't even recognize me, just gave me extra ribs. 10/10.", img: "https://i.pravatar.cc/150?u=tom", rating: 5, date: "1 month ago" },
];

export default function ReviewsPage() {

    return (
        <main className="min-h-screen bg-mustard">
            <div className="pt-24 pb-12 px-4 text-center">
                <h1 className="text-[12vw] font-header uppercase leading-[0.8] mb-8 text-charcoal">
                    THE TRIBES <br /> <span className="text-white text-stroke-charcoal">VERDICT</span>
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Stats & Form */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-charcoal text-cream p-8 border-4 border-white shadow-[8px_8px_0px_#E84A42] sticky top-32">
                            <div className="text-center">
                                <span className="font-header text-8xl text-caveman-red">4.8</span>
                                <div className="flex justify-center text-mustard text-2xl my-4">★★★★★</div>
                                <p className="font-body text-sm uppercase opacity-70 mb-6">Based on 342 verified carnivores</p>
                                <hr className="border-cream/20 mb-6" />
                                <div className="space-y-2 font-body text-sm">
                                    <div className="flex justify-between items-center">
                                        <span>5 Stars</span>
                                        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-caveman-red"></div></div>
                                        <span>90%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>4 Stars</span>
                                        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[8%] h-full bg-caveman-red"></div></div>
                                        <span>8%</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-50">
                                        <span>3 Stars</span>
                                        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[1%] h-full bg-caveman-red"></div></div>
                                        <span>1%</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-50">
                                        <span>2 Stars</span>
                                        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[1%] h-full bg-caveman-red"></div></div>
                                        <span>1%</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-50">
                                        <span>1 Star</span>
                                        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[0%] h-full bg-caveman-red"></div></div>
                                        <span>0%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Review List */}
                    <div className="lg:col-span-8">
                        <ReviewForm />

                        <div className="space-y-8">
                            {REVIEWS.map((review, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    key={review.id}
                                    className="bg-cream border-4 border-charcoal p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.1)] group hover:shadow-[12px_12px_0px_#1A1A1A] transition-all"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <img src={review.img} className="w-20 h-20 rounded-full border-4 border-charcoal object-cover bg-gray-300" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-header text-2xl uppercase text-charcoal">{review.name}</h4>
                                                    <span className="font-body text-xs font-bold text-caveman-red uppercase">{review.role}</span>
                                                </div>
                                                <span className="bg-charcoal text-white px-2 py-1 text-xs font-bold">{review.date}</span>
                                            </div>
                                            <div className="text-mustard text-xl mb-4">{Array(review.rating).fill('★').join('')}</div>
                                            <p className="font-body text-lg leading-relaxed text-charcoal/90 italic">"{review.text}"</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
