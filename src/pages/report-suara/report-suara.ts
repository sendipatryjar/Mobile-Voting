import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ReportSuaraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-suara',
  templateUrl: 'report-suara.html',
})
export class ReportSuaraPage {
  users: any;
  searchTerm: string ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  this.voting()
  }
  voting(){
     this.userProvider.getVotes().subscribe(data => {
      this.users = data;
     
  }
)}
filterItems(){
  this.users = this.users.filter(item =>  item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
   
  )
}}
