import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  params: any = {data:{}};
  iconType1:boolean = true;
  iconType2:boolean = true;

  constructor (public storage: Storage,
               public auth: Auth)
  {
    this.storage.get('user').then((user) => {
         this.params.data = user;
         console.log(this.params.data)
    });
  }


  editMobile(){
    this.iconType1 = !this.iconType1;
    if(this.iconType1){

    }
  }

  getMobile(){
    
  }

  editEmail(){
    this.iconType2 = !this.iconType2;
    if(this.iconType2 && this.auth.validatemail(this.params.data.relationManEmail)){
      this.auth.authPost('/restapi/account/checkEmail', {email:this.params.data.relationManEmail}, false).then((result) => {
          var data = JSON.parse(result["_body"]);
          if(data == "0")
            this.auth.showMessage("该邮箱已被绑定")
          else
            this.doneEmail();
      },(err) =>{
         
      });
    }
  }

  doneEmail(){
    this.auth.authPost('/restapi/user/changeBindEmail', {email:this.params.data.relationManEmail}, false).then((result) => {
        this.storage.set('user', this.params.data);
        this.auth.showMessage("修改成功")
    },(err) =>{
       
    });
  }

  ionViewDidLoad() {
     console.log('ionViewDidLoad accountPage');
  }
}
