import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PersonalEditPage } from '../personal-edit/personal-edit';

@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html'
})
export class PersonalPage {
	params: any = {data:{}};

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    }

    edit(){
    	this.navCtrl.push(PersonalEditPage)
    }

    ionViewDidEnter() {
    	console.log('ionViewDidLoad PersonalPage');
        this.storage.get('user').then((user) => {
            this.params.data = user;
        })
    }

}
