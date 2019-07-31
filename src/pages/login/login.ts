import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginModel } from './login.model';
import { UserProvider } from '../../providers/user/user';
import { stringify } from '@angular/core/src/util';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public model = new LoginModel();
  username: string = '';
  password: string = 'password';
  public errorMessage: string = null;

  constructor(private storage: Storage,public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
 
  }
  public login(){

    this.userProvider.setUser(this.model.no_handphone).subscribe(
      data => {
        if(data != null){
            this.storage.set( 'user_id', data.user_id);
            this.storage.set( 'name',data['auth']['name']);
            this.storage.set( 'no_handphone',data['auth']['no_handphone']);
            this.storage.set( 'tps', data['auth']['tps']);
            this.storage.set( 'role_id', data['auth']['role_id']);
            this.storage.set( 'kota', data['auth']['kota']);
            this.storage.set( 'accessToken', data.accessToken);
            this.storage.set( 'kecamatan', data['auth']['kecamatan']);
            this.storage.set( 'kelurahan',  data['auth']['kelurahan']);
            this.storage.set('tps', data['auth']['tps']);
            this.storage.set('region_id', data['auth']['region_id']);
           
            this.userProvider.setToken(data.accessToken)
          this.navCtrl.push(HomePage)
  }
    },
    error => {

      if(error.status == 400){
        this.errorMessage = error.error.message;
      }else{
        this.errorMessage = 'Periksa Internet Anda';
      }
    }
    
  );
}
    
  }
 