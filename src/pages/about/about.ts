import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	shouldShowCancel:boolean = true;

  	constructor(public navCtrl: NavController) {

  	}

  	onInput(event){

  	}

  	onCancel(event){
  		
  	}

}
