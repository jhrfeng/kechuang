import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { menuData } from '../../constant/data';
import { ChecklistModel } from '../../model/ChecklistModel';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {

  data:any;
  checklist = new ChecklistModel([]);

  constructor(public viewCtrl: ViewController) {
    this.data = menuData();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.checklist.items);
  }

  reset() {
    this.data = menuData();
    this.checklist.resetItem();
  }

  ionViewDidEnter(){
    this.data = menuData();
  }


}
