'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';
import HappyHourModal from '@/components/HappyHourModal';
import BrisketAnimation from '@/components/BrisketAnimation';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function Home() {
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [showHappyHour, setShowHappyHour] = useState(false);
  const { t } = useLanguage();

  const handleLoadingComplete = () => {
    setLoadingFinished(true);
    setShowHappyHour(true);
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-caveman-red selection:text-white overflow-x-hidden">
      {!loadingFinished && <LoadingScreen onComplete={handleLoadingComplete} />}
      <HappyHourModal isOpen={showHappyHour} onClose={() => setShowHappyHour(false)} />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-cream z-10">

        {/* Frame Animation Background */}
        <div className="absolute inset-0 z-0">
          <div className="opacity-60 w-full h-full">
            <BrisketAnimation />
          </div>
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        {/* Big Text Background */}
        <div className="w-full text-center flex flex-col space-y-4 md:space-y-[-4rem] z-20 select-none pointer-events-none mt-16 md:mt-0">
          <h1 className="text-[12vw] md:text-[18vw] font-header text-caveman-red leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">{t('menu.header_eat')}.</h1>
          <h1 className="text-[12vw] md:text-[18vw] font-header text-caveman-red leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">{t('menu.header_drink')}.</h1>
          <h1 className="text-[12vw] md:text-[18vw] font-header text-caveman-red leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">{t('menu.header_repeat')}.</h1>
        </div>

        <div className="absolute bottom-20 z-20 text-center uppercase tracking-[0.2em] text-white/80 font-header text-sm md:text-xl drop-shadow-lg">
          {t('home.hero_sub')}
        </div>
      </section>

      {/* 2. ORANGE INTRODUCTION SECTION */}
      <section className="bg-[#D64933] py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 text-white">
        <div className="md:w-1/2">
          <h2 className="text-5xl md:text-7xl font-header uppercase leading-[0.9]">
            {t('home.intro_title')}
          </h2>
        </div>
        <div className="md:w-1/2 font-body text-sm md:text-base leading-relaxed opacity-90 space-y-6">
          <p>{t('home.intro_text_1')}</p>
          <p>{t('home.intro_text_2')}</p>
        </div>
      </section>

      {/* 3. BRISKET SPLIT SECTION */}
      <section className="flex flex-col md:flex-row h-auto md:h-[600px] group">
        <div className="w-full md:w-1/2 relative bg-black overflow-hidden">
          <motion.div
            whileInView={{ scale: 1.1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full w-full"
          >
            <img
              src="/brisket-hero.jpg"
              alt="Brisket"
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[10vw] font-header text-white/10 uppercase tracking-tighter mix-blend-overlay">BLACK GOLD</h2>
          </div>
          {/* Story Badge */}
          <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md p-4 border-l-4 border-caveman-red max-w-xs text-xs text-white/80 font-body leading-relaxed md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {t('home.brislet_badge')}
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-[#D64933] p-12 md:p-20 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 opacity-10 rotate-12">
            <span className="text-[20rem]">🔥</span>
          </div>

          <div className="mb-6 relative z-10">
            <span className="text-5xl">🍴</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-header uppercase mb-6 underline decoration-4 decoration-white/30 underline-offset-8 relative z-10">
            {t('home.low_slow_title')}
          </h3>
          <p className="font-body text-lg leading-relaxed opacity-90 relative z-10">
            {t('home.low_slow_1')}
          </p>
          <p className="font-body text-lg leading-relaxed opacity-90 mt-4 relative z-10">
            {t('home.low_slow_2')}
          </p>
        </div>
      </section>

      {/* 4. HISTORY SECTION */}
      <section className="bg-cream py-24 px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        <div className="md:w-1/2 flex justify-center relative">
          <div className="absolute inset-0 bg-caveman-red/10 rounded-full blur-3xl transform scale-75"></div>
          <motion.img
            initial={{ rotate: -2 }}
            whileInView={{ rotate: 2 }}
            transition={{ duration: 0.5, type: "spring" }}
            src="/ribs-plate.jpg"
            alt="Ribs plate"
            className="w-full max-w-md object-contain drop-shadow-2xl relative z-10 rounded-xl"
          />
        </div>
        <div className="md:w-1/2 relative">
          <span className="absolute -top-10 -left-10 text-[10rem] text-charcoal opacity-5 font-header z-0">{t('home.history_year')}</span>
          <h2 className="text-5xl font-header uppercase text-charcoal mb-6 relative z-10">{t('home.history_title')}<br /><span className="text-caveman-red">{t('home.history_subtitle')}</span></h2>

          <p className="font-body text-charcoal/70 mb-4 leading-relaxed relative z-10 font-bold">
            {t('home.history_text_1')}
          </p>
          <p className="font-body text-charcoal/70 mb-8 leading-relaxed relative z-10">
            {t('home.history_text_2')}
          </p>

          <div className="border-l-4 border-caveman-red pl-6 italic text-charcoal/80 bg-white p-4 shadow-lg transform rotate-1 relative z-10">
            {t('home.history_quote')}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION (SURVIVORS) */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Concrete Background */}
        <div className="absolute inset-0 z-0">
          <img src="/concrete-bg.jpg" alt="Concrete" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[#1A1A1A] opacity-90" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-header uppercase text-caveman-red text-center mb-16">
            {t('home.survivors_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-cream">
            {[
              { name: "Karl Turkovic", desc: "Local Guide", text: "The best beef brisket I've ever had... A complete surprise!", initials: "KT" },
              { name: "Mehdi Mohammed", desc: "Gastronomic", text: "Super accueil, cuisine halal, viande de très bonne qualité. Je reviendrai!", initials: "MM" },
              { name: "Sarah B.", desc: "Meat Lover", text: "Une tuerie monumentale. Les travers de porc se détachent tout seuls. Ambiance au top.", initials: "SB" }
            ].map((review, i) => (
              <div key={i} className="bg-[#222]/80 backdrop-blur-sm border border-white/10 p-8 flex flex-col gap-4 shadow-xl">
                <div className="flex text-caveman-red text-sm mb-2 gap-1">
                  <Star size={16} fill="#E84A42" />
                  <Star size={16} fill="#E84A42" />
                  <Star size={16} fill="#E84A42" />
                  <Star size={16} fill="#E84A42" />
                  <Star size={16} fill="#E84A42" />
                </div>
                <p className="italic font-body opacity-80 mb-4">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-caveman-red flex items-center justify-center font-bold text-xs text-white shadow-lg">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-header uppercase text-sm">{review.name}</div>
                    <div className="text-[10px] uppercase text-caveman-red tracking-wider">{review.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BIG FOOTER SECTION */}
      <footer className="relative text-cream py-24 overflow-hidden">
        {/* Smoke Background */}
        <div className="absolute inset-0 z-0">
          <img src="/smoke-bg.jpg" alt="Smoke" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" /> {/* Darken overlay */}
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-6xl md:text-8xl font-header uppercase mb-12 drop-shadow-xl text-white">
            {t('home.footer_title')}
          </h2>
          <Link href="/menu?action=reserve">
            <button className="bg-[#D64933] text-white font-header text-2xl md:text-3xl uppercase py-4 px-12 border-b-8 border-[#a33220] hover:translate-y-1 hover:border-b-4 transition-all shadow-2xl">
              {t('common.reserve_btn')}
            </button>
          </Link>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-12 text-xs md:text-sm uppercase font-bold tracking-widest text-center text-white/80">
            <div className="flex flex-col gap-2">
              <span className="text-[#EBCB6B] mb-2">{t('home.address_title')}</span>
              <p>1 rue Estelle Rouat,<br />92700 Colombes</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#EBCB6B] mb-2">{t('home.hours_title')}</span>
              <p>{t('home.hours_days')}</p>
              <p>12:00 - 15:00 / 19:00 - 23:00</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#EBCB6B] mb-2">{t('home.contact_title')}</span>
              <p>01 23 45 67 89</p>
              <p>hello@cavemansbbq.fr</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
