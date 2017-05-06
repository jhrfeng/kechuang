import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { REQUEST_URL_DETAIL } from '../../constant/data';
import { Auth } from '../../providers/auth';
import { PersonDetailPage } from '../person-detail/person-detail';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

	detailType:string; //来源类型
	collectionList: any; //收藏列表
	params: any;
  	userid: any;
  	itemid: any;
  	itemName: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth,public storage: Storage)
  	{
  		console.log(this.navParams.get('item'))
  		this.storage.get('userid').then((value) => {//获取当前登录人id
	      	this.userid = value;
	      	// 检查搜索次数
		    this.authService.authPost('/query/detail/checkTimes', {id: this.userid}, true).then((result) => {
		      var times = JSON.parse(result["_body"]);
		      if(times!=1){
		        this.authService.showMessage("您的搜索次数已使用完毕，请充值！")
		      }else{
		       	this.initDetail(0);
		      }
		    },(err) =>{
		      this.authService.showMessage("您的搜索次数已使用完毕，请充值！")
		    });

	    })
  	}

  	// 初始化 type:0 上一页；  type:1 相关推荐
  	initDetail(type){
  		if(type==0){
  			this.itemid = this.navParams.get('item').id;
  			this.itemName = this.navParams.get('item').name;
  		}
  		this.detailType = this.navParams.get('item').type;
  		
  		this.params = {data:{}, relateds:[], keywords:[], readCount:0};

  		// 详细信息
  		this.authService.authGet('/query/'+this.detailType+'/'+this.itemid , null, true).then((result) => {
	    	this.params.data = JSON.parse(result["_body"]);
	    	if(this.detailType=='paper'){ // 关键词
	    		this.params.keywords = this.params.data.keywords.split(",");
	    	}
	    	else if(this.detailType=='project'){ // 关键词
	    		this.params.keywords = this.params.data.keywordCH.split(";");
	    		console.log(this.params.keywords)
	    	}
	    	
	    	// 收藏列表
	    	this.getCollectionList();
	    
	    },(err) =>{
	      
	    });

	    // 多少人看过
	    this.authService.authPut('/query/'+this.detailType+'/readCount/'+this.itemid ).then((result) => {
	    	this.params.readCount = JSON.parse(result["_body"]);
	    	console.log(this.params.readCount)
	    },(err) =>{
	      	
	    });


	    // 相关论文
  		this.authService.authGet('/query/'+this.detailType+'/'+this.itemid +'/similar', null, false).then((result) => {
	    	var relateds = JSON.parse(result["_body"]);
	    	for(var index in relateds){
	    		this.params.relateds.push(relateds[index])
	    	}
	    },(err) =>{
	      
	    });

	    this.params.events = {
	        'onCollect': (entryId: any) => { //收藏事件
	        	if(!this.params.data.collection){ // 进行收藏
		       		var url = '/restapi/user/' + this.userid+ '/mark';
		       		var data = {entryId: entryId, 
		       					title: this.itemName,
		       					type: this.navParams.get('item').type.toUpperCase(), 
		       					url: REQUEST_URL_DETAIL + this.navParams.get('item').type+ "/"+entryId+"/search",
		       					user: {id: this.userid}};
	       			this.authService.authPost(url, data, false).then((result) => {
				    	this.getCollectionList();
				    	this.authService.showMessage("收藏成功!")
				    },(err) =>{this.authService.showMessage("收藏失败!")});
		       	}

		       	for(var i in this.collectionList.list){
		       		if(this.collectionList.list[i]["entryId"] == entryId){ // 取消收藏
		       			this.params.data.collection = false;
		       			var url = '/restapi/user/' + this.userid+ '/cancelMark';
		       			this.authService.authPost(url, {entryId: entryId, type:this.navParams.get('item').type.toUpperCase(), user: {id: this.userid}}, false).then((result) => {
					    	// if(result["_body"]==1){
								this.getCollectionList();
								this.authService.showMessage("取消收藏成功!")
					    	// }
					    },(err) =>{this.authService.showMessage("取消收藏失败!")});
		       		}
		       	}
	
	      	},
	      	'onExpert': (item: any) =>{ // 发明者人才详情
	      		console.log(item);
	      		if(item.id!=null){
		          	this.navCtrl.push(PersonDetailPage, {item: {id:item.id, type:'EXPERT', name:item.name}});
	      		}
	      	},
	      	'onRelate': (item: any) =>{ // 相关详情
	      		this.itemid = item.id;
	      		this.itemName = item.name;
	      		this.initDetail(1);
	      		// this.navCtrl.push(DetailPage, {item: item});
	      	}
	    }
  	}


  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailPage');
  	}


  	getCollectionList(){
  		 // 收藏列表
	    var url = '/restapi/user/'+ this.userid + '/markings';
	    this.authService.authGet(url, null, false).then((result) => {
	    	this.collectionList = JSON.parse(result["_body"]);
	    	this.params.data.collection = false;
	    	for(var i in this.collectionList.list){
	       		if(this.collectionList.list[i]["entryId"] == this.itemid)
	       			this.params.data.collection = true;
		    }
		    console.log(this.params.data.collection)
	    },(err) =>{
	      
	    });
  	}

}
