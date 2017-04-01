import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ExactPage } from '../../pages/exact/exact';


@Component({
  selector: 'header-search',
  templateUrl: 'header-search.html'
})
export class HeaderSearchComponent {

  constructor(public navCtrl: NavController) {
    
  }

  search() {
  	this.navCtrl.push(ExactPage);
  }

}
