import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Truck, Clock, BellRing } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { NotificationService } from '../services/notificationService';

export default function OrderSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    
    const granted = await NotificationService.requestPermission();
    if (granted) {
      setIsSubscribed(true);
      NotificationService.simulateOrderFlow();
      setEmail('');
    } else {
      alert('Please enable notifications to receive order updates.');
    }
  };

  const features = [
    { icon: <ShoppingBag />, title: 'Curated Packs', desc: 'Hand-picked combinations of our favorite mezzes and mains.' },
    { icon: <Truck />, title: 'Luxury Delivery', desc: 'Carefully packaged to maintain temperature and presentation.' },
    { icon: <Clock />, title: 'Scheduled Pickup', desc: 'Ready exactly when you arrive at our Karaköy location.' }
  ];

  return (
    <section id="order" className="py-24 px-6 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <span className="text-gold-600 font-display font-medium tracking-widest uppercase text-xs block">
              Coming Soon
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              {t('order.title')}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed max-w-xl">
              {t('order.subtitle')}
            </p>
            
            <div className="grid sm:grid-cols-1 gap-6 pt-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="p-3 bg-gold-50 text-gold-600 rounded-xl">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-gray-900 mb-1">{f.title}</h4>
                    <p className="text-xs text-gray-400 font-light">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              {!isSubscribed ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Join the waitlist" 
                    className="bg-white border border-gray-200 rounded-full px-6 py-4 flex-1 focus:outline-none focus:border-gold-600 transition-colors"
                  />
                  <button 
                    onClick={handleSubscribe}
                    className="bg-gold-900 text-white font-display px-8 py-4 rounded-full uppercase tracking-widest text-xs hover:bg-gold-800 transition-all flex items-center justify-center gap-2"
                  >
                    <BellRing size={16} />
                    Notify Me
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-4 text-green-800"
                >
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <BellRing size={20} />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-sm">You're on the list!</p>
                    <p className="text-xs opacity-70">We'll notify you with a test order alert shortly.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=1000" 
                alt="Ordering Experience" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold-900/10 mix-blend-multiply" />
            </div>
            
            {/* Floating badge */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-[200px]"
            >
              <p className="text-gold-900 font-serif italic text-lg leading-tight mb-2">"Gourmet at your doorstep."</p>
              <div className="flex items-center gap-2">
                <div className="flex text-gold-500">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-xs">★</span>)}
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Soon</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
