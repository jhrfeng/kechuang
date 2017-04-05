import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PersonalPage } from '../personal/personal'
import { ApplyPage } from '../apply/apply';

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

    //应用
    apply(){
        this.navCtrl.push(ApplyPage); 
    }


}
