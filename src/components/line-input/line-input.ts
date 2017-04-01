import { Component } from '@angular/core';

/*
  Generated class for the LineInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'line-input',
  templateUrl: 'line-input.html'
})
export class LineInputComponent {

  text: string;

  constructor() {
    console.log('Hello LineInput Component');
    this.text = 'Hello World';
  }

}
