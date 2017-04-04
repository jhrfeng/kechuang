import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PersonalPage } from '../personal/personal'

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

 	constructor(public navCtrl: NavController, public navParams: NavParams) {}

		ionViewDidLoad() {
    	console.log('ionViewDidLoad MePage');
    }

    // 跳转个人信息
    personal(){
    	this.navCtrl.push(PersonalPage);
    }


}
