import { Component } from '@angular/core';

@Component({
  selector: 'hed-item',
  templateUrl: 'hed-item.html'
})
export class HedItemComponent {

  text: string;

  constructor() {
    console.log('Hello HedItem Component');
    this.text = 'Hello World';
  }

}
