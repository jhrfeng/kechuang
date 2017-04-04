import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,public navParams: NavParams,public modalCtrl: ModalController) {

    }

    ionViewDidEnter() {
    	console.log(this.navCtrl.parent)
    	// this.navCtrl.parent.selectedIndex = 0;
	}
   
}
