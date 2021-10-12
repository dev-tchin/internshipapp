//Using BackButtonService in App component
import { BackButtonService } from './back-button.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private backButtonService: BackButtonService) {
    this.initializeApp();
  }

  //initializing back button service
  initializeApp(){
    this.backButtonService.init();
  }
}
