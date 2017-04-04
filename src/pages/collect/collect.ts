import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html'
})
export class CollectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectPage');
  }

  delete(item){
  	
  }

}
