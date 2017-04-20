import { Component,Input } from '@angular/core';


@Component({
  selector: 'smart-detail-2',
  templateUrl: 'smart-detail-2.html'
})
export class SmartDetail2Component {

  @Input('data') data: any;
  @Input('keywords') keywords: any;
  @Input('relateds') relateds: any;
  @Input('readCount') readCount: any;
  @Input('events') events: any;

  constructor() {
    console.log(this.data)
    console.log('Hello SmartDetail2 Component');
  }

  onEvent = (event: string, item: any): void => {
    if (this.events[event]) {
        this.events[event](item);
    }
  }

}
