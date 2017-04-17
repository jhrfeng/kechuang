import { Component } from '@angular/core';

/*
  Generated class for the SmartSearch4 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'smart-search-4',
  templateUrl: 'smart-search-4.html'
})
export class SmartSearch4Component {

  text: string;

  constructor() {
    console.log('Hello SmartSearch4 Component');
    this.text = 'Hello World';
  }

}
