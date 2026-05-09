import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero({ heroImage }: { heroImage: string }) {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Restaurant Interior" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-gold-200 font-display font-semibold tracking-[0.3em] uppercase text-xs mb-6 block">
            Istanbul's Finest
          </span>
          <h1 className="text-5xl md:text-8xl text-white font-serif mb-8 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light mb-12 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#reservations"
              className="inline-block bg-gold-600 hover:bg-gold-500 text-white font-display px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl uppercase tracking-widest text-sm"
            >
              {t('hero.cta')}
            </a>
            <a 
              href="#order"
              className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-display px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl uppercase tracking-widest text-sm"
            >
              {t('hero.order')}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-12 bg-white/30 mb-4" />
        <span className="text-white/50 text-[10px] font-display tracking-[0.4em] uppercase rotate-90 origin-left mt-2">Scroll</span>
      </div>
    </section>
  );
}
