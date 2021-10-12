import { Injectable } from '@angular/core';

//Importing and setting up the translation service
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  //selected = '';

  constructor(private translate: TranslateService) { }
  //Method to set initial language based on browser's language
  setInitialAppLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
  }

  //Getting languages from json
  /*getLanguages(){
    return [
      { text: 'English', value: 'en' },
      { text: 'Français', value: 'fr' }
    ];
  }*/

  setLanguage(lng){
    this.translate.use(lng);
    //this.selected = lng;
  }

}
