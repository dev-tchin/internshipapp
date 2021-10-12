import { Injectable } from '@angular/core';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor() {}

  generateNotification(id: number, text: string, title: string) {

    const options: LocalNotificationSchema={
      id: id,
      title: title,
      body: text
    }

    LocalNotifications.schedule({
      notifications:[options]
      }).then(()=>{
        console.log('Correct: Notifications pending..');
      });

  }

}
