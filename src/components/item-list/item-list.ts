import { Component,Input } from '@angular/core';


@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent {

	@Input('events') events: any;

	constructor() {
	    console.log('Hello ItemList Component');
	}

    onEvent = (event: string, item: any): void => {
      if (this.events[event]) {
          this.events[event](item);
        }
    }

	
}
