import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { REQUEST_URL_DETAIL } from '../../constant/data';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-exact-detail',
  templateUrl: 'exact-detail.html'
})
export class ExactDetailPage {

  	detailType:string; //来源类型
	collectionList: any; //收藏列表
	params: any;
  	
  	constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth) {
  		// this.params = {data:{}, relateds:[], keywords:[], readCount:0};
  		// console.log(this.navParams.get('item'))
  		// this.detailType = this.navParams.get('item').type;
  		// // 详细信息
  		// this.authService.authGet('/query/'+this.detailType+'/'+this.navParams.get('item').id, null, true).then((result) => {
	   //  	this.params.data = JSON.parse(result["_body"]);
	   //  	if(this.detailType=='paper'){ // 关键词
	   //  		this.params.keywords = this.params.data.keywords.split(",");
	   //  	}
	   //  	else if(this.detailType=='project'){ // 关键词
	   //  		console.log(this.params.data.keywordCH)
	   //  		this.params.keywords = this.params.data.keywordCH.split(";");
	   //  	}
	    	
	   //  	console.log(this.params.data)
	   //  },(err) =>{
	      
	   //  });

	   //  // 多少人看过
	   //  this.authService.authPut('/query/'+this.detailType+'/readCount/'+this.navParams.get('item').id).then((result) => {
	   //  	this.params.readCount = JSON.parse(result["_body"]);
	   //  	console.log(this.params.readCount)
	   //  },(err) =>{
	      	
	   //  });

	   //  // 收藏列表
	   //  this.getCollectionList();

	   //  // 相关论文
  		// this.authService.authGet('/query/'+this.detailType+'/'+this.navParams.get('item').id+'/similar', null, false).then((result) => {
	   //  	var relateds = JSON.parse(result["_body"]);
	   //  	for(var index in relateds){
	   //  		this.params.relateds.push(relateds[index])
	   //  	}
	   //  },(err) =>{
	      
	   //  });

	   //  this.params.events = {
	   //    'onCollect': (entryId: any) => { //收藏事件
	   //     	var collection = true;
	   //     	for(var i in this.collectionList.list){
	   //     		if(this.collectionList.list[i]["entryId"] == entryId){ // 取消收藏
	   //     			collection = false;
	   //     			console.log("取消收藏")
	   //     			var url = '/restapi/user/' + this.authService.getUserid()+ '/cancelMark';
	   //     			this.authService.authPost(url, {entryId: entryId, type:this.navParams.get('item').type, user: {id: this.authService.getUserid()}}, false).then((result) => {
				//     	if(result["_body"]==1){
				// 			this.getCollectionList();
				// 			this.authService.showMessage("取消收藏成功!")
				//     	}
				//     },(err) =>{this.authService.showMessage("取消收藏失败!")});
	   //     		}
	   //     	}
	   //     	if(collection){ // 进行收藏
	   //     		var url = '/restapi/user/' + this.authService.getUserid()+ '/mark';
	   //     		var data = {entryId: entryId, 
	   //     					title:this.navParams.get('item').name,
	   //     					type:this.navParams.get('item').type, 
	   //     					url:REQUEST_URL_DETAIL + this.navParams.get('item').type+ "/"+entryId+"/search",
	   //     					user: {id: this.authService.getUserid()}};
    //    			this.authService.authPost(url, data, false).then((result) => {
			 //    	this.getCollectionList();
			 //    	this.authService.showMessage("收藏成功!")
			 //    },(err) =>{this.authService.showMessage("收藏失败!")});
	   //     	}
	   //    }
	   //  }
  	}


  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ExactDetailPage');
  	}


  	getCollectionList(){
  		 // 收藏列表
	    // var url = '/restapi/user/'+ this.authService.getUserid() + '/markings';
	    // this.authService.authGet(url, null, false).then((result) => {
	    // 	this.collectionList = JSON.parse(result["_body"]);
	    // 	console.log(this.collectionList)
	    // },(err) =>{
	      
	    // });
  	}

}
