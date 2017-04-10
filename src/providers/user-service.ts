import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


export class User {
	username: String;
	password: String;

	constructor(username:string, password:string) {
		this.username = username;
		this.password = password;
	}
}


@Injectable()
export class UserService {

  constructor(public http: Http) {

  }

}
