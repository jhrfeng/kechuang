import { Component } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'wizard',
    templateUrl: 'wizard.html'
})

export class Wizard {

    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController) { }

    slideChanged() {
        // let currentIndex = this.slides.getActiveIndex();
    }

    jump(){
        this.navCtrl.setRoot(TabsPage);
    }

}
