import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

// https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-2/
// https://devdactic.com/login-ionic-2/
@Injectable()
export class Auth {

	public token: any;

  	constructor(public http: Http, public storage: Storage) {

  	}

  	checkAuthentication(){
  		return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
	 
	        });         
	 
	    });
  	}

  	createAccount(details){
 
    	return new Promise((resolve, reject) => {
 
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');
	 
	        this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
	          .subscribe(res => {
	            let data = res.json();
	            this.token = data.token;
	            this.storage.set('token', data.token);
	            resolve(data);
	        }, (err) => {
	            reject(err);
	        });
	 
	    });
 
  	}

  	login(credentials){
 
	    return new Promise((resolve, reject) => {
	 
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');
	 
	        this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/login', JSON.stringify(credentials), {headers: headers})
	          .subscribe(res => {
	 
	            let data = res.json();
	            this.token = data.token;
	            this.storage.set('token', data.token);
	            resolve(data);
	 
	            resolve(res.json());
	          }, (err) => {
	            reject(err);
	          });
	 
	    });
	 
	}

	logout(){
	    this.storage.set('token', '');
	}

}
