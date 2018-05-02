import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
 
  tab1Root: any = 'Tab1Page';
  tab2Root: any = 'Tab2Page';
  myIndex: number;
  isAndroid: boolean = false;
  constructor(navParams: NavParams, public loginService:LoginServiceProvider, platform: Platform) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
    this.isAndroid = platform.is('android');
  }
}