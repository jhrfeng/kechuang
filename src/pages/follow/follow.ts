import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';


@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html'
})
export class FollowPage {

	userid: any;
	params:any = {userId:'', professionId:''};
  	constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				public storage: Storage,
  				public authService: Auth) {
  		this.storage.get('userid').then((value) => {//获取当前登录人id
	      	this.userid = value;
	      	this.getConcerns();
	    })
  	}

  	getConcerns(){
  		var url = '/restapi/user/'+this.userid+'/getConcernsProfession';
	    this.authService.authGet(url,null, true).then((result) => {
	    	var data = JSON.parse(result["_body"]);
	    	console.log(data);
	    },(err) =>{
	      
	    });
  	}

  	addConcern(ev:any){
  		var url = '/restapi/user/addConcernsProfession';
  		this.params.userId = this.userid;
	    this.authService.authFormPost(url, this.params, true).then((result) => {
	    	var data = JSON.parse(result["_body"]);
	    	if(data==0){
	    		this.authService.showMessage("你已关注该领域！")
	    	}
	    },(err) =>{
	      	this.authService.showError("关注失败");
	    });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad FollowPage');
  	}

}
