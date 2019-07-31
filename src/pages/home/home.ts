import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerhitunganSuaraPage } from '../perhitungan-suara/perhitungan-suara';
import { ReportSuaraPage } from '../report-suara/report-suara';
import { Storage } from '@ionic/storage';
import { SubmitProvider } from '../../providers/submit/submit';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private storage: Storage , public navCtrl: NavController, private submitProvider: SubmitProvider) {

  }
  public perhitungan(){
    this.navCtrl.push(PerhitunganSuaraPage)

  }
  public report(){
    this.navCtrl.push(ReportSuaraPage)
  }
  public logout(){
   this.submitProvider.logout()
  }
  

}
