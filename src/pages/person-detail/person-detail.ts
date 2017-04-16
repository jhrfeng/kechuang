import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';

import { DetailPage } from '../detail/detail';
import { ChartPage } from '../chart/chart';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html'
})
export class PersonDetailPage {

  params: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth) {
    this.params = {data:{}, papers:[], total:0};
    this.authService.authGet('/query/expert/'+this.navParams.get('item').id, null, true).then((result) => {
        this.params = JSON.parse(result["_body"]);
        this.params.total =  this.params.papers.length;
        console.log(this.params)
      },(err) =>{
        
      });
  }

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
