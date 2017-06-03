import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { IonJPushModule } from 'ionic2-jpush';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { MePage } from '../pages/me/me';

import { DetailPage } from '../pages/detail/detail';

import { ExactPage } from '../pages/exact/exact';
import { ForgetPage } from '../pages/forget/forget';
import { LixiangPage } from '../pages/lixiang/lixiang';
import { CollectPage } from '../pages/collect/collect';
import { CompanyPage } from '../pages/company/company';
import { FollowPage } from '../pages/follow/follow';
import { PersonalPage } from '../pages/personal/personal';
import { PersonalEditPage } from '../pages/personal-edit/personal-edit';
import { VipPage } from '../pages/vip/vip';
import { AccountPage } from '../pages/account/account';
import { ApplyPage } from '../pages/apply/apply';
import { PersonDetailPage } from '../pages/person-detail/person-detail';
import { ChartPage } from '../pages/chart/chart';
import { NewsPage } from '../pages/news/news';
import { AdvicePage } from '../pages/advice/advice';
import { Wizard } from '../pages/wizard/wizard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { CityPickerModule } from  "ionic2-city-picker";

import { LineInputComponent } from '../components/line-input/line-input';
import { PwdInputComponent } from '../components/pwd-input/pwd-input';
import { RegInputComponent } from '../components/reg-input/reg-input';
import { HedItemComponent } from '../components/hed-item/hed-item';
import { ItemListComponent } from '../components/item-list/item-list';
import { MenuItemComponent } from '../components/menu-item/menu-item';
import { BackgroundComponent } from '../components/background/background';
import { ForgetInputComponent } from '../components/forget-input/forget-input';
import { PersonListComponent } from '../components/person-list/person-list';

import { SmartSearch1Component } from '../components/smart-search-1/smart-search-1';
import { SmartSearch2Component } from '../components/smart-search-2/smart-search-2';
import { SmartSearch3Component } from '../components/smart-search-3/smart-search-3';
import { SmartSearch4Component } from '../components/smart-search-4/smart-search-4';
import { SmartDetail1Component } from '../components/smart-detail-1/smart-detail-1';
import { SmartDetail2Component } from '../components/smart-detail-2/smart-detail-2';
import { SmartDetail3Component } from '../components/smart-detail-3/smart-detail-3';

import { TalentSearch1Component } from '../components/talent-search-1/talent-search-1';
import { TalentSearch2Component } from '../components/talent-search-2/talent-search-2';
import { TalentSearch3Component } from '../components/talent-search-3/talent-search-3';
import { TalentSearch4Component } from '../components/talent-search-4/talent-search-4';



import { Auth }        from '../providers/auth';



import { Member, Fname, Type } from '../pipes/member';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterPage,
    LoginPage,
    MePage,
    DetailPage,
    ExactPage,
    ForgetPage,
    LixiangPage,
    CollectPage,
    CompanyPage,
    PersonalPage,
    PersonalEditPage,
    FollowPage,
    VipPage,
    AccountPage,
    ApplyPage,
    ChartPage,
    NewsPage,
    AdvicePage,
    PersonDetailPage,
    Wizard,
    LineInputComponent,
    PwdInputComponent,
    RegInputComponent,
    HedItemComponent,
    ItemListComponent,
    MenuItemComponent,
    BackgroundComponent,
    ForgetInputComponent,
    PersonListComponent,
    Member,
    Fname,
    Type,
    SmartSearch1Component,
    SmartSearch2Component,
    SmartSearch3Component,
    SmartSearch4Component,
    SmartDetail1Component,
    SmartDetail2Component,
    SmartDetail3Component,
    TalentSearch1Component,
    TalentSearch2Component,
    TalentSearch3Component,
    TalentSearch4Component
  ],
  imports: [
    CityPickerModule,
    IonJPushModule,
    IonicModule.forRoot(MyApp, {
        backButtonText: '',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        iconMode: 'md',
        // pageTransition: 'ios',
        tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterPage,
    LoginPage,
    MePage,
    DetailPage,
    ExactPage,
    ForgetPage,
    LixiangPage,
    CollectPage,
    CompanyPage,
    PersonalPage,
    PersonalEditPage,
    FollowPage,
    VipPage,
    AccountPage,
    ApplyPage,
    ChartPage,
    NewsPage,
    AdvicePage,
    PersonDetailPage,
    Wizard,
    LineInputComponent,
    PwdInputComponent,
    RegInputComponent,
    HedItemComponent,
    ItemListComponent,
    MenuItemComponent,
    BackgroundComponent,
    ForgetInputComponent,
    PersonListComponent,
    SmartSearch1Component,
    SmartSearch2Component,
    SmartSearch3Component,
    SmartSearch4Component,
    SmartDetail1Component,
    SmartDetail2Component,
    SmartDetail3Component,
    TalentSearch1Component,
    TalentSearch2Component,
    TalentSearch3Component,
    TalentSearch4Component
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Auth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
