import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Wizard } from '../pages/wizard/wizard';
import { JPushService } from 'ionic2-jpush';

declare var window;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage = Wizard;
  @ViewChild('myNav') nav: NavController

  constructor(public platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: Storage,
    public jPushPlugin: JPushService) {
    this.storage.get('token').then((token) => {
      if(token){
          this.nav.setRoot(TabsPage);
      }else{
          this.nav.setRoot(Wizard);
      }
    })

    platform.ready().then(() => {
      console.log('02')
     
      statusBar.styleDefault();
      splashScreen.hide();
      this.initJPush();

      this.jPushPlugin.receiveNotification()
         .subscribe( res => {
           this.newList(res.alert);
         });
    });
  }

  initJPush() {
    //启动极光推送
    if(this.platform.is("ios") || this.platform.is("android")){
      window.plugins.jPushPlugin.init();
      if(this.platform.is("ios")){
        window.plugins.jPushPlugin.setDebugModeFromIos();
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
      }else{
        window.plugins.jPushPlugin.setDebugMode(true);
        window.plugins.jPushPlugin.setStatisticsOpen(true);
      }
    }
    // if (window.plugins && 　window.plugins.jPushPlugin) {
    //   window.plugins.jPushPlugin.init();
    //   // this.jPushPlugin.setAlias("A");
    // }
  }

  newList(lastnew){
    this.storage.get('news').then((newsList) => {
      if(newsList){
        newsList += ";"+lastnew;
        this.storage.set('news',newsList);
      }
      else this.storage.set('news',lastnew);
    })
  }

  ionViewDidLoad(){
    console.log('........')
    this.nav.setRoot(TabsPage);
    this.storage.get('token').then((token) => {
      if(token){
          this.nav.setRoot(TabsPage);
      }
    })
  }

}