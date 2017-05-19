import { Component,Input } from '@angular/core';

@Component({
  selector: 'background',
  templateUrl: 'background.html'
})
export class BackgroundComponent {

   @Input('data') data: any;
  
  constructor() {
    console.log('Hello Background Component');
  }

}
