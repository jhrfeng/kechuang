import { Component } from '@angular/core';

/*
  Generated class for the OpenChart component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'open-chart',
  templateUrl: 'open-chart.html'
})
export class OpenChartComponent {

  text: string;

  constructor() {
    console.log('Hello OpenChart Component');
    this.text = 'Hello World';
  }

}
