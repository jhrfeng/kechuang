import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PersonalEditPage } from '../personal-edit/personal-edit';

@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html'
})
export class PersonalPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    edit(){
    	this.navCtrl.push(PersonalEditPage)
    }

    ionViewDidLoad() {
    	console.log('ionViewDidLoad PersonalPage');
    }

}
