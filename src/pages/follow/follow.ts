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
	followList: any = [];
	params:any = {userId:'', professionId:'', dataList:[], data:[]};
  	constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				public storage: Storage,
  				public authService: Auth) {
  		this.storage.get('userid').then((value) => {//获取当前登录人id
	      	this.userid = value;
	      	this.getConcernsList();
	      	this.getConcerns();
	      	
	    })

  	}

  	getConcernsList(){
  		var url = '/restapi/user/getConcernsProfessionList';
  		this.authService.authGet(url,null, false).then((result) => {
  			const data = JSON.parse(result["_body"]);
  			Object.assign(this.params.dataList, data)
  			Object.assign(this.followList, data)
	    },(err) =>{
	      
	    });
  	}

  	getConcerns(){
  		var url = '/restapi/user/getConcernsProfession';
	    this.authService.authGet(url,null, false).then((result) => {
	    	var data = JSON.parse(result["_body"]);
	    	var index = 0;
	    	this.params.data.push([]);
	    	for(var i in data){
	    		this.removeByValue(this.params.dataList, data[i]) // 移除已新增数组
	    		this.params.data[index].push(data[i])
	    		if(Number(i)%2 == 1){
	    			this.params.data.push([]);
	    			++index;
	    		}
	    	}
	    	// 尾部元素处理
	    	if(data.length%2 == 1){
	    		this.params.data[index].push({professionId:null, professionName:''})
	    	}else{
	    		this.params.data.pop();
	    	}
	    },(err) =>{
	      
	    });
  	}

  	addConcern(ev:any){
  		if(this.params.professionId > 0){
  			var url = '/restapi/user/addConcernsProfession';
		    this.authService.authPost(url, {professionId:this.params.professionId}, true).then((result) => {
		    	var data = JSON.parse(result["_body"]);
		    	if(data==1){
		    		console.log(this.followList)
		    		Object.assign(this.params.dataList, this.followList)
		    		this.params.data = [];
		    		this.getConcerns();
		    	}
		    },(err) =>{
		      	this.authService.showError("关注失败");
		    });
  		}
  		
  	}

  	delete(id){
		var url = '/restapi/user/delConcernsProfession';
  		this.authService.authPost(url, {professionId:id}, true).then((result) => {
	    	var data = JSON.parse(result["_body"]);
	    	if(data==1){
	    		console.log(this.followList)
		    	Object.assign(this.params.dataList, this.followList)
	    		this.params.data = [];
	    		this.getConcerns();
	    	}
	    },(err) =>{
	      	this.authService.showError("删除失败");
	    });
  	}

  	removeByValue(arr, val) {
	  	for(var i=0; i<arr.length; i++) {
	    	if(arr[i].professionId == val.professionId) {
	      		arr.splice(i, 1);
	      		--i;
	      		break;
	    	}
	   }
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad FollowPage');
  	}

}
