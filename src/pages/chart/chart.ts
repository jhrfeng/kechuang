import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser'; //SafeResourceUrl
import { Storage } from '@ionic/storage';
import { REQUEST_URL } from '../../constant/data';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

	  screenWidth:any = window.screen.availWidth;
 	  screenHeight:any = window.screen.availHeight;
    item:any = {type:'', token:'', expertid:'', keyword:''};

  	constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public sanitizer: DomSanitizer,
                public storage: Storage) 
    {
      this.storage.get('token').then((token) => {//获取当前登录人id
        this.item.token = token;
        this.item.type = navParams.get('type');
        this.item.expertid = navParams.get('id');
        this.item.keyword = navParams.get('keyword');
      })
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ChartPage');
  	}

  	chartUrl() {
        if(this.item.type == 'socialNetwork'){
          let url =  REQUEST_URL + '/#/socialNetwork/' + this.item.token + '/' + this.item.expertid;
          console.log(url);
          return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else if(this.item.type == 'radarGraphic'){
          let url =  REQUEST_URL + '/#/radarGraphic/' + this.item.token + '/' + this.item.expertid;
          console.log(url);
          return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else if(this.item.type == 'relevantInstitutions'){
          let url =  REQUEST_URL + '/#/relevantInstitutions/' + this.item.token + '/' + this.item.keyword + '/relevantInstitutions';
          console.log(url);
          return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else if(this.item.type == 'relevantExperts'){
          let url =  REQUEST_URL + '/#/relevantExperts/' + this.item.token + '/' + this.item.keyword + '/relevantExperts';
          console.log(url);
          return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else if(this.item.type == 'resarchTrends'){
          let url =  REQUEST_URL + '/#/researchTrends/' + this.item.token + '/' + this.item.keyword + '/researchTrends';
          console.log(url);
          return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
	  }


}
