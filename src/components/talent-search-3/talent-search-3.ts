import { Component, Input } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'talent-search-3',
  templateUrl: 'talent-search-3.html'
})
export class TalentSearch3Component {

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
