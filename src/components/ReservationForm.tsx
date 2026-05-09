import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Calendar, Users, Clock, Mail, Phone, User } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const reservationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guests: z.number().min(1).max(20),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export default function ReservationForm() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { 
      guests: 2,
      name: user?.displayName || '',
      email: user?.email || '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
    }
  });

  // Pre-fill when user changes
  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: ReservationFormValues) => {
    const path = 'reservations';
    try {
      await addDoc(collection(db, path), {
        ...data,
        userId: user?.uid || 'guest',
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      alert('Thank you! Your reservation request has been received.');
      reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  return (
    <section id="reservations" className="py-24 px-6 bg-gold-900 text-white relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold-200 font-display font-medium tracking-widest uppercase text-xs mb-4 block">
            Join Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('reservation.title')}</h2>
          <p className="text-gold-100/70 max-w-xl mx-auto font-light">
            {t('reservation.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-card shadow-2xl p-8 md:p-12 rounded-[2rem] bg-gold-900/40 border-2 border-white/10 backdrop-blur-3xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Name */}
            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-200/80 flex items-center gap-2">
                <User size={12} className="text-gold-500" /> Full Name
              </label>
              <input 
                {...register('name')}
                placeholder="John Doe"
                className={cn(
                  "w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-gold-500 focus:bg-black/60 transition-all shadow-inner",
                  errors.name && "border-red-500/50 bg-red-950/20"
                )}
              />
              {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase pl-2">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-200/80 flex items-center gap-2">
                <Mail size={12} className="text-gold-500" /> Email Address
              </label>
              <input 
                {...register('email')}
                placeholder="john@example.com"
                className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-gold-500 focus:bg-black/60 transition-all shadow-inner"
                type="email"
              />
            </div>

            {/* Date */}
            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-200/80 flex items-center gap-2">
                <Calendar size={12} className="text-gold-500" /> Date
              </label>
              <input 
                {...register('date')}
                className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 focus:bg-black/60 transition-all shadow-inner appearance-none"
                type="date"
              />
            </div>

            {/* Time */}
            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-200/80 flex items-center gap-2">
                <Clock size={12} className="text-gold-500" /> Preferred Time
              </label>
              <select 
                {...register('time')}
                className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 focus:bg-black/60 transition-all shadow-inner appearance-none cursor-pointer"
              >
                <option value="19:00" className="bg-gold-950">19:00 (Evening)</option>
                <option value="19:30" className="bg-gold-950">19:30 (Evening)</option>
                <option value="20:00" className="bg-gold-950">20:00 (Night)</option>
                <option value="20:30" className="bg-gold-950">20:30 (Night)</option>
                <option value="21:00" className="bg-gold-950">21:00 (Late Night)</option>
              </select>
            </div>

            {/* Guests */}
            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-200/80 flex items-center gap-2">
                <Users size={12} className="text-gold-500" /> Number of Guests
              </label>
              <input 
                {...register('guests', { valueAsNumber: true })}
                className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 focus:bg-black/60 transition-all shadow-inner"
                type="number"
                min="1"
                max="20"
              />
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-200/80 flex items-center gap-2">
                <Phone size={12} className="text-gold-500" /> Phone Number
              </label>
              <input 
                {...register('phone')}
                placeholder="+90 5XX XXX XX XX"
                className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-gold-500 focus:bg-black/60 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Notes - Multi-line */}
          <div className="space-y-3 mb-12">
            <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-200/80 flex items-center gap-2">
              Special Requests / Dietary Needs
            </label>
            <textarea 
              {...register('notes')}
              placeholder="Tell us about allergies, special occasions, or table preferences..."
              rows={3}
              className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-gold-500 focus:bg-black/60 transition-all shadow-inner resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold-500 hover:bg-gold-400 text-white font-display font-semibold uppercase tracking-widest py-4 rounded-xl shadow-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending Request...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </section>
  );
}
