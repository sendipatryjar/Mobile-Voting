import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerhitunganSuaraPage } from '../pages/perhitungan-suara/perhitungan-suara';
import { ReportSuaraPage } from '../pages/report-suara/report-suara';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { UserProvider } from '../providers/user/user';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { ServiceProvider } from '../providers/service/service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SubmitProvider } from '../providers/submit/submit';






@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PerhitunganSuaraPage,
    ReportSuaraPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PerhitunganSuaraPage,
    ReportSuaraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    ScreenOrientation,
    File,
    Camera,
    UserProvider,
    InterceptorProvider,
    ServiceProvider,
    SubmitProvider
  ]
})
export class AppModule {}
