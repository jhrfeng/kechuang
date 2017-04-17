import { Component } from '@angular/core';

/*
  Generated class for the SmartDetail1 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'smart-detail-1',
  templateUrl: 'smart-detail-1.html'
})
export class SmartDetail1Component {

  text: string;

  constructor() {
    console.log('Hello SmartDetail1 Component');
    this.text = 'Hello World';
  }

}
