import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

import { RegisterPage } from '../../pages/register/register';
import { ForgetPage } from '../../pages/forget/forget';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'line-input',
  templateUrl: 'line-input.html'
})
export class LineInputComponent {

    username: string;
    password: string;
    loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
 
    this.showLoader();
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
        console.log("Already authorized");
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage); //
    }, (err) => {
        console.log("Not already authorized");
        this.loading.dismiss();
    });
 
  }

  login(){
 
    this.showLoader();

    let credentials = {
        username: this.username,
        password: this.password
    };

    this.authService.login(credentials).then((result) => {
        this.loading.dismiss();
        console.log(result);
        this.showError("Access Denied");
        this.navCtrl.setRoot(HomePage);//
    }, (err) => {
        this.loading.dismiss();
        this.showError("err");
    });
 
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: '登录中......'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['确定']
    });
    alert.present(prompt);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  forget(){
    this.navCtrl.push(ForgetPage, {pwdType:'1'}); // 忘记密码
  }


}
