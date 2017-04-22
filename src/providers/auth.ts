import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { REQUEST_URL } from '../constant/data';
import { LoginPage } from '../pages/login/login';

// https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-2/
// https://devdactic.com/login-ionic-2/
@Injectable()
export class Auth {

	public token: any;
	public userid: string;
	loading: any;

  	constructor(public http: Http, 
		  		// public storage: NativeStorage, 
          public storage: Storage,
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

    showMessage(text) {
      let alert = this.alertCtrl.create({
        subTitle: text,
        buttons: ['确定']
      });
      alert.present(prompt);
    }

  	checkAuthentication(){
  		return new Promise((resolve, reject) => {
       
        this.storage.get('token').then((value) => {
            let headers = new Headers();
            headers.append('token', value);
 
            this.http.get(REQUEST_URL + '/restapi/user/me', {headers: headers})
              .subscribe(res => {
                  resolve(res);
              }, (err) => {
                  reject(err);
              }); 
	        });         
	 
	    });
  	}

	  authGet(api, param, show){
      console.log(param)
  		return new Promise((resolve, reject) => {
      
        this.storage.get('token').then((value) => {
            let headers = new Headers();
            headers.append('token', value);
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
	 
	    });
  	}

    authPut(api){
      return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
          
          let headers = new Headers();
          headers.append('token', value);
          this.http.put(REQUEST_URL + api, null, {headers: headers})
              .subscribe(res => {
                  resolve(res);
              }, (err) => {
               reject(err);
              }); 
          });         
   
      });
    }  

	  authPost(api, details, show){
  		return new Promise((resolve, reject) => {

        this.storage.get('token').then((value) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json;charset=UTF-8');
            headers.append('token', value);
     
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
                      }else{
                        reject(err);
                      }
                  }); 
  	        });     

  	    });
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
    	 				this.token = this.token.substring(0,this.token.indexOf("_"));
    	 				this.userid = data["_body"].substring(data["_body"].indexOf("_")+1);
    	 				this.storage.set('userid', this.userid);
    	 				this.storage.set('token', this.token);
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
