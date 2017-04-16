import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';
import { DetailPPage } from '../detail/detailP';
import { DetailPaPage } from '../detail/detailPa';
import { PersonDetailPage } from '../person-detail/person-detail';

@Component({
  selector: 'page-exact',
  templateUrl: 'exact.html'
})
export class ExactPage {

	isSearch = true;
	searchType = 4;
	searchVo:any = {keyWord:"", type:"paper"};
	params: any;

  	constructor(public navCtrl: NavController,public navParams: NavParams,public modalCtrl: ModalController, public authService: Auth) {
	    this.params = { data: {docs:[], numFound:0}, // 组件属性
	                    data1:{list:[], total:0},
	                    data2:{list:[], total:0},
	                    data3:{list:[], total:0}, 
	                    data4:{list:[], total:0}, 
	                    events:{}
	                  };
	    this.params.events = {
	      'onDetail': (item: any) => {
	      	console.log(item);
	        if(this.searchType==1) //论文
	          	this.navCtrl.push(DetailPage, {item: item});
	        if(this.searchType==2) //项目
	          	this.navCtrl.push(DetailPPage, {item: item});
	        if(this.searchType==3)  //专利
	          	this.navCtrl.push(DetailPaPage, {item: item});
	      	if(this.searchType==4) //人才
	      		this.navCtrl.push(PersonDetailPage, {item: item});
	      }
	    }
	}

  	search(){
  		// 人才
	    this.authService.authPost('/query/expert/sim', {keyWord: this.searchVo.keyWord}, true).then((result) => {
	      this.params.data4 = JSON.parse(result["_body"]);
	    },(err) =>{
	     	if(err) this.navCtrl.push(LoginPage, {type: "ExactPage"})
	    });
	    // 论文
	    this.authService.authPost('/query/paper/sim', {keyWord: this.searchVo.keyWord}, false).then((result) => {
	      this.params.data1 = JSON.parse(result["_body"]);
	      this.removeByValue(this.params.data1.list, null);
	    },(err) =>{

	    });
	    // 项目
	    this.searchVo.type = "project";
	    this.authService.authPost('/query/project/sim', {keyWord: this.searchVo.keyWord}, false).then((result) => {
	      this.params.data2 = JSON.parse(result["_body"]);
	      this.removeByValue(this.params.data2.list, null);
	    },(err) =>{
	      
	    });
	    // 专利
	    this.searchVo.type = "patent";
	    this.authService.authPost('/query/patent/sim', {keyWord: this.searchVo.keyWord}, false).then((result) => {
	      this.params.data3 = JSON.parse(result["_body"]);
	      this.removeByValue(this.params.data3.list, null);
	    },(err) =>{
	      
	    });
	  }

  	selectPage(type){
  		this.searchType = type;
	    if(type==1){
	      	this.params.data.docs = this.params.data1.list;
	      	this.params.data.numFound = this.params.data1.total;
	      	console.log("1", this.params.data)
	      	this.isSearch = false;
	    }
	    if(type==2){
	      	this.params.data.docs = this.params.data2.list;
	      	this.params.data.numFound = this.params.data2.total;
	      	console.log("2", this.params.data)
	      	this.isSearch = false;
	    }
	    if(type==3){
	      	this.params.data.docs = this.params.data3.list;
	      	this.params.data.numFound = this.params.data3.total;
	      	console.log("3", this.params.data)
	      	this.isSearch = false;
	    }
	    if(type==4){ //人才
	    	this.isSearch = true;
	    }
	}

	removeByValue(arr, val) {
	  for(var i=0; i<arr.length; i++) {
	    if(arr[i] == val) {
	      arr.splice(i, 1);
	    }
	  }
	}

    

}
