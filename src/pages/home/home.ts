import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	isSearch = true;

  constructor(public navCtrl: NavController,public navParams: NavParams,public modalCtrl: ModalController) {

	}

  search(){
    this.isSearch = false;
  }

    ionViewDidEnter() {
    	console.log(this.navCtrl.parent)
    	// this.navCtrl.parent.selectedIndex = 0;
	}
   
}
