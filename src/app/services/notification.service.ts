import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwPush } from '@angular/service-worker';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private swPush = inject(SwPush);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async subscribeToPush(): Promise<void> {

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Permesso per le notifiche concesso.');

      const messaging = getMessaging();

      try {
        const token = await getToken(messaging, {
          vapidKey: 'BLoF5JhwJMy_6WWcbmg74R3_MAfwjiMzyOaD2V9F_axBonn-Og0_I-1xjn95x74RgdDef1VlId-zUa5BHqD9lSw' // chiave VAPID
        });
        console.log('Token:', token); //questo token devo metterlo nel db per recuperarlo al momento della send
        
        onMessage(messaging, (payload) => {
          console.log('Messaggio ricevuto:', payload);

        });
      } catch (error) {
        console.error('Errore durante la richiesta del token:', error);
      }
    } else {
      console.error('Permesso per le notifiche non concesso.');
    }
  }
}
