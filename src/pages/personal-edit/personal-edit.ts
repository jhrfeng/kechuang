import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-personal-edit',
  templateUrl: 'personal-edit.html'
})
export class PersonalEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalEditPage');
  }


  edit(){
  	this.navCtrl.pop();
  }

}
