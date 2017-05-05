import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { REQUEST_URL_DETAIL } from '../../constant/data';

import { DetailPage } from '../detail/detail';
import { ChartPage } from '../chart/chart';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html'
})
export class PersonDetailPage {

    params: any;
    items: any;
    collectionList: any; //收藏列表
    userid: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth,public storage: Storage) {
      this.items = navParams.get('item');
      this.params = { name:   "",
                      unit:   "",
                      introduction: null,
                      data:{},
                      data1:  {list:[], total:""}, 
                      data2:  {list:[], total:""}, 
                      data3:  {list:[], total:""},
                      events: {}, 
                      istype: 1
                    };
      this.storage.get('userid').then((value) => {//获取当前登录人id
          this.userid = value;
        // 收藏列表
        this.getCollectionList();
      })


      this.authService.authGet('/query/expert/'+this.items.id, null, true).then((result) => {
          var data = JSON.parse(result["_body"]);
          console.log(data)
          this.params.name = data.name;
          this.params.unit = data.unit; 
          this.params.introduction = data.introduction;
          this.params.data1.list = data.papers;
          this.params.data2.list = data.projects;
          this.params.data3.list = data.patents;
          console.log(this.params.data1.list.length, this.params.data2.list.length, this.params.data3.list.length)
          if(this.params.data1.list.length > 0){
            this.params.istype = 1;
            this.removeByValue(this.params.data1.list, null);
          }else if(this.params.data2.list.length > 0){
            this.params.istype = 2;
            this.removeByValue(this.params.data2.list, null);
          }else if(this.params.data3.list.length > 0){
            this.params.istype = 3;
            this.removeByValue(this.params.data3.list, null);
          }
          
      },(err) =>{});

      this.params.events = {
        'onDetail': (item: any) => {
            console.log(item)
            if(this.params.istype==1) //论文
                this.navCtrl.push(DetailPage, {item: {id:item.id, type:'paper', name:item.papername}});
            if(this.params.istype==2) //项目
                this.navCtrl.push(DetailPage, {item: {id:item.id, type:'project', name:item.name}});
            if(this.params.istype==3)  //专利
                this.navCtrl.push(DetailPage, {item: {id:item.id, type:'patent', name:item.name}});
            // this.navCtrl.push(DetailPage, {item: item});
        }
      }
    }

    selectPage(type){
      this.params.istype = type;
      console.log(this.params.istype)
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad PersonDetailPage');
  	}

    collect() { //收藏事件
      let entryId = this.items.id;
      if(!this.params.data.collection){ // 进行收藏
        var url = '/restapi/user/' + this.userid+ '/mark';
        var data = {entryId: entryId, 
                title:this.items.name,
                type:'EXPERT', 
                url:REQUEST_URL_DETAIL + this.items.type+ "/"+entryId+"/search",
                user: {id: this.userid}
            };
        this.authService.authPost(url, data, false).then((result) => {
          this.getCollectionList();
          this.authService.showMessage("收藏成功!")
        },(err) =>{this.authService.showMessage("收藏失败!")});
      }

      for(var i in this.collectionList.list){
        if(this.collectionList.list[i]["entryId"] == entryId){ // 取消收藏
          this.params.data.collection = false;
          var url = '/restapi/user/' + this.userid+ '/cancelMark';
          this.authService.authPost(url, {entryId: entryId, type:'EXPERT', user: {id: this.userid}}, false).then((result) => {
            if(result["_body"]==1){
              this.getCollectionList();
              this.authService.showMessage("取消收藏成功!")
            }
          },(err) =>{this.authService.showMessage("取消收藏失败!")});
         }
      }

      
    }

    getCollectionList(){
       // 收藏列表
      var url = '/restapi/user/'+ this.userid + '/markings';
      this.authService.authGet(url, null, false).then((result) => {
        this.collectionList = JSON.parse(result["_body"]);
        this.params.data.collection = false;
        for(var i in this.collectionList.list){
            if(this.collectionList.list[i]["entryId"] == this.items.id)
              this.params.data.collection = true;
        }
      },(err) =>{
        
      });
    }

    openChart(){
      this.authService.showMessage(this.params.introduction)
    }

  	openChart1(){ // 自我网络
  		this.navCtrl.push(ChartPage,{type:'socialNetwork', id:this.items.id, keyword:''});
  	}

    openChart2(){ // 综合表征
      this.navCtrl.push(ChartPage,{type:'radarGraphic', id:this.items.id, keyword:''});
    }

    about(){
      this.navCtrl.push(AboutPage, {item:this.items});
    }

    // 判断返回的list数组中是否有空对象
    removeByValue(arr, val) { 
      for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
          arr.splice(i, 1);
        }
      }
    }

}
