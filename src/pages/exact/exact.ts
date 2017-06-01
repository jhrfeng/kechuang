import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';
import { PersonDetailPage } from '../person-detail/person-detail';

@Component({
  selector: 'page-exact',
  templateUrl: 'exact.html'
})
export class ExactPage {

	isSearch = false;
	searchVo:any = {keyWord:""};
	params: any;
	userid: any;
	pet:any;
  	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				public modalCtrl: ModalController, 
  				public authService: Auth,
  				public storage: Storage) 
  	{   
  		this.storage.get('userid').then((value) => {//获取当前登录人id
	        this.userid = value;
	    })
	    this.params = { 
	                    data1:{list:[], total:0},
	                    data2:{list:[], total:0},
	                    data3:{list:[], total:0}, 
	                    data4:{list:[], total:0}, 
	                    events:{},
	                    start:{paper:1, project:1, patent:1, expert:1}, //分页查询
	                    istype:4, // 默认人才
                    	img:"assets/img/bg2.jpg"
	                  };
	    this.params.events = {
	       'onDetail': (item: any) => {
	      		console.log(item);
		        if(this.params.istype==1) //论文
		          	this.navCtrl.push(DetailPage, {item: {id:item.id, type:'paper', name:item.papername}});
		        if(this.params.istype==2) //项目
		          	this.navCtrl.push(DetailPage, {item: {id:item.id, type:'project', name:item.name}});
		        if(this.params.istype==3)  //专利
		          	this.navCtrl.push(DetailPage, {item: {id:item.id, type:'patent', name:item.name}});
		      	if(this.params.istype==4) //人才
		      		this.navCtrl.push(PersonDetailPage, {item: item});
	       },
	       'onInventor': (item: any) => {
	       		console.log(item);
	       }
	    }
	}

  	search(){
  		this.isSearch = true;
  		this.pet = "4";
  		// 检查搜索次数
	    this.authService.authPost('/query/advance/checkTimes', {keyWord: this.searchVo.keyWord, id:this.userid}, true).then((result) => {
	      	var times = JSON.parse(result["_body"]);
	      	if(times!=1){
	        	this.authService.showMessage("您的搜索次数已使用完毕，请充值！")
	      	}else{
	      		// 重置搜索条件
		  		this.params.start = {paper:1, project:1, patent:1, expert:1};
		  		// 人才
			    this.authService.authPost('/query/expert/sim', {keyWord: this.searchVo.keyWord}, true).then((result) => {
			      this.params.data4 = JSON.parse(result["_body"]);
			    },(err) =>{
			    });
			    // 论文
			    this.authService.authPost('/query/paper/sim', {keyWord: this.searchVo.keyWord}, false).then((result) => {
			      this.params.data1 = JSON.parse(result["_body"]);
			      this.removeByValue(this.params.data1.list, null);
			    },(err) =>{

			    });
			    // 项目
			    this.authService.authPost('/query/project/sim', {keyWord: this.searchVo.keyWord}, false).then((result) => {
			      this.params.data2 = JSON.parse(result["_body"]);
			      this.removeByValue(this.params.data2.list, null);
			    },(err) =>{
			      
			    });
			    // 专利
			    this.authService.authPost('/query/patent/sim', {keyWord: this.searchVo.keyWord}, false).then((result) => {
			      this.params.data3 = JSON.parse(result["_body"]);
			      this.removeByValue(this.params.data3.list, null);
			    },(err) =>{
			      
			    });
		    
		    }},(err) =>{
		      if(err) this.navCtrl.push(LoginPage, {type: "ExactPage"})
		    });
	  }

  	selectPage(type){
  		this.params.istype = type;
	}

	// 分页查询
	doInfinite(infiniteScroll) {
	    setTimeout(() => {
	      //  start:{paper:0, project:0, patent:0, all:0}, //分页查询
	      if(this.params.istype==1){  // 论文
	        this.params.start.paper+=1;
	        if(this.params.start.paper*10 <= this.params.data1.total)
		        this.authService.authPost('/query/paper/sim', {keyWord: this.searchVo.keyWord}, true).then((result) => {
			      	var data = JSON.parse(result["_body"]);
			      	this.params.data1.list = this.params.data1.list.concat(data.list);
			      	this.removeByValue(this.params.data1.list, null);
			    },(err) =>{

			    });

	      }else if(this.params.istype==2){ //项目
	        this.params.start.project+=1;
	        if(this.params.start.project*10 <= this.params.data2.total)
		        this.authService.authPost('/query/project/sim', {keyWord: this.searchVo.keyWord}, true).then((result) => {
			      	var data  = JSON.parse(result["_body"]);
			      	this.params.data2.list = this.params.data2.list.concat(data.list);
			      	this.removeByValue(this.params.data2.list, null);
			    },(err) =>{
			      
			    });

	      }else if(this.params.istype==3){ // 专利
	        this.params.start.patent+=1;
	        if(this.params.start.patent*10 <= this.params.data3.total)
		        this.authService.authPost('/query/patent/sim?page='+this.params.start.patent, {keyWord: this.searchVo.keyWord}, true).then((result) => {
			      	var data = JSON.parse(result["_body"]);
			      	this.params.data3.list = this.params.data3.list.concat(data.list);
			      	this.removeByValue(this.params.data3.list, null);
			    },(err) =>{
			      
			    });
	        
	      }else if(this.params.istype==4){ //全部
	        this.params.start.expert+=1;
	        if(this.params.start.expert*10 <= this.params.data4.total)
		        this.authService.authPost('/query/expert/sim?page='+this.params.start.expert, {keyWord: this.searchVo.keyWord}, true).then((result) => {
		        	var data = JSON.parse(result["_body"]);
			        this.params.data4.list = this.params.data4.list.concat(data.list);
			    },(err) =>{
			    });
		        
	      }
	      console.log('Async operation has ended');
	      infiniteScroll.complete();
	    }, 500);
	}
    

	// 判断返回的list数组中是否有空对象
	removeByValue(arr, val) { 
	  for(var i=0; i<arr.length; i++) {
	    if(arr[i] == val) {
	      arr.splice(i, 1);
	      --i;
	    }
	  }
	}

}
