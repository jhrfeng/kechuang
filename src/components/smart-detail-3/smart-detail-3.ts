import { Component,Input } from '@angular/core';


@Component({
  selector: 'smart-detail-3',
  templateUrl: 'smart-detail-3.html'
})
export class SmartDetail3Component {

  @Input('data') data: any;
  // @Input('keywords') keywords: any;
  @Input('relateds') relateds: any;
  @Input('readCount') readCount: any;
  @Input('events') events: any;

  constructor() {
    console.log('Hello SmartDetail1 Component');
  }

  onEvent = (event: string, item: any): void => {
    if(event=='onRelate'){
      item.type = 'patent'; 
      this.events[event](item);
    
    }else if (this.events[event]) {
        this.events[event](item);
    }
  }

}
