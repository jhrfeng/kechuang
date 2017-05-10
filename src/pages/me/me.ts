import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PersonalPage } from '../personal/personal'
import { ApplyPage }    from '../apply/apply';
import { LoginPage }    from '../login/login';
import { ForgetPage }   from '../forget/forget';
import { CompanyPage }  from '../company/company';
import { CollectPage }  from '../collect/collect';
import { FollowPage }   from '../follow/follow';
import { AccountPage }  from '../account/account';
import { VipPage }      from '../vip/vip';

import { Auth } from '../../providers/auth';



@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
    
    params: any;
    token: string;

 	constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public authService: Auth,
                public storage: Storage) 
    {   
        this.storage.get('token').then((token) => {
            if(token){
                this.token = token;
            }
        })
        this.params = {data:{name:'', enterpriseName:''}, events:{}};
        this.params.events = {
            'onAccount': () => { 
                this.navCtrl.push(AccountPage);
            },
            'onResetPwd': () => {
                this.navCtrl.push(ForgetPage, {pwdType:'2'});    
            },
            'onVip': () => { 
                this.navCtrl.push(VipPage);   
            },
            'onCompany': () => { 
                this.navCtrl.push(CompanyPage); 
            },
            'onCollect': () => { 
                this.navCtrl.push(CollectPage); 
            },
            'onFollow': () => { 
                 this.navCtrl.push(FollowPage); 
            }
            ,
            'onLogout': () => { 
                this.navCtrl.push(LoginPage, {type:'MePage'});
            }
        }
        this.authService.authGet('/restapi/user/me', null, true).then((result) => {
            this.params.data = JSON.parse(result["_body"]);
            this.storage.set('user', this.params.data);
            console.log(this.params.data)
        },(err) =>{
            if(err) this.navCtrl.push(LoginPage, {type: "MePage"})
        });
    }

    logout(){
        this.authService.authPost('/restapi/account/logout', {token:this.token}, true).then((result) => {
            this.storage.set('token', null);
        },(err) =>{});
    }

    // 跳转个人信息
    personal(){
        this.navCtrl.push(PersonalPage);
    }

    //应用
    apply(){
        this.navCtrl.push(ApplyPage); 
    }

	ionViewDidEnter() {
        this.storage.get('user').then((user) => {
            if(user){
                this.params.data = user;
            }
        })
    }




}
