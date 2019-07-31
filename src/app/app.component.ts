import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(private platform: Platform,statusBar: StatusBar,splashScreen: SplashScreen,private screenOrientation: ScreenOrientation,) {
    
        this.platform.ready().then(() => {
         
        //this.screenOrientation.lock('portrait');
        statusBar.styleDefault();
        splashScreen.hide();
        if(platform.is('cordova')){
          this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
          //console.log(platform.versions().android.num);
        };
    
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // 
     
      // console.log(this.screenOrientation.type);
      
       
      
      //screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      
    });
  } 
}
