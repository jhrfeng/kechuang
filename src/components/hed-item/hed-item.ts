import { Component, Input } from '@angular/core';

@Component({
  selector: 'hed-item',
  templateUrl: 'hed-item.html'
})
export class HedItemComponent {

  @Input() data: any;

  constructor() {
    console.log('Hello HedItem Component');
  }

}
