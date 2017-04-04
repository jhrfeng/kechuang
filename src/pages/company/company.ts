import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-company',
  templateUrl: 'company.html'
})
export class CompanyPage {

	iconType:boolean = true;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {}

  	ionViewDidLoad() {
   		console.log('ionViewDidLoad CompanyPage');
  	}

}
