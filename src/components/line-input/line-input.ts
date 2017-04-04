import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../../pages/register/register';
import { ForgetPage } from '../../pages/forget/forget';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'line-input',
  templateUrl: 'line-input.html'
})
export class LineInputComponent {

  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello LineInput Component');
    this.text = 'Hello World';
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  forget(){
    this.navCtrl.push(ForgetPage, {pwdType:'1'}); // 忘记密码
  }

  login(){
    this.navCtrl.setRoot(HomePage);
  }

}
