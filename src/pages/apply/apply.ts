import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsPage } from '../news/news';
import { AdvicePage } from '../advice/advice';

@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html'
})
export class ApplyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  news(){
  	this.navCtrl.push(NewsPage);
  }

  advice(){
  	this.navCtrl.push(AdvicePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
  }

}
