import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import { HomePage } from '../home/home';
import { MePage } from '../me/me';
import { ExactPage } from '../exact/exact';
import { LixiangPage } from '../lixiang/lixiang';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	params: any;
	loading: any;

 	constructor(public navCtrl: NavController, 
 				public navParams: NavParams,
 				public authService: Auth, 
 				public loadingCtrl: LoadingController, 
 				public alertCtrl: AlertController) 
 	{
 		this.params = {data:{username:'', password:''}, events:{}};
 		this.params.events = {
            'onLogin': () => { 
                this.login()
            },
            'onRegister': () => {
                this.navCtrl.push(RegisterPage);    
            },
            'onForget': () => { 
                this.navCtrl.push(ForgetPage, {pwdType:'1'}); 
            }
        }
 	}


	login(){
	    if(this.params.data.username=='' || this.params.data.password==''){
	      this.showError("手机号或密码不能为空");
	      return false;
	    }
	    this.showLoader();

	    let credentials = {
	        username: this.params.data.username,
	        password: this.params.data.password
	    };

	    this.authService.login(credentials).then((result) => {
	        this.loading.dismiss();
	        console.log(this.navParams.get('type'))
	        if(this.navParams.get('type') == 'HomePage')
	        	this.navCtrl.setRoot(HomePage);
	        if(this.navParams.get('type') == 'MePage')
	        	this.navCtrl.setRoot(MePage);
	        if(this.navParams.get('type') == 'ExactPage')
	        	this.navCtrl.setRoot(ExactPage);
	        if(this.navParams.get('type') == 'LixiangPage')
	        	this.navCtrl.setRoot(LixiangPage);
	    }, (err) => {
	        this.loading.dismiss();
	        this.showError(err["_body"]);
	    });
 
  	}

 	showLoader(){
	    this.loading = this.loadingCtrl.create({
	        content: '登录中......'
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
