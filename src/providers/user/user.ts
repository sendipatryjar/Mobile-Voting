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


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  isiUser: string = '';
  headers : HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  

  constructor(private storage: Storage, public http: HttpClient , private loading: ServiceProvider) {
  //  console.log('Hello UserProvider Provider');
  }

  public getVotes(){
    return this.http.get(CONSTANTS.API.URL_REPORT_ADMIN).pipe(timeout(10000)).do(
      res => this.loading.dismissLoading(),
          error => this.loading.dismissLoading()
    )
    };
   
    public setToken(accessToken: string){
      this.storage.set('accessToken', accessToken)
    }
  public setUser(no_handphone: string):Observable<LoginRespon>{
    let body = {
      no_handphone : no_handphone
    }
    this.loading.showLoading();
    //console.log("coba masuk post"+body)
     return this.http.post<LoginRespon>(CONSTANTS.API.URL_ADMIN, body, {headers: this.headers}).pipe(timeout(10000)).do(
      res => this.loading.dismissLoading(),
      error => this.loading.dismissLoading()
      
    );
  }

  public uploadDocument(uploadData: FormData){
    return this.http.post(CONSTANTS.API.URL_SUBMIT_ADMIN,uploadData).pipe(timeout(10000)).do(
      res => this.loading.dismissLoading(),
      error => this.loading.dismissLoading()
    );
  }
}