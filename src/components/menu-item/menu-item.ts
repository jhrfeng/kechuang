import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { menuData } from '../../constant/data';
import { RadiolistModel } from '../../model/RadiolistModel';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {

  data:any;
  radiolist = new RadiolistModel({subject:"", time:"-1",area:"",yeardesc:false});

  constructor(public viewCtrl: ViewController,
              public storage: Storage) {
    this.data = menuData();
  }

  dismiss() {
    this.storage.set('options', this.data);
    this.viewCtrl.dismiss(this.radiolist.items);
  }

  reset() {
    this.data = menuData();
    this.storage.set('options', this.data);
    this.radiolist.resetItem({subject:"", time:"-1",area:"",yeardesc:false});
  }

  ionViewDidEnter(){
    // 保留选择项
    this.storage.get('options').then((options) => {
      console.log(options)
      if(options) this.data = options;
    })
   
  }

  // ionViewDidEnter() {
  //     this.storage.get('user').then((user) => {
          
  //     })
  // }


}
