import { Component, Injectable } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, ToastController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@IonicPage()
@Injectable()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  loginCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, 
     private alertCtrl: AlertController,
     private loadingCtrl: LoadingController,
     private loginService :LoginServiceProvider,
     public toastCtrl: ToastController) { }
 
  public createAccount() {
    this.nav.push('ResgisterPage');
  }
 
  public login() {
    this.showLoading()

   this.loginService.login(this.loginCredentials.email,this.loginCredentials.password)
        .subscribe(() =>
        {this.showToast('bottom')},
        response => {this.showAlert(), this.loading.dismiss()},
        ()=>{
          // if(this.navigateTo!=""){
           this.nav.setRoot('TabsPage');
          //}else{
            // this.router.navigate(['/acessos'])
          //}
        }
      )
        


  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: `Bem vindo, ${this.loginService.user.usenome}`,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erro de autenticação!',
      subTitle: 'Senha ou e-mail invalidos!',
      buttons: ['OK']
    });
    alert.present();
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