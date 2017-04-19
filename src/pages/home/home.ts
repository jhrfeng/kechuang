import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';
import { DetailPPage } from '../detail/detailP';
import { DetailPaPage } from '../detail/detailPa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	isSearch = true;
  params: any;
  searchVo:any = {keyWord:"", type:"paper"};

  constructor(public navCtrl: NavController,public navParams: NavParams,public modalCtrl: ModalController, public authService: Auth) {
    this.params = { 
                    data1:{docs:[], numFound:0},
                    data2:{docs:[], numFound:0},
                    data3:{docs:[], numFound:0}, 
                    data4:{docs:[], numFound:0}, 
                    events:{},
                    istype:1
                  };
    this.params.events = {
      'onModal': (item: any) => { //筛选
        this.searchVo = Object.assign(this.searchVo, item);
        console.log(this.searchVo)
        this.search();
      },
      'onDetail': (item: any) => {
        if(item.type=="paper")//论文
          this.navCtrl.push(DetailPage, {item: item});
        if(item.type=="project") //项目
          this.navCtrl.push(DetailPPage, {item: item});
        if(item.type=="patent") // 专利
          this.navCtrl.push(DetailPaPage, {item: item});
      }
    }
	}

  search(){
    this.isSearch = false;
    // 检查搜索次数
    this.authService.authPost('/query/search/checkTimes', {keyWord: this.searchVo.keyWord, id:"103"}, true).then((result) => {
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
      // for (let i = 0; i < 30; i++) {
        // this.items.push( this.items.length );
      // }
      console.log(this.params.istype);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  ionViewDidLoad() {
    
  }
   
}
