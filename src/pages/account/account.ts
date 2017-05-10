import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  params: any = {data:{}};
  iconType:boolean = true;

  constructor (public storage: Storage,
               public auth: Auth)
  {
    this.storage.get('user').then((user) => {
         this.params.data = user;
         console.log(this.params.data)
    });
  }


  editCompany(){
    this.iconType = !this.iconType;
    if(this.iconType){
      this.auth.authparamPut('/restapi/user/'+this.params.data.id+'/enterprise', this.params.data, true).then((result) => {
            this.storage.set('user', this.params.data);
            this.auth.showMessage("修改成功")
        },(err) =>{
           
        });
    }
  }

  ionViewDidLoad() {
     console.log('ionViewDidLoad accountPage');
  }
}
