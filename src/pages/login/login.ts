import { Component, Injectable } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@IonicPage()
@Injectable()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController,private loginService :LoginServiceProvider) { }
 
  public createAccount() {
    this.nav.push('ResgisterPage');
  }
 
  public login() {
    this.showLoading()

   this.loginService.login(this.registerCredentials.email,this.registerCredentials.password)
        .subscribe(result => {
          if (result) {        
            this.nav.setRoot('TabsPage');
          } else {
            this.showError("Access Denied");
          }
        }),error => {
          this.showError(error);
        }
        this.nav.setRoot('TabsPage');


  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}