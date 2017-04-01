import { Component } from '@angular/core';

/*
  Generated class for the PwdInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pwd-input',
  templateUrl: 'pwd-input.html'
})
export class PwdInputComponent {

  text: string;

  constructor() {
    console.log('Hello PwdInput Component');
    this.text = 'Hello World';
  }

}
