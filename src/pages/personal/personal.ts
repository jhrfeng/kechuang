import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PersonalEditPage } from '../personal-edit/personal-edit';

@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html'
})
export class PersonalPage {
	params: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    	this.params = {data:{name:'', type:''}};
    }

    edit(){
    	this.navCtrl.push(PersonalEditPage)
    }

    ionViewDidLoad() {
    	console.log('ionViewDidLoad PersonalPage');
    }

}
