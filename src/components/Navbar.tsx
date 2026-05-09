import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';
import MenuSearch from './MenuSearch';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, login, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#menu', label: t('nav.menu') },
    { href: '#story', label: t('nav.story') },
    { href: '#reservations', label: t('nav.reservations') },
    { href: '#order', label: t('nav.order') },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="text-2xl font-serif font-bold tracking-tight text-gold-900 focus:outline-none">
          LALEZAR
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              className="text-sm font-display font-medium tracking-widest uppercase hover:text-gold-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex items-center space-x-6 border-l border-gray-200 pl-8 ml-4">
            <MenuSearch />
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLanguage('en')}
                className={cn("text-xs font-bold", language === 'en' ? "text-gold-600" : "text-gray-400")}
              >
                EN
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => setLanguage('tr')}
                className={cn("text-xs font-bold", language === 'tr' ? "text-gold-600" : "text-gray-400")}
              >
                TR
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-gold-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                    <UserIcon size={16} />
                  </div>
                )}
                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                className="flex items-center gap-2 text-xs font-display font-bold tracking-widest uppercase text-gold-700 hover:text-gold-500 transition-colors"
                id="navbar-login-btn"
              >
                <LogIn size={16} />
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setLanguage('en')} className={cn("text-sm font-bold", language === 'en' ? "text-gold-600" : "text-gray-400")}>ENGLISH</button>
                    <button onClick={() => setLanguage('tr')} className={cn("text-sm font-bold", language === 'tr' ? "text-gold-600" : "text-gray-400")}>TÜRKÇE</button>
                  </div>
                </div>

                {user ? (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full" />
                      <span className="font-serif text-sm font-medium">{user.displayName}</span>
                    </div>
                    <button onClick={logout} className="text-red-500">
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={login}
                    className="w-full bg-gold-600 text-white font-display uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <LogIn size={18} />
                    Login with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
