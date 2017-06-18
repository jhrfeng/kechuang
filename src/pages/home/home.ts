import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';
import { menuData } from '../../constant/data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	isSearch = false;
  pet:any;
  params: any;
  userid: any;
  searchVo:any = {keyWord:'', type:'', start:0};

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
                    data1:{docs:[], numFound:0},
                    data2:{docs:[], numFound:0},
                    data3:{docs:[], numFound:0}, 
                    data4:{docs:[], numFound:0}, 
                    events:{},
                    start:{paper:0, project:0, patent:0, all:0}, //分页查询
                    istype:1,
                    img:"assets/img/bg1.jpg"

                  };
    this.params.events = {
      'onModal': (item: any) => { //筛选
          this.searchVo = Object.assign(this.searchVo, item);
          console.log(this.searchVo)
          this.search(2);
      },
      'onDetail': (item: any) => {
          this.navCtrl.push(DetailPage, {item: item});
      },
      'doInfinite': (infiniteScroll) => {
          this.doInfinite(infiniteScroll);
      }
    }
	}

  search(type){
    if(type==1){ // 重置搜索条件
        this.searchVo.area = "";
        this.searchVo.subject = "";
        this.searchVo.time = "-1";
        this.searchVo.yeardesc = false;
        this.storage.set('options', menuData());
    }
    this.pet = "1";
    this.isSearch = true;
    // 检查搜索次数
    this.authService.authPost('/query/search/checkTimes', {keyWord: this.searchVo.keyWord, id:this.userid}, true).then((result) => {
      var times = JSON.parse(result["_body"]);
      if(times!=1){
        this.authService.showMessage("您的搜索次数已使用完毕，请充值！")
      }else{
        this.searchVo.start = 0; // 重置搜索分页下标
        this.searchPaper();
        this.searchProject();
        this.searchPatent();
        this.searchAll();
      }
    },(err) =>{
      if(err) this.navCtrl.push(LoginPage, {type: "HomePage"})
    });

  }

  searchPaper(){ // 论文
    this.searchVo["type"]='paper';
    this.authService.authGet('/query/search', Object.assign({}, this.searchVo), false).then((result) => {
      this.params.data1 = JSON.parse(result["_body"]);
      this.params.data1 = this.params.data1.response;
    },(err) =>{
    });
  }

  searchProject(){// 项目
    this.searchVo.type='project';
    this.authService.authGet('/query/search', Object.assign({}, this.searchVo), false).then((result) => {
      this.params.data2 = JSON.parse(result["_body"]);
      this.params.data2 = this.params.data2.response;
    },(err) =>{
    });
  }

  searchPatent(){  // 专利
    this.searchVo.type='patent';
    this.authService.authGet('/query/search', Object.assign({}, this.searchVo), false).then((result) => {
      this.params.data3 = JSON.parse(result["_body"]);
      this.params.data3 = this.params.data3.response;
    },(err) =>{
    });
  }

  searchAll(){
    // 全部
    this.searchVo.type='';
    this.authService.authGet('/query/search', Object.assign({}, this.searchVo), false).then((result) => {
      this.params.data4 = JSON.parse(result["_body"]);
      this.params.data4 = this.params.data4.response;
    },(err) =>{
    });
  }

  selectPage(type){
    this.params.istype = type;
  }

  doInfinite(infiniteScroll) {
    console.log('......')
    setTimeout(() => {
      //  start:{paper:0, project:0, patent:0, all:0}, //分页查询
      if(this.params.istype==1){  // 论文
        this.params.start.paper+=10;
        this.searchVo.start = this.params.start.paper;
        this.searchVo.type = "paper";
        if(this.params.start.paper <= this.params.data1.numFound)
          this.authService.authGet('/query/search', Object.assign({}, this.searchVo), true).then((result) => {
            var data = JSON.parse(result["_body"]);
            this.params.data1.docs = this.params.data1.docs.concat(data.response.docs);
          },(err) =>{
          });

      }else if(this.params.istype==2){ //项目
        this.params.start.project+=10;
        this.searchVo.start = this.params.start.project;
        this.searchVo.type = "project";
        if(this.params.start.project <= this.params.data2.numFound)
          this.authService.authGet('/query/search',Object.assign({}, this.searchVo), true).then((result) => {
            var data = JSON.parse(result["_body"]);
            this.params.data2.docs = this.params.data2.docs.concat(data.response.docs);
          },(err) =>{
          });

      }else if(this.params.istype==3){ // 专利
        this.params.start.patent+=10;
        this.searchVo.start = this.params.start.patent;
        this.searchVo.type = "patent";
        if(this.params.start.patent <= this.params.data3.numFound)
          this.authService.authGet('/query/search', Object.assign({}, this.searchVo), true).then((result) => {
            var data = JSON.parse(result["_body"]);
            this.params.data3.docs = this.params.data3.docs.concat(data.response.docs);
          },(err) =>{
          });
        
      }else if(this.params.istype==4){ //全部
        this.params.start.all+=10;
        this.searchVo.start = this.params.start.all;
        this.searchVo.type = "";
        if(this.params.start.all <= this.params.data4.numFound)
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
