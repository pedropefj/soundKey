import { RecordServiceProvider } from './../../providers/record-service/record-service';
import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { MediaObject, Media } from '@ionic-native/media';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginServiceProvider,
    private recordService: RecordServiceProvider,
    public app: App) {
  }
  audioList: any[] = [];
  ionViewDidLoad() {
    this.audioList = this.recordService.getAudioList();
  }
  
  playAudio(filename, i){
    this.recordService.playAudio(filename,i)
  }
  public logout() {
    this.loginService.logout()
    if(this.loginService.logout()){
      this.app.getRootNavs()[0].setRoot(LoginPage);    }
  }

  public removerAudio(filename,i){
      this.recordService.removeAudio(filename,i)
      this.audioList = this.recordService.getAudioList()
  }

}
