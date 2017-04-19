import { Component, Input } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'smart-search-2',
  templateUrl: 'smart-search-2.html'
})
export class SmartSearch2Component {

  @Input('data') data: any;
  @Input('events') events: any;

  constructor(public modalCtrl: ModalController) {

  }


  onEvent = (event: string, item: any): void => {
    if(event=='onModal'){
      let profileModal = this.modalCtrl.create(MenuItemComponent, { userId: 8675309 });
      profileModal.onDidDismiss(data => {
        this.events[event](data);
      });
      profileModal.present();
    }else 
      if (this.events[event]) {
        this.events[event](item);
    }
  }

  


}
