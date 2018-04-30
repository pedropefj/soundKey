import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Observable } from 'rxjs/Observable';
import { API } from '../../app/app.api';
import 'rxjs/add/operator/do'
import { NavController } from 'ionic-angular';

@Injectable()
export class LoginServiceProvider {
  user: User
  constructor(public http: HttpClient) {
  }
  login(email:string, password:string):Observable<User>{
    var data =  {
                  "email":`${email}`,
                  "password":`${password}`
                }
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    var options = {
      headers: headers
    };
    return this.http.post<User>(`${API}/users/authenticate`,data,options)
        .do(user=>this.user = user)
 }

 logout(){
  this.user = undefined
  return true
}
}
