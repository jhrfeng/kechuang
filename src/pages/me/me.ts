import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { PersonalPage } from '../personal/personal'
import { ApplyPage } from '../apply/apply';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
    
    params: any;

 	constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth) {
         this.params = {data:{name:'', enterpriseName:''}};
     }

	ionViewDidLoad() {
        this.authService.authGet('/restapi/user/me', null, true).then((result) => {
            this.params.data = JSON.parse(result["_body"]);
            console.log(this.params.data)
        },(err) =>{
            console.log(err)
            if(err) this.navCtrl.push(LoginPage, {type: "MePage"})
        });
    }

    // 跳转个人信息
    personal(){
    	this.navCtrl.push(PersonalPage);
    }

    //应用
    apply(){
        this.navCtrl.push(ApplyPage); 
    }


}
