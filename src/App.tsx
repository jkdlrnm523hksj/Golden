/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { doc, getDocFromCache, getDocFromServer } from 'firebase/firestore';
import { db } from './lib/firebase';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/Menu';
import Story from './components/Story';
import ReservationForm from './components/ReservationForm';
import UserReservations from './components/UserReservations';
import OrderSection from './components/OrderSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

// Image paths from earlier generation
const HERO_IMAGE = '/src/assets/images/hero_restaurant_interior_1778310371955.png';
const MEZZE_IMAGE = '/src/assets/images/turkish_mezze_spread_1778310387756.png';
const KEBAP_IMAGE = '/src/assets/images/turkish_kebap_main_1778310410081.png';

export default function App() {
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen">
          <Navbar />
          <Hero heroImage={HERO_IMAGE} />
          <Story />
          <MenuSection />
          <ReservationForm />
          <UserReservations />
          <OrderSection />
          <MapSection />
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

