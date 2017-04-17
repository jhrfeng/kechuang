import { Component, Input } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'smart-search-1',
  templateUrl: 'smart-search-1.html'
})
export class SmartSearch1Component {

  @Input('data') data: any;
  @Input('events') events: any;

  constructor(public modalCtrl: ModalController) {

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
