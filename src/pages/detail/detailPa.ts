import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-detailPa',
  templateUrl: 'detailPa.html'
})
export class DetailPaPage {

	params: any;
	relateds: any = [];
	keywords: any;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth) {
  		this.params = {data:{}, related:{}};

  		this.authService.authGet('/query/patent/'+this.navParams.get('item').id, null, true).then((result) => {
	    	this.params.data = JSON.parse(result["_body"]);
	    	console.log(this.keywords, this.params.data)
	    	// this.keywords = this.params.data.keywords.split(",");

	      	
	    },(err) =>{
	      
	    });
  		this.authService.authGet('/query/patent/'+this.navParams.get('item').id+'/similar', null, false).then((result) => {
	    	this.params.related = JSON.parse(result["_body"]);
	    	for(var index in this.params.related){
	    		this.relateds.push(this.params.related[index])
	    	}
	    },(err) =>{
	      
	    });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailPaPage');
  	}

}
