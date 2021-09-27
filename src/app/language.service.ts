//Basic imports for serving language to the app
//import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Injectable } from '@angular/core';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService, private storage: Storage) { }

  setInitialAppLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.storage.get(LNG_KEY).then(val => {
      if(val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
    this.storage.create();
  }

  getLanguages(){
    return [
      { text: 'English', value: 'en'},
      { text: 'Français', value: 'fr'}
    ];
  }

  setLanguage(lng){
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}
 