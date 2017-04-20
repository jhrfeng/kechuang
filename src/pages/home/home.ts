import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	isSearch = true;
  params: any;
  searchVo:any = {keyWord:"", type:"paper", start:0};

  constructor(public navCtrl: NavController,public navParams: NavParams,public modalCtrl: ModalController, public authService: Auth) {
    this.params = { 
                    data1:{docs:[], numFound:0},
                    data2:{docs:[], numFound:0},
                    data3:{docs:[], numFound:0}, 
                    data4:{docs:[], numFound:0}, 
                    events:{},
                    start:{paper:0, project:0, patent:0, all:0}, //分页查询
                    istype:1

                  };
    this.params.events = {
      'onModal': (item: any) => { //筛选
          this.searchVo = Object.assign(this.searchVo, item);
          console.log(this.searchVo)
          this.search();
      },
      'onDetail': (item: any) => {
          this.navCtrl.push(DetailPage, {item: item});
      }
    }
	}

  search(){
    this.isSearch = false;
    this.searchVo.start = 0; // 重置搜索分页下标
    // 检查搜索次数
    this.authService.authPost('/query/search/checkTimes', {keyWord: this.searchVo.keyWord, id:this.authService.getUserid()}, true).then((result) => {
      var times = JSON.parse(result["_body"]);
      if(times==1){
        // 论文
        this.searchVo.type = "paper";
        this.authService.authGet('/query/search', this.searchVo, false).then((result) => {
          this.params.data1 = JSON.parse(result["_body"]);
          this.params.data1 = this.params.data1.response;
        },(err) =>{
        });
        // 项目
        this.searchVo.type = "project";
        this.authService.authGet('/query/search', this.searchVo, false).then((result) => {
          this.params.data2 = JSON.parse(result["_body"]);
          this.params.data2 = this.params.data2.response;
        },(err) =>{
        });
        // 专利
        this.searchVo.type = "patent";
        this.authService.authGet('/query/search', this.searchVo, false).then((result) => {
          this.params.data3 = JSON.parse(result["_body"]);
          this.params.data3 = this.params.data3.response;
        },(err) =>{
        });
        // 全部
        this.authService.authGet('/query/search', {keyWord: this.searchVo.keyWord}, false).then((result) => {
          this.params.data4 = JSON.parse(result["_body"]);
          this.params.data4 = this.params.data4.response;
        },(err) =>{
        });
      }else{
        // 提示次数已经使用完毕
      }
    },(err) =>{
      if(err){
        this.navCtrl.push(LoginPage, {type: "HomePage"})
      }
    });
    
    
  }

  selectPage(type){
    this.params.istype = type;
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      //  start:{paper:0, project:0, patent:0, all:0}, //分页查询
      if(this.params.istype==1){  // 论文
        this.params.start.paper+=10;
        this.searchVo.start = this.params.start.paper;
        this.searchVo.type = "paper";
        this.authService.authGet('/query/search', this.searchVo, true).then((result) => {
          var data = JSON.parse(result["_body"]);
          this.params.data1.docs = this.params.data1.docs.concat(data.response.docs);
        },(err) =>{
        });

      }else if(this.params.istype==2){ //项目
        this.params.start.project+=10;
        this.searchVo.start = this.params.start.project;
        this.searchVo.type = "project";
        this.authService.authGet('/query/search', this.searchVo, true).then((result) => {
          var data = JSON.parse(result["_body"]);
          this.params.data2.docs = this.params.data2.docs.concat(data.response.docs);
        },(err) =>{
        });

      }else if(this.params.istype==3){ // 专利
        this.params.start.patent+=10;
        this.searchVo.start = this.params.start.patent;
        this.searchVo.type = "patent";
        this.authService.authGet('/query/search', this.searchVo, true).then((result) => {
          var data = JSON.parse(result["_body"]);
          this.params.data3.docs = this.params.data3.docs.concat(data.response.docs);
        },(err) =>{
        });
        
      }else if(this.params.istype==4){ //全部
        this.params.start.all+=10;
        this.searchVo.start = this.params.start.all;
        this.authService.authGet('/query/search', this.searchVo, true).then((result) => {
          var data = JSON.parse(result["_body"]);
          this.params.data4.docs = this.params.data4.docs.concat(data.response.docs);
        },(err) =>{
        });
        
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  ionViewDidLoad() {
    
  }
   
}
