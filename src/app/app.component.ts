import * as firebase from 'firebase';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage : any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;


  @ViewChild('nav')
  nav : NavController;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private menuController : MenuController,
              private authService : AuthService) {

    firebase.initializeApp({
      apiKey: "AIzaSyA4a-KzBgxdUAXPOLa-2_EVuvrm1YIRi0Q",
      authDomain: "ionic2-recipebook-27bcb.firebaseapp.com"
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page : any){
    this.nav.setRoot(page);
    this.menuController.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuController.close();
    this.nav.setRoot(SigninPage);
  }
}

