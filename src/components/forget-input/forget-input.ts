import { Component } from '@angular/core';

@Component({
  selector: 'forget-input',
  templateUrl: 'forget-input.html'
})
export class ForgetInputComponent {

  text: string;

  constructor() {
    console.log('Hello ForgetInput Component');
    this.text = 'Hello World';
  }

}
