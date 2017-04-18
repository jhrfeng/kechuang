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
    // 论文
    this.searchVo.type = "paper";
    this.authService.authGet('/query/search', this.searchVo, true).then((result) => {
      this.params.data1 = JSON.parse(result["_body"]);
      this.params.data1 = this.params.data1.response;
    },(err) =>{
      console.log(err)
      if(err) this.navCtrl.push(LoginPage, {type: "HomePage"})
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
  }

  selectPage(type){
    this.params.istype = type;
  }

  ionViewDidLoad() {
    
  }
   
}
