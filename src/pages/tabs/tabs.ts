import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ExactPage } from '../exact/exact';
import { ContactPage } from '../contact/contact';
import { MePage } from '../me/me';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  	tab1Root: any = HomePage;
  	tab2Root: any = ExactPage;
  	tab3Root: any = ContactPage;
  	tab4Root: any = MePage;

  	constructor() {

  	}

  	ionViewDidEnter() {
		
	}
   
}
