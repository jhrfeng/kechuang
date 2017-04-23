import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html'
})
export class ForgetPage {

	pwdType:string;
	params: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,public auth: Auth,) {
		this.pwdType = this.navParams.get('pwdType');
		this.params = {events:{}};
		this.params.events = {
            'onUpdate': (user) => { 
            	console.log(user);
            	if(user.newPassword2=="" 
            		&& user.newPassword==""
            		&& user.oldPassword==""){
            		this.auth.showMessage("密码设置不能为空")
            	}else if(user.newPassword2==user.oldPassword){
            		this.auth.showMessage("新密码不能与旧密码相同")
            	}else if(user.newPassword2!=user.newPassword){
            		this.auth.showMessage("两次新密码输入不一致")
            	}else{
            		var param = {oldPassword:user.oldPassword, newPassword:user.newPassword};
            		this.auth.authFormPost('/restapi/user/changePassword', param, true)
            		.then((result) => {
			            var data = JSON.parse(result["_body"]);
			            if(data==1){
			            	this.auth.showMessage("密码修改成功!")
			            }else{
			            	this.auth.showError("密码修改失败!")
			            }
			        },(err) =>{this.auth.showError("密码修改失败!")});
            	}
            }
        }
  	}

    ionViewDidLoad() {
    	console.log('ionViewDidLoad ForgetPage');
  	}

}
