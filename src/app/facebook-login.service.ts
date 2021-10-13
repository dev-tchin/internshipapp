import { Injectable } from '@angular/core';

//Importing and enabling facebook-login plugin as service
import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';

//Importing http client for web relations
//Disabling HttpClient
//import { HttpClient } from '@angular/common/http';

//Importing plugin for registration
import { registerPlugin } from '@capacitor/core';
registerPlugin('FacebookLogin');

@Injectable({
  providedIn: 'root'
})
export class FacebookLoginService {

  fbLogin: FacebookLoginPlugin;
  token=null;
  user=null;

  constructor() {
    this.fbLogin=FacebookLogin;
  }

  async login() {
    const FACEBOOK_PERMISSIONS=['email', 'user_birthday', 'user_photos', 'user_gender'];
    const result = await this.fbLogin.login({permissions: FACEBOOK_PERMISSIONS});

    if (result.accessToken && result.accessToken.userId){
      this.token = result.accessToken;
      this.loadUserData();
      console.log(`Good, FB token is ${result.accessToken}`);
    } else if (result.accessToken && !result.accessToken.userId){
      //Web only gets the token, not user id
      //Call get token to retrieve it
      this.getCurrentToken();
    } else {
      //Login failed
      console.log('FATAL ERROR: Login Failed');
    }
  }

  async getCurrentToken(){
    const result = await this.fbLogin.getCurrentAccessToken();

    if(result.accessToken){
      //Getting access token
      this.token = result.accessToken;
      console.log(`Good, current access token is ${this.token}`);
      this.loadUserData();
    } else {
      //Login failed
      console.log('Error: Login Failed');
    }
  }

  /*async loadUserData(){
    const url="https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}";
    this.http.get(url).subscribe(res => {
      this.user=res;
      //debugging
      console.log(this.user);
    });
  }*/

  async loadUserData(){
    const url = await fetch(`https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`);
    const infoJson = url.json();
    this.user = infoJson;
  }

  async logout(){
    await this.fbLogin.logout();
    this.user=null;
    this.token=null;
  }

}
