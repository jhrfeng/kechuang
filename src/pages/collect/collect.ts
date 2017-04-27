import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { DetailPage } from '../detail/detail';
import { PersonDetailPage } from '../person-detail/person-detail';

@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html'
})
export class CollectPage {

	collection: any = {list:[], total:0}; //收藏列表
	userid: any;
	params: any = {limit:10, name:"", start:0};

  	constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				public storage: Storage,
  				public authService: Auth) {
  		this.storage.get('userid').then((value) => {//获取当前登录人id
	      	this.userid = value;
		    this.getCollectionList();
	    })
  	}

    detail(item){
      item.type = item.type.toLowerCase();
      item.name = item.title;
      item.id = item.entryId;
      if(item.type == 'expert'){
        this.navCtrl.push(PersonDetailPage, {item: item});
      }else{
        this.navCtrl.push(DetailPage, {item: item});
      }
    }


  	doInfinite(infiniteScroll) {
  		this.params.start+=10;
    	setTimeout(() => {
    		if(this.params.start <= this.collection.total){
    			this.getPageCollectionList()
    		}    
    		infiniteScroll.complete();
    	}, 500);
  	}

  	searchCollection(ev: any){
  		let val = ev.target.value;
  		this.params.start = 0;
  		this.params.name = '%' + val + '%';
  		console.log(this.params)
  	    this.getCollectionList();
  	}

  	getCollectionList(){
  		 // 收藏列表
	    var url = '/restapi/user/'+ this.userid + '/markings';
	    this.authService.authGet(url, this.params, true).then((result) => {
	    	this.collection = JSON.parse(result["_body"]);
	    },(err) =>{
	      
	    });
  	}

  	getPageCollectionList(){
  		 // 收藏列表
	    var url = '/restapi/user/'+ this.userid + '/markings';
	    this.authService.authGet(url, this.params, true).then((result) => {
	    	var data = JSON.parse(result["_body"]);
	    	this.collection.list
	    		= this.collection.list.concat(data.list);
	    },(err) =>{
	      
	    });
  	}

  	delete(item){
	    var url = '/restapi/user/' + this.userid+ '/cancelMark';
		this.authService.authPost(url, {entryId: item.entryId, type:item.type, user: {id: this.userid}}, false).then((result) => {
	    	if(result["_body"]==1){
				this.getCollectionList();
				this.authService.showMessage("取消收藏成功!")
	    	}
	    },(err) =>{this.authService.showMessage("取消收藏失败!")});
  	}

}
