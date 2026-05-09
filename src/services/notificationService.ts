
export class NotificationService {
  static async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  static async send(title: string, options?: NotificationOptions) {
    if (Notification.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    const defaultOptions: NotificationOptions = {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      silent: false,
      ...options
    };

    return new Notification(title, defaultOptions);
  }

  static simulateOrderFlow() {
    // 1. Immediate confirmation
    this.send('Order Confirmed! 🍢', {
      body: 'Your artisan mezze feast is being prepared by our chefs.',
      tag: 'order-update'
    });

    // 2. Simulated ready notification (after 5 seconds for demo)
    setTimeout(() => {
      this.send('Order Ready for Pickup! 🥗', {
        body: 'Your order is packed and waiting at our Karaköy kitchen.',
        tag: 'order-update',
        requireInteraction: true
      });
    }, 5000);
  }
}
