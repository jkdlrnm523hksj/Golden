import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

export default function MenuSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('Appetizers');

  const categories: MenuItem['category'][] = ['Appetizers', 'Mains', 'Desserts', 'Drinks'];

  return (
    <section id="menu" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-gold-600 font-display font-medium tracking-widest uppercase text-xs mb-4 block">
          Taste the Tradition
        </span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('menu.title')}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          {t('menu.subtitle')}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center space-x-8 mb-16 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "text-sm font-display tracking-widest uppercase pb-2 transition-all relative whitespace-nowrap",
              activeCategory === cat ? "text-gold-900 border-b-2 border-gold-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {MENU_ITEMS.filter(item => item.category === activeCategory).map((item) => (
          <motion.div 
            layout
            key={item.id} 
            className="flex flex-col md:flex-row items-center gap-6 text-left group"
          >
            {item.image && (
              <div className="w-full md:w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="flex-1 w-full">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-serif font-medium">{item.name}</h3>
                <span className="text-gold-700 font-display font-medium w-max ml-4 whitespace-nowrap">
                  {item.price} TL
                </span>
              </div>
              <p className="text-gray-500 text-sm font-light italic leading-snug">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button className="border border-gold-600 text-gold-700 font-display px-8 py-3 rounded-full hover:bg-gold-50 transition-colors uppercase tracking-widest text-xs">
          View Full Menu
        </button>
      </div>
    </section>
  );
}
