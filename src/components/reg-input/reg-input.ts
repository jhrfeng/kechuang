import { Component } from '@angular/core';

@Component({
  selector: 'reg-input',
  templateUrl: 'reg-input.html'
})
export class RegInputComponent {

  text: string;

  constructor() {
    console.log('Hello RegInput Component');
    this.text = 'Hello World';
  }

}
