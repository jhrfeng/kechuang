import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { MenuItemComponent } from '../menu-item/menu-item';
import { PersonDetailPage } from '../../pages/person-detail/person-detail';

@Component({
  selector: 'person-list',
  templateUrl: 'person-list.html'
})
export class PersonListComponent {

 
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
    this.navCtrl.push(PersonDetailPage);
  }

}
