/*import { API } from './../../app/app.api';
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import { User } from '../../model/user';
import { NavController } from 'ionic-angular';
import { LoginPage } from './login';

@Injectable()

export class LoginService{
user: User
  constructor(private http: HttpClient,private navCtrl :NavController){}

  isLoggedIn(): boolean{
    return this.user !== undefined
  }

  login(email:string, password:string):Observable<User>{
    return this.http.post<User>(`${API}/authenticate`,
        {email:email,password:password})
        .do(user=>this.user = user)
 }

  handleLogin(){
    this.navCtrl.setRoot(LoginPage)  
  }

  logout(){
    this.user = undefined
    this.navCtrl.setRoot(LoginPage)  
  }

}*/
