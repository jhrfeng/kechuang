import { Component, Input } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { MenuItemComponent } from '../menu-item/menu-item';



@Component({
  selector: 'search-list',
  templateUrl: 'search-list.html'
})
export class SearchListComponent {

	@Input('data') data: any;
    @Input('events') events: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

    }


  	onEvent = (event: string, item: any): void => {
    	if (this.events[event]) {
        	this.events[event](item);
    	}
  	}

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(MenuItemComponent, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
    	console.log(data);
    });
    profileModal.present();
	}


}