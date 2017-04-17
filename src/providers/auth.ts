import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import { REQUEST_URL } from '../constant/data';
import { LoginPage } from '../pages/login/login';

// https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-2/
// https://devdactic.com/login-ionic-2/
@Injectable()
export class Auth {

	public token: any;
	loading: any;

  	constructor(public http: Http, 
		  		public storage: NativeStorage, 
		  		public loadingCtrl: LoadingController, 
		  		public alertCtrl: AlertController) 
  	{

  	}

  	showLoader(content){
	    this.loading = this.loadingCtrl.create({
	        content: content
	    });
	    this.loading.present();
  	}

  	showError(text) {
      let alert = this.alertCtrl.create({
        subTitle: text,
        buttons: ['确定']
      });
      alert.present(prompt);
  	}

  	checkAuthentication(){
  		return new Promise((resolve, reject) => {
        //Load token if exists
        // this.storage.getItem('token').then((value) => {
            this.token = "MDNlNzMzZDItMDljYy00Y2U1LWEwMDktMWJlNGNjMmUyYzFi"; //value;
 			console.log(this.token)
            let headers = new Headers();
            headers.append('token', this.token);
 
            this.http.get(REQUEST_URL + '/restapi/user/me', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
	 
	        });         
	 
	    // });
  	}

	authGet(api, param, show){
  		return new Promise((resolve, reject) => {
        //Load token if exists
        // this.storage.getItem('token').then((value) => {
        	
            this.token = "MDNlNzMzZDItMDljYy00Y2U1LWEwMDktMWJlNGNjMmUyYzFi"; //value; //
            let headers = new Headers();
            headers.append('token', this.token);
 			
            // 处理参数
            if(null != param){
            	api = api + '?';
            	for(var key in param){
            		api+= key + '=' + param[key] + '&';
            	}
            	api = api.substring(0, api.lastIndexOf('&'));
            	console.log(api)
            }

            if(show) this.showLoader("请求中...");
            this.http.get(REQUEST_URL + api, {headers: headers})
                .subscribe(res => {
                	if(show) this.loading.dismiss();
                    resolve(res);
                }, (err) => {
                	this.loading.dismiss();
                    if(err["status"]==401){
                    	reject(err);
                    	this.showLoader("登录过期，请重新登录");
                    	setTimeout(() => {
					        this.loading.dismiss();
					     }, 1000);
                    }
                }); 
	        });         
	 
	    // });
  	}

	authPost(api, details, show){
  		return new Promise((resolve, reject) => {
        //Load token if exists
        // this.storage.getItem('token').then((value) => {
            this.token = "MDNlNzMzZDItMDljYy00Y2U1LWEwMDktMWJlNGNjMmUyYzFi"; //value; //
            let headers = new Headers();
            headers.append('Content-Type', 'application/json;charset=UTF-8');
            headers.append('token', this.token);
 
 			if(show) this.showLoader("请求中...");
            this.http.post(REQUEST_URL + api, JSON.stringify(details),{headers: headers})
                .subscribe(res => {
                	if(show) this.loading.dismiss();
                    resolve(res);
                }, (err) => {
                	this.loading.dismiss();
                    if(err["status"]==401){
                    	reject(err);
                    	this.showLoader("登录过期，请重新登录");
                    	setTimeout(() => {
					        this.loading.dismiss();
					     }, 1000);
                    }
                }); 
	        });     

	    // });
  	}  

	post(api, details){
  		return new Promise((resolve, reject) => {
            let headers = new Headers();
 
            this.http.post(REQUEST_URL + api, JSON.stringify(details),{headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
	        });     

  	}    

  	createAccount(details){
    	return new Promise((resolve, reject) => {
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');
	 
	        this.http.post(REQUEST_URL + '/restapi/account/register', JSON.stringify(details), {headers: headers})
	          .subscribe(res => {
	            let data = res.json();
	            if(data.status==200 && data.ok)
	 				resolve(data);
	 			else
	 				reject(data);
	        }, (err) => {
	        	console.log(err)
	            reject(err);
	        });
	 
	    });
  	}

	sendSms(relationManMobilePhone){
	    return new Promise((resolve, reject) => {
	 
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');
	 
	        this.http.post(REQUEST_URL + '/restapi/account/sendSMS', 
				JSON.stringify({user: {relationManMobilePhone:relationManMobilePhone}}), {headers: headers})
	          .subscribe(res => {
	 			let data = res;
	 			if(data.status==200 && data.ok)
	 				resolve(data);
	 			else
	 				reject(data);
	        }, (err) => {
	            reject(err);
	        });
	 
	    });
	}  

  	login(credentials){
 
	    return new Promise((resolve, reject) => {
	 
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');
	 
	        this.http.post(REQUEST_URL + '/restapi/account/login', JSON.stringify(credentials), {headers: headers})
	          .subscribe(res => {
	 			let data = res;
	 			if(data.status==200 && data.ok){
	 				this.token = data["_body"];
	 				console.log( this.token.substring(0,this.token.indexOf("_")))
	 				this.token = this.token.substring(0,this.token.indexOf("_"));
	 				this.storage.setItem('token', this.token);
	 				resolve(data);
	 			}else{
	 				reject(data);
	 			}
	        }, (err) => {
	            reject(err);
	        });
	 
	    });
	 
	}

	logout(){
	 	 this.storage.remove('token');
	    // this.storage.setItem('token', '');
	}

}
