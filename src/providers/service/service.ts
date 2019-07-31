import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  isLoadingPresent = false;
  loading: any = null;

  constructor(private loadingController: LoadingController) {
      // console.log('Hello RestProvider Provider');
  }

  showLoading(){
      if(this.loading == null){
          this.loading = this.loadingController.create({
              content: 'Mohon Menunggu...'
          });
          this.loading.present();
      }
  }
  
  dismissLoading(){
      if(this.loading != null){
          this.loading.dismiss();
          this.loading = null;
      }
  }
}

