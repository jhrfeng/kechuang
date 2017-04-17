import { Component } from '@angular/core';

/*
  Generated class for the TalentDetail3 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'talent-detail-3',
  templateUrl: 'talent-detail-3.html'
})
export class TalentDetail3Component {

  text: string;

  constructor() {
    console.log('Hello TalentDetail3 Component');
    this.text = 'Hello World';
  }

}
