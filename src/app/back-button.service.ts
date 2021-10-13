import { Injectable } from '@angular/core';
//Importing Platform to use device back-button
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  //Creating initialization method
  init(){
    this.platform.backButton.subscribeWithPriority(10, ()=>{
      navigator['app'].exitApp();
    });
  }
  constructor(private platform: Platform) { }
}
