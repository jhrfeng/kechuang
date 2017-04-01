import { Component } from '@angular/core';

@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent {

  text: string;

  constructor() {
    console.log('Hello ItemList Component');
    this.text = 'Hello World';
  }

}
