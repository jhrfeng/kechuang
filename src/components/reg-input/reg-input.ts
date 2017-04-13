import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'reg-input',
  templateUrl: 'reg-input.html'
})
export class RegInputComponent {

   username: string = '';
   password: string = '';
   user:any = {
     relationManMobilePhone: '',
     enterpriseName: '',
     relationManMobilePhoneSMS: ''
   };
   loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {}

  sendSms(){
    if(this.user.relationManMobilePhone==''){
      this.showError("手机号不能为空");
      return false;
    }
    this.showLoader();
    this.authService.sendSms(this.user.relationManMobilePhone).then((result) => {
        this.loading.dismiss();
        this.showError("测试-发送成功："+result["_body"]);
    }, (err) => {
        this.loading.dismiss();
        this.showError(err["_body"]);
    });
  }

  register(){
    if(this.user.relationManMobilePhone==''){
      this.showError("手机号不能为空");
      return false;
    }
    if(this.user.enterpriseName==''){
      this.showError("企业名不能为空");
      return false;
    }
    if(this.user.relationManMobilePhoneSMS==''){
      this.showError("短信验证码不能为空");
      return false;
    }
    if(this.username=='' || this.password==''){
      this.showError("用户名或密码不能为空");
      return false;
    }
    this.showLoader();

    let credentials = {
        username: this.username,
        password: this.password
    };

    this.authService.createAccount({user:this.user, username: this.username,password: this.password}).then((result) => {
        this.loading.dismiss();
        console.log(result);
        // this.navCtrl.pop();//
    }, (err) => {
        this.loading.dismiss();
        this.showError(err["_body"]);
    });
 
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: '请求中......'
    });
    this.loading.present();
  }

showError(text) {
 
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['确定']
    });
    alert.present(prompt);
}

}
