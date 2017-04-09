import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { ChartPage } from '../chart/chart';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html'
})
export class PersonDetailPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams) {}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad PersonDetailPage');
  	}

  	openChart(){
  		this.navCtrl.push(ChartPage);
  	}

  	detail(){
  		this.navCtrl.push(DetailPage);
  	}

    about(){
      this.navCtrl.push(AboutPage);
    }

}
