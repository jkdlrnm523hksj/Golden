import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Story() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-24 px-6 bg-gold-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
            <img 
              src="/src/assets/images/turkish_chef_portrait_1778310546092.png" 
              alt="Chef Selim Aras" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Accent decoration */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold-200 rounded-[30px] -z-10" />
          <div className="absolute -top-10 -left-10 text-[120px] font-serif text-gold-200/50 -z-10 select-none">
            Heritage
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-8">
          <span className="text-gold-600 font-display font-medium tracking-widest uppercase text-xs block">
            Our Legacy
          </span>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            A Culinary Love Letter <br />
            <span className="italic">to the Bosphorus</span>
          </h2>
          <div className="space-y-6 text-gray-600 font-light leading-relaxed">
            <p>
              Founded in the heart of Karaköy, Lalezar began as a vision to celebrate the forgotten recipes of the Ottoman palace and the vibrant street food culture of modern Istanbul.
            </p>
            <p>
              Our culinary director, Chef Selim Aras, spent years traversing the Anatolian plateau, gathering heirloom seeds and learning the subtle arts of stone-ground spices and slow-fire roasting.
            </p>
            <p className="font-serif italic text-lg text-gold-800">
              "We don't just serve food; we serve a thousand-year-old story of hospitality."
            </p>
          </div>
          
          <div className="pt-4 flex items-center gap-6">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i+10}`} 
                      alt="Reviewer" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                 </div>
               ))}
            </div>
            <p className="text-xs font-display tracking-widest text-gray-400">
              Trusted by 5000+ <br />Discerning Diners
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
