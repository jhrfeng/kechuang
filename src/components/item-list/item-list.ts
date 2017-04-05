import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { ForgetPage } from '../../pages/forget/forget';
import { CompanyPage } from '../../pages/company/company';
import { CollectPage } from '../../pages/collect/collect';
import { FollowPage } from '../../pages/follow/follow';
import { AccountPage } from '../../pages/account/account';
import { VipPage } from '../../pages/vip/vip';


@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent {

	text: string;

	constructor(public navCtrl: NavController) {
	    console.log('Hello ItemList Component');
	    this.text = 'Hello World';
	}

	logout(){
	  	this.navCtrl.push(LoginPage);
	}

    //账号绑定
    account(){
        this.navCtrl.push(AccountPage);
    }

    //会员信息
    vip(){
       this.navCtrl.push(VipPage); 
    }

	// 重置密码
    resetPwd(){
    	this.navCtrl.push(ForgetPage, {pwdType:'2'});
    }

    company(){
    	this.navCtrl.push(CompanyPage);
    }

    collect(){
    	this.navCtrl.push(CollectPage);
    }

    follow(){
    	this.navCtrl.push(FollowPage);
    }


}
