import { LanguageService } from './../language.service';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';

import { HttpClient } from '@angular/common/http';
import { AlertController, isPlatform, PopoverController } from '@ionic/angular';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';

//@ts-ignore
registerWebPlugin(FacebookLogin);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fbLogin: FacebookLoginPlugin;
  user=null;
  token=null;
  other: LanguageService;

  constructor(private http: HttpClient, private translate: TranslateService, private popoverCtrl: PopoverController) {
    this.setupFbLogin();
  }


  async setupFbLogin(){
    if(isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      //use native implementation in real app
      const { FacebookLogin } = Plugins;
      //@ts-ignore
      this.fbLogin = FacebookLogin;
    }
  }

  async login() {
    const FACEBOOK_PERMISSIONS = ['email', 'user_birthday'];
    const result = await this.fbLogin.login({permissions: FACEBOOK_PERMISSIONS});

    if(result.accessToken && result.accessToken.userId){
      this.token = result.accessToken;
      this.loadUserData();
    } else {
      //Login failed
    }
  }

  async getCurrentToken(){
    const result = await this.fbLogin.getCurrentAccessToken();
    if(result.accessToken){
      this.token = result.accessToken;
      this.loadUserData();
    } else {
      //Not logged in.
    }
  }

  async loadUserData(){
    const url=`https://graph.facebook.com/${this.token.userId}?fields=id,name,picture,width(720),birthday,email&access_token=${this.token.token}`;
    this.http.get(url).subscribe(res => {
      this.user = res;
    });
  }

  async logout(){
    await this.fbLogin.logout();
    this.user = null;
    this.token = null;
  }

  //popover config
  async openLanguagePopover(ev){
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }

  //using browser selector
  englishLanguage(){
    return this.other.setLanguage('en');
  }
  
  frenchLanguage(){
    return this.other.setLanguage('fr');
  }

}
