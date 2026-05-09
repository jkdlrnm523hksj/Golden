import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.story': 'Our Story',
    'nav.reservations': 'Reservations',
    'nav.order': 'Order Online',
    'nav.contact': 'Contact',
    'hero.title': 'Artisan Turkish Kitchen',
    'hero.subtitle': 'A journey through the rich heritage of Anatolian flavors, reimagined for the modern palate.',
    'hero.cta': 'Book a Table',
    'hero.order': 'Order Online',
    'order.title': 'Bring Lalezar to Your Home',
    'order.subtitle': 'Our online ordering system is coming soon. Soon you will be able to enjoy our artisan flavors from the comfort of your own home.',
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Each dish is a masterpiece crafted with local, seasonal ingredients and ancient techniques.',
    'reservation.title': 'Reserve Your Experience',
    'reservation.subtitle': 'Join us for an unforgettable evening of hospitality and flavor.',
    'contact.title': 'Visit Us',
    'footer.about': 'Lalezar is a tribute to the timeless beauty of Turkish culinary arts, where tradition meets contemporary innovation.',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.menu': 'Menü',
    'nav.story': 'Hikayemiz',
    'nav.reservations': 'Rezervasyon',
    'nav.order': 'Online Sipariş',
    'nav.contact': 'İletişim',
    'hero.title': 'Zanaatkar Türk Mutfağı',
    'hero.subtitle': 'Anadolu lezzetlerinin zengin mirasında modern bir dokunuşla unutulmaz bir yolculuk.',
    'hero.cta': 'Masa Ayırt',
    'hero.order': 'Online Sipariş',
    'order.title': 'Lalezar\'ı Evinize Taşıyın',
    'order.subtitle': 'Online sipariş sistemimiz yakında hizmetinizde olacak. Çok yakında zanaatkar lezzetlerimizi evinizin konforunda tadabileceksiniz.',
    'menu.title': 'Menümüz',
    'menu.subtitle': 'Her yemek yerel, mevsimlik malzemeler ve kadim tekniklerle hazırlanmış bir başyapıttır.',
    'reservation.title': 'Deneyiminizi Rezerve Edin',
    'reservation.subtitle': 'Misafirperverlik ve lezzet dolu unutulmaz bir akşam için bize katılın.',
    'contact.title': 'Bizi Ziyaret Edin',
    'footer.about': 'Lalezar, Türk mutfak sanatlarının zamansız güzelliğine, geleneğin çağdaş yenilikle buluştuğu bir saygı duruşudur.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
