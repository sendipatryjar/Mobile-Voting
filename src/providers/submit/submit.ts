import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../../common/constants';
import { ServiceProvider } from '../service/service';
import { timeout } from 'rxjs/operators';
import { LoginRespon } from '../../pages/login/login.model';
// import { Observable } from '../../../node_modules/rxjs';
import 'rxjs'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { App, Header } from 'ionic-angular';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubmitProvider {

  constructor(private storage: Storage,private app: App, public http: HttpClient , private loading: ServiceProvider) {
  //  console.log('Hello UserProvider Provider');
  }
  public uploadDocument(uploadData: FormData){
    //console.log("isi form"+uploadData['total_votes_teguh'])
    this.loading.showLoading();
    return this.http.post(CONSTANTS.API.URL_SUBMIT_ADMIN,uploadData).pipe(timeout(10000)).do(
      res => this.loading.dismissLoading(),
      error => this.loading.dismissLoading()
    );
  }

  public logout(){
    this.storage.clear();
    this.app.getRootNav().setRoot('LoginPage');
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

}