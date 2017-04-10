import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	email: string;
    password: string;
    loading: any;

 	constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {}

	ionViewDidLoad() {
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(LoginPage); //HomePage
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }

    login(){
 
        this.showLoader();
 
        let credentials = {
            email: this.email,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(LoginPage);//HomePage
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
 
    }

    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }

}
