import { Component,Input } from '@angular/core';

@Component({
  selector: 'smart-detail-1',
  templateUrl: 'smart-detail-1.html'
})
export class SmartDetail1Component {

  @Input('data') data: any;
  @Input('keywords') keywords: any;
  @Input('relateds') relateds: any;
  @Input('readCount') readCount: any;
  @Input('events') events: any;

  constructor() {
    console.log('Hello SmartDetail1 Component');
  }

	onEvent = (event: string, item: any): void => {
  	if (this.events[event]) {
      	this.events[event](item);
		}
	}

}
