import { LoginServiceProvider } from './../providers/login-service/login-service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Injectable, Injector } from '@angular/core'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const loginService = this.injector.get(LoginServiceProvider)
    if (loginService.isLoggedIn()) {

        const authRequest = request.clone(
          {
            headers: request.headers.set('accessToken', `${loginService.user.usetoken}`)
          })
          console.log(authRequest);
        return next.handle(authRequest)
    } else {
      /*const authRequest = request.clone(
        {
          headers: request.headers.set('service_key', 'f80ebc87-ad5c-4b29-9366-5359768df5a1')
        })*/

      return next.handle(request)
    }
  }

}
