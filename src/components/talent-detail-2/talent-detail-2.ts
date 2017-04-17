import { Component } from '@angular/core';

/*
  Generated class for the TalentDetail2 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'talent-detail-2',
  templateUrl: 'talent-detail-2.html'
})
export class TalentDetail2Component {

  text: string;

  constructor() {
    console.log('Hello TalentDetail2 Component');
    this.text = 'Hello World';
  }

}
