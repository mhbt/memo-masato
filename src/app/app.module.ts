import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FavPage } from "../pages/fav/fav";
import { StorageProvider } from '../providers/storage/storage';
import { MemoPage } from "../pages/memo/memo";
import { ArchivePage } from "../pages/archive/archive";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FavPage,
    MemoPage,
    ArchivePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    HomePage, 
    FavPage,
    MemoPage,
    ArchivePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider, 
    
  ]
})
export class AppModule {}
