import { Component } from '@angular/core';
 
import { NavController } from 'ionic-angular';
declare var window;

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

  	alias: string = '';
	msgList:Array<any>=[];

	constructor(public navCtrl: NavController) {
 		this.getMessage();
 		console.log(this.msgList);
	}

	getMessage(){
		document.addEventListener("jpush.receiveNotification", () => {
			this.msgList.push({content:window.plugins.jPushPlugin.receiveNotification.alert})
		}, false);
	}

	initJPush() {
		//启动极光推送
		if (window.plugins && 　window.plugins.jPushPlugin) {
			window.plugins.jPushPlugin.init();
			document.addEventListener("jpush.receiveNotification", () => {
			this.msgList.push({content:window.plugins.jPushPlugin.receiveNotification.alert})
			}, false);
		}
	}


	setAlias() {
		//设置Alias
		if (this.alias && this.alias.trim() != '') {
			window.plugins.jPushPlugin.setAlias(this.alias);
		}else alert('Alias不能为空')
	}

}
