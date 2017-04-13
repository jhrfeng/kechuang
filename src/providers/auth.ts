import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import { REQUEST_URL } from '../constant/data';

// https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-2/
// https://devdactic.com/login-ionic-2/
@Injectable()
export class Auth {

	public token: any;

  	constructor(public http: Http, public storage: NativeStorage) {

  	}

  	checkAuthentication(){
  		return new Promise((resolve, reject) => {
        //Load token if exists
        this.storage.getItem('token').then((value) => {
            this.token = value;
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
	 
	    });
  	}

	authGet(api){
  		return new Promise((resolve, reject) => {
        //Load token if exists
        this.storage.getItem('token').then((value) => {
            this.token = value;
            let headers = new Headers();
            headers.append('token', this.token);
 
            this.http.get(REQUEST_URL + api, {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
	        });         
	 
	    });
  	}

	authPost(api, details){
  		return new Promise((resolve, reject) => {
        //Load token if exists
        // this.storage.getItem('token').then((value) => {
            this.token = "YTkyMTJkMjgtYjcyOS00ZDRlLTk0NzctYjQwNjYzYTkwMTM2_1"; //value;
            let headers = new Headers();
            headers.append('token', this.token);
 
            this.http.post(REQUEST_URL + api, JSON.stringify(details),{headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
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
	 				this.storage.setItem('token', data["_body"]);
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
