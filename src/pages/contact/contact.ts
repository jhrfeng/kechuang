import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LixiangPage } from '../lixiang/lixiang';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  lixiang(){
  	this.navCtrl.push(LixiangPage);
  }

}
