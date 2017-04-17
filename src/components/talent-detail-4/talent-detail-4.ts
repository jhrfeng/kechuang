import { Component } from '@angular/core';

/*
  Generated class for the TalentDetail4 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'talent-detail-4',
  templateUrl: 'talent-detail-4.html'
})
export class TalentDetail4Component {

  text: string;

  constructor() {
    console.log('Hello TalentDetail4 Component');
    this.text = 'Hello World';
  }

}
