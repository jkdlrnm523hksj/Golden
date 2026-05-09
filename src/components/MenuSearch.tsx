import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Utensils } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { cn } from '../lib/utils';

export default function MenuSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MENU_ITEMS.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-gold-600 transition-colors"
        aria-label="Search Menu"
      >
        <Search size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <Search size={24} className="text-gold-600" />
                <input 
                  autoFocus
                  placeholder="Search our artisan menu..."
                  className="flex-1 text-lg font-serif outline-none placeholder:text-gray-300"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="p-12 text-center text-gray-400">
                    <Utensils size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="font-light italic">Search by name or description (e.g., "lamb", "baklava")</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-4">
                    {results.map((item) => (
                      <a 
                        key={item.id}
                        href="#menu"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gold-50 transition-colors group"
                      >
                        {item.image ? (
                          <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600">
                             <Utensils size={24} />
                          </div>
                        )}
                        <div>
                          <h4 className="font-serif font-bold text-gray-900 group-hover:text-gold-900 transition-colors">{item.name}</h4>
                          <p className="text-xs text-gray-400 font-light line-clamp-1 italic">{item.description}</p>
                          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-600 mt-1 block">{item.category}</span>
                        </div>
                        <div className="ml-auto text-sm font-display font-bold text-gold-700">
                          {item.price} TL
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-400">
                    <p className="font-light italic">No items found matching "{query}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
