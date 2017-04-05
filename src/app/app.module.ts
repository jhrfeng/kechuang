import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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


import { AuthService } from '../providers/auth-service';
// import { CameraService }  from '../providers/camera-service';
// import { UtilProvider } from '../providers/util-provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { LineInputComponent } from '../components/line-input/line-input';
import { PwdInputComponent } from '../components/pwd-input/pwd-input';
import { RegInputComponent } from '../components/reg-input/reg-input';
import { HedItemComponent } from '../components/hed-item/hed-item';
import { ItemListComponent } from '../components/item-list/item-list';
import { MenuItemComponent } from '../components/menu-item/menu-item';
import { HeaderSearchComponent } from '../components/header-search/header-search';
import { SearchListComponent } from '../components/search-list/search-list';
import { BackgroundComponent } from '../components/background/background';
import { ForgetInputComponent } from '../components/forget-input/forget-input';

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
    LineInputComponent,
    PwdInputComponent,
    RegInputComponent,
    HedItemComponent,
    ItemListComponent,
    MenuItemComponent,
    HeaderSearchComponent,
    SearchListComponent,
    BackgroundComponent,
    ForgetInputComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
        backButtonText: '',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        // pageTransition: 'ios',
        tabsHideOnSubPages: true
    })
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
    LineInputComponent,
    PwdInputComponent,
    RegInputComponent,
    HedItemComponent,
    ItemListComponent,
    MenuItemComponent,
    HeaderSearchComponent,
    SearchListComponent,
    BackgroundComponent,
    ForgetInputComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AuthService,
    // CameraService,
    // UtilProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
