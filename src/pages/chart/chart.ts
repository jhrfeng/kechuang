import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser'; //SafeResourceUrl

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

	screenWidth:any = window.screen.availWidth;
 	screenHeight:any = window.screen.availHeight;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer) {}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ChartPage');
  	}

  	updateVideoUrl(id: string) {
        let dangerousVideoUrl = 'https://html5up.net/uploads/demos/multiverse/';
        return this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
	}

}
