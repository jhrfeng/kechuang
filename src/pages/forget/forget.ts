import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html'
})
export class ForgetPage {

	pwdType:string;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.pwdType = this.navParams.get('pwdType');
  	}

    ionViewDidLoad() {
    	console.log('ionViewDidLoad ForgetPage');
  	}

}
