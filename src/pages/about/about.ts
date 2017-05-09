import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	  
    about:any = {};
    loading: any; 

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public auth: Auth,
                public loadingCtrl: LoadingController) 
    {
      this.about.expertId = navParams.get('item').id;
      this.about.expertName = navParams.get('item').name;
     

  	}

    submit(about){
      if(about.msg==null || about.msg==""){
        this.auth.showError("帮助内容不能为空")
        return false;
      }
      if(this.auth.validatemobile(about.phone) 
          && this.auth.validatemail(about.email))
      {
        var url = '/restapi/expert/contactExpert';
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
