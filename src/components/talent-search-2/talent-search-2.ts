import { Component, Input } from '@angular/core';


@Component({
  selector: 'talent-search-2',
  templateUrl: 'talent-search-2.html'
})
export class TalentSearch2Component {

  @Input('data') data: any;
  @Input('events') events: any;

  constructor() {

  }

  onEvent = (event: string, item: any): void => {
    if (this.events[event]) {
        this.events[event](item);
    }
  }

  
}
