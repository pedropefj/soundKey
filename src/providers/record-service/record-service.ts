import { LoginServiceProvider } from './../login-service/login-service';
import { API } from './../../app/app.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


/*
  Generated class for the RecordServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordServiceProvider {

  constructor(public http: HttpClient,
    private media: Media,
    private file: File,
    public platform: Platform,
    private transfer: FileTransfer,
    private loginService: LoginServiceProvider) {
  }

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  public startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }
  public getAudioList() {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
      return this.audioList
    }
  }
  public stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;

    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + data.filename;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + data.filename;
      this.audio = this.media.create(this.filePath);
    }

    let option: FileUploadOptions = {
      fileKey: 'audiofile',
      mimeType: 'audio/3gp',
      httpMethod: 'POST',
      fileName: this.fileName,
      headers	: {'accessToken':`${this.loginService.user.usetoken}`}
    }
    console.log(this.loginService.user.usetoken)
    const fileTransfer: FileTransferObject = this.transfer.create();


    fileTransfer.upload(this.filePath, `${API}/uploadAudio`, option)
    .then((data) => {
      console.log(data)
      // success
    }, (err) => {
      console.log(err)
    })
    /* .then((result) => {

      this.sendAudio(name);
      this.recStart = false;

    }
    ).catch(error => {
      console.log('uploaderror');
      console.log(error.message);
      this.recStart = false;
    });*/



  }
  public playAudio(file, idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }

    this.audio.setVolume(0.8);
    this.audio.play()

  }

  public removeAudio(file, idx) {
    if (this.platform.is('ios')) {
      var filePath = this.file.documentsDirectory.replace(/file:\/\//g, '');
    } else if (this.platform.is('android')) {
      var filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '');
    }

    this.audioList = JSON.parse(localStorage.getItem("audiolist"));
    this.audioList.splice(idx, 1)
    localStorage.setItem("audiolist", JSON.stringify(this.audioList))

    filePath = filePath.substring(filePath.indexOf('s'), filePath.length - 1)
    console.log(filePath)
    /*this.file.readAsBinaryString(filePath, file).then((result)=>
      console.log(result))
      .catch((error)=> console.log(error))*/
    this.file.checkFile(filePath, file).then((result) =>
      console.log(result))
      .catch((error) => console.log(error))

    this.file.removeFile(filePath, file).then((result) =>
      console.log(result))
      .catch((error) => console.log(error))
  }


}
