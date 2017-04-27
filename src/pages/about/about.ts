import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	  
    about:any = {}; 

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public auth: Auth) 
    {
      this.about.expertId = navParams.get('item').id;
      this.about.expertName = navParams.get('item').name;
     

  	}

    submit(about){
      if(this.auth.validatemobile(about.phone) 
          && this.auth.validatemail(about.email))
      {
        var url = '/restapi/expert/contactExpert';
        this.auth.authPost(url, about, true).then((result) => {
          this.navCtrl.pop();
        },(err) =>{
          this.auth.showError("提交失败")
        });
      }
    }

}
