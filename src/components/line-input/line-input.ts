import { Component, Input } from '@angular/core';

@Component({
  selector: 'line-input',
  templateUrl: 'line-input.html'
})
export class LineInputComponent {

    @Input('data') data: any;
    @Input('events') events: any;

    constructor() {}

    onEvent = (event: string, item: any): void => {
      if (this.events[event])
        this.events[event](item);
    }
  

}
