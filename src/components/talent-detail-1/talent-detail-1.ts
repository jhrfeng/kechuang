import { Component } from '@angular/core';

/*
  Generated class for the TalentDetail1 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'talent-detail-1',
  templateUrl: 'talent-detail-1.html'
})
export class TalentDetail1Component {

  text: string;

  constructor() {
    console.log('Hello TalentDetail1 Component');
    this.text = 'Hello World';
  }

}
