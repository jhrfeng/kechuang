import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';

import { DetailPage } from '../detail/detail';
import { ChartPage } from '../chart/chart';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html'
})
export class PersonDetailPage {

    params: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth) {
      this.params = { name:   "",
                      unit:   "",
                      data1:  {list:[], total:""}, 
                      data2:  {list:[], total:""}, 
                      data3:  {list:[], total:""},
                      events: {}, 
                      istype: 1
                    };

      this.authService.authGet('/query/expert/'+this.navParams.get('item').id, null, true).then((result) => {
          var data = JSON.parse(result["_body"]);
          console.log(data)
          this.params.name = data.name;
          this.params.unit = data.unit; 
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

  	openChart(){
  		this.navCtrl.push(ChartPage);
  	}

  	detail(){
  		this.navCtrl.push(DetailPage);
  	}

    about(){
      this.navCtrl.push(AboutPage);
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
