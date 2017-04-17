import { Component } from '@angular/core';

/*
  Generated class for the SmartDetail3 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'smart-detail-3',
  templateUrl: 'smart-detail-3.html'
})
export class SmartDetail3Component {

  text: string;

  constructor() {
    console.log('Hello SmartDetail3 Component');
    this.text = 'Hello World';
  }

}
