import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import Cookie from "js-cookie";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = `${environment.API_URL}`;
  //记录当前登录状态
  loggedIn =false

  constructor(private http: HttpClient, private  router: Router) { }

  login(user): Observable<any>{
    let params = {
      "email" : user.email,
      "password": user.password
    }
    return this.http.post(this.API_URL + 'api/users/signin', params, {withCredentials: true})
      .pipe(tap((res) => {
        this.loggedIn= true;
        //Cookie.set('userInfo', JSON.stringify(res));
        localStorage.setItem('userInfo', JSON.stringify(res));
        if (this.loggedIn){
          this.router.navigate(['/']);
        }
        return res;
      }));
  }

  checklogin(): void{
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      this.loggedIn=true;
      console.log(this.loggedIn);
    }else{
      this.loggedIn= false;
    }
  }

  logout(): void{
    localStorage.removeItem('userInfo');
    this.loggedIn= false;
  }

  register(user): Observable<any>{
    return this.http.post(this.API_URL + 'api/users/register', user)
      .pipe(tap(res => {
        if (res._id){
          this.router.navigate(['/login']);
        }
      }));
  }

}
