import { Component } from '@angular/core';

@Component({
  selector: 'background',
  templateUrl: 'background.html'
})
export class BackgroundComponent {

  text: string;

  constructor() {
    console.log('Hello Background Component');
    this.text = 'Hello World';
  }

}
