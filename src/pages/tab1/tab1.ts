import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginServiceProvider,
    private media: Media,
    private file: File,
    public platform: Platform,
    public app: App) {
  }
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  checkbox: boolean = false


  public getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  ionViewWillEnter() {
    this.getAudioList();
    console.log(this.checkbox)
  }

  public changeCheckbox(){
    this.checkbox = this.checkbox ? false : true
    if(this.checkbox == true){
      this.startRecord()
    }else{
      this.stopRecord()
    }
  }
  public startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  public stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }
  public playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }



  public logout() {
    this.loginService.logout()
    if(this.loginService.logout()){
      this.app.getRootNavs()[0].setRoot(LoginPage);    }
  }

}
