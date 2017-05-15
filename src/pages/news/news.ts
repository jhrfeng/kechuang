import 'rxjs';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JPushService } from 'ionic2-jpush';
// declare var window;

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

  alias: string = '';
	msgList:Array<any>=[];

	constructor(public navCtrl: NavController,
              private platform: Platform, 
              private jPushPlugin: JPushService,
              public storage: Storage) 
	{

    this.storage.get('news').then((newsList) => {
      if(newsList)
        this.msgList = newsList.split(";");
      
    })
        // platform.ready().then( () =>{
       
        //     this.jPushPlugin.openNotification()
        //        .subscribe( res => {
        //          console.log('收到推送1');
        //          console.log(res)
        //          this.navCtrl.push(NewsPage)
        //        });
       
        //     this.jPushPlugin.receiveNotification()
        //        .subscribe( res => {
        //          console.log('收到推送2');
        //          console.log(res)
        //          this.navCtrl.push(NewsPage)
        //        });
       
        //     this.jPushPlugin.receiveMessage()
        //        .subscribe( res => {
        //          console.log('收到推送3');
        //          console.log(res)
        //          this.navCtrl.push(NewsPage)
        //        });
       
        //    })
     }
 
    /**
    * 注册极光
    */
    // init() {
    // 	this.jPushPlugin.init().then(res => alert(res)).catch(err => alert(err))
    // }
 
    // /**
    // * 获取ID
    // */
    // getRegistrationID() {
    //  	this.jPushPlugin.getRegistrationID().then(res => alert(res)).catch(err => alert(err))
    // }
     
	// constructor(public navCtrl: NavController) {
 // 		this.getMessage();
 // 		console.log(this.msgList);
	// }

	// getMessage(){
	// 	document.addEventListener("jpush.receiveNotification", () => {
	// 		this.msgList.push({content:window.plugins.jPushPlugin.receiveNotification.alert})
	// 	}, false);
	// }

	// initJPush() {
	// 	//启动极光推送
	// 	if (window.plugins && 　window.plugins.jPushPlugin) {
	// 		window.plugins.jPushPlugin.init();
	// 		document.addEventListener("jpush.receiveNotification", () => {
	// 		this.msgList.push({content:window.plugins.jPushPlugin.receiveNotification.alert})
	// 		}, false);
	// 	}
	// }


	// setAlias() {
	// 	//设置Alias
	// 	if (this.alias && this.alias.trim() != '') {
	// 		window.plugins.jPushPlugin.setAlias(this.alias);
	// 	}else alert('Alias不能为空')
	// }

}
