import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsPage } from '../news/news';


@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html'
})
export class ApplyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  news(){
  	this.navCtrl.push(NewsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
  }

}
