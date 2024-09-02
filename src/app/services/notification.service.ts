import { inject, Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private swPush = inject(SwPush);

  async subscribeToPush(): Promise<void> {
    if (typeof window === 'undefined') {
      // Il codice è in esecuzione sul server, non fare nulla.
      return;
    }

    if (!('Notification' in window)) {
      console.error('Il browser non supporta le notifiche.');
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      this.swPush.messages.subscribe((message: any) => {
        console.log(message);
      });
    } else {
      console.error('Permesso per le notifiche non concesso.');
    }
  }
}
