import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { menuData } from '../../constant/data';
import { RadiolistModel } from '../../model/RadiolistModel';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {

  data:any;
  radiolist = new RadiolistModel({subject:"", time:"-1",area:"",yeardesc:false});

  constructor(public viewCtrl: ViewController) {
    this.data = menuData();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.radiolist.items);
  }

  reset() {
    this.data = menuData();
    this.radiolist.resetItem({subject:"", time:"-1",area:"",yeardesc:false});
  }

  ionViewDidEnter(){
    // this.data = menuData();
  }


}
