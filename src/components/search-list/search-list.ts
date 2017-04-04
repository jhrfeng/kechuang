import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { MenuItemComponent } from '../menu-item/menu-item';
import { DetailPage } from '../../pages/detail/detail';


@Component({
  selector: 'search-list',
  templateUrl: 'search-list.html'
})
export class SearchListComponent {

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

    }

    presentProfileModal() {
	    let profileModal = this.modalCtrl.create(MenuItemComponent, { userId: 8675309 });
	    profileModal.onDidDismiss(data => {
	    	console.log(data);
	    });
	    profileModal.present();
	}

	detail(){
		this.navCtrl.push(DetailPage);
	}

}