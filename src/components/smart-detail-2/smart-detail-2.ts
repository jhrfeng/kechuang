import { Component } from '@angular/core';

/*
  Generated class for the SmartDetail2 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'smart-detail-2',
  templateUrl: 'smart-detail-2.html'
})
export class SmartDetail2Component {

  text: string;

  constructor() {
    console.log('Hello SmartDetail2 Component');
    this.text = 'Hello World';
  }

}
