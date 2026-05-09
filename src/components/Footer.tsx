import { useLanguage } from '../contexts/LanguageContext';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <h2 className="text-3xl font-serif mb-6 text-gold-900 tracking-tight">LALEZAR</h2>
            <p className="text-gray-500 font-light max-w-sm leading-relaxed mb-8">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gold-600 hover:border-gold-600 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gold-600 hover:border-gold-600 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gold-600 hover:border-gold-600 transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div className="col-span-2">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">Moments from Lalezar</h4>
            <div className="grid grid-cols-4 gap-2">
              {[
                'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400',
                'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=400',
                'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=400',
                'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=400'
              ].map((url, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden group relative cursor-pointer">
                  <img src={url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gold-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Instagram size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">Hours</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-gold-900">12:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-gold-900">12:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-gold-900">10:00 - 22:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">Contact</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-600 mt-1 flex-shrink-0" />
                <span>Kemankeş Karamustafa Paşa, Karaköy, 34425 Beyoğlu/İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-600 flex-shrink-0" />
                <span>+90 212 555 12 34</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-600 flex-shrink-0" />
                <span>hello@lalezar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-display tracking-widest text-gray-400">
          <p>© 2026 Lalezar Artisan Kitchen. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-gold-600">Privacy Policy</a>
            <a href="#" className="hover:text-gold-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
