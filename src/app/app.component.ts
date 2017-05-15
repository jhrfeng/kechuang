import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
// import { NewsPage } from '../pages/news/news';
import { JPushService } from 'ionic2-jpush';

declare var window;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: Storage,
    public jPushPlugin: JPushService) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.initJPush();

      this.jPushPlugin.receiveNotification()
         .subscribe( res => {
           console.log(res)
           this.newList(res.alert);
         });

      // this.getRegistrationID();
    });
  }

  initJPush() {
    //启动极光推送
    if (window.plugins && 　window.plugins.jPushPlugin) {
      window.plugins.jPushPlugin.init();
      // this.jPushPlugin.setAlias("A");
    }
  }

  // getRegistrationID() {
  //    this.jPushPlugin.getRegistrationID()
  //    .then(res => { console.log(res)})
  //    .catch(err => alert(err))
  // }

  newList(lastnew){
    this.storage.get('news').then((newsList) => {
      console.log(lastnew, newsList)
      if(newsList){
        newsList += ";"+lastnew;
        this.storage.set('news',newsList);
      }
      else this.storage.set('news',lastnew);
    })
  }

}
0