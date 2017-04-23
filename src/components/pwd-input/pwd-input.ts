import { Component,Input } from '@angular/core';


@Component({
  selector: 'pwd-input',
  templateUrl: 'pwd-input.html'
})
export class PwdInputComponent {

  user:any = {oldPassword:"", newPassword:"", newPassword2:""};
  @Input('events') events: any;

  constructor() {
    console.log('Hello PwdInput Component');
  }

  onEvent = (event: string, item: any): void => {
    if (this.events[event]) {
        this.events[event](item);
    }
  }

}
