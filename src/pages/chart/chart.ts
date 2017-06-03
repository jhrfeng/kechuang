import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser'; //SafeResourceUrl
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { REQUEST_URL } from '../../constant/data';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

	  screenWidth:any = window.screen.availWidth;
 	  screenHeight:any = window.screen.availHeight;
    charUrl:string = "";
    item:any = {type:'', token:'', expertid:'', keyword:''};
    title:string = "";

  	constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public sanitizer: DomSanitizer,
                public storage: Storage,
                public auth: Auth) 
    {
      this.storage.get('token').then((token) => {//获取当前登录人id
        this.item.token = token;
        this.item.type = navParams.get('type');
        this.item.expertid = navParams.get('id');
        this.item.keyword = navParams.get('keyword');
        this.chartUrl();
      })
    }

  	ionViewDidLoad() {
      // this.auth.loadings();
    	console.log('ionViewDidLoad ChartPage');
  	}

  	chartUrl() {
        // this.auth.loadings();
        if(this.item.type == 'socialNetwork'){
          this.title = "自我网络";
          this.charUrl =  REQUEST_URL + '/tpl/html5/socialNetwork.html?expertId=' + this.item.expertid + '&token=' + this.item.token;
          //let url console.log(url);
          //return this.sanitizer.bypassSecurityTrustResourceUrl(charUrl);
        }
        else if(this.item.type == 'radarGraphic'){
          this.title = "综合表征";
          this.charUrl =  REQUEST_URL + '/tpl/html5/radarGraphic.html?expertId=' + this.item.expertid + '&token=' + this.item.token;
          //let url console.log(url);
          //return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else if(this.item.type == 'relevantInstitutions'){
          this.title = "相关机构";
          this.charUrl =  REQUEST_URL + '/tpl/html5/relevantInstitutions.html?token=' + this.item.token + '&keyword=' + this.item.keyword +'&id=relevantInstitutions';
          //let url console.log(url);
          //return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else if(this.item.type == 'relevantExperts'){
          this.title = "相关学者";
          this.charUrl =  REQUEST_URL + '/tpl/html5/relevantExperts.html?token=' + this.item.token + '&keyword=' + this.item.keyword + '&id=relevantExperts';
          //let url console.log(url);
          //return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        else if(this.item.type == 'resarchTrends'){
          this.title = "研究走势";
          this.charUrl =  REQUEST_URL + '/tpl/html5/researchTrends.html?token=' + this.item.token + '&keyword=' + this.item.keyword + '&id=researchTrends';
          //let url console.log(url);
          //return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
	  }


}
