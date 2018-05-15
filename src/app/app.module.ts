import { AuthInterceptor } from './../security/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceProvider } from '../providers/login-service/login-service';

import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { RecordServiceProvider } from '../providers/record-service/record-service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: {ErrorHandler,HTTP_INTERCEPTORS}, useClass: AuthInterceptor, multi:true},
    LoginServiceProvider,
    Media,
    File,
    RecordServiceProvider,
    FileTransfer,
    FileTransferObject
  ]
})
export class AppModule {}
