import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-advice',
  templateUrl: 'advice.html'
})
export class AdvicePage {

	params:any = {dataList:[{id:1,name:"意见或建议"},
							{id:2,name:"页面错误或打不开"},
							{id:3,name:"页面打开很慢"},
							{id:4,name:"其他bug反馈"}]};

  	about:any = {};
    loading: any; 

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public auth: Auth,
                public loadingCtrl: LoadingController) 
    {
     
  	}

  	addConcern(ev:any){
  		
  	}

    submit(about){
      if(about.message==null || about.message==""){
        this.auth.showError("帮助内容不能为空")
        return false;
      }
      if(this.auth.validatemobile(about.phone) 
          && this.auth.validatemail(about.email))
      {
        var url = '/front/feedback/save';
        this.auth.authPost(url, about, true).then((result) => {
          this.showLoader();
          setTimeout(() => {
            this.loading.dismiss();
            this.navCtrl.pop();
          }, 1500);
        },(err) =>{
          this.auth.showError("提交失败")
        });
      }
    }

    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: '提交成功'
      });
      this.loading.present();
    }

}
