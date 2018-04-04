/**
 * @file - Application entry point registers Angular app component
 * @requires HomePage - Application home page i.e very first UI Component
 */
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
/***
 * @classdesc - Entry point of application. Takes things from initial state to platform ready and presents the application first UI component
 * @member rootPage - @type <IONIC PAGE> 
 */
export class MyApp {
  rootPage:any = HomePage;
  /**
   * @constructor 
   * @param platform 
   * @param statusBar 
   * @param splashScreen 
   */
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

