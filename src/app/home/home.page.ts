//Automatically imported location service from constructor//important!

import { LocalNotificationsService } from './../local-notifications.service';
import { Component, OnInit } from '@angular/core';

//Importing language service in home page
import { LanguageService } from '../language.service';

//Importing and using facebook login service
import { FacebookLoginService } from '../facebook-login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private translate: LanguageService, private localNotification: LocalNotificationsService, private facebookLogin: FacebookLoginService) {}

  //Forcing language selection from browser on loading
  //imported OnInit, and enabled in method ngOnInit()
  ngOnInit(){
    this.translate.setInitialAppLanguage();
  }

  //Implementing language service
  //Using browser selector
  switchLanguage($event){
    return this.translate.setLanguage($event.target.value);
  }

  //Using notification service in home page
  simpleNotification(){
    let t = (document.getElementById('title') as HTMLInputElement).value;
    let b = (document.getElementById('body') as HTMLInputElement).value;
    console.log(t + ' ' + b);
    this.localNotification.generateNotification(Math.random(), t, b);
  }

  //Calling logout and login methods from facebook login service
  // --- Login
  loginWithFacebook(){
    this.facebookLogin.login();
  }

  // --- Logout
  logoutFromFacebook(){
    this.facebookLogin.logout();
  }

}
