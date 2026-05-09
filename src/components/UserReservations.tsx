import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Reservation } from '../types';

export default function UserReservations() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const path = 'reservations';
    const q = query(
      collection(db, path),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as Reservation[];
        setReservations(docs);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    
    setIsCancelling(id);
    const path = `reservations/${id}`;
    try {
      await updateDoc(doc(db, 'reservations', id), {
        status: 'cancelled'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setIsCancelling(null);
    }
  };

  if (!user || reservations.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-display font-medium tracking-widest uppercase text-xs mb-4 block">
            Your History
          </span>
          <h2 className="text-4xl font-serif mb-6">Recent Bookings</h2>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {reservations.map((res) => (
              <motion.div
                key={res.id}
                layout
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <div 
                  className={cn(
                    "p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors",
                    expandedId === res.id && "bg-gray-50"
                  )}
                  onClick={() => setExpandedId(expandedId === res.id ? null : res.id)}
                >
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-xs font-display uppercase tracking-widest text-gray-400 mb-1">Date</div>
                      <div className="font-serif font-bold text-gold-900">{res.date}</div>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
                    <div className="hidden sm:block">
                      <div className="text-xs font-display uppercase tracking-widest text-gray-400 mb-1">Status</div>
                      <div className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                        res.status === 'confirmed' ? "bg-green-100 text-green-700" :
                        res.status === 'pending' ? "bg-gold-100 text-gold-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {res.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Users size={14} /> <span className="text-xs">{res.guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={14} /> <span className="text-xs">{res.time}</span>
                      </div>
                    </div>
                    {expandedId === res.id ? <ChevronUp size={20} className="text-gold-600" /> : <ChevronDown size={20} className="text-gray-300" />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === res.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100 bg-gray-50/50 px-6 py-8"
                    >
                      <div className="grid md:grid-cols-2 gap-12">
                        <div>
                          <h4 className="text-[10px] font-display uppercase tracking-[0.2em] text-gray-400 mb-4">Reservation Details</h4>
                          <ul className="space-y-4">
                            <li className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-xs text-gray-500">Reference ID</span>
                              <span className="text-xs font-mono font-bold text-gray-900">{res.id?.slice(-8).toUpperCase()}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-xs text-gray-500">Phone</span>
                              <span className="text-xs font-bold text-gray-900">{res.phone}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-xs text-gray-500">Email</span>
                              <span className="text-xs font-bold text-gray-900">{res.email}</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-display uppercase tracking-[0.2em] text-gray-400 mb-4">Special Requests</h4>
                          <p className="text-sm font-light text-gray-600 leading-relaxed italic border-l-2 border-gold-300 pl-4 mb-6">
                            {res.notes || 'No special requests provided.'}
                          </p>
                          
                          {res.status === 'pending' && (
                            <button
                              onClick={() => handleCancel(res.id!)}
                              disabled={isCancelling === res.id}
                              className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                            >
                              <XCircle size={14} />
                              {isCancelling === res.id ? 'Processing...' : 'Cancel Reservation'}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
